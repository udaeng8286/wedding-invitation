<template>
  <section class="gallery-section">
    <div class="section-header">
      <h2>우리의 특별한 순간들</h2>
      <p class="section-subtitle">소중한 추억을 함께 나누고 싶습니다</p>
    </div>

    <div class="gallery-container">
      <Galleria
        :value="images"
        :numVisible="3"
        :circular="true"
        class="custom-galleria"
      >
        <template #item="slotProps">
          <div class="gallery-item-wrapper">
            <img
              :src="slotProps.item.itemImageSrc"
              :alt="slotProps.item.alt"
              class="gallery-main-image"
            />
          </div>
        </template>
        <template #thumbnail="slotProps">
          <div class="gallery-thumbnail-wrapper">
            <img
              :src="slotProps.item.thumbnailImageSrc"
              :alt="slotProps.item.alt"
              class="gallery-thumbnail-image"
            />
          </div>
        </template>
      </Galleria>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 이미지를 동적으로 import하는 방법 (Vite 기준)
const getImageUrl = (imageName: string) => {
  return new URL(`/src/assets/images/${imageName}`, import.meta.url).href;
};

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
</script>

<style scoped>
.gallery-section {
  padding: 60px 20px;
  background: linear-gradient(to bottom, #fafafa 0%, #ffffff 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-header h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: 2.2rem;
  color: var(--accent-color);
  font-weight: 300;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.section-subtitle {
  font-size: 1rem;
  color: #666;
  font-weight: 300;
  line-height: 1.6;
}

.gallery-container {
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

/* Galleria 커스텀 스타일 */
:deep(.custom-galleria) {
  border-radius: 15px;
  overflow: hidden;
}

:deep(.p-galleria-content) {
  border-radius: 15px;
}

:deep(.p-galleria-item-wrapper) {
  border-radius: 15px;
  overflow: hidden;
}

.gallery-item-wrapper {
  width: 100%;
  height: 600px; /* 세로 이미지에 맞춰 높이 증가 */
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.gallery-main-image {
  width: auto;
  height: 100%;
  max-width: 100%;
  object-fit: contain; /* 이미지 전체가 보이도록 변경 */
  transition: transform 0.3s ease;
}

.gallery-main-image:hover {
  transform: scale(1.02);
}

.gallery-thumbnail-wrapper {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.gallery-thumbnail-wrapper:hover {
  border-color: var(--accent-color);
  transform: scale(1.05);
}

.gallery-thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .gallery-section {
    padding: 40px 15px;
  }

  .gallery-container {
    padding: 20px;
    margin: 0 10px;
  }

  .gallery-item-wrapper {
    height: 450px; /* 모바일에서는 조금 낮게 */
  }

  .section-header h2 {
    font-size: 1.8rem;
  }

  .gallery-thumbnail-wrapper {
    width: 60px;
    height: 60px;
  }

  :deep(.p-galleria-item-prev),
  :deep(.p-galleria-item-next) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .gallery-item-wrapper {
    height: 380px; /* 작은 화면에서 더 낮게 */
  }

  .gallery-thumbnail-wrapper {
    width: 50px;
    height: 50px;
  }

  :deep(.p-galleria-thumbnail-wrapper) {
    padding: 4px;
  }

  .gallery-container {
    padding: 15px;
  }
}
</style>
