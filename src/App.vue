<template>
  <div class="wedding-app">
    <div class="sections-container">
      <!-- 메인 커버 -->
      <MainCover :coupleNames="{ groomName: 'JUNWOO', brideName: 'HOYEON' }" />

      <!-- 인사말 -->
      <Greeting />

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

      <!-- 마무리 인사 -->
      <Closing />
    </div>

    <!-- 오디오 컨트롤 -->
    <div
      class="audio-control"
      :class="{ 'audio-on': isPlaying }"
      @click="toggleAudio"
    >
      <span v-if="isPlaying">🔊</span>
      <span v-else>🔇</span>
    </div>

    <!-- 배경 음악 -->
    <audio ref="bgMusic" loop>
      <source src="./assets/audio/bgm.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import MainCover from "./components/MainCover.vue";
import Greeting from "./components/Greeting.vue";
import CoupleIntro from "./components/CoupleIntro.vue";
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
</style>
