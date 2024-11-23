const key = 'roomId';

export const roomIdService = {
  get: () => localStorage.getItem(key),
  save: (id) => localStorage.setItem(key, id),
  remove: () => localStorage.removeItem(key),
};
