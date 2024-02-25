import questions from "./questions.js";
import { container } from './main.js'
import { createAnwsHandler } from './startApp.js'

let ql = []

function createItem(txt, idx, answerIdx) {
    const lable = document.createElement('p')
    const item = document.createElement("input")
    
    lable.textContent = txt
    
    lable.classList.add('answer-text')
    
    item.setAttribute('value', idx)
    item.setAttribute('name', answerIdx)
    item.setAttribute('type', 'radio')
    
    lable.prepend(item)
    
    return lable
}

function createQuestion(questionIndex, questionText, answers) {
  const item = document.createElement("li");
  const question = document.createElement('div')
  const questionTitle = document.createElement("h4");
  const answer = document.createElement("div");
  
  item.classList.add("question");
  question.classList.add("question-title");

  questionTitle.textContent = `Вопрос ${questionIndex}: ${questionText}`;
  
  answers.forEach((an, idx) => {
    const a = createItem(an, idx, questionIndex)
    answer.append(a)
  })

  question.append(questionTitle)
  question.append(answer)
  item.append(question);
  
  item.addEventListener('click', checkAnswer)

  return item;
}

function random(n) {
  const rn = Math.floor(Math.random() * (n - 1) + 1)
  if (!ql.includes(rn)) {
    ql.push(rn)
  } else {
    random(n)
  }
}

function checkAnswer(e) {
      const target = e.target
      let input
      
      if (target.closest('p')) {
          if (target.closest('input')) input = target
          else input = target.querySelector('input')
          
          const name = input.name
          const value = input.value
          input.setAttribute('checked', '')
          this.querySelectorAll('input').forEach(e => e.setAttribute('disabled', ''))
          
          const answ = ql[name - 1]
          
          if (parseInt(value, 10) === answ.rigthAnswerIndex) this.classList.add('right')
          else {
              this.classList.add('wrong')
              this.querySelector(`input[value="${answ.rigthAnswerIndex}"]`).parentElement.style.color = 'green'
          }
          
          this.removeEventListener('click', checkAnswer)
      }
  }

function checkAnswers(e) {
    e.preventDefault()
    const len = ql.length
    const data = this.querySelectorAll('input[checked')
    let ra = 0
    
    data.forEach(el => {
        const name = el.name
        const value = el.value
        if (parseInt(value) === ql[name - 1].rigthAnswerIndex) ra++
    })
    
    const btn = this.querySelector('button')
    btn.textContent = 'Начать заново'
    
    const res = document.createElement('div')
    
    res.style.marginTop = 10
    res.textContent = `Правильно ${ra} ответов из ${len}`
    
    this.append(res)
    
    btn.addEventListener('click', () => {
        ql.length = 0
        this.remove()
        createAnwsHandler(len)
    })
}

export function createAnswersList(num) {
  const len = questions.length
  for (let i = 0; i < num; i++) {
    random(len)
  }

  const form = document.createElement("form")
  const questionsList = document.createElement("ul");
  
  ql = ql.map(el => questions[el])

  questionsList.classList.add("questions-list");
  ql.forEach((item, index) => {
    questionsList.append(
      createQuestion(
        index + 1,
        item.question,
        item.answers
      )
    );
  });
  
  const btn = document.createElement('button')
  btn.setAttribute('type', 'submit')
  btn.textContent = 'Узнать результат'
  
  
  form.addEventListener('submit', checkAnswers)
  
  form.append(questionsList)
  form.append(btn)

  return form;
}