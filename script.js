//need to load the tasks from local storage into the elements.
//need to save tasks to localstorage when the user presses the save button.
//add ability to change text in the long grey element when clicking on it

//task class
class task{
    text;
    hour;
    constructor(txt, hr){
        this.text=txt;
        this.hour = hr;
    }
}

//array of tasks
var tasks = [];
//body element, used for listening for events
var bodyEl = $("body");
//currentDay element, used to change the day at the top of the page
var currentDayEl = $("#currentDay");

var loadTasks = function(){
    //this function gets the tasks from localStorage and puts them into the tasks array.
    var local = localStorage.getItem("tasks");
    tasks = JSON.parse(local);
    return;
}

var displayTasks = function(){
    //this function uses the tasks array to display the tasks on the screen
    //loop through the tasks and put the text into the hours. 
    for(var i; i < tasks.length; i++){
        var id = "#hour" + tasks.hour;
        var pEl = $(".task-p").closest(id);
        pEl.text(tasks.text);
    }
    return;
}

var saveTasks = function(eL){
    //this function uses the tasks array to save the data into localStorage
    var hourEl = $(eL).parent();
    var hour = hourEl[0].id.replace("hour", "");

    var pEl = hourEl.find("input");
    console.log(pEl);
    //localStorage.setItem("tasks", JSON.stringify(tasks));
    return;
}

var getHour = function(hourStr){
    if(hourStr.includes("PM")){
        hourStr.replace("PM", "");
        hourStr = parseInt(hourStr)
        if(hourStr != 12){
            hourStr += 12;
        }
        //PM add 12 to hour if it's not noon.
    }
    else{
        hourStr.replace("AM","");
        hourStr = parseInt(hourStr);
    }
    return hourStr;
}

var colorHours = function(){
    //this function sets the color of the hours depending on whether they are current, future or past
    var now = dayjs().format("HH");

    for(var i = 0; i < 9 ;i++){
        var id = "#hour" + i;;
        var thisHour = $("p").closest(id).text().trim();

        thisHour = getHour(thisHour);
        var taskField = $(id).find(".task");

        //reset task field class
        taskField.removeClass("past");
        taskField.removeClass("present");
        taskField.removeClass("future");

        if(thisHour < now){
            //past
            taskField.addClass("past");
        }
        else if (thisHour == now){
            //present
            taskField.addClass("present");
        }
        else{
            //future
            taskField.addClass("future");
        }
    }
    return;
}

var displayCurrentDay = function(){
    var now = dayjs().format("dddd, MMMM D");
    currentDayEl.text(now);
    return;
}

//add event listener to body for save button
bodyEl.on("click", ".saveBtn", function(event){
    saveTasks(event.target);
});

displayCurrentDay();
colorHours();

//make setInterval function that calls colorHours every 5 minutes
setInterval(colorHours,300000);

 

//add event listener that replaces the paragraph element in the hour with an input on focus
bodyEl.on("click", ".task", function(){
    var taskEl = $("<input>").addClass("enter-task w-100 h-100 border border-none bg-transparent p-0 position-absolute");
    taskEl.type = "text";
    $(this).children().replaceWith(taskEl)

    taskEl.trigger("focus")
});

//add event listener that replace input element in the hour with a paragraph on blur
bodyEl.on("blur", ".task", function(){
    var taskEl = $("<p>").addClass("task-p");
    $(this).children().replaceWith(taskEl)
});

displayTasks();






