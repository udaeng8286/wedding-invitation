<template>
  <div class="cover-date" ref="coverDateRef" :class="{ visible: isVisible }">
    <div class="date-text">
      <div class="month" :class="{ animate: isVisible }">NOV</div>
      <div class="day" :class="{ animate: isVisible }">09</div>
      <div class="year" :class="{ animate: isVisible }">2025</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const coverDateRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const handleScroll = () => {
  if (!coverDateRef.value) return;

  const rect = coverDateRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 요소가 뷰포트에 30% 이상 들어왔을 때 애니메이션 시작
  // 요소가 뷰포트를 벗어나면 애니메이션 리셋
  if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
    isVisible.value = true;
  } else {
    isVisible.value = false; // 뷰포트를 벗어나면 리셋
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  // 초기 체크
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.cover-date {
  width: 100%;
  min-height: 932px;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  position: relative;
  overflow: hidden;
  transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.cover-date.visible {
  background-color: #deb6ab;
}

.date-text {
  text-align: center;
  color: white;
  font-weight: 300;
  letter-spacing: 8px;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.1s;
}

.cover-date.visible .date-text {
  opacity: 1;
  transform: translateY(0);
}

.month,
.day,
.year {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.month {
  font-size: 4rem;
  line-height: 1;
  margin-bottom: 1rem;
  transition-delay: 0.2s;
}

.day {
  font-size: 8rem;
  line-height: 0.8;
  margin-bottom: 1rem;
  font-weight: 200;
  transition-delay: 0.3s;
}

.year {
  font-size: 4rem;
  line-height: 1;
  transition-delay: 0.4s;
}

.month.animate,
.day.animate,
.year.animate {
  opacity: 1;
  transform: translateY(0);
}

/* 호버 효과 */
.cover-date.visible:hover .date-text {
  transform: scale(1.02);
  letter-spacing: 10px;
  transition: all 0.2s ease;
}

/* 반응형 */
@media (max-width: 768px) {
  .month {
    font-size: 3rem;
  }

  .day {
    font-size: 6rem;
  }

  .year {
    font-size: 3rem;
  }

  .date-text {
    letter-spacing: 4px;
  }
}
</style>
