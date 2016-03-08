/// <reference path="..\typings\main.d.ts" />
/// <reference path="../bower_components/angular-typescript-module/dist/angular-typescript-module.d.ts"/>
Angular.module("ngDatePicker", []);
var DatePickerModule;
(function (DatePickerModule) {
    var DatePickerView;
    (function (DatePickerView) {
        DatePickerView[DatePickerView["Days"] = 0] = "Days";
        DatePickerView[DatePickerView["Months"] = 1] = "Months";
        DatePickerView[DatePickerView["Years"] = 2] = "Years";
    })(DatePickerView || (DatePickerView = {}));
    var DatePickerController = (function () {
        function DatePickerController($attrs, datePickerService) {
            this.$attrs = $attrs;
            this.datePickerService = datePickerService;
            this.isoFormat = 'YYYY-MM-DD';
            this.monthNames = datePickerService.getMonths();
            this.daysOfWeek = datePickerService.getDaysOfWeek();
            switch ($attrs.minView) {
                case 'years':
                    this.view = DatePickerView.Years;
                    this.minView = DatePickerView.Years;
                    break;
                case 'months':
                    this.view = DatePickerView.Months;
                    this.minView = DatePickerView.Months;
                    break;
                default:
                    this.view = DatePickerView.Days;
                    this.minView = DatePickerView.Days;
                    break;
            }
            this.isSingleDate = !($attrs.start != null || $attrs.end != null);
            this.dateInternal = this.isSingleDate ? this.date : this.start;
            this.calculate(this.dateInternal);
            this.initialized = true;
        }
        Object.defineProperty(DatePickerController.prototype, "date", {
            get: function () {
                return this._date;
            },
            set: function (value) {
                this._date = value;
                if (this.initialized)
                    this.dateInternal = this._date;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerController.prototype, "start", {
            get: function () {
                return this._start;
            },
            set: function (value) {
                this._start = value;
                if (this.initialized)
                    this.dateInternal = this._start;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerController.prototype, "end", {
            get: function () {
                return this._end;
            },
            set: function (value) {
                this._end = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerController.prototype, "dateInternal", {
            get: function () {
                return this._dateInternal;
            },
            set: function (value) {
                var m = value != null ? moment(value) : moment();
                this._dateInternal = m;
                if (this.initialized)
                    this.calculate(this._dateInternal);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerController.prototype, "title", {
            get: function () {
                switch (this.view) {
                    default:
                    case DatePickerView.Days:
                        return this._dateInternal.format('MMMM YYYY');
                    case DatePickerView.Months:
                        return this._dateInternal.format('YYYY');
                    case DatePickerView.Years:
                        return 'select a year';
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerController.prototype, "viewType", {
            get: function () {
                switch (this.view) {
                    case DatePickerView.Months:
                        return "months";
                    case DatePickerView.Years:
                        return "years";
                    default:
                    case DatePickerView.Days:
                        return "days";
                }
            },
            enumerable: true,
            configurable: true
        });
        DatePickerController.prototype.showDays = function () {
            if (this.minView > DatePickerView.Days)
                return;
            this.view = DatePickerView.Days;
        };
        DatePickerController.prototype.showMonths = function () {
            if (this.minView > DatePickerView.Months)
                return;
            this.view = DatePickerView.Months;
        };
        DatePickerController.prototype.showYears = function () {
            this.view = DatePickerView.Years;
        };
        DatePickerController.prototype.calculate = function (fromDate) {
            var start = moment(fromDate).startOf('month').startOf('week'), end = moment(fromDate).endOf('month').endOf('week');
            this.weeks = new Array();
            for (var day = moment(start); day.isBefore(end); day.add(1, 'week')) {
                var week = this.datePickerService.getWeek(fromDate, day);
                this.weeks.push(week);
            }
            this.years = this.datePickerService.getYears(fromDate);
        };
        DatePickerController.prototype.isSelected = function (day) {
            if (this.isSingleDate)
                return moment(this.date).isSame(day.value, 'day');
            return day.value.isBetween(this.start, this.end, 'day') ||
                day.value.isSame(this.start, 'day') ||
                day.value.isSame(this.end, 'day');
        };
        DatePickerController.prototype.isHighlighted = function (day) {
            if (this.highlighted == null)
                return false;
            for (var i = 0; i < this.highlighted.length; i++) {
                var value = this.highlighted[i];
                if (moment(value).isSame(day.value, 'day'))
                    return true;
            }
            return false;
        };
        DatePickerController.prototype.selecting = function (days) {
            this.datePickerService.deselectAll(this.weeks);
            this.datePickerService.selectDays(days);
        };
        DatePickerController.prototype.selected = function (days) {
            this.datePickerService.deselectAll(this.weeks);
            var start = days[0];
            if (this.isSingleDate) {
                this.selectedDate(start);
                return;
            }
            var end = days[days.length - 1];
            this.selectedRange(start, end);
        };
        DatePickerController.prototype.selectedDate = function (day) {
            this.date = moment(day.value).format(this.isoFormat);
            this.onDateSelect({ date: this.date });
        };
        DatePickerController.prototype.selectedRange = function (start, end) {
            this.start = moment(start.value).format(this.isoFormat);
            this.end = moment(end.value).format(this.isoFormat);
            this.onRangeSelect({ start: this.start, end: this.end });
        };
        DatePickerController.prototype.selectMonth = function (idx) {
            var month = this.monthNames[idx];
            this.setMonth(month.value);
            if (this.minView === DatePickerView.Months) {
                if (this.isSingleDate) {
                    this.date = this.dateInternal.format('YYYY-MM-DD');
                    this.onDateSelect({ date: this.date });
                }
                else {
                    this.start = moment(this.dateInternal).endOf('month').format('YYYY-MM-DD');
                    this.end = moment(this.dateInternal).endOf('month').format('YYYY-MM-DD');
                    this.onRangeSelect({ start: this.start, end: this.end });
                }
                this.isVisible = false;
                return;
            }
            this.showDays();
        };
        DatePickerController.prototype.isMonth = function (month) {
            return this.dateInternal.month() == month.value;
        };
        DatePickerController.prototype.setMonth = function (month) {
            this.dateInternal = this.dateInternal.set('month', month);
        };
        DatePickerController.prototype.isYear = function (year) {
            return this.dateInternal.year() == year.value;
        };
        DatePickerController.prototype.selectYear = function (idx) {
            var year = this.years[idx];
            this.setYear(year.value);
            if (this.minView === DatePickerView.Years) {
                if (this.isSingleDate) {
                    this.date = this.dateInternal.format('YYYY-MM-DD');
                    this.onDateSelect({ date: this.date });
                }
                else {
                    this.start = moment(this.dateInternal).startOf('year').format('YYYY-MM-DD');
                    this.end = moment(this.dateInternal).endOf('year').format('YYYY-MM-DD');
                    this.onRangeSelect({ start: this.start, end: this.end });
                }
                this.isVisible = false;
                return;
            }
            this.showMonths();
        };
        DatePickerController.prototype.setYear = function (year) {
            this.dateInternal = this.dateInternal.set('year', year);
        };
        DatePickerController.prototype.prevMonth = function () {
            this.dateInternal = this.dateInternal.subtract(1, 'months');
        };
        DatePickerController.prototype.nextMonth = function () {
            this.dateInternal = this.dateInternal.add(1, 'months');
        };
        DatePickerController.prototype.prevYear = function () {
            this.dateInternal = this.dateInternal.subtract(1, 'years');
        };
        DatePickerController.prototype.nextYear = function () {
            this.dateInternal = this.dateInternal.add(1, 'years');
        };
        DatePickerController.prototype.prevRange = function () {
            this.dateInternal = this.dateInternal.subtract(9, 'years');
        };
        DatePickerController.prototype.nextRange = function () {
            this.dateInternal = this.dateInternal.add(9, 'years');
        };
        DatePickerController.$inject = ['$attrs', 'datePickerService'];
        return DatePickerController;
    })();
    var DatePickerDirective = (function () {
        function DatePickerDirective($injector, $compile, $templateCache, $timeout, $window, datePickerService) {
            var _this = this;
            this.$injector = $injector;
            this.$compile = $compile;
            this.$templateCache = $templateCache;
            this.$timeout = $timeout;
            this.$window = $window;
            this.datePickerService = datePickerService;
            this.restrict = 'AE';
            this.require = '?ngModel';
            this.controller = DatePickerController;
            this.controllerAs = 'datepicker';
            this.bindToController = true;
            this.scope = {
                // Single Date
                date: '=',
                onDateSelect: '&',
                // Range
                start: '=',
                end: '=',
                onRangeSelect: '&',
                // Other
                isSelecting: '=?',
                // Collection of date strings (ie. ['2012-12-01','2012-12-02']
                highlighted: '=?'
            };
            this.calendarTemplate = 'date-picker.html';
            this.link = function ($scope, $element, $attrs, ngModelCtrl) {
                var ctrl = $scope[_this.controllerAs];
                // Fixes a bug where Tether cannot correctly get width/height because of ngAnimate
                var $animate = _this.$injector.get('$animate');
                if ($animate != null)
                    $animate.enabled(false, $element);
                if ($element.is('input[type="text"]'))
                    _this.linkInput($scope, $element, $attrs, ngModelCtrl);
                else if ($element.is('date-picker'))
                    _this.linkInline($scope, $element, $attrs, ngModelCtrl);
                else
                    _this.linkElement($scope, $element, $attrs, ngModelCtrl);
                if (ctrl.isSingleDate) {
                    _this.daySelect($scope, $element);
                    return;
                }
                _this.rangeSelect($scope, $element);
            };
        }
        DatePickerDirective.prototype.linkInput = function ($scope, $element, $attrs, ngModelCtrl) {
            var _this = this;
            var ctrl = $scope[this.controllerAs];
            this.popover($scope, $element, $attrs);
            if (ctrl.isSingleDate) {
                $scope.$watch(function () { return ctrl.date; }, function (date) {
                    var text = date == null ? '' : moment(date).format("L");
                    ngModelCtrl.$setViewValue(text);
                    ngModelCtrl.$render();
                });
            }
            else {
                var setViewValue = function (start, end) {
                    var text = '';
                    if (start != null && end != null) {
                        var mStart = moment(start), mEnd = moment(end);
                        if (mStart.isSame(end, 'day')) {
                            text = mStart.format("L");
                        }
                        else {
                            text = mStart.format("L") + " - " + mEnd.format("L");
                        }
                    }
                    else if (start != null) {
                        text = moment(end).format("L");
                    }
                    else if (end != null) {
                        text = moment(end).format("L");
                    }
                    ngModelCtrl.$setViewValue(text);
                    ngModelCtrl.$render();
                };
                $scope.$watch(function () { return ctrl.start; }, function (start) {
                    setViewValue(start, ctrl.end);
                });
                $scope.$watch(function () { return ctrl.end; }, function (end) {
                    setViewValue(ctrl.start, end);
                });
            }
            $element.on("change." + $scope.$id, function () {
                if (ctrl.isSingleDate) {
                    var date = _this.datePickerService.inputToMoment(ngModelCtrl.$viewValue);
                    if (!date.isValid()) {
                        ctrl.date = null;
                        return;
                    }
                    if (date.isSame(ctrl.date, 'day'))
                        return;
                    ctrl.date = date;
                }
                else {
                    var range = _this.datePickerService.inputToRange(ngModelCtrl.$viewValue);
                    if (range == null) {
                        ctrl.start = null;
                        ctrl.end = null;
                    }
                    else {
                        if (!moment(range.start).isValid()) {
                            ctrl.start = null;
                        }
                        if (!moment(range.end).isValid()) {
                            ctrl.end = null;
                        }
                        if (ctrl.start == null || ctrl.end == null)
                            return;
                        if (moment(range.start).isSame(ctrl.start, 'day') &&
                            moment(range.end).isSame(ctrl.end, 'day'))
                            return;
                        ctrl.start = range.start;
                        ctrl.end = range.end;
                    }
                }
                $scope.$apply();
            });
            $element.on("keydown." + $scope.$id, function (e) {
                if (!ctrl.isVisible || !_this.isEscape(e))
                    return true;
                ctrl.isVisible = false;
                $scope.$apply();
                return _this.preventDefault(e);
            });
        };
        DatePickerDirective.prototype.linkElement = function ($scope, $element, $attrs, ngModelCtrl) {
            this.popover($scope, $element, $attrs);
        };
        DatePickerDirective.prototype.linkInline = function ($scope, $element, $attrs, ngModelCtrl) {
            var content = this.createContent($scope);
            $element.append(content);
        };
        DatePickerDirective.prototype.getDays = function (range, ctrl) {
            var start = angular.element(range.start.target).scope()['day'], end = angular.element(range.end.target).scope()['day'];
            var days = this.datePickerService.getRangeDays(start, end, ctrl.weeks);
            return days;
        };
        DatePickerDirective.prototype.popover = function ($scope, $element, $attrs) {
            var _this = this;
            var content, tether, $body = angular.element('body'), ctrl = $scope[this.controllerAs];
            var doNotReopen = false;
            ctrl['dateSelected'] = function (date) {
                ctrl.isVisible = false;
                doNotReopen = true;
                $element.focus();
                doNotReopen = false;
                ctrl.onDateSelect({ date: date });
            };
            ctrl['rangeSelected'] = function (start, end) {
                ctrl.isVisible = false;
                doNotReopen = true;
                $element.focus();
                doNotReopen = false;
                ctrl.onRangeSelect({ start: start, end: end });
            };
            $element.on("click." + $scope.$id, function () {
                ctrl.isVisible = true;
                $scope.$apply();
            });
            $element.on("focus." + $scope.$id, function () {
                if (doNotReopen)
                    return;
                ctrl.isVisible = true;
                if (!content) {
                    content = _this.createDropDown($scope, $element, $attrs);
                    $body.append(content);
                    $scope.$apply();
                    tether = new Tether({
                        target: $element,
                        targetAttachment: 'bottom center',
                        element: content,
                        attachment: 'top center',
                        classPrefix: 'datepicker',
                        targetOffset: '14px 0',
                        constraints: [
                            {
                                to: 'window',
                                attachment: 'together',
                                pin: ['top', 'left', 'bottom', 'right']
                            }
                        ]
                    });
                }
                $scope.$apply();
                tether.position();
            });
            var blurTimer;
            $element.on("blur." + $scope.$id, function () {
                // Allow any click on the menu to come through first
                blurTimer = _this.$timeout(function () {
                    if (ctrl.isSelecting)
                        return;
                    ctrl.isVisible = false;
                    $scope.$apply();
                }, 300);
            });
            //             $body.on(`DOMMouseScroll.${$scope.$id} mousewheel.${$scope.$id}`, () => {
            //                 if (!ctrl.isVisible)
            //                     return;
            // 
            //                 ctrl.isVisible = false;
            //                 $scope.$apply();
            //             });
            // angular.element(this.$window).on(`resize.${$scope.$id}`, () => {
            //     ctrl.isVisible = false;
            //     $scope.$apply();
            // });
            $body.on("click." + $scope.$id, function (e) {
                if (!ctrl.isVisible)
                    return;
                if (!content || $element.is(e.target) || content.has(e.target).length > 0) {
                    _this.$timeout.cancel(blurTimer);
                    if (content && content.has(e.target).length > 0) {
                        $element.focus();
                    }
                    return;
                }
                ctrl.isVisible = false;
                $scope.$apply();
            });
            $scope.$on('$destroy', function () {
                $body.off("click." + $scope.$id + " DOMMouseScroll." + $scope.$id + " mousewheel." + $scope.$id);
                if (content)
                    content.remove();
            });
        };
        DatePickerDirective.prototype.createDropDown = function ($scope, $element, $attrs) {
            var ctrl = $scope[this.controllerAs], singleDateBinding = "date=\"" + this.controllerAs + ".date\" on-date-select=\"" + this.controllerAs + ".dateSelected(date)\"", rangeBinding = "start=\"" + this.controllerAs + ".start\" end=\"" + this.controllerAs + ".end\" on-range-select=\"" + this.controllerAs + ".rangeSelected(start,end)\"", bindings = ctrl.isSingleDate ? singleDateBinding : rangeBinding, template = "<div class=\"datepicker-dropdown\" ng-class=\"{'datepicker-open':" + this.controllerAs + ".isVisible}\"><date-picker min-view=\"" + $attrs.minView + "\" is-selecting=\"" + this.controllerAs + ".isSelecting\" " + bindings + "\" highlighted=\"" + this.controllerAs + ".highlighted\"></date-picker></div>", content = angular.element(template), position = $element.position(), height = $element.outerHeight(), margin = ($element.outerHeight(true) - height), offset = margin / 2 + height;
            content.css({
                top: position.top + offset,
                left: position.left
            });
            this.$compile(content)($scope);
            return content;
        };
        DatePickerDirective.prototype.preventDefault = function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };
        DatePickerDirective.prototype.isEscape = function (e) {
            return e.which === 27;
        };
        DatePickerDirective.prototype.createContent = function ($scope) {
            var template = this.$templateCache.get(this.calendarTemplate);
            var content = angular.element(template);
            this.$compile(content)($scope);
            return content;
        };
        DatePickerDirective.prototype.daySelect = function ($scope, $element) {
            var _this = this;
            var ctrl = $scope[this.controllerAs], dayCss = '.datePickerDays-day', $body = angular.element('body'), mouseDown = "mousedown." + $scope.$id, mouseUp = "mouseup." + $scope.$id;
            var onSelected = function (range) {
                var days = _this.getDays(range, ctrl);
                ctrl.selected(days);
                $scope.$apply();
            };
            $element.on(mouseDown, dayCss, function (e) {
                var range = { start: e, end: e };
                ctrl.isSelecting = true;
                $body.on(mouseUp, function () {
                    $body.off(mouseUp);
                    ctrl.isSelecting = false;
                    onSelected(range);
                });
            });
        };
        DatePickerDirective.prototype.rangeSelect = function ($scope, $element) {
            var _this = this;
            var ctrl = $scope[this.controllerAs], $body = angular.element('body'), mouseDown = "mousedown." + $scope.$id, mouseOver = "mouseover." + $scope.$id, mouseUp = "mouseup." + $scope.$id, dayCss = '.datePickerDays-day';
            var onSelecting = function (range) {
                var days = _this.getDays(range, ctrl);
                ctrl.selecting(days);
                $scope.$apply();
            };
            var onSelected = function (range) {
                var days = _this.getDays(range, ctrl);
                ctrl.selected(days);
                $scope.$apply();
            };
            $element.on(mouseDown, dayCss, function (e) {
                var range = { start: e, end: e };
                ctrl.isSelecting = true;
                $element.on(mouseOver, dayCss, function (e) {
                    range.end = e;
                    onSelecting(range);
                });
                $body.on(mouseUp, function () {
                    $element.off(mouseOver);
                    $body.off(mouseUp);
                    ctrl.isSelecting = false;
                    onSelected(range);
                });
            });
        };
        DatePickerDirective.$inject = ['$injector', '$compile', '$templateCache', '$timeout', '$window', 'datePickerService'];
        return DatePickerDirective;
    })();
    Angular.module("ngDatePicker").directive('datePicker', DatePickerDirective);
})(DatePickerModule || (DatePickerModule = {}));
var DatePickerModule;
(function (DatePickerModule) {
    var DatePickerRange = (function () {
        function DatePickerRange(start, end) {
            var mStart = moment(start);
            var mEnd = moment(end);
            if (mEnd.isBefore(mStart)) {
                var temp = mStart;
                mStart = mEnd;
                mEnd = temp;
            }
            this.start = mStart.format('YYYY-MM-DD');
            this.end = mEnd.format('YYYY-MM-DD');
        }
        return DatePickerRange;
    })();
    var DatePickerMonth = (function () {
        function DatePickerMonth(value) {
            this.value = value;
            var m = moment();
            var thisMonth = m.month();
            this.name = m.month(value).format('MMM');
            this.isCurrentMonth = value === thisMonth;
        }
        return DatePickerMonth;
    })();
    var DatePickerYear = (function () {
        function DatePickerYear(value) {
            this.value = value;
            this.isCurrentYear = value === moment().year();
        }
        return DatePickerYear;
    })();
    var DatePickerDay = (function () {
        function DatePickerDay(fromDate, dayOfWeek) {
            this.value = moment(dayOfWeek);
            this.date = this.value.date();
            this.isToday = dayOfWeek.isSame(moment(), 'day');
            this.isNotInMonth = !this.value.isSame(fromDate, 'month');
        }
        DatePickerDay.prototype.isBefore = function (day) {
            var isBefore = this.value.isBefore(day.value, 'day');
            return isBefore;
        };
        DatePickerDay.prototype.isSame = function (day) {
            var isSame = this.value.isSame(day.value, 'day');
            return isSame;
        };
        return DatePickerDay;
    })();
    var DatePickerService = (function () {
        function DatePickerService() {
        }
        DatePickerService.prototype.getMonths = function () {
            var months = new Array();
            for (var i = 0; i < 12; i++) {
                months.push(new DatePickerMonth(i));
            }
            return months;
        };
        DatePickerService.prototype.getYears = function (fromDate) {
            var fromYear = moment(fromDate).year(), years = new Array();
            for (var i = fromYear; i <= (fromYear + 8); i++)
                years.push(new DatePickerYear(i));
            return years;
        };
        DatePickerService.prototype.getWeek = function (fromDate, startOfWeek) {
            var endOfWeek = moment(startOfWeek).endOf('week');
            var days = new Array();
            for (var dayOfWeek = moment(startOfWeek); dayOfWeek.isBefore(endOfWeek); dayOfWeek.add(1, 'days')) {
                days.push(new DatePickerDay(fromDate, dayOfWeek));
            }
            return days;
        };
        DatePickerService.prototype.getDaysOfWeek = function () {
            return moment.weekdaysShort();
        };
        DatePickerService.prototype.getRangeDays = function (start, end, weeks) {
            if (end.isBefore(start)) {
                var temp = start;
                start = end;
                end = temp;
            }
            var allDays = new Array(), isAdding = false;
            weeks.forEach(function (week) {
                week.forEach(function (day) {
                    if (day.isSame(start))
                        isAdding = true;
                    if (isAdding) {
                        allDays.push(day);
                    }
                    if (day.isSame(end))
                        isAdding = false;
                });
            });
            return allDays;
        };
        DatePickerService.prototype.deselectAll = function (weeks) {
            weeks.forEach(function (week) {
                week.forEach(function (day) {
                    day.isSelecting = false;
                });
            });
        };
        DatePickerService.prototype.selectDays = function (days) {
            days.forEach(function (day) { return day.isSelecting = true; });
        };
        DatePickerService.prototype.inputToMoment = function (value) {
            var lang = moment.localeData();
            var formats = [
                lang.longDateFormat("l")
                    .replace(/-/g, ' ')
                    .replace(/\//g, ' ')
                    .replace(/  /g, ' '),
                lang.longDateFormat("L")
                    .replace(/-/g, ' ')
                    .replace(/\//g, ' ')
                    .replace(/  /g, ' ')
            ];
            var date = moment(value, formats);
            return date;
        };
        DatePickerService.prototype.inputToRange = function (value) {
            if (value == null || !value.trim().length)
                return null;
            var trimmed = value
                .replace(/-/g, ' ')
                .replace(/\//g, ' ')
                .replace(/  /g, ' ')
                .trim();
            var expStart = new RegExp("^(([0-9]{1,4}[ ]*){3})");
            var expEnd = new RegExp("(([0-9]{1,4}[ ]*){3})$");
            var startResult = expStart.exec(trimmed);
            var endResult = expEnd.exec(trimmed);
            var start = this.inputToMoment(startResult[0].trim());
            var end = this.inputToMoment((endResult[0] || startResult[0]).trim());
            var range = new DatePickerRange(start, end);
            return range;
        };
        return DatePickerService;
    })();
    Angular.module("ngDatePicker").service('datePickerService', DatePickerService);
})(DatePickerModule || (DatePickerModule = {}));
var DatePickerModule;
(function (DatePickerModule) {
    var TimePickerController = (function () {
        function TimePickerController(timePickerService) {
            this.timePickerService = timePickerService;
            this.initialized = true;
        }
        TimePickerController.prototype.onInit = function ($scope, $element, ngModelCtrl) {
            var _this = this;
            this.$scope = $scope;
            this.ngModelCtrl = ngModelCtrl;
            $element.on("blur." + $scope.$id, function () {
                var m = _this.timePickerService.parse(ngModelCtrl.$modelValue);
                _this.time = m.isValid() ? m.format("HH:mm:ss") : null;
            });
            $scope.$on('$destroy', function () {
                $element.off("blur." + $scope.$id);
            });
            this.setValue(this._time);
        };
        Object.defineProperty(TimePickerController.prototype, "time", {
            get: function () {
                return this._time;
            },
            set: function (value) {
                this._time = value;
                if (this.initialized) {
                    this.setValue(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        TimePickerController.prototype.setValue = function (value) {
            var viewValue = this.timePickerService.format(value);
            this.ngModelCtrl.$setViewValue(viewValue);
            this.ngModelCtrl.$render();
        };
        TimePickerController.$inject = ['timePickerService'];
        return TimePickerController;
    })();
    var TimePickerDirective = (function () {
        function TimePickerDirective() {
            var _this = this;
            this.restrict = 'A';
            this.require = 'ngModel';
            this.controller = TimePickerController;
            this.controllerAs = 'timepicker';
            this.bindToController = true;
            this.scope = {
                time: '='
            };
            this.link = function ($scope, $element, $attrs, ngModelCtrl) {
                var ctrl = $scope[_this.controllerAs];
                ctrl.onInit($scope, $element, ngModelCtrl);
            };
        }
        TimePickerDirective.$inject = [];
        return TimePickerDirective;
    })();
    Angular.module("ngDatePicker").directive('timePicker', TimePickerDirective);
})(DatePickerModule || (DatePickerModule = {}));
var DatePickerModule;
(function (DatePickerModule) {
    var TimePickerService = (function () {
        function TimePickerService() {
        }
        TimePickerService.prototype.parse = function (text) {
            var patterns = [
                'LT',
                'LTS',
                'HH:mm:ss',
                'HH:mm A'
            ];
            return moment(text, patterns);
        };
        TimePickerService.prototype.format = function (text) {
            var m = this.parse(text);
            return m.isValid() ? m.format('LT') : '';
        };
        return TimePickerService;
    })();
    Angular.module("ngDatePicker").service('timePickerService', TimePickerService);
})(DatePickerModule || (DatePickerModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuZGVidWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZ2xvYmFscy50cyIsIi4uL3NyYy9hcHAudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXIudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXItc2VydmljZS50cyIsIi4uL3NyYy90aW1lLXBpY2tlci50cyIsIi4uL3NyYy90aW1lLXBpY2tlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbIkRhdGVQaWNrZXJNb2R1bGUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJWaWV3IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLmRhdGUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnN0YXJ0IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5lbmQiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLmRhdGVJbnRlcm5hbCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIudGl0bGUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnZpZXdUeXBlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zaG93RGF5cyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2hvd01vbnRocyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2hvd1llYXJzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5jYWxjdWxhdGUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLmlzU2VsZWN0ZWQiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLmlzSGlnaGxpZ2h0ZWQiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNlbGVjdGluZyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2VsZWN0ZWQiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNlbGVjdGVkRGF0ZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2VsZWN0ZWRSYW5nZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2VsZWN0TW9udGgiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLmlzTW9udGgiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNldE1vbnRoIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5pc1llYXIiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNlbGVjdFllYXIiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNldFllYXIiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnByZXZNb250aCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIubmV4dE1vbnRoIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5wcmV2WWVhciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIubmV4dFllYXIiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnByZXZSYW5nZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIubmV4dFJhbmdlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmxpbmtJbnB1dCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5saW5rRWxlbWVudCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5saW5rSW5saW5lIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmdldERheXMiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUucG9wb3ZlciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5jcmVhdGVEcm9wRG93biIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5wcmV2ZW50RGVmYXVsdCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5pc0VzY2FwZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5jcmVhdGVDb250ZW50IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmRheVNlbGVjdCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5yYW5nZVNlbGVjdCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclJhbmdlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyUmFuZ2UuY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJNb250aCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlck1vbnRoLmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyWWVhciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclllYXIuY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEYXkiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEYXkuY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEYXkuaXNCZWZvcmUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEYXkuaXNTYW1lIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJTZXJ2aWNlLmdldE1vbnRocyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZ2V0WWVhcnMiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJTZXJ2aWNlLmdldFdlZWsiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJTZXJ2aWNlLmdldERheXNPZldlZWsiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJTZXJ2aWNlLmdldFJhbmdlRGF5cyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZGVzZWxlY3RBbGwiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJTZXJ2aWNlLnNlbGVjdERheXMiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0VG9Nb21lbnQiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0VG9SYW5nZSIsIkRhdGVQaWNrZXJNb2R1bGUuVGltZVBpY2tlckNvbnRyb2xsZXIiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5UaW1lUGlja2VyQ29udHJvbGxlci5vbkluaXQiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJDb250cm9sbGVyLnRpbWUiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJDb250cm9sbGVyLnNldFZhbHVlIiwiRGF0ZVBpY2tlck1vZHVsZS5UaW1lUGlja2VyRGlyZWN0aXZlIiwiRGF0ZVBpY2tlck1vZHVsZS5UaW1lUGlja2VyRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5UaW1lUGlja2VyU2VydmljZSIsIkRhdGVQaWNrZXJNb2R1bGUuVGltZVBpY2tlclNlcnZpY2UuY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJTZXJ2aWNlLnBhcnNlIiwiRGF0ZVBpY2tlck1vZHVsZS5UaW1lUGlja2VyU2VydmljZS5mb3JtYXQiXSwibWFwcGluZ3MiOiJBQUFBLDZDQUE2QztBQ0E3Qyx5R0FBeUc7QUFFekcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7QUNEbkMsSUFBTyxnQkFBZ0IsQ0FxcEJ0QjtBQXJwQkQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBRXJCQSxJQUFLQSxjQUlKQTtJQUpEQSxXQUFLQSxjQUFjQTtRQUNmQyxtREFBUUEsQ0FBQUE7UUFDUkEsdURBQVVBLENBQUFBO1FBQ1ZBLHFEQUFTQSxDQUFBQTtJQUNiQSxDQUFDQSxFQUpJRCxjQUFjQSxLQUFkQSxjQUFjQSxRQUlsQkE7SUFFREE7UUFJSUUsOEJBQW9CQSxNQUFNQSxFQUFVQSxpQkFBcUNBO1lBQXJEQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFBQTtZQUFVQSxzQkFBaUJBLEdBQWpCQSxpQkFBaUJBLENBQW9CQTtZQXlFekVBLGNBQVNBLEdBQUdBLFlBQVlBLENBQUNBO1lBeEVyQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsaUJBQWlCQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtZQUNoREEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsaUJBQWlCQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtZQUVwREEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3JCQSxLQUFLQSxPQUFPQTtvQkFDUkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsY0FBY0EsQ0FBQ0EsS0FB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S0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLENBQUNBO1lBRURBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDM0RBLENBQUNBO1FBRURYLHlDQUFVQSxHQUFWQSxVQUFXQSxHQUFtQkE7WUFDMUJZLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO2dCQUNsQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFFdERBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLENBQUNBO2dCQUNuREEsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0E7Z0JBQ25DQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUMxQ0EsQ0FBQ0E7UUFFRFosNENBQWFBLEdBQWJBLFVBQWNBLEdBQW1CQTtZQUM3QmEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQ3pCQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUVqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7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Q0E7d0JBRURBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUMvQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0E7d0JBQ3BCQSxDQUFDQTt3QkFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0E7NEJBQ3ZDQSxNQUFNQSxDQUFDQTt3QkFFWEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0E7NEJBQzdDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTs0QkFDMUNBLE1BQU1BLENBQUNBO3dCQUVYQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTt3QkFDekJBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBO29CQUN6QkEsQ0FBQ0E7Z0JBQ0xBLENBQUNBO2dCQUVEQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQUNwQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFSEEsUUFBUUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsYUFBV0EsTUFBTUEsQ0FBQ0EsR0FBS0EsRUFBRUEsVUFBQUEsQ0FBQ0E7Z0JBQ2xDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxJQUFJQSxDQUFDQSxLQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFD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LEdBQUdBO2dCQUNYQSxJQUFJQTtnQkFDSkEsS0FBS0E7Z0JBQ0xBLFVBQVVBO2dCQUNWQSxTQUFTQTthQUNaQSxDQUFDQTtZQUNGQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUNsQ0EsQ0FBQ0E7UUFFREYsa0NBQU1BLEdBQU5BLFVBQU9BLElBQVlBO1lBQ2ZHLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ3pCQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUM3Q0EsQ0FBQ0E7UUFDTEgsd0JBQUNBO0lBQURBLENBQUNBLEFBZkR6RSxJQWVDQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxtQkFBbUJBLEVBQUVBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7QUFDbkZBLENBQUNBLEVBekJNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUF5QnRCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uXFx0eXBpbmdzXFxtYWluLmQudHNcIiAvPlxyXG5kZWNsYXJlIHZhciBUZXRoZXI6IGFueTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYm93ZXJfY29tcG9uZW50cy9hbmd1bGFyLXR5cGVzY3JpcHQtbW9kdWxlL2Rpc3QvYW5ndWxhci10eXBlc2NyaXB0LW1vZHVsZS5kLnRzXCIvPlxyXG5cclxuQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIiwgW10pOyIsIlxyXG5tb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcblxyXG4gICAgZW51bSBEYXRlUGlja2VyVmlldyB7XHJcbiAgICAgICAgRGF5cyA9IDAsXHJcbiAgICAgICAgTW9udGhzID0gMSxcclxuICAgICAgICBZZWFycyA9IDJcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyQ29udHJvbGxlciB7XHJcblxyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnLCAnZGF0ZVBpY2tlclNlcnZpY2UnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMsIHByaXZhdGUgZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vbnRoTmFtZXMgPSBkYXRlUGlja2VyU2VydmljZS5nZXRNb250aHMoKTtcclxuICAgICAgICAgICAgdGhpcy5kYXlzT2ZXZWVrID0gZGF0ZVBpY2tlclNlcnZpY2UuZ2V0RGF5c09mV2VlaygpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoICgkYXR0cnMubWluVmlldykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3LlllYXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3LlllYXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5Nb250aHM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WaWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3LkRheXM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNTaW5nbGVEYXRlID0gISgkYXR0cnMuc3RhcnQgIT0gbnVsbCB8fCAkYXR0cnMuZW5kICE9IG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuaXNTaW5nbGVEYXRlID8gdGhpcy5kYXRlIDogdGhpcy5zdGFydDtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGUodGhpcy5kYXRlSW50ZXJuYWwpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNpbmdsZSBEYXRlXHJcbiAgICAgICAgcHJpdmF0ZSBfZGF0ZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgZGF0ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBkYXRlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZClcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5fZGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJhbmdlXHJcbiAgICAgICAgcHJpdmF0ZSBfc3RhcnQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgZ2V0IHN0YXJ0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBzdGFydCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLl9zdGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2VuZDogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgZW5kKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgZW5kKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fZW5kID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkRhdGVTZWxlY3Q7XHJcbiAgICAgICAgb25SYW5nZVNlbGVjdDtcclxuICAgICAgICBpc1NlbGVjdGluZzogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgdmlldzogRGF0ZVBpY2tlclZpZXc7XHJcbiAgICAgICAgbWluVmlldzogRGF0ZVBpY2tlclZpZXc7XHJcbiAgICAgICAgd2Vla3M6IElEYXRlUGlja2VyRGF5W11bXTtcclxuICAgICAgICB5ZWFyczogSURhdGVQaWNrZXJZZWFyW107XHJcbiAgICAgICAgbW9udGhOYW1lczogSURhdGVQaWNrZXJNb250aFtdO1xyXG4gICAgICAgIGRheXNPZldlZWs6IHN0cmluZ1tdO1xyXG4gICAgICAgIGlzVmlzaWJsZTogYm9vbGVhbjtcclxuICAgICAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcclxuICAgICAgICBpc29Gb3JtYXQgPSAnWVlZWS1NTS1ERCc7XHJcbiAgICAgICAgaXNTaW5nbGVEYXRlOiBib29sZWFuO1xyXG4gICAgICAgIGhpZ2hsaWdodGVkOiBzdHJpbmdbXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfZGF0ZUludGVybmFsO1xyXG5cclxuICAgICAgICBnZXQgZGF0ZUludGVybmFsKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGRhdGVJbnRlcm5hbCh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBtID0gdmFsdWUgIT0gbnVsbCA/IG1vbWVudCh2YWx1ZSkgOiBtb21lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0ZUludGVybmFsID0gbTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSh0aGlzLl9kYXRlSW50ZXJuYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHRpdGxlKCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuRGF5czpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsLmZvcm1hdCgnTU1NTSBZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3Lk1vbnRoczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsLmZvcm1hdCgnWVlZWScpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5ZZWFyczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlbGVjdCBhIHllYXInO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdmlld1R5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuTW9udGhzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm1vbnRoc1wiO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5ZZWFyczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ5ZWFyc1wiO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuRGF5czpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJkYXlzXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dEYXlzKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID4gRGF0ZVBpY2tlclZpZXcuRGF5cylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuRGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dNb250aHMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPiBEYXRlUGlja2VyVmlldy5Nb250aHMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3Lk1vbnRocztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dZZWFycygpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuWWVhcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWxjdWxhdGUoZnJvbURhdGUpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gbW9tZW50KGZyb21EYXRlKS5zdGFydE9mKCdtb250aCcpLnN0YXJ0T2YoJ3dlZWsnKSxcclxuICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudChmcm9tRGF0ZSkuZW5kT2YoJ21vbnRoJykuZW5kT2YoJ3dlZWsnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2Vla3MgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJEYXlbXT4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF5ID0gbW9tZW50KHN0YXJ0KTsgZGF5LmlzQmVmb3JlKGVuZCk7IGRheS5hZGQoMSwgJ3dlZWsnKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdlZWsgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFdlZWsoZnJvbURhdGUsIGRheSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlZWtzLnB1c2god2Vlayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMueWVhcnMgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFllYXJzKGZyb21EYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzU2VsZWN0ZWQoZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMuZGF0ZSkuaXNTYW1lKGRheS52YWx1ZSwgJ2RheScpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRheS52YWx1ZS5pc0JldHdlZW4odGhpcy5zdGFydCwgdGhpcy5lbmQsICdkYXknKSB8fFxyXG4gICAgICAgICAgICAgICAgZGF5LnZhbHVlLmlzU2FtZSh0aGlzLnN0YXJ0LCAnZGF5JykgfHxcclxuICAgICAgICAgICAgICAgIGRheS52YWx1ZS5pc1NhbWUodGhpcy5lbmQsICdkYXknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzSGlnaGxpZ2h0ZWQoZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oaWdobGlnaHRlZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmhpZ2hsaWdodGVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmhpZ2hsaWdodGVkW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCh2YWx1ZSkuaXNTYW1lKGRheS52YWx1ZSwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGluZyhkYXlzOiBJRGF0ZVBpY2tlckRheVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZGVzZWxlY3RBbGwodGhpcy53ZWVrcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2Uuc2VsZWN0RGF5cyhkYXlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkKGRheXM6IElEYXRlUGlja2VyRGF5W10pIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5kZXNlbGVjdEFsbCh0aGlzLndlZWtzKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGRheXNbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGVuZCA9IGRheXNbZGF5cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWREYXRlKGRheTogSURhdGVQaWNrZXJEYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlID0gbW9tZW50KGRheS52YWx1ZSkuZm9ybWF0KHRoaXMuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgdGhpcy5vbkRhdGVTZWxlY3QoeyBkYXRlOiB0aGlzLmRhdGUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZFJhbmdlKHN0YXJ0OiBJRGF0ZVBpY2tlckRheSwgZW5kOiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHN0YXJ0LnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG1vbWVudChlbmQudmFsdWUpLmZvcm1hdCh0aGlzLmlzb0Zvcm1hdCk7XHJcbiAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiB0aGlzLnN0YXJ0LCBlbmQ6IHRoaXMuZW5kIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0TW9udGgoaWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IHRoaXMubW9udGhOYW1lc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vbnRoKG1vbnRoLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA9PT0gRGF0ZVBpY2tlclZpZXcuTW9udGhzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLmRhdGVJbnRlcm5hbC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IHRoaXMuZGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLmRhdGVJbnRlcm5hbCkuZW5kT2YoJ21vbnRoJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmQgPSBtb21lbnQodGhpcy5kYXRlSW50ZXJuYWwpLmVuZE9mKCdtb250aCcpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiB0aGlzLnN0YXJ0LCBlbmQ6IHRoaXMuZW5kIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93RGF5cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNNb250aChtb250aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlSW50ZXJuYWwubW9udGgoKSA9PSBtb250aC52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldE1vbnRoKG1vbnRoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuc2V0KCdtb250aCcsIG1vbnRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzWWVhcih5ZWFyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVJbnRlcm5hbC55ZWFyKCkgPT0geWVhci52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFllYXIoaWR4KSB7XHJcbiAgICAgICAgICAgIHZhciB5ZWFyID0gdGhpcy55ZWFyc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldFllYXIoeWVhci52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPT09IERhdGVQaWNrZXJWaWV3LlllYXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLmRhdGVJbnRlcm5hbC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IHRoaXMuZGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLmRhdGVJbnRlcm5hbCkuc3RhcnRPZigneWVhcicpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kID0gbW9tZW50KHRoaXMuZGF0ZUludGVybmFsKS5lbmRPZigneWVhcicpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiB0aGlzLnN0YXJ0LCBlbmQ6IHRoaXMuZW5kIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93TW9udGhzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRZZWFyKHllYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5zZXQoJ3llYXInLCB5ZWFyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZNb250aCgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5zdWJ0cmFjdCgxLCAnbW9udGhzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0TW9udGgoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuYWRkKDEsICdtb250aHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZZZWFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnN1YnRyYWN0KDEsICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV4dFllYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuYWRkKDEsICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldlJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnN1YnRyYWN0KDksICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV4dFJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLmFkZCg5LCAneWVhcnMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRpbmplY3RvcicsICckY29tcGlsZScsICckdGVtcGxhdGVDYWNoZScsICckdGltZW91dCcsICckd2luZG93JywgJ2RhdGVQaWNrZXJTZXJ2aWNlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGluamVjdG9yLCBwcml2YXRlICRjb21waWxlLCBwcml2YXRlICR0ZW1wbGF0ZUNhY2hlLCBwcml2YXRlICR0aW1lb3V0LCBwcml2YXRlICR3aW5kb3csIHByaXZhdGUgZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZSkgeyB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0FFJztcclxuICAgICAgICByZXF1aXJlID0gJz9uZ01vZGVsJztcclxuICAgICAgICBjb250cm9sbGVyID0gRGF0ZVBpY2tlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ2RhdGVwaWNrZXInO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICAvLyBTaW5nbGUgRGF0ZVxyXG4gICAgICAgICAgICBkYXRlOiAnPScsXHJcbiAgICAgICAgICAgIG9uRGF0ZVNlbGVjdDogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gUmFuZ2VcclxuICAgICAgICAgICAgc3RhcnQ6ICc9JyxcclxuICAgICAgICAgICAgZW5kOiAnPScsXHJcbiAgICAgICAgICAgIG9uUmFuZ2VTZWxlY3Q6ICcmJyxcclxuXHJcbiAgICAgICAgICAgIC8vIE90aGVyXHJcbiAgICAgICAgICAgIGlzU2VsZWN0aW5nOiAnPT8nLFxyXG5cclxuICAgICAgICAgICAgLy8gQ29sbGVjdGlvbiBvZiBkYXRlIHN0cmluZ3MgKGllLiBbJzIwMTItMTItMDEnLCcyMDEyLTEyLTAyJ11cclxuICAgICAgICAgICAgaGlnaGxpZ2h0ZWQ6ICc9PydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYWxlbmRhclRlbXBsYXRlID0gJ2RhdGUtcGlja2VyLmh0bWwnO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpID0+IHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpeGVzIGEgYnVnIHdoZXJlIFRldGhlciBjYW5ub3QgY29ycmVjdGx5IGdldCB3aWR0aC9oZWlnaHQgYmVjYXVzZSBvZiBuZ0FuaW1hdGVcclxuICAgICAgICAgICAgdmFyICRhbmltYXRlID0gdGhpcy4kaW5qZWN0b3IuZ2V0KCckYW5pbWF0ZScpO1xyXG4gICAgICAgICAgICBpZiAoJGFuaW1hdGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICRhbmltYXRlLmVuYWJsZWQoZmFsc2UsICRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkZWxlbWVudC5pcygnaW5wdXRbdHlwZT1cInRleHRcIl0nKSlcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua0lucHV0KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICgkZWxlbWVudC5pcygnZGF0ZS1waWNrZXInKSlcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua0lubGluZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rRWxlbWVudCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdHJsLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXlTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucmFuZ2VTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlua0lucHV0KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IGN0cmwuZGF0ZSwgZGF0ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSBkYXRlID09IG51bGwgPyAnJyA6IG1vbWVudChkYXRlKS5mb3JtYXQoXCJMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2V0Vmlld1ZhbHVlID0gKHN0YXJ0LCBlbmQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnQgIT0gbnVsbCAmJiBlbmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbVN0YXJ0ID0gbW9tZW50KHN0YXJ0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1FbmQgPSBtb21lbnQoZW5kKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtU3RhcnQuaXNTYW1lKGVuZCwgJ2RheScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gbVN0YXJ0LmZvcm1hdChcIkxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gYCR7bVN0YXJ0LmZvcm1hdChcIkxcIil9IC0gJHttRW5kLmZvcm1hdChcIkxcIil9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IG1vbWVudChlbmQpLmZvcm1hdChcIkxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gbW9tZW50KGVuZCkuZm9ybWF0KFwiTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IGN0cmwuc3RhcnQsIHN0YXJ0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRWaWV3VmFsdWUoc3RhcnQsIGN0cmwuZW5kKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4gY3RybC5lbmQsIGVuZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0Vmlld1ZhbHVlKGN0cmwuc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGNoYW5nZS4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGUgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0VG9Nb21lbnQobmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0ZS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5kYXRlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGUuaXNTYW1lKGN0cmwuZGF0ZSwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuZGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb1JhbmdlKG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYW5nZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc3RhcnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLmVuZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbW9tZW50KHJhbmdlLnN0YXJ0KS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc3RhcnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1vbWVudChyYW5nZS5lbmQpLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5lbmQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5zdGFydCA9PSBudWxsIHx8IGN0cmwuZW5kID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9tZW50KHJhbmdlLnN0YXJ0KS5pc1NhbWUoY3RybC5zdGFydCwgJ2RheScpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnQocmFuZ2UuZW5kKS5pc1NhbWUoY3RybC5lbmQsICdkYXknKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc3RhcnQgPSByYW5nZS5zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5lbmQgPSByYW5nZS5lbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihga2V5ZG93bi4keyRzY29wZS4kaWR9YCwgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWN0cmwuaXNWaXNpYmxlIHx8ICF0aGlzLmlzRXNjYXBlKGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rRWxlbWVudCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua0lubGluZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5jcmVhdGVDb250ZW50KCRzY29wZSk7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldERheXMocmFuZ2UsIGN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0OiBJRGF0ZVBpY2tlckRheSA9IGFuZ3VsYXIuZWxlbWVudChyYW5nZS5zdGFydC50YXJnZXQpLnNjb3BlKClbJ2RheSddLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBJRGF0ZVBpY2tlckRheSA9IGFuZ3VsYXIuZWxlbWVudChyYW5nZS5lbmQudGFyZ2V0KS5zY29wZSgpWydkYXknXTtcclxuICAgICAgICAgICAgdmFyIGRheXMgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFJhbmdlRGF5cyhzdGFydCwgZW5kLCBjdHJsLndlZWtzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3BvdmVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xyXG4gICAgICAgICAgICB2YXIgY29udGVudCxcclxuICAgICAgICAgICAgICAgIHRldGhlcixcclxuICAgICAgICAgICAgICAgICRib2R5OmFueSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRvTm90UmVvcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGN0cmxbJ2RhdGVTZWxlY3RlZCddID0gKGRhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkb05vdFJlb3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgZG9Ob3RSZW9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGN0cmwub25EYXRlU2VsZWN0KHsgZGF0ZTogZGF0ZSB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGN0cmxbJ3JhbmdlU2VsZWN0ZWQnXSA9IChzdGFydCwgZW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZG9Ob3RSZW9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIGRvTm90UmVvcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjdHJsLm9uUmFuZ2VTZWxlY3QoeyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGNsaWNrLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGZvY3VzLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9Ob3RSZW9wZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmNyZWF0ZURyb3BEb3duKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGV0aGVyID0gbmV3IFRldGhlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogJGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEF0dGFjaG1lbnQ6ICdib3R0b20gY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudDogJ3RvcCBjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc1ByZWZpeDogJ2RhdGVwaWNrZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRPZmZzZXQ6ICcxNHB4IDAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiAnd2luZG93JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50OiAndG9nZXRoZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpbjogWyd0b3AnLCAnbGVmdCcsICdib3R0b20nLCAncmlnaHQnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgdGV0aGVyLnBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJsdXJUaW1lcjtcclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGJsdXIuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIEFsbG93IGFueSBjbGljayBvbiB0aGUgbWVudSB0byBjb21lIHRocm91Z2ggZmlyc3RcclxuICAgICAgICAgICAgICAgIGJsdXJUaW1lciA9IHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLmlzU2VsZWN0aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAkYm9keS5vbihgRE9NTW91c2VTY3JvbGwuJHskc2NvcGUuJGlkfSBtb3VzZXdoZWVsLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAoIWN0cmwuaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFuZ3VsYXIuZWxlbWVudCh0aGlzLiR3aW5kb3cpLm9uKGByZXNpemUuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAgICAgJGJvZHkub24oYGNsaWNrLiR7JHNjb3BlLiRpZH1gLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghY3RybC5pc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY29udGVudCB8fCAkZWxlbWVudC5pcyhlLnRhcmdldCkgfHwgY29udGVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0LmNhbmNlbChibHVyVGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50ICYmIGNvbnRlbnQuaGFzKGUudGFyZ2V0KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGJvZHkub2ZmKGBjbGljay4keyRzY29wZS4kaWR9IERPTU1vdXNlU2Nyb2xsLiR7JHNjb3BlLiRpZH0gbW91c2V3aGVlbC4keyRzY29wZS4kaWR9YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQpIGNvbnRlbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlRHJvcERvd24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBzaW5nbGVEYXRlQmluZGluZyA9IGBkYXRlPVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uZGF0ZVwiIG9uLWRhdGUtc2VsZWN0PVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uZGF0ZVNlbGVjdGVkKGRhdGUpXCJgLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2VCaW5kaW5nID0gYHN0YXJ0PVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uc3RhcnRcIiBlbmQ9XCIke3RoaXMuY29udHJvbGxlckFzfS5lbmRcIiBvbi1yYW5nZS1zZWxlY3Q9XCIke3RoaXMuY29udHJvbGxlckFzfS5yYW5nZVNlbGVjdGVkKHN0YXJ0LGVuZClcImAsXHJcbiAgICAgICAgICAgICAgICBiaW5kaW5ncyA9IGN0cmwuaXNTaW5nbGVEYXRlID8gc2luZ2xlRGF0ZUJpbmRpbmcgOiByYW5nZUJpbmRpbmcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1kcm9wZG93blwiIG5nLWNsYXNzPVwieydkYXRlcGlja2VyLW9wZW4nOiR7dGhpcy5jb250cm9sbGVyQXN9LmlzVmlzaWJsZX1cIj48ZGF0ZS1waWNrZXIgbWluLXZpZXc9XCIkeyRhdHRycy5taW5WaWV3fVwiIGlzLXNlbGVjdGluZz1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmlzU2VsZWN0aW5nXCIgJHtiaW5kaW5nc31cIiBoaWdobGlnaHRlZD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmhpZ2hsaWdodGVkXCI+PC9kYXRlLXBpY2tlcj48L2Rpdj5gLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDphbnkgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGUpLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSAkZWxlbWVudC5wb3NpdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gJGVsZW1lbnQub3V0ZXJIZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgIG1hcmdpbiA9ICgkZWxlbWVudC5vdXRlckhlaWdodCh0cnVlKSAtIGhlaWdodCksXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBtYXJnaW4gLyAyICsgaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29udGVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdG9wOiBwb3NpdGlvbi50b3AgKyBvZmZzZXQsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBwb3NpdGlvbi5sZWZ0XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZShjb250ZW50KSgkc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNFc2NhcGUoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS53aGljaCA9PT0gMjc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVDb250ZW50KCRzY29wZSkge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLiR0ZW1wbGF0ZUNhY2hlLmdldCh0aGlzLmNhbGVuZGFyVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICB2YXIgY29udGVudCA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbXBpbGUoY29udGVudCkoJHNjb3BlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXlTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdLFxyXG4gICAgICAgICAgICAgICAgZGF5Q3NzID0gJy5kYXRlUGlja2VyRGF5cy1kYXknLFxyXG4gICAgICAgICAgICAgICAgJGJvZHk6YW55ID0gYW5ndWxhci5lbGVtZW50KCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICBtb3VzZURvd24gPSBgbW91c2Vkb3duLiR7JHNjb3BlLiRpZH1gLFxyXG4gICAgICAgICAgICAgICAgbW91c2VVcCA9IGBtb3VzZXVwLiR7JHNjb3BlLiRpZH1gO1xyXG5cclxuICAgICAgICAgICAgdmFyIG9uU2VsZWN0ZWQgPSByYW5nZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF5cyA9IHRoaXMuZ2V0RGF5cyhyYW5nZSwgY3RybCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VEb3duLCBkYXlDc3MsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0geyBzdGFydDogZSwgZW5kOiBlIH07XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzU2VsZWN0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYm9keS5vbihtb3VzZVVwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkub2ZmKG1vdXNlVXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhbmdlU2VsZWN0KCRzY29wZSwgJGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgICRib2R5OmFueSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgbW91c2VEb3duID0gYG1vdXNlZG93bi4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIG1vdXNlT3ZlciA9IGBtb3VzZW92ZXIuJHskc2NvcGUuJGlkfWAsXHJcbiAgICAgICAgICAgICAgICBtb3VzZVVwID0gYG1vdXNldXAuJHskc2NvcGUuJGlkfWAsXHJcbiAgICAgICAgICAgICAgICBkYXlDc3MgPSAnLmRhdGVQaWNrZXJEYXlzLWRheSc7XHJcblxyXG4gICAgICAgICAgICB2YXIgb25TZWxlY3RpbmcgPSByYW5nZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF5cyA9IHRoaXMuZ2V0RGF5cyhyYW5nZSwgY3RybCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGluZyhkYXlzKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBvblNlbGVjdGVkID0gcmFuZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRheXMgPSB0aGlzLmdldERheXMocmFuZ2UsIGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZChkYXlzKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKG1vdXNlRG93biwgZGF5Q3NzLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IHsgc3RhcnQ6IGUsIGVuZDogZSB9O1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1NlbGVjdGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VPdmVyLCBkYXlDc3MsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLmVuZCA9IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RpbmcocmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJvZHkub24obW91c2VVcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihtb3VzZU92ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5Lm9mZihtb3VzZVVwKTtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmlzU2VsZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RlZChyYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLmRpcmVjdGl2ZSgnZGF0ZVBpY2tlcicsIERhdGVQaWNrZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG5cclxuICAgIC8vIERhdGVQaWNrZXJSYW5nZVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICBzdGFydDogc3RyaW5nO1xyXG4gICAgICAgIGVuZDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJSYW5nZSBpbXBsZW1lbnRzIElEYXRlUGlja2VyUmFuZ2Uge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBhbnksIGVuZDogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBtU3RhcnQgPSBtb21lbnQoc3RhcnQpO1xyXG4gICAgICAgICAgICB2YXIgbUVuZCA9IG1vbWVudChlbmQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1FbmQuaXNCZWZvcmUobVN0YXJ0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBtU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBtU3RhcnQgPSBtRW5kO1xyXG4gICAgICAgICAgICAgICAgbUVuZCA9IHRlbXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBtU3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbUVuZC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0OiBzdHJpbmc7XHJcbiAgICAgICAgZW5kOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlck1vbnRoXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyTW9udGgge1xyXG4gICAgICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJNb250aCBpbXBsZW1lbnRzIElEYXRlUGlja2VyTW9udGgge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBtID0gbW9tZW50KCk7XHJcbiAgICAgICAgICAgIHZhciB0aGlzTW9udGggPSBtLm1vbnRoKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG0ubW9udGgodmFsdWUpLmZvcm1hdCgnTU1NJyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50TW9udGggPSB2YWx1ZSA9PT0gdGhpc01vbnRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERhdGVQaWNrZXJNb250aFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlclllYXIge1xyXG4gICAgICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICAgICAgaXNDdXJyZW50WWVhcjogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyWWVhciBpbXBsZW1lbnRzIElEYXRlUGlja2VyWWVhciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRZZWFyID0gdmFsdWUgPT09IG1vbWVudCgpLnllYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzQ3VycmVudFllYXI6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSURhdGVQaWNrZXJEYXlcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJEYXkge1xyXG4gICAgICAgIGRhdGU6IG51bWJlcjtcclxuICAgICAgICB2YWx1ZTogYW55O1xyXG4gICAgICAgIGlzVG9kYXk6IGJvb2xlYW47XHJcbiAgICAgICAgaXNOb3RJbk1vbnRoOiBib29sZWFuO1xyXG4gICAgICAgIGlzU2VsZWN0aW5nOiBib29sZWFuO1xyXG4gICAgICAgIGlzQmVmb3JlKGRheTogSURhdGVQaWNrZXJEYXkpOiBib29sZWFuO1xyXG4gICAgICAgIGlzU2FtZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyRGF5IGltcGxlbWVudHMgSURhdGVQaWNrZXJEYXkge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGZyb21EYXRlOiBhbnksIGRheU9mV2VlazogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBtb21lbnQoZGF5T2ZXZWVrKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlID0gdGhpcy52YWx1ZS5kYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNUb2RheSA9IGRheU9mV2Vlay5pc1NhbWUobW9tZW50KCksICdkYXknKTtcclxuICAgICAgICAgICAgdGhpcy5pc05vdEluTW9udGggPSAhdGhpcy52YWx1ZS5pc1NhbWUoZnJvbURhdGUsICdtb250aCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0ZTogbnVtYmVyO1xyXG4gICAgICAgIHZhbHVlOiBhbnk7XHJcbiAgICAgICAgaXNUb2RheTogYm9vbGVhbjtcclxuICAgICAgICBpc05vdEluTW9udGg6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGlzQmVmb3JlKGRheTogSURhdGVQaWNrZXJEYXkpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGlzQmVmb3JlID0gdGhpcy52YWx1ZS5pc0JlZm9yZShkYXkudmFsdWUsICdkYXknKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzQmVmb3JlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNTYW1lKGRheTogSURhdGVQaWNrZXJEYXkpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGlzU2FtZSA9IHRoaXMudmFsdWUuaXNTYW1lKGRheS52YWx1ZSwgJ2RheScpO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNTYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBEYXRlUGlja2VyU2VydmljZVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlclNlcnZpY2Uge1xyXG4gICAgICAgIGdldE1vbnRocygpOiBJRGF0ZVBpY2tlck1vbnRoW107XHJcbiAgICAgICAgZ2V0RGF5c09mV2VlaygpOiBzdHJpbmdbXTtcclxuICAgICAgICBnZXRZZWFycyhmcm9tRGF0ZSk6IElEYXRlUGlja2VyWWVhcltdO1xyXG4gICAgICAgIGdldFdlZWsoZnJvbURhdGUsIHN0YXJ0T2ZXZWVrKTogSURhdGVQaWNrZXJEYXlbXTtcclxuICAgICAgICBnZXRSYW5nZURheXMoc3RhcnQ6IElEYXRlUGlja2VyRGF5LCBlbmQ6IElEYXRlUGlja2VyRGF5LCB3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKTogSURhdGVQaWNrZXJEYXlbXTtcclxuICAgICAgICBkZXNlbGVjdEFsbCh3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKTtcclxuICAgICAgICBzZWxlY3REYXlzKGRheXM6IElEYXRlUGlja2VyRGF5W10pO1xyXG4gICAgICAgIGlucHV0VG9Nb21lbnQodmFsdWU6IHN0cmluZyk6IGFueTtcclxuICAgICAgICBpbnB1dFRvUmFuZ2UodmFsdWU6IHN0cmluZyk6IElEYXRlUGlja2VyUmFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlclNlcnZpY2UgaW1wbGVtZW50cyBJRGF0ZVBpY2tlclNlcnZpY2Uge1xyXG4gICAgICAgIGdldE1vbnRocygpOiBJRGF0ZVBpY2tlck1vbnRoW10ge1xyXG4gICAgICAgICAgICB2YXIgbW9udGhzID0gbmV3IEFycmF5PElEYXRlUGlja2VyTW9udGg+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG1vbnRocy5wdXNoKG5ldyBEYXRlUGlja2VyTW9udGgoaSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbW9udGhzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0WWVhcnMoZnJvbURhdGUpOiBJRGF0ZVBpY2tlclllYXJbXSB7XHJcbiAgICAgICAgICAgIHZhciBmcm9tWWVhciA9IG1vbWVudChmcm9tRGF0ZSkueWVhcigpLFxyXG4gICAgICAgICAgICAgICAgeWVhcnMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJZZWFyPigpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGZyb21ZZWFyOyBpIDw9IChmcm9tWWVhciArIDgpOyBpKyspXHJcbiAgICAgICAgICAgICAgICB5ZWFycy5wdXNoKG5ldyBEYXRlUGlja2VyWWVhcihpKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geWVhcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRXZWVrKGZyb21EYXRlLCBzdGFydE9mV2Vlayk6IElEYXRlUGlja2VyRGF5W10ge1xyXG4gICAgICAgICAgICB2YXIgZW5kT2ZXZWVrID0gbW9tZW50KHN0YXJ0T2ZXZWVrKS5lbmRPZignd2VlaycpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRheXMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJEYXk+KCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGRheU9mV2VlayA9IG1vbWVudChzdGFydE9mV2Vlayk7IGRheU9mV2Vlay5pc0JlZm9yZShlbmRPZldlZWspOyBkYXlPZldlZWsuYWRkKDEsICdkYXlzJykpIHtcclxuICAgICAgICAgICAgICAgIGRheXMucHVzaChuZXcgRGF0ZVBpY2tlckRheShmcm9tRGF0ZSwgZGF5T2ZXZWVrKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0RGF5c09mV2VlaygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQud2Vla2RheXNTaG9ydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0UmFuZ2VEYXlzKHN0YXJ0OiBJRGF0ZVBpY2tlckRheSwgZW5kOiBJRGF0ZVBpY2tlckRheSwgd2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSk6IElEYXRlUGlja2VyRGF5W10ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVuZC5pc0JlZm9yZShzdGFydCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IGVuZDtcclxuICAgICAgICAgICAgICAgIGVuZCA9IHRlbXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhbGxEYXlzID0gbmV3IEFycmF5PElEYXRlUGlja2VyRGF5PigpLFxyXG4gICAgICAgICAgICAgICAgaXNBZGRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHdlZWtzLmZvckVhY2god2VlayA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZWVrLmZvckVhY2goZGF5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5LmlzU2FtZShzdGFydCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWRkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQWRkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbERheXMucHVzaChkYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRheS5pc1NhbWUoZW5kKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBZGRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxEYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVzZWxlY3RBbGwod2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSkge1xyXG4gICAgICAgICAgICB3ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2Vlay5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5LmlzU2VsZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3REYXlzKGRheXM6IElEYXRlUGlja2VyRGF5W10pIHtcclxuICAgICAgICAgICAgZGF5cy5mb3JFYWNoKGRheSA9PiBkYXkuaXNTZWxlY3RpbmcgPSB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0VG9Nb21lbnQodmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgICAgIHZhciBsYW5nID0gbW9tZW50LmxvY2FsZURhdGEoKTtcclxuICAgICAgICAgICAgdmFyIGZvcm1hdHMgPSBbXHJcbiAgICAgICAgICAgICAgICBsYW5nLmxvbmdEYXRlRm9ybWF0KFwibFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKSxcclxuICAgICAgICAgICAgICAgIGxhbmcubG9uZ0RhdGVGb3JtYXQoXCJMXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gIC9nLCAnICcpXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG1vbWVudCh2YWx1ZSwgZm9ybWF0cyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXRUb1JhbmdlKHZhbHVlOiBzdHJpbmcpOiBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgIXZhbHVlLnRyaW0oKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgdmFyIHRyaW1tZWQgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnRyaW0oKTtcclxuICAgICAgICAgICAgdmFyIGV4cFN0YXJ0ID0gbmV3IFJlZ0V4cChcIl4oKFswLTldezEsNH1bIF0qKXszfSlcIik7XHJcbiAgICAgICAgICAgIHZhciBleHBFbmQgPSBuZXcgUmVnRXhwKFwiKChbMC05XXsxLDR9WyBdKil7M30pJFwiKTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0UmVzdWx0ID0gZXhwU3RhcnQuZXhlYyh0cmltbWVkKTtcclxuICAgICAgICAgICAgdmFyIGVuZFJlc3VsdCA9IGV4cEVuZC5leGVjKHRyaW1tZWQpO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmlucHV0VG9Nb21lbnQoc3RhcnRSZXN1bHRbMF0udHJpbSgpKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMuaW5wdXRUb01vbWVudCgoZW5kUmVzdWx0WzBdIHx8IHN0YXJ0UmVzdWx0WzBdKS50cmltKCkpO1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBuZXcgRGF0ZVBpY2tlclJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLnNlcnZpY2UoJ2RhdGVQaWNrZXJTZXJ2aWNlJywgRGF0ZVBpY2tlclNlcnZpY2UpO1xyXG59IiwiXHJcbm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJ3RpbWVQaWNrZXJTZXJ2aWNlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZVBpY2tlclNlcnZpY2U6IElUaW1lUGlja2VyU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCgkc2NvcGUsICRlbGVtZW50LCBuZ01vZGVsQ3RybCkge1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcclxuICAgICAgICAgICAgdGhpcy5uZ01vZGVsQ3RybCA9IG5nTW9kZWxDdHJsO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGJsdXIuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBtID0gdGhpcy50aW1lUGlja2VyU2VydmljZS5wYXJzZShuZ01vZGVsQ3RybC4kbW9kZWxWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUgPSBtLmlzVmFsaWQoKSA/IG0uZm9ybWF0KFwiSEg6bW06c3NcIikgOiBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKGBibHVyLiR7JHNjb3BlLiRpZH1gKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMuX3RpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfdGltZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgdGltZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCB0aW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldFZhbHVlKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWV3VmFsdWUgPSB0aGlzLnRpbWVQaWNrZXJTZXJ2aWNlLmZvcm1hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMubmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh2aWV3VmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLm5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5nTW9kZWxDdHJsO1xyXG4gICAgICAgICRzY29wZTtcclxuICAgICAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdBJztcclxuICAgICAgICByZXF1aXJlID0gJ25nTW9kZWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBUaW1lUGlja2VyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndGltZXBpY2tlcic7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpbWU6ICc9J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogVGltZVBpY2tlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdO1xyXG4gICAgICAgICAgICBjdHJsLm9uSW5pdCgkc2NvcGUsICRlbGVtZW50LCBuZ01vZGVsQ3RybCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuZGlyZWN0aXZlKCd0aW1lUGlja2VyJywgVGltZVBpY2tlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVGltZVBpY2tlclNlcnZpY2Uge1xyXG4gICAgICAgIHBhcnNlKHRleHQ6IHN0cmluZyk6IGFueTtcclxuICAgICAgICBmb3JtYXQodGV4dDogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRpbWVQaWNrZXJTZXJ2aWNlIGltcGxlbWVudHMgSVRpbWVQaWNrZXJTZXJ2aWNlIHtcclxuICAgICAgICBwYXJzZSh0ZXh0OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgcGF0dGVybnMgPSBbXHJcbiAgICAgICAgICAgICAgICAnTFQnLFxyXG4gICAgICAgICAgICAgICAgJ0xUUycsXHJcbiAgICAgICAgICAgICAgICAnSEg6bW06c3MnLFxyXG4gICAgICAgICAgICAgICAgJ0hIOm1tIEEnXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQodGV4dCwgcGF0dGVybnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybWF0KHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5wYXJzZSh0ZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIG0uaXNWYWxpZCgpID8gbS5mb3JtYXQoJ0xUJykgOiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuc2VydmljZSgndGltZVBpY2tlclNlcnZpY2UnLCBUaW1lUGlja2VyU2VydmljZSk7XHJcbn0iXX0=