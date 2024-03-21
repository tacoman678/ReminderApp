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
    var submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', function(){
        var reminder_type = document.getElementById('reminder_type').value;
        var date = document.getElementById('datepicker').value;
        var time = document.getElementById('time').value;
        if (document.getElementById('form_addition')){
            var num_reminders = document.getElementById('num_reminders');
            var interval_days = document.getElementById('interval_days');
            var interval_hours = document.getElementById('interval_hours');
            var interval_minutes = document.getElementById('interval_minutes');
        }
    });
});