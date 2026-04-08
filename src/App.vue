<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden">
    <TopBar />
    <main class="flex-1 overflow-hidden">
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
