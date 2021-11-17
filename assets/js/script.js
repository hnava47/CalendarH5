const $currentDayEl = $('#currentDay');

// inputs current date based on locale
$currentDayEl.text(moment().format('dddd, MMMM Do'));
