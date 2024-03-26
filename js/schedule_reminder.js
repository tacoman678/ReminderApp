var apiEndPoints = {};
fetch('js/config.json')
.then(response => response.json())
.then(data => {
    apiEndPoints = data.apiEndPoints;
})

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
        var inputSTR = reminder_type + date + time;
        if (document.getElementById('form_addition')){
            var num_reminders = parseInt(document.getElementById('num_reminders').value);
            var interval_days = parseInt(document.getElementById('interval_days').value);
            var interval_hours = parseInt(document.getElementById('interval_hours').value);
            var interval_minutes = parseInt(document.getElementById('interval_minutes').value);
            if((num_reminders < 2 || num_reminders > 10) || (interval_days < 0 || interval_days > 31) || (interval_hours < 0 || interval_hours > 23) || (interval_minutes < 0 || interval_minutes > 59)){
                document.getElementById('error').innerHTML = 'Please enter valid amount of time between reminders:<br>Number of Reminders(2-10),<br>Days(0-31),<br>Hours(0-23),<br>Minutes(0-59).';
                return;
            }
            inputSTR += num_reminders + interval_days + interval_hours + interval_minutes;
        }
        var current_timestamp = new Date().getTime();
        var selected_timestamp = new Date(date + 'T' + time).getTime();

        if (selected_timestamp <= current_timestamp) {
            document.getElementById('error').textContent = 'Please select a date and time ahead of the current date and time.';
            return;
        }

        if (reminder_type.trim() !== '' && date.trim() !== '' && time.trim() !== '') {
            console.log(inputSTR);
        } else {
            document.getElementById('error').textContent = 'Please enter a reminder type, date and time.';
        }
    });
});
