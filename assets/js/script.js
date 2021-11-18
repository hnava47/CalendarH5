$(document).ready(function() {
    const $currDayEl = $('#currentDay');
    const $timeBlockEl = $('#time-block');
    const currMoment = moment().hour();
    const currDate = moment().format('YYYY-MM-DD');
    let calList = JSON.parse(localStorage.getItem('calendar')) || [];

    // inputs current date based on locale
    $currDayEl.text(moment().format('dddd, MMMM Do'));

    // Initialize homepage
    if (calList.length > 0) {
        if (calList[0]['date'] !== currDate) {
            localStorage.removeItem('cal');
            calList = [];
            homePage();
            refreshStorage();
        } else {
            homePage();
        }
    } else {
        homePage();
        refreshStorage();
    }

    // Get storage text description based on time id
    function getDetails(id) {
        let retList = calList.filter(function(item) {
            return item.id === id;
        });
        if (retList.length === 0) {
            return null;
        } else {
            return retList[0]['details'];
        }
    }

    // Refresh storage when list is null or next calendar day
    function refreshStorage() {
        let divList = $('.row');

        for (let i = 0; i < divList.length; i++) {
            let currentMeet = {
                date: currDate,
                id: divList[i].children[0].textContent,
                details: divList[i].children[1].textContent
            };

            calList.push(currentMeet);

        localStorage.setItem('calendar', JSON.stringify(calList));
        }
    }

    function homePage() {
        for (let i = 0; i < 9; i++) {
            let currHour = i + 9;
            if (currHour > 12) {
                currHour -= 12;
                currHour = currHour + 'pm';
            } else {
                currHour = currHour + 'am';
            }

            const $rowEl = $('<div>');
            const $calTimeEl = $('<div>');
            const $calTextEl = $('<textarea>');
            const $calSubmitEl = $('<div>');
            const $submitIconEl = $('<i>');

            $calTimeEl.addClass('col-1 hour')
                .text(currHour);

            $calTextEl.addClass('col-10 description')
                .text(getDetails(currHour));

            if (currMoment > moment(currHour, 'h:a').hour()) {
                $calTextEl.addClass('past');
            } else if (currMoment < moment(currHour, 'h:a').hour()) {
                $calTextEl.addClass('future');
            } else {
                $calTextEl.addClass('present');
            }

            $submitIconEl.addClass('mt-4 fas fa-upload');

            $calSubmitEl.attr('id', i)
                .addClass('col-1 saveBtn')
                .append($submitIconEl);

            $rowEl.addClass('row')
                .append($calTimeEl, $calTextEl, $calSubmitEl);

            $timeBlockEl.append($rowEl);
        };
    }

    $(document).on('click', '.saveBtn', function(event) {
        event.preventDefault();

        index = parseInt(this.id);

        calList[index]['details'] = $(this).parent().children().eq(1).val();

        localStorage.setItem('calendar', JSON.stringify(calList));
    })

});
