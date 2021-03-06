$( document ).ready(function() {
    //var timeBlockContainer = document.querySelector(".container");
    let timeBlockContainer = $('.container');

    // Use moment.js to display time in a specific format
    var currentDate = moment().format("dddd, MMMM Do");
    $("#currentDay").html(currentDate);

    var currentHour = moment().format("HH");

    // Determine if currentHour is AM or PM
    //var isAmOrPm = (currentHour >= 12)? "PM" : "AM";

    // var showHour = (hour) => {
    //     if (hour >= 12) {
    //         return `${hour}PM`;
    //     } else {
    //         return `${hour}AM`;
    //     }
    // };

    // var timeCol = [];
    // var tasksCol = [];
    // var saveCol = [];
    // var buildRowColumns = (i) => {
    //         //Function to return hour in AM/PM
    //         var showTime = showHour(i);
    //         timeCol.push(`<div class='col mb-1 hour' id='time-${i}'>${showTime}</div>`);
    //         //tasksCol.push()

    //     $(".row").append(timeCol.join(""));

    // }

    // Build hourly rows starting from 0900 (9AM) hour to 1700 hour (5PM)
    var hourlyRows = [];
    for (let i = 8; i <= 17; i++) {
        hourlyRows.push("<div class='row row-hour" + i + "'></div>");

        //Build each of the columns within the hourly row container
        //buildRowColumns(i);

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

    // code block to create each of the time/tasks/save columns per row
    var timeCol = [];
    var tasksCol = [];
    var saveCol = [];
    var buildRowColumns = () => {
        for (let i = 8; i <= 17; i++) {
            //Function to return hour in AM/PM
            var showTime = showHour(i);
            timeCol.push(`<div class="col mb-1 hour" id="time-${i}">${showTime}</div>`);
            tasksCol.push(`<div class="col-10 mb-1 description" id="taskInput-${i}"></div>`);
            saveCol.push(`<div class="col mb-1 saveBtn" id="saveBtn-${i}"></div>`);

            $(`".row-hour${i}`).append(timeCol[i+8]);
            // $(".row").append(tasksCol.join(""));
            // $(".row").append(saveCol.join(""));

        }

        // $(".row").append(timeCol.join(""));
        // $(".row").append(tasksCol.join(""));
        // $(".row").append(saveCol.join(""));
    }

    buildRowColumns();
});