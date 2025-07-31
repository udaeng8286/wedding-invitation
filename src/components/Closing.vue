<template>
  <section class="closing-section">
    <div class="closing-content">
      <div class="closing-message">
        <div class="message-text">
          <p>저희 두 사람의 시작을</p>
          <p>진심으로 축복해 주시는 모든 분들께</p>
          <p>머리숙여 깊은 감사드립니다.</p>
          <p>행복하게 잘 살겠습니다!</p>
        </div>
      </div>
    </div>

    <!-- 공유 버튼 영역 -->
    <div class="share-section">
      <div class="share-buttons">
        <button @click="shareKakao" class="share-button kakao-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 3C6.48 3 2 6.48 2 10.8c0 2.52 1.44 4.74 3.6 6.06L4.8 20.4c-.12.36.24.72.6.48l4.8-3.12c.54.06 1.08.12 1.8.12 5.52 0 10-3.48 10-7.8S17.52 3 12 3z"
            />
          </svg>
          <span>카카오톡 공유</span>
        </button>

        <button @click="copyLink" class="share-button link-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
            />
          </svg>
          <span>링크 복사</span>
        </button>
      </div>

      <!-- 복사 완료 메시지 -->
      <div v-if="showCopyMessage" class="copy-message">
        <p>링크가 복사되었습니다!</p>
      </div>
    </div>

    <div class="footer-info">
      <p class="footer-text">wedding invitation</p>
      <p class="footer-copyright">© 2025 JUNWOO ♥ HOYEON</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";

// 전역 타입 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

const showCopyMessage = ref(false);

// 카카오 SDK 초기화
onMounted(async () => {
  await nextTick();

  // 카카오 SDK 로드 대기
  const waitForKakao = () => {
    return new Promise((resolve) => {
      if (window.Kakao) {
        resolve(true);
        return;
      }

      let attempts = 0;
      const maxAttempts = 50; // 5초 대기

      const checkInterval = setInterval(() => {
        attempts++;
        if (window.Kakao) {
          clearInterval(checkInterval);
          resolve(true);
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          resolve(false);
        }
      }, 100);
    });
  };

  const kakaoLoaded = await waitForKakao();

  if (!kakaoLoaded) {
    console.error("카카오 SDK 로드 실패");
    return;
  }

  // 환경변수에서 앱키 가져오기
  const kakaoAppKey = import.meta.env.VITE_KAKAO_APP_KEY;

  if (!kakaoAppKey) {
    console.error("카카오 앱키가 설정되지 않았습니다. .env 파일을 확인하세요.");
    return;
  }

  try {
    // 이미 초기화되어 있다면 정리
    if (window.Kakao.isInitialized()) {
      window.Kakao.cleanup();
    }

    // 카카오 SDK 초기화
    window.Kakao.init(kakaoAppKey);

    if (window.Kakao.isInitialized()) {
      console.log("✅ 카카오 SDK 초기화 성공");
    } else {
      console.error("❌ 카카오 SDK 초기화 실패");
    }
  } catch (error) {
    console.error("카카오 SDK 초기화 중 오류:", error);
  }
});

// 카카오톡 공유하기
const shareKakao = () => {
  // SDK 로드 확인
  if (!window.Kakao) {
    console.error("카카오 SDK가 로드되지 않았습니다.");
    fallbackShare();
    return;
  }

  // 초기화 확인
  if (!window.Kakao.isInitialized()) {
    console.error("카카오 SDK가 초기화되지 않았습니다.");
    fallbackShare();
    return;
  }

  // Share 객체 확인
  if (!window.Kakao.Share) {
    console.error("카카오 Share 객체를 찾을 수 없습니다.");
    fallbackShare();
    return;
  }

  try {
    window.Kakao.Share.sendCustom({
      templateId: 122846,
      templateArgs: {
        title: "준우 ♥ 호연 결혼합니다",
        description:
          "저희 두 사람의 시작을 진심으로 축복해 주시는 모든 분들께 감사드립니다.",
        imageUrl: `${window.location.origin}/images/wedding-main.jpg`,
        webUrl: window.location.href,
      },
      installTalk: true,
      success: function (response) {
        console.log("✅ 카카오톡 공유 성공:", response);
      },
      fail: function (error) {
        console.error("❌ 카카오톡 공유 실패:", error);
        // 커스텀 템플릿 실패 시 기본 템플릿으로 재시도
        tryDefaultTemplate();
      },
    });
  } catch (error) {
    console.error("카카오톡 공유 중 오류:", error);
    tryDefaultTemplate();
  }
};

