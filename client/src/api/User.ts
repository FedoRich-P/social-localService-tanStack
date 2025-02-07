import { User, UserAuth, UserSchema } from '../types/User.ts';
import axios from 'axios';
import { validateResponse } from './validateResponse.ts';

export function fetchUser(id: string): Promise<User> {
  return axios.get(`/api/users/${id}`).then(res => UserSchema.parse(res.data));
}

export function registerUser({ username, password }: UserAuth) {
  return axios.post(`/api/register`, { username, password }).then(res => res.data);
}

export function login({ username, password }: UserAuth) {
  return axios.post(`/api/login`, { username, password })
    .then(res => res.data)
    .then(validateResponse);
}

export function fetchMe() {
  return axios.get(`/api/users/me`)
    .then(res => res.data)
    .then(validateResponse)
    .then(data => UserSchema.parse(data));
}

export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', {
    method: 'POST',
  });
}
