const quizData = {
    "questions": [
      {
        "question": "Which of the following is not an operating system?",
        "options": ["A) Windows", "B) Linux", "C) Oracle", "D) macOS"],
        "answer": "C"
      },
      {
        "question": "What is the main purpose of an IP address?",
        "options": ["A) To identify a device on a network", "B) To store data", "C) To compile code", "D) To display graphics"],
        "answer": "A"
      },
      {
        "question": "Which of the following languages is used for web development?",
        "options": ["A) C++", "B) Python", "C) HTML", "D) Java"],
        "answer": "C"
      },
      {
        "question": "In computer networks, what does LAN stand for?",
        "options": ["A) Local Area Network", "B) Large Area Network", "C) Light Access Network", "D) Linear Area Network"],
        "answer": "A"
      },
      {
        "question": "What does GUI stand for?",
        "options": ["A) General User Interface", "B) Graphical User Interface", "C) Global User Interface", "D) Graphic Utility Interface"],
        "answer": "B"
      },
      {
        "question": "Which data structure uses LIFO (Last In First Out) principle?",
        "options": ["A) Queue", "B) Stack", "C) Array", "D) Linked List"],
        "answer": "B"
      },
      {
        "question": "What is the time complexity of binary search in a sorted array?",
        "options": ["A) O(n)", "B) O(log n)", "C) O(n^2)", "D) O(1)"],
        "answer": "B"
      },
      {
        "question": "Which sorting algorithm is considered the fastest for large datasets?",
        "options": ["A) Bubble Sort", "B) Selection Sort", "C) Quick Sort", "D) Insertion Sort"],
        "answer": "C"
      },
      {
        "question": "What data structure is used to implement a priority queue?",
        "options": ["A) Stack", "B) Linked List", "C) Heap", "D) Array"],
        "answer": "C"
      },
      {
        "question": "Which of the following is not a characteristic of a binary search tree?",
        "options": ["A) All left descendants are less than the node", "B) All right descendants are greater than the node", "C) Each node has at most two children", "D) All nodes are unique"],
        "answer": "D"
      },
      {
        "question": "What is the goal of Artificial Intelligence?",
        "options": ["A) To create systems that can only perform specific tasks", "B) To create systems that can perform tasks that require human intelligence", "C) To create systems that can perform mathematical computations faster", "D) To create systems that are easy to use"],
        "answer": "B"
      },
      {
        "question": "Which of the following is a type of machine learning?",
        "options": ["A) Supervised Learning", "B) Taught Learning", "C) Educated Learning", "D) Instructed Learning"],
        "answer": "A"
      },
      {
        "question": "In which of the following areas is natural language processing (NLP) used?",
        "options": ["A) Image recognition", "B) Speech recognition", "C) Game playing", "D) Data mining"],
        "answer": "B"
      },
      {
        "question": "What is a neural network in the context of AI?",
        "options": ["A) A biological network of neurons", "B) A type of programming language", "C) A framework for machine learning algorithms", "D) A graphical representation of data"],
        "answer": "C"
      },
      {
        "question": "Which of the following is not a type of reinforcement learning?",
        "options": ["A) Positive Reinforcement", "B) Negative Reinforcement", "C) Supervised Reinforcement", "D) Punishment"],
        "answer": "C"
      },
      {
        "question": "If A is the sister of B, and B is the brother of C, how is C related to A?",
        "options": ["A) Brother", "B) Sister", "C) Cousin", "D) Cannot be determined"],
        "answer": "D"
      },
      {
        "question": "In a code language, if 'FOUR' is written as '5 15 21 18', how would 'NINE' be written?",
        "options": ["A) 14 9 14 5", "B) 13 9 13 5", "C) 15 9 15 5", "D) 16 9 16 5"],
        "answer": "A"
      },
      {
        "question": "What is the next number in the sequence: 2, 6, 12, 20, 30, ...?",
        "options": ["A) 40", "B) 42", "C) 44", "D) 36"],
        "answer": "B"
      },
      {
        "question": "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?",
        "options": ["A) Yes", "B) No", "C) Cannot be determined", "D) Only some Bloops are Lazzies"],
        "answer": "A"
      },
      {
        "question": "A clock shows the time as 3:15. What is the angle between the hour and the minute hand?",
        "options": ["A) 7.5 degrees", "B) 15 degrees", "C) 30 degrees", "D) 37.5 degrees"],
        "answer": "D"
      }
    ]
  };

let correctAnswers = quizData.questions.map(q => q.answer);
let userAnswers = [];
const totalQuestions = correctAnswers.length;
const timePerQuestion = 10; // Time given for each question in seconds
let totalTime = totalQuestions * timePerQuestion; // Total time in seconds
let timer;

function navigateTo(pageId) {
    document.querySelectorAll('.head > div').forEach(div => div.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function submitQuiz() {
    // Collect user answers
    userAnswers = [];
    quizData.questions.forEach((q, i) => {
        let answer = document.querySelector(`input[name="q${i}"]:checked`);
        userAnswers.push(answer ? answer.value : null);
    });

    // Calculate score
    let correctCount = userAnswers.filter((answer, i) => answer === correctAnswers[i]).length;
    let percentage = (correctCount / totalQuestions) * 100;
    document.getElementById('score').innerText = `Score: ${correctCount}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    navigateTo('result');
    clearInterval(timer);
}

function retakeQuiz() {
    userAnswers = [];
    totalTime = totalQuestions * timePerQuestion; // Reset total time
    navigateTo('home');
}

function startTimer() {
    timer = setInterval(() => {
        totalTime--;
        if (totalTime <= 0) {
            clearInterval(timer);
            submitQuiz();
        } else {
            document.getElementById('timer').innerText = `Time left: ${Math.floor(totalTime / 60)}:${totalTime % 60 < 10 ? '0' : ''}${totalTime % 60}`;
        }
    }, 1000);
}

function loadQuestions() {
    quizData.questions.forEach((q, index) => {
        const pageIndex = Math.floor(index / 5) + 1;
        const questionContainer = document.querySelector(`#pg${pageIndex} .question-container`);
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${q.options.map((opt, optIndex) => `
                <label><input type="radio" name="q${index}" value="${String.fromCharCode(65 + optIndex)}"> ${opt}</label><br>
            `).join('')}
        `;
        questionContainer.appendChild(questionDiv);
    });
}

// Start timer and load questions when quiz starts
document.querySelector('#start-quiz').addEventListener('click', () => {
    loadQuestions();
    navigateTo('pg1');
    startTimer();
});

document.querySelector('#next1').addEventListener('click', () => navigateTo('pg2'));
document.querySelector('#next2').addEventListener('click', () => navigateTo('pg3'));
document.querySelector('#next3').addEventListener('click', () => navigateTo('pg4'));
document.querySelector('#prev2').addEventListener('click', () => navigateTo('pg1'));
document.querySelector('#prev3').addEventListener('click', () => navigateTo('pg2'));
document.querySelector('#prev4').addEventListener('click', () => navigateTo('pg3'));
document.querySelector('#submit-quiz').addEventListener('click', submitQuiz);
document.querySelector('#restart-quiz').addEventListener('click', retakeQuiz);

// Initial page load setup
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
});
