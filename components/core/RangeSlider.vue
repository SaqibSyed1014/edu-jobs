<script setup lang="ts">
const props = defineProps<{
  minValue: number,
  maxValue: number

}>()
const minAngle = ref<number>(props.minValue);
const maxAngle = ref<number>(props.maxValue);

const sliderMin = computed({
  get: (): number => parseInt(minAngle.value.toString()),
  set: (val: number) => {
    val = parseInt(val.toString());
    if (val > maxAngle.value) {
      maxAngle.value = val;
    }
    minAngle.value = val;
  },
});

const sliderMax = computed({
  get: (): number => parseInt(maxAngle.value.toString()),
  set: (val: number) => {
    val = parseInt(val.toString());
    if (val < minAngle.value) {
      minAngle.value = val;
    }
    maxAngle.value = val;
  },
});
</script>

<template>
  <div class='range-slider'>
    <input type="range" :min="minValue" :max="maxValue" step="1" v-model="sliderMin">

    <input type="range" :min="minValue" :max="maxValue" step="1" v-model="sliderMax">

    <div class="absolute -bottom-8 flex justify-between w-full text-sm font-medium">
      <span>{{ `$${sliderMin}` }}</span>
      <span>{{ `$${sliderMax}+` }}</span>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.range-slider {
  width: 100%;
  margin: auto;
  text-align: center;
  position: relative;
  height: 20px;
}

.range-slider input[type=range] {
  position: absolute;
  left: 0;
  bottom: 0;
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]{
  @apply bg-brand-600
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 6px;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 2px solid theme('colors.brand.600');
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: white;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
}

</style>
