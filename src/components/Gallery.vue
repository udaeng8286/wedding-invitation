<template>
  <section class="gallery-section">
    <div class="section-header">
      <h2>Gallery</h2>
      <p>소중한 순간들을 함께 나누고 싶습니다</p>
    </div>

    <div class="gallery-grid">
      <div
        v-for="(image, index) in galleryImages"
        :key="image.id"
        class="gallery-item"
        :class="`item-${index + 1}`"
        @click="openLightbox(index)"
      >
        <img :src="image.src" :alt="image.alt" />
        <div class="gallery-overlay">
          <span class="view-icon">👁️</span>
        </div>
      </div>
    </div>

    <!-- 라이트박스 모달 -->
    <div v-if="showLightbox" class="lightbox-overlay" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button @click="closeLightbox" class="lightbox-close">✕</button>
        <button
          @click="prevImage"
          class="lightbox-nav prev"
          :disabled="currentImageIndex === 0"
        >
          ‹
        </button>
        <button
          @click="nextImage"
          class="lightbox-nav next"
          :disabled="currentImageIndex === galleryImages.length - 1"
        >
          ›
        </button>

        <div class="lightbox-image-container">
          <img
            :src="galleryImages[currentImageIndex].src"
            :alt="galleryImages[currentImageIndex].alt"
            class="lightbox-image"
          />
        </div>

        <div class="lightbox-counter">
          {{ currentImageIndex + 1 }} / {{ galleryImages.length }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const showLightbox = ref(false);
const currentImageIndex = ref(0);

// 이미지를 import로 직접 가져오기
import photo1 from "../assets/images/photo1.jpeg";
import photo2 from "../assets/images/photo2.jpeg";
import photo3 from "../assets/images/photo3.jpeg";
import photo4 from "../assets/images/photo4.jpeg";
import photo5 from "../assets/images/photo5.jpeg";
import photo6 from "../assets/images/photo6.jpeg";
import photo7 from "../assets/images/photo7.jpeg";
import photo8 from "../assets/images/photo8.jpeg";
import photo9 from "../assets/images/photo9.jpeg";
import photo10 from "../assets/images/photo10.jpeg";
import photo11 from "../assets/images/photo11.jpeg";
import photo12 from "../assets/images/photo12.jpeg";
import photo13 from "../assets/images/photo13.jpeg";
import photo14 from "../assets/images/photo14.jpeg";

// 갤러리 이미지들
const galleryImages = ref<GalleryImage[]>([
  {
    id: 1,
    src: photo1,
    alt: "Wedding photo 1",
  },
  {
    id: 2,
    src: photo2,
    alt: "Wedding photo 2",
  },
  {
    id: 3,
    src: photo3,
    alt: "Wedding photo 3",
  },
  {
    id: 4,
    src: photo4,
    alt: "Wedding photo 4",
  },
  {
    id: 5,
    src: photo5,
    alt: "Wedding photo 5",
  },
  {
    id: 6,
    src: photo6,
    alt: "Wedding photo 6",
  },
  {
    id: 7,
    src: photo7,
    alt: "Wedding photo 7",
  },
  {
    id: 8,
    src: photo8,
    alt: "Wedding photo 8",
  },
  {
    id: 9,
    src: photo9,
    alt: "Wedding photo 9",
  },
  {
    id: 10,
    src: photo10,
    alt: "Wedding photo 10",
  },
  {
    id: 11,
    src: photo11,
    alt: "Wedding photo 11",
  },
  {
    id: 12,
    src: photo12,
    alt: "Wedding photo 12",
  },
  {
    id: 13,
    src: photo13,
    alt: "Wedding photo 13",
  },
  {
    id: 14,
    src: photo14,
    alt: "Wedding photo 14",
  },
]);

const openLightbox = (index: number) => {
  currentImageIndex.value = index;
  showLightbox.value = true;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  showLightbox.value = false;
  document.body.style.overflow = "auto";
};

const nextImage = () => {
  if (currentImageIndex.value < galleryImages.value.length - 1) {
    currentImageIndex.value++;
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (!showLightbox.value) return;

  switch (event.key) {
    case "Escape":
      closeLightbox();
      break;
    case "ArrowLeft":
      prevImage();
      break;
    case "ArrowRight":
      nextImage();
      break;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "auto";
});
</script>

<style scoped>
.gallery-section {
  padding: 50px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: 2.2rem;
  color: var(--accent-color);
  margin-bottom: 10px;
  font-weight: 300;
  letter-spacing: 1px;
}

.section-header p {
  color: #666;
  font-size: 1rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
  grid-template-rows: repeat(6, 120px);
}

/* 그리드 레이아웃 패턴 */
.gallery-item.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

.gallery-item.item-2 {
  grid-column: 1;
  grid-row: 3;
}

.gallery-item.item-3 {
  grid-column: 2;
  grid-row: 3;
}

.gallery-item.item-4 {
  grid-column: 1;
  grid-row: 4;
}

.gallery-item.item-5 {
  grid-column: 2;
  grid-row: 4;
}

.gallery-item.item-6 {
  grid-column: 1 / 3;
  grid-row: 5;
}

.gallery-item.item-7 {
  grid-column: 1;
  grid-row: 6;
}

.gallery-item.item-8 {
  grid-column: 2;
  grid-row: 6;
}

.gallery-item.item-9 {
  grid-column: 1;
  grid-row: 7;
}

.gallery-item.item-10 {
  grid-column: 2;
  grid-row: 7;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.gallery-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.view-icon {
  color: white;
  font-size: 1.5rem;
}

/* 라이트박스 스타일 */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close {
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  z-index: 2001;
}

.lightbox-close:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 15px 20px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: 2001;
}

.lightbox-nav:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.3);
}

.lightbox-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.lightbox-nav.prev {
  left: -80px;
}

.lightbox-nav.next {
  right: -80px;
}

.lightbox-image-container {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.lightbox-counter {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1rem;
  font-weight: 500;
}

@media (min-width: 768px) {
  .gallery-grid {
    max-width: 600px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 150px);
  }

  .gallery-item.item-1 {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }

  .gallery-item.item-2 {
    grid-column: 3;
    grid-row: 1;
  }

  .gallery-item.item-3 {
    grid-column: 3;
    grid-row: 2;
  }

  .gallery-item.item-4 {
    grid-column: 1;
    grid-row: 3;
  }

  .gallery-item.item-5 {
    grid-column: 2;
    grid-row: 3;
  }

  .gallery-item.item-6 {
    grid-column: 3;
    grid-row: 3;
  }

  .gallery-item.item-7 {
    grid-column: 1;
    grid-row: 4;
  }

  .gallery-item.item-8 {
    grid-column: 2;
    grid-row: 4;
  }

  .gallery-item.item-9 {
    grid-column: 3;
    grid-row: 4;
  }

  .gallery-item.item-10 {
    grid-column: 1 / 4;
    grid-row: 5;
  }
}

@media (max-width: 375px) {
  .gallery-grid {
    gap: 10px;
    grid-template-rows: repeat(7, 100px);
  }

  .lightbox-nav.prev {
    left: -60px;
  }

  .lightbox-nav.next {
    right: -60px;
  }
}
</style>
