import api, { setToken } from './api';

export async function login(username: string, password: string): Promise<{ success: boolean }> {
  try {
    const response = await api.post('/auth/login', { username, password });

    setToken(response.data.token);

    return { success: true };
  } catch (error) {
    console.error(error);

    return { success: false };
  }
}
