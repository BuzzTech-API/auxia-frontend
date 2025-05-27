// src/types/user.ts

export interface UserDTO {
  id?: number;
  usr_name: string;
  usr_email: string;
  usr_is_adm: boolean;
  usr_is_active: boolean;
  type?: 'admin' | 'comum';
  status?: 'ativo' | 'inativo';
}

export interface UserCreateDTO {
  usr_name: string;
  usr_email: string;
  usr_password: string;
  usr_is_adm: boolean;
  usr_is_active: boolean;
}

export interface User {
  id: number;
  usr_name: string;
  usr_email: string;
  usr_is_adm: boolean;
  usr_is_active: boolean;
  type: 'admin' | 'comum';
  status: 'ativo' | 'inativo';
}
