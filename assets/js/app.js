// Use moment.js to display time in a specific format
var currentDate = moment().format("dddd, MMMM Do");
var currentDateContainer = document.getElementById("currentDay");
currentDateContainer.innerHTML = currentDate;


