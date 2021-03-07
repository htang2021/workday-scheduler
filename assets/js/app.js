// Assumptions:
// 1. Regular business hours span from 8AM to 5PM
// 2. Time is based on system local time

// Wait till DOM ready ****************
$( document ).ready(function() {

    //Initializing variables ------------------
    const past = "past";
    const present = "present";
    const future = "future";
    
    //Initializing an object array to store the hours and the respective tasks
    var workdayScheduleObj = [];

    //var timeBlockContainer = document.querySelector(".container");
    let timeBlockContainer = $('.container');

    // Use moment.js to display time in a specific format
    var currentDate = moment().format("dddd, MMMM Do");
    $("#currentDay").html(currentDate);

    var currentHour = parseInt(moment().format("HH"));


    // Build hourly parent containers starting from 0900 (9AM) hour to 1700 hour (5PM)
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

    // code block to create each of the time/tasks/saveBtn containers for all hourly rows
    var timeCol = [];
    var tasksCol = [];
    var saveCol = [];

    // Set default timeHorizon to future
    var timeHorizon = future;

    for (let i = 8; i <= 17; i++) {

        // Assign and call function to return hour in AM/PM
        var showTime = showHour(i);

        timeCol.push(`<div class="col mb-1 hour" id="hour-${i}">${showTime}</div>`);
        tasksCol.push(`<div class="col-12 col-md-10 mb-1 description" id="taskInput-${i}"></div>`);
        saveCol.push(`<div class="col-sm-12 col-md mb-1 saveBtn" id="saveBtn-${i}"></div>`);

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

        $("#taskInput-"+i).append(`<textarea class="form-control ${timeHorizon}" id="text-${i}"></textarea>`);
        $("#saveBtn-"+i).append(`<i class='far fa-save' id='btnImage-${i}'></i>`);
    
    }

    var scheduleObj;
    // Retrieve local storage if not null
    var getScheduleObj = () => {
        if (localStorage) {
            scheduleObj = JSON.parse(localStorage.getItem("schedule"));
        } 
    }

    // Place object values into the scheduler
    var loadSchedule = () => {

        // Call function to retrieve parsed objects array from localStorage
        getScheduleObj();

        // Write parsed objects into HTML elements based on index
        $.each(scheduleObj, function (arrayIndex, value) {
                document.getElementById(`text-${arrayIndex+8}`).innerHTML = this.plan;
        });  
    }
    
    // Write object array to localStorage
    var saveSchedule = (i, workdayScheduleObj) => {

        var savedObj = JSON.parse(localStorage.getItem("schedule"));
        if (!savedObj) savedObj = []; //initialize if object is null

        savedObj[i-8] = JSON.parse(workdayScheduleObj[i-8]);
 
        // initialize objects that are null with blank space
        for (let i=8; i<= 17; i++) {
            if (!savedObj[i-8]) {
                savedObj[i-8] = {"time": i, "plan": " "};
            } 
        }
        
        // save the whole ojbect array into storage
        localStorage.setItem("schedule", JSON.stringify(savedObj));

    }

    // Listen for save button click and write object to array
    // with index starting from 8 to map to 0800 hour in 24 hour format
    for (let i=8; i <= 17; i++) {

        $("#saveBtn-"+i).click(function () {

            var textInput = $(`textarea#text-${i}`).val();
            workdayScheduleObj[i-8] = JSON.stringify({"time":i, "plan":textInput});

            saveSchedule(i, workdayScheduleObj);
        });
    }

    // Call function update page with what's in localStorage
    loadSchedule();

});