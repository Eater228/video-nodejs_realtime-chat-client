import axios from "axios";

export const chatClient = axios.create({
  baseURL: `http://localhost:3005/chat`,
  withCredentials: true,
});

chatClient.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem('accessToken');

  // Додати заголовок Authorization для всіх запитів, якщо токен існує
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

// to awoid getting `res.data` everywhere
chatClient.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  res => res.data,
);
