<template>
  <section class="gallery-section">
    <div class="section-header">
      <h2>GALLERY</h2>
      <p class="section-subtitle">소중한 추억을 함께 나누고 싶습니다</p>
    </div>

    <div class="gallery-container">
      <!-- 갤러리 -->
      <div class="gallery-main">
        <Galleria
          :value="images"
          v-model:activeIndex="activeIndex"
          :circular="true"
          :showThumbnails="false"
          :showItemNavigators="false"
        >
          <template #item="slotProps">
            <img
              :src="slotProps.item.itemImageSrc"
              :alt="slotProps.item.alt"
              style="width: 100%; object-fit: contain; border-radius: 1rem"
            />
          </template>
        </Galleria>
      </div>

      <!-- 하단 네비게이션 -->
      <div class="gallery-navigation">
        <button class="nav-button prev-button" @click="prevImage">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        <div class="image-counter">
          {{ activeIndex + 1 }} / {{ images.length }}
        </div>

        <button class="nav-button next-button" @click="nextImage">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 이미지를 동적으로 import하는 방법 (Vite 기준)
const getImageUrl = (imageName: string) => {
  return new URL(`/src/assets/images/${imageName}`, import.meta.url).href;
};

const activeIndex = ref(0);

const images = ref([
  {
    itemImageSrc: getImageUrl("photo1.jpeg"),
    thumbnailImageSrc: getImageUrl("photo1.jpeg"),
    alt: "Photo 1",
  },
  {
    itemImageSrc: getImageUrl("photo2.jpeg"),
    thumbnailImageSrc: getImageUrl("photo2.jpeg"),
    alt: "Photo 2",
  },
  {
    itemImageSrc: getImageUrl("photo3.jpeg"),
    thumbnailImageSrc: getImageUrl("photo3.jpeg"),
    alt: "Photo 3",
  },
  {
    itemImageSrc: getImageUrl("photo4.jpeg"),
    thumbnailImageSrc: getImageUrl("photo4.jpeg"),
    alt: "Photo 4",
  },
  {
    itemImageSrc: getImageUrl("photo5.jpeg"),
    thumbnailImageSrc: getImageUrl("photo5.jpeg"),
    alt: "Photo 5",
  },
  {
    itemImageSrc: getImageUrl("photo6.jpeg"),
    thumbnailImageSrc: getImageUrl("photo6.jpeg"),
    alt: "Photo 6",
  },
  {
    itemImageSrc: getImageUrl("photo7.jpeg"),
    thumbnailImageSrc: getImageUrl("photo7.jpeg"),
    alt: "Photo 7",
  },
  {
    itemImageSrc: getImageUrl("photo8.jpeg"),
    thumbnailImageSrc: getImageUrl("photo8.jpeg"),
    alt: "Photo 8",
  },
  {
    itemImageSrc: getImageUrl("photo9.jpeg"),
    thumbnailImageSrc: getImageUrl("photo9.jpeg"),
    alt: "Photo 9",
  },
  {
    itemImageSrc: getImageUrl("photo10.jpeg"),
    thumbnailImageSrc: getImageUrl("photo10.jpeg"),
    alt: "Photo 10",
  },
  {
    itemImageSrc: getImageUrl("photo11.jpeg"),
    thumbnailImageSrc: getImageUrl("photo11.jpeg"),
    alt: "Photo 11",
  },
  {
    itemImageSrc: getImageUrl("photo12.jpeg"),
    thumbnailImageSrc: getImageUrl("photo12.jpeg"),
    alt: "Photo 12",
  },
  {
    itemImageSrc: getImageUrl("photo13.jpeg"),
    thumbnailImageSrc: getImageUrl("photo13.jpeg"),
    alt: "Photo 13",
  },
  {
    itemImageSrc: getImageUrl("photo14.jpeg"),
    thumbnailImageSrc: getImageUrl("photo14.jpeg"),
    alt: "Photo 14",
  },
]);

const prevImage = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
  } else {
    activeIndex.value = images.value.length - 1;
  }
};

const nextImage = () => {
  if (activeIndex.value < images.value.length - 1) {
    activeIndex.value++;
  } else {
    activeIndex.value = 0;
  }
};
</script>

<style scoped>
.gallery-section {
  padding: 40px 20px;
  background-color: white;
}

.section-header {
  text-align: center;
  margin-bottom: 30px;
}

.section-header h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.8rem;
  color: var(--accent-color);
  font-weight: 300;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.section-subtitle {
  font-size: 0.9rem;
  color: #666;
  font-weight: 300;
  line-height: 1.6;
}

.gallery-container {
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
}

.gallery-main {
  width: 100%;
  margin-bottom: 20px;
}

.gallery-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.nav-button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button:hover {
  color: rgb(70, 70, 70);
  transform: scale(1.05);
}

.nav-button:active {
  transform: scale(0.95);
}

.image-counter {
  color: rgb(70, 70, 70);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 400;
  min-width: 60px;
  text-align: center;
}

/* 모바일 최적화 */
@media (max-width: 430px) {
  .gallery-section {
    padding: 30px 15px;
  }

  .gallery-container {
    max-width: 100%;
    padding: 0 5px;
  }

  .section-header h2 {
    font-size: 1.6rem;
  }

  .section-subtitle {
    font-size: 0.85rem;
  }

  .nav-button {
    width: 35px;
    height: 35px;
  }

  .gallery-navigation {
    gap: 15px;
  }

  .image-counter {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}

@media (max-width: 375px) {
  .gallery-section {
    padding: 25px 10px;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .nav-button {
    width: 32px;
    height: 32px;
  }

  .gallery-navigation {
    gap: 12px;
  }
}
</style>
