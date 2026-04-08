<script setup lang="ts">
import type { DemoVideo } from "@/data/demos";
import VideoCard from "./VideoCard.vue";

defineProps<{
  videos: DemoVideo[];
}>();
</script>

<template>
  <div
    class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <VideoCard
      v-for="video in videos"
      :key="video.id"
      :video="video"
      class="animate-fade-in"
    />
  </div>
</template>
