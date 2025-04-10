// Get quiz ID from URL
const params = new URLSearchParams(window.location.search);
const quizId = params.get('id');

fetch('../data/quizzes-full.json') // This will contain full questions
  .then(res => res.json())
  .then(data => {
    const quiz = data[quizId];
    document.getElementById('quiz-title').innerText = quiz.title;

    const container = document.getElementById('questions-container');
    quiz.questions.forEach((q, index) => {
      const qDiv = document.createElement('div');
      qDiv.innerHTML = `
        <p><b>Q${index + 1}: ${q.question}</b></p>
        ${q.options.map((opt, i) => `
          <label>
            <input type="radio" name="q${index}" value="${i}"> ${opt}
          </label><br/>
        `).join('')}
      `;
      container.appendChild(qDiv);
    });
  });

function submitQuiz() {
  const answers = document.querySelectorAll('input[type="radio"]:checked');
  let score = 0;

  fetch('../data/quizzes-full.json')
    .then(res => res.json())
    .then(data => {
      const quiz = data[quizId];
      answers.forEach((ans, index) => {
        if (parseInt(ans.value) === quiz.questions[index].answer) {
          score++;
        }
      });
      document.getElementById('result').innerText = `✅ You scored ${score}/${quiz.questions.length}`;
    });
}
