import { backend } from "declarations/backend";

let timerInterval;
let startTime;
const FOCUS_TIME = 25 * 60 * 1000; // 25 minutes in milliseconds

async function updateSessionCount() {
    const count = await backend.getSessionCount();
    document.getElementById('sessionCount').textContent = count.toString();
}

async function displayRandomQuote() {
    const quote = await backend.getRandomQuote();
    document.getElementById('quote').textContent = quote;
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function updateTimer(endTime) {
    const now = Date.now();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.getElementById('timer').textContent = '00:00';
        handleTimerComplete();
        return;
    }

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

async function handleTimerComplete() {
    showLoading();
    const completed = await backend.endTimer();
    if (completed) {
        await displayRandomQuote();
        await updateSessionCount();
    }
    hideLoading();
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
}

document.getElementById('startBtn').addEventListener('click', async () => {
    showLoading();
    const startTimestamp = await backend.startTimer();
    hideLoading();
    
    startTime = Date.now();
    const endTime = startTime + FOCUS_TIME;
    
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
    
    await displayRandomQuote();
    
    timerInterval = setInterval(() => updateTimer(endTime), 1000);
});

document.getElementById('stopBtn').addEventListener('click', async () => {
    clearInterval(timerInterval);
    await handleTimerComplete();
    document.getElementById('timer').textContent = '25:00';
});

// Initial load
updateSessionCount();
