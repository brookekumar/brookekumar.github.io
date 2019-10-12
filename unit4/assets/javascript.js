$(document).ready(function () {
    // ---variables---

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 3;
    var intervalID;
    var indexQandA = 0; //index to load a different question each round without the game reset or screen refresh
    var answered = false; //variable to stop the timer if user has clicked an answer
    var correct;
    var triviaGame = [{ 
        question: "A Unicorn is a...",
        answer: ["Mythical animal","Horse with a horn","Toddler with a cup on his head","Actually an above-water narwhal"],
        correct: "0",
    },

    { 
        prompt: "If a Unicorn and a Pegasus mate the babies might...",
        answer: ["Be human","Have to move to the mother's country of origin","Fly","Not fit in at school"],
        correct: "2",
    },

    { 
        prompt: "According to Jewish legend, the Unicorn can easily kill...",
        answer: ["A bank robber","An elephant","A peacock","Bad vibes"],
        correct: "1",
    },

    { 
        prompt: "A baby unicorn is called a...",
        answer: ["Shirley","Modern miracle","Sparkle","(une) petite chevalle de corne sans pour réalité"],
        correct: "2",
    },

    { 
        prompt: "The fossil remains of a real unicorn or the 'Elasmotherium sibiricu' dating back 29,000 years ago were found in which country?",
        answer: ["North America","India","ur mom","Kazakhstan"],
        correct: "3"
    },
];
    // ---functions---


    function startGame() {
        console.log("game has begun");
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false; // will allow timeRemaining to be pushed back to <h5> after round reset....else statement in function timer()
        timeRemaining = 3;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }
       

        $("h4").click(function () {
            var id = $(this).attr('id');
            if (id === correct) {
                answered = true; // stops the timer
                $('.question').text("the answer is: " + triviaGame[indexQandA].answer[correct]);
                // correctAnswer();
            } else {
                answered = true; //stops the timer
                $('.question').text("you picked: " + triviaGame[indexQandA].answer[id] + " BUT you should have picked: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
           
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("the correct answer is: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('you only have ' + timeRemaining + ' seconds to pick!');
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("you are right!").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("you are wrong!").css({
            'color': '#3D414F'
        });
        resetRound();

    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("you didnt pick an answer?!").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
        indexQandA++; // increments index which will load next question when loadQandA() is called again
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
            }, 5000); // removes answer image from previous round
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answers').append('<h4 class= answersAll end>correct: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>incorrect: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>unanswered: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();

    });

});