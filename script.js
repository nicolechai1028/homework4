$(document).ready(function(){
var q = 0;
var currentQuestion = $("#question");
var correct = 0;
var incorrect = 0;
var countdown = 60;

// the questions that will be answered (question, choices, answer)
var questionsArr = [
    {
        question: "Commonly used data types DO NOT include:", 
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choices: ["onclick", "onmouseclick", "onchange", "onmouseover"],
        answer: "onclick"
    },
    {
        question: "Is JavaScript case-sensitive?",
        choices: ["True", "False", "Depends", "Maybe?"],
        answer: "True"
    },
    {
        question: "Which is the correct place to insert a JavaScript?",
        choices: ["The <Body> section", "Either the <head> or the <body> section", "The <head> section", "The <html> section"],
        answer: "Either the <head> or the <body> section"
    },
    {
        question: "How can you detect the client's browser?",
        choices: ["navigator.appName", "client.navName", "browser.name", "window.browser"],
        answer: "navigator.appName"
    }
];

//start button clicked: hide start button, show timer and questions
$("#start-button").on('click',function(){
    console.log('STARTED!')
    $('#display-card').show()
    questionsArr = shuffle(questionsArr);
    //$("#display-card").attr('style', 'display:block');
    $("#start-button").hide();
    displayQ();
    $("#timer").html("<h2>Time Remaining: " + countdown + "</h2>");
    intervalId = setInterval(decrement, 1000);
});

// when button is clicked it grabs the value of the selected choice
$(document).on("click", '.choice', function(){
    selected = $(this).text();
    console.log("You've selected: " + selected);
    compare(selected);
})

// shuffle questions array
function shuffle(Arr){
    var currentIndex = Arr.length;
    var tempVal;
    var randomIndex;
   // swap when still have array
    while (0 !== currentIndex){
        randomIndex = Math.floor(Math.random()* currentIndex);
        currentIndex -= 1;
        // swap old index with new
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
});

// what the correct answer is vs. what is selected
function compare(val) {
    if(val === questionsArr[q].answer){
        correct++;
    }else{
        incorrect++;
    }
        q++;
        displayQ()
}


// decrease countdown by 1 second
function decrement(){
    if(countdown <= 0){
        clearInterval(intervalId)
        alert('too slow!')
        endGame()
    }
    countdown--;
    $("#timer").html("<h2>Time Remaining: " + countdown + "</h2>");
}

// timer decrease by 1 second
function displayQ(){
    if(q===questionsArr.length){
        endGame()
    }else{
       $('#question').text(questionsArr[q].question)
    for(var i = 0; i<4 ; i++){
        $(`#answer${i+1}`).text(questionsArr[q].choices[i])
    } 
    } 
}

// end game, hide timer, question, and choices, show score and play again button
function endGame() {
    $("#timer").hide();
    $("#display-card").hide();
    $(currentQuestion).empty();
    $('.score').show()
    $('#highscorediv').show()
    $("#correct").text(correct);
    $("#incorrect").text(incorrect);
    $("#play-again").show();
}

//hide the play again button and score, show timer, questions and choices
function resetGame() {
    $(".score").hide();
    $("#play-again").hide();
    $("#timer").show();
    correct = 0;
    incorrect = 0;
    q = 0;
    countdown = 60
    questionsArr = shuffle(questionsArr);
    $("#display-card").show();
    $("timer").html("<h2>Time Remaining: " + countdown + "</h2>");
}
})

//localStorage.setItem('key', "value");
//localStorage.getItem('key');

//JSON syntax, stringify, parse




