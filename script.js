// API Integration URL
const API_KEY = 'your_api_key_here';  // Replace with your actual API key (e.g., OpenWeatherMap API key)
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q={city}&appid=${API_KEY}&units=metric`;

// DOM Elements
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Function to simulate ChatGPT's response
function displayMessage(message, fromUser = false) {
  const messageElem = document.createElement('div');
  messageElem.textContent = message;
  messageElem.style.textAlign = fromUser ? 'right' : 'left';
  chatBox.appendChild(messageElem);
  chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
}

// Function to fetch weather data from the API
async function fetchWeatherData(city) {
  try {
    const response = await fetch(API_URL.replace('{city}', city));
    const data = await response.json();

    if (data.cod === '404') {
      return "Sorry, I couldn't find the weather for that city.";
    }

    return `The current temperature in ${city} is ${data.main.temp}°C with ${data.weather[0].description}.`;
  } catch (error) {
    console.error(error);
    return "Oops, something went wrong while fetching the weather.";
  }
}

// Handling User Input
sendBtn.addEventListener('click', async () => {
  const userQuestion = userInput.value;
  
  // Display User Input
  displayMessage(userQuestion, true);
  
  // Handle weather-related queries
  if (userQuestion.toLowerCase().includes("weather")) {
    const city = userQuestion.split("in")[1].trim();
    if (city) {
      const weatherMessage = await fetchWeatherData(city);
      displayMessage(weatherMessage);
    } else {
      displayMessage("Please specify a city. For example: 'weather in London'");
    }
  } else {
    displayMessage("I can only provide weather updates right now. Try asking about the weather.");
  }
  
  // Clear input field after sending message
  userInput.value = '';
});
