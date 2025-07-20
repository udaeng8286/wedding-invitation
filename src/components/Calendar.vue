<template>
  <section class="calendar-section">
    <div class="section-header">
      <h2>Wedding Day</h2>
      <p class="wedding-datetime">Saturday, November 9, 2025 | PM 12:00</p>
    </div>

    <div class="calendar-container">
      <div class="calendar-header">
        <h3>November {{ currentYear }}</h3>
      </div>

      <div class="calendar-grid">
        <div class="day-header" v-for="day in dayHeaders" :key="day">
          {{ day }}
        </div>

        <div
          v-for="date in calendarDates"
          :key="date.date"
          class="calendar-date"
          :class="{
            'wedding-day': date.isWeddingDay,
            'other-month': date.isOtherMonth,
            today: date.isToday,
          }"
        >
          {{ date.date }}
        </div>
      </div>
    </div>

    <div class="countdown-container">
      <h3>D-Day</h3>
      <div class="countdown-display">
        <div class="countdown-item">
          <span class="count">{{ countdown.days }}</span>
          <span class="label">DAYS</span>
        </div>
        <div class="countdown-item">
          <span class="count">{{ countdown.hours }}</span>
          <span class="label">HOURS</span>
        </div>
        <div class="countdown-item">
          <span class="count">{{ countdown.minutes }}</span>
          <span class="label">MINUTES</span>
        </div>
        <div class="countdown-item">
          <span class="count">{{ countdown.seconds }}</span>
          <span class="label">SECONDS</span>
        </div>
      </div>
      <p class="countdown-message">{{ countdownMessage }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

const weddingDate = new Date(2025, 10, 9, 12, 0, 0); // 2025년 11월 9일 오후 12시
const currentTime = ref(new Date());
let interval: number | null = null;

const dayHeaders = ["일", "월", "화", "수", "목", "금", "토"];

const currentYear = computed(() => weddingDate.getFullYear());

const calendarDates = computed(() => {
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const dateObj = {
      date: date.getDate(),
      isWeddingDay: date.getTime() === new Date(2025, 10, 9).getTime(),
      isOtherMonth: date.getMonth() !== month,
      isToday: date.getTime() === today.getTime(),
    };

    dates.push(dateObj);
  }

  return dates;
});

const countdown = computed(() => {
  const now = currentTime.value.getTime();
  const wedding = weddingDate.getTime();
  const diff = wedding - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
});

const countdownMessage = computed(() => {
  const total =
    countdown.value.days +
    countdown.value.hours +
    countdown.value.minutes +
    countdown.value.seconds;
  if (total <= 0) {
    return "🎉 결혼식이 진행 중입니다! 🎉";
  }
  return `준우 ♥ 호연의 결혼식이 ${countdown.value.days}일 남았습니다`;
});

const updateTime = () => {
  currentTime.value = new Date();
};

onMounted(() => {
  updateTime();
  interval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<style scoped>
.calendar-section {
  padding: 50px 20px;
  background: linear-gradient(135deg, #fef7f0 0%, #faf0e6 100%);
  text-align: center;
}

.section-header h2 {
  font-family: "Cormorant Garamond", serif;
  font-size: 2.2rem;
  color: var(--accent-color);
  margin-bottom: 15px;
  font-weight: 300;
  letter-spacing: 1px;
}

.wedding-datetime {
  font-size: 1.1rem;
  color: var(--text-color);
  margin-bottom: 40px;
  font-weight: 400;
}

.calendar-container {
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin: 30px auto;
  max-width: 350px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.calendar-header h3 {
  font-size: 1.4rem;
  color: var(--text-color);
  margin-bottom: 20px;
  font-weight: 500;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.day-header {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent-color);
  padding: 10px 0;
  text-align: center;
}

.calendar-date {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calendar-date.other-month {
  color: #ccc;
}

.calendar-date.today {
  background-color: var(--accent-color);
  color: white;
  font-weight: 600;
}

.calendar-date.wedding-day {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
  transform: scale(1.1);
  box-shadow: 0 2px 10px rgba(224, 201, 193, 0.5);
}

.countdown-container {
  margin-top: 40px;
}

.countdown-container h3 {
  font-size: 1.5rem;
  color: var(--accent-color);
  margin-bottom: 20px;
  font-weight: 500;
}

.countdown-display {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.countdown-item {
  background: white;
  border-radius: 12px;
  padding: 15px 10px;
  width: 70px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.countdown-item .count {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 2px;
}

.countdown-item .label {
  font-size: 0.7rem;
  color: #666;
  font-weight: 500;
  letter-spacing: 1px;
}

.countdown-message {
  font-size: 1rem;
  color: var(--text-color);
  font-weight: 500;
  background: white;
  padding: 15px 20px;
  border-radius: 25px;
  display: inline-block;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 375px) {
  .calendar-container {
    padding: 20px 15px;
  }

  .countdown-display {
    gap: 8px;
  }

  .countdown-item {
    width: 60px;
    padding: 12px 8px;
  }

  .countdown-item .count {
    font-size: 1.3rem;
  }

  .countdown-item .label {
    font-size: 0.6rem;
  }
}
</style>
