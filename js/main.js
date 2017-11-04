var url ="https://trainsplanesautos-6585a.firebaseio.com";
var dataRef = new Firebase(url);
// console.log(dataRef)
var name ='';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';
// var database = firebase.database().ref();

$(document).ready(function() {

     $("#add-train").on("click", function() {
     	// YOUR TASK!!!
     	// Code in the logic for storing and retrieving the most recent user.
     	// Dont forget to provide initial data to your Firebase database.
     	name = $('#name-input').val().trim();
     	destination = $('#destination-input').val().trim();
     	firstTrainTime = $('#start-input').val().trim();
     	frequency = $('#frequency-input').val().trim();
          firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesTillTrain = frequency - tRemainder;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");

     	// Code for the push
     	keyHolder = dataRef.push({
     		name: name,
     		destination: destination,
     		firstTrainTime: firstTrainTime,  
     		frequency: frequency,
               nextTrainFormatted: nextTrainFormatted,
               minutesTillTrain: minutesTillTrain
     	});

          $('#name-input').val('');
     	$('#destination-input').val('');
     	$('#start-input').val('');
     	$('#frequency-input').val('');

     	return false;
     });
  
     dataRef.on("child_added", function(childSnapshot) {
	// full list of items to the well

		$('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
               "<td class='col-xs-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + // Next Arrival Formula ()
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + // Minutes Away Formula
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-xs'>" + "</td>" +
               // "<td class='col-xs-1'>" + "<input type='submit' value='refresh train' class='refresh-train btn btn-primary btn-xs'>" + "</td>" +
               "</tr>");
// Handle the errors
}, function(errorObject){
	console.log("Errors handled: " + errorObject.code)
});
$("body").on("click", ".admin", function(){
     var adminKey = "password"
     var adminEntry = $('#admin-input').val().trim();
     if (adminKey === adminEntry) {
         $("#admin").css("display", "none");
         $("#inputForm").css("display", "inline-block");
     } else {$("#admin").append("Incorrect Try Again ");
     $('#admin-input').val('');

    

     }


});
$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     dataRef.child(getKey).remove();
});
// $("body").on("click", ".refresh-train", function(){
//           firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
//           currentTime = moment();
//           diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//           tRemainder = diffTime % frequency;
//           minutesTillTrain = frequency - tRemainder;
//           nextTrain = moment().add(minutesTillTrain, "minutes");
//           nextTrainFormatted = moment(nextTrain).format("hh:mm"); 
//       dataRef.on("child_added", function(childSnapshot) {
//      full list of items to the well

//           $('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
//                "<td class='col-xs-3'>" + childSnapshot.val().name +
//                "</td>" +
//                "<td class='col-xs-2'>" + childSnapshot.val().destination +
//                "</td>" +
//                "<td class='col-xs-2'>" + childSnapshot.val().frequency +
//                "</td>" +
//                "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + // Next Arrival Formula ()
//                "</td>" +
//                "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + // Minutes Away Formula
//                "</td>" +
//                "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-xs'>" + "</td>" +
//                "<td class='col-xs-1'>" + "<input type='submit' value='refresh train' class='refresh-train btn btn-primary btn-xs'>" + "</td>" +
//                "</tr>");
// // Handle the errors
// }, function(errorObject){
//      console.log("Errors handled: " + errorObject.code)
// });
//      // $(this).closest ('tr').remove();
//      // getKey = $(this).parent().parent().attr('id');
//      // dataRef.child(getKey).remove();
// });

}); // Closes jQuery wrapper
