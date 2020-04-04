function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}


Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

 

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

 

function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
	var element2 = document.getElementById("result1");
    element2.innerHTML = "Score :  " + quiz.score + "/" + (currentQuestionNumber-1);
	var pstatus=document.getElementById("status");
	pstatus.setAttribute("value",currentQuestionNumber);
	pstatus.setAttribute("max",quiz.questions.length);
	var rstatus=document.getElementById("result2");
	rstatus.setAttribute("value",quiz.score);
	rstatus.setAttribute("max",currentQuestionNumber-1);
};


function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your score : " + quiz.score + " out of "+quiz.questions.length  + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

var obj=JSON.parse(data);
var questions=[];

for(var i=0;i<obj.length;i++)
{
	var q=obj[i].question;
	var o1=obj[i].optionA;
	var o2=obj[i].optionB;
	var o3=obj[i].optionC;
	var o4=obj[i].optionD;
	var a=obj[i].answer;
	
	console.log(q+" : "+a);
	questions.push(new Question(q,[o1,o2,o3,o4],a));
}
	
// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();