export const getAuthToken = (): string | null => {
  try {
    const token = localStorage.getItem('@chatbot-ai');
    if (token) {
      return token;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const setAuthToken = (token: string) => {
  localStorage.setItem('@chatbot-ai', token);
}
