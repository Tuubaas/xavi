"use client";
import { io } from "socket.io-client";
import Card from "./Card";
import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";

type Question = {
  question: string;
  answer: string;
  value: number;
};

type Category = {
  title: string;
  questions: Question[];
};

type JeopardyData = {
  categories: Category[];
};

let socket: Socket;

const JeopardyPage = () => {
  const [answerer, setAnswerer] = useState<number>(-1);

  const onConnect = () => {
    console.log("connected");
  };

  const onDisconnect = () => {
    console.log("disconnected");
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/socket/io").then((res) => {
      console.log(res);

      socket = io();

      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);

      socket.on("first-to-aswer", (userId: number) => {
        setAnswerer(userId);
      });

      socket.on("questionId", (id: number) => {
        console.log(id);
      });
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const jeopardyData = [1, 2, 3, 4, 5].map((i) => ({
    title: `Category ${i}`,
    questions: [1, 2, 3, 4, 5].map((j) => ({
      question: `Question ${j}`,
      answer: `Answer ${j}`,
      value: j,
    })),
  }));

  const handleClick = (id: number) => {
    socket.emit("questionId", id);
  };
  // const [questions, setQuestions] = useState<JeopardyData>([{title:"Category 1", questions:[{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"}]}, {title:"Category 1", questions:[{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"}]}, {title:"Category 1", questions:[{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"}]}, {title:"Category 1", questions:[{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"}]}, {title:"Category 1", questions:[{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"},{question:"Question 1", answer: "Answer 1", value: "1"}]}]);
  return (
    <div>
      <div className="flex justify-center mb-12">
        <h1 className="text-4xl">Jeopardy</h1>
      </div>
      <div className="flex gap-4">
        {jeopardyData.map((category, i) => (
          <div key={i} className="flex flex-col gap-4">
            <h2>{category.title}</h2>
            {category.questions.map((question, i) => (
              <Card
                key={i}
                value={question.value}
                question={question.question}
                callback={() => handleClick(i)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex my-12 justify-between">
        <div>
          <p className="text-xl">Player 1</p>
          <p>Score: </p>
        </div>
        <div>
          <p className="text-xl">Player 2</p>
          <p>Score: </p>
        </div>
        <div>
          <p className="text-xl">Player 3</p>
          <p>Score: </p>
        </div>
      </div>
    </div>
  );
};

export default JeopardyPage;
