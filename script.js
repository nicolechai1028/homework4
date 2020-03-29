$(document).ready()

var started = false;
var ended = false;

var q = 0;
var currentQuestion = $("#question");
var btnChoices = [$("#answer1"), $("#answer2"), $("#answer3", $("#answer4"))];
var selected;
var answer;

var correct = 0;
var incorrect = 0;

var countdown = 60;
var intervalId;
var timer;

// the questions that will be answered (question, choices, answer)
var questionsArr = [
    {
        question: "1. Commonly used data types DO NOT include:", 
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "2. Which event occurs when the user clicks on an HTML element?",
        choices: ["onclick", "onmouseclick", "onchange", "onmouseover"],
        answer: "onclick"
    },
    {
        question: "3. Is JavaScript case-sensitive?",
        choices: ["True", "False", "Depends", "Maybe?"],
        answer: "True"
    },
    {
        question: "4. Which is the correct place to insert a JavaScript?",
        choices: ["The <Body> section", "Either the <head> or the <body> section", "The <head> section", "The <html> section"],
        answer: "Either the <head> or the <body> section"
    },
    {
        question: "5. How can you detect the client's browser?",
        choices: ["navigator.appName", "client.navName", "browser.name", "window.browser"],
        answer: "navigator.appName"
    }
];

// hide questions before hitting start button
if (started === false) {
    $("#display-card").hide();
}
if (ended === false) {
    $(".score").hide();
}

// when button is clicked it grabs the value of the selected choice
$(document).on("click", '.choice'), function(){
    selected = $(this).val();
    console.log("You've selected: " + selected);
    compare();
}

//start button clicked: hide start button, show timer and questions
$("#start-button").click(function(){
    started = true;
    shuffle(questionsArr);
    for (var i=0; i < questionsArr,length; i++) {
        shuffle(questionsArr[i].choices);
    }
    $("#display-card").show();
    $("#start-button").remove();
    displayQ();
    $("#timer").html("<h2>Time Remaining: " + countdown + "</h2>");
});

// shuffle questions
function shuffle(Arr){
    var currentIndex = Arr.length;
    var tempVal;
    var randomIndex;
    while (0 !==currentIndex){
        randomIndex = Math.floor(Math.random()* currentIndex);
        currentIndex -= 1;
        tempVal = Arr[currentIndex];
        Arr[currentIndex] = Arr[randomIndex];
        Arr[randomIndex] = tempVal;
    }
    return Arr;
}

// play again reset 
$("#play-again").click(function(){
    resetGame();
    $("#timer").show();
    displayQ();
    $("timer").html("<h2>Time Remaining: " + countdown + "</h2>");
});

// when the questions are done, hide the questions
function newQA() {
    $(".choice").empty();
    if (q === 4) {
        started = false;
        ended = true;
    }
}

// what the correct answer is vs. what is selected
function compare() {
    if (selected === answer) {
        correct++;
    }
    if (selected !== answer) {
        incorrect++;
    }
    clearTimeout(timer);
    newQA();
    q = q+=1;
    countdown = 60;
    displayQ();
}

// countdown -> 0 run the function
function tooSlow() {
    if (countdown === 0){
        console.log("Too Slow!");
        countdown = 60;
    }
}

// decrease countdown by 1 second
function decrement(){
    countdown--;
    $("#timer").html("<h2>Time Remaining: " + countdown + "</h2>");
}

// timer decrease by 1 second
function displayQ(){
    $("#timer").html("<h2>Time Remaining: " + countdown + "</h2>");
    clearInterval(intervalId);
    countdown = 60;
    intervalId = setInterval(decrement, 1000);
    timer = setTimeout(tooSlow, 1000*60);

    if (ended === !true) {
        // display the current question
        currentQuestion.text(questionsArr[q].question);
        answer = questionArr[q].answer;
       
        // input answer choices for each question
        for (var i = 0; i < questionsArr[q].choices.length; i++) {
            btnChoices[i].text(questionArr[q].choices[i]);
            btnChoices[i].val(questionArr[q].choices[i]);
        }
    }

    // see if the game had ended
    if (ended === true) {
        started = false;
        $(".score").show();
        $("#display-card").hide();
        endGame();
    }
    console.log("Answer: " + answer);
}

// end game, hide timer, question, and choices, show score and play again button
function endGame() {
    clearTimeout(timer);
    $("#timer").hide();
    $(".choice").empty();
    $(currentQuestion).empty();

    $("#correct").text(correct);
    $("#incorrect").text(incorrect);

    $("#play-again").show();
}

//hide the play again button and score, show timer, questions and choices
function resetGame() {
    $(".score").hide();
    $("#play-again").hide();
    $("#timer").show();
    correctTotal = 0;
    incorrectTotal = 0;
    q = 0;

    started = true;
    ended = false;

    //Reshuffles the questions
    shuffle(questionsArr);
    for(var i = 0; i < questionsArr.length; i++) {
        shuffle(questionsArr[i].choices);
    }
    $("#display-card").show();
}