// 기본 템플릿으로 재시도
const tryDefaultTemplate = () => {
  try {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "준우 ♥ 호연 결혼합니다",
        description:
          "저희 두 사람의 시작을 진심으로 축복해 주시는 모든 분들께 감사드립니다.",
        imageUrl: `${window.location.origin}/images/wedding-main.jpg`,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "청첩장 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
      installTalk: true,
      success: function (response) {
        console.log("✅ 기본 템플릿 공유 성공:", response);
      },
      fail: function (error) {
        console.error("❌ 기본 템플릿 공유 실패:", error);
        fallbackShare();
      },
    });
  } catch (error) {
    console.error("기본 템플릿 공유 중 오류:", error);
    fallbackShare();
  }
};

// 공유 실패 시 대체 방법
const fallbackShare = () => {
  if (navigator.share) {
    navigator
      .share({
        title: "준우 ♥ 호연 결혼합니다",
        text: "저희 두 사람의 시작을 진심으로 축복해 주시는 모든 분들께 감사드립니다.",
        url: window.location.href,
      })
      .then(() => {
        console.log("✅ Web Share API 공유 성공");
      })
      .catch((error) => {
        console.log("Web Share API 실패, 링크 복사로 대체:", error);
        copyLink();
      });
  } else {
    console.log("Web Share API 미지원, 링크 복사 사용");
    copyLink();
  }
};

// 링크 복사하기
const copyLink = async () => {
  try {
    const currentUrl = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(currentUrl);
    } else {
      // 구형 브라우저 지원
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        console.log("✅ execCommand로 복사 성공");
      } else {
        throw new Error("execCommand 복사 실패");
      }
    }

    // 복사 완료 메시지 표시
    showCopyMessage.value = true;
    setTimeout(() => {
      showCopyMessage.value = false;
    }, 2000);
  } catch (error) {
    console.error("❌ 링크 복사 실패:", error);
    alert("링크 복사에 실패했습니다. 브라우저 주소창에서 직접 복사해 주세요.");
  }
};
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
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-color);
  margin-bottom: 40px;
  padding: 0 10px;
}

.message-text p {
  margin-bottom: 6px;
}

/* 공유 섹션 스타일 */
.share-section {
  max-width: 400px;
  margin: 50px auto;
  border-radius: 15px;
}

.share-title {
  font-size: 0.8rem;
  color: var(--text-color);
  margin-bottom: 20px;
  font-weight: 500;
}

.share-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.share-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
  justify-content: center;
}

.kakao-button {
  background-color: #fee500;
  color: #3c1e1e;
}

.kakao-button:hover {
  background-color: #fdd835;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(254, 229, 0, 0.4);
}

.link-button {
  background-color: #f8f9fa;
  color: #495057;
  border: 1px solid #dee2e6;
}

.link-button:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.copy-message {
  margin-top: 15px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border-radius: 8px;
  font-size: 0.9rem;
  animation: fadeInOut 2s ease-in-out;
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

@media (max-width: 480px) {
  .share-buttons {
    flex-direction: column;
    align-items: center;
  }

  .share-button {
    width: 100%;
    max-width: 200px;
  }

  .share-section {
    margin: 40px auto;
    padding: 25px 15px;
  }
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
}

/* 애니메이션 */
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

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0;
  }
  20%,
  80% {
    opacity: 1;
  }
}

.closing-content {
  animation: fadeInUp 1s ease-out;
}

.share-section {
  animation: fadeInUp 1s ease-out 0.3s both;
}
</style>
