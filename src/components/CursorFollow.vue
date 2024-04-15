<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const base = {
  'pointer-events': 'none',
  'user-select': 'none',
  display: 'block',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  'border-radius': '100%',
  'z-index': 10000,
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.8) translate(-50%, -50%)'
    },
    '50%': {
      transform: 'scale(1) translate(-50%, -50%)'
    },
    '100%': {
      transform: 'scale(0.8) translate(-50%, -50%)'
    }
  }
}

const x = ref(0)
const y = ref(0)

const pulse = ref(false)
const size = ref(1)
const hollow = ref(false)
const color = ref('hsl(85, 44%, 49%)')
const opacity = ref(0.2)
const easing = ref('cubic-bezier(0.18, 0.89, 0.32, 1.28)')
const duration = ref(0.3)
const custom = ref(false)

const updateCursorPosition = (event) => {
  x.value = event.clientX
  y.value = event.clientY
}

onMounted(() => {
  document.addEventListener('mousemove', updateCursorPosition)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', updateCursorPosition)
})

const cursorStyles = computed(() => {
  const styles = {
    ...base,
    animation: pulse.value ? 'pulse 2s infinite' : null,
    backgroundColor: hollow.value ? 'transparent' : color.value,
    border: hollow.value ? '1px solid ' + color.value : null,
    opacity: opacity.value,
    width: size.value + 'rem',
    height: size.value + 'rem',
    top: y.value + 'px',
    left: x.value + 'px',
    transitionTimingFunction: easing.value,
    transitionDuration: duration.value + 's'
  }

  if (window.innerWidth <= 700) {
    styles.display = 'none'
  }

  return styles
})

const secondCursorStyles = computed(() => {
  const styles = {
    ...base,
    animation: pulse.value ? 'pulse 2s infinite' : null,
    backgroundColor: hollow.value ? 'transparent' : color.value,
    border: hollow.value ? '1px solid ' + color.value : null,
    opacity: opacity.value,
    width: size.value / 2 + 'rem',
    height: size.value / 2 + 'rem',
    top: y.value + 'px',
    left: x.value + 'px',
    transitionTimingFunction: easing.value,
    transitionDuration: duration.value * 1.8 + 's'
  }

  if (window.innerWidth <= 700) {
    styles.display = 'none'
  }

  return styles
})
</script>

<template>
  <div :style="cursorStyles" v-show="!custom"></div>
  <div :style="secondCursorStyles" v-show="!custom"></div>
</template>
