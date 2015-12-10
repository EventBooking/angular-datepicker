(function(module) {
try {
  module = angular.module('ngDatePicker');
} catch (e) {
  module = angular.module('ngDatePicker', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('date-picker.html',
    '<div class="datePicker datePicker--{{datepicker.viewType}}">\n' +
    '\n' +
    '    <div class="datePicker-days datePickerDays">\n' +
    '        <div class="datePicker-navigation datePickerNav">\n' +
    '            <i class="datePickerNav-prev" ng-click="datepicker.prevMonth()"></i>\n' +
    '            <i class="datePickerNav-next" ng-click="datepicker.nextMonth()"></i>\n' +
    '            <span class="datePickerNav-title datePickerNav-title--selectable" ng-click="datepicker.showMonths()">\n' +
    '                {{datepicker.title}}\n' +
    '            </span>\n' +
    '        </div>\n' +
    '        <div class="datePicker-divider"></div>\n' +
    '        <ul class="datePickerDays-daysOfWeek">\n' +
    '            <li class="datePickerDays-dayName" ng-repeat="name in datepicker.daysOfWeek">\n' +
    '                {{name}}\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '        <ul class="datePickerDays-week" ng-repeat="week in datepicker.weeks">\n' +
    '            <li class="datePickerDays-day"\n' +
    '                ng-repeat="day in week"\n' +
    '                ng-class="{ \n' +
    '                    \'is-today\': day.isToday, \n' +
    '                    \'not-in-month\': day.isNotInMonth, \n' +
    '                    \'is-selected\': datepicker.isSelected(day),\n' +
    '                    \'is-selecting\': day.isSelecting,\n' +
    '                    \'is-highlighted\': datepicker.isHighlighted(day)\n' +
    '                }">\n' +
    '                {{day.date}}\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="datePicker-months datePickerMonths">\n' +
    '        <div class="datePicker-navigation datePickerNav">\n' +
    '            <i class="datePickerNav-prev" ng-click="datepicker.prevYear()"></i>\n' +
    '            <i class="datePickerNav-next" ng-click="datepicker.nextYear()"></i>\n' +
    '            <span class="datePickerNav-title datePickerNav-title--selectable" ng-click="datepicker.showYears()">\n' +
    '                {{datepicker.title}}\n' +
    '            </span>\n' +
    '        </div>\n' +
    '        <div class="datePicker-divider"></div>\n' +
    '        <ul class="datePickerMonths-row" ng-repeat="row in [[0,1,2,3],[4,5,6,7],[8,9,10,11]]">\n' +
    '            <li class="datePickerMonths-name"\n' +
    '                ng-repeat="col in row"\n' +
    '                ng-class="{\'is-current-month\': datepicker.monthNames[col].isCurrentMonth}"\n' +
    '                ng-click="datepicker.selectMonth(col)">\n' +
    '                {{datepicker.monthNames[col].name}}\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="datePicker-years datePickerYears">\n' +
    '        <div class="datePicker-navigation datePickerNav">\n' +
    '            <i class="datePickerNav-prev" ng-click="datepicker.prevRange()"></i>\n' +
    '            <i class="datePickerNav-next" ng-click="datepicker.nextRange()"></i>\n' +
    '            <span class="datePickerNav-title">\n' +
    '                {{datepicker.title}}\n' +
    '            </span>\n' +
    '        </div>\n' +
    '        <div class="datePicker-divider"></div>\n' +
    '        <ul class="datePickerYears-row" ng-repeat="row in [[0,1,2],[3,4,5],[6,7,8]]">\n' +
    '            <li class="datePickerYears-year"\n' +
    '                ng-repeat="col in row"\n' +
    '                ng-class="{\'is-current-year\': datepicker.years[col].isCurrentYear}"\n' +
    '                ng-click="datepicker.selectYear(col)">\n' +
    '                {{datepicker.years[col].value}}\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '\n' +
    '</div>');
}]);
})();
