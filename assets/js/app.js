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

    var scheduleObj;
    // Retrieve the storage object
    var getScheduleObj = () => {
        scheduleObj = JSON.parse(localStorage.getItem("schedule"));
        console.log("HelloThere - ");
        console.log(scheduleObj);
    }

    // Place object values into the scheduler
    var loadSchedule = () => {

        getScheduleObj();

        // Write 
        $.each(workdayScheduleObj, function (arrayIndex, value) {
            if (!this.plan) {
                console.log("no data");
            } else {
                console.log(arrayIndex+8 + " " + this.plan);
                document.getElementById(`text-${arrayIndex+8}`).innerHTML = this.plan;
            }
        });  
    }
    
    // Write object array to localStorage
    var saveSchedule = (workdayScheduleObj) => {
        // console.log(`${i} is ${typeof(textInput)} and is ${textInput}`);
        // getScheduleObj();
        console.log("workday #3 below");
        console.log(workdayScheduleObj);
        // scheduleObj[i-8] = {"time":i, "plan":textInput};
        // console.log(scheduleObj);
        localStorage.setItem("schedule", JSON.stringify(workdayScheduleObj));
        console.log("workday #4 below");
        console.log(workdayScheduleObj);
    }

    // Listen for save button click and write object to array
    // with index starting from 8 to map to 0800 hour in 24 hour format
    for (let i=8; i <= 17; i++) {

        $("#saveBtn-"+i).click(function () {

            console.log(`Button ${i} has been pushed`);

            var textInput = $(`textarea#text-${i}`).val();
            workdayScheduleObj[i-8] = {"time":i, "plan":textInput};

            console.log(JSON.stringify(workdayScheduleObj));
            console.log("workday is on top of me");
 
            saveSchedule(workdayScheduleObj);
            console.log("workday#2 and below");
            console.log(workdayScheduleObj);
        });
    }

    loadSchedule();

});