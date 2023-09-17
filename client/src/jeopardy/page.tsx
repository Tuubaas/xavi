import Card from "./Card";

// type Question = {
//   question: string;
//   answer: string;
//   value: number;
// };

// type Category = {
//   title: string;
//   questions: Question[];
// };

// type JeopardyData = {
//   categories: Category[];
// };

const JeopardyPage = () => {
  const jeopardyData = [1, 2, 3, 4, 5].map((i) => ({
    title: `Category ${i}`,
    questions: [1, 2, 3, 4, 5].map((j) => ({
      question: `Question ${j}`,
      answer: `Answer ${j}`,
      value: j,
    })),
  }));

  const handleClick = (i: number) => {
    console.log("Clicked", i);
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
