<template>
  <section class="cover-section">
    <div class="cover-background">
      <div class="overlay"></div>
      <div class="cover-content">
        <h1 class="couple-names">
          <span class="groom-name">{{ coupleNames.groomName }}</span>
          <span class="ampersand">&</span>
          <span class="bride-name">{{ coupleNames.brideName }}</span>
        </h1>
        <p class="wedding-date">2025.11.09</p>
        <p class="wedding-location">일요일 오후 12시 | 그랜드컨벤션웨딩</p>
        <div class="scroll-indicator">
          <span>↓</span>
          <p>스크롤하여 더 보기</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface CoupleNames {
  groomName: string;
  brideName: string;
}

export default defineComponent({
  name: "CoverSection",
  props: {
    coupleNames: {
      type: Object as PropType<CoupleNames>,
      required: true,
    },
  },
});
</script>

<style scoped>
.cover-section {
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.cover-background {
  height: 100%;
  width: 100%;
  background-image: url("../assets/images/mainCover.jpeg");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
}

.cover-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 0 20px;
}

.couple-names {
  font-family: "Cormorant Garamond", serif;
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 4px;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.ampersand {
  padding: 0 10px;
  font-style: italic;
}

.wedding-date {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.wedding-location {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.scroll-indicator {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
  text-align: center;
  opacity: 0.8;
}

.scroll-indicator span {
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
}

.scroll-indicator p {
  font-size: 0.8rem;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-10px) translateX(-50%);
  }
  60% {
    transform: translateY(-5px) translateX(-50%);
  }
}
</style>
