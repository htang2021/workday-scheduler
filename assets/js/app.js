// Wait till DOM ready ****************
$( document ).ready(function() {

    //Initializing variables ------------------
    const past = "past";
    const present = "present";
    const future = "future";

    //var timeBlockContainer = document.querySelector(".container");
    let timeBlockContainer = $('.container');

    // Use moment.js to display time in a specific format
    var currentDate = moment().format("dddd, MMMM Do");
    $("#currentDay").html(currentDate);

    var currentHour = parseInt(moment().format("HH"));


    // Build hourly parent rows starting from 0900 (9AM) hour to 1700 hour (5PM)
    var hourlyRows = [];
    for (let i = 8; i <= 17; i++) {
        hourlyRows.push("<div class='row row-hour" + i + "'></div>");
    }
    timeBlockContainer.append(hourlyRows.join(""));


    // Determine if hour is AM/PM and return hour in AM/PM accordingly
    var showHour = (hour) => {
        if (hour === 12) {
            return "12PM";
        } else if (hour > 12) {
            return `${hour-12}PM`;
        } else {
            return `${hour}AM`;
        }
    };

    // code block to create each of the time/tasks/save columns per row-hour
    var timeCol = [];
    var tasksCol = [];
    var saveCol = [];

    // Set default timeHorizon to future
    var timeHorizon = future;

    for (let i = 8; i <= 17; i++) {

        // Assign and call function to return hour in AM/PM
        var showTime = showHour(i);
        timeCol.push(`<div class="col mb-1 hour" id="time-${i}">${showTime}</div>`);
        tasksCol.push(`<div class="col-10 mb-1 description" id="taskInput-${i}"></div>`);
        saveCol.push(`<div class="col mb-1 saveBtn" id="saveBtn-${i}"></div>`);

        $(".row-hour"+i).append(timeCol[i-8]);
        $(".row-hour"+i).append(tasksCol[i-8]);
        $(".row-hour"+i).append(saveCol[i-8]);

        // Determine time horizon: present, past, or future
        if(i === currentHour) {
            timeHorizon = present;
        } else if (i > currentHour) {
            timeHorizon = future;
        } else {
            timeHorizon = past;
        }

        $("#taskInput-"+i).append(`<textarea class="form-control ${timeHorizon}"></textarea>`);
        $("#saveBtn-"+i).append(`<i class='far fa-save' id='btnImage-${i}'></i>`);
    
    }

   





});