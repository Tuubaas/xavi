import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import useCreate from '../hooks/useCreate';
import { useQuery } from 'react-query';
import { fetchRoom } from '../hooks/useJoin';

const Index = () => {
  const navigate = useNavigate({});

  const [showInput, setShowInput] = useState(false);
  const [roomCode, setRoomCode] = useState('');

  const { mutateAsync, isLoading: isLoadingCreate } = useCreate();
  const { data, isLoading } = useQuery(
    ['join', roomCode],
    () => fetchRoom(roomCode),
    { refetchOnWindowFocus: false, enabled: Boolean(roomCode) },
  );

  // useEffect(() => {
  //   console.log('Refetching');

  //   refetch();
  // }, [roomCode]);

  // useEffect(() => {
  //   console.log('Data: ', data);
  //   if (data) {
  //     navigate({ to: `/jeopardy/$id`, params: { id: roomCode } });
  //   }
  // }, [data, isRefetching, roomCode, navigate]);

  const createNewGame = async () => {
    const res = await mutateAsync();
    if (res.success) {
      console.log('Room created: ', res.roomCode);
      navigate({ to: `/jeopardy/$id`, params: { id: res.roomCode } });
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const roomCodeInput = formData.get('roomCode');

    if (typeof roomCodeInput !== 'string') {
      // Add error handling
      return;
    }
    console.log('SET');

    setRoomCode(roomCodeInput);
  }

  if (isLoading) return <p>Loading...</p>;

  if (data) {
    navigate({ to: `/jeopardy/$id`, params: { id: roomCode } });
  }

  return (
    <>
      <h1>Home</h1>
      <div className="flex flex-col justify-center items-center gap-4">
        {isLoadingCreate && <p>Loading...</p>}
        <button
          onClick={createNewGame}
          className="p-4 border border-white rounded-xl bg-slate-600"
        >
          Create new game
        </button>
        <button
          onClick={() => setShowInput((b) => !b)}
          className="p-4 border border-white rounded-xl bg-slate-600"
        >
          Join game with code
        </button>
        {showInput && (
          <form className="flex flex-row gap-4 p-4" onSubmit={handleSubmit}>
            <input name="roomCode" className="text-black" />
            <button
              type="submit"
              className="border border-white rounded-xl p-4"
            >
              {'->'}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Index;
