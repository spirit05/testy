import questions from "./questions.js";

function createQuestion(questionIndex, questionText, answerText) {
  const item = document.createElement("li");
  const question = document.createElement("h4");
  const answer = document.createElement("p");

  item.classList.add("question");
  question.classList.add("question-title");
  answer.classList.add("answer-text");

  question.textContent = `Вопрос ${questionIndex}: ${questionText}`;
  answer.textContent = answerText;

  item.append(question);
  item.append(answer);

  return item;
}

export function createQuestionList() {
  const questionsList = document.createElement("ul");

  questionsList.classList.add("questions-list");
  questions.forEach((item, index) => {
    questionsList.append(
      createQuestion(
        index + 1,
        item.question,
        item.answers[item.rigthAnswerIndex]
      )
    );
  });

  return questionsList;
}
