
let question_field = document.querySelector('.question');
let answer_field = document.querySelectorAll('.answer');
let start_field = document.querySelector('.start');
let statistic = document.querySelector('.statistics');
let start_btn = document.querySelector('.start-btn');
let question_container = document.querySelector('.question-container');
let singns = ['+', '-', '*', '/'];

function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomSign() {
    return singns[randint(0, 3)];
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

class Question {
    constructor() {
        let a = randint(1, 30);
        let b = randint(1, 30);
        let sign = getRandomSign();
        this.question = `${a} ${sign} ${b}`;

        if (sign == '+') {
            this.correct = a + b;
        } else if (sign == '-') {
            this.correct = a - b;
        } else if (sign == '*') {
            this.correct = a * b;
        } else if (sign == '/') {
            this.correct = +(a / b).toFixed(2);
        }

        this.answers = [
            +(this.correct + randint(-5, 5)).toFixed(2),
            +(this.correct + randint(-10, 10)).toFixed(2),
            this.correct,
            +(this.correct + randint(1, 15)).toFixed(2),
            +(this.correct + randint(-15, -1)).toFixed(2)
        ];
        shuffle(this.answers);
    }
    display() {
        question_field.innerHTML = this.question;

        for (let i = 0; i < this.answers.length; i++) {
            answer_field[i].innerHTML = this.answers[i];
        }
    }
}
let current_question = new Question();
let correct_answers_given = 0;
let total_answers_given = 0;
current_question.display();

let cookie = false;
let cookies = document.cookie.split('; ');

for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split('=')[0] == "highscore") {
        cookie = cookies[i].split('=')[1];
        break;
    }
}

if (cookie) {
    let data = cookie.split('/');
    statistic.innerHTML = `Минулого разу ви відповіли на ${data[0]} з ${data[1]} відповідей.<br/>
    Точність ${Math.round(data[0] * 100 / data[1])}% <br/>`;
}

console.log(cookies)
start_btn.addEventListener('click', function () {
    start_field.style.display = 'none';
    question_container.style.display = 'flex';
    setTimeout(function () {
        let new_cookie = `highscore=${correct_answers_given}/${total_answers_given}; max-age=1000000000`;
        document.cookie = new_cookie;
        statistic.innerHTML = `Правильно: ${correct_answers_given} <br/>
            Усього: ${total_answers_given}<br/>
            Точність: ${Math.round(correct_answers_given * 100 / total_answers_given)}%<br/>`
        start_field.style.display = 'flex';
        question_container.style.display = 'none';
    }, 10000)
})


for (let i = 0; i < answer_field.length; i++) {
    answer_field[i].addEventListener('click', function () {
        if (answer_field[i].innerHTML == current_question.correct) {
            console.log('true');
            correct_answers_given++;
            answer_field[i].style.background = "#00FF00";
            anime({
                targets: answer_field[i],
                background: "rgb(93, 43, 139)",
                delay: 50,
                duration: 500,
                easing: 'linear'
            })
        } else {
            console.log('false');
            answer_field[i].style.background = "#FF0000"
            anime({
                targets: answer_field[i],
                background: "rgb(93, 43, 139)",
                delay: 50,
                duration: 500,
                easing: 'linear'
            })
        }
        total_answers_given++;
        current_question = new Question();
        current_question.display();
    });
}