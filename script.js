const subscriptionKey = '2nBB4TcfeArb746rricVWdBIEn0zD18NVK7CJEflgMOy4ehFpnRsJQQJ99ALACGhslBXJ3w3AAAbACOGC36K'; // Replace with your actual subscription key
const region = 'centralindia'; // Replace with your actual region
const translatorEndpoint = `https://${region}.api.cognitive.microsoft.com/translator/text/v3.0/translate`;

const translateButton = document.getElementById('translateButton');
const sourceText = document.getElementById('sourceText');
const translatedText = document.getElementById('translatedText');
const targetLanguage = document.getElementById('targetLanguage');

const helpModal = document.getElementById('helpModal');
const feedbackModal = document.getElementById('feedbackModal');
const closeHelp = document.getElementById('closeHelp');
const closeFeedback = document.getElementById('closeFeedback');
const helpBtn = document.getElementById('helpBtn');
const feedbackBtn = document.getElementById('feedbackBtn');

helpBtn.addEventListener('click', () => {
  helpModal.style.display = 'block';
});

feedbackBtn.addEventListener('click', () => {
  feedbackModal.style.display = 'block';
});

closeHelp.addEventListener('click', () => {
  helpModal.style.display = 'none';
});

closeFeedback.addEventListener('click', () => {
  feedbackModal.style.display = 'none';
});

document.getElementById('feedbackForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const feedback = document.getElementById('feedbackText').value;

  // Send email using EmailJS
  try {
    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      feedback: feedback,
      to_email: 'rohit.salke.aids.2023@vpkbiet.org',
    });
    alert('Thank you for your feedback!');
    feedbackModal.style.display = 'none';
  } catch (error) {
    alert('Failed to send feedback. Please try again later.');
  }
});

translateButton.addEventListener('click', async () => {
  const text = sourceText.value;
  const targetLang = targetLanguage.value;

  if (!text) {
    translatedText.value = 'Please enter text to translate.';
    return;
  }

  try {
    const response = await fetch(translatorEndpoint + `?api-version=3.0&to=${targetLang}`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': region,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ Text: text }]),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    translatedText.value = data[0].translations[0].text;

  } catch (error) {
    console.error('Error during translation:', error);
    translatedText.value = `Translation failed: ${error.message}`;
  }
});

// Language Code and Name Mapping (Add more languages as needed)
const languageMap = {
  'ar': 'Arabic',
  'de': 'German',
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'hi': 'Hindi',
  'it': 'Italian',
  'ja': 'Japanese',
  'ko': 'Korean',
  'ms': 'Malay',
  'pt': 'Portuguese',
  'ro': 'Romanian',
  'ru': 'Russian',
  'tr': 'Turkish',
  'zh-Hans': 'Chinese (Simplified)',
  'zh-Hant': 'Chinese (Traditional)',
  'af': 'Afrikaans',
  'am': 'Amharic',
  'as': 'Assamese',
  'az': 'Azerbaijani',
  'be': 'Belarusian',
  'bn': 'Bengali',
  'bs': 'Bosnian',
  'ca': 'Catalan',
  'cs': 'Czech',
  'cy': 'Welsh',
  'da': 'Danish',
  'dv': 'Dhivehi',
  'el': 'Greek',
  'eo': 'Esperanto',
  'et': 'Estonian',
  'eu': 'Basque',
  'fa': 'Persian',
  'fi': 'Finnish',
  'fo': 'Faroese',
  'gl': 'Galician',
  'gu': 'Gujarati',
  'he': 'Hebrew',
  'hr': 'Croatian',
  'ht': 'Haitian Creole',
  'hu': 'Hungarian',
  'hy': 'Armenian',
  'id': 'Indonesian',
  'is': 'Icelandic',
  'jw': 'Javanese',
  'ka': 'Georgian',
  'kk': 'Kazakh',
  'km': 'Khmer',
  'kn': 'Kannada',
  'la': 'Latin',
  'lb': 'Luxembourgish',
  'lo': 'Lao',
  'lt': 'Lithuanian',
  'lv': 'Latvian',
  'mk': 'Macedonian',
  'ml': 'Malayalam',
  'mr': 'Marathi',
  'my': 'Burmese',
  'ne': 'Nepali',
  'nl': 'Dutch',
  'nn': 'Norwegian Nynorsk',
  'pa': 'Punjabi',
  'pl': 'Polish',
  'ps': 'Pashto',
  'qu': 'Quechua',
  'sl': 'Slovenian',
  'sq': 'Albanian',
  'sr': 'Serbian',
  'sv': 'Swedish',
  'sw': 'Swahili',
  'ta': 'Tamil',
  'te': 'Telugu',
  'th': 'Thai',
  'tl': 'Tagalog',
  'uk': 'Ukrainian',
  'ur': 'Urdu',
  'vi': 'Vietnamese',
  'xh': 'Xhosa',
  'yi': 'Yiddish',
  'zu': 'Zulu'
};

// Load supported languages
async function loadLanguages() {
  Object.keys(languageMap).forEach(langCode => {
    const option = document.createElement('option');
    option.value = langCode;
    option.textContent = languageMap[langCode];
    targetLanguage.appendChild(option);
  });
}

loadLanguages();

// Initialize EmailJS
emailjs.init('YOUR_USER_ID'); // Replace with your user ID
