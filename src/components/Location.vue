<template>
  <section class="location-section">
    <div class="section-header">
      <h2>LOCATION</h2>
      <p class="section-subtitle">오시는 길</p>
    </div>

    <!-- 카카오맵 -->
    <div class="map-container">
      <div id="kakaoMap" ref="mapContainer"></div>
    </div>

    <!-- 주소 정보 -->
    <div class="address-info">
      <div class="venue-name">그랜드컨벤션웨딩 1층 컨벤션 홀</div>
      <div class="address-container">
        <div class="address">경북 영주시 원당로 80</div>
        <button
          @click="copyAddress"
          class="copy-btn"
          :class="{ copied: isCopied }"
        >
          <span class="material-icons">{{
            isCopied ? "check" : "content_copy"
          }}</span>
        </button>
      </div>
    </div>

    <!-- 교통 안내 -->
    <div class="transport-info">
      <!-- 기차 -->
      <div class="transport-item">
        <div class="transport-icon">
          <span class="material-icons">train</span>
        </div>
        <div class="transport-content">
          <h3>기차</h3>
          <div class="transport-detail">
            <strong>영주역</strong>
            <p>도보 이용 시 약 20분 소요</p>
            <p>택시 이용 시 약 5분 소요</p>
          </div>
        </div>
      </div>

      <!-- 고속버스 -->
      <div class="transport-item">
        <div class="transport-icon">
          <span class="material-icons">directions_bus</span>
        </div>
        <div class="transport-content">
          <h3>고속버스</h3>
          <div class="transport-detail">
            <strong>영주종합터미널</strong>
            <p>택시 이용 시 약 10분 소요</p>
            <p>버스 이용 시 약 20분 소요 (1번, 3번)</p>
          </div>
        </div>
      </div>

      <!-- 주차 -->
      <div class="transport-item">
        <div class="transport-icon">
          <span class="material-icons">local_parking</span>
        </div>
        <div class="transport-content">
          <h3>주차</h3>
          <div class="transport-detail">
            <strong>그랜드컨벤션웨딩 내 주차 가능</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- 네비게이션 버튼들 -->
    <div class="navigation-buttons">
      <button @click="openKakaoMap" class="nav-btn kakao-btn">카카오맵</button>
      <button @click="openNaverMap" class="nav-btn naver-btn">
        네이버지도
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const mapContainer = ref<HTMLElement | null>(null);
const isCopied = ref(false);
let map: any = null;

// 웨딩홀 좌표 (그랜드컨벤션웨딩 - 경북 영주시 원당로 80)
// 주소 검색을 통해 정확한 좌표를 가져오도록 수정
const VENUE_COORDS = {
  lat: 0, // 주소 검색 후 설정
  lng: 0, // 주소 검색 후 설정
};

const VENUE_ADDRESS = "경북 영주시 원당로 80";
const VENUE_NAME = "그랜드컨벤션웨딩";

