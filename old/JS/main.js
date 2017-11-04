$("#newEmployeeForm").on("submit", function(e) {
	e.preventDefault();

	form = $(this).serializeArray().reduce(function(obj, item) {
		obj[item.name] = item.value;
		return obj;
	}, {});

	let invalid = false

	if (form.firstName === "" || form.lastName === "") {
		invalid = true;
		alert("Please Enter your Name");
	}
	if (form.role === "") {
		invalid = true;
		alert("Please provide a Job Title");
	}

	// if (form.hireDate === "") {
	// 	invalid = true;
	// 	alert("Please provide a Hire Date")
	// } else if (form.hireDate.length != 8
	// 		|| !moment(form.hireDate, "DD-MM-YY")._isValid
	// 		|| moment().diff(moment(form.hireDate, "DD-MM-YY"), "months") < 0
	// 	) {
	// 	invalid = true;
	// 	alert("Please provide a valid Hire Date");
	// }

	if (form.rate === "") {
		invalid = true;
		alert("Please provide a Monthly Salary");
	}


	if (!invalid) {
		sendUpdate(form.Itrainname, form.Itrain, form.role, form.hireDate, parseInt(form.rate));
	}

	$(this).trigger("reset");
});

function formatMoney(rate) {
	console.log(rate)
	dispRate ='$' + parseInt(rate);
	// dispRate = '$' + parseInt(rate).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');//formats 7000 into $7,000.00
	console.log(dispRate)
	// dispRate = dispRate.slice(0, -3);
	return dispRate;
}

function addToTable(last, first, role, date, rate) {
	let months = Math.floor(moment().diff(moment(date, "DD-MM-YY"), "months"));

	$("<tr>")
		.append($("<td>").text(last))
		.append($("<td>").text(first))
		.append($("<td>").text(role))
		.append($("<td>").text(date))
		.append($("<td>").text(months))
		.append($("<td>").text(formatMoney(rate)))
		.append($("<td>").text(formatMoney(months*rate)))
		.appendTo($("#tableDest"));
}