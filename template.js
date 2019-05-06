const moment = require("moment");

const format = "YYYYMMDDTHHmmss";

module.exports = (
	{ from, to, train, car, place, car_type, start_time, end_time },
	UID,
	URL
) => `BEGIN:VCALENDAR
PRODID:-//Nextcloud calendar v1.6.0
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
CREATED:${moment().format(format)}
DTSTAMP:${moment().format(format)}
LAST-MODIFIED:${moment().format(format)}
UID:${UID}
SUMMARY:🚅 z ${from} do: ${to}
LOCATION:${train} - wagon ${car}, msc ${place}. ${car_type}
CLASS:PUBLIC
DESCRIPTION:Pociąg: ${train}\\nMiejsce:  w${car}/m${place}\\nBilet: ${URL}
STATUS:CONFIRMED
DTSTART;TZID=Europe/Warsaw:${moment(start_time).format(format)}
DTEND;TZID=Europe/Warsaw:${moment(end_time).format(format)}
BEGIN:VALARM
TRIGGER:-PT10M
ACTION:DISPLAY
DESCRIPTION:Pociąg odjeżdża o ${moment(start_time).format("HH:mm")}
END:VALARM
END:VEVENT
BEGIN:VTIMEZONE
TZID:Europe/Warsaw
BEGIN:DAYLIGHT
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
TZNAME:CEST
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
TZNAME:CET
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10
END:STANDARD
END:VTIMEZONE
END:VCALENDAR
`;
