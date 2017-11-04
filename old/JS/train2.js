
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCW47KHO278a976ymR9_Ey67HhPq7optQE",
    authDomain: "trainsplanesautos-6585a.firebaseapp.com",
    databaseURL: "https://trainsplanesautos-6585a.firebaseio.com",
    projectId: "trainsplanesautos-6585a",
    storageBucket: "",
    messagingSenderId: "1032896442983"
  };
  firebase.initializeApp(config);


var database = firebase.database().ref();

function sendUpdate(name, dest, freq, start) {
  let newRef = database.push();
  newRef.set({
    "tName": name,
    "tDest": dest,
    "tFreq": freq,
    "tStart": start
  });
}

database.on("value", function(snapshot) {
  let data = snapshot.val()
  console.log(data)
  $("#tableDest").empty();
  for (var key in data) {
    let p = data[key];
    console.log(p)
    addToTable(p.tName, p.tDest, p.tFreq, p.tStart);
  }
})

function addToTable(name, dest, freq, start) {
  // let months = Math.floor(moment().diff(moment(date, "DD-MM-YY"), "months"));

  $("<tr>")
    .append($("<td>").text(name))
    .append($("<td>").text(dest))
    .append($("<td>").text(freq))
    .append($("<td>").text(start))
    // .append($("<td>").text(months))
    // .append($("<td>").text(formatMoney(rate)))
    // .append($("<td>").text(formatMoney(months*rate)))
    .appendTo($("#tableDest"));
}
$("#addTrain").on("submit", function(e) {
    e.preventDefault();
    console.log("button works");
    form = $(this).serializeArray().reduce(function(obj, item) {
      console.log(form);
      obj[item.name] = item.value;
      return obj;
    }, {});

    let invalid = false
      if (!invalid) {
      sendUpdate(form.Itrainname, form.Itraindest, parseInt(form.Itrainfreq), form.Itrainstar, );
    }

    // $(this).trigger("reset");
  })
