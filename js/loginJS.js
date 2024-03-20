var apiEndPoints = {};
fetch('js/config.json')
.then(response => response.json())
.then(data => {
    apiEndPoints = data.apiEndPoints;
    console.log(apiEndPoints);
})
.catch(error => console.error('Error fetching config:', error));

document.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector('#loginButton');
    button.addEventListener('click', function() {
        var number = document.getElementById('number').value;
        callAPI(number);
    });
});

var callAPI = (number) => {
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
            document.getElementById('error').textContent = 'Number doesnt exsist in the database. Please Register';
        } else if (data.statusCode === 200) {
            var username = data.username;
            var mobile_number = data.mobile_number;
            var user_id = data.user_id;
            var url = "schedule_reminder.html?name=" + encodeURIComponent(username) + "&number=" + encodeURIComponent(mobile_number) + "&user_id=" + encodeURIComponent(user_id);
            window.location.href = url;
        } else {
            throw new Error('Unexpected response from server.');
        }
    })
    .catch(error => console.error('Error:', error));
};