<template>
  <div class="wedding-app">
    <div class="sections-container">
      <!-- 메인 커버 -->
      <MainCover :coupleNames="{ groomName: 'JUNWOO', brideName: 'HOYEON' }" />

      <!-- 인사말 -->
      <Greeting />

      <!-- 커버 이미지 섹션 -->
      <div class="cover-image-section">
        <img
          src="./assets/images/cover.jpeg"
          alt="Wedding Cover"
          class="cover-image"
        />
      </div>

      <!-- 커버 날짜 -->
      <CoverDate />

      <!-- 캘린더 및 디데이 -->
      <Calendar />

      <!-- 신랑신부 소개 -->
      <CoupleIntro />

      <!-- 갤러리 -->
      <Gallery />

      <!-- 위치 -->
      <Location />

      <!-- 계좌 컴포넌트 -->
      <BankAccount />

      <!-- 커버 이미지 섹션 -->
      <div class="cover-image-section">
        <img
          src="./assets/images/cover2.jpeg"
          alt="Wedding Cover"
          class="cover-image"
        />
      </div>

      <!-- 마무리 인사 -->
      <Closing />
    </div>

    <!-- 오디오 컨트롤 -->
    <div
      class="audio-control"
      :class="{ 'audio-on': isPlaying }"
      @click="toggleAudio"
    >
      <span class="material-icons">{{
        isPlaying ? "volume_up" : "volume_off"
      }}</span>
    </div>

    <!-- 배경 음악 -->
    <audio ref="bgMusic" loop>
      <source src="./assets/audio/bgm.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import MainCover from "./components/MainCover.vue";
import Greeting from "./components/Greeting.vue";
import CoupleIntro from "./components/CoupleIntro.vue";
import CoverDate from "./components/CoverDate.vue";
import Calendar from "./components/Calendar.vue";
import Location from "./components/Location.vue";
import Gallery from "./components/Gallery.vue";
import Closing from "./components/Closing.vue";
import BankAccount from "./components/BankAccount.vue";

const bgMusic = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);

const toggleAudio = () => {
  if (!bgMusic.value) return;
  if (isPlaying.value) {
    bgMusic.value.pause();
  } else {
    bgMusic.value.play().catch((error) => {
      console.error("Audio play failed:", error);
    });
  }
  isPlaying.value = !isPlaying.value;
};

onMounted(() => {
  // 자동 재생 정책으로 인해 사용자의 첫 상호작용이 필요할 수 있음
  document.addEventListener(
    "click",
    () => {
      if (bgMusic.value && !isPlaying.value) {
        bgMusic.value
          .play()
          .catch((e) => console.log("Auto-play prevented:", e));
        isPlaying.value = true;
      }
    },
    { once: true }
  );
});
</script>

<style>
/* main.css를 import */
@import "./assets/styles/main.css";

/* Google Material Icons 폰트 import */
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

/* 커버 이미지 스타일 - 고정 높이로 변경 */
.cover-image-section {
  width: 100%;
  height: 857px; /* 고정 높이 설정 */
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  will-change: transform;
}

/* 작은 모바일 (iPhone SE 등) */
@media (max-width: 375px) {
  .cover-image-section {
    height: 600px;
  }
}

/* 오디오 컨트롤 아이콘 스타일 */
.audio-control .material-icons {
  font-size: 24px;
}
</style>
