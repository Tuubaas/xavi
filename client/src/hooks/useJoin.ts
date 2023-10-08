import { useQuery } from 'react-query';

export const fetchRoom = async (
  roomCode: string,
): Promise<{ roomCode: string }> => {
  return fetch(`http://localhost:3000/api/join/${roomCode}`, {
    method: 'GET',
  }).then((response) => response.json());
};

const useJoin = (roomCode: string) => {
  const query = useQuery(['join', roomCode], async () => fetchRoom(roomCode), {
    enabled: false,
  });

  return query;
};

export default useJoin;
