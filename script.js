// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html. This is being achieved with the document .ready function
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // Code to display current date in the top of the page using moment.js from cloudflare cdn in index.html script tag
  $("#currentDay").text(moment().format("MMMM Do YYYY"));

  // anytime a specific blue button per row is click, this function runs, note we have a total of 9 buttons aka 9 rows
  $(".saveBtn").on("click", function () {
    // these 2 variables are for the same row in the calendar app
    var text_input_in_row_clicked = $(this).siblings(".description").val();
    var time_in_row_clicked = $(this).parent().attr("id"); // note that 1pm is hour-13, the div id defined index.html, 2pm is hour-14
    console.log(text_input_in_row_clicked);
    console.log(time_in_row_clicked);
    //set these 2 variables in local storage
    localStorage.setItem(time_in_row_clicked, text_input_in_row_clicked);
    alert("Saved this action successfully");
  })

  // load data from previous input sessions by the user
  $("#hour-9 .description").val(localStorage.getItem("hour-9"));
  $("#hour-10 .description").val(localStorage.getItem("hour-10"));
  $("#hour-11 .description").val(localStorage.getItem("hour-11"));
  $("#hour-12 .description").val(localStorage.getItem("hour-12"));
  $("#hour-13 .description").val(localStorage.getItem("hour-13"));
  $("#hour-14 .description").val(localStorage.getItem("hour-14"));
  $("#hour-15 .description").val(localStorage.getItem("hour-15"));
  $("#hour-16 .description").val(localStorage.getItem("hour-16"));
  $("#hour-17 .description").val(localStorage.getItem("hour-17"));

  // function here is to account for the red, green and gray color coding for each hour that changes every hour
  function account_for_each_hour() {
    // get current hour to compare against all 9 time rows in calendar from 9am to 5pm
    var current_hour = parseInt(moment().hour());
    // looping over each time rows to compare whether we are before, during or after each time row
    $(".time-block").each(function () {
      var time_row_hour = parseInt($(this).attr("id").split("hour")[1].substring(1));
      /*console.log("time row hour is");
      console.log(typeof(time_row_hour));
      console.log(time_row_hour);
      console.log("current hour is");
      console.log(typeof(current_hour));
      console.log(current_hour);*/
      if (current_hour === time_row_hour) {
        // this time row needs to be colored red
        $(this).addClass("present");
        $(this).removeClass("past");
        $(this).removeClass("future");
      }
      else if (current_hour < time_row_hour) {
        // this time row needs to be colored green
        $(this).addClass("future");
        $(this).removeClass("present");
        $(this).removeClass("past");
      }
      else {
        // this time row needs to be gray
        $(this).addClass("past");
        $(this).removeClass("present");
        $(this).removeClass("future");
      }
    })
  }
  // call it here every time .ready runs 
  // recall .ready runs AFTER after the browser has finished rendering all the elements in the htmls
  account_for_each_hour();
});
