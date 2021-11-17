const $currDayEl = $('#currentDay');
const $timeBlockEl = $('#time-block');
const currMoment = moment().hour();
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

homePage();

function homePage() {
    for (let i = 9; i < 18; i++) {
        let currHour = 0;
        if (i > 12) {
            currHour += i - 12;
            currHour = currHour + 'pm';
        } else {
            currHour += i;
            currHour = currHour + 'am';
        }

        const $rowEl = $('<div>');
        const $calTimeEl = $('<div>');
        const $calTextEl = $('<textarea>');
        const $calSubmitEl = $('<div>');
        const $submitIconEl = $('<i>');

        $calTimeEl.addClass('col-1 hour')
            .text(currHour);

        $calTextEl.addClass('col-10 description');

        if (currMoment > moment(currHour, 'h:a').hour()) {
            $calTextEl.addClass('past');
        } else if (currMoment < moment(currHour, 'h:a').hour()) {
            $calTextEl.addClass('future');
        } else {
            $calTextEl.addClass('present');
        }

        $submitIconEl.addClass('mt-4 fas fa-upload');

        $calSubmitEl.addClass('col-1 saveBtn')
            .append($submitIconEl);

        $rowEl.attr('id', currHour)
            .addClass('row')
            .append($calTimeEl, $calTextEl, $calSubmitEl);

        $timeBlockEl.append($rowEl);
    };
}
