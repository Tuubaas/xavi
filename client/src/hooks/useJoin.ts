import { useQuery } from 'react-query';

const fetchRoom = async (roomCode: string): Promise<{ roomCode: string }> => {
  return fetch(`/api/join/${roomCode}`, { method: 'GET' }).then((response) =>
    response.json(),
  );
};

const useJoin = (roomCode: string) => {
  const query = useQuery('join', async () => fetchRoom(roomCode), {
    enabled: false,
  });

  return query;
};

export default useJoin;
