<template>
  <!-- NAVBAR CUSTOM -->
  <div class="w-full mt-0 h-[6rem] bg-[#363636] text-white
           shadow-[4px_4px_rgba(54,54,54,0.75)] flex !justify-between items-center px-12 z-50">
    <!-- SLOT “START” -->
    <div>
      <RouterLink to="/">
        <img src="/logo2.png" class="h-20 cursor-pointer" alt="Logo" />
      </RouterLink>
    </div>

    <div class="tituloBox">
      <h1>{{ routeName }}</h1>
    </div>

    <!-- ITEMS -->
    <ul class="flex !justify-end items-center gap-4 text-xl">
      <li v-for="item in items" :key="item.label" :class="{ 'hidden': !item.visible }">
        <button v-ripple class="flex items-center gap-2 p-2 hover:bg-[#464646] rounded" @click="item.command">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <Badge v-if="item.badge" class="ml-2" :value="item.badge" />
          <span v-if="item.shortcut" class="ml-2 border border-surface rounded
                   bg-emphasis text-muted-color text-xs p-1">
            {{ item.shortcut }}
          </span>
          <i v-if="item.items" :class="[
            'pi',
            hasSubmenu(item) ? 'pi-angle-down' : '',
            !hasSubmenu(item) ? 'pi-angle-right' : ''
          ]" class="ml-2" />
        </button>
      </li>
    </ul>

    <Toast position="top-center" />
  </div>

  <!-- DRAWER DE PERFIL -->
  <Drawer v-model:visible="visible" class="!w-[36rem] !bg-[#42424B] !text-white !border-none">
    <template #header>
      <div class="flex items-center gap-2">
        <h2 class="font-bold text-2xl">{{ userStore.usr_name }}</h2>
      </div>
    </template>

    <div class="flex flex-col p-4 gap-4">
      <label>Email</label>
      <InputText id="emailInput" :value="userStore.usr_email" type="text" disabled />

      <label>Nome</label>
      <InputText id="nameInput" v-model="name" type="text" :disabled="!isEditable" />
      <small v-if="nameError" class="text-red-400">
        Nome é obrigatório e deve ter ao menos 3 caracteres.
      </small>

      <label>Senha Nova</label>
      <InputText id="newPasswordInput" v-model="password" type="password" :disabled="!isEditable" />
      <small v-if="passwordError" class="text-red-400">
        A senha deve ter no mínimo 8 caracteres, incluir ao menos um número
        e um caractere especial.
      </small>

      <label>Confirmar Senha Nova</label>
      <InputText id="confirmPasswordInput" v-model="passwordNew" type="password" :disabled="!isEditable" />
      <small v-if="confirmError" class="text-red-400">
        As senhas não coincidem.
      </small>
    </div>

    <template #footer>
      <div class="flex items-center gap-4 justify-between">
        <Button label="Editar" @click="editableActivate"
          class="flex w-40 !border-none !bg-[#E0D500] !font-bold !text-black" />

        <Button label="Salvar" class="flex w-40 !border-none !font-bold !bg-[#9800E0]" :disabled="!isFormValid"
          @click="saveProfile" />
      </div>
    </template>
  </Drawer>

</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Drawer from 'primevue/drawer'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import InputText from 'primevue/inputtext'
import type { MenuItem } from 'primevue/menuitem'
import { RouterLink } from 'vue-router'
import api from '@/services/api'


const userStore = useUserStore()
const router = useRouter()
const toast = useToast()

// controle do drawer e edição
const visible = ref(false)
const isEditable = ref(false)

// campos do perfil
const name = ref('')
const password = ref('')
const passwordNew = ref('')

// sempre que abrir o drawer, reseta os valores
watchEffect(() => {
  if (visible.value) {
    name.value = userStore.usr_name
    password.value = ''
    passwordNew.value = ''
  }
})

const routeName = computed(() => {
  let name = router.currentRoute.value.name
  if (name === "norag") {
    name = "Chat"
    return typeof name === 'string' ? name : undefined
  }else if( name === "rag"){
    name = "Chat"
    return typeof name === 'string' ? name : undefined
  }
  else {
    return typeof name === 'string' ? name : undefined
  }
})

// validações
const isNameValid = computed(() => name.value.trim().length >= 3)
const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/
const isPasswordValid = computed(
  () => password.value === '' || passwordPattern.test(password.value)
)
const isPasswordMatch = computed(
  () => password.value === '' || password.value === passwordNew.value
)

// detecta alterações
const hasNameChanged = computed(
  () => name.value.trim() !== userStore.usr_name
)
const hasPasswordChanged = computed(() => password.value !== '')

// só habilita salvar se algo mudou e as validações passaram
const isFormValid = computed(() => {
  if (!isEditable.value) return false
  if (!hasNameChanged.value && !hasPasswordChanged.value) return false

  const nameOk = !hasNameChanged.value || isNameValid.value
  const passOk =
    !hasPasswordChanged.value || (isPasswordValid.value && isPasswordMatch.value)
  return nameOk && passOk
})

const nameError = computed(
  () => isEditable.value && hasNameChanged.value && !isNameValid.value
)
const passwordError = computed(
  () => isEditable.value && password.value !== '' && !isPasswordValid.value
)
const confirmError = computed(
  () => isEditable.value && passwordNew.value !== '' && !isPasswordMatch.value
)

function editableActivate() {
  isEditable.value = !isEditable.value
  if (!isEditable.value) {
    name.value = userStore.usr_name
    password.value = ''
    passwordNew.value = ''
  }
}

async function saveProfile() {
  if (!isFormValid.value) return
  try {
    await userStore.updateProfile(
      hasNameChanged.value ? name.value.trim() : undefined,
      hasPasswordChanged.value ? password.value : undefined
    )
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Perfil atualizado!',
      life: 3000,
    })
    isEditable.value = false
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao atualizar perfil.',
      life: 3000,
    })
  }
}

onMounted(() => {
  if (!userStore.usr_email) {
    userStore.getMe()
  }
})

// Itens do menu
const items = ref<MenuItem[]>([])
watchEffect(() => {
  items.value = [
    {
      label: 'Chat',
      icon: 'pi pi-comment',
      visible: true,
      command: () => router.replace('/'),
    },
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      visible: true,
      command: () => (visible.value = true),
    },
    {
      label: 'Usuários',
      icon: 'pi pi-users',
      visible: userStore.usr_is_adm,
      command: () => router.push('/AdminView'),
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      visible: true,
      command: async () => {
        localStorage.removeItem('access_token')
        try {
          const refresh_token = localStorage.getItem('refresh_token')
          const form = new URLSearchParams()
          if (refresh_token) {
            form.append("refresh_token", refresh_token)
            await api.post('/oauth/revoke', form, )
            localStorage.removeItem('refresh_token')
          }

        } catch (error) {

        }finally{
          userStore.$reset()
          return await router.replace({name:'login'})
        }

      },
    },
  ]
})

// helper (se você quiser tratar submenus futuramente)
function hasSubmenu(item: MenuItem) {
  return Array.isArray((item as any).items) && (item as any).items.length > 0
}
</script>

<style scoped>
.text-red-400 {
  color: #f87171;
  font-size: 0.875rem;
}
.tituloBox {
  font-size: 40px;
  font-weight: bold;
  margin-left: 10%;
}
</style>
