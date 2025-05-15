import api from '@/services/api';
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      usr_email: "",
      usr_name: "",
      usr_is_adm: false,
      usr_is_active: true

    }
  },

  actions: {
    async getMe() {
      const token = localStorage.getItem('token');
      const me = await api.get("/user/me/", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      if (me.status === 200) {
        this.usr_email = me.data.usr_email
        this.usr_name = me.data.usr_name
        this.usr_is_adm = me.data.usr_is_adm
        this.usr_is_active = me.data.usr_is_active

      }
    },
    async login(email: string, password: string) {
      localStorage.removeItem("token")
      const request = await api.post("/token", {
        username: email,
        password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })

      if (request.status === 200) {
        localStorage.setItem("token", request.data.access_token)
        await this.getMe()
      }
    },
  }

})