// 카카오맵 초기화
const initKakaoMap = () => {
  if (!window.kakao || !window.kakao.maps) {
    console.error("Kakao Maps API not loaded");
    return;
  }

  const container = mapContainer.value;
  if (!container) return;

  // 주소-좌표 변환 객체 생성
  const geocoder = new window.kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색
  geocoder.addressSearch(VENUE_ADDRESS, (result: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

      // 찾은 좌표를 VENUE_COORDS에 저장
      VENUE_COORDS.lat = parseFloat(result[0].y);
      VENUE_COORDS.lng = parseFloat(result[0].x);

      const options = {
        center: coords,
        level: 3,
      };

      map = new window.kakao.maps.Map(container, options);

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: coords,
      });

      marker.setMap(map);

      // 인포윈도우 생성
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;text-align:center;">
                    <strong>${VENUE_NAME}</strong><br>
                    ${VENUE_ADDRESS}
                  </div>`,
      });

      infowindow.open(map, marker);
    } else {
      console.error("주소 검색 실패:", status);
      // 기본 좌표로 fallback (영주시 중심)
      const fallbackCoords = new window.kakao.maps.LatLng(36.8058, 128.6241);
      const options = {
        center: fallbackCoords,
        level: 5,
      };
      map = new window.kakao.maps.Map(container, options);
    }
  });
};

// 외부 지도 앱 열기
const openKakaoMap = () => {
  const url = `https://map.kakao.com/link/search/${encodeURIComponent(
    VENUE_ADDRESS
  )}`;
  window.open(url, "_blank");
};

const openNaverMap = () => {
  const url = `https://map.naver.com/v5/search/${encodeURIComponent(
    VENUE_ADDRESS
  )}`;
  window.open(url, "_blank");
};

// 주소 복사 기능
const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(VENUE_ADDRESS);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    // 구형 브라우저 대응
    const textArea = document.createElement("textarea");
    textArea.value = VENUE_ADDRESS;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  }
};

// 카카오맵 API 로드
const loadKakaoMapScript = () => {
  return new Promise<void>((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=5b1ea4a99098520087e04d221dddd112&autoload=false&libraries=services";

    script.onload = () => {
      window.kakao.maps.load(() => {
        resolve();
      });
    };

    script.onerror = () => {
      reject(new Error("Kakao Maps API failed to load"));
    };

    document.head.appendChild(script);
  });
};

onMounted(async () => {
  try {
    await loadKakaoMapScript();
    initKakaoMap();
  } catch (error) {
    console.error("Failed to load Kakao Maps:", error);
  }
});
</script>

<style scoped>
/* Google Material Icons 폰트 import */
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.location-section {
  padding: 40px 20px;
  background-color: var(--background-color);
}

.section-header {
  text-align: center;
  margin-bottom: 30px;
}

.section-header h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.8rem;
  color: var(--accent-color);
  font-weight: 300;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.section-subtitle {
  font-size: 0.9rem;
  color: #666;
  font-weight: 300;
  line-height: 1.6;
}

.map-container {
  width: 100%;
  max-width: 380px;
  height: 250px;
  margin: 0 auto 20px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

#kakaoMap {
  width: 100%;
  height: 100%;
}

.address-info {
  text-align: center;
  margin-bottom: 30px;
  border-radius: 15px;
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
}

.venue-name {
  font-size: 1rem;
  color: #666;
  margin-bottom: 5px;
}

.address-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.address {
  font-size: 0.9rem;
  color: #666;
}

.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #666;
}

.copy-btn:hover {
  background-color: #f0f0f0;
  color: var(--accent-color);
}

.copy-btn.copied {
  color: #4caf50;
}

.copy-btn .material-icons {
  font-size: 1rem;
}

.transport-info {
  max-width: 380px;
  margin: 0 auto 30px;
}

.transport-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: white;
  border-radius: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.transport-icon {
  margin-right: 15px;
  margin-top: 2px;
}

.transport-icon .material-icons {
  font-size: 1.5rem;
  color: var(--accent-color);
}

.transport-content {
  flex: 1;
}

.transport-content h3 {
  font-size: 1rem;
  color: var(--accent-color);
  margin-bottom: 8px;
  font-weight: 500;
}

.transport-detail strong {
  color: #333;
  font-size: 0.9rem;
}

.transport-detail p {
  margin: 5px 0;
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
}

.navigation-buttons {
  display: flex;
  gap: 10px;
  max-width: 380px;
  margin: 0 auto;
}

.nav-btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.kakao-btn {
  background-color: #fee500;
  color: #3c1e1e;
}

.naver-btn {
  background-color: #03c75a;
  color: white;
}

.nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* 모바일 최적화 */
@media (max-width: 430px) {
  .location-section {
    padding: 30px 15px;
  }

  .section-header h2 {
    font-size: 1.6rem;
  }

  .section-subtitle {
    font-size: 0.85rem;
  }

  .map-container {
    max-width: 100%;
    margin: 0 0 20px;
  }

  .address-info,
  .transport-info,
  .navigation-buttons {
    max-width: 100%;
  }

  .transport-item {
    padding: 15px;
  }

  .navigation-buttons {
    flex-direction: column;
  }

  .nav-btn {
    padding: 14px 16px;
  }
}

@media (max-width: 375px) {
  .location-section {
    padding: 25px 10px;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .transport-item {
    padding: 12px;
  }

  .transport-icon .material-icons {
    font-size: 1.3rem;
  }

  .transport-icon {
    margin-right: 12px;
  }
}
</style>
