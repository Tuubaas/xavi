import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import useCreate from '../hooks/useCreate';
import useJoin from '../hooks/useJoin';

const Index = () => {
  const navigate = useNavigate({});

  const [gameId, setGameId] = useState('');
  const [showInput, setShowInput] = useState(false);

  const { mutateAsync, isLoading: isLoadingCreate } = useCreate();
  const {
    data: joinData,
    isLoading: isLoadingJoin,
    isError: isJoinError,
    isSuccess: isJoinSuccess,
  } = useJoin(gameId);

  const createNewGame = async () => {
    const res = await mutateAsync();
    if (res.success) {
      console.log('Room created: ', res.roomCode);
      navigate({ to: `/jeopardy/$id`, params: { id: res.roomCode } });
    }
  };
  console.log(joinData, isLoadingJoin, isJoinError, isJoinSuccess);

  if (isLoadingJoin) {
    return <p>Loading...</p>;
  }
  if (isJoinSuccess) {
    console.log('Room joined: ', joinData.roomCode);
    navigate({ to: `/jeopardy/$id`, params: { id: joinData.roomCode } });
  }
  if (isJoinError) {
    // Add error handling
    return;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const roomCode = formData.get('roomCode');
    if (typeof roomCode !== 'string') {
      // Add error handling
      return;
    }
    setGameId(roomCode);
  }

  return (
    <>
      <h1>Home</h1>
      <div className="flex flex-col justify-center items-center gap-4">
        {isLoadingCreate || (isLoadingJoin && <p>Loading...</p>)}
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
