import jwtDecode from 'jwt-decode';
import moment from 'moment';
import api, { setToken } from './api';
import User from '../interfaces/User';
import Transaction from '../interfaces/Transaction';
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

export async function getUser(): Promise<User> {
  const token = localStorage.getItem('token');

  return jwtDecode<User>(token!);
}

export async function getIsLoggedIn(): Promise<boolean> {
  try {
    const token = localStorage.getItem('token');

    await validateToken(token);

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

export async function validateToken(token: string | null): Promise<void> {
  if (!token) throw new Error('Token not found');

  const response = await api.post('/auth/token', { token });

  if (!response.data.isValid) throw new Error('Invalid token');

  setToken(token);
}

export async function getBalance(): Promise<number> {
  const { data } = await api.get('/users/balance');

  return data.balance;
}

export async function getTransactions(startDateStr: string, endDateStr: string): Promise<Transaction[]> {
  const momentStartDate = moment(startDateStr).startOf('day').utc();
  const momentEndDate = moment(endDateStr).endOf('day').utc();

  const startDate = momentStartDate.isValid() ? momentStartDate.format() : '';
  const endDate = momentEndDate.isValid() ? momentEndDate.format() : '';

  // const { data } = await api.get(`/transactions`);
  const { data } = await api.get(`/transactions?startDate=${startDate}&endDate=${endDate}`);

  return data;
}
