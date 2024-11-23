import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { Loader } from "../components/Loader"; // Імпорт компонента Loader

export const RoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [rooms, setRooms] = useState(null); // Ініціалізуємо rooms як null
  const { getAllRooms, removeRooms } = useAuth();

  useEffect(() => {
    async function fetchRooms() {
      try {
        const fetchedRooms = await getAllRooms();
        setRooms(fetchedRooms || []); // Установка порожнього масиву, якщо fetchedRooms undefined
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    }

    fetchRooms();
  }, []);

  const handlerRedirect = () => {
    navigate('/createRoom', { state: { from: location } });
  };

  const handleRoomClick = (id) => {
    navigate(`/chat/${id}`);
  };

  const handleRoomRemove = async (id) => {
    try {
      await removeRooms(id); // Викликаємо функцію для видалення кімнати
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id)); // Оновлюємо стан rooms
    } catch (error) {
      console.error("Failed to remove room:", error);
    }
  };

  if (rooms === null) {
    // Якщо `rooms` ще не завантажені, показуємо Loader
    return <Loader />;
  }

  return (
    <>
      <title>Hello</title>
      <button onClick={handlerRedirect}>Create Room</button>
      
      {rooms.length > 0 ? (
        <ul>
        {rooms.map((room) => (
          <li 
            key={room.id} 
            style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
          >
            <span 
              onClick={() => handleRoomClick(room.id)}
              style={{ cursor: "pointer", marginRight: "8px" }}
            >
              {room.name}
            </span>
            <button 
              onClick={() => handleRoomRemove(room.id)} 
              style={{ color: "red", cursor: "pointer", border: "none", background: "transparent" }}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
      ) : (
        <p>No rooms available</p> // Повідомлення, якщо кімнат немає
      )}
    </>
  );
};
