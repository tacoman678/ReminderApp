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
