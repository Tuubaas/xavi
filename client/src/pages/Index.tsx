import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';

const Index = () => {
  const navigate = useNavigate({});

  const [gameId, setGameId] = useState('');
  const [showInput, setShowInput] = useState(false);

  const createNewGame = async () => {
    const res = await fetch('/api/jeopardy', {
      method: 'POST',
    });
    const { id } = await res.json();
    console.log(id);
    navigate({ to: `/jeopardy/$id`, params: { id } });
  };

  return (
    <>
      <h1>Home</h1>
      <div className="flex flex-col justify-center items-center gap-4">
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
          <div className="flex flex-row gap-4 p-4">
            <input
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              className="text-black"
            />
            <Link
              to="/jeopardy/$id"
              params={{ id: gameId }}
              className="border border-white rounded-xl p-4"
            >
              {'->'}
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
