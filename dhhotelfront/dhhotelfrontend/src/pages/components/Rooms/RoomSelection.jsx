import { useNavigate } from 'react-router-dom';

function RoomSelection() {
  const navigate = useNavigate();

  const handleRoomSelect = (roomId) => {
    navigate('/reserve', { state: { roomId } });
  };

  const rooms = [
    { id: 1, name: 'Habitación Estándar', photo: 'room1.jpg', type: 'Individual' },
    { id: 2, name: 'Suite de Lujo', photo: 'room2.jpg', type: 'Doble' },
    { id: 3, name: 'Habitación Familiar', photo: 'room3.jpg', type: 'Familiar' },
  ];

  return (
    <div className="room-selection">
      {rooms.map((room) => (
        <div key={room.id} className="room-card" onClick={() => handleRoomSelect(room.id)}>
          <img src={room.photo} alt={room.name} />
          <h3>{room.name}</h3>
          <p>{room.type}</p>
        </div>
      ))}
    </div>
  );
}

export default RoomSelection;
