//select elements
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let theResultContainer = document.querySelector(".results");
let resultsNum = document.querySelector(".results .results-numbers")
let note = document.querySelector(".results .note");
let countdownElement = document.querySelector(".count-down");



let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQuestions() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questionsObject = JSON.parse(this.responseText);
            let qCount = questionsObject.length;

            creatBullets(qCount);




            // Add questions data
            addQuestionData(questionsObject[currentIndex], qCount);
            // Start CountDown
            countdown(10, qCount);


            // submit button

            submitButton.onclick = () => {
                let theRightAnswer = questionsObject[currentIndex].right_answer;

                currentIndex++;

                checkAnswer(theRightAnswer, qCount);

                // remove old questions 

                quizArea.innerHTML = '';
                answersArea.innerHTML = '';

                addQuestionData(questionsObject[currentIndex], qCount);

                // handle bullets 
                handleBullets();

                // Start CountDown
                clearInterval(countdownInterval);
                countdown(10, qCount);



                // show results 
                showResults(qCount);

            };

        }
    };

    myRequest.open("GET", "questions.json", true);
    myRequest.send();
};
getQuestions();


function creatBullets(num) {

    countSpan.innerHTML = num;

    for (let i = 0; i < num; i++) {

        let theBullet = document.createElement("span");

        if (i === 0) {
            theBullet.className = "on";
        }
        bulletsSpanContainer.appendChild(theBullet);


    }

}

function addQuestionData(obj, count) {

    if (currentIndex < count) {

        // creat question title
        let questionTitle = document.createElement("h2");
        let questionText = document.createTextNode(obj['title']);

        questionTitle.appendChild(questionText);

        quizArea.appendChild(questionTitle);

        // creat the answers 

        for (let i = 1; i <= 4; i++) {
            let mainDiv = document.createElement("div");
            mainDiv.className = 'answer';
            let radioInput = document.createElement("input");
            radioInput.name = 'question';
            radioInput.type = 'radio';
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];
            mainDiv.id = `answer-${i}`;
            // creat label 
            let icone = document.createElement("i");
            icone.className = 'bx bxs-check-circle bx-tada';
            icone.id = 'togg'
            let theLabel = document.createElement("label");
            theLabel.id = "label";
            theLabel.htmlFor = `answer_${i}`;
            let theLabelText = document.createTextNode(obj[`answer_${i}`]);
            theLabel.appendChild(icone);
            theLabel.appendChild(theLabelText);
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);
            answersArea.appendChild(mainDiv);
            icone.style.marginLeft = '12px';
        };
    };
}

function checkAnswer(rAnswer, count) {

    let answers = document.getElementsByName("question");
    let theChoosenAnswer;

    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            theChoosenAnswer = answers[i].dataset.answer;
        }
    }

    if (rAnswer === theChoosenAnswer) {
        rightAnswers++;

    }


};


function handleBullets() {

    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {
        if (currentIndex === index) {
            span.className = "on";
        }
    });
}

function showResults(count) {

    let theResults;
    let bad = document.querySelector(".results .mal");
    let good = document.querySelector(".results .bien");
    let perfect = document.querySelector(".results .parfait");

    if (currentIndex === count) {

        quizArea.remove();
        answersArea.remove();
        submitButton.remove();
        bullets.remove();
        theResultContainer.style.display = 'block';
        if (rightAnswers >= 35 && rightAnswers <= count) {
            perfect.style.display = "block"
            resultsNum.innerHTML = `${rightAnswers} De ${count}`;
            theNote = "<h2> A ssidi ma3endi maytssalek </h2>";
        }
        else if (rightAnswers >= 30 && rightAnswers < count) {
            good.style.display = "block";
            resultsNum.innerHTML = `${rightAnswers} De ${count}`;
            theNote = "<h2>Ma3likch, Zed raj3 chwiya w tkone parfait</h2>"
        } else if (rightAnswers < count / 2 && rightAnswers >= 10) {
            bad.style.display = "block"
            resultsNum.innerHTML = `${rightAnswers} De ${count}`;
            theNote = "<h2>Sser raje3 Dorossk</h2>"
        } else if (rightAnswers < count / 2 && rightAnswers <= 10) {
            bad.style.display = "block"
            resultsNum.innerHTML = `${rightAnswers} De ${count}`;
            theNote = "<h2>Wa naree 3la hmar</h2>"
        }

        note.innerHTML = theNote;
    };
}

function countdown(duration, count) {
    if (currentIndex < count) {
        let minutes, seconds;
        countdownInterval = setInterval(function () {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            countdownElement.innerHTML = "<i class='bx bxs-timer bx-flashing' ></i> " + `${minutes}:${seconds}`;

            if (--duration < 0) {
                clearInterval(countdownInterval);
                submitButton.click();
            }
        }, 1000);
    }
};
function reload() {
    location.reload();
};



