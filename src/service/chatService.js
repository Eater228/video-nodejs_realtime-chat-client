import { chatClient as client } from "../http/chat";

export const chatService = {
  create: ({name}) => {
    // console.log(name)
    return client.post('/createRoom', {name})
  },

  // setMessages: ({ roomId }) => {
  //   return client.post(`/${roomId}/messages`)
  // },

  getMessages: ({id}) => {
    return client.get(`/messages/${id}`)
  },

  getAllRooms: () => {
    return client.get('/rooms')
  },

  remove: (roomId) => {
    return client.delete(`/rooms/${roomId}`);
  }
}