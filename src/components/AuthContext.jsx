import React, { useMemo, useState } from "react";
import { authService } from "../service/authService";
import { accessTokenService } from "../service/accessTokenService";
import { chatService } from "../service/chatService";
import { roomIdService } from "../service/roomIdService";

const AuthContext = React.createContext({
  isChecked: false,
  currentUser: null,
  checkAuth: async () => {},
  activate: async (_token) => {},
  login: async (_email, _password) => {},
  logout: async () => {},
  createRoom: async (_name) => {},
  getAllRooms: async () => {},
  removeRooms: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isChecked, setChecked] = useState(true);
  const [roomId, setRoomId] = useState(null);

  async function checkAuth() {
    try {
      const { accessToken, user } = await authService.refresh();

      accessTokenService.save(accessToken);
      setCurrentUser(user);
    } catch (error) {
      console.log('User is not authentincated');
    } finally {
      setChecked(true);
    }
  }

  async function createRoom(name) {
    const { roomId } = await chatService.create(name);
    // console.log('Auth', roomId)
    roomIdService.save(roomId);
    setRoomId(roomId);
  }

  // async function setMessages(roomId) {
  //   const { message } = await chatService.setMessages(roomId) 
    
  // }

  async function login(userName, password) {
    const { accessToken, user } = await authService.login(userName, password); 
  
    accessTokenService.save(accessToken);
    setCurrentUser(user);
  }

  async function logout() {
    await authService.logout();

    accessTokenService.remove();
    setCurrentUser(null);
  }

  async function getAllRooms() {
    const allRooms = await chatService.getAllRooms();

    return allRooms;
  }

  async function removeRooms(roomId) {
    await chatService.remove(roomId);

    return `Room delete`;
  }

  const value = useMemo(
    () => ({
      isChecked,
      currentUser,
      roomId,
      checkAuth,
      createRoom,
      login,
      logout,
      getAllRooms,
      removeRooms,
    }),
    [currentUser, isChecked],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => React.useContext(AuthContext);