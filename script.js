let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    const selectedQuestions = shuffleArray([...questions]).slice(0, 10);
    startTrivia(selectedQuestions);
}

function startTrivia(selectedQuestions) {
    window.selectedQuestions = selectedQuestions;
    showScreen("gameScreen");
    loadQuestion();
}

function loadQuestion() {
    const question = window.selectedQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = question.text;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => {
            checkAnswer(option);
            disableOptions();
        };
        optionsContainer.appendChild(button);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("nextButton").classList.add("hidden");
}

function checkAnswer(selectedOption) {
    const question = window.selectedQuestions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");
    const optionsContainer = document.getElementById("options");
    const optionButtons = optionsContainer.getElementsByTagName("button");

    // Disable all options after selecting an answer
    disableOptions();

    for (let button of optionButtons) {
        // Check if the button's text matches the selected answer
        if (button.textContent === selectedOption) {
            if (selectedOption === question.correct) {
                button.innerHTML = `${selectedOption} ✔️`; // Add checkmark if correct
                button.classList.add("correct-answer");
                feedback.textContent = "Correct!";
                feedback.className = "correct";
                score++;
            } else {
                button.innerHTML = `${selectedOption} ❌`; // Add "X" if incorrect
                button.classList.add("incorrect-answer");
                feedback.textContent = `Incorrect. The correct answer is: ${question.correct}`;
                feedback.className = "incorrect";
            }
        }
    }

    // Show next button
    document.getElementById("nextButton").classList.remove("hidden");
}

function disableOptions() {
    const optionsContainer = document.getElementById("options");
    const optionButtons = optionsContainer.getElementsByTagName("button");
    for (let button of optionButtons) {
        button.disabled = true; // Disable each answer option button
    }
}

function enableOptions() {
    const optionsContainer = document.getElementById("options");
    const optionButtons = optionsContainer.getElementsByTagName("button");
    for (let button of optionButtons) {
        button.disabled = false; // Enable each answer option button
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < window.selectedQuestions.length) {
        enableOptions(); // Re-enable buttons for the next question
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById("score").textContent = score;
    showScreen("endScreen");
}

function showCredits() {
    showScreen("creditsScreen");
}

function showTitleScreen() {
    showScreen("titleScreen");
}

function showScreen(screenId) {
    document.getElementById("titleScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("endScreen").classList.add("hidden");
    document.getElementById("creditsScreen").classList.add("hidden");
    document.getElementById(screenId).classList.remove("hidden");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Load title screen on page load
window.onload = () => {
    showScreen("titleScreen");
};
