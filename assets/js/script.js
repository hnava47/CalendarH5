const $currentDayEl = $('#currentDay');
let meetings = JSON.parse(localStorage.getItem('meetings')) || [];

// inputs current date based on locale
$currentDayEl.text(moment().format('dddd, MMMM Do'));

let currentMeet = {
    time: '9am',
    details: 'test'
};

meetings.push(currentMeet);
meetings.sort((a, b) => b.time - a.time);

localStorage.setItem('meetings', JSON.stringify(meetings));

for (let i = 9; i < 18; i++) {
    let currentHour = 0
    if (i > 12) {
        currentHour += i - 12;
    } else {
        currentHour += i;
    }
    console.log(currentHour);
}
