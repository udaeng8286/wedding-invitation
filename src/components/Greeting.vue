<template>
  <section class="greeting-section">
    <div class="poem-container">
      <div class="poem-text">
        <p class="poem-line">하늘 아래 내가 받은</p>
        <p class="poem-line">가장 커다란 선물은</p>
        <p class="poem-line">오늘입니다.</p>
        <p class="poem-line">오늘 받은 선물 가운데서도</p>
        <p class="poem-line">가장 아름다운 선물은</p>
        <p class="poem-line">당신입니다.</p>
        <p class="poem-author">- 선물, 나태주 -</p>
      </div>
    </div>

    <div class="invitation-container">
      <h2 class="invitation-title">Invitation</h2>
      <div class="couple-announcement">
        <h3>준우 & 호연 결혼합니다.</h3>
      </div>
      <div class="invitation-message">
        <p>만남에 사랑이 스며들어 저희 두 사람,</p>
        <p>사랑의 결실을 이루려 합니다.</p>
        <p>가장 행복하고 아름다운 순간,</p>
        <p>소중한 분을 초대합니다.</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Greeting",
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
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  border-left: 4px solid var(--primary-color);
}

.poem-text {
  font-family: "Noto Serif KR", serif;
  color: var(--text-color);
  line-height: 1.8;
}

.poem-line {
  font-size: 1.1rem;
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
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: 30px;
  font-weight: 300;
  letter-spacing: 2px;
}

.couple-announcement h3 {
  font-size: 1.4rem;
  color: var(--text-color);
  margin-bottom: 25px;
  font-weight: 500;
}

.invitation-message {
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  max-width: 350px;
  margin: 0 auto;
}

.invitation-message p {
  margin-bottom: 6px;
}

@media (max-width: 375px) {
  .greeting-section {
    padding: 40px 15px;
  }

  .invitation-title {
    font-size: 2.2rem;
  }

  .poem-line {
    font-size: 1rem;
  }
}
</style>
