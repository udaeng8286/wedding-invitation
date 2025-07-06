<template>
  <div class="bank-account-section">
    <div class="section-header">
      <h2>축의금 계좌번호</h2>
      <p>참석이 어려우신 분들을 위한 계좌번호입니다</p>
    </div>

    <div class="account-cards">
      <div
        v-for="account in accounts"
        :key="account.owner"
        class="account-card"
      >
        <div class="account-info">
          <h3>{{ account.owner }}</h3>
          <div class="bank-info">
            <span class="bank-name">{{ account.bank }}</span>
            <div class="account-number">
              <span>{{ account.accountNumber }}</span>
              <button
                @click="copyAccountNumber(account.accountNumber)"
                class="copy-btn"
              >
                복사
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="account-notice">
      <p>마음만으로도 충분합니다 💕</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface BankAccount {
  owner: string;
  bank: string;
  accountNumber: string;
}

export default defineComponent({
  name: "BankAccount",
  props: {
    accounts: {
      type: Array as PropType<BankAccount[]>,
      required: true,
    },
  },
  setup() {
    const copyAccountNumber = async (accountNumber: string) => {
      try {
        await navigator.clipboard.writeText(accountNumber);
        alert("계좌번호가 복사되었습니다");
      } catch (err) {
        console.error("복사 실패:", err);
        // 폴백: 텍스트 선택
        const textArea = document.createElement("textarea");
        textArea.value = accountNumber;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          alert("계좌번호가 복사되었습니다");
        } catch (fallbackErr) {
          console.error("폴백 복사도 실패:", fallbackErr);
        }
        document.body.removeChild(textArea);
      }
    };

    return {
      copyAccountNumber,
    };
  },
});
</script>

<style scoped>
.bank-account-section {
  padding: 40px 20px;
  background-color: #fafafa;
  margin: 20px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 1.8rem;
  color: var(--text-color);
  margin-bottom: 10px;
  font-weight: 500;
}

.section-header p {
  color: #666;
  font-size: 0.9rem;
}

.account-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.account-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
}

.account-info h3 {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 12px;
  font-weight: 500;
}

.bank-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bank-name {
  font-size: 1rem;
  color: var(--accent-color);
  font-weight: 500;
}

.account-number {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.account-number span {
  font-family: "Courier New", monospace;
  font-size: 1rem;
  color: var(--text-color);
  font-weight: 500;
}

.copy-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.copy-btn:hover {
  background-color: #d4b5ad;
}

.account-notice {
  text-align: center;
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid var(--primary-color);
}

.account-notice p {
  color: var(--accent-color);
  font-size: 1rem;
  font-weight: 500;
}

@media (min-width: 768px) {
  .account-cards {
    flex-direction: row;
    max-width: 600px;
  }

  .account-card {
    flex: 1;
  }
}
</style>
