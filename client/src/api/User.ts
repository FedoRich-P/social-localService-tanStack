import { User, UserSchema } from '../types/User.ts';
import axios from 'axios';

export function fetchUser(id: string): Promise<User> {
  return axios.get(`/api/users/${id}`).then(res => UserSchema.parse(res.data));
}