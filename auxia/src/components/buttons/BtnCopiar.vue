<template>
  <button class="copy-btn" @click="copyToClipboard" :title="copied ? 'Senha copiada!' : 'Copiar senha'">
    <span v-if="copied">✅</span>
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 18H8V7h11v16z"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  text: string
}>()

const copied = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch (err) {
    console.error('Erro ao copiar:', err)
  }
}
</script>

<style scoped>
.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  color: #6b7280; 
  display: inline-flex;
  align-items: center;
  padding: 4px;
}

.copy-btn:hover {
  color: #374151; 
}

.icon {
  width: 16px;
  height: 16px;
}
</style>
