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
                    case DatePickerView.Months:
                        return this.years[0].value + " - " + this.years[8].value;
                    case DatePickerView.Years:
                        return this._dateInternal.format('YYYY');
                    default:
                    case DatePickerView.Days:
                        return this._dateInternal.format('MMMM YYYY');
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
        DatePickerController.prototype.setMonth = function (month) {
            this.dateInternal = this.dateInternal.set('month', month);
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
            this.name = m.month(value).format('MMM');
            this.isCurrentMonth = value === m.month();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZ2xvYmFscy50cyIsIi4uL3NyYy9hbmd1bGFyLnRzIiwiLi4vc3JjL2FwcC50cyIsIi4uL3NyYy9kYXRlLXBpY2tlci50cyIsIi4uL3NyYy9kYXRlLXBpY2tlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbIkRhdGVQaWNrZXJNb2R1bGUiLCJEYXRlUGlja2VyTW9kdWxlLk1vZHVsZSIsIkRhdGVQaWNrZXJNb2R1bGUuTW9kdWxlLmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5Nb2R1bGUuY29uZmlnIiwiRGF0ZVBpY2tlck1vZHVsZS5Nb2R1bGUucnVuIiwiRGF0ZVBpY2tlck1vZHVsZS5Nb2R1bGUuZGlyZWN0aXZlIiwiRGF0ZVBpY2tlck1vZHVsZS5Nb2R1bGUuZmlsdGVyIiwiRGF0ZVBpY2tlck1vZHVsZS5Nb2R1bGUuc2VydmljZSIsIkRhdGVQaWNrZXJNb2R1bGUuTW9kdWxlLnByb3ZpZGVyIiwiRGF0ZVBpY2tlck1vZHVsZS5Nb2R1bGUuZmFjdG9yeSIsIkRhdGVQaWNrZXJNb2R1bGUuTW9kdWxlLmNvbnN0YW50IiwiRGF0ZVBpY2tlck1vZHVsZS5GaWx0ZXJGYWN0b3J5IiwiRGF0ZVBpY2tlck1vZHVsZS5GaWx0ZXJGYWN0b3J5LmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5GaWx0ZXJGYWN0b3J5LmNyZWF0ZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGlyZWN0aXZlRmFjdG9yeSIsIkRhdGVQaWNrZXJNb2R1bGUuRGlyZWN0aXZlRmFjdG9yeS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGlyZWN0aXZlRmFjdG9yeS5jcmVhdGUiLCJEYXRlUGlja2VyTW9kdWxlLkFjdGl2YXRvciIsIkRhdGVQaWNrZXJNb2R1bGUuQWN0aXZhdG9yLmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5BY3RpdmF0b3IuY3JlYXRlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyVmlldyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5kYXRlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zdGFydCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuZW5kIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5kYXRlSW50ZXJuYWwiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnRpdGxlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci52aWV3VHlwZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2hvd0RheXMiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNob3dNb250aHMiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNob3dZZWFycyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuY2FsY3VsYXRlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5pc1NlbGVjdGVkIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5pc0hpZ2hsaWdodGVkIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZWxlY3RpbmciLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNlbGVjdGVkIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZWxlY3RlZERhdGUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNlbGVjdGVkUmFuZ2UiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnNlbGVjdE1vbnRoIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5zZXRNb250aCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2VsZWN0WWVhciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIuc2V0WWVhciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIucHJldk1vbnRoIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5uZXh0TW9udGgiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJDb250cm9sbGVyLnByZXZZZWFyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5uZXh0WWVhciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckNvbnRyb2xsZXIucHJldlJhbmdlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyQ29udHJvbGxlci5uZXh0UmFuZ2UiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUubGlua0lucHV0IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmxpbmtFbGVtZW50IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmxpbmtJbmxpbmUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUuZ2V0RGF5cyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRpcmVjdGl2ZS5wb3BvdmVyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmNyZWF0ZURyb3BEb3duIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLnByZXZlbnREZWZhdWx0IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmlzRXNjYXBlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLmNyZWF0ZUNvbnRlbnQiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJEaXJlY3RpdmUuZGF5U2VsZWN0IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyRGlyZWN0aXZlLnJhbmdlU2VsZWN0IiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyUmFuZ2UiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJSYW5nZS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlck1vbnRoIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyTW9udGguY29uc3RydWN0b3IiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJZZWFyIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyWWVhci5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRheSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRheS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRheS5pc0JlZm9yZSIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlckRheS5pc1NhbWUiLCJEYXRlUGlja2VyTW9kdWxlLkRhdGVQaWNrZXJTZXJ2aWNlIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5jb25zdHJ1Y3RvciIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZ2V0TW9udGhzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5nZXRZZWFycyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZ2V0V2VlayIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZ2V0RGF5c09mV2VlayIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuZ2V0UmFuZ2VEYXlzIiwiRGF0ZVBpY2tlck1vZHVsZS5EYXRlUGlja2VyU2VydmljZS5kZXNlbGVjdEFsbCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2Uuc2VsZWN0RGF5cyIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb01vbWVudCIsIkRhdGVQaWNrZXJNb2R1bGUuRGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb1JhbmdlIl0sIm1hcHBpbmdzIjoiQUNBQSxJQUFPLGdCQUFnQixDQTRLdEI7QUE1S0QsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBRXJCQTtRQUdJQyxnQkFBWUEsSUFBSUEsRUFBRUEsT0FBT0E7WUFDckJDLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBO1FBQ2hEQSxDQUFDQTtRQUVERCx1QkFBTUEsR0FBTkEsVUFBT0EsU0FBU0E7WUFDWkUsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVERixvQkFBR0EsR0FBSEEsVUFBSUEsTUFBTUE7WUFDTkcsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFDeEJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVESCwwQkFBU0EsR0FBVEEsVUFBVUEsSUFBWUEsRUFBRUEsU0FBU0E7WUFDN0JJLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFD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QSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNsQkEsQ0FBQ0E7UUFFREYsb0NBQVFBLEdBQVJBLFVBQVNBLFFBQVFBO1lBQ2JHLElBQUlBLFFBQVFBLEdBQUdBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLEVBQ2xDQSxLQUFLQSxHQUFHQSxJQUFJQSxLQUFLQSxFQUFtQkEsQ0FBQ0E7WUFFekNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLFFBQVFBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBO2dCQUMzQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFdENBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1FBQ2pCQSxDQUFDQTtRQUVESCxtQ0FBT0EsR0FBUEEsVUFBUUEsUUFBUUEsRUFBRUEsV0FBV0E7WUFDekJJLElBQUlBLFNBQVNBLEdBQUdBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBRWxEQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxLQUFLQSxFQUFrQkEsQ0FBQ0E7WUFDdkNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLFNBQVNBLEdBQUdBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLEVBQUVBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLEVBQUVBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBO2dCQUNoR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsYUFBYUEsQ0FBQ0EsUUFBUUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdERBLENBQUNBO1lBRURBLE1BQU1BLENBQUNBLElBQUlB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QSxDQUFDQSxLQUFLQSxDQUFDQTtRQUNqQkEsQ0FBQ0E7UUFDTFYsd0JBQUNBO0lBQURBLENBQUNBLEFBNUdEeEUsSUE0R0NBO0lBRURBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLG1CQUFtQkEsRUFBRUEsaUJBQWlCQSxDQUFDQSxDQUFDQTtBQUN4REEsQ0FBQ0EsRUEzTk0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQTJOdEIiLCJzb3VyY2VzQ29udGVudCI6WyJkZWNsYXJlIHZhciBhbmd1bGFyOiBhbnk7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDogYW55O1xyXG5kZWNsYXJlIHZhciBUZXRoZXI6IGFueTsiLCJtb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1vZHVsZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBtb2R1bGU7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZHVsZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShuYW1lLCBtb2R1bGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbmZpZyhhcHBDb25maWcpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2R1bGUuY29uZmlnKGFwcENvbmZpZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcnVuKGFwcFJ1bikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZS5ydW4oYXBwUnVuKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkaXJlY3RpdmUobmFtZTogc3RyaW5nLCBkaXJlY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2R1bGUuZGlyZWN0aXZlKG5hbWUsIERpcmVjdGl2ZUZhY3RvcnkuY3JlYXRlKGRpcmVjdGl2ZSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpbHRlcihuYW1lOiBzdHJpbmcsIGZpbHRlcikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZS5maWx0ZXIobmFtZSwgRmlsdGVyRmFjdG9yeS5jcmVhdGUoZmlsdGVyKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VydmljZShuYW1lOiBzdHJpbmcsIHNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2R1bGUuc2VydmljZShuYW1lLCBzZXJ2aWNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm92aWRlcihuYW1lOiBzdHJpbmcsIHByb3ZpZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kdWxlLnByb3ZpZGVyKG5hbWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmYWN0b3J5KG5hbWU6IHN0cmluZywgZmFjdG9yeSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZS5mYWN0b3J5KG5hbWUsIGZhY3RvcnkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0YW50KG5hbWU6IHN0cmluZywgdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2R1bGUuY29uc3RhbnQobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmlsdGVyc1xyXG4gICAgY2xhc3MgRmlsdGVyRmFjdG9yeSB7XHJcbiAgICAgICAgc3RhdGljIGNyZWF0ZSh0eXBlOiBJQWN0aXZhdG9yQ2xhc3MpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyID0gKC4uLmluamVjdDogYW55W10pID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IEFjdGl2YXRvci5jcmVhdGUodHlwZSwgaW5qZWN0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoLi4ub3B0aW9uczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2UuZmlsdGVyLmFwcGx5KGluc3RhbmNlLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZpbHRlcltcIiRpbmplY3RcIl0gPSB0eXBlW1wiJGluamVjdFwiXTtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGlyZWN0aXZlc1xyXG4gICAgY2xhc3MgRGlyZWN0aXZlRmFjdG9yeSB7XHJcbiAgICAgICAgc3RhdGljIGNyZWF0ZSh0eXBlOiBJQWN0aXZhdG9yQ2xhc3MpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgZGlyZWN0aXZlID0gKC4uLmluamVjdDogYW55W10pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBY3RpdmF0b3IuY3JlYXRlKHR5cGUsIGluamVjdCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRpcmVjdGl2ZVtcIiRpbmplY3RcIl0gPSB0eXBlW1wiJGluamVjdFwiXTtcclxuICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWN0aXZhdG9yXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElBY3RpdmF0b3JDbGFzcyB7XHJcbiAgICAgICAgbmV3ICguLi5wYXJhbXM6IGFueVtdKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQWN0aXZhdG9yIHtcclxuICAgICAgICBzdGF0aWMgY3JlYXRlKHR5cGU6IElBY3RpdmF0b3JDbGFzcywgcGFyYW1zOiBhbnlbXSkge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBPYmplY3QuY3JlYXRlKHR5cGUucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuY29uc3RydWN0b3IuYXBwbHkoaW5zdGFuY2UsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGFyZ3MgPSBbbnVsbF0uY29uY2F0KHBhcmFtcyk7XHJcbiAgICAgICAgICAgIC8vdmFyIGZhY3RvcnkgPSB0eXBlLmJpbmQuYXBwbHkodHlwZSwgYXJncyk7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIG5ldyBmYWN0b3J5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByb21pc2VcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVByb21pc2U8VD4ge1xyXG4gICAgICAgIHRoZW4oc3VjY2VzczogSVByb21pc2VDYWxsYmFjazxUPiwgZXJyb3I/OiBJUHJvbWlzZUNhbGxiYWNrPGFueT4sIG5vdGlmeT86IElQcm9taXNlQ2FsbGJhY2s8YW55Pik6IElQcm9taXNlPFQ+O1xyXG4gICAgICAgIGNhdGNoKGVycm9yOiBJUHJvbWlzZUNhbGxiYWNrPGFueT4pOiBJUHJvbWlzZTxUPjtcclxuICAgICAgICBmaW5hbGx5KGNhbGxiYWNrOiBJUHJvbWlzZUNhbGxiYWNrPFQ+LCBub3RpZnk/OiBJUHJvbWlzZUNhbGxiYWNrPGFueT4pOiBJUHJvbWlzZTxUPjtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQcm9taXNlQ2FsbGJhY2s8VD4ge1xyXG4gICAgICAgIChyZXN1bHQ6IFQpOiBhbnk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gJHFcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURlZmVycmFibGUge1xyXG4gICAgICAgIDxUPihyZXNvbHZlOiBhbnksIHJlamVjdDogYW55KTogSVByb21pc2U8VD47XHJcbiAgICAgICAgZGVmZXIoKTogSURlZmVycmVkPHZvaWQ+O1xyXG4gICAgICAgIGRlZmVyPFQ+KCk6IElEZWZlcnJlZDxUPjtcclxuICAgICAgICB3aGVuPFQ+KHZhbHVlOiBhbnkpOiBJUHJvbWlzZTxUPjtcclxuICAgICAgICByZXNvbHZlPFQ+KHZhbHVlOiBUKTogSVByb21pc2U8VD47XHJcbiAgICAgICAgYWxsKC4uLnByb21pc2VzOiBJUHJvbWlzZTxhbnk+W10pOiBJUHJvbWlzZTxhbnk+O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURlZmVycmVkPFQ+IHtcclxuICAgICAgICBub3RpZnkodmFsdWU6IGFueSk7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIHJlc29sdmUodmFsdWU6IFQpO1xyXG4gICAgICAgIHJlamVjdChyZWFzb246IGFueSk7XHJcbiAgICAgICAgcHJvbWlzZTogSVByb21pc2U8VD47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gJGh0dHBcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUh0dHBSZXF1ZXN0IHtcclxuICAgICAgICBwb3N0KHVybDogc3RyaW5nLCBkYXRhPzogYW55LCBjb25maWc/OiBJSHR0cENvbmZpZyk6IElIdHRwUHJvbWlzZTx2b2lkPjtcclxuICAgICAgICBwdXQodXJsOiBzdHJpbmcsIGRhdGE6IGFueSwgY29uZmlnPzogSUh0dHBDb25maWcpOiBJSHR0cFByb21pc2U8dm9pZD47XHJcbiAgICAgICAgZGVsZXRlKHVybDogc3RyaW5nLCBjb25maWc/OiBJSHR0cENvbmZpZyk6IElIdHRwUHJvbWlzZTx2b2lkPjtcclxuICAgICAgICBqc29ucCh1cmw6IHN0cmluZywgY29uZmlnPzogSUh0dHBDb25maWcpOiBJSHR0cFByb21pc2U8dm9pZD47XHJcbiAgICAgICAgcGF0Y2godXJsOiBzdHJpbmcsIGRhdGE6IGFueSwgY29uZmlnPzogSUh0dHBDb25maWcpOiBJSHR0cFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgICAgIGdldDxUPih1cmw6IHN0cmluZywgY29uZmlnPzogSUh0dHBDb25maWcpOiBJSHR0cFByb21pc2U8VD47XHJcbiAgICAgICAgaGVhZDxUPih1cmw6IHN0cmluZywgY29uZmlnPzogSUh0dHBDb25maWcpOiBJSHR0cFByb21pc2U8VD47XHJcbiAgICAgICAgcG9zdDxUPih1cmw6IHN0cmluZywgZGF0YT86IGFueSwgY29uZmlnPzogSUh0dHBDb25maWcpOiBJSHR0cFByb21pc2U8VD47XHJcbiAgICAgICAgcHV0PFQ+KHVybDogc3RyaW5nLCBkYXRhOiBhbnksIGNvbmZpZz86IElIdHRwQ29uZmlnKTogSUh0dHBQcm9taXNlPFQ+O1xyXG4gICAgICAgIGRlbGV0ZTxUPih1cmw6IHN0cmluZywgY29uZmlnPzogSUh0dHBDb25maWcpOiBJSHR0cFByb21pc2U8VD47XHJcbiAgICAgICAganNvbnA8VD4odXJsOiBzdHJpbmcsIGNvbmZpZz86IElIdHRwQ29uZmlnKTogSUh0dHBQcm9taXNlPFQ+O1xyXG4gICAgICAgIHBhdGNoPFQ+KHVybDogc3RyaW5nLCBkYXRhOiBhbnksIGNvbmZpZz86IElIdHRwQ29uZmlnKTogSUh0dHBQcm9taXNlPFQ+O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUh0dHBDb25maWcge1xyXG4gICAgICAgIG1ldGhvZD86IHN0cmluZztcclxuICAgICAgICB1cmw/OiBzdHJpbmc7XHJcbiAgICAgICAgcGFyYW1zPzogYW55O1xyXG4gICAgICAgIGRhdGE/OiBhbnk7XHJcbiAgICAgICAgaGVhZGVyPzogYW55O1xyXG4gICAgICAgIHhzcmZIZWFkZXJOYW1lPzogc3RyaW5nO1xyXG4gICAgICAgIHhzcmZDb29raWVOYW1lPzogc3RyaW5nO1xyXG4gICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q/OiAoZGF0YTogYW55LCBoZWFkZXJzR2V0dGVyOiBhbnkpID0+IHZvaWQ7XHJcbiAgICAgICAgdHJhbnNmb3JtUmVzcG9uc2U/OiAoZGF0YTogYW55LCBoZWFkZXJzR2V0dGVyOiBhbnksIHN0YXR1czogYW55KSA9PiB2b2lkO1xyXG4gICAgICAgIHBhcmFtU2VyaWFsaXplcj86IChwYXJhbTogeyBrZXk6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9KSA9PiBzdHJpbmc7XHJcbiAgICAgICAgY2FjaGU/OiBhbnk7XHJcbiAgICAgICAgdGltZW91dD86IGFueTtcclxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xyXG4gICAgICAgIHJlc3BvbnNlVHlwZT86IHN0cmluZztcclxuICAgICAgICBoZWFkZXJzPzogYW55O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUh0dHBQcm9taXNlPFQ+IGV4dGVuZHMgSUh0dHBQcm9taXNlQ2FsbGJhY2s8VD4ge1xyXG4gICAgICAgIHN1Y2Nlc3MoY2FsbGJhY2s6IElIdHRwUHJvbWlzZVJlc3VsdDxUPik6IElQcm9taXNlPFQ+O1xyXG4gICAgICAgIGVycm9yKGNhbGxiYWNrOiBJSHR0cFByb21pc2VSZXN1bHQ8YW55Pik6IElQcm9taXNlPFQ+O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUh0dHBQcm9taXNlQ2FsbGJhY2s8VD4gZXh0ZW5kcyBJUHJvbWlzZTxJSHR0cFByb21pc2VSZXN1bHQ8VD4+IHtcclxuICAgICAgICAvLyBBbiBpbnRlcmZhY2UgZm9yIHJldHVybmluZyBmcm9tIGFuIGh0dHAgdGhlbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElIdHRwUHJvbWlzZVJlc3VsdDxUPiB7XHJcbiAgICAgICAgZGF0YTogVDtcclxuICAgICAgICBzdGF0dXM/OiBudW1iZXI7XHJcbiAgICAgICAgaGVhZGVycz86IChoZWFkZXJOYW1lOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICAgICAgY29uZmlnPzogSUh0dHBDb25maWc7XHJcbiAgICAgICAgc3RhdHVzVGV4dD86IHN0cmluZztcclxuICAgIH1cclxufSIsInZhciBhcHAgPSBuZXcgRGF0ZVBpY2tlck1vZHVsZS5Nb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIiwgW10pOyIsIlxyXG5tb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcblxyXG4gICAgZW51bSBEYXRlUGlja2VyVmlldyB7XHJcbiAgICAgICAgRGF5cyA9IDAsXHJcbiAgICAgICAgTW9udGhzID0gMSxcclxuICAgICAgICBZZWFycyA9IDJcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyQ29udHJvbGxlciB7XHJcblxyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnLCAnZGF0ZVBpY2tlclNlcnZpY2UnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMsIHByaXZhdGUgZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vbnRoTmFtZXMgPSBkYXRlUGlja2VyU2VydmljZS5nZXRNb250aHMoKTtcclxuICAgICAgICAgICAgdGhpcy5kYXlzT2ZXZWVrID0gZGF0ZVBpY2tlclNlcnZpY2UuZ2V0RGF5c09mV2VlaygpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoICgkYXR0cnMubWluVmlldykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3LlllYXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3LlllYXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5Nb250aHM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WaWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3LkRheXM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNTaW5nbGVEYXRlID0gISgkYXR0cnMuc3RhcnQgIT0gbnVsbCB8fCAkYXR0cnMuZW5kICE9IG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuaXNTaW5nbGVEYXRlID8gdGhpcy5kYXRlIDogdGhpcy5zdGFydDtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGUodGhpcy5kYXRlSW50ZXJuYWwpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNpbmdsZSBEYXRlXHJcbiAgICAgICAgcHJpdmF0ZSBfZGF0ZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgZGF0ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBkYXRlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZClcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5fZGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJhbmdlXHJcbiAgICAgICAgcHJpdmF0ZSBfc3RhcnQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgZ2V0IHN0YXJ0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBzdGFydCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLl9zdGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2VuZDogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgZW5kKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgZW5kKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fZW5kID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkRhdGVTZWxlY3Q7XHJcbiAgICAgICAgb25SYW5nZVNlbGVjdDtcclxuICAgICAgICBpc1NlbGVjdGluZzogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgdmlldzogRGF0ZVBpY2tlclZpZXc7XHJcbiAgICAgICAgbWluVmlldzogRGF0ZVBpY2tlclZpZXc7XHJcbiAgICAgICAgd2Vla3M6IElEYXRlUGlja2VyRGF5W11bXTtcclxuICAgICAgICB5ZWFyczogSURhdGVQaWNrZXJZZWFyW107XHJcbiAgICAgICAgbW9udGhOYW1lczogSURhdGVQaWNrZXJNb250aFtdO1xyXG4gICAgICAgIGRheXNPZldlZWs6IHN0cmluZ1tdO1xyXG4gICAgICAgIGlzVmlzaWJsZTogYm9vbGVhbjtcclxuICAgICAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcclxuICAgICAgICBpc29Gb3JtYXQgPSAnWVlZWS1NTS1ERCc7XHJcbiAgICAgICAgaXNTaW5nbGVEYXRlOiBib29sZWFuO1xyXG4gICAgICAgIGhpZ2hsaWdodGVkOiBzdHJpbmdbXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfZGF0ZUludGVybmFsO1xyXG5cclxuICAgICAgICBnZXQgZGF0ZUludGVybmFsKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGRhdGVJbnRlcm5hbCh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBtID0gdmFsdWUgIT0gbnVsbCA/IG1vbWVudCh2YWx1ZSkgOiBtb21lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0ZUludGVybmFsID0gbTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSh0aGlzLl9kYXRlSW50ZXJuYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHRpdGxlKCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5Nb250aHM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMueWVhcnNbMF0udmFsdWV9IC0gJHt0aGlzLnllYXJzWzhdLnZhbHVlfWA7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LlllYXJzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5EYXlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWwuZm9ybWF0KCdNTU1NIFlZWVknKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHZpZXdUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3Lk1vbnRoczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJtb250aHNcIjtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuWWVhcnM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwieWVhcnNcIjtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LkRheXM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZGF5c1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaG93RGF5cygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA+IERhdGVQaWNrZXJWaWV3LkRheXMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3LkRheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaG93TW9udGhzKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID4gRGF0ZVBpY2tlclZpZXcuTW9udGhzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5Nb250aHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaG93WWVhcnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3LlllYXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FsY3VsYXRlKGZyb21EYXRlKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IG1vbWVudChmcm9tRGF0ZSkuc3RhcnRPZignbW9udGgnKS5zdGFydE9mKCd3ZWVrJyksXHJcbiAgICAgICAgICAgICAgICBlbmQgPSBtb21lbnQoZnJvbURhdGUpLmVuZE9mKCdtb250aCcpLmVuZE9mKCd3ZWVrJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndlZWtzID0gbmV3IEFycmF5PElEYXRlUGlja2VyRGF5W10+KCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGRheSA9IG1vbWVudChzdGFydCk7IGRheS5pc0JlZm9yZShlbmQpOyBkYXkuYWRkKDEsICd3ZWVrJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciB3ZWVrID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5nZXRXZWVrKGZyb21EYXRlLCBkYXkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrcy5wdXNoKHdlZWspO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnllYXJzID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5nZXRZZWFycyhmcm9tRGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1NlbGVjdGVkKGRheTogSURhdGVQaWNrZXJEYXkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVEYXRlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudCh0aGlzLmRhdGUpLmlzU2FtZShkYXkudmFsdWUsICdkYXknKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXkudmFsdWUuaXNCZXR3ZWVuKHRoaXMuc3RhcnQsIHRoaXMuZW5kLCAnZGF5JykgfHxcclxuICAgICAgICAgICAgICAgIGRheS52YWx1ZS5pc1NhbWUodGhpcy5zdGFydCwgJ2RheScpIHx8XHJcbiAgICAgICAgICAgICAgICBkYXkudmFsdWUuaXNTYW1lKHRoaXMuZW5kLCAnZGF5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0hpZ2hsaWdodGVkKGRheTogSURhdGVQaWNrZXJEYXkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0ZWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5oaWdobGlnaHRlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5oaWdobGlnaHRlZFtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChtb21lbnQodmFsdWUpLmlzU2FtZShkYXkudmFsdWUsICdkYXknKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RpbmcoZGF5czogSURhdGVQaWNrZXJEYXlbXSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmRlc2VsZWN0QWxsKHRoaXMud2Vla3MpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnNlbGVjdERheXMoZGF5cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZChkYXlzOiBJRGF0ZVBpY2tlckRheVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZGVzZWxlY3RBbGwodGhpcy53ZWVrcyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBkYXlzWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZShzdGFydCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBkYXlzW2RheXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkRGF0ZShkYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IG1vbWVudChkYXkudmFsdWUpLmZvcm1hdCh0aGlzLmlzb0Zvcm1hdCk7XHJcbiAgICAgICAgICAgIHRoaXMub25EYXRlU2VsZWN0KHsgZGF0ZTogdGhpcy5kYXRlIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWRSYW5nZShzdGFydDogSURhdGVQaWNrZXJEYXksIGVuZDogSURhdGVQaWNrZXJEYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1vbWVudChzdGFydC52YWx1ZSkuZm9ybWF0KHRoaXMuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBtb21lbnQoZW5kLnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICB0aGlzLm9uUmFuZ2VTZWxlY3QoeyBzdGFydDogdGhpcy5zdGFydCwgZW5kOiB0aGlzLmVuZCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdE1vbnRoKGlkeCkge1xyXG4gICAgICAgICAgICB2YXIgbW9udGggPSB0aGlzLm1vbnRoTmFtZXNbaWR4XTtcclxuICAgICAgICAgICAgdGhpcy5zZXRNb250aChtb250aC52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPT09IERhdGVQaWNrZXJWaWV3Lk1vbnRocykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gdGhpcy5kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkRhdGVTZWxlY3QoeyBkYXRlOiB0aGlzLmRhdGUgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBtb21lbnQodGhpcy5kYXRlSW50ZXJuYWwpLmVuZE9mKCdtb250aCcpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kID0gbW9tZW50KHRoaXMuZGF0ZUludGVybmFsKS5lbmRPZignbW9udGgnKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUmFuZ2VTZWxlY3QoeyBzdGFydDogdGhpcy5zdGFydCwgZW5kOiB0aGlzLmVuZCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0RheXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldE1vbnRoKG1vbnRoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuc2V0KCdtb250aCcsIG1vbnRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFllYXIoaWR4KSB7XHJcbiAgICAgICAgICAgIHZhciB5ZWFyID0gdGhpcy55ZWFyc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldFllYXIoeWVhci52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPT09IERhdGVQaWNrZXJWaWV3LlllYXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLmRhdGVJbnRlcm5hbC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IHRoaXMuZGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLmRhdGVJbnRlcm5hbCkuc3RhcnRPZigneWVhcicpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kID0gbW9tZW50KHRoaXMuZGF0ZUludGVybmFsKS5lbmRPZigneWVhcicpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiB0aGlzLnN0YXJ0LCBlbmQ6IHRoaXMuZW5kIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93TW9udGhzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRZZWFyKHllYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5zZXQoJ3llYXInLCB5ZWFyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZNb250aCgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5zdWJ0cmFjdCgxLCAnbW9udGhzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0TW9udGgoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuYWRkKDEsICdtb250aHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZZZWFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnN1YnRyYWN0KDEsICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV4dFllYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuYWRkKDEsICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldlJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnN1YnRyYWN0KDksICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV4dFJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLmFkZCg5LCAneWVhcnMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRpbmplY3RvcicsICckY29tcGlsZScsICckdGVtcGxhdGVDYWNoZScsICckdGltZW91dCcsICckd2luZG93JywgJ2RhdGVQaWNrZXJTZXJ2aWNlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGluamVjdG9yLCBwcml2YXRlICRjb21waWxlLCBwcml2YXRlICR0ZW1wbGF0ZUNhY2hlLCBwcml2YXRlICR0aW1lb3V0LCBwcml2YXRlICR3aW5kb3csIHByaXZhdGUgZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZSkgeyB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0FFJztcclxuICAgICAgICByZXF1aXJlID0gJz9uZ01vZGVsJztcclxuICAgICAgICBjb250cm9sbGVyID0gRGF0ZVBpY2tlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ2RhdGVwaWNrZXInO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICAvLyBTaW5nbGUgRGF0ZVxyXG4gICAgICAgICAgICBkYXRlOiAnPScsXHJcbiAgICAgICAgICAgIG9uRGF0ZVNlbGVjdDogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gUmFuZ2VcclxuICAgICAgICAgICAgc3RhcnQ6ICc9JyxcclxuICAgICAgICAgICAgZW5kOiAnPScsXHJcbiAgICAgICAgICAgIG9uUmFuZ2VTZWxlY3Q6ICcmJyxcclxuXHJcbiAgICAgICAgICAgIC8vIE90aGVyXHJcbiAgICAgICAgICAgIGlzU2VsZWN0aW5nOiAnPScsXHJcblxyXG4gICAgICAgICAgICAvLyBDb2xsZWN0aW9uIG9mIGRhdGUgc3RyaW5ncyAoaWUuIFsnMjAxMi0xMi0wMScsJzIwMTItMTItMDInXVxyXG4gICAgICAgICAgICBoaWdobGlnaHRlZDogJz0nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FsZW5kYXJUZW1wbGF0ZSA9ICdkYXRlLXBpY2tlci5odG1sJztcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcblxyXG4gICAgICAgICAgICAvLyBGaXhlcyBhIGJ1ZyB3aGVyZSBUZXRoZXIgY2Fubm90IGNvcnJlY3RseSBnZXQgd2lkdGgvaGVpZ2h0IGJlY2F1c2Ugb2YgbmdBbmltYXRlXHJcbiAgICAgICAgICAgIHZhciAkYW5pbWF0ZSA9IHRoaXMuJGluamVjdG9yLmdldCgnJGFuaW1hdGUnKTtcclxuICAgICAgICAgICAgaWYgKCRhbmltYXRlICE9IG51bGwpIFxyXG4gICAgICAgICAgICAgICAgJGFuaW1hdGUuZW5hYmxlZChmYWxzZSwgJGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRlbGVtZW50LmlzKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rSW5wdXQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCRlbGVtZW50LmlzKCdkYXRlLXBpY2tlcicpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rSW5saW5lKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtFbGVtZW50KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRheVNlbGVjdCgkc2NvcGUsICRlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yYW5nZVNlbGVjdCgkc2NvcGUsICRlbGVtZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rSW5wdXQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCkge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wb3BvdmVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3RybC5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4gY3RybC5kYXRlLCBkYXRlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IGRhdGUgPT0gbnVsbCA/ICcnIDogbW9tZW50KGRhdGUpLmZvcm1hdChcIkxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh0ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZXRWaWV3VmFsdWUgPSAoc3RhcnQsIGVuZCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydCAhPSBudWxsICYmIGVuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtU3RhcnQgPSBtb21lbnQoc3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbUVuZCA9IG1vbWVudChlbmQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1TdGFydC5pc1NhbWUoZW5kLCAnZGF5JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBtU3RhcnQuZm9ybWF0KFwiTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBgJHttU3RhcnQuZm9ybWF0KFwiTFwiKSB9IC0gJHttRW5kLmZvcm1hdChcIkxcIikgfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBtb21lbnQoZW5kKS5mb3JtYXQoXCJMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IG1vbWVudChlbmQpLmZvcm1hdChcIkxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiBjdHJsLnN0YXJ0LCBzdGFydCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0Vmlld1ZhbHVlKHN0YXJ0LCBjdHJsLmVuZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IGN0cmwuZW5kLCBlbmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFZpZXdWYWx1ZShjdHJsLnN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBjaGFuZ2UuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjdHJsLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5pbnB1dFRvTW9tZW50KG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGUuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuZGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRlLmlzU2FtZShjdHJsLmRhdGUsICdkYXknKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmRhdGUgPSBkYXRlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0VG9SYW5nZShuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtb21lbnQocmFuZ2Uuc3RhcnQpLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnN0YXJ0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbW9tZW50KHJhbmdlLmVuZCkuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuZW5kID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLnN0YXJ0ID09IG51bGwgfHwgY3RybC5lbmQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobW9tZW50KHJhbmdlLnN0YXJ0KS5pc1NhbWUoY3RybC5zdGFydCwgJ2RheScpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudChyYW5nZS5lbmQpLmlzU2FtZShjdHJsLmVuZCwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc3RhcnQgPSByYW5nZS5zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmVuZCA9IHJhbmdlLmVuZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGtleWRvd24uJHskc2NvcGUuJGlkfWAsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjdHJsLmlzVmlzaWJsZSB8fCAhdGhpcy5pc0VzY2FwZShlKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua0VsZW1lbnQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpbmtJbmxpbmUoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCkge1xyXG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuY3JlYXRlQ29udGVudCgkc2NvcGUpO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoY29udGVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXREYXlzKHJhbmdlLCBjdHJsKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFydDogSURhdGVQaWNrZXJEYXkgPSBhbmd1bGFyLmVsZW1lbnQocmFuZ2Uuc3RhcnQudGFyZ2V0KS5zY29wZSgpLmRheSxcclxuICAgICAgICAgICAgICAgIGVuZDogSURhdGVQaWNrZXJEYXkgPSBhbmd1bGFyLmVsZW1lbnQocmFuZ2UuZW5kLnRhcmdldCkuc2NvcGUoKS5kYXk7XHJcbiAgICAgICAgICAgIHZhciBkYXlzID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5nZXRSYW5nZURheXMoc3RhcnQsIGVuZCwgY3RybC53ZWVrcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcG9wb3Zlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB0ZXRoZXIsXHJcbiAgICAgICAgICAgICAgICAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRvTm90UmVvcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGN0cmxbJ2RhdGVTZWxlY3RlZCddID0gKGRhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkb05vdFJlb3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgZG9Ob3RSZW9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGN0cmwub25EYXRlU2VsZWN0KHsgZGF0ZTogZGF0ZSB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGN0cmxbJ3JhbmdlU2VsZWN0ZWQnXSA9IChzdGFydCwgZW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZG9Ob3RSZW9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIGRvTm90UmVvcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjdHJsLm9uUmFuZ2VTZWxlY3QoeyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGNsaWNrLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGZvY3VzLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9Ob3RSZW9wZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmNyZWF0ZURyb3BEb3duKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGV0aGVyID0gbmV3IFRldGhlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogJGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEF0dGFjaG1lbnQ6ICdib3R0b20gY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudDogJ3RvcCBjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc1ByZWZpeDogJ2RhdGVwaWNrZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRPZmZzZXQ6ICcxNHB4IDAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiAnd2luZG93JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50OiAndG9nZXRoZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpbjogWyd0b3AnLCAnbGVmdCcsICdib3R0b20nLCAncmlnaHQnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgdGV0aGVyLnBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJsdXJUaW1lcjtcclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGJsdXIuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIEFsbG93IGFueSBjbGljayBvbiB0aGUgbWVudSB0byBjb21lIHRocm91Z2ggZmlyc3RcclxuICAgICAgICAgICAgICAgIGJsdXJUaW1lciA9IHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLmlzU2VsZWN0aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAkYm9keS5vbihgRE9NTW91c2VTY3JvbGwuJHskc2NvcGUuJGlkfSBtb3VzZXdoZWVsLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAoIWN0cmwuaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFuZ3VsYXIuZWxlbWVudCh0aGlzLiR3aW5kb3cpLm9uKGByZXNpemUuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAgICAgJGJvZHkub24oYGNsaWNrLiR7JHNjb3BlLiRpZH1gLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghY3RybC5pc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY29udGVudCB8fCAkZWxlbWVudC5pcyhlLnRhcmdldCkgfHwgY29udGVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0LmNhbmNlbChibHVyVGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50ICYmIGNvbnRlbnQuaGFzKGUudGFyZ2V0KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGJvZHkub2ZmKGBjbGljay4keyRzY29wZS4kaWR9IERPTU1vdXNlU2Nyb2xsLiR7JHNjb3BlLiRpZH0gbW91c2V3aGVlbC4keyRzY29wZS4kaWR9YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQpIGNvbnRlbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlRHJvcERvd24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBzaW5nbGVEYXRlQmluZGluZyA9IGBkYXRlPVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uZGF0ZVwiIG9uLWRhdGUtc2VsZWN0PVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uZGF0ZVNlbGVjdGVkKGRhdGUpXCJgLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2VCaW5kaW5nID0gYHN0YXJ0PVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uc3RhcnRcIiBlbmQ9XCIke3RoaXMuY29udHJvbGxlckFzfS5lbmRcIiBvbi1yYW5nZS1zZWxlY3Q9XCIke3RoaXMuY29udHJvbGxlckFzfS5yYW5nZVNlbGVjdGVkKHN0YXJ0LGVuZClcImAsXHJcbiAgICAgICAgICAgICAgICBiaW5kaW5ncyA9IGN0cmwuaXNTaW5nbGVEYXRlID8gc2luZ2xlRGF0ZUJpbmRpbmcgOiByYW5nZUJpbmRpbmcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1kcm9wZG93blwiIG5nLWNsYXNzPVwieydkYXRlcGlja2VyLW9wZW4nOiR7dGhpcy5jb250cm9sbGVyQXN9LmlzVmlzaWJsZX1cIj48ZGF0ZS1waWNrZXIgbWluLXZpZXc9XCIkeyRhdHRycy5taW5WaWV3fVwiIGlzLXNlbGVjdGluZz1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmlzU2VsZWN0aW5nXCIgJHtiaW5kaW5nc31cIiBoaWdobGlnaHRlZD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmhpZ2hsaWdodGVkXCI+PC9kYXRlLXBpY2tlcj48L2Rpdj5gLFxyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZSksXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9ICRlbGVtZW50LnBvc2l0aW9uKCksXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSAkZWxlbWVudC5vdXRlckhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luID0gKCRlbGVtZW50Lm91dGVySGVpZ2h0KHRydWUpIC0gaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG9mZnNldCA9IG1hcmdpbiAvIDIgKyBoZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBjb250ZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IHBvc2l0aW9uLnRvcCArIG9mZnNldCxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IHBvc2l0aW9uLmxlZnRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRjb21waWxlKGNvbnRlbnQpKCRzY29wZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0VzY2FwZShlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSAyNztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbnRlbnQoJHNjb3BlKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMuJHRlbXBsYXRlQ2FjaGUuZ2V0KHRoaXMuY2FsZW5kYXJUZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZShjb250ZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRheVNlbGVjdCgkc2NvcGUsICRlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBkYXlDc3MgPSAnLmRhdGVQaWNrZXJEYXlzLWRheScsXHJcbiAgICAgICAgICAgICAgICAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgbW91c2VEb3duID0gYG1vdXNlZG93bi4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIG1vdXNlVXAgPSBgbW91c2V1cC4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgICAgIHZhciBvblNlbGVjdGVkID0gcmFuZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRheXMgPSB0aGlzLmdldERheXMocmFuZ2UsIGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZChkYXlzKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKG1vdXNlRG93biwgZGF5Q3NzLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IHsgc3RhcnQ6IGUsIGVuZDogZSB9O1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1NlbGVjdGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJvZHkub24obW91c2VVcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5Lm9mZihtb3VzZVVwKTtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmlzU2VsZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RlZChyYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYW5nZVNlbGVjdCgkc2NvcGUsICRlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgbW91c2VEb3duID0gYG1vdXNlZG93bi4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIG1vdXNlT3ZlciA9IGBtb3VzZW92ZXIuJHskc2NvcGUuJGlkfWAsXHJcbiAgICAgICAgICAgICAgICBtb3VzZVVwID0gYG1vdXNldXAuJHskc2NvcGUuJGlkfWAsXHJcbiAgICAgICAgICAgICAgICBkYXlDc3MgPSAnLmRhdGVQaWNrZXJEYXlzLWRheSc7XHJcblxyXG4gICAgICAgICAgICB2YXIgb25TZWxlY3RpbmcgPSByYW5nZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF5cyA9IHRoaXMuZ2V0RGF5cyhyYW5nZSwgY3RybCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGluZyhkYXlzKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBvblNlbGVjdGVkID0gcmFuZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRheXMgPSB0aGlzLmdldERheXMocmFuZ2UsIGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZChkYXlzKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKG1vdXNlRG93biwgZGF5Q3NzLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IHsgc3RhcnQ6IGUsIGVuZDogZSB9O1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1NlbGVjdGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VPdmVyLCBkYXlDc3MsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLmVuZCA9IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RpbmcocmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJvZHkub24obW91c2VVcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihtb3VzZU92ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5Lm9mZihtb3VzZVVwKTtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmlzU2VsZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RlZChyYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcC5kaXJlY3RpdmUoJ2RhdGVQaWNrZXInLCBEYXRlUGlja2VyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICAvLyBEYXRlUGlja2VyUmFuZ2VcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJSYW5nZSB7XHJcbiAgICAgICAgc3RhcnQ6IHN0cmluZztcclxuICAgICAgICBlbmQ6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyUmFuZ2UgaW1wbGVtZW50cyBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGFydDogYW55LCBlbmQ6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgbVN0YXJ0ID0gbW9tZW50KHN0YXJ0KTtcclxuICAgICAgICAgICAgdmFyIG1FbmQgPSBtb21lbnQoZW5kKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtRW5kLmlzQmVmb3JlKG1TdGFydCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gbVN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgbVN0YXJ0ID0gbUVuZDtcclxuICAgICAgICAgICAgICAgIG1FbmQgPSB0ZW1wO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbVN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG1FbmQuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGFydDogc3RyaW5nO1xyXG4gICAgICAgIGVuZDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERhdGVQaWNrZXJNb250aFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlck1vbnRoIHtcclxuICAgICAgICB2YWx1ZTogbnVtYmVyO1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBpc0N1cnJlbnRNb250aDogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyTW9udGggaW1wbGVtZW50cyBJRGF0ZVBpY2tlck1vbnRoIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgbSA9IG1vbWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBtLm1vbnRoKHZhbHVlKS5mb3JtYXQoJ01NTScpO1xyXG4gICAgICAgICAgICB0aGlzLmlzQ3VycmVudE1vbnRoID0gdmFsdWUgPT09IG0ubW9udGgoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBpc0N1cnJlbnRNb250aDogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEYXRlUGlja2VyTW9udGhcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJZZWFyIHtcclxuICAgICAgICB2YWx1ZTogbnVtYmVyO1xyXG4gICAgICAgIGlzQ3VycmVudFllYXI6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlclllYXIgaW1wbGVtZW50cyBJRGF0ZVBpY2tlclllYXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50WWVhciA9IHZhbHVlID09PSBtb21lbnQoKS55ZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0N1cnJlbnRZZWFyOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElEYXRlUGlja2VyRGF5XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyRGF5IHtcclxuICAgICAgICBkYXRlOiBudW1iZXI7XHJcbiAgICAgICAgdmFsdWU6IGFueTtcclxuICAgICAgICBpc1RvZGF5OiBib29sZWFuO1xyXG4gICAgICAgIGlzTm90SW5Nb250aDogYm9vbGVhbjtcclxuICAgICAgICBpc1NlbGVjdGluZzogYm9vbGVhbjtcclxuICAgICAgICBpc0JlZm9yZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbjtcclxuICAgICAgICBpc1NhbWUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlckRheSBpbXBsZW1lbnRzIElEYXRlUGlja2VyRGF5IHtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihmcm9tRGF0ZTogYW55LCBkYXlPZldlZWs6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbW9tZW50KGRheU9mV2Vlayk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMudmFsdWUuZGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzVG9kYXkgPSBkYXlPZldlZWsuaXNTYW1lKG1vbWVudCgpLCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNOb3RJbk1vbnRoID0gIXRoaXMudmFsdWUuaXNTYW1lKGZyb21EYXRlLCAnbW9udGgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGU6IG51bWJlcjtcclxuICAgICAgICB2YWx1ZTogYW55O1xyXG4gICAgICAgIGlzVG9kYXk6IGJvb2xlYW47XHJcbiAgICAgICAgaXNOb3RJbk1vbnRoOiBib29sZWFuO1xyXG4gICAgICAgIGlzU2VsZWN0aW5nOiBib29sZWFuO1xyXG5cclxuICAgICAgICBpc0JlZm9yZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBpc0JlZm9yZSA9IHRoaXMudmFsdWUuaXNCZWZvcmUoZGF5LnZhbHVlLCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpc0JlZm9yZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzU2FtZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBpc1NhbWUgPSB0aGlzLnZhbHVlLmlzU2FtZShkYXkudmFsdWUsICdkYXknKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzU2FtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlclNlcnZpY2VcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJTZXJ2aWNlIHtcclxuICAgICAgICBnZXRNb250aHMoKTogSURhdGVQaWNrZXJNb250aFtdO1xyXG4gICAgICAgIGdldERheXNPZldlZWsoKTogc3RyaW5nW107XHJcbiAgICAgICAgZ2V0WWVhcnMoZnJvbURhdGUpOiBJRGF0ZVBpY2tlclllYXJbXTtcclxuICAgICAgICBnZXRXZWVrKGZyb21EYXRlLCBzdGFydE9mV2Vlayk6IElEYXRlUGlja2VyRGF5W107XHJcbiAgICAgICAgZ2V0UmFuZ2VEYXlzKHN0YXJ0OiBJRGF0ZVBpY2tlckRheSwgZW5kOiBJRGF0ZVBpY2tlckRheSwgd2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSk6IElEYXRlUGlja2VyRGF5W107XHJcbiAgICAgICAgZGVzZWxlY3RBbGwod2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSk7XHJcbiAgICAgICAgc2VsZWN0RGF5cyhkYXlzOiBJRGF0ZVBpY2tlckRheVtdKTtcclxuICAgICAgICBpbnB1dFRvTW9tZW50KHZhbHVlOiBzdHJpbmcpOiBhbnk7XHJcbiAgICAgICAgaW5wdXRUb1JhbmdlKHZhbHVlOiBzdHJpbmcpOiBJRGF0ZVBpY2tlclJhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJTZXJ2aWNlIGltcGxlbWVudHMgSURhdGVQaWNrZXJTZXJ2aWNlIHtcclxuICAgICAgICBnZXRNb250aHMoKTogSURhdGVQaWNrZXJNb250aFtdIHtcclxuICAgICAgICAgICAgdmFyIG1vbnRocyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlck1vbnRoPigpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aHMucHVzaChuZXcgRGF0ZVBpY2tlck1vbnRoKGkpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1vbnRocztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFllYXJzKGZyb21EYXRlKTogSURhdGVQaWNrZXJZZWFyW10ge1xyXG4gICAgICAgICAgICB2YXIgZnJvbVllYXIgPSBtb21lbnQoZnJvbURhdGUpLnllYXIoKSxcclxuICAgICAgICAgICAgICAgIHllYXJzID0gbmV3IEFycmF5PElEYXRlUGlja2VyWWVhcj4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBmcm9tWWVhcjsgaSA8PSAoZnJvbVllYXIgKyA4KTsgaSsrKVxyXG4gICAgICAgICAgICAgICAgeWVhcnMucHVzaChuZXcgRGF0ZVBpY2tlclllYXIoaSkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHllYXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0V2Vlayhmcm9tRGF0ZSwgc3RhcnRPZldlZWspOiBJRGF0ZVBpY2tlckRheVtdIHtcclxuICAgICAgICAgICAgdmFyIGVuZE9mV2VlayA9IG1vbWVudChzdGFydE9mV2VlaykuZW5kT2YoJ3dlZWsnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXlzID0gbmV3IEFycmF5PElEYXRlUGlja2VyRGF5PigpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkYXlPZldlZWsgPSBtb21lbnQoc3RhcnRPZldlZWspOyBkYXlPZldlZWsuaXNCZWZvcmUoZW5kT2ZXZWVrKTsgZGF5T2ZXZWVrLmFkZCgxLCAnZGF5cycpKSB7XHJcbiAgICAgICAgICAgICAgICBkYXlzLnB1c2gobmV3IERhdGVQaWNrZXJEYXkoZnJvbURhdGUsIGRheU9mV2VlaykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldERheXNPZldlZWsoKTogc3RyaW5nW10ge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50LmxvY2FsZURhdGEoKS5fd2Vla2RheXNTaG9ydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFJhbmdlRGF5cyhzdGFydDogSURhdGVQaWNrZXJEYXksIGVuZDogSURhdGVQaWNrZXJEYXksIHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pOiBJRGF0ZVBpY2tlckRheVtdIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbmQuaXNCZWZvcmUoc3RhcnQpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSBlbmQ7XHJcbiAgICAgICAgICAgICAgICBlbmQgPSB0ZW1wO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgYWxsRGF5cyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlckRheT4oKSxcclxuICAgICAgICAgICAgICAgIGlzQWRkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB3ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2Vlay5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRheS5pc1NhbWUoc3RhcnQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FkZGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0FkZGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxEYXlzLnB1c2goZGF5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXkuaXNTYW1lKGVuZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWRkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYWxsRGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlc2VsZWN0QWxsKHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pIHtcclxuICAgICAgICAgICAgd2Vla3MuZm9yRWFjaCh3ZWVrID0+IHtcclxuICAgICAgICAgICAgICAgIHdlZWsuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRheS5pc1NlbGVjdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0RGF5cyhkYXlzOiBJRGF0ZVBpY2tlckRheVtdKSB7XHJcbiAgICAgICAgICAgIGRheXMuZm9yRWFjaChkYXkgPT4gZGF5LmlzU2VsZWN0aW5nID0gdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnB1dFRvTW9tZW50KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgbGFuZyA9IG1vbWVudC5sb2NhbGVEYXRhKCk7XHJcbiAgICAgICAgICAgIHZhciBmb3JtYXRzID0gW1xyXG4gICAgICAgICAgICAgICAgbGFuZy5sb25nRGF0ZUZvcm1hdChcImxcIilcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csICcgJylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyAgL2csICcgJyksXHJcbiAgICAgICAgICAgICAgICBsYW5nLmxvbmdEYXRlRm9ybWF0KFwiTFwiKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQodmFsdWUsIGZvcm1hdHMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0VG9SYW5nZSh2YWx1ZTogc3RyaW5nKTogSURhdGVQaWNrZXJSYW5nZSB7XHJcbiAgICAgICAgICAgIHZhciB0cmltbWVkID0gdmFsdWVcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csICcgJylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyAgL2csICcgJylcclxuICAgICAgICAgICAgICAgIC50cmltKCk7XHJcbiAgICAgICAgICAgIHZhciBleHBTdGFydCA9IG5ldyBSZWdFeHAoXCJeKChbMC05XXsxLDR9WyBdKil7M30pXCIpO1xyXG4gICAgICAgICAgICB2YXIgZXhwRW5kID0gbmV3IFJlZ0V4cChcIigoWzAtOV17MSw0fVsgXSopezN9KSRcIik7XHJcbiAgICAgICAgICAgIHZhciBzdGFydFJlc3VsdCA9IGV4cFN0YXJ0LmV4ZWModHJpbW1lZCk7XHJcbiAgICAgICAgICAgIHZhciBlbmRSZXN1bHQgPSBleHBFbmQuZXhlYyh0cmltbWVkKTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5pbnB1dFRvTW9tZW50KHN0YXJ0UmVzdWx0WzBdLnRyaW0oKSk7XHJcbiAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLmlucHV0VG9Nb21lbnQoKGVuZFJlc3VsdFswXSB8fCBzdGFydFJlc3VsdFswXSkudHJpbSgpKTtcclxuICAgICAgICAgICAgdmFyIHJhbmdlID0gbmV3IERhdGVQaWNrZXJSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcHAuc2VydmljZSgnZGF0ZVBpY2tlclNlcnZpY2UnLCBEYXRlUGlja2VyU2VydmljZSk7XHJcbn0iXX0=