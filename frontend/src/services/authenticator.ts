import api, { setToken } from './api';
import getUIErrorMessage from '../utils/getUIErrorMessage';

function getMessagesFromAxiosError(error: any): { message?: string, messageCode?: string } {
  const data = error?.response?.data;
  return {
    message: data?.message,
    messageCode: data?.messageCode,
  };
}

export async function login(username: string, password: string): Promise<{ success: boolean, errorMessage?: string }> {
  try {
    const response = await api.post('/auth/login', { username, password });

    setToken(response.data.token);

    return { success: true };
  } catch (error: any) {
    const { messageCode, message } = getMessagesFromAxiosError(error);
    const uiErrorMessage = !messageCode || messageCode === 'INTERNAL'
      ? getUIErrorMessage('INTERNAL')
      : 'Usuário ou senha incorretos.';

    console.error(messageCode, message);

    return { success: false, errorMessage: uiErrorMessage };
  }
}

export async function newAccount(username: string, password: string, confirmPassword: string): Promise<{ success: boolean, errorMessage?: string }> {
  if (password !== confirmPassword) {
    return { success: false, errorMessage: 'As senhas não coincidem.' };
  }

  try {
    const response = await api.post('/users', { username, password });

    setToken(response.data.token);

    return { success: true };
  } catch (error: any) {
    const { messageCode, message } = getMessagesFromAxiosError(error);
    const uiErrorMessage = getUIErrorMessage(messageCode);

    console.error(messageCode, message);

    return { success: false, errorMessage: uiErrorMessage };
  }
}
