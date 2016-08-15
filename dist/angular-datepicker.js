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
            this.dateInternal = this.isSingleDate ? (this.date || this.defaultDate) : this.start;
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
                var m = ((value || "").length > 0) ? moment(value) : moment();
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
                defaultDate: '@?',
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
            var ctrl = $scope[this.controllerAs], singleDateBinding = "date=\"" + this.controllerAs + ".date\" on-date-select=\"" + this.controllerAs + ".dateSelected(date)\"", rangeBinding = "start=\"" + this.controllerAs + ".start\" end=\"" + this.controllerAs + ".end\" on-range-select=\"" + this.controllerAs + ".rangeSelected(start,end)\"", bindings = ctrl.isSingleDate ? singleDateBinding : rangeBinding, template = "<div class=\"datepicker-dropdown\" ng-class=\"{'datepicker-open':" + this.controllerAs + ".isVisible}\"><date-picker min-view=\"" + $attrs.minView + "\" is-selecting=\"" + this.controllerAs + ".isSelecting\" " + bindings + "\" highlighted=\"" + this.controllerAs + ".highlighted\" default-date=\"{{" + this.controllerAs + ".defaultDate}}\"></date-picker></div>", content = angular.element(template), position = $element.position(), height = $element.outerHeight(), margin = ($element.outerHeight(true) - height), offset = margin / 2 + height;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kYXRlcGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyIsIi4uL3NyYy9kYXRlLXBpY2tlci50cyIsIi4uL3NyYy9kYXRlLXBpY2tlci1zZXJ2aWNlLnRzIiwiLi4vc3JjL3RpbWUtcGlja2VyLnRzIiwiLi4vc3JjL3RpbWUtcGlja2VyLXNlcnZpY2UudHMiXSwibmFtZXMiOlsiRGF0ZVBpY2tlck1vZHVsZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclZpZXciLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuZGF0ZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc3RhcnQiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLmVuZCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuZGF0ZUludGVybmFsIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci50aXRsZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIudmlld1R5cGUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNob3dEYXlzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zaG93TW9udGhzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zaG93WWVhcnMiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLmNhbGN1bGF0ZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuaXNTZWxlY3RlZCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuaXNIaWdobGlnaHRlZCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2VsZWN0aW5nIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZWxlY3RlZCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2VsZWN0ZWREYXRlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZWxlY3RlZFJhbmdlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZWxlY3RNb250aCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuaXNNb250aCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2V0TW9udGgiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLmlzWWVhciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2VsZWN0WWVhciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2V0WWVhciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIucHJldk1vbnRoIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5uZXh0TW9udGgiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnByZXZZZWFyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5uZXh0WWVhciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIucHJldlJhbmdlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5uZXh0UmFuZ2UiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUubGlua0lucHV0IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmxpbmtFbGVtZW50IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmxpbmtJbmxpbmUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUuZ2V0RGF5cyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5wb3BvdmVyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmNyZWF0ZURyb3BEb3duIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLnByZXZlbnREZWZhdWx0IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmlzRXNjYXBlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmNyZWF0ZUNvbnRlbnQiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUuZGF5U2VsZWN0IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLnJhbmdlU2VsZWN0IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyUmFuZ2UiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJSYW5nZS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlck1vbnRoIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyTW9udGguY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJZZWFyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyWWVhci5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRheSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRheS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRheS5pc0JlZm9yZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRheS5pc1NhbWUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJTZXJ2aWNlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZ2V0TW9udGhzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5nZXRZZWFycyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZ2V0V2VlayIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZ2V0RGF5c09mV2VlayIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZ2V0UmFuZ2VEYXlzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5kZXNlbGVjdEFsbCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2Uuc2VsZWN0RGF5cyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb01vbWVudCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb1JhbmdlIiwiRGF0ZVBpY2tlck1vZHVsZS5UaW1lUGlja2VyQ29udHJvbGxlciIsIkRhdGVQaWNrZXJNb2R1bGUuVGltZVBpY2tlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJDb250cm9sbGVyLm9uSW5pdCIsIkRhdGVQaWNrZXJNb2R1bGUuVGltZVBpY2tlckNvbnRyb2xsZXIudGltZSIsIkRhdGVQaWNrZXJNb2R1bGUuVGltZVBpY2tlckNvbnRyb2xsZXIuc2V0VmFsdWUiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJEaXJlY3RpdmUiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJTZXJ2aWNlIiwiRGF0ZVBpY2tlck1vZHVsZS5UaW1lUGlja2VyU2VydmljZS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuVGltZVBpY2tlclNlcnZpY2UucGFyc2UiLCJEYXRlUGlja2VyTW9kdWxlLlRpbWVQaWNrZXJTZXJ2aWNlLmZvcm1hdCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7QUNDbkMsSUFBTyxnQkFBZ0IsQ0F3cEJ0QjtBQXhwQkQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBR3JCQSxJQUFLQSxjQUlKQTtJQUpEQSxXQUFLQSxjQUFjQTtRQUNmQyxtREFBUUEsQ0FBQUE7UUFDUkEsdURBQVVBLENBQUFBO1FBQ1ZBLHFEQUFTQSxDQUFBQTtJQUNiQSxDQUFDQSxFQUpJRCxjQUFjQSxLQUFkQSxjQUFjQSxRQUlsQkE7SUFFREE7UUFJSUUsOEJBQW9CQSxNQUFNQSxFQUFVQSxpQkFBcUNBO1lBQXJEQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFBQTtZQUFVQSxzQkFBaUJBLEdBQWpCQSxpQkFBaUJBLENBQW9CQTtZQXlFekVBLGNBQVNBLEdBQUdBLFlBQVlBLENBQUNBO1lBeEVyQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsaUJBQWlCQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtZQUNoREEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsaUJBQWlCQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtZQUVwREEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3JCQSxLQUFLQSxPQUFPQTtvQkFDUkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsY0FBY0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7b0JBQ2pDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxjQUFj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QXdFdEI7QUN6RUQsSUFBTyxnQkFBZ0IsQ0F5QnRCO0FBekJELFdBQU8sZ0JBQWdCLEVBQUMsQ0FBQztJQU9yQkE7UUFBQXlFO1FBZUFDLENBQUNBO1FBZEdELGlDQUFLQSxHQUFMQSxVQUFNQSxJQUFZQTtZQUNkRSxJQUFJQSxRQUFRQSxHQUFHQTtnQkFDWEEsSUFBSUE7Z0JBQ0pBLEtBQUtBO2dCQUNMQSxVQUFVQTtnQkFDVkEsU0FBU0E7YUFDWkEsQ0FBQ0E7WUFDRkEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDbENBLENBQUNBO1FBRURGLGtDQUFNQSxHQUFOQSxVQUFPQSxJQUFZQTtZQUNmRyxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUN6QkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDN0NBLENBQUNBO1FBQ0xILHdCQUFDQTtJQUFEQSxDQUFDQSxBQWZEekUsSUFlQ0E7SUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsbUJBQW1CQSxFQUFFQSxpQkFBaUJBLENBQUNBLENBQUNBO0FBQ25GQSxDQUFDQSxFQXpCTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBeUJ0QiIsInNvdXJjZXNDb250ZW50IjpbIkFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIsIFtdKTsiLCJcclxubW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG4gICAgZGVjbGFyZSB2YXIgVGV0aGVyOiBhbnk7XHJcblxyXG4gICAgZW51bSBEYXRlUGlja2VyVmlldyB7XHJcbiAgICAgICAgRGF5cyA9IDAsXHJcbiAgICAgICAgTW9udGhzID0gMSxcclxuICAgICAgICBZZWFycyA9IDJcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyQ29udHJvbGxlciB7XHJcblxyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnLCAnZGF0ZVBpY2tlclNlcnZpY2UnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMsIHByaXZhdGUgZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vbnRoTmFtZXMgPSBkYXRlUGlja2VyU2VydmljZS5nZXRNb250aHMoKTtcclxuICAgICAgICAgICAgdGhpcy5kYXlzT2ZXZWVrID0gZGF0ZVBpY2tlclNlcnZpY2UuZ2V0RGF5c09mV2VlaygpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoICgkYXR0cnMubWluVmlldykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3LlllYXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3LlllYXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5Nb250aHM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WaWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3LkRheXM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNTaW5nbGVEYXRlID0gISgkYXR0cnMuc3RhcnQgIT0gbnVsbCB8fCAkYXR0cnMuZW5kICE9IG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuaXNTaW5nbGVEYXRlID8gKHRoaXMuZGF0ZXx8dGhpcy5kZWZhdWx0RGF0ZSkgOiB0aGlzLnN0YXJ0O1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSh0aGlzLmRhdGVJbnRlcm5hbCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2luZ2xlIERhdGVcclxuICAgICAgICBwcml2YXRlIF9kYXRlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGdldCBkYXRlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGRhdGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLl9kYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmFuZ2VcclxuICAgICAgICBwcml2YXRlIF9zdGFydDogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgc3RhcnQoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHN0YXJ0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuX3N0YXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfZW5kOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGdldCBlbmQoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBlbmQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmQgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uRGF0ZVNlbGVjdDtcclxuICAgICAgICBvblJhbmdlU2VsZWN0O1xyXG4gICAgICAgIGlzU2VsZWN0aW5nOiBib29sZWFuO1xyXG5cclxuICAgICAgICB2aWV3OiBEYXRlUGlja2VyVmlldztcclxuICAgICAgICBtaW5WaWV3OiBEYXRlUGlja2VyVmlldztcclxuICAgICAgICB3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdO1xyXG4gICAgICAgIHllYXJzOiBJRGF0ZVBpY2tlclllYXJbXTtcclxuICAgICAgICBtb250aE5hbWVzOiBJRGF0ZVBpY2tlck1vbnRoW107XHJcbiAgICAgICAgZGF5c09mV2Vlazogc3RyaW5nW107XHJcbiAgICAgICAgaXNWaXNpYmxlOiBib29sZWFuO1xyXG4gICAgICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgICAgIGlzb0Zvcm1hdCA9ICdZWVlZLU1NLUREJztcclxuICAgICAgICBpc1NpbmdsZURhdGU6IGJvb2xlYW47XHJcbiAgICAgICAgaGlnaGxpZ2h0ZWQ6IHN0cmluZ1tdO1xyXG4gICAgICAgIGRlZmF1bHREYXRlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2RhdGVJbnRlcm5hbDtcclxuXHJcbiAgICAgICAgZ2V0IGRhdGVJbnRlcm5hbCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVJbnRlcm5hbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBkYXRlSW50ZXJuYWwodmFsdWU6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgbSA9ICgodmFsdWV8fFwiXCIpLmxlbmd0aD4wKSA/IG1vbWVudCh2YWx1ZSkgOiBtb21lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0ZUludGVybmFsID0gbTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSh0aGlzLl9kYXRlSW50ZXJuYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHRpdGxlKCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuRGF5czpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsLmZvcm1hdCgnTU1NTSBZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3Lk1vbnRoczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsLmZvcm1hdCgnWVlZWScpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5ZZWFyczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlbGVjdCBhIHllYXInO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdmlld1R5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuTW9udGhzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm1vbnRoc1wiO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5ZZWFyczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ5ZWFyc1wiO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuRGF5czpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJkYXlzXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dEYXlzKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID4gRGF0ZVBpY2tlclZpZXcuRGF5cylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuRGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dNb250aHMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPiBEYXRlUGlja2VyVmlldy5Nb250aHMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3Lk1vbnRocztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dZZWFycygpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuWWVhcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWxjdWxhdGUoZnJvbURhdGUpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gbW9tZW50KGZyb21EYXRlKS5zdGFydE9mKCdtb250aCcpLnN0YXJ0T2YoJ3dlZWsnKSxcclxuICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudChmcm9tRGF0ZSkuZW5kT2YoJ21vbnRoJykuZW5kT2YoJ3dlZWsnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2Vla3MgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJEYXlbXT4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF5ID0gbW9tZW50KHN0YXJ0KTsgZGF5LmlzQmVmb3JlKGVuZCk7IGRheS5hZGQoMSwgJ3dlZWsnKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdlZWsgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFdlZWsoZnJvbURhdGUsIGRheSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlZWtzLnB1c2god2Vlayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMueWVhcnMgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFllYXJzKGZyb21EYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzU2VsZWN0ZWQoZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMuZGF0ZSkuaXNTYW1lKGRheS52YWx1ZSwgJ2RheScpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRheS52YWx1ZS5pc0JldHdlZW4odGhpcy5zdGFydCwgdGhpcy5lbmQsICdkYXknKSB8fFxyXG4gICAgICAgICAgICAgICAgZGF5LnZhbHVlLmlzU2FtZSh0aGlzLnN0YXJ0LCAnZGF5JykgfHxcclxuICAgICAgICAgICAgICAgIGRheS52YWx1ZS5pc1NhbWUodGhpcy5lbmQsICdkYXknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzSGlnaGxpZ2h0ZWQoZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oaWdobGlnaHRlZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmhpZ2hsaWdodGVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmhpZ2hsaWdodGVkW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCh2YWx1ZSkuaXNTYW1lKGRheS52YWx1ZSwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGluZyhkYXlzOiBJRGF0ZVBpY2tlckRheVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZGVzZWxlY3RBbGwodGhpcy53ZWVrcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2Uuc2VsZWN0RGF5cyhkYXlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkKGRheXM6IElEYXRlUGlja2VyRGF5W10pIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5kZXNlbGVjdEFsbCh0aGlzLndlZWtzKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGRheXNbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGVuZCA9IGRheXNbZGF5cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWREYXRlKGRheTogSURhdGVQaWNrZXJEYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlID0gbW9tZW50KGRheS52YWx1ZSkuZm9ybWF0KHRoaXMuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgdGhpcy5vbkRhdGVTZWxlY3QoeyBkYXRlOiB0aGlzLmRhdGUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZFJhbmdlKHN0YXJ0OiBJRGF0ZVBpY2tlckRheSwgZW5kOiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHN0YXJ0LnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG1vbWVudChlbmQudmFsdWUpLmZvcm1hdCh0aGlzLmlzb0Zvcm1hdCk7XHJcbiAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiB0aGlzLnN0YXJ0LCBlbmQ6IHRoaXMuZW5kIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0TW9udGgoaWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IHRoaXMubW9udGhOYW1lc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vbnRoKG1vbnRoLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA9PT0gRGF0ZVBpY2tlclZpZXcuTW9udGhzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLmRhdGVJbnRlcm5hbC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IHRoaXMuZGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLmRhdGVJbnRlcm5hbCkuZW5kT2YoJ21vbnRoJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmQgPSBtb21lbnQodGhpcy5kYXRlSW50ZXJuYWwpLmVuZE9mKCdtb250aCcpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiB0aGlzLnN0YXJ0LCBlbmQ6IHRoaXMuZW5kIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93RGF5cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNNb250aChtb250aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlSW50ZXJuYWwubW9udGgoKSA9PSBtb250aC52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldE1vbnRoKG1vbnRoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuc2V0KCdtb250aCcsIG1vbnRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzWWVhcih5ZWFyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVJbnRlcm5hbC55ZWFyKCkgPT0geWVhci52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFllYXIoaWR4KSB7XHJcbiAgICAgICAgICAgIHZhciB5ZWFyID0gdGhpcy55ZWFyc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldFllYXIoeWVhci52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPT09IERhdGVQaWNrZXJWaWV3LlllYXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLmRhdGVJbnRlcm5hbC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IHRoaXMuZGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLmRhdGVJbnRlcm5hbCkuc3RhcnRPZigneWVhcicpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kID0gbW9tZW50KHRoaXMuZGF0ZUludGVybmFsKS5lbmRPZigneWVhcicpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiB0aGlzLnN0YXJ0LCBlbmQ6IHRoaXMuZW5kIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93TW9udGhzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRZZWFyKHllYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5zZXQoJ3llYXInLCB5ZWFyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZNb250aCgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5zdWJ0cmFjdCgxLCAnbW9udGhzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0TW9udGgoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuYWRkKDEsICdtb250aHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZZZWFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnN1YnRyYWN0KDEsICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV4dFllYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuYWRkKDEsICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldlJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnN1YnRyYWN0KDksICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV4dFJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLmFkZCg5LCAneWVhcnMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRpbmplY3RvcicsICckY29tcGlsZScsICckdGVtcGxhdGVDYWNoZScsICckdGltZW91dCcsICckd2luZG93JywgJ2RhdGVQaWNrZXJTZXJ2aWNlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGluamVjdG9yLCBwcml2YXRlICRjb21waWxlLCBwcml2YXRlICR0ZW1wbGF0ZUNhY2hlLCBwcml2YXRlICR0aW1lb3V0LCBwcml2YXRlICR3aW5kb3csIHByaXZhdGUgZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZSkgeyB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0FFJztcclxuICAgICAgICByZXF1aXJlID0gJz9uZ01vZGVsJztcclxuICAgICAgICBjb250cm9sbGVyID0gRGF0ZVBpY2tlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ2RhdGVwaWNrZXInO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICAvLyBTaW5nbGUgRGF0ZVxyXG4gICAgICAgICAgICBkYXRlOiAnPScsXHJcbiAgICAgICAgICAgIG9uRGF0ZVNlbGVjdDogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gUmFuZ2VcclxuICAgICAgICAgICAgc3RhcnQ6ICc9JyxcclxuICAgICAgICAgICAgZW5kOiAnPScsXHJcbiAgICAgICAgICAgIG9uUmFuZ2VTZWxlY3Q6ICcmJyxcclxuXHJcbiAgICAgICAgICAgIC8vIE90aGVyXHJcbiAgICAgICAgICAgIGlzU2VsZWN0aW5nOiAnPT8nLFxyXG4gICAgICAgICAgICBkZWZhdWx0RGF0ZTogJ0A/JyxcclxuXHJcbiAgICAgICAgICAgIC8vIENvbGxlY3Rpb24gb2YgZGF0ZSBzdHJpbmdzIChpZS4gWycyMDEyLTEyLTAxJywnMjAxMi0xMi0wMiddXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodGVkOiAnPT8nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FsZW5kYXJUZW1wbGF0ZSA9ICdkYXRlLXBpY2tlci5odG1sJztcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcblxyXG4gICAgICAgICAgICAvLyBGaXhlcyBhIGJ1ZyB3aGVyZSBUZXRoZXIgY2Fubm90IGNvcnJlY3RseSBnZXQgd2lkdGgvaGVpZ2h0IGJlY2F1c2Ugb2YgbmdBbmltYXRlXHJcbiAgICAgICAgICAgIHZhciAkYW5pbWF0ZSA9IHRoaXMuJGluamVjdG9yLmdldCgnJGFuaW1hdGUnKTtcclxuICAgICAgICAgICAgaWYgKCRhbmltYXRlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAkYW5pbWF0ZS5lbmFibGVkKGZhbHNlLCAkZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGVsZW1lbnQuaXMoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtJbnB1dCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoJGVsZW1lbnQuaXMoJ2RhdGUtcGlja2VyJykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtJbmxpbmUoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua0VsZW1lbnQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3RybC5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF5U2VsZWN0KCRzY29wZSwgJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJhbmdlU2VsZWN0KCRzY29wZSwgJGVsZW1lbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmtJbnB1dCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKSB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdHJsLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiBjdHJsLmRhdGUsIGRhdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gZGF0ZSA9PSBudWxsID8gJycgOiBtb21lbnQoZGF0ZSkuZm9ybWF0KFwiTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNldFZpZXdWYWx1ZSA9IChzdGFydCwgZW5kKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0ICE9IG51bGwgJiYgZW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1TdGFydCA9IG1vbWVudChzdGFydCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtRW5kID0gbW9tZW50KGVuZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobVN0YXJ0LmlzU2FtZShlbmQsICdkYXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IG1TdGFydC5mb3JtYXQoXCJMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGAke21TdGFydC5mb3JtYXQoXCJMXCIpfSAtICR7bUVuZC5mb3JtYXQoXCJMXCIpfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBtb21lbnQoZW5kKS5mb3JtYXQoXCJMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IG1vbWVudChlbmQpLmZvcm1hdChcIkxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiBjdHJsLnN0YXJ0LCBzdGFydCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0Vmlld1ZhbHVlKHN0YXJ0LCBjdHJsLmVuZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IGN0cmwuZW5kLCBlbmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFZpZXdWYWx1ZShjdHJsLnN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBjaGFuZ2UuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjdHJsLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5pbnB1dFRvTW9tZW50KG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGUuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuZGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRlLmlzU2FtZShjdHJsLmRhdGUsICdkYXknKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmRhdGUgPSBkYXRlLmZvcm1hdChjdHJsLmlzb0Zvcm1hdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb1JhbmdlKG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYW5nZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc3RhcnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLmVuZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbW9tZW50KHJhbmdlLnN0YXJ0KS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc3RhcnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1vbWVudChyYW5nZS5lbmQpLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5lbmQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5zdGFydCA9PSBudWxsIHx8IGN0cmwuZW5kID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9tZW50KHJhbmdlLnN0YXJ0KS5pc1NhbWUoY3RybC5zdGFydCwgJ2RheScpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnQocmFuZ2UuZW5kKS5pc1NhbWUoY3RybC5lbmQsICdkYXknKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc3RhcnQgPSByYW5nZS5zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5lbmQgPSByYW5nZS5lbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihga2V5ZG93bi4keyRzY29wZS4kaWR9YCwgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWN0cmwuaXNWaXNpYmxlIHx8ICF0aGlzLmlzRXNjYXBlKGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rRWxlbWVudCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua0lubGluZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5jcmVhdGVDb250ZW50KCRzY29wZSk7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldERheXMocmFuZ2UsIGN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0OiBJRGF0ZVBpY2tlckRheSA9IGFuZ3VsYXIuZWxlbWVudChyYW5nZS5zdGFydC50YXJnZXQpLnNjb3BlKClbJ2RheSddLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBJRGF0ZVBpY2tlckRheSA9IGFuZ3VsYXIuZWxlbWVudChyYW5nZS5lbmQudGFyZ2V0KS5zY29wZSgpWydkYXknXTtcclxuICAgICAgICAgICAgdmFyIGRheXMgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFJhbmdlRGF5cyhzdGFydCwgZW5kLCBjdHJsLndlZWtzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3BvdmVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xyXG4gICAgICAgICAgICB2YXIgY29udGVudCxcclxuICAgICAgICAgICAgICAgIHRldGhlcixcclxuICAgICAgICAgICAgICAgICRib2R5OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkb05vdFJlb3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjdHJsWydkYXRlU2VsZWN0ZWQnXSA9IChkYXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZG9Ob3RSZW9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIGRvTm90UmVvcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjdHJsLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IGRhdGUgfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjdHJsWydyYW5nZVNlbGVjdGVkJ10gPSAoc3RhcnQsIGVuZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRvTm90UmVvcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICBkb05vdFJlb3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY3RybC5vblJhbmdlU2VsZWN0KHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBjbGljay4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBmb2N1cy4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvTm90UmVvcGVuKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5jcmVhdGVEcm9wRG93bigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5LmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRldGhlciA9IG5ldyBUZXRoZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICRlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBdHRhY2htZW50OiAnYm90dG9tIGNlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b3AgY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NQcmVmaXg6ICdkYXRlcGlja2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0T2Zmc2V0OiAnMTRweCAwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogJ3dpbmRvdycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudDogJ3RvZ2V0aGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaW46IFsndG9wJywgJ2xlZnQnLCAnYm90dG9tJywgJ3JpZ2h0J11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHRldGhlci5wb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBibHVyVGltZXI7XHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBibHVyLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBBbGxvdyBhbnkgY2xpY2sgb24gdGhlIG1lbnUgdG8gY29tZSB0aHJvdWdoIGZpcnN0XHJcbiAgICAgICAgICAgICAgICBibHVyVGltZXIgPSB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5pc1NlbGVjdGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgJGJvZHkub24oYERPTU1vdXNlU2Nyb2xsLiR7JHNjb3BlLiRpZH0gbW91c2V3aGVlbC4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYgKCFjdHJsLmlzVmlzaWJsZSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhbmd1bGFyLmVsZW1lbnQodGhpcy4kd2luZG93KS5vbihgcmVzaXplLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgICAgICRib2R5Lm9uKGBjbGljay4keyRzY29wZS4kaWR9YCwgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWN0cmwuaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRlbnQgfHwgJGVsZW1lbnQuaXMoZS50YXJnZXQpIHx8IGNvbnRlbnQuaGFzKGUudGFyZ2V0KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dC5jYW5jZWwoYmx1clRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudCAmJiBjb250ZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRib2R5Lm9mZihgY2xpY2suJHskc2NvcGUuJGlkfSBET01Nb3VzZVNjcm9sbC4keyRzY29wZS4kaWR9IG1vdXNld2hlZWwuJHskc2NvcGUuJGlkfWApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50KSBjb250ZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZURyb3BEb3duKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdLFxyXG4gICAgICAgICAgICAgICAgc2luZ2xlRGF0ZUJpbmRpbmcgPSBgZGF0ZT1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmRhdGVcIiBvbi1kYXRlLXNlbGVjdD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmRhdGVTZWxlY3RlZChkYXRlKVwiYCxcclxuICAgICAgICAgICAgICAgIHJhbmdlQmluZGluZyA9IGBzdGFydD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LnN0YXJ0XCIgZW5kPVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uZW5kXCIgb24tcmFuZ2Utc2VsZWN0PVwiJHt0aGlzLmNvbnRyb2xsZXJBc30ucmFuZ2VTZWxlY3RlZChzdGFydCxlbmQpXCJgLFxyXG4gICAgICAgICAgICAgICAgYmluZGluZ3MgPSBjdHJsLmlzU2luZ2xlRGF0ZSA/IHNpbmdsZURhdGVCaW5kaW5nIDogcmFuZ2VCaW5kaW5nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgPSBgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItZHJvcGRvd25cIiBuZy1jbGFzcz1cInsnZGF0ZXBpY2tlci1vcGVuJzoke3RoaXMuY29udHJvbGxlckFzfS5pc1Zpc2libGV9XCI+PGRhdGUtcGlja2VyIG1pbi12aWV3PVwiJHskYXR0cnMubWluVmlld31cIiBpcy1zZWxlY3Rpbmc9XCIke3RoaXMuY29udHJvbGxlckFzfS5pc1NlbGVjdGluZ1wiICR7YmluZGluZ3N9XCIgaGlnaGxpZ2h0ZWQ9XCIke3RoaXMuY29udHJvbGxlckFzfS5oaWdobGlnaHRlZFwiIGRlZmF1bHQtZGF0ZT1cInt7JHt0aGlzLmNvbnRyb2xsZXJBc30uZGVmYXVsdERhdGV9fVwiPjwvZGF0ZS1waWNrZXI+PC9kaXY+YCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGFueSA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZSksXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9ICRlbGVtZW50LnBvc2l0aW9uKCksXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSAkZWxlbWVudC5vdXRlckhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luID0gKCRlbGVtZW50Lm91dGVySGVpZ2h0KHRydWUpIC0gaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG9mZnNldCA9IG1hcmdpbiAvIDIgKyBoZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBjb250ZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IHBvc2l0aW9uLnRvcCArIG9mZnNldCxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IHBvc2l0aW9uLmxlZnRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRjb21waWxlKGNvbnRlbnQpKCRzY29wZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0VzY2FwZShlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSAyNztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbnRlbnQoJHNjb3BlKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMuJHRlbXBsYXRlQ2FjaGUuZ2V0KHRoaXMuY2FsZW5kYXJUZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZShjb250ZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRheVNlbGVjdCgkc2NvcGUsICRlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBkYXlDc3MgPSAnLmRhdGVQaWNrZXJEYXlzLWRheScsXHJcbiAgICAgICAgICAgICAgICAkYm9keTogYW55ID0gYW5ndWxhci5lbGVtZW50KCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICBtb3VzZURvd24gPSBgbW91c2Vkb3duLiR7JHNjb3BlLiRpZH1gLFxyXG4gICAgICAgICAgICAgICAgbW91c2VVcCA9IGBtb3VzZXVwLiR7JHNjb3BlLiRpZH1gO1xyXG5cclxuICAgICAgICAgICAgdmFyIG9uU2VsZWN0ZWQgPSByYW5nZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF5cyA9IHRoaXMuZ2V0RGF5cyhyYW5nZSwgY3RybCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VEb3duLCBkYXlDc3MsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0geyBzdGFydDogZSwgZW5kOiBlIH07XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzU2VsZWN0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYm9keS5vbihtb3VzZVVwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkub2ZmKG1vdXNlVXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhbmdlU2VsZWN0KCRzY29wZSwgJGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgICRib2R5OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIG1vdXNlRG93biA9IGBtb3VzZWRvd24uJHskc2NvcGUuJGlkfWAsXHJcbiAgICAgICAgICAgICAgICBtb3VzZU92ZXIgPSBgbW91c2VvdmVyLiR7JHNjb3BlLiRpZH1gLFxyXG4gICAgICAgICAgICAgICAgbW91c2VVcCA9IGBtb3VzZXVwLiR7JHNjb3BlLiRpZH1gLFxyXG4gICAgICAgICAgICAgICAgZGF5Q3NzID0gJy5kYXRlUGlja2VyRGF5cy1kYXknO1xyXG5cclxuICAgICAgICAgICAgdmFyIG9uU2VsZWN0aW5nID0gcmFuZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRheXMgPSB0aGlzLmdldERheXMocmFuZ2UsIGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5zZWxlY3RpbmcoZGF5cyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgb25TZWxlY3RlZCA9IHJhbmdlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXlzID0gdGhpcy5nZXREYXlzKHJhbmdlLCBjdHJsKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWQoZGF5cyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihtb3VzZURvd24sIGRheUNzcywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSB7IHN0YXJ0OiBlLCBlbmQ6IGUgfTtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNTZWxlY3RpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9uKG1vdXNlT3ZlciwgZGF5Q3NzLCBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByYW5nZS5lbmQgPSBlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0aW5nKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRib2R5Lm9uKG1vdXNlVXAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYobW91c2VPdmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAkYm9keS5vZmYobW91c2VVcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3RybC5pc1NlbGVjdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0ZWQocmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5kaXJlY3RpdmUoJ2RhdGVQaWNrZXInLCBEYXRlUGlja2VyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICAvLyBEYXRlUGlja2VyUmFuZ2VcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJSYW5nZSB7XHJcbiAgICAgICAgc3RhcnQ6IHN0cmluZztcclxuICAgICAgICBlbmQ6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyUmFuZ2UgaW1wbGVtZW50cyBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGFydDogYW55LCBlbmQ6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgbVN0YXJ0ID0gbW9tZW50KHN0YXJ0KTtcclxuICAgICAgICAgICAgdmFyIG1FbmQgPSBtb21lbnQoZW5kKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtRW5kLmlzQmVmb3JlKG1TdGFydCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gbVN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgbVN0YXJ0ID0gbUVuZDtcclxuICAgICAgICAgICAgICAgIG1FbmQgPSB0ZW1wO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbVN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG1FbmQuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGFydDogc3RyaW5nO1xyXG4gICAgICAgIGVuZDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERhdGVQaWNrZXJNb250aFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlck1vbnRoIHtcclxuICAgICAgICB2YWx1ZTogbnVtYmVyO1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBpc0N1cnJlbnRNb250aDogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyTW9udGggaW1wbGVtZW50cyBJRGF0ZVBpY2tlck1vbnRoIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgbSA9IG1vbWVudCgpO1xyXG4gICAgICAgICAgICB2YXIgdGhpc01vbnRoID0gbS5tb250aCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBtLm1vbnRoKHZhbHVlKS5mb3JtYXQoJ01NTScpO1xyXG4gICAgICAgICAgICB0aGlzLmlzQ3VycmVudE1vbnRoID0gdmFsdWUgPT09IHRoaXNNb250aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBpc0N1cnJlbnRNb250aDogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEYXRlUGlja2VyTW9udGhcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJZZWFyIHtcclxuICAgICAgICB2YWx1ZTogbnVtYmVyO1xyXG4gICAgICAgIGlzQ3VycmVudFllYXI6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlclllYXIgaW1wbGVtZW50cyBJRGF0ZVBpY2tlclllYXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50WWVhciA9IHZhbHVlID09PSBtb21lbnQoKS55ZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0N1cnJlbnRZZWFyOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElEYXRlUGlja2VyRGF5XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyRGF5IHtcclxuICAgICAgICBkYXRlOiBudW1iZXI7XHJcbiAgICAgICAgdmFsdWU6IGFueTtcclxuICAgICAgICBpc1RvZGF5OiBib29sZWFuO1xyXG4gICAgICAgIGlzTm90SW5Nb250aDogYm9vbGVhbjtcclxuICAgICAgICBpc1NlbGVjdGluZzogYm9vbGVhbjtcclxuICAgICAgICBpc0JlZm9yZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbjtcclxuICAgICAgICBpc1NhbWUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlckRheSBpbXBsZW1lbnRzIElEYXRlUGlja2VyRGF5IHtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihmcm9tRGF0ZTogYW55LCBkYXlPZldlZWs6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbW9tZW50KGRheU9mV2Vlayk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMudmFsdWUuZGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzVG9kYXkgPSBkYXlPZldlZWsuaXNTYW1lKG1vbWVudCgpLCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNOb3RJbk1vbnRoID0gIXRoaXMudmFsdWUuaXNTYW1lKGZyb21EYXRlLCAnbW9udGgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGU6IG51bWJlcjtcclxuICAgICAgICB2YWx1ZTogYW55O1xyXG4gICAgICAgIGlzVG9kYXk6IGJvb2xlYW47XHJcbiAgICAgICAgaXNOb3RJbk1vbnRoOiBib29sZWFuO1xyXG4gICAgICAgIGlzU2VsZWN0aW5nOiBib29sZWFuO1xyXG5cclxuICAgICAgICBpc0JlZm9yZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBpc0JlZm9yZSA9IHRoaXMudmFsdWUuaXNCZWZvcmUoZGF5LnZhbHVlLCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpc0JlZm9yZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzU2FtZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBpc1NhbWUgPSB0aGlzLnZhbHVlLmlzU2FtZShkYXkudmFsdWUsICdkYXknKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzU2FtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlclNlcnZpY2VcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJTZXJ2aWNlIHtcclxuICAgICAgICBnZXRNb250aHMoKTogSURhdGVQaWNrZXJNb250aFtdO1xyXG4gICAgICAgIGdldERheXNPZldlZWsoKTogc3RyaW5nW107XHJcbiAgICAgICAgZ2V0WWVhcnMoZnJvbURhdGUpOiBJRGF0ZVBpY2tlclllYXJbXTtcclxuICAgICAgICBnZXRXZWVrKGZyb21EYXRlLCBzdGFydE9mV2Vlayk6IElEYXRlUGlja2VyRGF5W107XHJcbiAgICAgICAgZ2V0UmFuZ2VEYXlzKHN0YXJ0OiBJRGF0ZVBpY2tlckRheSwgZW5kOiBJRGF0ZVBpY2tlckRheSwgd2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSk6IElEYXRlUGlja2VyRGF5W107XHJcbiAgICAgICAgZGVzZWxlY3RBbGwod2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSk7XHJcbiAgICAgICAgc2VsZWN0RGF5cyhkYXlzOiBJRGF0ZVBpY2tlckRheVtdKTtcclxuICAgICAgICBpbnB1dFRvTW9tZW50KHZhbHVlOiBzdHJpbmcpOiBhbnk7XHJcbiAgICAgICAgaW5wdXRUb1JhbmdlKHZhbHVlOiBzdHJpbmcpOiBJRGF0ZVBpY2tlclJhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJTZXJ2aWNlIGltcGxlbWVudHMgSURhdGVQaWNrZXJTZXJ2aWNlIHtcclxuICAgICAgICBnZXRNb250aHMoKTogSURhdGVQaWNrZXJNb250aFtdIHtcclxuICAgICAgICAgICAgdmFyIG1vbnRocyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlck1vbnRoPigpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aHMucHVzaChuZXcgRGF0ZVBpY2tlck1vbnRoKGkpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1vbnRocztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFllYXJzKGZyb21EYXRlKTogSURhdGVQaWNrZXJZZWFyW10ge1xyXG4gICAgICAgICAgICB2YXIgZnJvbVllYXIgPSBtb21lbnQoZnJvbURhdGUpLnllYXIoKSxcclxuICAgICAgICAgICAgICAgIHllYXJzID0gbmV3IEFycmF5PElEYXRlUGlja2VyWWVhcj4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBmcm9tWWVhcjsgaSA8PSAoZnJvbVllYXIgKyA4KTsgaSsrKVxyXG4gICAgICAgICAgICAgICAgeWVhcnMucHVzaChuZXcgRGF0ZVBpY2tlclllYXIoaSkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHllYXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0V2Vlayhmcm9tRGF0ZSwgc3RhcnRPZldlZWspOiBJRGF0ZVBpY2tlckRheVtdIHtcclxuICAgICAgICAgICAgdmFyIGVuZE9mV2VlayA9IG1vbWVudChzdGFydE9mV2VlaykuZW5kT2YoJ3dlZWsnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXlzID0gbmV3IEFycmF5PElEYXRlUGlja2VyRGF5PigpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkYXlPZldlZWsgPSBtb21lbnQoc3RhcnRPZldlZWspOyBkYXlPZldlZWsuaXNCZWZvcmUoZW5kT2ZXZWVrKTsgZGF5T2ZXZWVrLmFkZCgxLCAnZGF5cycpKSB7XHJcbiAgICAgICAgICAgICAgICBkYXlzLnB1c2gobmV3IERhdGVQaWNrZXJEYXkoZnJvbURhdGUsIGRheU9mV2VlaykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldERheXNPZldlZWsoKTogc3RyaW5nW10ge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50LndlZWtkYXlzU2hvcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFJhbmdlRGF5cyhzdGFydDogSURhdGVQaWNrZXJEYXksIGVuZDogSURhdGVQaWNrZXJEYXksIHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pOiBJRGF0ZVBpY2tlckRheVtdIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbmQuaXNCZWZvcmUoc3RhcnQpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSBlbmQ7XHJcbiAgICAgICAgICAgICAgICBlbmQgPSB0ZW1wO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgYWxsRGF5cyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlckRheT4oKSxcclxuICAgICAgICAgICAgICAgIGlzQWRkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB3ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2Vlay5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRheS5pc1NhbWUoc3RhcnQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FkZGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0FkZGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxEYXlzLnB1c2goZGF5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXkuaXNTYW1lKGVuZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWRkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYWxsRGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlc2VsZWN0QWxsKHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pIHtcclxuICAgICAgICAgICAgd2Vla3MuZm9yRWFjaCh3ZWVrID0+IHtcclxuICAgICAgICAgICAgICAgIHdlZWsuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRheS5pc1NlbGVjdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0RGF5cyhkYXlzOiBJRGF0ZVBpY2tlckRheVtdKSB7XHJcbiAgICAgICAgICAgIGRheXMuZm9yRWFjaChkYXkgPT4gZGF5LmlzU2VsZWN0aW5nID0gdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnB1dFRvTW9tZW50KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgbGFuZyA9IG1vbWVudC5sb2NhbGVEYXRhKCk7XHJcbiAgICAgICAgICAgIHZhciBmb3JtYXRzID0gW1xyXG4gICAgICAgICAgICAgICAgbGFuZy5sb25nRGF0ZUZvcm1hdChcImxcIilcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvLS9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyAgL2csICcgJyksXHJcbiAgICAgICAgICAgICAgICBsYW5nLmxvbmdEYXRlRm9ybWF0KFwiTFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQodmFsdWUsIGZvcm1hdHMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0VG9SYW5nZSh2YWx1ZTogc3RyaW5nKTogSURhdGVQaWNrZXJSYW5nZSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8ICF2YWx1ZS50cmltKCkubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIHZhciB0cmltbWVkID0gdmFsdWVcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csICcgJylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyAgL2csICcgJylcclxuICAgICAgICAgICAgICAgIC50cmltKCk7XHJcbiAgICAgICAgICAgIHZhciBleHBTdGFydCA9IG5ldyBSZWdFeHAoXCJeKChbMC05XXsxLDR9WyBdKil7M30pXCIpO1xyXG4gICAgICAgICAgICB2YXIgZXhwRW5kID0gbmV3IFJlZ0V4cChcIigoWzAtOV17MSw0fVsgXSopezN9KSRcIik7XHJcbiAgICAgICAgICAgIHZhciBzdGFydFJlc3VsdCA9IGV4cFN0YXJ0LmV4ZWModHJpbW1lZCk7XHJcbiAgICAgICAgICAgIHZhciBlbmRSZXN1bHQgPSBleHBFbmQuZXhlYyh0cmltbWVkKTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5pbnB1dFRvTW9tZW50KHN0YXJ0UmVzdWx0WzBdLnRyaW0oKSk7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLmlucHV0VG9Nb21lbnQoKGVuZFJlc3VsdFswXSB8fCBzdGFydFJlc3VsdFswXSkudHJpbSgpKTtcclxuICAgICAgICAgICAgdmFyIHJhbmdlID0gbmV3IERhdGVQaWNrZXJSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5zZXJ2aWNlKCdkYXRlUGlja2VyU2VydmljZScsIERhdGVQaWNrZXJTZXJ2aWNlKTtcclxufSIsIlxyXG5tb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgVGltZVBpY2tlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyd0aW1lUGlja2VyU2VydmljZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVQaWNrZXJTZXJ2aWNlOiBJVGltZVBpY2tlclNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkluaXQoJHNjb3BlLCAkZWxlbWVudCwgbmdNb2RlbEN0cmwpIHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XHJcbiAgICAgICAgICAgIHRoaXMubmdNb2RlbEN0cmwgPSBuZ01vZGVsQ3RybDtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBibHVyLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbSA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UucGFyc2UobmdNb2RlbEN0cmwuJG1vZGVsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lID0gbS5pc1ZhbGlkKCkgPyBtLmZvcm1hdChcIkhIOm1tOnNzXCIpIDogbnVsbDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihgYmx1ci4keyRzY29wZS4kaWR9YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLl90aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX3RpbWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgZ2V0IHRpbWUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgdGltZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWUgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRWYWx1ZSh2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgdmlld1ZhbHVlID0gdGhpcy50aW1lUGlja2VyU2VydmljZS5mb3JtYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLm5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5uZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZ01vZGVsQ3RybDtcclxuICAgICAgICAkc2NvcGU7XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGltZVBpY2tlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICAgICAgcmVxdWlyZSA9ICduZ01vZGVsJztcclxuICAgICAgICBjb250cm9sbGVyID0gVGltZVBpY2tlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3RpbWVwaWNrZXInO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aW1lOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpID0+IHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IFRpbWVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuICAgICAgICAgICAgY3RybC5vbkluaXQoJHNjb3BlLCAkZWxlbWVudCwgbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLmRpcmVjdGl2ZSgndGltZVBpY2tlcicsIFRpbWVQaWNrZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRpbWVQaWNrZXJTZXJ2aWNlIHtcclxuICAgICAgICBwYXJzZSh0ZXh0OiBzdHJpbmcpOiBhbnk7XHJcbiAgICAgICAgZm9ybWF0KHRleHQ6IHN0cmluZyk6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyU2VydmljZSBpbXBsZW1lbnRzIElUaW1lUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgcGFyc2UodGV4dDogc3RyaW5nKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIHBhdHRlcm5zID0gW1xyXG4gICAgICAgICAgICAgICAgJ0xUJyxcclxuICAgICAgICAgICAgICAgICdMVFMnLFxyXG4gICAgICAgICAgICAgICAgJ0hIOm1tOnNzJyxcclxuICAgICAgICAgICAgICAgICdISDptbSBBJ1xyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KHRleHQsIHBhdHRlcm5zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICB2YXIgbSA9IHRoaXMucGFyc2UodGV4dCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtLmlzVmFsaWQoKSA/IG0uZm9ybWF0KCdMVCcpIDogJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLnNlcnZpY2UoJ3RpbWVQaWNrZXJTZXJ2aWNlJywgVGltZVBpY2tlclNlcnZpY2UpO1xyXG59Il19