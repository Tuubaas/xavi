"use client";
import { useState } from "react";

import { useKeyPress } from "./hooks";

const Card = ({ value, question }: { value: number; question: string }) => {
  const [show, setShow] = useState<boolean>(false);
  const [haveBeenChosen, setHaveBeenChosen] = useState<boolean>(false);

  useKeyPress("Escape", () => setShow(false));
  return (
    <>
      <div className="flex flex-col justify-center items-center border border-white rounded-xl bg-blue-700 h-16 w-24">
        {!haveBeenChosen && (
          <button
            className="w-full h-full p-4"
            onClick={() => {
              setShow((curr) => !curr);
              setHaveBeenChosen(true);
            }}
          >
            <span>{value}</span>
          </button>
        )}
      </div>
      {show && (
        <div className="absolute top-0 left-0 z-10 h-full w-full flex justify-center items-center overflow-hidden">
          <div
            className="h-full w-full cursor-pointer"
            onClick={() => setShow(false)}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-3/4 w-3/4 flex justify-center items-center bg-blue-700 rounded-3xl border border-white">
            {question}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
