<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { demos } from "@/data/demos";
import VideoPlayer from "@/components/VideoPlayer.vue";
import ChatPanel from "@/components/ChatPanel.vue";

const props = defineProps<{
  id: string;
}>();

const router = useRouter();

const video = computed(() => demos.find((v) => v.id === props.id));

function goBack() {
  router.push("/");
}
</script>

<template>
  <div v-if="!video" class="flex h-[80vh] items-center justify-center">
    <div class="text-center">
      <p class="mb-4 text-lg text-emerald-800">Video not found</p>
      <button
        class="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700"
        @click="goBack"
      >
        Back to gallery
      </button>
    </div>
  </div>

  <div v-else class="flex h-[calc(100vh-80px)] items-center justify-center p-4 lg:p-8">
    <!-- Increased width to 80vw, constrained by max-width if needed -->
    <div class="flex w-[80vw] min-w-[1000px] flex-col lg:flex-row bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden" style="height: 85vh; max-height: 900px;">
      
      <!-- Left: Video Panel -->
      <div class="flex flex-col lg:w-[55%] border-b border-emerald-100 lg:border-b-0 lg:border-r bg-emerald-50/30">
        <div class="flex-1 overflow-y-auto p-5 lg:p-8 flex flex-col justify-center">
          <button
            class="mb-6 flex w-fit items-center gap-2 text-sm font-medium text-emerald-600 transition hover:text-emerald-800 bg-white/50 px-4 py-2 rounded-full border border-emerald-100 hover:bg-white"
            @click="goBack"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            Back to gallery
          </button>

          <VideoPlayer
            :src="video.videoUrl"
            :poster="video.thumbnailUrl"
            :title="video.title"
          />

          <div class="mt-6">
            <p class="text-base leading-relaxed text-gray-700">
              {{ video.description }}
            </p>

            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in video.tags"
                :key="tag"
                class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Chat Panel -->
      <div class="flex min-h-0 flex-1 flex-col bg-white/40">
        <ChatPanel :questions="video.questions" />
      </div>
    </div>
  </div>
</template>
