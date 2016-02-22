var DatePickerModule;
(function (DatePickerModule) {
    var Module = (function () {
        function Module(name, modules) {
            this.module = angular.module(name, modules);
        }
        Module.prototype.config = function (appConfig) {
            this.module.config(appConfig);
            return this;
        };
        Module.prototype.run = function (appRun) {
            this.module.run(appRun);
            return this;
        };
        Module.prototype.directive = function (name, directive) {
            this.module.directive(name, DirectiveFactory.create(directive));
            return this;
        };
        Module.prototype.filter = function (name, filter) {
            this.module.filter(name, FilterFactory.create(filter));
            return this;
        };
        Module.prototype.service = function (name, service) {
            this.module.service(name, service);
            return this;
        };
        Module.prototype.provider = function (name, provider) {
            this.module.provider(name, provider);
            return this;
        };
        Module.prototype.factory = function (name, factory) {
            this.module.factory(name, factory);
            return this;
        };
        Module.prototype.constant = function (name, value) {
            this.module.constant(name, value);
            return this;
        };
        return Module;
    })();
    DatePickerModule.Module = Module;
    // filters
    var FilterFactory = (function () {
        function FilterFactory() {
        }
        FilterFactory.create = function (type) {
            var filter = function () {
                var inject = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    inject[_i - 0] = arguments[_i];
                }
                var instance = Activator.create(type, inject);
                return function () {
                    var options = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        options[_i - 0] = arguments[_i];
                    }
                    return instance.filter.apply(instance, options);
                };
            };
            filter["$inject"] = type["$inject"];
            return filter;
        };
        return FilterFactory;
    })();
    // directives
    var DirectiveFactory = (function () {
        function DirectiveFactory() {
        }
        DirectiveFactory.create = function (type) {
            var directive = function () {
                var inject = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    inject[_i - 0] = arguments[_i];
                }
                return Activator.create(type, inject);
            };
            directive["$inject"] = type["$inject"];
            return directive;
        };
        return DirectiveFactory;
    })();
    var Activator = (function () {
        function Activator() {
        }
        Activator.create = function (type, params) {
            var instance = Object.create(type.prototype);
            instance.constructor.apply(instance, params);
            return instance;
            //var args = [null].concat(params);
            //var factory = type.bind.apply(type, args);
            //return new factory();
        };
        return Activator;
    })();
    DatePickerModule.Activator = Activator;
})(DatePickerModule || (DatePickerModule = {}));
var app = new DatePickerModule.Module("ngDatePicker", []);
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
                isSelecting: '=',
                // Collection of date strings (ie. ['2012-12-01','2012-12-02']
                highlighted: '='
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
            var start = angular.element(range.start.target).scope().day, end = angular.element(range.end.target).scope().day;
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
    app.directive('datePicker', DatePickerDirective);
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
            return moment.localeData()._weekdaysShort;
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
    app.service('datePickerService', DatePickerService);
})(DatePickerModule || (DatePickerModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuZGVidWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZ2xvYmFscy50cyIsIi4uL3NyYy9hbmd1bGFyLnRzIiwiLi4vc3JjL2FwcC50cyIsIi4uL3NyYy9kYXRlLXBpY2tlci50cyIsIi4uL3NyYy9kYXRlLXBpY2tlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbIkRhdGVQaWNrZXJNb2R1bGUiLCJEYXRlUGlja2VyTW9kdWxlLk1vZHVsZSIsIkRhdGVQaWNrZXJNb2R1bGUuTW9kdWxlLmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5Nb2R1bGUuY29uZmlnIiwiRGF0ZVBpY2tlck1vZHVsZS5Nb2R1bGUucnVuIiwiRGF0ZVBpY2tlck1vZHVsZS5Nb2R1bGUuZGlyZWN0aXZlIiwiRGF0ZVBpY2tlck1vZHVsZS5Nb2R1bGUuZmlsdGVyIiwiRGF0ZVBpY2tlck1vZHVsZS5Nb2R1bGUuc2VydmljZSIsIkRhdGVQaWNrZXJNb2R1bGUuTW9kdWxlLnByb3ZpZGVyIiwiRGF0ZVBpY2tlck1vZHVsZS5Nb2R1bGUuZmFjdG9yeSIsIkRhdGVQaWNrZXJNb2R1bGUuTW9kdWxlLmNvbnN0YW50IiwiRGF0ZVBpY2tlck1vZHVsZS5GaWx0ZXJGYWN0b3J5IiwiRGF0ZVBpY2tlck1vZHVsZS5GaWx0ZXJGYWN0b3J5LmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5GaWx0ZXJGYWN0b3J5LmNyZWF0ZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGlyZWN0aXZlRmFjdG9yeSIsIkRhdGVQaWNrZXJNb2R1bGUuRGlyZWN0aXZlRmFjdG9yeS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGlyZWN0aXZlRmFjdG9yeS5jcmVhdGUiLCJEYXRlUGlja2VyTW9kdWxlLkFjdGl2YXRvciIsIkRhdGVQaWNrZXJNb2R1bGUuQWN0aXZhdG9yLmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5BY3RpdmF0b3IuY3JlYXRlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyVmlldyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5kYXRlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zdGFydCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuZW5kIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5kYXRlSW50ZXJuYWwiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnRpdGxlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci52aWV3VHlwZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2hvd0RheXMiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNob3dNb250aHMiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNob3dZZWFycyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuY2FsY3VsYXRlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5pc1NlbGVjdGVkIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5pc0hpZ2hsaWdodGVkIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZWxlY3RpbmciLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNlbGVjdGVkIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZWxlY3RlZERhdGUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNlbGVjdGVkUmFuZ2UiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNlbGVjdE1vbnRoIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5pc01vbnRoIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZXRNb250aCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuaXNZZWFyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZWxlY3RZZWFyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZXRZZWFyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5wcmV2TW9udGgiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLm5leHRNb250aCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIucHJldlllYXIiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLm5leHRZZWFyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5wcmV2UmFuZ2UiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLm5leHRSYW5nZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5saW5rSW5wdXQiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUubGlua0VsZW1lbnQiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUubGlua0lubGluZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5nZXREYXlzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLnBvcG92ZXIiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUuY3JlYXRlRHJvcERvd24iLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUucHJldmVudERlZmF1bHQiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUuaXNFc2NhcGUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUuY3JlYXRlQ29udGVudCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5kYXlTZWxlY3QiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUucmFuZ2VTZWxlY3QiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJSYW5nZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclJhbmdlLmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyTW9udGgiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJNb250aC5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclllYXIiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJZZWFyLmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGF5IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGF5LmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGF5LmlzQmVmb3JlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGF5LmlzU2FtZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5nZXRNb250aHMiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJTZXJ2aWNlLmdldFllYXJzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5nZXRXZWVrIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5nZXREYXlzT2ZXZWVrIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5nZXRSYW5nZURheXMiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJTZXJ2aWNlLmRlc2VsZWN0QWxsIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5zZWxlY3REYXlzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5pbnB1dFRvTW9tZW50IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5pbnB1dFRvUmFuZ2UiXSwibWFwcGluZ3MiOiJBQ0FBLElBQU8sZ0JBQWdCLENBNEt0QjtBQTVLRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFFckJBO1FBR0lDLGdCQUFZQSxJQUFJQSxFQUFFQSxPQUFPQTtZQUNyQkMsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFDaERBLENBQUNBO1FBRURELHVCQUFNQSxHQUFOQSxVQUFPQSxTQUFTQTtZQUNaRSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUM5QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRURGLG9CQUFHQSxHQUFIQSxVQUFJQSxNQUFNQTtZQUNORyxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUN4QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRURILDBCQUFTQSxHQUFUQSxVQUFVQSxJQUFZQSxFQUFFQSxTQUFTQTtZQUM3Qkks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TUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFFeERBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLEtBQUtBLEVBQW9CQSxDQUFDQTtZQUMzQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ2xFQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO2dCQUN6REEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLENBQUNBO1lBRURBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDM0RBLENBQUNBO1FBRURYLHlDQUFVQSxHQUFWQSxVQUFXQSxHQUFtQkE7WUFDMUJZLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO2dCQUNsQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFFdERBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtB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RUEsR0FBR0EsQ0FBQ0E7aUJBQ25CQSxJQUFJQSxFQUFFQSxDQUFDQTtZQUNaQSxJQUFJQSxRQUFRQSxHQUFHQSxJQUFJQSxNQUFNQSxDQUFDQSx3QkFBd0JBLENBQUNBLENBQUNBO1lBQ3BEQSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxNQUFNQSxDQUFDQSx3QkFBd0JBLENBQUNBLENBQUNBO1lBQ2xEQSxJQUFJQSxXQUFXQSxHQUFHQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtZQUN6Q0EsSUFBSUEsU0FBU0EsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDckNBLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLENBQUNBO1lBQ3REQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUN0RUEsSUFBSUEsS0FBS0EsR0FBR0EsSUFBSUEsZUFBZUEsQ0FBQ0EsS0FBS0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1FBQ2pCQSxDQUFDQTtRQUNMVix3QkFBQ0E7SUFBREEsQ0FBQ0EsQUE5R0QxRSxJQThHQ0E7SUFFREEsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsbUJBQW1CQSxFQUFFQSxpQkFBaUJBLENBQUNBLENBQUNBO0FBQ3hEQSxDQUFDQSxFQTlOTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBOE50QiIsInNvdXJjZXNDb250ZW50IjpbImRlY2xhcmUgdmFyIGFuZ3VsYXI6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcbmRlY2xhcmUgdmFyIFRldGhlcjogYW55OyIsIm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTW9kdWxlIHtcclxuICAgICAgICBwcml2YXRlIG1vZHVsZTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSwgbW9kdWxlcykge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIG1vZHVsZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnKGFwcENvbmZpZykge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZS5jb25maWcoYXBwQ29uZmlnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBydW4oYXBwUnVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kdWxlLnJ1bihhcHBSdW4pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpcmVjdGl2ZShuYW1lOiBzdHJpbmcsIGRpcmVjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZS5kaXJlY3RpdmUobmFtZSwgRGlyZWN0aXZlRmFjdG9yeS5jcmVhdGUoZGlyZWN0aXZlKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlsdGVyKG5hbWU6IHN0cmluZywgZmlsdGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kdWxlLmZpbHRlcihuYW1lLCBGaWx0ZXJGYWN0b3J5LmNyZWF0ZShmaWx0ZXIpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXJ2aWNlKG5hbWU6IHN0cmluZywgc2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZS5zZXJ2aWNlKG5hbWUsIHNlcnZpY2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3ZpZGVyKG5hbWU6IHN0cmluZywgcHJvdmlkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2R1bGUucHJvdmlkZXIobmFtZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZhY3RvcnkobmFtZTogc3RyaW5nLCBmYWN0b3J5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kdWxlLmZhY3RvcnkobmFtZSwgZmFjdG9yeSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RhbnQobmFtZTogc3RyaW5nLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZS5jb25zdGFudChuYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmaWx0ZXJzXHJcbiAgICBjbGFzcyBGaWx0ZXJGYWN0b3J5IHtcclxuICAgICAgICBzdGF0aWMgY3JlYXRlKHR5cGU6IElBY3RpdmF0b3JDbGFzcyk6IGFueSB7XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXIgPSAoLi4uaW5qZWN0OiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gQWN0aXZhdG9yLmNyZWF0ZSh0eXBlLCBpbmplY3QpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICguLi5vcHRpb25zOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZS5maWx0ZXIuYXBwbHkoaW5zdGFuY2UsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZmlsdGVyW1wiJGluamVjdFwiXSA9IHR5cGVbXCIkaW5qZWN0XCJdO1xyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkaXJlY3RpdmVzXHJcbiAgICBjbGFzcyBEaXJlY3RpdmVGYWN0b3J5IHtcclxuICAgICAgICBzdGF0aWMgY3JlYXRlKHR5cGU6IElBY3RpdmF0b3JDbGFzcyk6IGFueSB7XHJcbiAgICAgICAgICAgIHZhciBkaXJlY3RpdmUgPSAoLi4uaW5qZWN0OiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEFjdGl2YXRvci5jcmVhdGUodHlwZSwgaW5qZWN0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZGlyZWN0aXZlW1wiJGluamVjdFwiXSA9IHR5cGVbXCIkaW5qZWN0XCJdO1xyXG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBhY3RpdmF0b3JcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFjdGl2YXRvckNsYXNzIHtcclxuICAgICAgICBuZXcgKC4uLnBhcmFtczogYW55W10pO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBY3RpdmF0b3Ige1xyXG4gICAgICAgIHN0YXRpYyBjcmVhdGUodHlwZTogSUFjdGl2YXRvckNsYXNzLCBwYXJhbXM6IGFueVtdKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IE9iamVjdC5jcmVhdGUodHlwZS5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5jb25zdHJ1Y3Rvci5hcHBseShpbnN0YW5jZSwgcGFyYW1zKTtcclxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgYXJncyA9IFtudWxsXS5jb25jYXQocGFyYW1zKTtcclxuICAgICAgICAgICAgLy92YXIgZmFjdG9yeSA9IHR5cGUuYmluZC5hcHBseSh0eXBlLCBhcmdzKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gbmV3IGZhY3RvcnkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJvbWlzZVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZTxUPiB7XHJcbiAgICAgICAgdGhlbihzdWNjZXNzOiBJUHJvbWlzZUNhbGxiYWNrPFQ+LCBlcnJvcj86IElQcm9taXNlQ2FsbGJhY2s8YW55Piwgbm90aWZ5PzogSVByb21pc2VDYWxsYmFjazxhbnk+KTogSVByb21pc2U8VD47XHJcbiAgICAgICAgY2F0Y2goZXJyb3I6IElQcm9taXNlQ2FsbGJhY2s8YW55Pik6IElQcm9taXNlPFQ+O1xyXG4gICAgICAgIGZpbmFsbHkoY2FsbGJhY2s6IElQcm9taXNlQ2FsbGJhY2s8VD4sIG5vdGlmeT86IElQcm9taXNlQ2FsbGJhY2s8YW55Pik6IElQcm9taXNlPFQ+O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVByb21pc2VDYWxsYmFjazxUPiB7XHJcbiAgICAgICAgKHJlc3VsdDogVCk6IGFueTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAkcVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGVmZXJyYWJsZSB7XHJcbiAgICAgICAgPFQ+KHJlc29sdmU6IGFueSwgcmVqZWN0OiBhbnkpOiBJUHJvbWlzZTxUPjtcclxuICAgICAgICBkZWZlcigpOiBJRGVmZXJyZWQ8dm9pZD47XHJcbiAgICAgICAgZGVmZXI8VD4oKTogSURlZmVycmVkPFQ+O1xyXG4gICAgICAgIHdoZW48VD4odmFsdWU6IGFueSk6IElQcm9taXNlPFQ+O1xyXG4gICAgICAgIHJlc29sdmU8VD4odmFsdWU6IFQpOiBJUHJvbWlzZTxUPjtcclxuICAgICAgICBhbGwoLi4ucHJvbWlzZXM6IElQcm9taXNlPGFueT5bXSk6IElQcm9taXNlPGFueT47XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGVmZXJyZWQ8VD4ge1xyXG4gICAgICAgIG5vdGlmeSh2YWx1ZTogYW55KTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZTogVCk7XHJcbiAgICAgICAgcmVqZWN0KHJlYXNvbjogYW55KTtcclxuICAgICAgICBwcm9taXNlOiBJUHJvbWlzZTxUPjtcclxuICAgIH1cclxuXHJcbiAgICAvLyAkaHR0cFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJSHR0cFJlcXVlc3Qge1xyXG4gICAgICAgIHBvc3QodXJsOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNvbmZpZz86IElIdHRwQ29uZmlnKTogSUh0dHBQcm9taXNlPHZvaWQ+O1xyXG4gICAgICAgIHB1dCh1cmw6IHN0cmluZywgZGF0YTogYW55LCBjb25maWc/OiBJSHR0cENvbmZpZyk6IElIdHRwUHJvbWlzZTx2b2lkPjtcclxuICAgICAgICBkZWxldGUodXJsOiBzdHJpbmcsIGNvbmZpZz86IElIdHRwQ29uZmlnKTogSUh0dHBQcm9taXNlPHZvaWQ+O1xyXG4gICAgICAgIGpzb25wKHVybDogc3RyaW5nLCBjb25maWc/OiBJSHR0cENvbmZpZyk6IElIdHRwUHJvbWlzZTx2b2lkPjtcclxuICAgICAgICBwYXRjaCh1cmw6IHN0cmluZywgZGF0YTogYW55LCBjb25maWc/OiBJSHR0cENvbmZpZyk6IElIdHRwUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgICAgICAgZ2V0PFQ+KHVybDogc3RyaW5nLCBjb25maWc/OiBJSHR0cENvbmZpZyk6IElIdHRwUHJvbWlzZTxUPjtcclxuICAgICAgICBoZWFkPFQ+KHVybDogc3RyaW5nLCBjb25maWc/OiBJSHR0cENvbmZpZyk6IElIdHRwUHJvbWlzZTxUPjtcclxuICAgICAgICBwb3N0PFQ+KHVybDogc3RyaW5nLCBkYXRhPzogYW55LCBjb25maWc/OiBJSHR0cENvbmZpZyk6IElIdHRwUHJvbWlzZTxUPjtcclxuICAgICAgICBwdXQ8VD4odXJsOiBzdHJpbmcsIGRhdGE6IGFueSwgY29uZmlnPzogSUh0dHBDb25maWcpOiBJSHR0cFByb21pc2U8VD47XHJcbiAgICAgICAgZGVsZXRlPFQ+KHVybDogc3RyaW5nLCBjb25maWc/OiBJSHR0cENvbmZpZyk6IElIdHRwUHJvbWlzZTxUPjtcclxuICAgICAgICBqc29ucDxUPih1cmw6IHN0cmluZywgY29uZmlnPzogSUh0dHBDb25maWcpOiBJSHR0cFByb21pc2U8VD47XHJcbiAgICAgICAgcGF0Y2g8VD4odXJsOiBzdHJpbmcsIGRhdGE6IGFueSwgY29uZmlnPzogSUh0dHBDb25maWcpOiBJSHR0cFByb21pc2U8VD47XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJSHR0cENvbmZpZyB7XHJcbiAgICAgICAgbWV0aG9kPzogc3RyaW5nO1xyXG4gICAgICAgIHVybD86IHN0cmluZztcclxuICAgICAgICBwYXJhbXM/OiBhbnk7XHJcbiAgICAgICAgZGF0YT86IGFueTtcclxuICAgICAgICBoZWFkZXI/OiBhbnk7XHJcbiAgICAgICAgeHNyZkhlYWRlck5hbWU/OiBzdHJpbmc7XHJcbiAgICAgICAgeHNyZkNvb2tpZU5hbWU/OiBzdHJpbmc7XHJcbiAgICAgICAgdHJhbnNmb3JtUmVxdWVzdD86IChkYXRhOiBhbnksIGhlYWRlcnNHZXR0ZXI6IGFueSkgPT4gdm9pZDtcclxuICAgICAgICB0cmFuc2Zvcm1SZXNwb25zZT86IChkYXRhOiBhbnksIGhlYWRlcnNHZXR0ZXI6IGFueSwgc3RhdHVzOiBhbnkpID0+IHZvaWQ7XHJcbiAgICAgICAgcGFyYW1TZXJpYWxpemVyPzogKHBhcmFtOiB7IGtleTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0pID0+IHN0cmluZztcclxuICAgICAgICBjYWNoZT86IGFueTtcclxuICAgICAgICB0aW1lb3V0PzogYW55O1xyXG4gICAgICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XHJcbiAgICAgICAgcmVzcG9uc2VUeXBlPzogc3RyaW5nO1xyXG4gICAgICAgIGhlYWRlcnM/OiBhbnk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJSHR0cFByb21pc2U8VD4gZXh0ZW5kcyBJSHR0cFByb21pc2VDYWxsYmFjazxUPiB7XHJcbiAgICAgICAgc3VjY2VzcyhjYWxsYmFjazogSUh0dHBQcm9taXNlUmVzdWx0PFQ+KTogSVByb21pc2U8VD47XHJcbiAgICAgICAgZXJyb3IoY2FsbGJhY2s6IElIdHRwUHJvbWlzZVJlc3VsdDxhbnk+KTogSVByb21pc2U8VD47XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJSHR0cFByb21pc2VDYWxsYmFjazxUPiBleHRlbmRzIElQcm9taXNlPElIdHRwUHJvbWlzZVJlc3VsdDxUPj4ge1xyXG4gICAgICAgIC8vIEFuIGludGVyZmFjZSBmb3IgcmV0dXJuaW5nIGZyb20gYW4gaHR0cCB0aGVuICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUh0dHBQcm9taXNlUmVzdWx0PFQ+IHtcclxuICAgICAgICBkYXRhOiBUO1xyXG4gICAgICAgIHN0YXR1cz86IG51bWJlcjtcclxuICAgICAgICBoZWFkZXJzPzogKGhlYWRlck5hbWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgICAgICBjb25maWc/OiBJSHR0cENvbmZpZztcclxuICAgICAgICBzdGF0dXNUZXh0Pzogc3RyaW5nO1xyXG4gICAgfVxyXG59IiwidmFyIGFwcCA9IG5ldyBEYXRlUGlja2VyTW9kdWxlLk1vZHVsZShcIm5nRGF0ZVBpY2tlclwiLCBbXSk7IiwiXHJcbm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICBlbnVtIERhdGVQaWNrZXJWaWV3IHtcclxuICAgICAgICBEYXlzID0gMCxcclxuICAgICAgICBNb250aHMgPSAxLFxyXG4gICAgICAgIFllYXJzID0gMlxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJDb250cm9sbGVyIHtcclxuXHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRhdHRycycsICdkYXRlUGlja2VyU2VydmljZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRhdHRycywgcHJpdmF0ZSBkYXRlUGlja2VyU2VydmljZTogSURhdGVQaWNrZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9udGhOYW1lcyA9IGRhdGVQaWNrZXJTZXJ2aWNlLmdldE1vbnRocygpO1xyXG4gICAgICAgICAgICB0aGlzLmRheXNPZldlZWsgPSBkYXRlUGlja2VyU2VydmljZS5nZXREYXlzT2ZXZWVrKCk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKCRhdHRycy5taW5WaWV3KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFycyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuWWVhcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WaWV3ID0gRGF0ZVBpY2tlclZpZXcuWWVhcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aHMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3Lk1vbnRocztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblZpZXcgPSBEYXRlUGlja2VyVmlldy5Nb250aHM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3LkRheXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WaWV3ID0gRGF0ZVBpY2tlclZpZXcuRGF5cztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pc1NpbmdsZURhdGUgPSAhKCRhdHRycy5zdGFydCAhPSBudWxsIHx8ICRhdHRycy5lbmQgIT0gbnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5pc1NpbmdsZURhdGUgPyB0aGlzLmRhdGUgOiB0aGlzLnN0YXJ0O1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSh0aGlzLmRhdGVJbnRlcm5hbCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2luZ2xlIERhdGVcclxuICAgICAgICBwcml2YXRlIF9kYXRlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGdldCBkYXRlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGRhdGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLl9kYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmFuZ2VcclxuICAgICAgICBwcml2YXRlIF9zdGFydDogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgc3RhcnQoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHN0YXJ0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuX3N0YXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfZW5kOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGdldCBlbmQoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBlbmQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmQgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uRGF0ZVNlbGVjdDtcclxuICAgICAgICBvblJhbmdlU2VsZWN0O1xyXG4gICAgICAgIGlzU2VsZWN0aW5nOiBib29sZWFuO1xyXG5cclxuICAgICAgICB2aWV3OiBEYXRlUGlja2VyVmlldztcclxuICAgICAgICBtaW5WaWV3OiBEYXRlUGlja2VyVmlldztcclxuICAgICAgICB3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdO1xyXG4gICAgICAgIHllYXJzOiBJRGF0ZVBpY2tlclllYXJbXTtcclxuICAgICAgICBtb250aE5hbWVzOiBJRGF0ZVBpY2tlck1vbnRoW107XHJcbiAgICAgICAgZGF5c09mV2Vlazogc3RyaW5nW107XHJcbiAgICAgICAgaXNWaXNpYmxlOiBib29sZWFuO1xyXG4gICAgICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgICAgIGlzb0Zvcm1hdCA9ICdZWVlZLU1NLUREJztcclxuICAgICAgICBpc1NpbmdsZURhdGU6IGJvb2xlYW47XHJcbiAgICAgICAgaGlnaGxpZ2h0ZWQ6IHN0cmluZ1tdO1xyXG5cclxuICAgICAgICBwcml2YXRlIF9kYXRlSW50ZXJuYWw7XHJcblxyXG4gICAgICAgIGdldCBkYXRlSW50ZXJuYWwoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgZGF0ZUludGVybmFsKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIG0gPSB2YWx1ZSAhPSBudWxsID8gbW9tZW50KHZhbHVlKSA6IG1vbWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRlSW50ZXJuYWwgPSBtO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZClcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKHRoaXMuX2RhdGVJbnRlcm5hbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdGl0bGUoKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5EYXlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWwuZm9ybWF0KCdNTU1NIFlZWVknKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuTW9udGhzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LlllYXJzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnc2VsZWN0IGEgeWVhcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB2aWV3VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5Nb250aHM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwibW9udGhzXCI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LlllYXJzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInllYXJzXCI7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5EYXlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImRheXNcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd0RheXMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPiBEYXRlUGlja2VyVmlldy5EYXlzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd01vbnRocygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA+IERhdGVQaWNrZXJWaWV3Lk1vbnRocylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd1llYXJzKCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5ZZWFycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbGN1bGF0ZShmcm9tRGF0ZSkge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBtb21lbnQoZnJvbURhdGUpLnN0YXJ0T2YoJ21vbnRoJykuc3RhcnRPZignd2VlaycpLFxyXG4gICAgICAgICAgICAgICAgZW5kID0gbW9tZW50KGZyb21EYXRlKS5lbmRPZignbW9udGgnKS5lbmRPZignd2VlaycpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53ZWVrcyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlckRheVtdPigpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkYXkgPSBtb21lbnQoc3RhcnQpOyBkYXkuaXNCZWZvcmUoZW5kKTsgZGF5LmFkZCgxLCAnd2VlaycpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2VlayA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0V2Vlayhmcm9tRGF0ZSwgZGF5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2Vla3MucHVzaCh3ZWVrKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy55ZWFycyA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0WWVhcnMoZnJvbURhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNTZWxlY3RlZChkYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQodGhpcy5kYXRlKS5pc1NhbWUoZGF5LnZhbHVlLCAnZGF5Jyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF5LnZhbHVlLmlzQmV0d2Vlbih0aGlzLnN0YXJ0LCB0aGlzLmVuZCwgJ2RheScpIHx8XHJcbiAgICAgICAgICAgICAgICBkYXkudmFsdWUuaXNTYW1lKHRoaXMuc3RhcnQsICdkYXknKSB8fFxyXG4gICAgICAgICAgICAgICAgZGF5LnZhbHVlLmlzU2FtZSh0aGlzLmVuZCwgJ2RheScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNIaWdobGlnaHRlZChkYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaGlnaGxpZ2h0ZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuaGlnaGxpZ2h0ZWRbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAobW9tZW50KHZhbHVlKS5pc1NhbWUoZGF5LnZhbHVlLCAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0aW5nKGRheXM6IElEYXRlUGlja2VyRGF5W10pIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5kZXNlbGVjdEFsbCh0aGlzLndlZWtzKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5zZWxlY3REYXlzKGRheXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWQoZGF5czogSURhdGVQaWNrZXJEYXlbXSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmRlc2VsZWN0QWxsKHRoaXMud2Vla3MpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gZGF5c1swXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUoc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5kID0gZGF5c1tkYXlzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2Uoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZERhdGUoZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBtb21lbnQoZGF5LnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IHRoaXMuZGF0ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkUmFuZ2Uoc3RhcnQ6IElEYXRlUGlja2VyRGF5LCBlbmQ6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBtb21lbnQoc3RhcnQudmFsdWUpLmZvcm1hdCh0aGlzLmlzb0Zvcm1hdCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbW9tZW50KGVuZC52YWx1ZSkuZm9ybWF0KHRoaXMuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgdGhpcy5vblJhbmdlU2VsZWN0KHsgc3RhcnQ6IHRoaXMuc3RhcnQsIGVuZDogdGhpcy5lbmQgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RNb250aChpZHgpIHtcclxuICAgICAgICAgICAgdmFyIG1vbnRoID0gdGhpcy5tb250aE5hbWVzW2lkeF07XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9udGgobW9udGgudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID09PSBEYXRlUGlja2VyVmlldy5Nb250aHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZGF0ZUludGVybmFsLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25EYXRlU2VsZWN0KHsgZGF0ZTogdGhpcy5kYXRlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuZGF0ZUludGVybmFsKS5lbmRPZignbW9udGgnKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZCA9IG1vbWVudCh0aGlzLmRhdGVJbnRlcm5hbCkuZW5kT2YoJ21vbnRoJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJhbmdlU2VsZWN0KHsgc3RhcnQ6IHRoaXMuc3RhcnQsIGVuZDogdGhpcy5lbmQgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dEYXlzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc01vbnRoKG1vbnRoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVJbnRlcm5hbC5tb250aCgpID09IG1vbnRoLnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0TW9udGgobW9udGgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5zZXQoJ21vbnRoJywgbW9udGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNZZWFyKHllYXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUludGVybmFsLnllYXIoKSA9PSB5ZWFyLnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0WWVhcihpZHgpIHtcclxuICAgICAgICAgICAgdmFyIHllYXIgPSB0aGlzLnllYXJzW2lkeF07XHJcbiAgICAgICAgICAgIHRoaXMuc2V0WWVhcih5ZWFyLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA9PT0gRGF0ZVBpY2tlclZpZXcuWWVhcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZGF0ZUludGVybmFsLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25EYXRlU2VsZWN0KHsgZGF0ZTogdGhpcy5kYXRlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHRoaXMuZGF0ZUludGVybmFsKS5zdGFydE9mKCd5ZWFyJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmQgPSBtb21lbnQodGhpcy5kYXRlSW50ZXJuYWwpLmVuZE9mKCd5ZWFyJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJhbmdlU2VsZWN0KHsgc3RhcnQ6IHRoaXMuc3RhcnQsIGVuZDogdGhpcy5lbmQgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dNb250aHMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFllYXIoeWVhcikge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnNldCgneWVhcicsIHllYXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldk1vbnRoKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnN1YnRyYWN0KDEsICdtb250aHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5leHRNb250aCgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5hZGQoMSwgJ21vbnRocycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldlllYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuc3VidHJhY3QoMSwgJ3llYXJzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0WWVhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5hZGQoMSwgJ3llYXJzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2UmFuZ2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuc3VidHJhY3QoOSwgJ3llYXJzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0UmFuZ2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuYWRkKDksICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGluamVjdG9yJywgJyRjb21waWxlJywgJyR0ZW1wbGF0ZUNhY2hlJywgJyR0aW1lb3V0JywgJyR3aW5kb3cnLCAnZGF0ZVBpY2tlclNlcnZpY2UnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaW5qZWN0b3IsIHByaXZhdGUgJGNvbXBpbGUsIHByaXZhdGUgJHRlbXBsYXRlQ2FjaGUsIHByaXZhdGUgJHRpbWVvdXQsIHByaXZhdGUgJHdpbmRvdywgcHJpdmF0ZSBkYXRlUGlja2VyU2VydmljZTogSURhdGVQaWNrZXJTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQUUnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnP25nTW9kZWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBEYXRlUGlja2VyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAnZGF0ZXBpY2tlcic7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIC8vIFNpbmdsZSBEYXRlXHJcbiAgICAgICAgICAgIGRhdGU6ICc9JyxcclxuICAgICAgICAgICAgb25EYXRlU2VsZWN0OiAnJicsXHJcblxyXG4gICAgICAgICAgICAvLyBSYW5nZVxyXG4gICAgICAgICAgICBzdGFydDogJz0nLFxyXG4gICAgICAgICAgICBlbmQ6ICc9JyxcclxuICAgICAgICAgICAgb25SYW5nZVNlbGVjdDogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gT3RoZXJcclxuICAgICAgICAgICAgaXNTZWxlY3Rpbmc6ICc9JyxcclxuXHJcbiAgICAgICAgICAgIC8vIENvbGxlY3Rpb24gb2YgZGF0ZSBzdHJpbmdzIChpZS4gWycyMDEyLTEyLTAxJywnMjAxMi0xMi0wMiddXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodGVkOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYWxlbmRhclRlbXBsYXRlID0gJ2RhdGUtcGlja2VyLmh0bWwnO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpID0+IHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpeGVzIGEgYnVnIHdoZXJlIFRldGhlciBjYW5ub3QgY29ycmVjdGx5IGdldCB3aWR0aC9oZWlnaHQgYmVjYXVzZSBvZiBuZ0FuaW1hdGVcclxuICAgICAgICAgICAgdmFyICRhbmltYXRlID0gdGhpcy4kaW5qZWN0b3IuZ2V0KCckYW5pbWF0ZScpO1xyXG4gICAgICAgICAgICBpZiAoJGFuaW1hdGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICRhbmltYXRlLmVuYWJsZWQoZmFsc2UsICRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkZWxlbWVudC5pcygnaW5wdXRbdHlwZT1cInRleHRcIl0nKSlcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua0lucHV0KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICgkZWxlbWVudC5pcygnZGF0ZS1waWNrZXInKSlcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua0lubGluZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rRWxlbWVudCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdHJsLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXlTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucmFuZ2VTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlua0lucHV0KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IGN0cmwuZGF0ZSwgZGF0ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSBkYXRlID09IG51bGwgPyAnJyA6IG1vbWVudChkYXRlKS5mb3JtYXQoXCJMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2V0Vmlld1ZhbHVlID0gKHN0YXJ0LCBlbmQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnQgIT0gbnVsbCAmJiBlbmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbVN0YXJ0ID0gbW9tZW50KHN0YXJ0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1FbmQgPSBtb21lbnQoZW5kKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtU3RhcnQuaXNTYW1lKGVuZCwgJ2RheScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gbVN0YXJ0LmZvcm1hdChcIkxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gYCR7bVN0YXJ0LmZvcm1hdChcIkxcIil9IC0gJHttRW5kLmZvcm1hdChcIkxcIil9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IG1vbWVudChlbmQpLmZvcm1hdChcIkxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gbW9tZW50KGVuZCkuZm9ybWF0KFwiTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IGN0cmwuc3RhcnQsIHN0YXJ0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRWaWV3VmFsdWUoc3RhcnQsIGN0cmwuZW5kKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4gY3RybC5lbmQsIGVuZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0Vmlld1ZhbHVlKGN0cmwuc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGNoYW5nZS4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGUgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0VG9Nb21lbnQobmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0ZS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5kYXRlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGUuaXNTYW1lKGN0cmwuZGF0ZSwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuZGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb1JhbmdlKG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYW5nZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc3RhcnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLmVuZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbW9tZW50KHJhbmdlLnN0YXJ0KS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc3RhcnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1vbWVudChyYW5nZS5lbmQpLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5lbmQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5zdGFydCA9PSBudWxsIHx8IGN0cmwuZW5kID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9tZW50KHJhbmdlLnN0YXJ0KS5pc1NhbWUoY3RybC5zdGFydCwgJ2RheScpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnQocmFuZ2UuZW5kKS5pc1NhbWUoY3RybC5lbmQsICdkYXknKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc3RhcnQgPSByYW5nZS5zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5lbmQgPSByYW5nZS5lbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihga2V5ZG93bi4keyRzY29wZS4kaWR9YCwgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWN0cmwuaXNWaXNpYmxlIHx8ICF0aGlzLmlzRXNjYXBlKGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rRWxlbWVudCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua0lubGluZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5jcmVhdGVDb250ZW50KCRzY29wZSk7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldERheXMocmFuZ2UsIGN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0OiBJRGF0ZVBpY2tlckRheSA9IGFuZ3VsYXIuZWxlbWVudChyYW5nZS5zdGFydC50YXJnZXQpLnNjb3BlKCkuZGF5LFxyXG4gICAgICAgICAgICAgICAgZW5kOiBJRGF0ZVBpY2tlckRheSA9IGFuZ3VsYXIuZWxlbWVudChyYW5nZS5lbmQudGFyZ2V0KS5zY29wZSgpLmRheTtcclxuICAgICAgICAgICAgdmFyIGRheXMgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFJhbmdlRGF5cyhzdGFydCwgZW5kLCBjdHJsLndlZWtzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3BvdmVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xyXG4gICAgICAgICAgICB2YXIgY29udGVudCxcclxuICAgICAgICAgICAgICAgIHRldGhlcixcclxuICAgICAgICAgICAgICAgICRib2R5ID0gYW5ndWxhci5lbGVtZW50KCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcblxyXG4gICAgICAgICAgICB2YXIgZG9Ob3RSZW9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgY3RybFsnZGF0ZVNlbGVjdGVkJ10gPSAoZGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRvTm90UmVvcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICBkb05vdFJlb3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY3RybC5vbkRhdGVTZWxlY3QoeyBkYXRlOiBkYXRlIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY3RybFsncmFuZ2VTZWxlY3RlZCddID0gKHN0YXJ0LCBlbmQpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkb05vdFJlb3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgZG9Ob3RSZW9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGN0cmwub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgY2xpY2suJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgZm9jdXMuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkb05vdFJlb3BlbilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IHRoaXMuY3JlYXRlRHJvcERvd24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKTtcclxuICAgICAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZXRoZXIgPSBuZXcgVGV0aGVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiAkZWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QXR0YWNobWVudDogJ2JvdHRvbSBjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50OiAndG9wIGNlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzUHJlZml4OiAnZGF0ZXBpY2tlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE9mZnNldDogJzE0cHggMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0cmFpbnRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86ICd3aW5kb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b2dldGhlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGluOiBbJ3RvcCcsICdsZWZ0JywgJ2JvdHRvbScsICdyaWdodCddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB0ZXRoZXIucG9zaXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYmx1clRpbWVyO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgYmx1ci4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gQWxsb3cgYW55IGNsaWNrIG9uIHRoZSBtZW51IHRvIGNvbWUgdGhyb3VnaCBmaXJzdFxyXG4gICAgICAgICAgICAgICAgYmx1clRpbWVyID0gdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuaXNTZWxlY3RpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICRib2R5Lm9uKGBET01Nb3VzZVNjcm9sbC4keyRzY29wZS4kaWR9IG1vdXNld2hlZWwuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmICghY3RybC5pc1Zpc2libGUpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyBcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYW5ndWxhci5lbGVtZW50KHRoaXMuJHdpbmRvdykub24oYHJlc2l6ZS4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICAkYm9keS5vbihgY2xpY2suJHskc2NvcGUuJGlkfWAsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjdHJsLmlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZW50IHx8ICRlbGVtZW50LmlzKGUudGFyZ2V0KSB8fCBjb250ZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQuY2FuY2VsKGJsdXJUaW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQgJiYgY29udGVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkYm9keS5vZmYoYGNsaWNrLiR7JHNjb3BlLiRpZH0gRE9NTW91c2VTY3JvbGwuJHskc2NvcGUuJGlkfSBtb3VzZXdoZWVsLiR7JHNjb3BlLiRpZH1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudCkgY29udGVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVEcm9wRG93bigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgIHNpbmdsZURhdGVCaW5kaW5nID0gYGRhdGU9XCIke3RoaXMuY29udHJvbGxlckFzfS5kYXRlXCIgb24tZGF0ZS1zZWxlY3Q9XCIke3RoaXMuY29udHJvbGxlckFzfS5kYXRlU2VsZWN0ZWQoZGF0ZSlcImAsXHJcbiAgICAgICAgICAgICAgICByYW5nZUJpbmRpbmcgPSBgc3RhcnQ9XCIke3RoaXMuY29udHJvbGxlckFzfS5zdGFydFwiIGVuZD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmVuZFwiIG9uLXJhbmdlLXNlbGVjdD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LnJhbmdlU2VsZWN0ZWQoc3RhcnQsZW5kKVwiYCxcclxuICAgICAgICAgICAgICAgIGJpbmRpbmdzID0gY3RybC5pc1NpbmdsZURhdGUgPyBzaW5nbGVEYXRlQmluZGluZyA6IHJhbmdlQmluZGluZyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gYDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWRyb3Bkb3duXCIgbmctY2xhc3M9XCJ7J2RhdGVwaWNrZXItb3Blbic6JHt0aGlzLmNvbnRyb2xsZXJBc30uaXNWaXNpYmxlfVwiPjxkYXRlLXBpY2tlciBtaW4tdmlldz1cIiR7JGF0dHJzLm1pblZpZXd9XCIgaXMtc2VsZWN0aW5nPVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uaXNTZWxlY3RpbmdcIiAke2JpbmRpbmdzfVwiIGhpZ2hsaWdodGVkPVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uaGlnaGxpZ2h0ZWRcIj48L2RhdGUtcGlja2VyPjwvZGl2PmAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gJGVsZW1lbnQucG9zaXRpb24oKSxcclxuICAgICAgICAgICAgICAgIGhlaWdodCA9ICRlbGVtZW50Lm91dGVySGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICBtYXJnaW4gPSAoJGVsZW1lbnQub3V0ZXJIZWlnaHQodHJ1ZSkgLSBoZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gbWFyZ2luIC8gMiArIGhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnRlbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRvcDogcG9zaXRpb24udG9wICsgb2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgbGVmdDogcG9zaXRpb24ubGVmdFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGNvbXBpbGUoY29udGVudCkoJHNjb3BlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldmVudERlZmF1bHQoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzRXNjYXBlKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUud2hpY2ggPT09IDI3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ29udGVudCgkc2NvcGUpIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gdGhpcy4kdGVtcGxhdGVDYWNoZS5nZXQodGhpcy5jYWxlbmRhclRlbXBsYXRlKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLiRjb21waWxlKGNvbnRlbnQpKCRzY29wZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF5U2VsZWN0KCRzY29wZSwgJGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgIGRheUNzcyA9ICcuZGF0ZVBpY2tlckRheXMtZGF5JyxcclxuICAgICAgICAgICAgICAgICRib2R5ID0gYW5ndWxhci5lbGVtZW50KCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICBtb3VzZURvd24gPSBgbW91c2Vkb3duLiR7JHNjb3BlLiRpZH1gLFxyXG4gICAgICAgICAgICAgICAgbW91c2VVcCA9IGBtb3VzZXVwLiR7JHNjb3BlLiRpZH1gO1xyXG5cclxuICAgICAgICAgICAgdmFyIG9uU2VsZWN0ZWQgPSByYW5nZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF5cyA9IHRoaXMuZ2V0RGF5cyhyYW5nZSwgY3RybCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VEb3duLCBkYXlDc3MsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0geyBzdGFydDogZSwgZW5kOiBlIH07XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzU2VsZWN0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYm9keS5vbihtb3VzZVVwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkub2ZmKG1vdXNlVXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhbmdlU2VsZWN0KCRzY29wZSwgJGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgICRib2R5ID0gYW5ndWxhci5lbGVtZW50KCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICBtb3VzZURvd24gPSBgbW91c2Vkb3duLiR7JHNjb3BlLiRpZH1gLFxyXG4gICAgICAgICAgICAgICAgbW91c2VPdmVyID0gYG1vdXNlb3Zlci4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIG1vdXNlVXAgPSBgbW91c2V1cC4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIGRheUNzcyA9ICcuZGF0ZVBpY2tlckRheXMtZGF5JztcclxuXHJcbiAgICAgICAgICAgIHZhciBvblNlbGVjdGluZyA9IHJhbmdlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXlzID0gdGhpcy5nZXREYXlzKHJhbmdlLCBjdHJsKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0aW5nKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG9uU2VsZWN0ZWQgPSByYW5nZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF5cyA9IHRoaXMuZ2V0RGF5cyhyYW5nZSwgY3RybCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VEb3duLCBkYXlDc3MsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0geyBzdGFydDogZSwgZW5kOiBlIH07XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzU2VsZWN0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vbihtb3VzZU92ZXIsIGRheUNzcywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UuZW5kID0gZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGluZyhyYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYm9keS5vbihtb3VzZVVwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKG1vdXNlT3Zlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkub2ZmKG1vdXNlVXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwLmRpcmVjdGl2ZSgnZGF0ZVBpY2tlcicsIERhdGVQaWNrZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG5cclxuICAgIC8vIERhdGVQaWNrZXJSYW5nZVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICBzdGFydDogc3RyaW5nO1xyXG4gICAgICAgIGVuZDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJSYW5nZSBpbXBsZW1lbnRzIElEYXRlUGlja2VyUmFuZ2Uge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBhbnksIGVuZDogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBtU3RhcnQgPSBtb21lbnQoc3RhcnQpO1xyXG4gICAgICAgICAgICB2YXIgbUVuZCA9IG1vbWVudChlbmQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1FbmQuaXNCZWZvcmUobVN0YXJ0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBtU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBtU3RhcnQgPSBtRW5kO1xyXG4gICAgICAgICAgICAgICAgbUVuZCA9IHRlbXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBtU3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbUVuZC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0OiBzdHJpbmc7XHJcbiAgICAgICAgZW5kOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlck1vbnRoXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyTW9udGgge1xyXG4gICAgICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJNb250aCBpbXBsZW1lbnRzIElEYXRlUGlja2VyTW9udGgge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBtID0gbW9tZW50KCk7XHJcbiAgICAgICAgICAgIHZhciB0aGlzTW9udGggPSBtLm1vbnRoKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG0ubW9udGgodmFsdWUpLmZvcm1hdCgnTU1NJyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50TW9udGggPSB2YWx1ZSA9PT0gdGhpc01vbnRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERhdGVQaWNrZXJNb250aFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlclllYXIge1xyXG4gICAgICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICAgICAgaXNDdXJyZW50WWVhcjogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyWWVhciBpbXBsZW1lbnRzIElEYXRlUGlja2VyWWVhciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRZZWFyID0gdmFsdWUgPT09IG1vbWVudCgpLnllYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzQ3VycmVudFllYXI6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSURhdGVQaWNrZXJEYXlcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJEYXkge1xyXG4gICAgICAgIGRhdGU6IG51bWJlcjtcclxuICAgICAgICB2YWx1ZTogYW55O1xyXG4gICAgICAgIGlzVG9kYXk6IGJvb2xlYW47XHJcbiAgICAgICAgaXNOb3RJbk1vbnRoOiBib29sZWFuO1xyXG4gICAgICAgIGlzU2VsZWN0aW5nOiBib29sZWFuO1xyXG4gICAgICAgIGlzQmVmb3JlKGRheTogSURhdGVQaWNrZXJEYXkpOiBib29sZWFuO1xyXG4gICAgICAgIGlzU2FtZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyRGF5IGltcGxlbWVudHMgSURhdGVQaWNrZXJEYXkge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGZyb21EYXRlOiBhbnksIGRheU9mV2VlazogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBtb21lbnQoZGF5T2ZXZWVrKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlID0gdGhpcy52YWx1ZS5kYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNUb2RheSA9IGRheU9mV2Vlay5pc1NhbWUobW9tZW50KCksICdkYXknKTtcclxuICAgICAgICAgICAgdGhpcy5pc05vdEluTW9udGggPSAhdGhpcy52YWx1ZS5pc1NhbWUoZnJvbURhdGUsICdtb250aCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0ZTogbnVtYmVyO1xyXG4gICAgICAgIHZhbHVlOiBhbnk7XHJcbiAgICAgICAgaXNUb2RheTogYm9vbGVhbjtcclxuICAgICAgICBpc05vdEluTW9udGg6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGlzQmVmb3JlKGRheTogSURhdGVQaWNrZXJEYXkpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGlzQmVmb3JlID0gdGhpcy52YWx1ZS5pc0JlZm9yZShkYXkudmFsdWUsICdkYXknKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzQmVmb3JlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNTYW1lKGRheTogSURhdGVQaWNrZXJEYXkpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGlzU2FtZSA9IHRoaXMudmFsdWUuaXNTYW1lKGRheS52YWx1ZSwgJ2RheScpO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNTYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBEYXRlUGlja2VyU2VydmljZVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlclNlcnZpY2Uge1xyXG4gICAgICAgIGdldE1vbnRocygpOiBJRGF0ZVBpY2tlck1vbnRoW107XHJcbiAgICAgICAgZ2V0RGF5c09mV2VlaygpOiBzdHJpbmdbXTtcclxuICAgICAgICBnZXRZZWFycyhmcm9tRGF0ZSk6IElEYXRlUGlja2VyWWVhcltdO1xyXG4gICAgICAgIGdldFdlZWsoZnJvbURhdGUsIHN0YXJ0T2ZXZWVrKTogSURhdGVQaWNrZXJEYXlbXTtcclxuICAgICAgICBnZXRSYW5nZURheXMoc3RhcnQ6IElEYXRlUGlja2VyRGF5LCBlbmQ6IElEYXRlUGlja2VyRGF5LCB3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKTogSURhdGVQaWNrZXJEYXlbXTtcclxuICAgICAgICBkZXNlbGVjdEFsbCh3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKTtcclxuICAgICAgICBzZWxlY3REYXlzKGRheXM6IElEYXRlUGlja2VyRGF5W10pO1xyXG4gICAgICAgIGlucHV0VG9Nb21lbnQodmFsdWU6IHN0cmluZyk6IGFueTtcclxuICAgICAgICBpbnB1dFRvUmFuZ2UodmFsdWU6IHN0cmluZyk6IElEYXRlUGlja2VyUmFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlclNlcnZpY2UgaW1wbGVtZW50cyBJRGF0ZVBpY2tlclNlcnZpY2Uge1xyXG4gICAgICAgIGdldE1vbnRocygpOiBJRGF0ZVBpY2tlck1vbnRoW10ge1xyXG4gICAgICAgICAgICB2YXIgbW9udGhzID0gbmV3IEFycmF5PElEYXRlUGlja2VyTW9udGg+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG1vbnRocy5wdXNoKG5ldyBEYXRlUGlja2VyTW9udGgoaSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbW9udGhzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0WWVhcnMoZnJvbURhdGUpOiBJRGF0ZVBpY2tlclllYXJbXSB7XHJcbiAgICAgICAgICAgIHZhciBmcm9tWWVhciA9IG1vbWVudChmcm9tRGF0ZSkueWVhcigpLFxyXG4gICAgICAgICAgICAgICAgeWVhcnMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJZZWFyPigpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGZyb21ZZWFyOyBpIDw9IChmcm9tWWVhciArIDgpOyBpKyspXHJcbiAgICAgICAgICAgICAgICB5ZWFycy5wdXNoKG5ldyBEYXRlUGlja2VyWWVhcihpKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geWVhcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRXZWVrKGZyb21EYXRlLCBzdGFydE9mV2Vlayk6IElEYXRlUGlja2VyRGF5W10ge1xyXG4gICAgICAgICAgICB2YXIgZW5kT2ZXZWVrID0gbW9tZW50KHN0YXJ0T2ZXZWVrKS5lbmRPZignd2VlaycpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRheXMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJEYXk+KCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGRheU9mV2VlayA9IG1vbWVudChzdGFydE9mV2Vlayk7IGRheU9mV2Vlay5pc0JlZm9yZShlbmRPZldlZWspOyBkYXlPZldlZWsuYWRkKDEsICdkYXlzJykpIHtcclxuICAgICAgICAgICAgICAgIGRheXMucHVzaChuZXcgRGF0ZVBpY2tlckRheShmcm9tRGF0ZSwgZGF5T2ZXZWVrKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0RGF5c09mV2VlaygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQubG9jYWxlRGF0YSgpLl93ZWVrZGF5c1Nob3J0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0UmFuZ2VEYXlzKHN0YXJ0OiBJRGF0ZVBpY2tlckRheSwgZW5kOiBJRGF0ZVBpY2tlckRheSwgd2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSk6IElEYXRlUGlja2VyRGF5W10ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVuZC5pc0JlZm9yZShzdGFydCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IGVuZDtcclxuICAgICAgICAgICAgICAgIGVuZCA9IHRlbXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhbGxEYXlzID0gbmV3IEFycmF5PElEYXRlUGlja2VyRGF5PigpLFxyXG4gICAgICAgICAgICAgICAgaXNBZGRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHdlZWtzLmZvckVhY2god2VlayA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZWVrLmZvckVhY2goZGF5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5LmlzU2FtZShzdGFydCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWRkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQWRkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbERheXMucHVzaChkYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRheS5pc1NhbWUoZW5kKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBZGRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxEYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVzZWxlY3RBbGwod2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSkge1xyXG4gICAgICAgICAgICB3ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2Vlay5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5LmlzU2VsZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3REYXlzKGRheXM6IElEYXRlUGlja2VyRGF5W10pIHtcclxuICAgICAgICAgICAgZGF5cy5mb3JFYWNoKGRheSA9PiBkYXkuaXNTZWxlY3RpbmcgPSB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0VG9Nb21lbnQodmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgICAgIHZhciBsYW5nID0gbW9tZW50LmxvY2FsZURhdGEoKTtcclxuICAgICAgICAgICAgdmFyIGZvcm1hdHMgPSBbXHJcbiAgICAgICAgICAgICAgICBsYW5nLmxvbmdEYXRlRm9ybWF0KFwibFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKSxcclxuICAgICAgICAgICAgICAgIGxhbmcubG9uZ0RhdGVGb3JtYXQoXCJMXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gIC9nLCAnICcpXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG1vbWVudCh2YWx1ZSwgZm9ybWF0cyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXRUb1JhbmdlKHZhbHVlOiBzdHJpbmcpOiBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgIXZhbHVlLnRyaW0oKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgdmFyIHRyaW1tZWQgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnRyaW0oKTtcclxuICAgICAgICAgICAgdmFyIGV4cFN0YXJ0ID0gbmV3IFJlZ0V4cChcIl4oKFswLTldezEsNH1bIF0qKXszfSlcIik7XHJcbiAgICAgICAgICAgIHZhciBleHBFbmQgPSBuZXcgUmVnRXhwKFwiKChbMC05XXsxLDR9WyBdKil7M30pJFwiKTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0UmVzdWx0ID0gZXhwU3RhcnQuZXhlYyh0cmltbWVkKTtcclxuICAgICAgICAgICAgdmFyIGVuZFJlc3VsdCA9IGV4cEVuZC5leGVjKHRyaW1tZWQpO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmlucHV0VG9Nb21lbnQoc3RhcnRSZXN1bHRbMF0udHJpbSgpKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMuaW5wdXRUb01vbWVudCgoZW5kUmVzdWx0WzBdIHx8IHN0YXJ0UmVzdWx0WzBdKS50cmltKCkpO1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBuZXcgRGF0ZVBpY2tlclJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcC5zZXJ2aWNlKCdkYXRlUGlja2VyU2VydmljZScsIERhdGVQaWNrZXJTZXJ2aWNlKTtcclxufSJdfQ==