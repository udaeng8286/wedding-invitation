<template>
  <section class="greeting-section">
    <div class="poem-container">
      <div class="poem-text">
        <p class="poem-line">하늘 아래 내가 받은</p>
        <p class="poem-line">가장 커다란 선물은</p>
        <p class="poem-line">오늘입니다.</p>
        <br />
        <p class="poem-line">오늘 받은 선물 가운데서도</p>
        <p class="poem-line">가장 아름다운 선물은</p>
        <p class="poem-line">당신입니다.</p>
        <p class="poem-author">- 선물, 나태주 -</p>
      </div>
    </div>

    <div
      class="invitation-container"
      ref="invitationRef"
      :class="{ visible: isVisible }"
    >
      <h2 class="invitation-title">Invitation</h2>
      <div class="couple-announcement">
        <h3>준우 & 호연 결혼합니다.</h3>
      </div>
      <div class="invitation-message">
        <p>만남에 사랑이 스며들어 저희 두 사람,</p>
        <p>사랑의 결실을 이루려 합니다.</p>
        <br />
        <p>가장 행복하고 아름다운 순간,</p>
        <p>소중한 분을 초대합니다.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const invitationRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const handleScroll = () => {
  if (!invitationRef.value) return;

  const rect = invitationRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 요소가 뷰포트에 들어오면 애니메이션 시작
  if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // 초기 체크
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.greeting-section {
  padding: 60px 20px;
  background-color: white;
  text-align: center;
}

.poem-container {
  margin-bottom: 50px;
  padding: 30px 20px;
  border-radius: 15px;
}

.poem-text {
  font-family: "Noto Serif KR", serif;
  color: var(--text-color);
  line-height: 1.8;
}

.poem-line {
  font-size: 1rem;
  margin-bottom: 8px;
  font-weight: 300;
}

.poem-author {
  margin-top: 20px;
  font-size: 0.9rem;
  color: var(--accent-color);
  font-weight: 400;
  font-style: italic;
}

.invitation-container {
  padding: 20px 0;
}

.invitation-title {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.5rem;
  color: var(--accent-color);
  margin-bottom: 30px;
  font-weight: 300;
  letter-spacing: 2px;
  opacity: 0.1;
  transition: opacity 0.8s ease-in-out;
  transition-delay: 0.1s;
}

.invitation-container.visible .invitation-title {
  opacity: 1;
}

.couple-announcement h3 {
  font-size: 1.4rem;
  color: var(--text-color);
  margin-bottom: 25px;
  font-weight: 500;
  opacity: 0.1;
  transition: opacity 0.8s ease-in-out;
  transition-delay: 0.4s;
}

.invitation-container.visible .couple-announcement h3 {
  opacity: 1;
}

.invitation-message {
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  max-width: 350px;
  margin: 0 auto;
  opacity: 0.1;
  transition: opacity 0.8s ease-in-out;
  transition-delay: 0.7s;
}

.invitation-container.visible .invitation-message {
  opacity: 1;
}

.invitation-message p {
  margin-bottom: 6px;
}
</style>
