const errors: { [key: string]: string } = {
  INVALID_USERNAME_LENGTH: 'O usuário deve ter entre 3 e 32 caracteres.',
  INVALID_PASSWORD_LENGTH: 'A senha deve ter entre 8 e 16 caracteres.',
  PASSWORD_MISSING_REQUIRED_CHARACTER: 'A senha deve ter pelo menos um número e uma letra maiúscula.',
  USERNAME_IS_BEING_USED: 'Este nome de usuário já está em uso.',
};

export default function getUIErrorMessage(messageCode?: string) {
  return messageCode && messageCode in errors
    ? errors[messageCode]
    : 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
}
