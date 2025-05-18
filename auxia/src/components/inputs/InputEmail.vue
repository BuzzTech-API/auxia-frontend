<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Ref } from 'vue'

const props = defineProps<{
  /** valor do input (v-model) */
  modelValue: string
  /** ref do input, passada como prop */
  inputRef?: Ref<HTMLInputElement | null>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="input-group">
    <label for="email">Email</label>
    <input type="email" id="email" placeholder="email.example@gmail.com" class="input" :value="props.modelValue"
      @input="onInput" :ref="props.inputRef" />
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  margin-bottom: 4px;
}

.input {
  padding: 12px;
  border: none;
  width: 25rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: #333;
}
</style>