let levels = {
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

function checkStreak() { // Streak system
  let today = new Date().toDateString();
  if(lastDate !== today) {
    let yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    if(lastDate === yesterday.toDateString()) { streak++; } 
    else { streak = 1; }
    localStorage.setItem('lastDate', today);
    localStorage.setItem('streak', streak);
  }
}

function playSound(type) {
  document.getElement