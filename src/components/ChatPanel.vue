<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount, computed } from "vue";
import { marked } from "marked";
import type { DemoQuestion } from "@/data/demos";
import QuestionButton from "@/components/QuestionButton.vue";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

const props = defineProps<{
  questions: DemoQuestion[];
}>();

const messages = ref<ChatMessage[]>([]);
const isTyping = ref(false);
const usedQuestionIds = ref(new Set<string>());
const chatContainer = ref<HTMLDivElement>();
let typeTimer: ReturnType<typeof setInterval> | null = null;

const availableQuestions = computed(() =>
  props.questions.filter((q) => !usedQuestionIds.value.has(q.id))
);

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
}

function renderMarkdown(text: string): string {
  return marked.parse(text, { async: false }) as string;
}

function askQuestion(question: DemoQuestion) {
  if (isTyping.value) return;

  usedQuestionIds.value.add(question.id);

  messages.value.push({
    role: "user",
    content: question.text,
  });

  scrollToBottom();

  const assistantMsg: ChatMessage = {
    role: "assistant",
    content: "",
    isTyping: true,
  };
  messages.value.push(assistantMsg);
  isTyping.value = true;

  let charIndex = 0;
  const answer = question.answer;
  const CHAR_DELAY_MS = 25; // slightly slower typing for realistic effect

  typeTimer = setInterval(() => {
    if (charIndex < answer.length) {
      let step = 1;
      if (answer[charIndex] === "\n") step = 2;
      assistantMsg.content = answer.slice(0, charIndex + step);
      charIndex += step;
      scrollToBottom();
    } else {
      assistantMsg.isTyping = false;
      isTyping.value = false;
      if (typeTimer) {
        clearInterval(typeTimer);
        typeTimer = null;
      }
    }
  }, CHAR_DELAY_MS);
}

onBeforeUnmount(() => {
  if (typeTimer) clearInterval(typeTimer);
});

defineExpose({ askQuestion });
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- Messages area -->
    <div
      ref="chatContainer"
      class="flex-1 space-y-6 overflow-y-auto px-5 py-6 bg-white/50 backdrop-blur-sm"
    >
      <!-- Welcome message -->
      <div
        v-if="messages.length === 0"
        class="flex h-full items-center justify-center animate-fade-in"
      >
        <div class="text-center">
          <div
            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 shadow-inner"
          >
            <svg
              class="h-8 w-8 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 class="mb-2 font-bold text-gray-800">Ask the Video</h3>
          <p class="text-sm font-medium text-gray-500">
            Click a question below to see the model's response
          </p>
        </div>
      </div>

      <!-- Chat messages -->
      <div
        v-for="(msg, i) in messages"
        :key="i"
        class="animate-slide-up"
      >
        <!-- User message -->
        <div v-if="msg.role === 'user'" class="flex justify-end">
          <div
            class="max-w-[85%] rounded-3xl rounded-tr-md bg-emerald-600 px-5 py-3 text-base font-medium text-white shadow-md border border-emerald-500/50"
          >
            {{ msg.content }}
          </div>
        </div>

        <!-- Assistant message -->
        <div v-else class="flex justify-start">
          <div class="max-w-[95%]">
            <div class="mb-2 flex items-center gap-2">
              <div
                class="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 border border-emerald-200 text-xs font-black text-emerald-700 shadow-sm"
              >
                M
              </div>
              <span class="text-sm font-bold text-gray-600">Model</span>
              <span
                v-if="msg.isTyping"
                class="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500"
              />
            </div>
            <div
              class="prose-sm prose max-w-none rounded-3xl rounded-tl-md border border-emerald-100 bg-white/90 px-6 py-4 text-base leading-relaxed text-gray-800 shadow-sm"
              v-html="renderMarkdown(msg.content)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Question buttons floating at the bottom -->
    <div class="border-t border-emerald-100 bg-white/70 backdrop-blur-md px-5 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
      <p class="mb-3 text-xs font-bold tracking-widest uppercase text-emerald-800/60">
        Suggested questions
      </p>
      <div class="flex flex-wrap gap-2.5">
        <QuestionButton
          v-for="q in questions"
          :key="q.id"
          :text="q.text"
          :disabled="isTyping"
          :used="usedQuestionIds.has(q.id)"
          @click="askQuestion(q)"
        />
      </div>
      <p
        v-if="availableQuestions.length === 0 && !isTyping"
        class="mt-3 text-sm font-medium text-gray-500"
      >
        All questions explored. Return to the gallery to try another video.
      </p>
    </div>
  </div>
</template>

<style scoped>
.prose-sm :deep(h1),
.prose-sm :deep(h2),
.prose-sm :deep(h3) {
  color: #111827;
  margin-top: 0.75em;
  margin-bottom: 0.25em;
  font-weight: 700;
}
.prose-sm :deep(h1) { font-size: 1.1em; }
.prose-sm :deep(h2) { font-size: 1.05em; }
.prose-sm :deep(h3) { font-size: 1em; }

.prose-sm :deep(p) {
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}

.prose-sm :deep(strong) {
  color: #1f2937;
  font-weight: 700;
}

.prose-sm :deep(ul),
.prose-sm :deep(ol) {
  padding-left: 1.5em;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}

.prose-sm :deep(li) {
  margin-top: 0.2em;
  margin-bottom: 0.2em;
}

.prose-sm :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.5em 0;
  font-size: 0.9em;
}

.prose-sm :deep(th),
.prose-sm :deep(td) {
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 0.5em 0.75em;
  text-align: left;
}

.prose-sm :deep(th) {
  background: rgba(16, 185, 129, 0.1);
  font-weight: 700;
  color: #065f46;
}

.prose-sm :deep(code) {
  background: rgba(16, 185, 129, 0.08);
  padding: 0.15em 0.4em;
  border-radius: 0.3em;
  font-size: 0.9em;
  font-family: "JetBrains Mono", monospace;
  color: #047857;
}

.prose-sm :deep(pre) {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.75em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin: 0.5em 0;
}

.prose-sm :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}
</style>
