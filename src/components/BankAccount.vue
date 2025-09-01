<template>
  <section class="bank-account-section">
    <div class="section-header">
      <h2>마음 전하실 곳</h2>
      <p>
        참석이 어려우신 분들을 위해 기재하였습니다.<br />너그러운 마음으로 양해
        부탁드립니다.
      </p>
    </div>

    <div class="button-container">
      <div class="button-group">
        <div class="label">To Groom</div>
        <button @click="openGroomModal" class="heart-btn groom-btn">
          신랑측 마음 전하기
        </button>
      </div>

      <div class="button-group">
        <div class="label">To Bride</div>
        <button @click="openBrideModal" class="heart-btn bride-btn">
          신부측 마음 전하기
        </button>
      </div>
    </div>

    <!-- 신랑측 모달 -->
    <div v-if="showGroomModal" class="modal-overlay" @click="closeGroomModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>신랑측 마음 전하기</h3>
          <button @click="closeGroomModal" class="close-btn">✕</button>
        </div>

        <div class="modal-body">
          <div class="account-list">
            <div
              v-for="account in groomAccounts"
              :key="account.name"
              class="account-item"
            >
              <div class="account-info">
                <span class="account-name">{{ account.name }}</span>
                <span class="account-role">{{ account.role }}</span>
              </div>
              <div class="account-details">
                <span class="bank-name">{{ account.bank }}</span>
                <span class="account-number">{{ account.accountNumber }}</span>
              </div>
              <button
                @click="copyAccountNumber(account.accountNumber)"
                class="copy-btn"
              >
                계좌 복사
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 신부측 모달 -->
    <div v-if="showBrideModal" class="modal-overlay" @click="closeBrideModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>신부측 마음 전하기</h3>
          <button @click="closeBrideModal" class="close-btn">✕</button>
        </div>

        <div class="modal-body">
          <!-- 일반 라우터: 메시지만 표시 -->
          <div v-if="!isAccountRoute" class="bride-message">
            <p>
              저희 딸이<br />
              귀하고 소중한 연인을 만나 사랑을 하고<br />
              한 가정을 이루고자 혼인의 예를 올립니다.<br />
              새 인생을 출발하는 두 사람을<br />
              가까이에서 함께 축복해 주시면<br />
              감사하겠습니다.<br />
              오셔서 맛있게 식사하시고 가세요.<br />
              축하는 마음으로만 받겠습니다.
            </p>
            <p class="highlight">축의금은 받지 않습니다.</p>
          </div>

          <!-- /?account=true 라우터: 신부 계좌만 표시 -->
          <div v-else class="account-list">
            <div class="account-item">
              <div class="account-info">
                <span class="account-name">류호연</span>
                <span class="account-role">신부</span>
              </div>
              <div class="account-details">
                <span class="bank-name">농협</span>
                <span class="account-number">351-0570-5134-93</span>
              </div>
              <button
                @click="copyAccountNumber('351-0570-5134-93')"
                class="copy-btn"
              >
                계좌 복사
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const showGroomModal = ref(false);
const showBrideModal = ref(false);

// URL 파라미터 확인
const isAccountRoute = computed(() => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("account") === "true";
});

// 신랑측 계좌 정보
const groomAccounts = [
  {
    role: "신랑",
    name: "박준우",
    bank: "농협",
    accountNumber: "751015-51-050631",
  },
  {
    role: "아버지",
    name: "박남일",
    bank: "농협",
    accountNumber: "792-12-138452",
  },
  {
    role: "어머니",
    name: "권혜숙",
    bank: "농협",
    accountNumber: "0108007576108",
  },
];

const openGroomModal = () => {
  showGroomModal.value = true;
  document.body.style.overflow = "hidden";
};

const closeGroomModal = () => {
  showGroomModal.value = false;
  document.body.style.overflow = "auto";
};

const openBrideModal = () => {
  showBrideModal.value = true;
  document.body.style.overflow = "hidden";
};

const closeBrideModal = () => {
  showBrideModal.value = false;
  document.body.style.overflow = "auto";
};

const copyAccountNumber = async (accountNumber: string) => {
  try {
    await navigator.clipboard.writeText(accountNumber);
    alert("계좌번호가 복사되었습니다.");
  } catch (err) {
    console.error("복사 실패:", err);
    // 폴백: 텍스트 선택
    const textArea = document.createElement("textarea");
    textArea.value = accountNumber;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      alert("계좌번호가 복사되었습니다.");
    } catch (fallbackErr) {
      console.error("폴백 복사도 실패:", fallbackErr);
    }
    document.body.removeChild(textArea);
  }
};
</script>

<style scoped>
.bank-account-section {
  padding: 60px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  text-align: center;
}

.section-header {
  margin-bottom: 40px;
}

.section-header h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.4rem;
  color: var(--accent-color);
  margin-bottom: 15px;
  font-weight: 300;
  letter-spacing: 1px;
}

.section-header p {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 300px;
  margin: 0 auto;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.label {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.1rem;
  color: #999;
  font-weight: 300;
  letter-spacing: 1px;
}

.heart-btn {
  padding: 15px 25px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, var(--primary-color) 0%, #d4b5ad 100%);
  color: white;
}

.heart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(224, 201, 193, 0.4);
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
  padding: 20px;
}

.account-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.account-item {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e9ecef;
}

.account-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.account-name {
  font-size: 1.1rem;
  color: var(--text-color);
  font-weight: 600;
}

.account-role {
  font-size: 0.9rem;
  color: var(--accent-color);
  font-weight: 500;
}

.account-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 15px;
}

.bank-name {
  font-size: 0.9rem;
  color: #666;
}

.account-number {
  font-family: "Courier New", monospace;
  font-size: 1rem;
  color: var(--text-color);
  font-weight: 500;
}

.copy-btn {
  width: 100%;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, var(--primary-color) 0%, #d4b5ad 100%);
  color: white;
}

.copy-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(224, 201, 193, 0.3);
}

.bride-message {
  text-align: center;
  line-height: 1.8;
  color: var(--text-color);
}

.bride-message p {
  margin-bottom: 20px;
  font-size: 1rem;
}

.bride-message .highlight {
  color: var(--accent-color);
  font-weight: 500;
}

@media (max-width: 375px) {
  .button-container {
    max-width: 280px;
  }
}
</style>
