<template>
  <section class="couple-intro-section">
    <div class="couple-container">
      <!-- 신랑 섹션 -->
      <div class="couple-section groom-section">
        <div class="couple-info">
          <div class="name-with-flower">
            <span class="couple-name">박남일</span>
            <span class="flower-icon"> | </span>
            <span class="korean-name">권혜숙</span>
            <span class="relation">의 아들</span>
          </div>
        </div>

        <div class="role-section">
          <div class="role-label">신랑</div>
          <div class="person-name">
            박준우 <span class="english-name">JUNWOO</span>
          </div>
        </div>
      </div>

      <!-- 구분선 -->
      <div class="divider-line"></div>

      <!-- 신부 섹션 -->
      <div class="couple-section bride-section">
        <div class="couple-info">
          <div class="name-with-flower">
            <span class="couple-name">류정원</span>
            <span class="flower-icon"> | </span>
            <span class="korean-name">최옥자</span>
            <span class="relation">의 딸</span>
          </div>
        </div>

        <div class="role-section">
          <div class="role-label">신부</div>
          <div class="person-name">
            류호연 <span class="english-name">HOYEON</span>
          </div>
        </div>
      </div>
    </div>

    <div class="contact-section">
      <button @click="openContactModal" class="contact-btn">
        축하 연락하기
        <span class="arrow">→</span>
      </button>
    </div>

    <!-- 연락 모달 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>축하 연락하기</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>

        <div class="modal-body">
          <div class="tab-buttons">
            <button
              @click="activeTab = 'groom'"
              :class="{ active: activeTab === 'groom' }"
              class="tab-btn"
            >
              신랑에게
            </button>
            <button
              @click="activeTab = 'bride'"
              :class="{ active: activeTab === 'bride' }"
              class="tab-btn"
            >
              신부에게
            </button>
          </div>

          <div class="contact-list">
            <div v-if="activeTab === 'groom'" class="contact-group">
              <div class="contact-item">
                <div class="contact-info">
                  <span class="contact-name">박준우</span>
                  <span class="contact-relation"></span>
                </div>
                <div class="contact-actions">
                  <button
                    @click="sendMessage('01033845761')"
                    class="action-btn message-btn"
                  >
                    문자 보내기
                  </button>
                  <button
                    @click="makeCall('01033845761')"
                    class="action-btn call-btn"
                  >
                    전화하기
                  </button>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-info">
                  <span class="contact-name">박남일</span>
                  <span class="contact-relation">아버지</span>
                </div>
                <div class="contact-actions">
                  <button
                    @click="sendMessage('01012345679')"
                    class="action-btn message-btn"
                  >
                    문자 보내기
                  </button>
                  <button
                    @click="makeCall('01012345679')"
                    class="action-btn call-btn"
                  >
                    전화하기
                  </button>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-info">
                  <span class="contact-name">권혜숙</span>
                  <span class="contact-relation">어머니</span>
                </div>
                <div class="contact-actions">
                  <button
                    @click="sendMessage('01012345680')"
                    class="action-btn message-btn"
                  >
                    문자 보내기
                  </button>
                  <button
                    @click="makeCall('01012345680')"
                    class="action-btn call-btn"
                  >
                    전화하기
                  </button>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'bride'" class="contact-group">
              <div class="contact-item">
                <div class="contact-info">
                  <span class="contact-name">류호연</span>
                  <span class="contact-relation"></span>
                </div>
                <div class="contact-actions">
                  <button
                    @click="sendMessage('01045970690')"
                    class="action-btn message-btn"
                  >
                    문자 보내기
                  </button>
                  <button
                    @click="makeCall('01045970690')"
                    class="action-btn call-btn"
                  >
                    전화하기
                  </button>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-info">
                  <span class="contact-name">류정원</span>
                  <span class="contact-relation">아버지</span>
                </div>
                <div class="contact-actions">
                  <button
                    @click="sendMessage('01087654322')"
                    class="action-btn message-btn"
                  >
                    문자 보내기
                  </button>
                  <button
                    @click="makeCall('01087654322')"
                    class="action-btn call-btn"
                  >
                    전화하기
                  </button>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-info">
                  <span class="contact-name">최옥자</span>
                  <span class="contact-relation">어머니</span>
                </div>
                <div class="contact-actions">
                  <button
                    @click="sendMessage('01087654323')"
                    class="action-btn message-btn"
                  >
                    문자 보내기
                  </button>
                  <button
                    @click="makeCall('01087654323')"
                    class="action-btn call-btn"
                  >
                    전화하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showModal = ref(false);
const activeTab = ref<"groom" | "bride">("groom");

const openContactModal = () => {
  showModal.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  showModal.value = false;
  document.body.style.overflow = "auto";
};

const sendMessage = (phoneNumber: string) => {
  const message = encodeURIComponent("준우♥호연 결혼을 축하합니다! 🎉");
  window.open(`sms:${phoneNumber}?body=${message}`, "_self");
};

const makeCall = (phoneNumber: string) => {
  window.open(`tel:${phoneNumber}`, "_self");
};
</script>

<style scoped>
.couple-intro-section {
  padding: 50px 20px;
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
}

.couple-container {
  max-width: 350px;
  margin: 0 auto 40px;
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.couple-section {
  text-align: center;
  padding: 20px 0;
}

.couple-info {
  margin-bottom: 25px;
}

.name-with-flower {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.couple-name {
  font-size: 1rem;
  color: var(--text-color);
  font-weight: 400;
}

.flower-icon {
  font-size: 1rem;
  color: #999;
}

.korean-name {
  font-size: 1rem;
  color: var(--text-color);
  font-weight: 400;
}

.relation {
  font-size: 0.9rem;
  color: #666;
  font-weight: 300;
}

.role-section {
  text-align: center;
}

.role-label {
  font-size: 1rem;
  color: var(--accent-color);
  font-weight: 500;
  margin-bottom: 10px;
}

.person-name {
  font-size: 1.4rem;
  color: var(--text-color);
  font-weight: 600;
}

.english-name {
  font-size: 0.8rem;
  color: #999;
  font-weight: 400;
  letter-spacing: 1px;
  margin-left: 8px;
}

.divider-line {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #ddd 20%,
    #ddd 80%,
    transparent 100%
  );
  margin: 20px 0;
}

.contact-section {
  text-align: center;
}

.contact-btn {
  background: linear-gradient(135deg, #d4b5ad 0%, #d4b5ad 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(184, 165, 217, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(184, 165, 217, 0.4);
}

.arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.contact-btn:hover .arrow {
  transform: translateX(3px);
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px 15px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  font-size: 1.3rem;
  color: var(--text-color);
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background-color: #f5f5f5;
}

.modal-body {
  padding: 20px 25px 25px;
}

.tab-buttons {
  display: flex;
  gap: 0;
  margin-bottom: 25px;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 4px;
}

.tab-btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: #666;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background-color: white;
  color: var(--text-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e9ecef;
}

.contact-info {
  margin-bottom: 15px;
}

.contact-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
}

.contact-relation {
  font-size: 0.9rem;
  color: var(--accent-color);
  margin-left: 8px;
}

.contact-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.message-btn {
  background-color: var(--primary-color);
  color: white;
}

.message-btn:hover {
  background-color: #d4b5ad;
}

.call-btn {
  background-color: var(--accent-color);
  color: white;
}

.call-btn:hover {
  background-color: #5a7560;
}

@media (max-width: 375px) {
  .couple-container {
    padding: 30px 20px;
  }

  .modal-content {
    margin: 10px;
  }

  .contact-actions {
    flex-direction: column;
  }
}
</style>
