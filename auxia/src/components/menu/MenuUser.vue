<template>
  <div>
    <Button class="menubutton" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
      <svg width="3rem" height="3rem" viewBox="0 0 76 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 38.625H74M2 20.5H74M2 2.375H74" stroke="#FDFDFD" stroke-width="3.5" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg></Button>
    <Menu ref="menu" class="menu" id="overlay_menu" :model="items" :popup="true">
      <template #item="{ item, props }">
        <a v-ripple class="flex items-center menu" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <Badge v-if="item.badge" class="ml-auto menu" :value="item.badge" />
          <span v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut
            }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { Button } from 'primevue';
import Menu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';

const userStore = useUserStore();
const menu = ref();
const router = useRouter();
const items = ref<MenuItem[]>([]);

watchEffect(() => {
  // Esse efeito reexecuta sempre que userStore.usr_is_adm mudar
  items.value = [
    {
      label: 'Chat', icon: 'pi pi-comment', command: () => {
        router.replace('/')
      }
    },
    { label: 'Perfil', icon: 'pi pi-user' },
    {
      label: 'Usuários',
      icon: 'pi pi-users',
      visible: userStore.usr_is_adm,
      command: () => {
        router.push('/AdminView')
      },
    },
    {
      label: 'Sair',
      icon: "pi pi-sign-out",
      command: async () => {
        localStorage.removeItem("token");
        await router.replace('/login');
      }
    },
  ]
});

onMounted(() => {
  // chama getMe se ainda não tiver carregado
  if (!userStore.usr_email) {
    userStore.getMe(); // sem await, para não travar renderização
  }
});

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<style lang="css" scoped>
.menu {
  background: #363636 !important;
  border: none !important;
  color: #FFF;
}

.menubutton {
  background-color: transparent !important;
  border-color: transparent !important;

  :active {
    background: #464646 !important;
    border-color: #464646 !important;
  }


  :hover {
    background: #363636 !important;
    border-color: #363636 !important;
  }


  ;
}
</style>
