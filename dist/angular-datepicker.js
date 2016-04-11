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
                    ctrl.date = date.format(ctrl.isoFormat);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kYXRlcGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyIsIi4uL3NyYy9kYXRlLXBpY2tlci50cyIsIi4uL3NyYy9kYXRlLXBpY2tlci1zZXJ2aWNlLnRzIiwiLi4vc3JjL3RpbWUtcGlja2VyLnRzIiwiLi4vc3JjL3RpbWUtcGlja2VyLXNlcnZpY2UudHMiXSwibmFtZXMiOlsiRGF0ZVBpY2tlck1vZHVsZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclZpZXciLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuZGF0ZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc3RhcnQiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLmVuZCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuZGF0ZUludGVybmFsIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci50aXRsZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIudmlld1R5cGUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNob3dEYXlzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zaG93TW9udGhzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zaG93WWVhcnMiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLmNhbGN1bGF0ZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuaXNTZWxlY3RlZCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuaXNIaWdobGlnaHRlZCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2VsZWN0aW5nIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZWxlY3RlZCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2VsZWN0ZWREYXRlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZWxlY3RlZFJhbmdlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZWxlY3RNb250aCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuaXNNb250aCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2V0TW9udGgiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLmlzWWVhciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2VsZWN0WWVhciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2V0WWVhciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIucHJldk1vbnRoIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5uZXh0TW9udGgiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnByZXZZZWFyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5uZXh0WWVhciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIucHJldlJhbmdlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5uZXh0UmFuZ2UiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUubGlua0lucHV0IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmxpbmtFbGVtZW50IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmxpbmtJbmxpbmUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUuZ2V0RGF5cyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5wb3BvdmVyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmNyZWF0ZURyb3BEb3duIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLnByZXZlbnREZWZhdWx0IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmlzRXNjYXBlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmNyZWF0ZUNvbnRlbnQiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUuZGF5U2VsZWN0IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLnJhbmdlU2VsZWN0IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyUmFuZ2UiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJSYW5nZS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlck1vbnRoIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyTW9udGguY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJZZWFyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyWWVhci5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRheSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRheS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRheS5pc0JlZm9yZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRheS5pc1NhbWUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJTZXJ2aWNlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZ2V0TW9udGhzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5nZXRZZWFycyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZ2V0V2VlayIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZ2V0RGF5c09mV2VlayIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZ2V0UmFuZ2VEYXlzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5kZXNlbGVjdEFsbCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2Uuc2VsZWN0RGF5cyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb01vbWVudCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb1JhbmdlIiwiRGF0ZVBpY2tlck1vZHVsZS5UaW1lUGlja2VyQ29udHJvbGxlciIsIkRhdGVQaWNrZXJNb2R1bGUuVGltZVBpY2tlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJDb250cm9sbGVyLm9uSW5pdCIsIkRhdGVQaWNrZXJNb2R1bGUuVGltZVBpY2tlckNvbnRyb2xsZXIudGltZSIsIkRhdGVQaWNrZXJNb2R1bGUuVGltZVBpY2tlckNvbnRyb2xsZXIuc2V0VmFsdWUiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJEaXJlY3RpdmUiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJTZXJ2aWNlIiwiRGF0ZVBpY2tlck1vZHVsZS5UaW1lUGlja2VyU2VydmljZS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuVGltZVBpY2tlclNlcnZpY2UucGFyc2UiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJTZXJ2aWNlLmZvcm1hdCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7QUNDbkMsSUFBTyxnQkFBZ0IsQ0FzcEJ0QjtBQXRwQkQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBR3JCQSxJQUFLQSxjQUlKQTtJQUpEQSxXQUFLQSxjQUFjQTtRQUNmQyxtREFBUUEsQ0FBQUE7UUFDUkEsdURBQVVBLENBQUFBO1FBQ1ZBLHFEQUFTQSxDQUFBQTtJQUNiQSxDQUFDQSxFQUpJRCxjQUFjQSxLQUFkQSxjQUFjQSxRQUlsQkE7SUFFREE7UUFJSUUsOEJBQW9CQSxNQUFNQSxFQUFVQSxpQkFBcUNBO1lBQXJEQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFBQTtZQUFVQSxzQkFBaUJBLEdBQWpCQSxpQkFBaUJBLENBQW9CQTtZQXlFekVBLGNBQVNBLEdBQUdBLFlBQVlBLENBQUNBO1lBeEVyQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsaUJBQWlCQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtZQUNoREEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsaUJBQWlCQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtZQUVwREEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3JCQSxLQUFLQSxPQUFPQTtvQkFDUkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsY0FBY0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7b0JBQ2pDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxjQUFj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d0JBRURBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUMvQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0E7d0JBQ3BCQSxDQUFDQTt3QkFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0E7NEJBQ3ZDQSxNQUFNQSxDQUFDQTt3QkFFWEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0E7NEJBQzdDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTs0QkFDMUNBLE1BQU1BLENBQUNBO3dCQUVYQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTt3QkFDekJBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBO29CQUN6QkEsQ0FBQ0E7Z0JBQ0xBLENBQUNBO2dCQUVEQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQUNwQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFSEEsUUFBUUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsYUFBV0EsTUFBTUEsQ0FBQ0EsR0FBS0EsRUFBRUEsVUFBQUEsQ0FBQ0E7Z0JBQ2xDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxJQUFJQSxDQUFDQSxLQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDckNB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QUdBO2dCQUNYQSxJQUFJQTtnQkFDSkEsS0FBS0E7Z0JBQ0xBLFVBQVVBO2dCQUNWQSxTQUFTQTthQUNaQSxDQUFDQTtZQUNGQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUNsQ0EsQ0FBQ0E7UUFFREYsa0NBQU1BLEdBQU5BLFVBQU9BLElBQVlBO1lBQ2ZHLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ3pCQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUM3Q0EsQ0FBQ0E7UUFDTEgsd0JBQUNBO0lBQURBLENBQUNBLEFBZkR6RSxJQWVDQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxtQkFBbUJBLEVBQUVBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7QUFDbkZBLENBQUNBLEVBekJNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUF5QnRCIiwic291cmNlc0NvbnRlbnQiOlsiQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIiwgW10pOyIsIlxyXG5tb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcbiAgICBkZWNsYXJlIHZhciBUZXRoZXI6IGFueTtcclxuXHJcbiAgICBlbnVtIERhdGVQaWNrZXJWaWV3IHtcclxuICAgICAgICBEYXlzID0gMCxcclxuICAgICAgICBNb250aHMgPSAxLFxyXG4gICAgICAgIFllYXJzID0gMlxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJDb250cm9sbGVyIHtcclxuXHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRhdHRycycsICdkYXRlUGlja2VyU2VydmljZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRhdHRycywgcHJpdmF0ZSBkYXRlUGlja2VyU2VydmljZTogSURhdGVQaWNrZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9udGhOYW1lcyA9IGRhdGVQaWNrZXJTZXJ2aWNlLmdldE1vbnRocygpO1xyXG4gICAgICAgICAgICB0aGlzLmRheXNPZldlZWsgPSBkYXRlUGlja2VyU2VydmljZS5nZXREYXlzT2ZXZWVrKCk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKCRhdHRycy5taW5WaWV3KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFycyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuWWVhcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WaWV3ID0gRGF0ZVBpY2tlclZpZXcuWWVhcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aHMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3Lk1vbnRocztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblZpZXcgPSBEYXRlUGlja2VyVmlldy5Nb250aHM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3LkRheXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WaWV3ID0gRGF0ZVBpY2tlclZpZXcuRGF5cztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pc1NpbmdsZURhdGUgPSAhKCRhdHRycy5zdGFydCAhPSBudWxsIHx8ICRhdHRycy5lbmQgIT0gbnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5pc1NpbmdsZURhdGUgPyB0aGlzLmRhdGUgOiB0aGlzLnN0YXJ0O1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSh0aGlzLmRhdGVJbnRlcm5hbCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2luZ2xlIERhdGVcclxuICAgICAgICBwcml2YXRlIF9kYXRlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGdldCBkYXRlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGRhdGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLl9kYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmFuZ2VcclxuICAgICAgICBwcml2YXRlIF9zdGFydDogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgc3RhcnQoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHN0YXJ0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuX3N0YXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfZW5kOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGdldCBlbmQoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBlbmQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmQgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uRGF0ZVNlbGVjdDtcclxuICAgICAgICBvblJhbmdlU2VsZWN0O1xyXG4gICAgICAgIGlzU2VsZWN0aW5nOiBib29sZWFuO1xyXG5cclxuICAgICAgICB2aWV3OiBEYXRlUGlja2VyVmlldztcclxuICAgICAgICBtaW5WaWV3OiBEYXRlUGlja2VyVmlldztcclxuICAgICAgICB3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdO1xyXG4gICAgICAgIHllYXJzOiBJRGF0ZVBpY2tlclllYXJbXTtcclxuICAgICAgICBtb250aE5hbWVzOiBJRGF0ZVBpY2tlck1vbnRoW107XHJcbiAgICAgICAgZGF5c09mV2Vlazogc3RyaW5nW107XHJcbiAgICAgICAgaXNWaXNpYmxlOiBib29sZWFuO1xyXG4gICAgICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgICAgIGlzb0Zvcm1hdCA9ICdZWVlZLU1NLUREJztcclxuICAgICAgICBpc1NpbmdsZURhdGU6IGJvb2xlYW47XHJcbiAgICAgICAgaGlnaGxpZ2h0ZWQ6IHN0cmluZ1tdO1xyXG5cclxuICAgICAgICBwcml2YXRlIF9kYXRlSW50ZXJuYWw7XHJcblxyXG4gICAgICAgIGdldCBkYXRlSW50ZXJuYWwoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgZGF0ZUludGVybmFsKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIG0gPSB2YWx1ZSAhPSBudWxsID8gbW9tZW50KHZhbHVlKSA6IG1vbWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRlSW50ZXJuYWwgPSBtO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZClcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKHRoaXMuX2RhdGVJbnRlcm5hbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdGl0bGUoKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5EYXlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWwuZm9ybWF0KCdNTU1NIFlZWVknKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuTW9udGhzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LlllYXJzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnc2VsZWN0IGEgeWVhcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB2aWV3VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5Nb250aHM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwibW9udGhzXCI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LlllYXJzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInllYXJzXCI7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5EYXlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImRheXNcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd0RheXMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPiBEYXRlUGlja2VyVmlldy5EYXlzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd01vbnRocygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA+IERhdGVQaWNrZXJWaWV3Lk1vbnRocylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd1llYXJzKCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5ZZWFycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbGN1bGF0ZShmcm9tRGF0ZSkge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBtb21lbnQoZnJvbURhdGUpLnN0YXJ0T2YoJ21vbnRoJykuc3RhcnRPZignd2VlaycpLFxyXG4gICAgICAgICAgICAgICAgZW5kID0gbW9tZW50KGZyb21EYXRlKS5lbmRPZignbW9udGgnKS5lbmRPZignd2VlaycpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53ZWVrcyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlckRheVtdPigpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkYXkgPSBtb21lbnQoc3RhcnQpOyBkYXkuaXNCZWZvcmUoZW5kKTsgZGF5LmFkZCgxLCAnd2VlaycpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2VlayA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0V2Vlayhmcm9tRGF0ZSwgZGF5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2Vla3MucHVzaCh3ZWVrKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy55ZWFycyA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0WWVhcnMoZnJvbURhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNTZWxlY3RlZChkYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQodGhpcy5kYXRlKS5pc1NhbWUoZGF5LnZhbHVlLCAnZGF5Jyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF5LnZhbHVlLmlzQmV0d2Vlbih0aGlzLnN0YXJ0LCB0aGlzLmVuZCwgJ2RheScpIHx8XHJcbiAgICAgICAgICAgICAgICBkYXkudmFsdWUuaXNTYW1lKHRoaXMuc3RhcnQsICdkYXknKSB8fFxyXG4gICAgICAgICAgICAgICAgZGF5LnZhbHVlLmlzU2FtZSh0aGlzLmVuZCwgJ2RheScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNIaWdobGlnaHRlZChkYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaGlnaGxpZ2h0ZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuaGlnaGxpZ2h0ZWRbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAobW9tZW50KHZhbHVlKS5pc1NhbWUoZGF5LnZhbHVlLCAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0aW5nKGRheXM6IElEYXRlUGlja2VyRGF5W10pIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5kZXNlbGVjdEFsbCh0aGlzLndlZWtzKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5zZWxlY3REYXlzKGRheXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWQoZGF5czogSURhdGVQaWNrZXJEYXlbXSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmRlc2VsZWN0QWxsKHRoaXMud2Vla3MpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gZGF5c1swXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUoc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5kID0gZGF5c1tkYXlzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2Uoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZERhdGUoZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBtb21lbnQoZGF5LnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IHRoaXMuZGF0ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkUmFuZ2Uoc3RhcnQ6IElEYXRlUGlja2VyRGF5LCBlbmQ6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBtb21lbnQoc3RhcnQudmFsdWUpLmZvcm1hdCh0aGlzLmlzb0Zvcm1hdCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbW9tZW50KGVuZC52YWx1ZSkuZm9ybWF0KHRoaXMuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgdGhpcy5vblJhbmdlU2VsZWN0KHsgc3RhcnQ6IHRoaXMuc3RhcnQsIGVuZDogdGhpcy5lbmQgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RNb250aChpZHgpIHtcclxuICAgICAgICAgICAgdmFyIG1vbnRoID0gdGhpcy5tb250aE5hbWVzW2lkeF07XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9udGgobW9udGgudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID09PSBEYXRlUGlja2VyVmlldy5Nb250aHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZGF0ZUludGVybmFsLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25EYXRlU2VsZWN0KHsgZGF0ZTogdGhpcy5kYXRlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuZGF0ZUludGVybmFsKS5lbmRPZignbW9udGgnKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLmRhdGVJbnRlcm5hbCkuZW5kT2YoJ21vbnRoJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJhbmdlU2VsZWN0KHsgc3RhcnQ6IHRoaXMuc3RhcnQsIGVuZDogdGhpcy5lbmQgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dEYXlzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc01vbnRoKG1vbnRoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVJbnRlcm5hbC5tb250aCgpID09IG1vbnRoLnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0TW9udGgobW9udGgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5zZXQoJ21vbnRoJywgbW9udGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNZZWFyKHllYXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUludGVybmFsLnllYXIoKSA9PSB5ZWFyLnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0WWVhcihpZHgpIHtcclxuICAgICAgICAgICAgdmFyIHllYXIgPSB0aGlzLnllYXJzW2lkeF07XHJcbiAgICAgICAgICAgIHRoaXMuc2V0WWVhcih5ZWFyLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA9PT0gRGF0ZVBpY2tlclZpZXcuWWVhcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZGF0ZUludGVybmFsLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25EYXRlU2VsZWN0KHsgZGF0ZTogdGhpcy5kYXRlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuZGF0ZUludGVybmFsKS5zdGFydE9mKCd5ZWFyJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmQgPSBtb21lbnQodGhpcy5kYXRlSW50ZXJuYWwpLmVuZE9mKCd5ZWFyJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJhbmdlU2VsZWN0KHsgc3RhcnQ6IHRoaXMuc3RhcnQsIGVuZDogdGhpcy5lbmQgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dNb250aHMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFllYXIoeWVhcikge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnNldCgneWVhcicsIHllYXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldk1vbnRoKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnN1YnRyYWN0KDEsICdtb250aHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5leHRNb250aCgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5hZGQoMSwgJ21vbnRocycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldlllYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuc3VidHJhY3QoMSwgJ3llYXJzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0WWVhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5hZGQoMSwgJ3llYXJzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2UmFuZ2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuc3VidHJhY3QoOSwgJ3llYXJzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0UmFuZ2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuYWRkKDksICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGluamVjdG9yJywgJyRjb21waWxlJywgJyR0ZW1wbGF0ZUNhY2hlJywgJyR0aW1lb3V0JywgJyR3aW5kb3cnLCAnZGF0ZVBpY2tlclNlcnZpY2UnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaW5qZWN0b3IsIHByaXZhdGUgJGNvbXBpbGUsIHByaXZhdGUgJHRlbXBsYXRlQ2FjaGUsIHByaXZhdGUgJHRpbWVvdXQsIHByaXZhdGUgJHdpbmRvdywgcHJpdmF0ZSBkYXRlUGlja2VyU2VydmljZTogSURhdGVQaWNrZXJTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQUUnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnP25nTW9kZWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBEYXRlUGlja2VyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAnZGF0ZXBpY2tlcic7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIC8vIFNpbmdsZSBEYXRlXHJcbiAgICAgICAgICAgIGRhdGU6ICc9JyxcclxuICAgICAgICAgICAgb25EYXRlU2VsZWN0OiAnJicsXHJcblxyXG4gICAgICAgICAgICAvLyBSYW5nZVxyXG4gICAgICAgICAgICBzdGFydDogJz0nLFxyXG4gICAgICAgICAgICBlbmQ6ICc9JyxcclxuICAgICAgICAgICAgb25SYW5nZVNlbGVjdDogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gT3RoZXJcclxuICAgICAgICAgICAgaXNTZWxlY3Rpbmc6ICc9PycsXHJcblxyXG4gICAgICAgICAgICAvLyBDb2xsZWN0aW9uIG9mIGRhdGUgc3RyaW5ncyAoaWUuIFsnMjAxMi0xMi0wMScsJzIwMTItMTItMDInXVxyXG4gICAgICAgICAgICBoaWdobGlnaHRlZDogJz0/J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhbGVuZGFyVGVtcGxhdGUgPSAnZGF0ZS1waWNrZXIuaHRtbCc7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdO1xyXG5cclxuICAgICAgICAgICAgLy8gRml4ZXMgYSBidWcgd2hlcmUgVGV0aGVyIGNhbm5vdCBjb3JyZWN0bHkgZ2V0IHdpZHRoL2hlaWdodCBiZWNhdXNlIG9mIG5nQW5pbWF0ZVxyXG4gICAgICAgICAgICB2YXIgJGFuaW1hdGUgPSB0aGlzLiRpbmplY3Rvci5nZXQoJyRhbmltYXRlJyk7XHJcbiAgICAgICAgICAgIGlmICgkYW5pbWF0ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgJGFuaW1hdGUuZW5hYmxlZChmYWxzZSwgJGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRlbGVtZW50LmlzKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rSW5wdXQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCRlbGVtZW50LmlzKCdkYXRlLXBpY2tlcicpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rSW5saW5lKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtFbGVtZW50KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRheVNlbGVjdCgkc2NvcGUsICRlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yYW5nZVNlbGVjdCgkc2NvcGUsICRlbGVtZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rSW5wdXQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCkge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wb3BvdmVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3RybC5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4gY3RybC5kYXRlLCBkYXRlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IGRhdGUgPT0gbnVsbCA/ICcnIDogbW9tZW50KGRhdGUpLmZvcm1hdChcIkxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh0ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZXRWaWV3VmFsdWUgPSAoc3RhcnQsIGVuZCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydCAhPSBudWxsICYmIGVuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtU3RhcnQgPSBtb21lbnQoc3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbUVuZCA9IG1vbWVudChlbmQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1TdGFydC5pc1NhbWUoZW5kLCAnZGF5JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBtU3RhcnQuZm9ybWF0KFwiTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBgJHttU3RhcnQuZm9ybWF0KFwiTFwiKX0gLSAke21FbmQuZm9ybWF0KFwiTFwiKX1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gbW9tZW50KGVuZCkuZm9ybWF0KFwiTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBtb21lbnQoZW5kKS5mb3JtYXQoXCJMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh0ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4gY3RybC5zdGFydCwgc3RhcnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFZpZXdWYWx1ZShzdGFydCwgY3RybC5lbmQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiBjdHJsLmVuZCwgZW5kID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRWaWV3VmFsdWUoY3RybC5zdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgY2hhbmdlLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3RybC5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb01vbWVudChuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRlLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLmRhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0ZS5pc1NhbWUoY3RybC5kYXRlLCAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3RybC5kYXRlID0gZGF0ZS5mb3JtYXQoY3RybC5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0VG9SYW5nZShuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnN0YXJ0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5lbmQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1vbWVudChyYW5nZS5zdGFydCkuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnN0YXJ0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtb21lbnQocmFuZ2UuZW5kKS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuZW5kID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuc3RhcnQgPT0gbnVsbCB8fCBjdHJsLmVuZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbWVudChyYW5nZS5zdGFydCkuaXNTYW1lKGN0cmwuc3RhcnQsICdkYXknKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50KHJhbmdlLmVuZCkuaXNTYW1lKGN0cmwuZW5kLCAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnN0YXJ0ID0gcmFuZ2Uuc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuZW5kID0gcmFuZ2UuZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGtleWRvd24uJHskc2NvcGUuJGlkfWAsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjdHJsLmlzVmlzaWJsZSB8fCAhdGhpcy5pc0VzY2FwZShlKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua0VsZW1lbnQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpbmtJbmxpbmUoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCkge1xyXG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuY3JlYXRlQ29udGVudCgkc2NvcGUpO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoY29udGVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXREYXlzKHJhbmdlLCBjdHJsKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFydDogSURhdGVQaWNrZXJEYXkgPSBhbmd1bGFyLmVsZW1lbnQocmFuZ2Uuc3RhcnQudGFyZ2V0KS5zY29wZSgpWydkYXknXSxcclxuICAgICAgICAgICAgICAgIGVuZDogSURhdGVQaWNrZXJEYXkgPSBhbmd1bGFyLmVsZW1lbnQocmFuZ2UuZW5kLnRhcmdldCkuc2NvcGUoKVsnZGF5J107XHJcbiAgICAgICAgICAgIHZhciBkYXlzID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5nZXRSYW5nZURheXMoc3RhcnQsIGVuZCwgY3RybC53ZWVrcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcG9wb3Zlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB0ZXRoZXIsXHJcbiAgICAgICAgICAgICAgICAkYm9keTogYW55ID0gYW5ndWxhci5lbGVtZW50KCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcblxyXG4gICAgICAgICAgICB2YXIgZG9Ob3RSZW9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgY3RybFsnZGF0ZVNlbGVjdGVkJ10gPSAoZGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRvTm90UmVvcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICBkb05vdFJlb3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY3RybC5vbkRhdGVTZWxlY3QoeyBkYXRlOiBkYXRlIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY3RybFsncmFuZ2VTZWxlY3RlZCddID0gKHN0YXJ0LCBlbmQpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkb05vdFJlb3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgZG9Ob3RSZW9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGN0cmwub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgY2xpY2suJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgZm9jdXMuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkb05vdFJlb3BlbilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IHRoaXMuY3JlYXRlRHJvcERvd24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKTtcclxuICAgICAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZXRoZXIgPSBuZXcgVGV0aGVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiAkZWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QXR0YWNobWVudDogJ2JvdHRvbSBjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50OiAndG9wIGNlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzUHJlZml4OiAnZGF0ZXBpY2tlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE9mZnNldDogJzE0cHggMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0cmFpbnRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86ICd3aW5kb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b2dldGhlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGluOiBbJ3RvcCcsICdsZWZ0JywgJ2JvdHRvbScsICdyaWdodCddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB0ZXRoZXIucG9zaXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYmx1clRpbWVyO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgYmx1ci4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gQWxsb3cgYW55IGNsaWNrIG9uIHRoZSBtZW51IHRvIGNvbWUgdGhyb3VnaCBmaXJzdFxyXG4gICAgICAgICAgICAgICAgYmx1clRpbWVyID0gdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuaXNTZWxlY3RpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICRib2R5Lm9uKGBET01Nb3VzZVNjcm9sbC4keyRzY29wZS4kaWR9IG1vdXNld2hlZWwuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmICghY3RybC5pc1Zpc2libGUpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyBcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYW5ndWxhci5lbGVtZW50KHRoaXMuJHdpbmRvdykub24oYHJlc2l6ZS4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICAkYm9keS5vbihgY2xpY2suJHskc2NvcGUuJGlkfWAsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjdHJsLmlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZW50IHx8ICRlbGVtZW50LmlzKGUudGFyZ2V0KSB8fCBjb250ZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQuY2FuY2VsKGJsdXJUaW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQgJiYgY29udGVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkYm9keS5vZmYoYGNsaWNrLiR7JHNjb3BlLiRpZH0gRE9NTW91c2VTY3JvbGwuJHskc2NvcGUuJGlkfSBtb3VzZXdoZWVsLiR7JHNjb3BlLiRpZH1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudCkgY29udGVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVEcm9wRG93bigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgIHNpbmdsZURhdGVCaW5kaW5nID0gYGRhdGU9XCIke3RoaXMuY29udHJvbGxlckFzfS5kYXRlXCIgb24tZGF0ZS1zZWxlY3Q9XCIke3RoaXMuY29udHJvbGxlckFzfS5kYXRlU2VsZWN0ZWQoZGF0ZSlcImAsXHJcbiAgICAgICAgICAgICAgICByYW5nZUJpbmRpbmcgPSBgc3RhcnQ9XCIke3RoaXMuY29udHJvbGxlckFzfS5zdGFydFwiIGVuZD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmVuZFwiIG9uLXJhbmdlLXNlbGVjdD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LnJhbmdlU2VsZWN0ZWQoc3RhcnQsZW5kKVwiYCxcclxuICAgICAgICAgICAgICAgIGJpbmRpbmdzID0gY3RybC5pc1NpbmdsZURhdGUgPyBzaW5nbGVEYXRlQmluZGluZyA6IHJhbmdlQmluZGluZyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gYDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWRyb3Bkb3duXCIgbmctY2xhc3M9XCJ7J2RhdGVwaWNrZXItb3Blbic6JHt0aGlzLmNvbnRyb2xsZXJBc30uaXNWaXNpYmxlfVwiPjxkYXRlLXBpY2tlciBtaW4tdmlldz1cIiR7JGF0dHJzLm1pblZpZXd9XCIgaXMtc2VsZWN0aW5nPVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uaXNTZWxlY3RpbmdcIiAke2JpbmRpbmdzfVwiIGhpZ2hsaWdodGVkPVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uaGlnaGxpZ2h0ZWRcIj48L2RhdGUtcGlja2VyPjwvZGl2PmAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGUpLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSAkZWxlbWVudC5wb3NpdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gJGVsZW1lbnQub3V0ZXJIZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgIG1hcmdpbiA9ICgkZWxlbWVudC5vdXRlckhlaWdodCh0cnVlKSAtIGhlaWdodCksXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBtYXJnaW4gLyAyICsgaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29udGVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdG9wOiBwb3NpdGlvbi50b3AgKyBvZmZzZXQsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBwb3NpdGlvbi5sZWZ0XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZShjb250ZW50KSgkc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNFc2NhcGUoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS53aGljaCA9PT0gMjc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVDb250ZW50KCRzY29wZSkge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLiR0ZW1wbGF0ZUNhY2hlLmdldCh0aGlzLmNhbGVuZGFyVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICB2YXIgY29udGVudCA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbXBpbGUoY29udGVudCkoJHNjb3BlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXlTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdLFxyXG4gICAgICAgICAgICAgICAgZGF5Q3NzID0gJy5kYXRlUGlja2VyRGF5cy1kYXknLFxyXG4gICAgICAgICAgICAgICAgJGJvZHk6IGFueSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgbW91c2VEb3duID0gYG1vdXNlZG93bi4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIG1vdXNlVXAgPSBgbW91c2V1cC4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgICAgIHZhciBvblNlbGVjdGVkID0gcmFuZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRheXMgPSB0aGlzLmdldERheXMocmFuZ2UsIGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZChkYXlzKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKG1vdXNlRG93biwgZGF5Q3NzLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IHsgc3RhcnQ6IGUsIGVuZDogZSB9O1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1NlbGVjdGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJvZHkub24obW91c2VVcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5Lm9mZihtb3VzZVVwKTtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmlzU2VsZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RlZChyYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYW5nZVNlbGVjdCgkc2NvcGUsICRlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICAkYm9keTogYW55ID0gYW5ndWxhci5lbGVtZW50KCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICBtb3VzZURvd24gPSBgbW91c2Vkb3duLiR7JHNjb3BlLiRpZH1gLFxyXG4gICAgICAgICAgICAgICAgbW91c2VPdmVyID0gYG1vdXNlb3Zlci4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIG1vdXNlVXAgPSBgbW91c2V1cC4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIGRheUNzcyA9ICcuZGF0ZVBpY2tlckRheXMtZGF5JztcclxuXHJcbiAgICAgICAgICAgIHZhciBvblNlbGVjdGluZyA9IHJhbmdlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXlzID0gdGhpcy5nZXREYXlzKHJhbmdlLCBjdHJsKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0aW5nKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG9uU2VsZWN0ZWQgPSByYW5nZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF5cyA9IHRoaXMuZ2V0RGF5cyhyYW5nZSwgY3RybCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VEb3duLCBkYXlDc3MsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0geyBzdGFydDogZSwgZW5kOiBlIH07XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzU2VsZWN0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vbihtb3VzZU92ZXIsIGRheUNzcywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UuZW5kID0gZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGluZyhyYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYm9keS5vbihtb3VzZVVwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKG1vdXNlT3Zlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkub2ZmKG1vdXNlVXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuZGlyZWN0aXZlKCdkYXRlUGlja2VyJywgRGF0ZVBpY2tlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlclJhbmdlXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyUmFuZ2Uge1xyXG4gICAgICAgIHN0YXJ0OiBzdHJpbmc7XHJcbiAgICAgICAgZW5kOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlclJhbmdlIGltcGxlbWVudHMgSURhdGVQaWNrZXJSYW5nZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RhcnQ6IGFueSwgZW5kOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIG1TdGFydCA9IG1vbWVudChzdGFydCk7XHJcbiAgICAgICAgICAgIHZhciBtRW5kID0gbW9tZW50KGVuZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobUVuZC5pc0JlZm9yZShtU3RhcnQpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IG1TdGFydDtcclxuICAgICAgICAgICAgICAgIG1TdGFydCA9IG1FbmQ7XHJcbiAgICAgICAgICAgICAgICBtRW5kID0gdGVtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1TdGFydC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBtRW5kLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnQ6IHN0cmluZztcclxuICAgICAgICBlbmQ6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvLyBEYXRlUGlja2VyTW9udGhcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJNb250aCB7XHJcbiAgICAgICAgdmFsdWU6IG51bWJlcjtcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaXNDdXJyZW50TW9udGg6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlck1vbnRoIGltcGxlbWVudHMgSURhdGVQaWNrZXJNb250aCB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIG0gPSBtb21lbnQoKTtcclxuICAgICAgICAgICAgdmFyIHRoaXNNb250aCA9IG0ubW9udGgoKTtcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gbS5tb250aCh2YWx1ZSkuZm9ybWF0KCdNTU0nKTtcclxuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRNb250aCA9IHZhbHVlID09PSB0aGlzTW9udGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaXNDdXJyZW50TW9udGg6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlck1vbnRoXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyWWVhciB7XHJcbiAgICAgICAgdmFsdWU6IG51bWJlcjtcclxuICAgICAgICBpc0N1cnJlbnRZZWFyOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJZZWFyIGltcGxlbWVudHMgSURhdGVQaWNrZXJZZWFyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmlzQ3VycmVudFllYXIgPSB2YWx1ZSA9PT0gbW9tZW50KCkueWVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNDdXJyZW50WWVhcjogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJRGF0ZVBpY2tlckRheVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlckRheSB7XHJcbiAgICAgICAgZGF0ZTogbnVtYmVyO1xyXG4gICAgICAgIHZhbHVlOiBhbnk7XHJcbiAgICAgICAgaXNUb2RheTogYm9vbGVhbjtcclxuICAgICAgICBpc05vdEluTW9udGg6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgaXNCZWZvcmUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTYW1lKGRheTogSURhdGVQaWNrZXJEYXkpOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJEYXkgaW1wbGVtZW50cyBJRGF0ZVBpY2tlckRheSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoZnJvbURhdGU6IGFueSwgZGF5T2ZXZWVrOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG1vbWVudChkYXlPZldlZWspO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLnZhbHVlLmRhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5pc1RvZGF5ID0gZGF5T2ZXZWVrLmlzU2FtZShtb21lbnQoKSwgJ2RheScpO1xyXG4gICAgICAgICAgICB0aGlzLmlzTm90SW5Nb250aCA9ICF0aGlzLnZhbHVlLmlzU2FtZShmcm9tRGF0ZSwgJ21vbnRoJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRlOiBudW1iZXI7XHJcbiAgICAgICAgdmFsdWU6IGFueTtcclxuICAgICAgICBpc1RvZGF5OiBib29sZWFuO1xyXG4gICAgICAgIGlzTm90SW5Nb250aDogYm9vbGVhbjtcclxuICAgICAgICBpc1NlbGVjdGluZzogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgaXNCZWZvcmUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgaXNCZWZvcmUgPSB0aGlzLnZhbHVlLmlzQmVmb3JlKGRheS52YWx1ZSwgJ2RheScpO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNCZWZvcmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1NhbWUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgaXNTYW1lID0gdGhpcy52YWx1ZS5pc1NhbWUoZGF5LnZhbHVlLCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpc1NhbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIERhdGVQaWNrZXJTZXJ2aWNlXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgZ2V0TW9udGhzKCk6IElEYXRlUGlja2VyTW9udGhbXTtcclxuICAgICAgICBnZXREYXlzT2ZXZWVrKCk6IHN0cmluZ1tdO1xyXG4gICAgICAgIGdldFllYXJzKGZyb21EYXRlKTogSURhdGVQaWNrZXJZZWFyW107XHJcbiAgICAgICAgZ2V0V2Vlayhmcm9tRGF0ZSwgc3RhcnRPZldlZWspOiBJRGF0ZVBpY2tlckRheVtdO1xyXG4gICAgICAgIGdldFJhbmdlRGF5cyhzdGFydDogSURhdGVQaWNrZXJEYXksIGVuZDogSURhdGVQaWNrZXJEYXksIHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pOiBJRGF0ZVBpY2tlckRheVtdO1xyXG4gICAgICAgIGRlc2VsZWN0QWxsKHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pO1xyXG4gICAgICAgIHNlbGVjdERheXMoZGF5czogSURhdGVQaWNrZXJEYXlbXSk7XHJcbiAgICAgICAgaW5wdXRUb01vbWVudCh2YWx1ZTogc3RyaW5nKTogYW55O1xyXG4gICAgICAgIGlucHV0VG9SYW5nZSh2YWx1ZTogc3RyaW5nKTogSURhdGVQaWNrZXJSYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyU2VydmljZSBpbXBsZW1lbnRzIElEYXRlUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgZ2V0TW9udGhzKCk6IElEYXRlUGlja2VyTW9udGhbXSB7XHJcbiAgICAgICAgICAgIHZhciBtb250aHMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJNb250aD4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbW9udGhzLnB1c2gobmV3IERhdGVQaWNrZXJNb250aChpKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtb250aHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRZZWFycyhmcm9tRGF0ZSk6IElEYXRlUGlja2VyWWVhcltdIHtcclxuICAgICAgICAgICAgdmFyIGZyb21ZZWFyID0gbW9tZW50KGZyb21EYXRlKS55ZWFyKCksXHJcbiAgICAgICAgICAgICAgICB5ZWFycyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlclllYXI+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZnJvbVllYXI7IGkgPD0gKGZyb21ZZWFyICsgOCk7IGkrKylcclxuICAgICAgICAgICAgICAgIHllYXJzLnB1c2gobmV3IERhdGVQaWNrZXJZZWFyKGkpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB5ZWFycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFdlZWsoZnJvbURhdGUsIHN0YXJ0T2ZXZWVrKTogSURhdGVQaWNrZXJEYXlbXSB7XHJcbiAgICAgICAgICAgIHZhciBlbmRPZldlZWsgPSBtb21lbnQoc3RhcnRPZldlZWspLmVuZE9mKCd3ZWVrJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF5cyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlckRheT4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF5T2ZXZWVrID0gbW9tZW50KHN0YXJ0T2ZXZWVrKTsgZGF5T2ZXZWVrLmlzQmVmb3JlKGVuZE9mV2Vlayk7IGRheU9mV2Vlay5hZGQoMSwgJ2RheXMnKSkge1xyXG4gICAgICAgICAgICAgICAgZGF5cy5wdXNoKG5ldyBEYXRlUGlja2VyRGF5KGZyb21EYXRlLCBkYXlPZldlZWspKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXREYXlzT2ZXZWVrKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudC53ZWVrZGF5c1Nob3J0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRSYW5nZURheXMoc3RhcnQ6IElEYXRlUGlja2VyRGF5LCBlbmQ6IElEYXRlUGlja2VyRGF5LCB3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKTogSURhdGVQaWNrZXJEYXlbXSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZW5kLmlzQmVmb3JlKHN0YXJ0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBzdGFydDtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgICAgICAgICAgICAgZW5kID0gdGVtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGFsbERheXMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJEYXk+KCksXHJcbiAgICAgICAgICAgICAgICBpc0FkZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgd2Vla3MuZm9yRWFjaCh3ZWVrID0+IHtcclxuICAgICAgICAgICAgICAgIHdlZWsuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXkuaXNTYW1lKHN0YXJ0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBZGRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNBZGRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsRGF5cy5wdXNoKGRheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5LmlzU2FtZShlbmQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FkZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFsbERheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXNlbGVjdEFsbCh3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKSB7XHJcbiAgICAgICAgICAgIHdlZWtzLmZvckVhY2god2VlayA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZWVrLmZvckVhY2goZGF5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXkuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdERheXMoZGF5czogSURhdGVQaWNrZXJEYXlbXSkge1xyXG4gICAgICAgICAgICBkYXlzLmZvckVhY2goZGF5ID0+IGRheS5pc1NlbGVjdGluZyA9IHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXRUb01vbWVudCh2YWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIGxhbmcgPSBtb21lbnQubG9jYWxlRGF0YSgpO1xyXG4gICAgICAgICAgICB2YXIgZm9ybWF0cyA9IFtcclxuICAgICAgICAgICAgICAgIGxhbmcubG9uZ0RhdGVGb3JtYXQoXCJsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gIC9nLCAnICcpLFxyXG4gICAgICAgICAgICAgICAgbGFuZy5sb25nRGF0ZUZvcm1hdChcIkxcIilcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvLS9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyAgL2csICcgJylcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gbW9tZW50KHZhbHVlLCBmb3JtYXRzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnB1dFRvUmFuZ2UodmFsdWU6IHN0cmluZyk6IElEYXRlUGlja2VyUmFuZ2Uge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAhdmFsdWUudHJpbSgpLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB2YXIgdHJpbW1lZCA9IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvLS9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcgJylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gIC9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAudHJpbSgpO1xyXG4gICAgICAgICAgICB2YXIgZXhwU3RhcnQgPSBuZXcgUmVnRXhwKFwiXigoWzAtOV17MSw0fVsgXSopezN9KVwiKTtcclxuICAgICAgICAgICAgdmFyIGV4cEVuZCA9IG5ldyBSZWdFeHAoXCIoKFswLTldezEsNH1bIF0qKXszfSkkXCIpO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRSZXN1bHQgPSBleHBTdGFydC5leGVjKHRyaW1tZWQpO1xyXG4gICAgICAgICAgICB2YXIgZW5kUmVzdWx0ID0gZXhwRW5kLmV4ZWModHJpbW1lZCk7XHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuaW5wdXRUb01vbWVudChzdGFydFJlc3VsdFswXS50cmltKCkpO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gdGhpcy5pbnB1dFRvTW9tZW50KChlbmRSZXN1bHRbMF0gfHwgc3RhcnRSZXN1bHRbMF0pLnRyaW0oKSk7XHJcbiAgICAgICAgICAgIHZhciByYW5nZSA9IG5ldyBEYXRlUGlja2VyUmFuZ2Uoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuc2VydmljZSgnZGF0ZVBpY2tlclNlcnZpY2UnLCBEYXRlUGlja2VyU2VydmljZSk7XHJcbn0iLCJcclxubW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFRpbWVQaWNrZXJDb250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsndGltZVBpY2tlclNlcnZpY2UnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSB0aW1lUGlja2VyU2VydmljZTogSVRpbWVQaWNrZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Jbml0KCRzY29wZSwgJGVsZW1lbnQsIG5nTW9kZWxDdHJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG4gICAgICAgICAgICB0aGlzLm5nTW9kZWxDdHJsID0gbmdNb2RlbEN0cmw7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgYmx1ci4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIG0gPSB0aGlzLnRpbWVQaWNrZXJTZXJ2aWNlLnBhcnNlKG5nTW9kZWxDdHJsLiRtb2RlbFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IG0uaXNWYWxpZCgpID8gbS5mb3JtYXQoXCJISDptbTpzc1wiKSA6IG51bGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoYGJsdXIuJHskc2NvcGUuJGlkfWApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy5fdGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF90aW1lOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGdldCB0aW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHRpbWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0VmFsdWUodmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHZpZXdWYWx1ZSA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UuZm9ybWF0KHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5uZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHZpZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMubmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmdNb2RlbEN0cmw7XHJcbiAgICAgICAgJHNjb3BlO1xyXG4gICAgICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRpbWVQaWNrZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnbmdNb2RlbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFRpbWVQaWNrZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd0aW1lcGlja2VyJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGltZTogJz0nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBUaW1lUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcbiAgICAgICAgICAgIGN0cmwub25Jbml0KCRzY29wZSwgJGVsZW1lbnQsIG5nTW9kZWxDdHJsKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5kaXJlY3RpdmUoJ3RpbWVQaWNrZXInLCBUaW1lUGlja2VyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUaW1lUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgcGFyc2UodGV4dDogc3RyaW5nKTogYW55O1xyXG4gICAgICAgIGZvcm1hdCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGltZVBpY2tlclNlcnZpY2UgaW1wbGVtZW50cyBJVGltZVBpY2tlclNlcnZpY2Uge1xyXG4gICAgICAgIHBhcnNlKHRleHQ6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgICAgIHZhciBwYXR0ZXJucyA9IFtcclxuICAgICAgICAgICAgICAgICdMVCcsXHJcbiAgICAgICAgICAgICAgICAnTFRTJyxcclxuICAgICAgICAgICAgICAgICdISDptbTpzcycsXHJcbiAgICAgICAgICAgICAgICAnSEg6bW0gQSdcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudCh0ZXh0LCBwYXR0ZXJucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3JtYXQodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIG0gPSB0aGlzLnBhcnNlKHRleHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbS5pc1ZhbGlkKCkgPyBtLmZvcm1hdCgnTFQnKSA6ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5zZXJ2aWNlKCd0aW1lUGlja2VyU2VydmljZScsIFRpbWVQaWNrZXJTZXJ2aWNlKTtcclxufSJdfQ==