import { authClient as client } from "../http/client"

export const authService = {
  register: (userName, email, password) => {
    return client.post('/registration', { userName, email, password });
  },

  login: (userName, password) => {
    return client.post('/login', { userName, password })
  },

  refresh: () => client.get('/refresh'),

  logout: () => {client.post('/logout')}
}
