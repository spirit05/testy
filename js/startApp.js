import { clearContainer, container } from "./main.js";

function createTitle(text) {
  const titleBtn = document.createElement("button");
  const title = document.createElement("h2");

  titleBtn.classList.add("course-title");
  title.textContent = text;

  titleBtn.append(title);

  return titleBtn;
}

function createBtnElectro() {
  const btnContainer = document.createElement("div");
  const btnRandom10 = document.createElement("button");
  const btnRandom50 = document.createElement("button");
  const btnRandomAll = document.createElement("button");
  const btnViewAll = document.createElement("button");

  btnRandom10.textContent = "Случайные 10 вопросов";
  btnRandom50.textContent = "Случайные 50 вопросов";
  btnRandomAll.textContent = "Случайные 150 вопросов";
  btnViewAll.textContent = "Посмотреть все вопросы";

  btnContainer.classList.add("questions", "hide");
  btnRandom10.classList.add("test-btn", "js-random-ten");
  btnRandom50.classList.add("test-btn", "js-random-fifty");
  btnRandomAll.classList.add("test-btn", "js-random-over-fifty");
  btnViewAll.classList.add("test-btn", "js-view-all");

  btnContainer.append(btnRandom10);
  btnContainer.append(btnRandom50);
  btnContainer.append(btnViewAll);
  
  btnRandom10.addEventListener('click', createAnwsHandler.bind(null, 10))
  
  btnRandom50.addEventListener('click', createAnwsHandler.bind(null, 50))

  btnViewAll.addEventListener("click", viewAllHandler);

  return btnContainer;
}

async function viewAllHandler(e) {
  e.preventDefault();
  clearContainer();

  const closeBtn = document.createElement("button");
  const { createQuestionList } = await import("./viewAll.js");
  const questionsList = createQuestionList();

  closeBtn.classList.add("close");

  closeBtn.addEventListener("click", startApp);

  container.append(questionsList);
  container.append(closeBtn);
}

export async function createAnwsHandler(n) {
  clearContainer();

  const closeBtn = document.createElement("button");
  const { createAnswersList } = await import("./test.js");
  const questionsList = createAnswersList(n);

  closeBtn.classList.add("close");

  closeBtn.addEventListener("click", startApp);

  container.append(questionsList);
  container.append(closeBtn);
}

export function startApp() {
  const title = createTitle("II группа электробезопасности");
  const btnElectro = createBtnElectro();

  title.addEventListener("click", () => {
    btnElectro.classList.toggle("hide");
  });

  clearContainer();

  container.append(title);
  container.append(btnElectro);
}