// EDIT THIS SECTION TO CHANGE YOUR SETTINGS!
var DEFAULT_CONFIG = {
    timeSize: 80,
    timeColor: "#ffffff", 
    timeTop: 60,
    dateSize: 20,
    dateColor: "#ffffff", 
    dateTop: 30,
    use24Hour: false      // Change to true for 24-hour time
};

var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var refreshTimer = null;

function onload() {
    applyConfiguration();
    refreshClock();
}

function applyConfiguration() {
    var timeElement = document.getElementById("time");
    var dateElement = document.getElementById("date");

    if (timeElement) {
        timeElement.style.fontSize = DEFAULT_CONFIG.timeSize + "px";
        timeElement.style.color = DEFAULT_CONFIG.timeColor;
        timeElement.style.paddingTop = DEFAULT_CONFIG.timeTop + "px";
    }

    if (dateElement) {
        dateElement.style.fontSize = DEFAULT_CONFIG.dateSize + "px";
        dateElement.style.color = DEFAULT_CONFIG.dateColor;
        dateElement.style.paddingTop = DEFAULT_CONFIG.dateTop + "px";
    }
}

function refreshClock() {
    var now = new Date();
    applyConfiguration();
    
    var timeEl = document.getElementById("time");
    var dateEl = document.getElementById("date");
    
    if (timeEl) timeEl.textContent = formatTime(now, DEFAULT_CONFIG.use24Hour);
    if (dateEl) dateEl.textContent = formatDate(now);

    if (refreshTimer !== null) clearTimeout(refreshTimer);
    refreshTimer = setTimeout(refreshClock, millisecondsUntilNextMinute(now));
}

function formatTime(date, use24Hour) {
    var hours = date.getHours();
    var minutes = pad(date.getMinutes());

    if (!use24Hour) {
        hours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
    }
    return hours + ":" + minutes;
}

function formatDate(date) {
    return dayNames[date.getDay()] + ", " + date.getDate() + " " + monthNames[date.getMonth()];
}

function pad(value) {
    return value < 10 ? "0" + value : String(value);
}

function millisecondsUntilNextMinute(date) {
    return ((60 - date.getSeconds()) * 1000) - date.getMilliseconds();
}