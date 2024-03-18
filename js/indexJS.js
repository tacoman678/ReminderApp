var apiEndPoints = {};
fetch('js/config.json')
.then(response => response.json())
.then(data => {
    apiEndPoints = data.apiEndPoints;
    console.log(apiEndPoints);
})
.catch(error => console.error('Error fetching config:', error));

var callAPI = (name, number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"number": number});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // Make API call to check if number exists in the database
    fetch(apiEndPoints.checkNumber, requestOptions)
    .then(response => response.json())
    .then(data => {
        if (data.statusCode === 404) {
            // Number does not exist, proceed with API call to add name and number to UserData db
            return callAPItoAdd(name, number);
        } else if (data.statusCode === 200) {
            // Number exists, display error message
            document.getElementById('error').textContent = 'Number already exists in the database. Please Login';
        } else {
            throw new Error('Unexpected response from server.');
        }
    })
    .catch(error => console.error('Error:', error));
}

// callAPItoAdd function to add name and number to the database
var callAPItoAdd = (name, number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"name": name, "number": number});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // Make API call to add name and number to the database
    fetch(apiEndPoints.addToDatabase, requestOptions)
    .then(response => response.json())
    .then(data => {
        if (data.statusCode === 404) {
            document.getElementById('error').textContent = 'Please enter a valid number';
        }
        else{
            var name = data.name;
            var number = data.number;
            var user_id = data.user_id;
            var url = "schedule_reminder.html?name=" + encodeURIComponent(name) + "&number=" + encodeURIComponent(number) + "&user_id=" + encodeURIComponent(user_id);
            window.location.href = url;
        }
    })
    .catch(error => console.error('Error:', error));
}
