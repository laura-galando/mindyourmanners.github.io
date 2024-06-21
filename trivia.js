
const questionDiv = document.getElementById('question');
const answerDiv =document.getElementById('answer');
const feedbackDiv = document.getElementById('feedback');
let correctAnswersCount = 0;
let currentQuestion = null; //This variable will store the question that is returned from the Promise.

function getTriviaQuestion() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = Math.floor(Math.random() * questions.length); //get a random number
            const question = questions[index]; //use therandom number as an index to get a random question from the array of quesitons
            if (index >= questions.length) {//handle potential errors
                reject(`An error occurred while fetching the trivia question`);
            } else {
                resolve(question); //resolve the promise
            }
        } ); //delay to simulate time to fetch a quesiton
    });
}

function displayQuestion(triviaQuestion) {
    questionDiv.textContent = triviaQuestion.question; //give new content to the div
    answerDiv.value = ''; //reset the answer field
    feedbackDiv.textContent = ''; //reset the feedback div
}

document.querySelector("#questionBtn").addEventListener('click', () => {
    getTriviaQuestion().then((question) => { //get a random question
        currentQuestion = question; //update the currentQuestion variable
        displayQuestion(question); //pass the question to the displayQuestion function
    }).catch((error) => {
        console.error(error); //log any errors
    });
});


document.querySelector("#answerBtn").addEventListener('click', () => {
    const userAnswer = answerDiv.value.trim().toLowerCase(); // User's answer
    let feedbackMessage; // Temporary variable to store feedback message

    if (currentQuestion && userAnswer === currentQuestion.answer.toLowerCase()) {
        // If answer is correct
        feedbackDiv.style.color = "green";
        feedbackMessage = `Great job! Your answer is correct.`;
        correctAnswersCount++; // Increment correct answers count
    } else {
        // If answer is incorrect
        feedbackDiv.style.color = "red";
        feedbackMessage = `Sorry, that is incorrect. The correct answer is: "${currentQuestion.answer}". Try another question!`;
    }

    // Update feedback message in the DOM
    feedbackDiv.textContent = feedbackMessage;

    // Update correct answers count in the DOM
    document.getElementById('correctCount').textContent = `Correct Answers: ${correctAnswersCount}`;
});


