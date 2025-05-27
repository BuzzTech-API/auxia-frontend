import api from '@/services/api';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';



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
      const token = localStorage.getItem('access_token');
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
      // limpa qualquer token anterior
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')

      // monta o body x-www-form-urlencoded
      const form = new URLSearchParams()
      form.append('grant_type', 'password')
      form.append('username', email)
      form.append('password', password)


      try {
        const response = await api.post(
          '/oauth/token',
          form,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )

        // armazena tokens
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('refresh_token', response.data.refresh_token)


        return
      } catch (err: any) {
        // se veio um invalid_grant do backend, mostra erro amigável
        const errorCode = err.response?.data?.error
        if (errorCode === 'invalid_grant') {
          throw new Error('Email ou senha inválidos.')
        }
        // repassa qualquer outro erro
        throw err
      } finally {
        await this.getMe()
      }


    },
    async updateProfile(name?: string, newPassword?: string) {
      const token = localStorage.getItem('access_token');
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
      const token = localStorage.getItem('access_token');
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
          status: u.usr_is_active ? 'ativo' : 'inativo'
        }))

      }
    },
    async deleteByEmail(email: string) {
      const token = localStorage.getItem('access_token');
      const del = await api.delete(`/user/${email}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      if (del.status === 200) {
        this.getAll();
      }
    },

    async resetPassword(userEmail: string, newPassword: string) {
      const token = localStorage.getItem('access_token');
      const res = await api.patch(`/user/reset-password`,  // Remova o email da URL
        { 
          usr_email: userEmail,  // Email agora vai no body
          new_password: newPassword 
        }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return res;
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
  }
})
