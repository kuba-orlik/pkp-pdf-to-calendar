# PKP PDF ticket to json/ics

usage: 

```
PATH_TO_PDF="/..."
UUID=$(cat /proc/sys/kernel/random/uuid)
node ticket-to-json.js $PATH_TO_PDF | node json-to-ical.js $UUID "event description"
```
