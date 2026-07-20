<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deepak Vocabulary</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    #app {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .progress-bar {
      background: #e0e0e0;
      height: 10px;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 15px;
    }
    .progress {
      background: #58A700;
      height: 100%;
      width: 0%;
      transition: width 0.3s ease;
    }
    button {
      width: 100%;
      padding: 12px;
      margin: 8px 0;
      font-size: 16px;
      border: none;
      border-radius: 8px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      transition: background 0.2s, opacity 0.2s;
    }
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    button:hover:not(:disabled) {
      opacity: 0.9;
    }
    .logo {
      max-width: 100px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>

  <!-- मुख्य ऐप कंटेनर -->
  <div id="app"></div>

  <!-- ऑडियो एलिमेंट्स -->
  <audio id="correctSound" src="correct.mp3" preload="auto"></audio>
  <audio id="wrongSound" src="wrong.mp3" preload="auto"></audio>

  <script>
  document.addEventListener("DOMContentLoaded", function() {

    const levels = {
      1: [
        {en: "Apple", hi: "सेब", options: ["सेब", "केला", "आम", "अंगूर"]},
        {en: "Book", hi: "किताब", options: ["किताब", "कलम", "कॉपी", "बैग"]},
        {en: "Cat", hi: "बिल्ली", options: ["बिल्ली", "कुत्ता", "चूहा", "गाय"]},
        {en: "Dog", hi: "कुत्ता", options: ["कुत्ता", "बिल्ली", "घोड़ा", "शेर"]},
        {en: "Water", hi: "पानी", options: ["पानी", "चाय", "दूध", "जूस"]},
        {en: "Good", hi: "अच्छा", options: ["अच्छा", "बुरा", "सुंदर", "गंदा"]},
        {en: "Happy", hi: "खुश", options: ["खुश", "उदास", "गुस्सा", "डरा"]},
        {en: "House", hi: "घर", options: ["घर", "दुकान", "स्कूल", "अस्पताल"]},
        {en: "Eat", hi: "खाना", options: ["खाना", "पीना", "सोना", "खेलना"]},
        {en: "Flower", hi: "फूल", options: ["फूल", "पत्ता", "पेड़", "फल"]}
      ],
      2: [
        {en: "Beautiful", hi: "सुंदर", options: ["सुंदर", "बदसूरत", "छोटा", "बड़ा"]},
        {en: "Friend", hi: "दोस्त", options: ["दोस्त", "दुश्मन", "शिक्षक", "डॉक्टर"]},
        {en: "Money", hi: "पैसा", options: ["पैसा", "समय", "काम", "नाम"]},
        {en: "Family", hi: "परिवार", options: ["परिवार", "समाज", "देश", "दुनिया"]},
        {en: "Country", hi: "देश", options: ["देश", "शहर", "गांव", "राज्य"]},
        {en: "Health", hi: "स्वास्थ्य", options: ["स्वास्थ्य", "बीमारी", "दवा", "डॉक्टर"]},
        {en: "Education", hi: "शिक्षा", options: ["शिक्षा", "खेल", "नौकरी", "व्यापार"]},
        {en: "Travel", hi: "यात्रा", options: ["यात्रा", "घर", "खाना", "सोना"]},
        {en: "Success", hi: "सफलता", options: ["सफलता", "असफलता", "मेहनत", "भाग्य"]},
        {en: "Problem", hi: "समस्या", options: ["समस्या", "समाधान", "सवाल", "जवाब"]}
      ],
      3: [
        {en: "Ambition", hi: "महत्वाकांक्षा", options: ["महत्वाकांक्षा", "आलस्य", "डर", "खुशी"]},
        {en: "Develop", hi: "विकसित करना", options: ["विकसित करना", "खराब करना", "बनाना", "तोड़ना"]},
        {en: "Environment", hi: "पर्यावरण", options: ["पर्यावरण", "प्रदूषण", "जंगल", "नदी"]},
        {en: "Technology", hi: "प्रौद्योगिकी", options: ["प्रौद्योगिकी", "विज्ञान", "कला", "इतिहास"]},
        {en: "Opportunity", hi: "अवसर", options: ["अवसर", "समस्या", "चुनौती", "हार"]},
        {en: "Responsibility", hi: "जिम्मेदारी", options: ["जिम्मेदारी", "आजादी", "अधिकार", "कानून"]},
        {en: "Globalization", hi: "वैश्वीकरण", options: ["वैश्वीकरण", "स्थानीयकरण", "विकास", "पतन"]},
        {en: "Innovation", hi: "नवाचार", options: ["नवाचार", "नकल", "परंपरा", "रिवाज"]},
        {en: "Sustainable", hi: "टिकाऊ", options: ["टिकाऊ", "नाजुक", "मजबूत", "कमजोर"]},
        {en: "Leadership", hi: "नेतृत्व", options: ["नेतृत्व", "अनुसरण", "टीम", "कंपनी"]}
      ]
    };

    let currentLevel = 1;
    let currentWord = 0;
    let score = parseInt(localStorage.getItem('score')) || 0;
    let completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || [];
    let streak = parseInt(localStorage.getItem('streak')) || 0;
    let lastDate = localStorage.getItem('lastDate');

    // Daily Streak सिस्टम
    function checkStreak() {
      let today = new Date().toDateString();
      if (lastDate !== today) {
        let yesterday = new Date(); 
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastDate === yesterday.toDateString()) { 
          streak++; 
        } else { 
          streak = 1; 
        }
        localStorage.setItem('lastDate', today);
        localStorage.setItem('streak', streak);
      }
    }

    // साउंड सिस्टम: .mp3 फ़ाइल + Synth बीप (अगर फाइल ना मिले तो भी बीप बजेगा)
    function playSound(type) {
      let sound = document.getElementById(type + 'Sound');
      if (sound && sound.src && !sound.error) {
        sound.currentTime = 0;
        sound.play().catch(() => playSyntheticSound(type));
      } else {
        playSyntheticSound(type);
      }
    }

    // ऑटो-जनरेटेड साउंड (ताकि साउंड हमेशा बजे)
    function playSyntheticSound(type) {
      try {
        let ctx = new (window.AudioContext || window.webkitAudioContext)();
        let osc = ctx.createOscillator();
        let gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'correct') {
          osc.frequency.setValueAtTime(600, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
        } else {
          osc.frequency.setValueAtTime(300, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
        }

        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } catch (e) {
        // AudioContext सपोर्ट न होने पर साइलेंट फेलियर
      }
    }

    // ऐरे शफल फ़ंक्शन (Fisher-Yates)
    function shuffle(array) {
      let arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    // होम/लेवल स्क्रीन
    function loadLevelScreen() {
      checkStreak();
      document.getElementById('app').innerHTML = `
        <img src="./logo.png" alt="Logo" class="logo" onerror="this.style.display='none'">
        <div class="top-bar">
          <span>⭐ Score: ${score}</span> 
          <span>🔥 ${streak} Days</span>
        </div>
        <h2>📚 Deepak Vocabulary</h2>
        <div class="progress-bar"><div class="progress" style="width: 100%"></div></div>
        <h3>Select Level</h3>
        <button onclick="startLevel(1)">Level 1 🟢</button>
        <button onclick="startLevel(2)" ${!completedLevels.includes(1) ? 'disabled' : ''}>
          Level 2 🟡 ${!completedLevels.includes(1) ? '🔒' : ''}
        </button>
        <button onclick="startLevel(3)" ${!completedLevels.includes(2) ? 'disabled' : ''}>
          Level 3 🔴 ${!completedLevels.includes(2) ? '🔒' : ''}
        </button>
        <br><br>
        <button onclick="resetProgress()" style="background-color: #ff4d4d; margin-top: 10px;">Reset Progress 🔄</button>
      `;
    }

    // डेटा रीसेट करने का फ़ंक्शन
    window.resetProgress = function() {
      if (confirm("क्या आप अपनी प्रोग्रेस (Score और Levels) रीसेट करना चाहते हैं?")) {
        localStorage.clear();
        score = 0;
        completedLevels = [];
        streak = 1;
        loadLevelScreen();
      }
    };

    window.startLevel = function(level) {
      currentLevel = level;
      currentWord = 0;
      loadWord();
    };

    function loadWord() {
      let wordData = levels[currentLevel][currentWord];
      let progress = ((currentWord) / 10) * 100;
      let shuffledOptions = shuffle(wordData.options);

      document.getElementById('app').innerHTML = `
        <div class="top-bar">
          <button onclick="goHome()" style="width: auto; padding: 4px 10px; font-size:12px; margin: 0;">🏠 Home</button>
          <span>⭐ XP: ${score}</span>
        </div>
        <div class="progress-bar"><div class="progress" style="width: ${progress}%"></div></div>
        <h3>Level ${currentLevel} - Word ${currentWord+1} / 10</h3>
        <h1 style="font-size: 2.2rem; margin: 15px 0;">${wordData.en}</h1>
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

    window.goHome = function() {
      if (confirm("क्या आप यह लेवल बीच में छोड़ना चाहते हैं?")) {
        loadLevelScreen();
      }
    };

    window.checkAnswer = function(selected, btn, correct) {
      let buttons = document.querySelectorAll('#options button');
      buttons.forEach(b => b.disabled = true);

      if (selected === correct) {
        score += 10;
        playSound('correct');
        btn.style.background = '#58A700';
        btn.style.color = '#fff';
        setTimeout(() => { nextQ(); }, 1000);
      } else {
        playSound('wrong');
        btn.style.background = '#d9534f';
        btn.style.color = '#fff';
        
        // सही उत्तर हाइलाइट करना
        buttons.forEach(b => {
          if (b.innerText === correct) {
            b.style.background = '#58A700';
            b.style.color = '#fff';
          }
        });
        setTimeout(() => { nextQ(); }, 1500);
      }
      localStorage.setItem('score', score);
    };

    function nextQ() {
      currentWord++;
      if (currentWord >= levels[currentLevel].length) {
        if (!completedLevels.includes(currentLevel)) {
          completedLevels.push(currentLevel);
          localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
        }
        alert(`Level ${currentLevel} Complete! +100 XP 🎉`);
        loadLevelScreen();
      } else {
        loadWord();
      }
    }

    // गेम स्टार्ट
    loadLevelScreen();

  });
  </script>
</body>
</html>