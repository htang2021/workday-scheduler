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

    // code block to create each of the time/tasks/save columns per row-hour
    var timeCol = [];
    var tasksCol = [];
    var saveCol = [];

    // Set default timeHorizon to future
    var timeHorizon = future;

    for (let i = 8; i <= 17; i++) {

        // Assign and call function to return hour in AM/PM
        var showTime = showHour(i);
        timeCol.push(`<div class="col mb-1 hour" id="hour-${i}">${showTime}</div>`);
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

        $("#taskInput-"+i).append(`<textarea class="form-control ${timeHorizon}" id="text-${i}"></textarea>`);
        $("#saveBtn-"+i).append(`<i class='far fa-save' id='btnImage-${i}'></i>`);
    
    }

    var test = [];

    // Listen for save button click and write object to array
    for (let i=8; i <= 17; i++) {
        $("#saveBtn-"+i).click(function () {
            console.log(`Button ${i} has been pushed`);
            var textInput = document.getElementById("#text-"+i).nodeValue;
            console.log(textInput);
        });
    }

    // Write object to localStorage
    var workdayScheduleObj = [
        {
        time: "9am",
        task: "what I do at 9am"
        },
        {time: "10am",
        task: "Eat breakfast"
        }
    ];
    console.log(`${workdayScheduleObj[0].time}, rise and shine!  Time to do your ${workdayScheduleObj[1].task}.`);

    var saveSchedule = () => {
        localStorage.setItem("schedule", JSON.stringify(workdayScheduleObj));
    }

    // write user input to a variable and put into an array object
    // var taskToObj = function() {
        
    //     var taskInput = $("

    // }

    saveSchedule();
});