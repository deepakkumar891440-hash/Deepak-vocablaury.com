// =========================
// Deepak Vocabulary App
// script.js - Part 1
// =========================

// Levels Data
const levels = {
  1: [
    { en: "Apple", hi: "सेब", options: ["सेब", "केला", "आम", "अंगूर"] },
    { en: "Book", hi: "किताब", options: ["किताब", "कलम", "कॉपी", "बैग"] },
    { en: "Cat", hi: "बिल्ली", options: ["बिल्ली", "कुत्ता", "गाय", "घोड़ा"] },
    { en: "Dog", hi: "कुत्ता", options: ["कुत्ता", "बिल्ली", "शेर", "हाथी"] },
    { en: "Water", hi: "पानी", options: ["पानी", "दूध", "चाय", "जूस"] },
    { en: "Flower", hi: "फूल", options: ["फूल", "फल", "पत्ता", "पेड़"] },
    { en: "House", hi: "घर", options: ["घर", "स्कूल", "दुकान", "मंदिर"] },
    { en: "School", hi: "विद्यालय", options: ["विद्यालय", "घर", "बाज़ार", "होटल"] },
    { en: "Sun", hi: "सूरज", options: ["सूरज", "चाँद", "तारा", "आसमान"] },
    { en: "Moon", hi: "चाँद", options: ["चाँद", "सूरज", "तारा", "बादल"] }
  ],

  2: [
    { en: "Beautiful", hi: "सुंदर", options: ["सुंदर", "बदसूरत", "छोटा", "बड़ा"] },
    { en: "Friend", hi: "दोस्त", options: ["दोस्त", "दुश्मन", "शिक्षक", "डॉक्टर"] },
    { en: "Money", hi: "पैसा", options: ["पैसा", "समय", "काम", "नाम"] },
    { en: "Family", hi: "परिवार", options: ["परिवार", "समाज", "देश", "दुनिया"] },
    { en: "Country", hi: "देश", options: ["देश", "शहर", "गाँव", "राज्य"] },
    { en: "Health", hi: "स्वास्थ्य", options: ["स्वास्थ्य", "बीमारी", "दवा", "डॉक्टर"] },
    { en: "Education", hi: "शिक्षा", options: ["शिक्षा", "खेल", "नौकरी", "व्यापार"] },
    { en: "Success", hi: "सफलता", options: ["सफलता", "असफलता", "हार", "समस्या"] },
    { en: "Travel", hi: "यात्रा", options: ["यात्रा", "घर", "खाना", "सोना"] },
    { en: "Problem", hi: "समस्या", options: ["समस्या", "समाधान", "सवाल", "जवाब"] }
  ],

  3: [
    { en: "Technology", hi: "प्रौद्योगिकी", options: ["प्रौद्योगिकी", "विज्ञान", "इतिहास", "कला"] },
    { en: "Environment", hi: "पर्यावरण", options: ["पर्यावरण", "प्रदूषण", "जंगल", "नदी"] },
    { en: "Leadership", hi: "नेतृत्व", options: ["नेतृत्व", "टीम", "कंपनी", "अनुसरण"] },
    { en: "Innovation", hi: "नवाचार", options: ["नवाचार", "नकल", "परंपरा", "रिवाज"] },
    { en: "Opportunity", hi: "अवसर", options: ["अवसर", "समस्या", "हार", "डर"] },
    { en: "Responsibility", hi: "जिम्मेदारी", options: ["जिम्मेदारी", "आज़ादी", "अधिकार", "कानून"] },
    { en: "Develop", hi: "विकसित करना", options: ["विकसित करना", "तोड़ना", "बनाना", "खराब करना"] },
    { en: "Global", hi: "वैश्विक", options: ["वैश्विक", "स्थानीय", "राष्ट्रीय", "छोटा"] },
    { en: "Future", hi: "भविष्य", options: ["भविष्य", "अतीत", "वर्तमान", "समय"] },
    { en: "Knowledge", hi: "ज्ञान", options: ["ज्ञान", "अज्ञान", "डर", "शक्ति"] }
  ]
};

// Variables
let currentLevel = 1;
let currentQuestion = 0;
let score = Number(localStorage.getItem("score")) || 0;
let completedLevels =
  JSON.parse(localStorage.getItem("completedLevels")) || [];

const app = document.getElementById("app");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
// =========================
// script.js - Part 2
// =========================

// Daily Streak
let streak = Number(localStorage.getItem("streak")) || 0;
let lastDate = localStorage.getItem("lastDate");

function checkStreak() {
    const today = new Date().toDateString();

    if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate === yesterday.toDateString()) {
            streak++;
        } else {
            streak = 1;
        }

        localStorage.setItem("streak", streak);
        localStorage.setItem("lastDate", today);
    }
}

