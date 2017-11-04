$( document ).ready(function() {
  


 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDtRfOn3S6oM5TybW7ZtzGOedqCb9C3TNM",
    authDomain: "tranes-99ff2.firebaseapp.com",
    databaseURL: "https://tranes-99ff2.firebaseio.com",
    projectId: "tranes-99ff2",
    storageBucket: "",
    messagingSenderId: "469980085494"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  var trainName;
  var trainDest;
  var trainStart;
  var trainFreq;

    database.ref().orderByChild('timestamp').startAt(Date.now()).on("child_added", function(snapshot) {
        console.log(snapshot.val())

      if (snapshot.child("train_Name").exists() && snapshot.child("train_Dest").exists()
      && snapshot.child("train_Start").exists() && snapshot.child("train_Freq").exists()) {
        trainName = snapshot.val().train_Name;
        trainDest = snapshot.val().train_Dest;
        trainStart = snapshot.val().train_Start;
        trainFreq = snapshot.val().train_Freq;
    
      var rows = "";

        $.each(snapshot.val(), function(){
          console.log(this)
          rows = "<tr><td>" + trainName + "</td><td>" + role + "</td><td>"
           + date + "</td><td>" + this.employeeMonth + "</td></td>" + rate
           + "</td></tr>" + this.employeeBillable;
        });

        $("#ce").append(rows);
    }
});

  $("#submit").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Input Variables

  trainName = $("#train-name").val();
  trainDest = $("#train-role").val();
  trainStart = $("#train-date").val();
  trainFreq= $("#train-freq").val();
  

  database.ref().set({
    train_Name: trainName,
    train_dest: trainDest,
    train_Start: trainStart,
    train_Freq: trainFreq,
   
  })


    // $("#submit").on("click", function(event) {
    //     // Prevent form from submitting
    //     event.preventDefault();

    //     // Input Variables

    //     name = $("#employee-name").val();
    //     role = $("#employee-role").val();
    //     date = $("#employee-date").val();
    //     // totalMonth = $("#employee-totalMonth").val();
    //     rate = $("#employee-rate").val();
    //     // totalBilled = $("#employee-rate").val();

    //         database.ref().push({
    //           employeeName: name,
    //           employeeRole: role,
    //           employeeDate: date,
    //           // employeeMonth: totalMonth,
    //           employeeRate: rate,
    //           timestamp: firebase.database.ServerValue.TIMESTAMP
    //           // employeeBillable: totalBilled,
    //         });
    //   console.log(name);
    //   console.log(role);
    //   console.log(date);
    //   // console.log(employeeMonth);
    //   console.log(rate);
    //   // console.log(employeeBillable);


    // });


  });
})

