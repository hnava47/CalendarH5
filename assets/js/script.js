const $currDayEl = $('#currentDay');
const $timeBlockEl = $('#time-block');
const currMoment = moment().hour()
// let meetings = JSON.parse(localStorage.getItem('meetings')) || [];

// inputs current date based on locale
$currDayEl.text(moment().format('dddd, MMMM Do'));

// let currentMeet = {
//     time: '9am',
//     details: 'test'
// };

// meetings.push(currentMeet);
// meetings.sort((a, b) => b.time - a.time);

// localStorage.setItem('meetings', JSON.stringify(meetings));

for (let i = 9; i < 18; i++) {
    let currHour = 0;
    if (i > 12) {
        currHour += i - 12;
        currHour = currHour + 'pm'
    } else {
        currHour += i;
        currHour = currHour + 'am'
    }

    const $rowEl = $('<div>');
    const $calTimeEl = $('<div>');
    const $calTextEl = $('<textarea>');
    const $calSubmitEl = $('<div>');

    $calTimeEl.addClass('col-1 border border-left-0 text-right')
        .text(currHour);

    $calTextEl.addClass('col-10 border');

    if (currMoment > moment(currHour, 'h:a').hour()) {
        $calTextEl.addClass('past');
    } else if (currMoment < moment(currHour, 'h:a').hour()) {
        $calTextEl.addClass('future');
    } else {
        $calTextEl.addClass('present');
    }

    $calSubmitEl.addClass('col-1 border rounded-right bg-info');

    $rowEl.attr('id', currHour)
        .addClass('row')
        .append($calTimeEl, $calTextEl, $calSubmitEl);

    $timeBlockEl.append($rowEl);
}
