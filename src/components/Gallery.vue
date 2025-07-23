<template>
  <Galleria
    :value="images"
    :numVisible="3"
    :circular="true"
    style="max-width: 640px; margin: auto"
  >
    <template #item="slotProps">
      <img
        :src="slotProps.item.itemImageSrc"
        :alt="slotProps.item.alt"
        style="width: 100%; height: 400px; object-fit: cover"
      />
    </template>
    <template #thumbnail="slotProps">
      <img
        :src="slotProps.item.thumbnailImageSrc"
        :alt="slotProps.item.alt"
        style="width: 60px; height: 60px; object-fit: cover"
      />
    </template>
  </Galleria>
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