// Sound
function playSound(type) {
    if (type === "correct") {
        correctSound.currentTime = 0;
        correctSound.play();
    } else {
        wrongSound.currentTime = 0;
        wrongSound.play();
    }
}

// Progress
function getProgress() {
    return ((currentQuestion) / levels[currentLevel].length) * 100;
}

// Home Screen
function showHome() {

    checkStreak();

    app.innerHTML = `
        <img src="logo.png" class="logo">

        <h2>📚 Deepak Vocabulary</h2>

        <div class="top-bar">
            <span>⭐ Score: ${score}</span>
            <span>🔥 ${streak}</span>
        </div>

        <div class="progress-bar">
            <div class="progress" style="width:100%"></div>
        </div>

        <h3>Select Level</h3>

        <button onclick="startLevel(1)">
            Level 1
        </button>

        <button onclick="startLevel(2)"
            ${completedLevels.includes(1) ? "" : "disabled"}>
            Level 2 🔒
        </button>

        <button onclick="startLevel(3)"
            ${completedLevels.includes(2) ? "" : "disabled"}>
            Level 3 🔒
        </button>
    `;
}

// Start Level
function startLevel(level) {
    currentLevel = level;
    currentQuestion = 0;

    showQuestion();
}
// =========================
// script.js - Part 3
// =========================

// Question Show
function showQuestion() {

    const q = levels[currentLevel][currentQuestion];

    app.innerHTML = `
        <img src="logo.png" class="logo">

        <div class="top-bar">
            <span>⭐ ${score}</span>
            <span>Level ${currentLevel}</span>
        </div>

        <div class="progress-bar">
            <div class="progress" style="width:${((currentQuestion + 1) / levels[currentLevel].length) * 100}%"></div>
        </div>

        <h2>What is the meaning of</h2>

        <h1>${q.en}</h1>

        <div id="options"></div>
    `;

    const optionsDiv = document.getElementById("options");

    q.options.forEach(option => {

        const btn = document.createElement("button");

        btn.innerText = option;

        btn.onclick = () => checkAnswer(option);

        optionsDiv.appendChild(btn);

    });

}

window.checkAnswer = function(selected, btn) {
  let correct = levels[currentLevel][currentWord].hi; // Sahi jawab
  let buttons = document.querySelectorAll('#options button');
  buttons.forEach(b => b.disabled = true);

  if(selected === correct) { // Ab seedha text se compare hoga
    score += 10;
    playSound('correct');
    btn.style.background = '#58A700'; // Sahi hua to hara
    btn.style.borderBottom = '4px solid #4A8E00';
    setTimeout(() => { nextQ(); }, 1000);
  } else {
    playSound('wrong');
    btn.style.background = 'red'; // Galat hua to lal
    btn.style.borderBottom = '4px solid #cc0000';

    // Sahi wala button bhi hara kar do
    buttons.forEach(b => {
      if(b.innerText === correct) {
        b.style.background = '#58A700';
        b.style.borderBottom = '4px solid #4A8E00';
      }
    });

    setTimeout(() => { nextQ(); }, 1500);
  }
  localStorage.setItem('score', score);
}

    } else {

        playSound("wrong");

    }

    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < levels[currentLevel].length) {

            showQuestion();

        } else {

            finishLevel();

        }

    }, 800);

}
// =========================
// script.js - Part 4 (Last)
// =========================

// Finish Level
function finishLevel() {

    if (!completedLevels.includes(currentLevel)) {
        completedLevels.push(currentLevel);
        localStorage.setItem(
            "completedLevels",
            JSON.stringify(completedLevels)
        );
    }

    let message = "🎉 Congratulations!";

    if (currentLevel < 3) {
        message += `<br><br>Level ${currentLevel + 1} Unlocked 🔓`;
    } else {
        message += `<br><br>🏆 You completed all levels!`;
    }

    app.innerHTML = `
        <img src="logo.png" class="logo">

        <h2>${message}</h2>

        <h3>⭐ Total Score: ${score}</h3>

        <button onclick="showHome()">
            🏠 Back to Home
        </button>

        ${
            currentLevel < 3
                ? `<button onclick="startLevel(${currentLevel + 1})">
                    Next Level ➜
                  </button>`
                : ""
        }
    `;
}

// Reset Progress (Optional)
function resetProgress() {

    if (confirm("Reset all progress?")) {

        localStorage.removeItem("score");
        localStorage.removeItem("completedLevels");
        localStorage.removeItem("streak");
        localStorage.removeItem("lastDate");

        score = 0;
        streak = 0;
        completedLevels = [];

        showHome();
    }
}

// App Start
showHome();
