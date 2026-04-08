<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  src: string;
  poster: string;
  title: string;
  type?: "video" | "image" | "multi-image" | "ocr";
  imageUrls?: string[];
  ocrData?: Record<string, string>;
}>();

const currentImageIndex = ref(0);

function setImage(index: number) {
  currentImageIndex.value = index;
}

const showOcrBoxes = ref(false);

function toggleOcr() {
  showOcrBoxes.value = !showOcrBoxes.value;
}

// Convert string bbox like "[172, 97, 825, 214]" to CSS percentage style
function getBBoxStyle(bboxStr: string) {
  try {
    const coords = JSON.parse(bboxStr);
    if (!Array.isArray(coords) || coords.length !== 4) return {};
    
    // For this specific image, let's assume a generic width/height based on the provided coordinates
    // They seem to max out around 1000. Let's use 1000x1000 as base.
    const IMG_WIDTH = 1000;
    const IMG_HEIGHT = 1000;

    const [ymin, xmin, ymax, xmax] = coords;
    
    return {
      left: `${(xmin / IMG_WIDTH) * 100}%`,
      top: `${(ymin / IMG_HEIGHT) * 100}%`,
      width: `${((xmax - xmin) / IMG_WIDTH) * 100}%`,
      height: `${((ymax - ymin) / IMG_HEIGHT) * 100}%`
    };
  } catch (e) {
    return {};
  }
}
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-emerald-200 bg-black shadow-lg flex flex-col relative group h-full">
    <!-- Single Image -->
    <div v-if="type === 'image' || type === 'ocr'" class="relative w-full h-full bg-black flex items-center justify-center min-h-0 group/img overflow-hidden">
      <img
        :src="src"
        :alt="title"
        class="max-h-[100%] max-w-[100%] object-contain cursor-pointer transition-opacity"
        :class="showOcrBoxes ? 'opacity-80' : 'opacity-100'"
        @click="type === 'ocr' ? toggleOcr() : null"
      />
      <!-- OCR Overlays -->
      <div v-if="type === 'ocr' && showOcrBoxes && ocrData" class="absolute inset-0 pointer-events-none flex items-center justify-center">
        <!-- We use an inner wrapper to approximate the aspect ratio of the image for the bounding boxes.
             If we knew the exact aspect ratio, we'd set it here. We'll assume the image fits inside the box 
             and the bounding boxes are relative to a 1000x1000 square.
             Since object-contain will scale it, we apply aspect-[8.5/10] to match the sample poster ratio roughly. -->
        <div class="relative w-full h-full max-w-full max-h-full flex items-center justify-center pointer-events-none">
          <div class="relative w-full h-full aspect-[8/10] max-h-full object-contain pointer-events-auto cursor-pointer" @click="toggleOcr()">
            <div 
              v-for="(bbox, text) in ocrData" 
              :key="text"
              class="absolute border-[1.5px] border-red-500 flex flex-col justify-start hover:bg-red-500/30 transition-colors"
              :style="getBBoxStyle(bbox)"
            >
              <span class="bg-[#ffffcc] text-red-600 text-[10px] sm:text-xs font-bold px-1 whitespace-nowrap -translate-y-full absolute left-[-1.5px] top-0 border-[1.5px] border-red-500 border-b-0 leading-tight shadow-sm z-10">
                {{ text }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- OCR Instruction Overlay (Only shows when boxes are hidden) -->
      <div 
        v-if="type === 'ocr' && !showOcrBoxes" 
        class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 shadow-lg pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
      >
        Click image to toggle OCR bounding boxes
      </div>
    </div>
    <!-- Multi Image Slider -->
    <div v-else-if="type === 'multi-image' && imageUrls && imageUrls.length > 0" class="relative aspect-video w-full bg-black flex-1 min-h-0">
      <img
        :src="imageUrls[currentImageIndex]"
        :alt="title"
        class="absolute inset-0 h-full w-full object-contain"
      />
      <!-- Dots container -->
      <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        <button
          v-for="(_, index) in imageUrls"
          :key="index"
          @click="setImage(index)"
          class="h-2 w-2 rounded-full transition-all"
          :class="index === currentImageIndex ? 'bg-emerald-400 scale-125 shadow-md' : 'bg-white/60 hover:bg-white/90'"
          :aria-label="'Show image ' + (index + 1)"
        />
      </div>
    </div>
    <!-- Video -->
    <video
      v-else
      :src="src"
      :poster="poster || undefined"
      controls
      preload="metadata"
      class="aspect-video w-full bg-black object-contain"
    >
      Your browser does not support the video tag.
    </video>
    <div class="border-t border-emerald-100 bg-white px-5 py-4 shrink-0">
      <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
    </div>
  </div>
</template>
