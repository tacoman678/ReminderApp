var apiEndPoints = {};
fetch('js/config.json')
.then(response => response.json())
.then(data => {
    apiEndPoints = data.apiEndPoints;
})

function extractParameters(url) {
    var parameters = {};
    var queryString = url.split('?')[1];
    if (queryString) {
        var pairs = queryString.split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1]);
            parameters[key] = value;
        }
    }
return parameters;
}

var user_id;
window.addEventListener('load', function() {
    var params = extractParameters(window.location.href);
    var name = params['name'];
    var number = params['number'];
    user_id = params['user_id'];
    var message = "Hello " + name + " with mobile number: " + number + " and user id: " + user_id;
    document.getElementById('userInfo').textContent = message;
});

var form_addition = "<div id='form_addition'><label>Total number of reminders:</label><input type='number' min='2' max='10' id='num_reminders' value='2'><label>Amount of time between each reminder:</label><div class='form group'><input type='number' min='0' max='31' id='interval_days' value='0'><label>Days</label></div><div class='form_group'><input type='number' min='0' max='23' id='interval_hours' value='0'><label>Hours</label></div><div class='form_group'><input type='number' min='0' max='59' id='interval_minutes' value='0'><label>Minutes</label></div></div>"

document.addEventListener('DOMContentLoaded', function(){
    var checkbox = document.querySelector('#recurring');
    checkbox.addEventListener('change', function(event){
        var form = document.querySelector('#reminder_form');
        if(event.target.checked) {
            form.insertAdjacentHTML('beforeend', form_addition);
        } else {
            var formAddition = document.querySelector('#form_addition');
            if(formAddition) formAddition.parentNode.removeChild(formAddition);
        }
    });
});

document.addEventListener('DOMContentLoaded', function(){
    var submitBtn = document.getElementById('registerButton');
    submitBtn.addEventListener('click', function(event){
        var reminder_type = document.getElementById('reminder_type').value;
        var date = document.getElementById('datepicker').value;
        var time = document.getElementById('time').value;
        var num_reminders = 0;
        var interval_ms = 0;
        if (document.getElementById('form_addition')){
            var num_reminders = parseInt(document.getElementById('num_reminders').value);
            var interval_days = parseInt(document.getElementById('interval_days').value);
            var interval_hours = parseInt(document.getElementById('interval_hours').value);
            var interval_minutes = parseInt(document.getElementById('interval_minutes').value);
            if((num_reminders < 2 || num_reminders > 10) || (interval_days < 0 || interval_days > 31) || (interval_hours < 0 || interval_hours > 23) || (interval_minutes < 0 || interval_minutes > 59)){
                document.getElementById('error').innerHTML = 'Please enter valid amount of time between reminders:<br>Number of Reminders(2-10),<br>Days(0-31),<br>Hours(0-23),<br>Minutes(0-59).';
                return;
            }
            var interval_ms = (interval_days * 24 * 60 * 60 * 1000) + (interval_hours * 60 * 60 * 1000) + (interval_minutes * 60 * 1000); 
        }
        var current_timestamp = new Date().getTime();
        var selected_timestamp = new Date(date + 'T' + time).getTime();

        if (selected_timestamp <= current_timestamp) {
            document.getElementById('error').textContent = 'Please select a date and time ahead of the current date and time.';
            return;
        }

        if (reminder_type.trim() !== '' && date.trim() !== '' && time.trim() !== '') {
            callAPI(user_id, reminder_type, date, time, num_reminders, interval_ms)
        } else {
            document.getElementById('error').textContent = 'Please enter a reminder type, date and time.';
            return;
        }
    });
});

var callAPI = (user_id, reminder_type, date, time, num_reminders, interval_ms) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"user_id" : user_id, "reminder_type" : reminder_type,"date" : date,"time" : time, "num_reminders" : num_reminders, "interval_ms" : interval_ms});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch(apiEndPoints.addReminder, requestOptions)
    .then(response => response.json())
    .then(data => {
        if(data.statusCode === 200){
            console.log("success");
        }
        if(data.statusCode === 500){
            console.log(data.body);
        }
    })
    .catch(error => console.error('Error:', error));
}