<template>
  <div class="cover-date">
    <div class="date-text">
      <div class="month">NOV</div>
      <div class="day">09</div>
      <div class="year">2025</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 필요한 경우 props로 날짜를 받을 수 있도록 확장 가능
</script>

<style scoped>
.cover-date {
  width: 100%;
  height: 100vh;
  background-color: #deb6ab;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.date-text {
  text-align: center;
  color: white;
  font-weight: 300;
  letter-spacing: 8px;
}

.month {
  font-size: 4rem;
  line-height: 1;
  margin-bottom: 1rem;
}

.day {
  font-size: 8rem;
  line-height: 0.8;
  margin-bottom: 1rem;
  font-weight: 200;
}

.year {
  font-size: 4rem;
  line-height: 1;
}
</style>
