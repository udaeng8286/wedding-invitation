<template>
  <div class="wedding-app">
    <div class="sections-container">
      <MainCover :coupleNames="{ groomName: 'JUNWOO', brideName: 'HOYEON' }" />

      <!-- 계좌 컴포넌트 - URL 파라미터에 따라 조건부 렌더링 -->
      <BankAccount v-if="showBankAccount" :accounts="bankAccounts" />

      <!-- 다른 컴포넌트들도 여기에 추가 예정 -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import MainCover from "./components/MainCover.vue";
import BankAccount from "./components/BankAccount.vue";

export default defineComponent({
  name: "App",
  components: {
    MainCover,
    BankAccount,
  },
  setup() {
    const bgMusic = ref<HTMLAudioElement | null>(null);
    const isPlaying = ref(false);

    // URL 파라미터 확인해서 계좌 컴포넌트 표시 여부 결정
    const showBankAccount = computed(() => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("account") === "true";
    });

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

    // 갤러리 이미지
    const galleryImages = [
      {
        id: 1,
        src: "./assets/images/gallery/photo1.jpg",
        alt: "Wedding photo 1",
      },
      {
        id: 2,
        src: "./assets/images/gallery/photo2.jpg",
        alt: "Wedding photo 2",
      },
      {
        id: 3,
        src: "./assets/images/gallery/photo3.jpg",
        alt: "Wedding photo 3",
      },
      // 추가 이미지...
    ];

    // 결혼식 장소 정보
    const weddingLocation = {
      name: "호텔 그랜드 볼룸",
      address: "서울특별시 강남구 테헤란로 123",
      lat: 37.5665,
      lng: 126.978,
    };

    // 계좌 정보
    const bankAccounts = [
      {
        owner: "신랑 박준우",
        bank: "신한은행",
        accountNumber: "110-123-456789",
      },
      {
        owner: "신부 류호연",
        bank: "국민은행",
        accountNumber: "123-45-6789012",
      },
    ];

    return {
      bgMusic,
      isPlaying,
      toggleAudio,
      galleryImages,
      weddingLocation,
      bankAccounts,
      showBankAccount,
    };
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Noto+Serif+KR:wght@300;400;500&display=swap");

:root {
  --primary-color: #e0c9c1;
  --text-color: #333;
  --background-color: #fff9f5;
  --accent-color: #6d8b74;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Noto Serif KR", serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.wedding-app {
  max-width: 100%;
  margin: 0 auto;
  position: relative;
}

.sections-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.audio-control {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
  transition: all 0.3s ease;
}

.audio-control:hover,
.audio-control.audio-on {
  background-color: var(--primary-color);
  color: white;
}

@media (min-width: 768px) {
  .wedding-app {
    max-width: 480px; /* 모바일 청첩장 스타일 유지 */
  }
}
</style>
