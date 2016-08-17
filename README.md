# angular-datepicker

## Installing via bower
```
bower install https://github.com/EventBooking/angular-datepicker.git --save
```

## Upgrading via bower
```
bower install https://github.com/EventBooking/angular-datepicker.git#latest
```

## Assets.less

```
@import "../../bower_components/angular-datepicker/dist/date-picker-variables";
@import "variables/variables";

@import "../../bower_components/angular-datepicker/dist/date-picker-mixins";
@import "mixins/mixins";

@import "../../bower_components/angular-datepicker/dist/date-picker";
@import "directives/directives";
```

## Gulpfile.js

```
'bower_components/tether/dist/js/tether.js',
'bower_components/angular-typescript-module/dist/angular-typescript-module.js',
'bower_components/angular-datepicker/dist/date-picker.js',
'bower_components/angular-datepicker/dist/date-picker.templates.js',
```

## date-picker
```
// Single Date
date: '=', (iso date string)
onDateSelect: '&',

// Range
start: '=', (iso date string)
end: '=', (iso date string)
onRangeSelect: '&',

// Other
isSelecting: '=?', (boolean)
defaultDate: '@?', (iso date string)

// Collection of date strings (ie. ['2012-12-01','2012-12-02']
highlighted: '=?' (array of iso date strings)
```

#time-picker
```
time: '=' (iso time string)
```