<template>
  <section class="closing-section">
    <div class="closing-content">
      <div class="closing-message">
        <div class="message-text">
          <p>저희 두 사람의 시작을</p>
          <p>진심으로 축복해 주시는 모든 분들께</p>
          <p>머리숙여 깊은 감사드립니다.</p>
          <p>행복하게 잘 살겠습니다.</p>
        </div>
      </div>
    </div>

    <div class="footer-info">
      <p class="footer-text">wedding invitaion</p>
      <p class="footer-copyright">© 2025 JUNWOO ♥ HOYEON</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Closing",
});
</script>

<style scoped>
.closing-section {
  padding: 60px 20px 40px;
  background: linear-gradient(180deg, white 0%, #faf9f7 50%, #f5f3f0 100%);
  text-align: center;
  position: relative;
}

.closing-content {
  max-width: 400px;
  margin: 0 auto;
}

.closing-message h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: 30px;
  font-weight: 300;
  letter-spacing: 2px;
}

.message-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
  margin-bottom: 40px;
  padding: 0 10px;
}

.message-text p {
  margin-bottom: 6px;
}

.couple-signature {
  margin: 50px 0;
  padding: 30px 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.signature-line {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.8rem;
  margin-bottom: 15px;
  font-weight: 400;
  letter-spacing: 1px;
}

.groom-signature {
  color: #4a90e2;
}

.signature-divider {
  margin: 0 15px;
  color: var(--primary-color);
  font-style: italic;
}

.bride-signature {
  color: #e91e63;
}

.signature-date {
  font-size: 1.1rem;
  color: var(--accent-color);
  font-weight: 500;
}

.closing-decoration {
  margin: 40px 0;
}

.flower-decoration {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.blessing-text {
  font-size: 1rem;
  color: var(--accent-color);
  font-weight: 500;
  font-style: italic;
}

.footer-info {
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid #e9ecef;
}

.footer-text {
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 5px;
  font-weight: 300;
}

.footer-copyright {
  font-size: 0.8rem;
  color: #bbb;
  font-weight: 300;
  letter-spacing: 1px;
}

/* 배경 장식 효과 */
.closing-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--primary-color) 50%,
    transparent 100%
  );
}

.closing-section::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #ddd 50%,
    transparent 100%
  );
}

@media (max-width: 375px) {
  .closing-section {
    padding: 50px 15px 30px;
  }

  .closing-message h2 {
    font-size: 2.2rem;
  }

  .message-text {
    font-size: 1rem;
  }

  .signature-line {
    font-size: 1.6rem;
  }
}

/* 스크롤 애니메이션 효과 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.closing-content {
  animation: fadeInUp 1s ease-out;
}

.couple-signature {
  animation: fadeInUp 1s ease-out 0.3s both;
}

.closing-decoration {
  animation: fadeInUp 1s ease-out 0.6s both;
}
</style>
