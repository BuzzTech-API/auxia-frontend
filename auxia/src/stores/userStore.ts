import api from '@/services/api';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      usr_email: "",
      usr_name: "",
      usr_is_adm: false,
      usr_is_active: true,
      usrs: [] as any[]
    }
  },


  actions: {
    async getMe() {
      const token = localStorage.getItem('token');
      const me = await api.get('/user/me/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (me.status === 200) {
        this.usr_email = me.data.usr_email;
        this.usr_name = me.data.usr_name;
        this.usr_is_adm = me.data.usr_is_adm;
        this.usr_is_active = me.data.usr_is_active;
      }
    },

    async login(email: string, password: string) {
      localStorage.removeItem('token');
      const request = await api.post(
        '/token',
        { username: email, password },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      if (request.status === 200) {
        localStorage.setItem('token', request.data.access_token);
        await this.getMe();
      } else if (request.status === 401) {
        throw new Error('Credenciais inválidas');
      }
    },

    async updateProfile(name?: string, newPassword?: string) {
      const token = localStorage.getItem('token');
      // Monta o payload apenas com os campos não vazios
      const payload: Record<string, unknown> = {};
      if (name?.trim()) {
        payload.usr_name = name.trim();
      }
      if (newPassword?.trim()) {
        payload.usr_password = newPassword.trim();
      }

      // Se não tiver nada para atualizar, sai sem chamar a API
      if (Object.keys(payload).length === 0) {
        return;
      }

      // Chama a rota PATCH /user/
      const res = await api.patch('/user/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        // Atualiza o estado local com o que veio do backend
        this.usr_name = res.data.usr_name;
        this.usr_is_adm = res.data.usr_is_adm;
        this.usr_is_active = res.data.usr_is_active;
      }

      return res;
    },
    
    async getAll() {
      const token = localStorage.getItem('token');
      const all = await api.get("/user", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      if (all.status === 200) {
        this.usrs = all.data.map((u: any) => ({
        name: u.usr_name,
        email: u.usr_email,
        type: u.usr_is_adm ? 'admin' : 'comum',
        status: u.usr_is_active ? true : false
      }))
      }
    },
    async deleteByEmail(email: string) {
      const token = localStorage.getItem('token');
      const del = await api.delete(`/user/${email}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      if (del.status === 200) {
        this.getAll();
      }
    }
    
    //Simular resposta da requisição para testar fluxo de atualizar a lista ao deletar usuário
    /*async deleteByEmail(email: string) {
      // Simulando atraso e sucesso como se fosse uma chamada real
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          // Remove o usuário da lista local como se tivesse sido deletado
          this.usrs = this.usrs.filter(u => u.email !== email);
          resolve();
        }, 500); // tempo simulado de resposta da API
      });
    },*/
  }})