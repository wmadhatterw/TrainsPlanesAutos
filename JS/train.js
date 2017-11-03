$( document ).ready(function() {
  


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDKmuauSsQ9b88hNG_LEqdHEf9SYDPD1dg",
    authDomain: "team-playas.firebaseapp.com",
    databaseURL: "https://team-playas.firebaseio.com",
    projectId: "team-playas",
    storageBucket: "",
    messagingSenderId: "233694189257"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  var name;
  var role;
  var date;
  var totalMonth;
  var rate;
  var totalBilled;
  // var employees = []

    database.ref().orderByChild('timestamp').startAt(Date.now()).on("child_added", function(snapshot) {
        console.log(snapshot.val())

      if (snapshot.child("employeeName").exists() && snapshot.child("employeeRole").exists()
      && snapshot.child("employeeDate").exists() && snapshot.child("employeeRate").exists()) {
        name = snapshot.val().employeeName;
        role = snapshot.val().employeeRole;
        date = snapshot.val().employeeDate;
        rate = snapshot.val().employeeRate;
    
      var rows = "";

        $.each(snapshot.val(), function(){
          console.log(this)
          rows = "<tr><td>" + name + "</td><td>" + role + "</td><td>"
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

  name = $("#employee-name").val();
  role = $("#employee-role").val();
  date = $("#employee-date").val();
  // totalMonth = $("#employee-totalMonth").val();
  rate = $("#employee-rate").val();
  // totalBilled = $("#employee-rate").val();

  database.ref().set({
    employeeName: name,
    employeeRole: role,
    employeeDate: date,
    // employeeMonth: totalMonth,
    employeeRate: rate,
    // employeeBillable: totalBilled,
  })
  // console.log(employeeName);
  // console.log(employeeRole);
  // console.log(employeeDate);
  // console.log(employeeMonth);
  // console.log(employeeRate);
  // console.log(employeeBillable);

    $("#submit").on("click", function(event) {
        // Prevent form from submitting
        event.preventDefault();

        // Input Variables

        name = $("#employee-name").val();
        role = $("#employee-role").val();
        date = $("#employee-date").val();
        // totalMonth = $("#employee-totalMonth").val();
        rate = $("#employee-rate").val();
        // totalBilled = $("#employee-rate").val();

            database.ref().push({
              employeeName: name,
              employeeRole: role,
              employeeDate: date,
              // employeeMonth: totalMonth,
              employeeRate: rate,
              timestamp: firebase.database.ServerValue.TIMESTAMP
              // employeeBillable: totalBilled,
            });
      console.log(name);
      console.log(role);
      console.log(date);
      // console.log(employeeMonth);
      console.log(rate);
      // console.log(employeeBillable);


    });


  });
})

