
const API_KEY = "AIzaSyDFHM6CM1TG1Ndgu2gtFNISL8l4WC1YIDA";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;





let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Speak function to handle text-to-speech
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
}

// Greeting function based on the time of day
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

// enable greeting on page load
window.addEventListener('load', () => {
    wishMe();
});

// Speech Recognition setup 
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (speechRecognition) {
    let recognition = new speechRecognition();
    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        speak("I'm sorry, I couldn't understand that. Could you please repeat?");
    };

    recognition.onend = () => {
        // Reset UI elements after recognition ends
        voice.style.display = "none";
        btn.style.display = "flex";
    };

    // Button click to start speech recognition
    btn.addEventListener("click", () => {
        recognition.start();
        voice.style.display = "block";
        btn.style.display = "none";
    });
} else {
    console.warn("Speech Recognition not supported in this browser.");
    speak("Your browser does not support speech recognition. Please try using a different browser.");
}

// Process command based on recognized speech
function takeCommand(message) {
    console.log(message)
    voice.style.display = "none";
    btn.style.display = "flex";
    
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am your virtual assistant, created by Abhinav Kumar.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(`Today's date is ${date}`);
    } else {

( async()=>{
    console.log(message + "  right----")
                const res = await generateAPIRespone(message);
                // console.log(res)
                speak(res)
    
            })();
       

                
        
}

    }

    const generateAPIRespone = async (message) => {
        console.log(message)
   
        const userMessage=message + " in 70 words only"
        console.log(userMessage)
   
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        role: "user",
                        parts: [{ text: userMessage }]
                    }]
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error.message);
    
            const apiResponse = data?.candidates[0].content.parts[0].text.replace(/\*(.*?)\*/g, '$1');
            console.log(apiResponse)
            // console.log(typeof(apiResponse))
            return apiResponse
    
          
        } catch (error) {
            console.log(error ," server is not responding")
          }
    };


  
