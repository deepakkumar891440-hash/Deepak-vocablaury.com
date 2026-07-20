document.addEventListener("DOMContentLoaded", function() {

const levels = {
 1: [ {en: "Apple", hi: "सेब", options: ["सेब", "केला", "आम", "अंगूर"]}, {en: "Book", hi: "किताब", options: ["किताब", "कलम", "कॉपी", "बैग"]}, {en: "Cat", hi: "बिल्ली", options: ["बिल्ली", "कुत्ता", "चूहा", "गाय"]}, {en: "Dog", hi: "कुत्ता", options: ["कुत्ता", "बिल्ली", "घोड़ा", "शेर"]}, {en: "Water", hi: "पानी", options: ["पानी", "चाय", "दूध", "जूस"]}, {en: "Good", hi: "अच्छा", options: ["अच्छा", "बुरा", "सुंदर", "गंदा"]}, {en: "Happy", hi: "खुश", options: ["खुश", "उदास", "गुस्सा", "डरा"]}, {en: "House", hi: "घर", options: ["घर", "दुकान", "स्कूल", "अस्पताल"]}, {en: "Eat", hi: "खाना", options: ["खाना", "पीना", "सोना", "खेलना"]}, {en: "Flower", hi: "फूल", options: ["फूल", "पत्ता", "पेड़", "फल"]} ],
 2: [ {en: "Beautiful", hi: "सुंदर", options: ["सुंदर", "बदसूरत", "छोटा", "बड़ा"]}, {en: "Friend", hi: "दोस्त", options: ["दोस्त", "दुश्मन", "शिक्षक", "डॉक्टर"]}, {en: "Money", hi: "पैसा", options: ["पैसा", "समय", "काम", "नाम"]}, {en: "Family", hi: "परिवार", options: ["परिवार", "समाज", "देश", "दुनिया"]}, {en: "Country", hi: "देश", options: ["देश", "शहर", "गांव", "राज्य"]}, {en: "Health", hi: "स्वास्थ्य", options: ["स्वास्थ्य", "बीमारी", "दवा", "डॉक्टर"]}, {en: "Education", hi: "शिक्षा", options: ["शिक्षा", "खेल", "नौकरी", "व्यापार"]}, {en: "Travel", hi: "यात्रा", options: ["यात्रा", "घर", "खाना", "सोना"]}, {en: "Success", hi: "सफलता", options: ["सफलता", "असफलता", "मेहनत", "भाग्य"]}, {en: "Problem", hi: "समस्या", options: ["समस्या", "समाधान", "सवाल", "जवाब"]} ],
 3: [ {en: "Ambition", hi: "महत्वाकांक्षा", options: ["महत्वाकांक्षा", "आलस्य", "डर", "खुशी"]}, {en: "Develop", hi: "विकसित करना", options: ["विकसित करना", "खराब करना", "बनाना", "तोड़ना"]}, {en: "Environment", hi: "पर्यावरण", options: ["पर्यावरण", "प्रदूषण", "जंगल", "नदी"]}, {en: "Technology", hi: "प्रौद्योगिकी", options: ["प्रौद्योगिकी", "विज्ञान", "कला", "इतिहास"]}, {en: "Opportunity", hi: "अवसर", options: ["अवसर", "समस्या", "चुनौती", "हार"]}, {en: "Responsibility", hi: "जिम्मेदारी", options: ["जिम्मेदारी", "आजादी", "अधिकार", "कानून"]}, {en: "Globalization", hi: "वैश्वीकरण", options: ["वैश्वीकरण", "स्थानीयकरण", "विकास", "पतन"]}, {en: "Innovation", hi: "नवाचार", options: ["नवाचार", "नकल", "परंपरा", "रिवाज"]}, {en: "Sustainable", hi: "टिकाऊ", options: ["टिकाऊ", "नाजुक", "मजबूत", "कमजोर"]}, {en: "Leadership", hi: "नेतृत्व", options: ["नेतृत्व", "अनुसरण", "टीम", "कंपनी"]} ]
};

let currentLevel = 1;
let currentWord = 0;
let score = parseInt(localStorage.getItem('score')) || 0;
let completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || [];
let streak = parseInt(localStorage.getItem('streak')) || 0;
let lastDate = localStorage.getItem('lastDate');

function checkStreak() {
  let today = new Date().toDateString();
  if(lastDate!== today) {
    let yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    if(lastDate === yesterday.toDateString()) { streak++; }
    else { streak = 1; }
    localStorage.setItem('lastDate', today);
    localStorage.setItem('streak', streak);
  }
}

function playSound(type) {
  let sound = document.getElementById(type + 'Sound');
  if(sound) sound.play().catch(()=>{});
}

function shuffle(array) { // Sahi wala shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadLevelScreen() {
  checkStreak();
  document.getElementById('app').innerHTML = `
    <img src="./logo.png" alt="Logo" class="logo">
    <div class="top-bar"><span>⭐ Score: ${score}</span> <span>🔥 ${streak}</span></div>
    <h2>📚 Deepak Vocabulary</h2>
    <div class="progress-bar"><div class="progress" style="width: 100%"></div></div>
    <h3>Select Level</h3>
    <button onclick="startLevel(1)">Level 1 🟢</button>
    <button onclick="startLevel(2)" ${!completedLevels.includes(1)? 'disabled' : ''}>Level 2 🟡 ${!completedLevels.includes(1)? '🔒' : ''}</button>
    <button onclick="startLevel(3)" ${!completedLevels.includes(2)? 'disabled' : ''}>Level 3 🔴 ${!completedLevels.includes(2)? '🔒' : ''}</button>
  `;
}

window.startLevel = function(level) {
  currentLevel = level;
  currentWord = 0;
  loadWord();
}

function loadWord() {
  let wordData = levels[currentLevel][currentWord];
  let progress = ((currentWord) / 10) * 100;

  let shuffledOptions = shuffle([...wordData.options]); // Copy karke shuffle

  document.getElementById('app').innerHTML = `
    <div class="top-bar"><span>⭐ XP: ${score}</span> <span>❤️</span></div>
    <div class="progress-bar"><div class="progress" style="width: ${progress}%"></div></div>
    <h3>Level ${currentLevel} - Word ${currentWord+1} / 10</h3>
    <h1>${wordData.en}</h1>
    <div id="options"></div>
  `;

  let optionsDiv = document.getElementById('options');
  shuffledOptions.forEach(opt => {
    let btn = document.createElement('button');
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt, btn, wordData.hi);
    optionsDiv.appendChild(btn);
  });
}

window.checkAnswer = function(selected, btn, correct) {
  let buttons = document.querySelectorAll('#options button');
  buttons.forEach(b => b.disabled = true);

  if(selected === correct) {
    score += 10;
    playSound('correct');
    btn.style.background = '#58A700';
    setTimeout(() => { nextQ(); }, 1000);
  } else {
    playSound('wrong');
    btn.style.background = 'red';
    // Sahi wala bhi dikha do
    buttons.forEach(b => {
      if(b.innerText === correct) {
        b.style.background = '#58A700';
      }
    });
    setTimeout(() => { nextQ(); }, 1500);
  }
  localStorage.setItem('score', score);
}

function nextQ() {
  currentWord++;
  if(currentWord >= 10) {
    if(!completedLevels.includes(currentLevel)) {
      completedLevels.push(currentLevel);
      localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
    }
    alert(`Level ${currentLevel} Complete! +100 XP 🎉`);
    loadLevelScreen();
  } else {
    loadWord();
  }
}

loadLevelScreen(); // Game Start

});