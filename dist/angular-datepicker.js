Angular.module("ngDatePicker", []);
var DatePickerModule;
(function (DatePickerModule) {
    var MobileConfig = (function () {
        function MobileConfig() {
        }
        MobileConfig.isMobile = function () {
            var agent = navigator.userAgent || navigator.vendor || window["opera"];
            var test1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(agent);
            var agentPrefix = agent.substr(0, 4);
            var test2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agentPrefix);
            return test1 || test2;
        };
        return MobileConfig;
    }());
    Angular.module("ngDatePicker").constant('isMobile', MobileConfig.isMobile());
})(DatePickerModule || (DatePickerModule = {}));
var DatePickerModule;
(function (DatePickerModule) {
    var DatePickerMouseRange = (function () {
        function DatePickerMouseRange($ctrl, e) {
            this.$ctrl = $ctrl;
            this.setStart(e);
            this.setEnd(e);
        }
        DatePickerMouseRange.bootstrap = function (datePickerService) {
            DatePickerMouseRange.datePickerService = datePickerService;
        };
        DatePickerMouseRange.prototype.setStart = function (e) {
            this.start = this.getElement(e);
        };
        DatePickerMouseRange.prototype.setEnd = function (e) {
            this.end = this.getElement(e);
        };
        DatePickerMouseRange.prototype.getDays = function () {
            var days = DatePickerMouseRange.datePickerService.getRangeDays(this.start, this.end, this.$ctrl.weeks);
            return days;
        };
        DatePickerMouseRange.prototype.getElement = function (e) {
            if (!e.target)
                return;
            var $element = angular.element(e.target);
            var $scope = $element.scope();
            var day = $scope['day'];
            return day;
        };
        return DatePickerMouseRange;
    }());
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
            DatePickerMouseRange.bootstrap(datePickerService);
            this.isSingleDate = ($attrs['start'] == null && $attrs['end'] == null);
            this.monthNames = datePickerService.getMonths();
            this.daysOfWeek = datePickerService.getDaysOfWeek();
            switch ($attrs['minView']) {
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
        }
        DatePickerController.prototype.$onInit = function () {
            if (this.defaultDate == "")
                this.defaultDate = null;
            var dateInternal = (this.isSingleDate ? this.date : this.start) || this.defaultDate;
            this.initialized = true;
            this.setDateInternal(dateInternal);
        };
        DatePickerController.prototype.$postLink = function () {
            if (this.isSingleDate) {
                this.setViewDate(this.date || this.defaultDate);
                return;
            }
            var start = this.start || this.defaultDate;
            this.setViewRange(start, this.end || start);
        };
        Object.defineProperty(DatePickerController.prototype, "date", {
            get: function () {
                return this._date;
            },
            set: function (value) {
                this.setDate(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerController.prototype, "start", {
            get: function () {
                return this._start;
            },
            set: function (value) {
                this.setRange(value, this._end);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerController.prototype, "end", {
            get: function () {
                return this._end;
            },
            set: function (value) {
                this.setRange(this._start, value);
            },
            enumerable: true,
            configurable: true
        });
        DatePickerController.prototype.setDate = function (date) {
            this._date = date;
            this._start = date;
            this._end = date;
            this.setDateInternal(this._date);
            this.setViewDate(date);
            if (this.initialized && this.onDateSelect)
                this.onDateSelect({ date: date });
        };
        DatePickerController.prototype.setRange = function (start, end) {
            this._date = start;
            this._start = start;
            this._end = end;
            this.setDateInternal(this._date);
            this.setViewRange(start, end);
            if (this.onRangeSelect)
                this.onRangeSelect({ start: start, end: end });
        };
        Object.defineProperty(DatePickerController.prototype, "dateInternal", {
            get: function () {
                return this._dateInternal;
            },
            enumerable: true,
            configurable: true
        });
        DatePickerController.prototype.setDateInternal = function (value) {
            this._dateInternal = (value != null) ? moment(value) : moment();
            if (this.initialized)
                this.calculate(this._dateInternal);
        };
        DatePickerController.prototype.calculate = function (fromDate) {
            var start = fromDate.clone().startOf('month').startOf('week'), end = fromDate.clone().endOf('month').endOf('week');
            this.weeks = new Array();
            for (var day = start; day.isBefore(end); day = day.clone().add(1, 'week')) {
                var week = this.datePickerService.getWeek(fromDate, day);
                this.weeks.push(week);
            }
            this.years = this.datePickerService.getYears(fromDate);
        };
        DatePickerController.prototype.setViewDate = function (date) {
            // override in link functions
        };
        ;
        DatePickerController.prototype.setViewRange = function (start, end) {
            // override in link functions
        };
        ;
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
        DatePickerController.prototype.isSelected = function (day) {
            if (this.isSingleDate)
                return moment(this._date).isSame(day.value, 'day');
            return day.value.isBetween(this._start, this._end, 'day') ||
                day.value.isSame(this._start, 'day') ||
                day.value.isSame(this._end, 'day');
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
            var date = moment(day.value).format(this.isoFormat);
            this.setDate(date);
        };
        DatePickerController.prototype.selectedRange = function (startDay, endDay) {
            var start = moment(startDay.value).format(this.isoFormat);
            var end = moment(endDay.value).format(this.isoFormat);
            this.setRange(start, end);
        };
        DatePickerController.prototype.selectMonth = function (idx) {
            var month = this.monthNames[idx];
            this.setMonth(month.value);
            if (this.minView === DatePickerView.Months) {
                if (this.isSingleDate) {
                    var date = this.dateInternal.format('YYYY-MM-DD');
                    this.setDate(date);
                }
                else {
                    var start = this.dateInternal.clone().endOf('month').format('YYYY-MM-DD');
                    var end = this.dateInternal.clone().endOf('month').format('YYYY-MM-DD');
                    this.setRange(start, end);
                }
                this.isVisible = false;
                return;
            }
            this.showDays();
        };
        DatePickerController.prototype.selectYear = function (idx) {
            var year = this.years[idx];
            this.setYear(year.value);
            if (this.minView === DatePickerView.Years) {
                if (this.isSingleDate) {
                    var date = this.dateInternal.format('YYYY-MM-DD');
                    this.setDate(date);
                }
                else {
                    var start = this.dateInternal.clone().startOf('year').format('YYYY-MM-DD');
                    var end = this.dateInternal.clone().endOf('year').format('YYYY-MM-DD');
                    this.setRange(start, end);
                }
                this.isVisible = false;
                return;
            }
            this.showMonths();
        };
        DatePickerController.prototype.changeDate = function (action) {
            this.setDateInternal(action(this.dateInternal.clone()));
        };
        DatePickerController.prototype.isMonth = function (month) {
            return this.dateInternal.month() == month.value;
        };
        DatePickerController.prototype.setMonth = function (month) {
            this.changeDate(function (date) { return date.set('month', month); });
        };
        DatePickerController.prototype.isYear = function (year) {
            return this.dateInternal.year() == year.value;
        };
        DatePickerController.prototype.setYear = function (year) {
            this.changeDate(function (date) { return date.set('year', year); });
        };
        DatePickerController.prototype.prevMonth = function () {
            this.changeDate(function (date) { return date.subtract(1, 'months'); });
        };
        DatePickerController.prototype.nextMonth = function () {
            this.changeDate(function (date) { return date.add(1, 'months'); });
        };
        DatePickerController.prototype.prevYear = function () {
            this.changeDate(function (date) { return date.subtract(1, 'years'); });
        };
        DatePickerController.prototype.nextYear = function () {
            this.changeDate(function (date) { return date.add(1, 'years'); });
        };
        DatePickerController.prototype.prevRange = function () {
            this.changeDate(function (date) { return date.subtract(9, 'years'); });
        };
        DatePickerController.prototype.nextRange = function () {
            this.changeDate(function (date) { return date.add(9, 'years'); });
        };
        DatePickerController.$inject = ['$attrs', 'datePickerService'];
        return DatePickerController;
    }());
    Angular.module("ngDatePicker").controller('datePicker', DatePickerController);
    var DatePickerDirective = (function () {
        function DatePickerDirective($injector, $compile, $templateCache, $timeout, $window, datePickerService, isMobile) {
            var _this = this;
            this.$injector = $injector;
            this.$compile = $compile;
            this.$templateCache = $templateCache;
            this.$timeout = $timeout;
            this.$window = $window;
            this.datePickerService = datePickerService;
            this.isMobile = isMobile;
            this.restrict = 'AE';
            this.require = ['datePicker', '?ngModel'];
            this.controller = DatePickerController;
            this.controllerAs = 'datepicker';
            this.bindToController = true;
            this.scope = {
                // Single Date
                'date': '=?date',
                onDateSelect: '&',
                // Range
                'start': '=?start',
                'end': '=?end',
                onRangeSelect: '&',
                // Other
                isSelecting: '=?',
                defaultDate: '@?',
                onChange: '&',
                // Collection of date strings (ie. ['2012-12-01','2012-12-02']
                highlighted: '=?'
            };
            this.calendarTemplate = 'date-picker.html';
            this.link = function ($scope, $element, $attrs, _a) {
                var $ctrl = _a[0], $ngModel = _a[1];
                _this.applyTetherFix($element);
                if (_this.isMobile) {
                    _this.linkMobile($scope, $element, $attrs, $ngModel, $ctrl);
                }
                else {
                    _this.linkDesktop($scope, $element, $attrs, $ngModel, $ctrl);
                }
            };
            this.linkMobile = function ($scope, $element, $attrs, $ngModel, $ctrl) {
                if (_this.isInput($element)) {
                    _this.linkNativeInput($scope, $element, $attrs, $ngModel, $ctrl);
                }
                else if (_this.isElement($element)) {
                    _this.linkInline($scope, $element, $attrs, $ngModel, $ctrl);
                }
                else {
                    _this.linkNativeElement($scope, $element, $attrs, $ngModel, $ctrl);
                }
            };
            this.linkDesktop = function ($scope, $element, $attrs, $ngModel, $ctrl) {
                if (_this.isInput($element)) {
                    _this.linkInput($scope, $element, $attrs, $ngModel, $ctrl);
                }
                else if (_this.isElement($element)) {
                    _this.linkInline($scope, $element, $attrs, $ngModel, $ctrl);
                }
                else {
                    _this.linkElement($scope, $element, $attrs, $ngModel, $ctrl);
                }
                if ($ctrl.isSingleDate) {
                    _this.setupDaySelect($scope, $element, $ctrl);
                }
                else {
                    _this.setupRangeSelect($scope, $element, $ctrl);
                }
            };
        }
        DatePickerDirective.prototype.isInput = function ($element) {
            return $element.is('input[type="text"]');
        };
        DatePickerDirective.prototype.isElement = function ($element) {
            return $element.is('date-picker');
        };
        /**
         * Fixes a bug where Tether cannot correctly get width/height because of ngAnimate
         */
        DatePickerDirective.prototype.applyTetherFix = function ($element) {
            var $animate = this.$injector.get('$animate');
            if ($animate != null)
                $animate.enabled(false, $element);
        };
        DatePickerDirective.prototype.linkNativeInput = function ($scope, $element, $attrs, $ngModel, $ctrl) {
            var format = function (date, pattern) { return (date == null) ? '' : moment(date).format(pattern); };
            var dateFormat = function (date) { return format(date, "YYYY-MM-DD"); };
            var monthFormat = function (date) { return format(date, "YYYY-MM"); };
            var type = "date", formatter = dateFormat;
            if ($attrs['minView'] == "months") {
                type = "month";
                formatter = monthFormat;
            }
            var setViewDate = function (date) {
                var iso = formatter(date);
                $ngModel.$setViewValue(iso);
                $ngModel.$render();
            };
            $element.prop("type", type);
            $ctrl.setViewDate = setViewDate;
            $ngModel.$viewChangeListeners.push(function () {
                var viewValue = moment($ngModel.$viewValue);
                var date = viewValue.isValid() ? dateFormat($ngModel.$viewValue) : null;
                $ctrl.setDate(date);
            });
        };
        DatePickerDirective.prototype.linkInput = function ($scope, $element, $attrs, ngModelCtrl, $ctrl) {
            var _this = this;
            this.popover($scope, $element, $attrs, $ctrl);
            if ($ctrl.isSingleDate) {
                var setViewValue_1 = function (date) {
                    var text = date == null ? '' : moment(date).format("L");
                    ngModelCtrl.$setViewValue(text);
                    ngModelCtrl.$render();
                };
                $scope.$watch(function () { return $ctrl.date; }, function (date) {
                    setViewValue_1(date);
                });
            }
            else {
                var setViewValue_2 = function (start, end) {
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
                $scope.$watch(function () { return $ctrl.start; }, function (start) {
                    setViewValue_2(start, $ctrl.end);
                });
                $scope.$watch(function () { return $ctrl.end; }, function (end) {
                    setViewValue_2($ctrl.start, end);
                });
            }
            $element.on("change." + $scope.$id, function () {
                if ($ctrl.isSingleDate) {
                    var date = _this.datePickerService.inputToMoment(ngModelCtrl.$viewValue);
                    if (!date.isValid()) {
                        $ctrl.setDate(null);
                        return;
                    }
                    if (date.isSame($ctrl.date, 'day'))
                        return;
                    $ctrl.setDate(date.format($ctrl.isoFormat));
                }
                else {
                    var range = _this.datePickerService.inputToRange(ngModelCtrl.$viewValue);
                    if (range == null) {
                        $ctrl.setRange(null, null);
                    }
                    else {
                        var start = moment(range.start), end = moment(range.end);
                        if (!start.isValid() || !end.isValid()) {
                            $ctrl.setRange(null, null);
                            return;
                        }
                        if (start.isSame($ctrl.start, 'day') && end.isSame($ctrl.end, 'day'))
                            return;
                        $ctrl.setRange(range.start, range.end);
                    }
                }
                $scope.$apply();
            });
            $element.on("keydown." + $scope.$id, function (e) {
                if (!$ctrl.isVisible || !_this.isEscape(e))
                    return true;
                $ctrl.isVisible = false;
                $scope.$apply();
                return _this.preventDefault(e);
            });
        };
        DatePickerDirective.prototype.linkNativeElement = function ($scope, $element, $attrs, ngModelCtrl, $ctrl) {
            var _this = this;
            this.setTabIndex($element);
            var getVm = function (name) { return (_this.controllerAs + "." + name); };
            var getAttr = function (name, value) { return (name + "=\"" + value + "\""); };
            var getVmAttr = function (name, value) { return getAttr(name, getVm(value)); };
            function TypeBuilder() {
                var _this = this;
                this.attrs = [];
                var _builder = this;
                this.addAttr = function (name, value) {
                    _this.attrs.push(getAttr(name, value));
                    return _builder;
                };
                this.addLiteral = function (name, attr) {
                    if (typeof $attrs[attr] != "undefined")
                        _this.attrs.push(getAttr(name, $attrs[attr]));
                    return _builder;
                };
                this.addBinding = function (name, attr, ctrl) {
                    if (typeof attr == "string")
                        attr = $attrs[attr];
                    if (typeof attr != "undefined")
                        _this.attrs.push(getVmAttr(name, ctrl));
                    return _builder;
                };
                this.addProxy = function (name, fn) {
                    $ctrl[name] = fn;
                    return _builder;
                };
                this.addEvent = function (name, attr, ctrl) {
                    if (typeof $attrs[attr] != "undefined")
                        _this.attrs.push(getVmAttr(name, ctrl));
                    return _builder;
                };
                this.build = function () {
                    var content = "<input date-picker " + _this.attrs.join(' ') + " required>";
                    return content;
                };
            }
            var builder = new TypeBuilder()
                .addAttr("type", "text")
                .addLiteral("min-view", "minView")
                .addBinding("ng-model", true, "dateString")
                .addBinding("date", "date", "date")
                .addBinding("start", "start", "start")
                .addBinding("end", "end", "end")
                .addBinding("is-selecting", "isSelecting", "isSelecting")
                .addLiteral("default-date", "defaultDate")
                .addBinding("highlighted", "highlighted", "highlighted");
            var content = builder.build();
            var $input = angular.element(content)
                .addClass('datepicker-linkNativeElement-input');
            this.$compile($input)($scope);
            $element.addClass('datepicker-linkNativeElement')
                .removeAttr("href")
                .append($input);
        };
        DatePickerDirective.prototype.linkElement = function ($scope, $element, $attrs, ngModelCtrl, $ctrl) {
            this.setTabIndex($element);
            this.popover($scope, $element, $attrs, $ctrl);
        };
        DatePickerDirective.prototype.linkInline = function ($scope, $element, $attrs, ngModelCtrl, $ctrl) {
            var content = this.createContent($scope);
            $element.append(content);
        };
        DatePickerDirective.prototype.setTabIndex = function ($element) {
            var currentElement = $element.get(0);
            var currentTabIndex = currentElement.getAttribute("tabIndex");
            currentElement.setAttribute("tabIndex", currentTabIndex != null ? currentTabIndex : "-1");
        };
        DatePickerDirective.prototype.popover = function ($scope, $element, $attrs, $ctrl) {
            var _this = this;
            var content, tether, $body = angular.element('body');
            var doNotReopen = false;
            var onSelect = function () {
                $ctrl.isVisible = false;
                doNotReopen = true;
                $element.focus();
                doNotReopen = false;
            };
            $ctrl['dateSelected'] = function (date) {
                onSelect();
            };
            $ctrl['rangeSelected'] = function (start, end) {
                onSelect();
            };
            $element.on("click." + $scope.$id, function () {
                $ctrl.isVisible = true;
                $scope.$apply();
            });
            $element.on("focus." + $scope.$id, function () {
                if (doNotReopen)
                    return;
                $ctrl.isVisible = true;
                if (!content) {
                    content = _this.createDropDown($scope, $element, $attrs, $ctrl);
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
                    if ($ctrl.isSelecting)
                        return;
                    $ctrl.isVisible = false;
                    $scope.$apply();
                }, 300);
            });
            $body.on("click." + $scope.$id, function (e) {
                if (!$ctrl.isVisible)
                    return;
                if (!content || $element.is(e.target) || content.has(e.target).length > 0) {
                    _this.$timeout.cancel(blurTimer);
                    if (content && content.has(e.target).length > 0) {
                        $element.focus();
                    }
                    return;
                }
                $ctrl.isVisible = false;
                $scope.$apply();
            });
            $scope.$on('$destroy', function () {
                $body.off("click." + $scope.$id);
                if (content)
                    content.remove();
            });
        };
        DatePickerDirective.prototype.createDropDown = function ($scope, $element, $attrs, $ctrl) {
            var singleDateBinding = "date=\"" + this.controllerAs + ".date\" on-date-select=\"" + this.controllerAs + ".dateSelected(date)\"", rangeBinding = "start=\"" + this.controllerAs + ".start\" end=\"" + this.controllerAs + ".end\" on-range-select=\"" + this.controllerAs + ".rangeSelected(start,end)\"", bindings = $ctrl.isSingleDate ? singleDateBinding : rangeBinding, template = "<div class=\"datepicker-dropdown\" ng-class=\"{'datepicker-open':" + this.controllerAs + ".isVisible}\"><date-picker min-view=\"" + $attrs['minView'] + "\" is-selecting=\"" + this.controllerAs + ".isSelecting\" " + bindings + "\" highlighted=\"" + this.controllerAs + ".highlighted\" default-date=\"{{" + this.controllerAs + ".defaultDate}}\"></date-picker></div>", position = $element.position(), height = $element.outerHeight(), margin = ($element.outerHeight(true) - height), offset = margin / 2 + height;
            var content = angular.element(template);
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
        DatePickerDirective.prototype.setupDaySelect = function ($scope, $element, $ctrl) {
            var dayCss = '.datePickerDays-day', $body = angular.element('body'), mouseDown = "mousedown." + $scope.$id, mouseUp = "mouseup." + $scope.$id;
            var onSelected = function (range) {
                var days = range.getDays();
                $ctrl.selected(days);
                $scope.$apply();
            };
            $element.on(mouseDown, dayCss, function (e) {
                var range = new DatePickerMouseRange($ctrl, e);
                $ctrl.isSelecting = true;
                $body.on(mouseUp, function () {
                    $body.off(mouseUp);
                    $ctrl.isSelecting = false;
                    onSelected(range);
                });
            });
        };
        DatePickerDirective.prototype.setupRangeSelect = function ($scope, $element, $ctrl) {
            var $body = angular.element('body'), mouseDown = "mousedown." + $scope.$id, mouseOver = "mouseover." + $scope.$id, mouseUp = "mouseup." + $scope.$id, dayCss = '.datePickerDays-day';
            var onSelecting = function (range) {
                var days = range.getDays();
                $ctrl.selecting(days);
                $scope.$apply();
            };
            var onSelected = function (range) {
                var days = range.getDays();
                $ctrl.selected(days);
                $scope.$apply();
            };
            $element.on(mouseDown, dayCss, function (e) {
                var range = new DatePickerMouseRange($ctrl, e);
                $ctrl.isSelecting = true;
                $element.on(mouseOver, dayCss, function (e) {
                    range.setEnd(e);
                    onSelecting(range);
                });
                $body.on(mouseUp, function () {
                    $element.off(mouseOver);
                    $body.off(mouseUp);
                    $ctrl.isSelecting = false;
                    onSelected(range);
                });
            });
        };
        DatePickerDirective.$inject = ['$injector', '$compile', '$templateCache', '$timeout', '$window', 'datePickerService', 'isMobile'];
        return DatePickerDirective;
    }());
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
    }());
    var DatePickerMonth = (function () {
        function DatePickerMonth(value) {
            this.value = value;
            var m = moment();
            var thisMonth = m.month();
            this.name = m.month(value).format('MMM');
            this.isCurrentMonth = value === thisMonth;
        }
        return DatePickerMonth;
    }());
    var DatePickerYear = (function () {
        function DatePickerYear(value) {
            this.value = value;
            this.isCurrentYear = value === moment().year();
        }
        return DatePickerYear;
    }());
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
    }());
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
    }());
    Angular.module("ngDatePicker").service('datePickerService', DatePickerService);
})(DatePickerModule || (DatePickerModule = {}));
var DatePickerModule;
(function (DatePickerModule) {
    var TimePickerController = (function () {
        function TimePickerController() {
        }
        TimePickerController.prototype.$postLink = function () {
            this.setViewValue(this._time);
            this.initialized = true;
        };
        Object.defineProperty(TimePickerController.prototype, "time", {
            get: function () {
                return this._time;
            },
            set: function (value) {
                var hasChanged = this._time !== value;
                this._time = value;
                if (this.initialized) {
                    this.setViewValue(value);
                    if (hasChanged)
                        this.onChange({ time: value });
                }
            },
            enumerable: true,
            configurable: true
        });
        return TimePickerController;
    }());
    Angular.module("ngDatePicker").controller('timePicker', TimePickerController);
    var TimePickerDirective = (function () {
        function TimePickerDirective(timePickerService, isMobile, $parse) {
            var _this = this;
            this.timePickerService = timePickerService;
            this.isMobile = isMobile;
            this.$parse = $parse;
            this.restrict = 'A';
            this.require = ['timePicker', 'ngModel'];
            this.controller = TimePickerController;
            this.controllerAs = 'timepicker';
            this.bindToController = true;
            this.scope = {
                time: '=',
                onChange: '&'
            };
            this.link = function ($scope, $element, $attrs, _a) {
                var $ctrl = _a[0], $ngModelCtrl = _a[1];
                if (_this.isMobile) {
                    _this.linkMobile($scope, $element, $attrs, $ctrl, $ngModelCtrl);
                    return;
                }
                _this.linkDesktop($scope, $element, $attrs, $ctrl, $ngModelCtrl);
            };
            this.linkMobile = function ($scope, $element, $attrs, $ctrl, $ngModelCtrl) {
                $element.prop('type', 'time');
                var setViewValue = function (time) {
                    var viewValue = _this.timePickerService.formatIso(time);
                    $ngModelCtrl.$setViewValue(viewValue);
                    $ngModelCtrl.$render();
                };
                $ctrl.setViewValue = setViewValue;
                $ngModelCtrl.$viewChangeListeners.push(function () {
                    $ctrl.time = _this.timePickerService.formatIso($ngModelCtrl.$viewValue, null);
                });
            };
            this.linkDesktop = function ($scope, $element, $attrs, $ctrl, $ngModelCtrl) {
                var eventId = function () {
                    var names = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        names[_i - 0] = arguments[_i];
                    }
                    return names.map(function (name) { return (name + "." + $scope.$id); }).join(' ');
                };
                var update = function () {
                    $ctrl.time = _this.timePickerService.formatIso($ngModelCtrl.$modelValue, null);
                    var isValidTime = $ctrl.time != null;
                    var isRequired = $attrs['required'];
                    var isValid = !isRequired || (isRequired && isValidTime);
                    $ngModelCtrl.$setValidity('invalidTime', isValid);
                    $scope.$apply();
                };
                var updateOnEnter = function (e) {
                    var ENTER_KEY = 13;
                    var keyDown = function (e) { return e.which; };
                    if (keyDown(e) !== ENTER_KEY)
                        return;
                    update();
                };
                var setViewValue = function (time) {
                    var viewValue = _this.timePickerService.format(time);
                    $ngModelCtrl.$setViewValue(viewValue);
                    $ngModelCtrl.$render();
                };
                $ctrl.setViewValue = setViewValue;
                $element
                    .on(eventId('blur'), update)
                    .on(eventId('keydown'), updateOnEnter);
                $scope.$on('$destroy', function () {
                    $element.off(eventId('blur', 'keydown'));
                });
            };
        }
        TimePickerDirective.$inject = ['timePickerService', 'isMobile', '$parse'];
        return TimePickerDirective;
    }());
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
        TimePickerService.prototype.format = function (text, value) {
            if (value === void 0) { value = ''; }
            var m = this.parse(text);
            return m.isValid() ? m.format('LT') : value;
        };
        TimePickerService.prototype.formatIso = function (text, value) {
            if (value === void 0) { value = ''; }
            var m = this.parse(text);
            return m.isValid() ? m.format("HH:mm:ss") : value;
        };
        return TimePickerService;
    }());
    Angular.module("ngDatePicker").service('timePickerService', TimePickerService);
})(DatePickerModule || (DatePickerModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kYXRlcGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyIsIi4uL3NyYy9tb2JpbGUudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXIudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXItc2VydmljZS50cyIsIi4uL3NyYy90aW1lLXBpY2tlci50cyIsIi4uL3NyYy90aW1lLXBpY2tlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FDQW5DLElBQU8sZ0JBQWdCLENBY3RCO0FBZEQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBQ3JCO1FBQUE7UUFVQSxDQUFDO1FBVFUscUJBQVEsR0FBZjtZQUNJLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkUsSUFBSSxLQUFLLEdBQUcsMFRBQTBULENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5WLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksS0FBSyxHQUFHLHlrREFBeWtELENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXhtRCxNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUMxQixDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBVkQsSUFVQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUNqRixDQUFDLEVBZE0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQWN0QjtBQ2JELElBQU8sZ0JBQWdCLENBNjFCdEI7QUE3MUJELFdBQU8sZ0JBQWdCLEVBQUMsQ0FBQztJQUdyQjtRQUdJLDhCQUFvQixLQUEyQixFQUFFLENBQW9CO1lBQWpELFVBQUssR0FBTCxLQUFLLENBQXNCO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixDQUFDO1FBRU0sOEJBQVMsR0FBaEIsVUFBaUIsaUJBQXFDO1lBQ2xELG9CQUFvQixDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQy9ELENBQUM7UUFFRCx1Q0FBUSxHQUFSLFVBQVMsQ0FBb0I7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRCxxQ0FBTSxHQUFOLFVBQU8sQ0FBb0I7WUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFRCxzQ0FBTyxHQUFQO1lBQ0ksSUFBTSxJQUFJLEdBQUcsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVPLHlDQUFVLEdBQWxCLFVBQW1CLENBQW9CO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDVixNQUFNLENBQUM7WUFDWCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDaEMsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDO1FBSUwsMkJBQUM7SUFBRCxDQUFDLEFBcENELElBb0NDO0lBRUQsSUFBSyxjQUlKO0lBSkQsV0FBSyxjQUFjO1FBQ2YsbURBQVEsQ0FBQTtRQUNSLHVEQUFVLENBQUE7UUFDVixxREFBUyxDQUFBO0lBQ2IsQ0FBQyxFQUpJLGNBQWMsS0FBZCxjQUFjLFFBSWxCO0lBRUQ7UUFJSSw4QkFBb0IsTUFBMkIsRUFBVSxpQkFBcUM7WUFBMUUsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7WUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW9CO1lBb1Q5RixjQUFTLEdBQUcsWUFBWSxDQUFDO1lBblRyQixvQkFBb0IsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUVsRCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXBELE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLEtBQUssT0FBTztvQkFDUixJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztvQkFDcEMsS0FBSyxDQUFDO2dCQUNWLEtBQUssUUFBUTtvQkFDVCxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztvQkFDckMsS0FBSyxDQUFDO2dCQUNWO29CQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztvQkFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDO29CQUNuQyxLQUFLLENBQUM7WUFDZCxDQUFDO1FBQ0wsQ0FBQztRQUVELHNDQUFPLEdBQVA7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFFNUIsSUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDdEYsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFFeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsd0NBQVMsR0FBVDtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLENBQUM7WUFDWCxDQUFDO1lBQ0QsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzdDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUE7UUFDL0MsQ0FBQztRQUlELHNCQUFXLHNDQUFJO2lCQUFmO2dCQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBQ0QsVUFBZ0IsS0FBb0I7Z0JBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsQ0FBQzs7O1dBSEE7UUFPRCxzQkFBVyx1Q0FBSztpQkFBaEI7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQztpQkFDRCxVQUFpQixLQUFvQjtnQkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUM7OztXQUhBO1FBTUQsc0JBQVcscUNBQUc7aUJBQWQ7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckIsQ0FBQztpQkFDRCxVQUFlLEtBQW9CO2dCQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEMsQ0FBQzs7O1dBSEE7UUFLRCxzQ0FBTyxHQUFQLFVBQVEsSUFBbUI7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBRUQsdUNBQVEsR0FBUixVQUFTLEtBQW9CLEVBQUUsR0FBa0I7WUFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFFaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUlELHNCQUFJLDhDQUFZO2lCQUFoQjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUM5QixDQUFDOzs7V0FBQTtRQUVPLDhDQUFlLEdBQXZCLFVBQXdCLEtBQW9DO1lBQ3hELElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDO1lBRWhFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFTyx3Q0FBUyxHQUFqQixVQUFrQixRQUF1QjtZQUNyQyxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFDM0QsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQW9CLENBQUM7WUFDM0MsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsS0FBSyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ3hFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixDQUFDO1lBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFRCwwQ0FBVyxHQUFYLFVBQWEsSUFBSTtZQUNiLDZCQUE2QjtRQUNqQyxDQUFDOztRQUVELDJDQUFZLEdBQVosVUFBYyxLQUFLLEVBQUUsR0FBRztZQUNwQiw2QkFBNkI7UUFDakMsQ0FBQzs7UUFFRCxzQkFBSSx1Q0FBSztpQkFBVDtnQkFDSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEIsUUFBUTtvQkFDUixLQUFLLGNBQWMsQ0FBQyxJQUFJO3dCQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ2xELEtBQUssY0FBYyxDQUFDLE1BQU07d0JBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDN0MsS0FBSyxjQUFjLENBQUMsS0FBSzt3QkFDckIsTUFBTSxDQUFDLGVBQWUsQ0FBQztnQkFDL0IsQ0FBQztZQUNMLENBQUM7OztXQUFBO1FBRUQsc0JBQUksMENBQVE7aUJBQVo7Z0JBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLEtBQUssY0FBYyxDQUFDLE1BQU07d0JBQ3RCLE1BQU0sQ0FBQyxRQUFRLENBQUM7b0JBQ3BCLEtBQUssY0FBYyxDQUFDLEtBQUs7d0JBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUM7b0JBQ25CLFFBQVE7b0JBQ1IsS0FBSyxjQUFjLENBQUMsSUFBSTt3QkFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDdEIsQ0FBQztZQUNMLENBQUM7OztXQUFBO1FBRUQsdUNBQVEsR0FBUjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztnQkFDbkMsTUFBTSxDQUFDO1lBQ1gsSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDO1FBQ3BDLENBQUM7UUFFRCx5Q0FBVSxHQUFWO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO2dCQUNyQyxNQUFNLENBQUM7WUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7UUFDdEMsQ0FBQztRQUVELHdDQUFTLEdBQVQ7WUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDckMsQ0FBQztRQUVELHlDQUFVLEdBQVYsVUFBVyxHQUFtQjtZQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUV2RCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztnQkFDckQsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQ3BDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVELDRDQUFhLEdBQWIsVUFBYyxHQUFtQjtZQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQztnQkFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUVqQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQy9DLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNwQixDQUFDO1lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsd0NBQVMsR0FBVCxVQUFVLElBQXNCO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUVELHVDQUFRLEdBQVIsVUFBUyxJQUFzQjtZQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUvQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQsMkNBQVksR0FBWixVQUFhLEdBQW1CO1lBQzVCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFFRCw0Q0FBYSxHQUFiLFVBQWMsUUFBd0IsRUFBRSxNQUFzQjtZQUMxRCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUQsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCwwQ0FBVyxHQUFYLFVBQVksR0FBRztZQUNYLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDNUUsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUMxRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDOUIsQ0FBQztnQkFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUVELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQseUNBQVUsR0FBVixVQUFXLEdBQUc7WUFDVixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQzdFLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUVPLHlDQUFVLEdBQWxCLFVBQW1CLE1BQThDO1lBQzdELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFFRCxzQ0FBTyxHQUFQLFVBQVEsS0FBSztZQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEQsQ0FBQztRQUVELHVDQUFRLEdBQVIsVUFBUyxLQUFLO1lBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUVELHFDQUFNLEdBQU4sVUFBTyxJQUFJO1lBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNsRCxDQUFDO1FBRUQsc0NBQU8sR0FBUCxVQUFRLElBQUk7WUFDUixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQsd0NBQVMsR0FBVDtZQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFRCx3Q0FBUyxHQUFUO1lBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVELHVDQUFRLEdBQVI7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBRUQsdUNBQVEsR0FBUjtZQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFRCx3Q0FBUyxHQUFUO1lBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVELHdDQUFTLEdBQVQ7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBelNNLDRCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQTRUckQsMkJBQUM7SUFBRCxDQUFDLEFBOVRELElBOFRDO0lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFFOUU7UUFHSSw2QkFBb0IsU0FBUyxFQUFVLFFBQVEsRUFBVSxjQUFjLEVBQVUsUUFBUSxFQUFVLE9BQU8sRUFBVSxpQkFBcUMsRUFBVSxRQUFpQjtZQUh4TCxpQkF5ZUM7WUF0ZXVCLGNBQVMsR0FBVCxTQUFTLENBQUE7WUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFBO1lBQVUsbUJBQWMsR0FBZCxjQUFjLENBQUE7WUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFBO1lBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBQTtZQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBb0I7WUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFTO1lBRXBMLGFBQVEsR0FBRyxJQUFJLENBQUM7WUFDaEIsWUFBTyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLGVBQVUsR0FBRyxvQkFBb0IsQ0FBQztZQUNsQyxpQkFBWSxHQUFHLFlBQVksQ0FBQztZQUM1QixxQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDeEIsVUFBSyxHQUFHO2dCQUNKLGNBQWM7Z0JBQ2QsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLFlBQVksRUFBRSxHQUFHO2dCQUVqQixRQUFRO2dCQUNSLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixLQUFLLEVBQUUsT0FBTztnQkFDZCxhQUFhLEVBQUUsR0FBRztnQkFFbEIsUUFBUTtnQkFDUixXQUFXLEVBQUUsSUFBSTtnQkFDakIsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLFFBQVEsRUFBRSxHQUFHO2dCQUViLDhEQUE4RDtnQkFDOUQsV0FBVyxFQUFFLElBQUk7YUFDcEIsQ0FBQztZQUVGLHFCQUFnQixHQUFHLGtCQUFrQixDQUFDO1lBRXRDLFNBQUksR0FBRyxVQUFDLE1BQXNCLEVBQUUsUUFBa0MsRUFBRSxNQUEyQixFQUFFLEVBQXFFO29CQUFwRSxhQUFLLEVBQUUsZ0JBQVE7Z0JBQzdHLEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRTlCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNoQixLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDL0QsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDaEUsQ0FBQztZQUNMLENBQUMsQ0FBQztZQUVGLGVBQVUsR0FBRyxVQUFDLE1BQXNCLEVBQUUsUUFBa0MsRUFBRSxNQUEyQixFQUFFLFFBQW9DLEVBQUUsS0FBMkI7Z0JBQ3BLLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixLQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDcEUsQ0FBQztnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMvRCxDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3RFLENBQUM7WUFDTCxDQUFDLENBQUE7WUFFRCxnQkFBVyxHQUFHLFVBQUMsTUFBc0IsRUFBRSxRQUFrQyxFQUFFLE1BQTJCLEVBQUUsUUFBb0MsRUFBRSxLQUEyQjtnQkFDckssRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO2dCQUM3RCxDQUFDO2dCQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQy9ELENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2hFLENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDakQsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztZQUNMLENBQUMsQ0FBQTtRQWxFdUwsQ0FBQztRQW9FekwscUNBQU8sR0FBUCxVQUFRLFFBQWtDO1lBQ3RDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVELHVDQUFTLEdBQVQsVUFBVSxRQUFrQztZQUN4QyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQ7O1dBRUc7UUFDSCw0Q0FBYyxHQUFkLFVBQWUsUUFBa0M7WUFDN0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUMsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztnQkFDakIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVELDZDQUFlLEdBQWYsVUFBZ0IsTUFBc0IsRUFBRSxRQUFrQyxFQUFFLE1BQTJCLEVBQUUsUUFBb0MsRUFBRSxLQUEyQjtZQUN0SyxJQUFNLE1BQU0sR0FBRyxVQUFDLElBQUksRUFBRSxPQUFPLElBQWEsT0FBQSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBbEQsQ0FBa0QsQ0FBQztZQUM3RixJQUFNLFVBQVUsR0FBRyxVQUFDLElBQUksSUFBSyxPQUFBLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLEVBQTFCLENBQTBCLENBQUM7WUFDeEQsSUFBTSxXQUFXLEdBQUcsVUFBQyxJQUFJLElBQUssT0FBQSxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUF2QixDQUF1QixDQUFDO1lBRXRELElBQUksSUFBSSxHQUFHLE1BQU0sRUFDYixTQUFTLEdBQUcsVUFBVSxDQUFDO1lBRTNCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLEdBQUcsT0FBTyxDQUFDO2dCQUNmLFNBQVMsR0FBRyxXQUFXLENBQUM7WUFDNUIsQ0FBQztZQUVELElBQU0sV0FBVyxHQUFHLFVBQUMsSUFBSTtnQkFDckIsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQixRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxDQUFDO1lBRUYsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUIsS0FBSyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFFaEMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQztnQkFDL0IsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUMsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMxRSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELHVDQUFTLEdBQVQsVUFBVSxNQUFzQixFQUFFLFFBQWtDLEVBQUUsTUFBMkIsRUFBRSxXQUF1QyxFQUFFLEtBQTJCO1lBQXZLLGlCQTRGQztZQTNGRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTlDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFNLGNBQVksR0FBRyxVQUFDLElBQUk7b0JBQ3RCLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3hELFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDO2dCQUVGLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLEtBQUssQ0FBQyxJQUFJLEVBQVYsQ0FBVSxFQUFFLFVBQUEsSUFBSTtvQkFDaEMsY0FBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFNLGNBQVksR0FBRyxVQUFDLEtBQUssRUFBRSxHQUFHO29CQUU1QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQ2QsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUN0QixJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUV2QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzVCLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM5QixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNKLElBQUksR0FBTSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFHLENBQUM7d0JBQ3pELENBQUM7b0JBRUwsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNuQyxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDckIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25DLENBQUM7b0JBRUQsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMxQixDQUFDLENBQUM7Z0JBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsS0FBSyxDQUFDLEtBQUssRUFBWCxDQUFXLEVBQUUsVUFBQSxLQUFLO29CQUNsQyxjQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsS0FBSyxDQUFDLEdBQUcsRUFBVCxDQUFTLEVBQUUsVUFBQSxHQUFHO29CQUM5QixjQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFVLE1BQU0sQ0FBQyxHQUFLLEVBQUU7Z0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUNyQixJQUFNLElBQUksR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFMUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNwQixNQUFNLENBQUM7b0JBQ1gsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQy9CLE1BQU0sQ0FBQztvQkFFWCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNoQixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDL0IsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFFSixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUM3QixHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFFNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNyQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDM0IsTUFBTSxDQUFDO3dCQUNYLENBQUM7d0JBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQzs0QkFDakUsTUFBTSxDQUFDO3dCQUVYLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzNDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLGFBQVcsTUFBTSxDQUFDLEdBQUssRUFBRSxVQUFBLENBQUM7Z0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBRWhCLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELCtDQUFpQixHQUFqQixVQUFrQixNQUFzQixFQUFFLFFBQWtDLEVBQUUsTUFBMkIsRUFBRSxXQUF1QyxFQUFFLEtBQTJCO1lBQS9LLGlCQXVFQztZQXRFRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTNCLElBQU0sS0FBSyxHQUFHLFVBQUMsSUFBSSxJQUFLLE9BQUEsQ0FBRyxLQUFJLENBQUMsWUFBWSxTQUFJLElBQUksQ0FBRSxFQUE5QixDQUE4QixDQUFDO1lBQ3ZELElBQU0sT0FBTyxHQUFHLFVBQUMsSUFBSSxFQUFFLEtBQUssSUFBSyxPQUFBLENBQUcsSUFBSSxXQUFLLEtBQUssUUFBRyxFQUFwQixDQUFvQixDQUFBO1lBQ3JELElBQU0sU0FBUyxHQUFHLFVBQUMsSUFBSSxFQUFFLEtBQUssSUFBSyxPQUFBLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQTNCLENBQTJCLENBQUM7WUFFL0Q7Z0JBQUEsaUJBc0NDO2dCQXJDRyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQUMsSUFBSSxFQUFFLEtBQUs7b0JBQ3ZCLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDdEMsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFDcEIsQ0FBQyxDQUFBO2dCQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBQyxJQUFJLEVBQUUsSUFBSTtvQkFDekIsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDO3dCQUNuQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pELE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQTtnQkFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO29CQUMvQixFQUFFLENBQUEsQ0FBQyxPQUFPLElBQUksSUFBSSxRQUFRLENBQUM7d0JBQ3ZCLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLFdBQVcsQ0FBQzt3QkFDM0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUNwQixDQUFDLENBQUE7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFDLElBQVksRUFBRSxFQUFZO29CQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNqQixNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUNwQixDQUFDLENBQUE7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtvQkFDN0IsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDO3dCQUNuQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzNDLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQTtnQkFFRCxJQUFJLENBQUMsS0FBSyxHQUFHO29CQUNULElBQU0sT0FBTyxHQUFHLHdCQUFzQixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBWSxDQUFDO29CQUN2RSxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUNuQixDQUFDLENBQUE7WUFDTCxDQUFDO1lBRUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUU7aUJBQzVCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO2lCQUN2QixVQUFVLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQztpQkFDakMsVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDO2lCQUMxQyxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7aUJBR2xDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztpQkFDckMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO2lCQUcvQixVQUFVLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUM7aUJBQ3hELFVBQVUsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDO2lCQUN6QyxVQUFVLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUU3RCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFaEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7aUJBQ2xDLFFBQVEsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFOUIsUUFBUSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQztpQkFDNUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztpQkFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFFRCx5Q0FBVyxHQUFYLFVBQVksTUFBc0IsRUFBRSxRQUFrQyxFQUFFLE1BQTJCLEVBQUUsV0FBdUMsRUFBRSxLQUEyQjtZQUNySyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELHdDQUFVLEdBQVYsVUFBVyxNQUFzQixFQUFFLFFBQWtDLEVBQUUsTUFBMkIsRUFBRSxXQUF1QyxFQUFFLEtBQTJCO1lBQ3BLLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0MsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQseUNBQVcsR0FBWCxVQUFZLFFBQWtDO1lBQzFDLElBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxlQUFlLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5RCxjQUFjLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxlQUFlLElBQUksSUFBSSxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM5RixDQUFDO1FBRUQscUNBQU8sR0FBUCxVQUFRLE1BQXNCLEVBQUUsUUFBa0MsRUFBRSxNQUEyQixFQUFFLEtBQTJCO1lBQTVILGlCQTBGQztZQXpGRyxJQUFJLE9BQU8sRUFDUCxNQUFNLEVBQ04sS0FBSyxHQUFRLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFekMsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQU0sUUFBUSxHQUFHO2dCQUNiLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2pCLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQyxDQUFDO1lBRUYsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLFVBQUMsSUFBSTtnQkFDekIsUUFBUSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUM7WUFFRixLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsVUFBQyxLQUFLLEVBQUUsR0FBRztnQkFDaEMsUUFBUSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUM7WUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVMsTUFBTSxDQUFDLEdBQUssRUFBRTtnQkFDL0IsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBUyxNQUFNLENBQUMsR0FBSyxFQUFFO2dCQUMvQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUM7b0JBQ1osTUFBTSxDQUFDO2dCQUVYLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUV2QixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ1gsT0FBTyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQy9ELEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3RCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFFaEIsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDO3dCQUNoQixNQUFNLEVBQUUsUUFBUTt3QkFDaEIsZ0JBQWdCLEVBQUUsZUFBZTt3QkFDakMsT0FBTyxFQUFFLE9BQU87d0JBQ2hCLFVBQVUsRUFBRSxZQUFZO3dCQUN4QixXQUFXLEVBQUUsWUFBWTt3QkFDekIsWUFBWSxFQUFFLFFBQVE7d0JBQ3RCLFdBQVcsRUFBRTs0QkFDVDtnQ0FDSSxFQUFFLEVBQUUsUUFBUTtnQ0FDWixVQUFVLEVBQUUsVUFBVTtnQ0FDdEIsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDOzZCQUMxQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksU0FBUyxDQUFDO1lBQ2QsUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFRLE1BQU0sQ0FBQyxHQUFLLEVBQUU7Z0JBQzlCLG9EQUFvRDtnQkFDcEQsU0FBUyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7d0JBQ2xCLE1BQU0sQ0FBQztvQkFFWCxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDeEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNwQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztZQUVILEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBUyxNQUFNLENBQUMsR0FBSyxFQUFFLFVBQUEsQ0FBQztnQkFDN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO29CQUNqQixNQUFNLENBQUM7Z0JBRVgsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hFLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNoQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDckIsQ0FBQztvQkFDRCxNQUFNLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRCxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDeEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBUyxNQUFNLENBQUMsR0FBSyxDQUFDLENBQUM7Z0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsNENBQWMsR0FBZCxVQUFlLE1BQXNCLEVBQUUsUUFBa0MsRUFBRSxNQUEyQixFQUFFLEtBQTJCO1lBQy9ILElBQUksaUJBQWlCLEdBQUcsWUFBUyxJQUFJLENBQUMsWUFBWSxpQ0FBMEIsSUFBSSxDQUFDLFlBQVksMEJBQXNCLEVBQy9HLFlBQVksR0FBRyxhQUFVLElBQUksQ0FBQyxZQUFZLHVCQUFnQixJQUFJLENBQUMsWUFBWSxpQ0FBMEIsSUFBSSxDQUFDLFlBQVksZ0NBQTRCLEVBQ2xKLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLGlCQUFpQixHQUFHLFlBQVksRUFDaEUsUUFBUSxHQUFHLHNFQUFpRSxJQUFJLENBQUMsWUFBWSw4Q0FBdUMsTUFBTSxDQUFDLFNBQVMsQ0FBQywwQkFBbUIsSUFBSSxDQUFDLFlBQVksdUJBQWlCLFFBQVEseUJBQWtCLElBQUksQ0FBQyxZQUFZLHdDQUFpQyxJQUFJLENBQUMsWUFBWSwwQ0FBc0MsRUFDN1UsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFDOUIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDL0IsTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsRUFDOUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBRWpDLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDUixHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxNQUFNO2dCQUMxQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7YUFDdEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUvQixNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ25CLENBQUM7UUFFRCw0Q0FBYyxHQUFkLFVBQWUsQ0FBb0I7WUFDL0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxzQ0FBUSxHQUFSLFVBQVMsQ0FBb0I7WUFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFRCwyQ0FBYSxHQUFiLFVBQWMsTUFBc0I7WUFDaEMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDaEUsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUVELDRDQUFjLEdBQWQsVUFBZSxNQUFzQixFQUFFLFFBQWtDLEVBQUUsS0FBMkI7WUFDbEcsSUFBTSxNQUFNLEdBQUcscUJBQXFCLEVBQ2hDLEtBQUssR0FBUSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUNwQyxTQUFTLEdBQUcsZUFBYSxNQUFNLENBQUMsR0FBSyxFQUNyQyxPQUFPLEdBQUcsYUFBVyxNQUFNLENBQUMsR0FBSyxDQUFDO1lBRXRDLElBQU0sVUFBVSxHQUFHLFVBQUMsS0FBMkI7Z0JBQzNDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDM0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQztZQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFDLENBQW9CO2dCQUNoRCxJQUFNLEtBQUssR0FBRyxJQUFJLG9CQUFvQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDakQsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBRXpCLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO29CQUNkLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ25CLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUMxQixVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsOENBQWdCLEdBQWhCLFVBQWlCLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBMkI7WUFDMUQsSUFBTSxLQUFLLEdBQVEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFDdEMsU0FBUyxHQUFHLGVBQWEsTUFBTSxDQUFDLEdBQUssRUFDckMsU0FBUyxHQUFHLGVBQWEsTUFBTSxDQUFDLEdBQUssRUFDckMsT0FBTyxHQUFHLGFBQVcsTUFBTSxDQUFDLEdBQUssRUFDakMsTUFBTSxHQUFHLHFCQUFxQixDQUFDO1lBRW5DLElBQU0sV0FBVyxHQUFHLFVBQUMsS0FBMkI7Z0JBQzVDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDN0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQztZQUVGLElBQU0sVUFBVSxHQUFHLFVBQUMsS0FBMkI7Z0JBQzNDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDN0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQztZQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFDLENBQW9CO2dCQUNoRCxJQUFNLEtBQUssR0FBRyxJQUFJLG9CQUFvQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDakQsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBRXpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFDLENBQW9CO29CQUNoRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQixXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO2dCQUVILEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO29CQUNkLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3hCLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ25CLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUMxQixVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBdmVNLDJCQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLENBQUM7UUF3ZXpILDBCQUFDO0lBQUQsQ0FBQyxBQXplRCxJQXllQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2hGLENBQUMsRUE3MUJNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUE2MUJ0QjtBQzkxQkQsSUFBTyxnQkFBZ0IsQ0E4TnRCO0FBOU5ELFdBQU8sZ0JBQWdCLEVBQUMsQ0FBQztJQVFyQjtRQUNJLHlCQUFZLEtBQVUsRUFBRSxHQUFRO1lBQzVCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQztnQkFDbEIsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDZCxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFJTCxzQkFBQztJQUFELENBQUMsQUFqQkQsSUFpQkM7SUFTRDtRQUNJLHlCQUFtQixLQUFhO1lBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUM1QixJQUFJLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQztZQUNqQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssS0FBSyxTQUFTLENBQUM7UUFDOUMsQ0FBQztRQUlMLHNCQUFDO0lBQUQsQ0FBQyxBQVZELElBVUM7SUFRRDtRQUNJLHdCQUFtQixLQUFhO1lBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssS0FBSyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuRCxDQUFDO1FBR0wscUJBQUM7SUFBRCxDQUFDLEFBTkQsSUFNQztJQWFEO1FBQ0ksdUJBQVksUUFBYSxFQUFFLFNBQWM7WUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFRRCxnQ0FBUSxHQUFSLFVBQVMsR0FBbUI7WUFDeEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFRCw4QkFBTSxHQUFOLFVBQU8sR0FBbUI7WUFDdEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUF2QkQsSUF1QkM7SUFlRDtRQUFBO1FBOEdBLENBQUM7UUE3R0cscUNBQVMsR0FBVDtZQUNJLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFvQixDQUFDO1lBRTNDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxDQUFDO1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQsb0NBQVEsR0FBUixVQUFTLFFBQVE7WUFDYixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQ2xDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBbUIsQ0FBQztZQUV6QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDM0MsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELG1DQUFPLEdBQVAsVUFBUSxRQUFRLEVBQUUsV0FBVztZQUN6QixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWxELElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxFQUFrQixDQUFDO1lBQ3ZDLEdBQUcsQ0FBQyxDQUFDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ2hHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELHlDQUFhLEdBQWI7WUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2xDLENBQUM7UUFFRCx3Q0FBWSxHQUFaLFVBQWEsS0FBcUIsRUFBRSxHQUFtQixFQUFFLEtBQXlCO1lBRTlFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ2pCLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBQ1osR0FBRyxHQUFHLElBQUksQ0FBQztZQUNmLENBQUM7WUFFRCxJQUFJLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBa0IsRUFDckMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUVyQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztvQkFDWixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNsQixRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUVwQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3RCLENBQUM7b0JBRUQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDaEIsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDekIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUVELHVDQUFXLEdBQVgsVUFBWSxLQUF5QjtZQUNqQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztvQkFDWixHQUFHLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxzQ0FBVSxHQUFWLFVBQVcsSUFBc0I7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVELHlDQUFhLEdBQWIsVUFBYyxLQUFhO1lBQ3ZCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUMvQixJQUFJLE9BQU8sR0FBRztnQkFDVixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztxQkFDbkIsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7cUJBQ2xCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO3FCQUNuQixPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7cUJBQ25CLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO3FCQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztxQkFDbkIsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7YUFDM0IsQ0FBQztZQUVGLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsd0NBQVksR0FBWixVQUFhLEtBQWE7WUFDdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsSUFBSSxPQUFPLEdBQUcsS0FBSztpQkFDZCxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztpQkFDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7aUJBQ25CLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2lCQUNuQixJQUFJLEVBQUUsQ0FBQztZQUNaLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDcEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNsRCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN0RCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDdEUsSUFBSSxLQUFLLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FBQyxBQTlHRCxJQThHQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDbkYsQ0FBQyxFQTlOTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBOE50QjtBQzdORCxJQUFPLGdCQUFnQixDQXVIdEI7QUF2SEQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBRXJCO1FBQUE7UUEwQkEsQ0FBQztRQXpCVyx3Q0FBUyxHQUFqQjtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUM7UUFJRCxzQkFBSSxzQ0FBSTtpQkFBUjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDO2lCQUVELFVBQVMsS0FBYTtnQkFDbEIsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUVuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDO3dCQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztZQUNMLENBQUM7OztXQVhBO1FBZ0JMLDJCQUFDO0lBQUQsQ0FBQyxBQTFCRCxJQTBCQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBRTlFO1FBR0ksNkJBQW9CLGlCQUFxQyxFQUFVLFFBQWlCLEVBQVUsTUFBNkI7WUFIL0gsaUJBb0ZDO1lBakZ1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW9CO1lBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBUztZQUFVLFdBQU0sR0FBTixNQUFNLENBQXVCO1lBRzNILGFBQVEsR0FBRyxHQUFHLENBQUM7WUFDZixZQUFPLEdBQUcsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDcEMsZUFBVSxHQUFHLG9CQUFvQixDQUFDO1lBQ2xDLGlCQUFZLEdBQUcsWUFBWSxDQUFDO1lBQzVCLHFCQUFnQixHQUFHLElBQUksQ0FBQztZQUN4QixVQUFLLEdBQUc7Z0JBQ0osSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsUUFBUSxFQUFFLEdBQUc7YUFDaEIsQ0FBQztZQUVGLFNBQUksR0FBRyxVQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQXlFO29CQUF4RSxhQUFLLEVBQUUsb0JBQVk7Z0JBQ2xELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNoQixLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDL0QsTUFBTSxDQUFDO2dCQUNYLENBQUM7Z0JBRUQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDcEUsQ0FBQyxDQUFDO1lBRUYsZUFBVSxHQUFHLFVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBMkIsRUFBRSxZQUF3QztnQkFDekcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRTlCLElBQU0sWUFBWSxHQUFHLFVBQUMsSUFBWTtvQkFDOUIsSUFBTSxTQUFTLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekQsWUFBWSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdEMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMzQixDQUFDLENBQUE7Z0JBRUQsS0FBSyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7Z0JBRWxDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7b0JBQ25DLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNqRixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQztZQUVGLGdCQUFXLEdBQUcsVUFBQyxNQUFNLEVBQUUsUUFBa0MsRUFBRSxNQUFNLEVBQUUsS0FBMkIsRUFBRSxZQUF3QztnQkFDcEksSUFBTSxPQUFPLEdBQUc7b0JBQUMsZUFBa0I7eUJBQWxCLFdBQWtCLENBQWxCLHNCQUFrQixDQUFsQixJQUFrQjt3QkFBbEIsOEJBQWtCOztvQkFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFHLElBQUksU0FBSSxNQUFNLENBQUMsR0FBRyxDQUFFLEVBQXZCLENBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hFLENBQUMsQ0FBQztnQkFFRixJQUFNLE1BQU0sR0FBRztvQkFDWCxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFOUUsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUE7b0JBQ3RDLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDdEMsSUFBTSxPQUFPLEdBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxVQUFVLElBQUksV0FBVyxDQUFDLENBQUM7b0JBQzNELFlBQVksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUVsRCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQztnQkFFRixJQUFNLGFBQWEsR0FBRyxVQUFDLENBQUM7b0JBQ3BCLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztvQkFDckIsSUFBTSxPQUFPLEdBQUcsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxFQUFQLENBQU8sQ0FBQztvQkFFN0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQzt3QkFDekIsTUFBTSxDQUFDO29CQUVYLE1BQU0sRUFBRSxDQUFDO2dCQUNiLENBQUMsQ0FBQTtnQkFFRCxJQUFNLFlBQVksR0FBRyxVQUFDLElBQVk7b0JBQzlCLElBQU0sU0FBUyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RELFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3RDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDM0IsQ0FBQyxDQUFBO2dCQUVELEtBQUssQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO2dCQUVsQyxRQUFRO3FCQUNILEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDO3FCQUMzQixFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUUzQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtvQkFDbkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDO1FBOUVGLENBQUM7UUFITSwyQkFBTyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBbUZqRSwwQkFBQztJQUFELENBQUMsQUFwRkQsSUFvRkM7SUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUNoRixDQUFDLEVBdkhNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUF1SHRCO0FDeEhELElBQU8sZ0JBQWdCLENBK0J0QjtBQS9CRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFRckI7UUFBQTtRQW9CQSxDQUFDO1FBbkJHLGlDQUFLLEdBQUwsVUFBTSxJQUFZO1lBQ2QsSUFBSSxRQUFRLEdBQUc7Z0JBQ1gsSUFBSTtnQkFDSixLQUFLO2dCQUNMLFVBQVU7Z0JBQ1YsU0FBUzthQUNaLENBQUM7WUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQsa0NBQU0sR0FBTixVQUFPLElBQVksRUFBRSxLQUFrQjtZQUFsQixxQkFBa0IsR0FBbEIsVUFBa0I7WUFDbkMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hELENBQUM7UUFFRCxxQ0FBUyxHQUFULFVBQVUsSUFBWSxFQUFFLEtBQWtCO1lBQWxCLHFCQUFrQixHQUFsQixVQUFrQjtZQUN0QyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDdEQsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FBQyxBQXBCRCxJQW9CQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDbkYsQ0FBQyxFQS9CTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBK0J0QiIsInNvdXJjZXNDb250ZW50IjpbIkFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIsIFtdKTsiLCJtb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcbiAgICBjbGFzcyBNb2JpbGVDb25maWcge1xyXG4gICAgICAgIHN0YXRpYyBpc01vYmlsZSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvd1tcIm9wZXJhXCJdO1xyXG4gICAgICAgICAgICB2YXIgdGVzdDEgPSAvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2kudGVzdChhZ2VudCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWdlbnRQcmVmaXggPSBhZ2VudC5zdWJzdHIoMCwgNCk7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0MiA9IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYWdlbnRQcmVmaXgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRlc3QxIHx8IHRlc3QyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5jb25zdGFudCgnaXNNb2JpbGUnLCBNb2JpbGVDb25maWcuaXNNb2JpbGUoKSk7XHJcbn0iLCJcclxubW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG4gICAgZGVjbGFyZSB2YXIgVGV0aGVyOiBhbnk7XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlck1vdXNlUmFuZ2Uge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRhdGVQaWNrZXJTZXJ2aWNlOiBJRGF0ZVBpY2tlclNlcnZpY2U7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyLCBlOiBKUXVlcnlFdmVudE9iamVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXJ0KGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEVuZChlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBib290c3RyYXAoZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZSkge1xyXG4gICAgICAgICAgICBEYXRlUGlja2VyTW91c2VSYW5nZS5kYXRlUGlja2VyU2VydmljZSA9IGRhdGVQaWNrZXJTZXJ2aWNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3RhcnQoZTogSlF1ZXJ5RXZlbnRPYmplY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IHRoaXMuZ2V0RWxlbWVudChlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEVuZChlOiBKUXVlcnlFdmVudE9iamVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IHRoaXMuZ2V0RWxlbWVudChlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldERheXMoKTogSURhdGVQaWNrZXJEYXlbXSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRheXMgPSBEYXRlUGlja2VyTW91c2VSYW5nZS5kYXRlUGlja2VyU2VydmljZS5nZXRSYW5nZURheXModGhpcy5zdGFydCwgdGhpcy5lbmQsIHRoaXMuJGN0cmwud2Vla3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RWxlbWVudChlOiBKUXVlcnlFdmVudE9iamVjdCk6IElEYXRlUGlja2VyRGF5IHtcclxuICAgICAgICAgICAgaWYgKCFlLnRhcmdldClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgJGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICBjb25zdCAkc2NvcGUgPSAkZWxlbWVudC5zY29wZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXkgPSAkc2NvcGVbJ2RheSddO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnQ6IElEYXRlUGlja2VyRGF5O1xyXG4gICAgICAgIGVuZDogSURhdGVQaWNrZXJEYXk7XHJcbiAgICB9XHJcblxyXG4gICAgZW51bSBEYXRlUGlja2VyVmlldyB7XHJcbiAgICAgICAgRGF5cyA9IDAsXHJcbiAgICAgICAgTW9udGhzID0gMSxcclxuICAgICAgICBZZWFycyA9IDJcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyQ29udHJvbGxlciB7XHJcblxyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnLCAnZGF0ZVBpY2tlclNlcnZpY2UnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsIHByaXZhdGUgZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZSkge1xyXG4gICAgICAgICAgICBEYXRlUGlja2VyTW91c2VSYW5nZS5ib290c3RyYXAoZGF0ZVBpY2tlclNlcnZpY2UpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pc1NpbmdsZURhdGUgPSAoJGF0dHJzWydzdGFydCddID09IG51bGwgJiYgJGF0dHJzWydlbmQnXSA9PSBudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5tb250aE5hbWVzID0gZGF0ZVBpY2tlclNlcnZpY2UuZ2V0TW9udGhzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF5c09mV2VlayA9IGRhdGVQaWNrZXJTZXJ2aWNlLmdldERheXNPZldlZWsoKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoJGF0dHJzWydtaW5WaWV3J10pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXJzJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5ZZWFycztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblZpZXcgPSBEYXRlUGlja2VyVmlldy5ZZWFycztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3Lk1vbnRocztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuRGF5cztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkb25Jbml0KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWZhdWx0RGF0ZSA9PSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0RGF0ZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkYXRlSW50ZXJuYWwgPSAodGhpcy5pc1NpbmdsZURhdGUgPyB0aGlzLmRhdGUgOiB0aGlzLnN0YXJ0KSB8fCB0aGlzLmRlZmF1bHREYXRlO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZUludGVybmFsKGRhdGVJbnRlcm5hbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcG9zdExpbmsoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWaWV3RGF0ZSh0aGlzLmRhdGUgfHwgdGhpcy5kZWZhdWx0RGF0ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLnN0YXJ0IHx8IHRoaXMuZGVmYXVsdERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1JhbmdlKHN0YXJ0LCB0aGlzLmVuZCB8fCBzdGFydClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNpbmdsZSBEYXRlXHJcbiAgICAgICAgX2RhdGU6IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgcHVibGljIGdldCBkYXRlKCk6IHN0cmluZyB8IERhdGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBkYXRlKHZhbHVlOiBzdHJpbmcgfCBEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSYW5nZVxyXG4gICAgICAgIF9zdGFydDogc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICBwdWJsaWMgZ2V0IHN0YXJ0KCk6IHN0cmluZyB8IERhdGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgc3RhcnQodmFsdWU6IHN0cmluZyB8IERhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRSYW5nZSh2YWx1ZSwgdGhpcy5fZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9lbmQ6IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgcHVibGljIGdldCBlbmQoKTogc3RyaW5nIHwgRGF0ZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgZW5kKHZhbHVlOiBzdHJpbmcgfCBEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UmFuZ2UodGhpcy5fc3RhcnQsIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRlID0gZGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnQgPSBkYXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9lbmQgPSBkYXRlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRlSW50ZXJuYWwodGhpcy5fZGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld0RhdGUoZGF0ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCAmJiB0aGlzLm9uRGF0ZVNlbGVjdClcclxuICAgICAgICAgICAgICAgIHRoaXMub25EYXRlU2VsZWN0KHsgZGF0ZTogZGF0ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFJhbmdlKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0ZSA9IHN0YXJ0O1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydCA9IHN0YXJ0O1xyXG4gICAgICAgICAgICB0aGlzLl9lbmQgPSBlbmQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGVJbnRlcm5hbCh0aGlzLl9kYXRlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWaWV3UmFuZ2Uoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9uUmFuZ2VTZWxlY3QpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmFuZ2VTZWxlY3QoeyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfZGF0ZUludGVybmFsOiBtb21lbnQuTW9tZW50O1xyXG5cclxuICAgICAgICBnZXQgZGF0ZUludGVybmFsKCk6IG1vbWVudC5Nb21lbnQge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXREYXRlSW50ZXJuYWwodmFsdWU6IHN0cmluZyB8IERhdGUgfCBtb21lbnQuTW9tZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGVJbnRlcm5hbCA9ICh2YWx1ZSAhPSBudWxsKSA/IG1vbWVudCh2YWx1ZSkgOiBtb21lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGUodGhpcy5fZGF0ZUludGVybmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2FsY3VsYXRlKGZyb21EYXRlOiBtb21lbnQuTW9tZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gZnJvbURhdGUuY2xvbmUoKS5zdGFydE9mKCdtb250aCcpLnN0YXJ0T2YoJ3dlZWsnKSxcclxuICAgICAgICAgICAgICAgIGVuZCA9IGZyb21EYXRlLmNsb25lKCkuZW5kT2YoJ21vbnRoJykuZW5kT2YoJ3dlZWsnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2Vla3MgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJEYXlbXT4oKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZGF5ID0gc3RhcnQ7IGRheS5pc0JlZm9yZShlbmQpOyBkYXkgPSBkYXkuY2xvbmUoKS5hZGQoMSwgJ3dlZWsnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd2VlayA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0V2Vlayhmcm9tRGF0ZSwgZGF5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2Vla3MucHVzaCh3ZWVrKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy55ZWFycyA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0WWVhcnMoZnJvbURhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0Vmlld0RhdGUgKGRhdGUpIHtcclxuICAgICAgICAgICAgLy8gb3ZlcnJpZGUgaW4gbGluayBmdW5jdGlvbnNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzZXRWaWV3UmFuZ2UgKHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICAgICAgLy8gb3ZlcnJpZGUgaW4gbGluayBmdW5jdGlvbnNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBnZXQgdGl0bGUoKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5EYXlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWwuZm9ybWF0KCdNTU1NIFlZWVknKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuTW9udGhzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LlllYXJzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnc2VsZWN0IGEgeWVhcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB2aWV3VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5Nb250aHM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwibW9udGhzXCI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LlllYXJzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInllYXJzXCI7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5EYXlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImRheXNcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd0RheXMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPiBEYXRlUGlja2VyVmlldy5EYXlzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd01vbnRocygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA+IERhdGVQaWNrZXJWaWV3Lk1vbnRocylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd1llYXJzKCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5ZZWFycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzU2VsZWN0ZWQoZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMuX2RhdGUpLmlzU2FtZShkYXkudmFsdWUsICdkYXknKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXkudmFsdWUuaXNCZXR3ZWVuKHRoaXMuX3N0YXJ0LCB0aGlzLl9lbmQsICdkYXknKSB8fFxyXG4gICAgICAgICAgICAgICAgZGF5LnZhbHVlLmlzU2FtZSh0aGlzLl9zdGFydCwgJ2RheScpIHx8XHJcbiAgICAgICAgICAgICAgICBkYXkudmFsdWUuaXNTYW1lKHRoaXMuX2VuZCwgJ2RheScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNIaWdobGlnaHRlZChkYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGlnaGxpZ2h0ZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oaWdobGlnaHRlZFtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChtb21lbnQodmFsdWUpLmlzU2FtZShkYXkudmFsdWUsICdkYXknKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RpbmcoZGF5czogSURhdGVQaWNrZXJEYXlbXSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmRlc2VsZWN0QWxsKHRoaXMud2Vla3MpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnNlbGVjdERheXMoZGF5cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZChkYXlzOiBJRGF0ZVBpY2tlckRheVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZGVzZWxlY3RBbGwodGhpcy53ZWVrcyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGRheXNbMF07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUoc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbmQgPSBkYXlzW2RheXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkRGF0ZShkYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBtb21lbnQoZGF5LnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGUoZGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZFJhbmdlKHN0YXJ0RGF5OiBJRGF0ZVBpY2tlckRheSwgZW5kRGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IG1vbWVudChzdGFydERheS52YWx1ZSkuZm9ybWF0KHRoaXMuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgY29uc3QgZW5kID0gbW9tZW50KGVuZERheS52YWx1ZSkuZm9ybWF0KHRoaXMuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdE1vbnRoKGlkeCkge1xyXG4gICAgICAgICAgICBjb25zdCBtb250aCA9IHRoaXMubW9udGhOYW1lc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vbnRoKG1vbnRoLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA9PT0gRGF0ZVBpY2tlclZpZXcuTW9udGhzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRlKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuZGF0ZUludGVybmFsLmNsb25lKCkuZW5kT2YoJ21vbnRoJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5kID0gdGhpcy5kYXRlSW50ZXJuYWwuY2xvbmUoKS5lbmRPZignbW9udGgnKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93RGF5cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0WWVhcihpZHgpIHtcclxuICAgICAgICAgICAgY29uc3QgeWVhciA9IHRoaXMueWVhcnNbaWR4XTtcclxuICAgICAgICAgICAgdGhpcy5zZXRZZWFyKHllYXIudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID09PSBEYXRlUGlja2VyVmlldy5ZZWFycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuZGF0ZUludGVybmFsLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0ZShkYXRlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmRhdGVJbnRlcm5hbC5jbG9uZSgpLnN0YXJ0T2YoJ3llYXInKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSB0aGlzLmRhdGVJbnRlcm5hbC5jbG9uZSgpLmVuZE9mKCd5ZWFyJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vbnRocygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEYXRlKGFjdGlvbjogKGRhdGU6IG1vbWVudC5Nb21lbnQpID0+IG1vbWVudC5Nb21lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRlSW50ZXJuYWwoYWN0aW9uKHRoaXMuZGF0ZUludGVybmFsLmNsb25lKCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzTW9udGgobW9udGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUludGVybmFsLm1vbnRoKCkgPT0gbW9udGgudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRNb250aChtb250aCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLnNldCgnbW9udGgnLCBtb250aCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNZZWFyKHllYXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUludGVybmFsLnllYXIoKSA9PSB5ZWFyLnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0WWVhcih5ZWFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0ZShkYXRlID0+IGRhdGUuc2V0KCd5ZWFyJywgeWVhcikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldk1vbnRoKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLnN1YnRyYWN0KDEsICdtb250aHMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0TW9udGgoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0ZShkYXRlID0+IGRhdGUuYWRkKDEsICdtb250aHMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2WWVhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlKGRhdGUgPT4gZGF0ZS5zdWJ0cmFjdCgxLCAneWVhcnMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0WWVhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlKGRhdGUgPT4gZGF0ZS5hZGQoMSwgJ3llYXJzJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldlJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLnN1YnRyYWN0KDksICd5ZWFycycpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5leHRSYW5nZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlKGRhdGUgPT4gZGF0ZS5hZGQoOSwgJ3llYXJzJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25EYXRlU2VsZWN0O1xyXG4gICAgICAgIG9uUmFuZ2VTZWxlY3Q7XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgdmlldzogRGF0ZVBpY2tlclZpZXc7XHJcbiAgICAgICAgbWluVmlldzogRGF0ZVBpY2tlclZpZXc7XHJcbiAgICAgICAgd2Vla3M6IElEYXRlUGlja2VyRGF5W11bXTtcclxuICAgICAgICB5ZWFyczogSURhdGVQaWNrZXJZZWFyW107XHJcbiAgICAgICAgbW9udGhOYW1lczogSURhdGVQaWNrZXJNb250aFtdO1xyXG4gICAgICAgIGRheXNPZldlZWs6IHN0cmluZ1tdO1xyXG4gICAgICAgIGlzVmlzaWJsZTogYm9vbGVhbjtcclxuICAgICAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcclxuICAgICAgICBpc29Gb3JtYXQgPSAnWVlZWS1NTS1ERCc7XHJcbiAgICAgICAgaXNTaW5nbGVEYXRlOiBib29sZWFuO1xyXG4gICAgICAgIGhpZ2hsaWdodGVkOiBzdHJpbmdbXTtcclxuICAgICAgICBkZWZhdWx0RGF0ZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBjbGllbnREYXRlOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuY29udHJvbGxlcignZGF0ZVBpY2tlcicsIERhdGVQaWNrZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGluamVjdG9yJywgJyRjb21waWxlJywgJyR0ZW1wbGF0ZUNhY2hlJywgJyR0aW1lb3V0JywgJyR3aW5kb3cnLCAnZGF0ZVBpY2tlclNlcnZpY2UnLCAnaXNNb2JpbGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaW5qZWN0b3IsIHByaXZhdGUgJGNvbXBpbGUsIHByaXZhdGUgJHRlbXBsYXRlQ2FjaGUsIHByaXZhdGUgJHRpbWVvdXQsIHByaXZhdGUgJHdpbmRvdywgcHJpdmF0ZSBkYXRlUGlja2VyU2VydmljZTogSURhdGVQaWNrZXJTZXJ2aWNlLCBwcml2YXRlIGlzTW9iaWxlOiBib29sZWFuKSB7IH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQUUnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ2RhdGVQaWNrZXInLCAnP25nTW9kZWwnXTtcclxuICAgICAgICBjb250cm9sbGVyID0gRGF0ZVBpY2tlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ2RhdGVwaWNrZXInO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICAvLyBTaW5nbGUgRGF0ZVxyXG4gICAgICAgICAgICAnZGF0ZSc6ICc9P2RhdGUnLFxyXG4gICAgICAgICAgICBvbkRhdGVTZWxlY3Q6ICcmJyxcclxuXHJcbiAgICAgICAgICAgIC8vIFJhbmdlXHJcbiAgICAgICAgICAgICdzdGFydCc6ICc9P3N0YXJ0JyxcclxuICAgICAgICAgICAgJ2VuZCc6ICc9P2VuZCcsXHJcbiAgICAgICAgICAgIG9uUmFuZ2VTZWxlY3Q6ICcmJyxcclxuXHJcbiAgICAgICAgICAgIC8vIE90aGVyXHJcbiAgICAgICAgICAgIGlzU2VsZWN0aW5nOiAnPT8nLFxyXG4gICAgICAgICAgICBkZWZhdWx0RGF0ZTogJ0A/JyxcclxuICAgICAgICAgICAgb25DaGFuZ2U6ICcmJyxcclxuXHJcbiAgICAgICAgICAgIC8vIENvbGxlY3Rpb24gb2YgZGF0ZSBzdHJpbmdzIChpZS4gWycyMDEyLTEyLTAxJywnMjAxMi0xMi0wMiddXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodGVkOiAnPT8nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FsZW5kYXJUZW1wbGF0ZSA9ICdkYXRlLXBpY2tlci5odG1sJztcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsIFskY3RybCwgJG5nTW9kZWxdOiBbRGF0ZVBpY2tlckNvbnRyb2xsZXIsIGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyXSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5VGV0aGVyRml4KCRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtNb2JpbGUoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rRGVza3RvcCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rTW9iaWxlID0gKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgJG5nTW9kZWw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyLCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnB1dCgkZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua05hdGl2ZUlucHV0KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzRWxlbWVudCgkZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua0lubGluZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtOYXRpdmVFbGVtZW50KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua0Rlc2t0b3AgPSAoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCAkbmdNb2RlbDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0lucHV0KCRlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rSW5wdXQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc0VsZW1lbnQoJGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtJbmxpbmUoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rRWxlbWVudCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkY3RybC5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBEYXlTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cFJhbmdlU2VsZWN0KCRzY29wZSwgJGVsZW1lbnQsICRjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNJbnB1dCgkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5pcygnaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzRWxlbWVudCgkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5pcygnZGF0ZS1waWNrZXInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpeGVzIGEgYnVnIHdoZXJlIFRldGhlciBjYW5ub3QgY29ycmVjdGx5IGdldCB3aWR0aC9oZWlnaHQgYmVjYXVzZSBvZiBuZ0FuaW1hdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHBseVRldGhlckZpeCgkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIHZhciAkYW5pbWF0ZSA9IHRoaXMuJGluamVjdG9yLmdldCgnJGFuaW1hdGUnKTtcclxuICAgICAgICAgICAgaWYgKCRhbmltYXRlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAkYW5pbWF0ZS5lbmFibGVkKGZhbHNlLCAkZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rTmF0aXZlSW5wdXQoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCAkbmdNb2RlbDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXQgPSAoZGF0ZSwgcGF0dGVybik6IHN0cmluZyA9PiAoZGF0ZSA9PSBudWxsKSA/ICcnIDogbW9tZW50KGRhdGUpLmZvcm1hdChwYXR0ZXJuKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZUZvcm1hdCA9IChkYXRlKSA9PiBmb3JtYXQoZGF0ZSwgXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBtb250aEZvcm1hdCA9IChkYXRlKSA9PiBmb3JtYXQoZGF0ZSwgXCJZWVlZLU1NXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlciA9IGRhdGVGb3JtYXQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGF0dHJzWydtaW5WaWV3J10gPT0gXCJtb250aHNcIikge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwibW9udGhcIjtcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlciA9IG1vbnRoRm9ybWF0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXRWaWV3RGF0ZSA9IChkYXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNvID0gZm9ybWF0dGVyKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWwuJHNldFZpZXdWYWx1ZShpc28pO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQucHJvcChcInR5cGVcIiwgdHlwZSk7XHJcbiAgICAgICAgICAgICRjdHJsLnNldFZpZXdEYXRlID0gc2V0Vmlld0RhdGU7XHJcblxyXG4gICAgICAgICAgICAkbmdNb2RlbC4kdmlld0NoYW5nZUxpc3RlbmVycy5wdXNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB2aWV3VmFsdWUgPSBtb21lbnQoJG5nTW9kZWwuJHZpZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdmlld1ZhbHVlLmlzVmFsaWQoKSA/IGRhdGVGb3JtYXQoJG5nTW9kZWwuJHZpZXdWYWx1ZSkgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2V0RGF0ZShkYXRlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rSW5wdXQoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCBuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXRWaWV3VmFsdWUgPSAoZGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gZGF0ZSA9PSBudWxsID8gJycgOiBtb21lbnQoZGF0ZSkuZm9ybWF0KFwiTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiAkY3RybC5kYXRlLCBkYXRlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRWaWV3VmFsdWUoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNldFZpZXdWYWx1ZSA9IChzdGFydCwgZW5kKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0ICE9IG51bGwgJiYgZW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1TdGFydCA9IG1vbWVudChzdGFydCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtRW5kID0gbW9tZW50KGVuZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobVN0YXJ0LmlzU2FtZShlbmQsICdkYXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IG1TdGFydC5mb3JtYXQoXCJMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGAke21TdGFydC5mb3JtYXQoXCJMXCIpfSAtICR7bUVuZC5mb3JtYXQoXCJMXCIpfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBtb21lbnQoZW5kKS5mb3JtYXQoXCJMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IG1vbWVudChlbmQpLmZvcm1hdChcIkxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiAkY3RybC5zdGFydCwgc3RhcnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFZpZXdWYWx1ZShzdGFydCwgJGN0cmwuZW5kKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4gJGN0cmwuZW5kLCBlbmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFZpZXdWYWx1ZSgkY3RybC5zdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgY2hhbmdlLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb01vbWVudChuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRlLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY3RybC5zZXREYXRlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0ZS5pc1NhbWUoJGN0cmwuZGF0ZSwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLnNldERhdGUoZGF0ZS5mb3JtYXQoJGN0cmwuaXNvRm9ybWF0KSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5pbnB1dFRvUmFuZ2UobmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYW5nZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjdHJsLnNldFJhbmdlKG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IG1vbWVudChyYW5nZS5zdGFydCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSBtb21lbnQocmFuZ2UuZW5kKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RhcnQuaXNWYWxpZCgpIHx8ICFlbmQuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY3RybC5zZXRSYW5nZShudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0LmlzU2FtZSgkY3RybC5zdGFydCwgJ2RheScpICYmIGVuZC5pc1NhbWUoJGN0cmwuZW5kLCAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY3RybC5zZXRSYW5nZShyYW5nZS5zdGFydCwgcmFuZ2UuZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBrZXlkb3duLiR7JHNjb3BlLiRpZH1gLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghJGN0cmwuaXNWaXNpYmxlIHx8ICF0aGlzLmlzRXNjYXBlKGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua05hdGl2ZUVsZW1lbnQoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCBuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRhYkluZGV4KCRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdldFZtID0gKG5hbWUpID0+IGAke3RoaXMuY29udHJvbGxlckFzfS4ke25hbWV9YDtcclxuICAgICAgICAgICAgY29uc3QgZ2V0QXR0ciA9IChuYW1lLCB2YWx1ZSkgPT4gYCR7bmFtZX09XCIke3ZhbHVlfVwiYFxyXG4gICAgICAgICAgICBjb25zdCBnZXRWbUF0dHIgPSAobmFtZSwgdmFsdWUpID0+IGdldEF0dHIobmFtZSwgZ2V0Vm0odmFsdWUpKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIFR5cGVCdWlsZGVyKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRycyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgX2J1aWxkZXIgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQXR0ciA9IChuYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMucHVzaChnZXRBdHRyKG5hbWUsIHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9idWlsZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTGl0ZXJhbCA9IChuYW1lLCBhdHRyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAkYXR0cnNbYXR0cl0gIT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRycy5wdXNoKGdldEF0dHIobmFtZSwgJGF0dHJzW2F0dHJdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9idWlsZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQmluZGluZyA9IChuYW1lLCBhdHRyLCBjdHJsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIGF0dHIgPT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ciA9ICRhdHRyc1thdHRyXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGF0dHIgIT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRycy5wdXNoKGdldFZtQXR0cihuYW1lLCBjdHJsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9idWlsZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUHJveHkgPSAobmFtZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybFtuYW1lXSA9IGZuO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYnVpbGRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50ID0gKG5hbWUsIGF0dHIsIGN0cmwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mICRhdHRyc1thdHRyXSAhPSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLnB1c2goZ2V0Vm1BdHRyKG5hbWUsIGN0cmwpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2J1aWxkZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYDxpbnB1dCBkYXRlLXBpY2tlciAke3RoaXMuYXR0cnMuam9pbignICcpfSByZXF1aXJlZD5gO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBidWlsZGVyID0gbmV3IFR5cGVCdWlsZGVyKClcclxuICAgICAgICAgICAgICAgIC5hZGRBdHRyKFwidHlwZVwiLCBcInRleHRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRMaXRlcmFsKFwibWluLXZpZXdcIiwgXCJtaW5WaWV3XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQmluZGluZyhcIm5nLW1vZGVsXCIsIHRydWUsIFwiZGF0ZVN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEJpbmRpbmcoXCJkYXRlXCIsIFwiZGF0ZVwiLCBcImRhdGVcIilcclxuICAgICAgICAgICAgICAgIC8vIC5hZGRQcm94eShcImRhdGVTZWxlY3RlZFwiLCAoZGF0ZSkgPT4gJGN0cmwub25EYXRlU2VsZWN0KHsgZGF0ZTogZGF0ZSB9KSlcclxuICAgICAgICAgICAgICAgIC8vIC5hZGRFdmVudChcIm9uLWRhdGUtc2VsZWN0XCIsIFwib25EYXRlU2VsZWN0XCIsIFwiZGF0ZVNlbGVjdGVkKGRhdGUpXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQmluZGluZyhcInN0YXJ0XCIsIFwic3RhcnRcIiwgXCJzdGFydFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEJpbmRpbmcoXCJlbmRcIiwgXCJlbmRcIiwgXCJlbmRcIilcclxuICAgICAgICAgICAgICAgIC8vIC5hZGRQcm94eShcInJhbmdlU2VsZWN0ZWRcIiwgKHN0YXJ0LCBlbmQpID0+ICRjdHJsLm9uUmFuZ2VTZWxlY3QoeyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH0pKVxyXG4gICAgICAgICAgICAgICAgLy8gLmFkZEV2ZW50KFwib24tcmFuZ2Utc2VsZWN0XCIsIFwib25SYW5nZVNlbGVjdFwiLCBcInJhbmdlU2VsZWN0ZWQoc3RhcnQsZW5kKVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEJpbmRpbmcoXCJpcy1zZWxlY3RpbmdcIiwgXCJpc1NlbGVjdGluZ1wiLCBcImlzU2VsZWN0aW5nXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkTGl0ZXJhbChcImRlZmF1bHQtZGF0ZVwiLCBcImRlZmF1bHREYXRlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQmluZGluZyhcImhpZ2hsaWdodGVkXCIsIFwiaGlnaGxpZ2h0ZWRcIiwgXCJoaWdobGlnaHRlZFwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBidWlsZGVyLmJ1aWxkKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkaW5wdXQgPSBhbmd1bGFyLmVsZW1lbnQoY29udGVudClcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZGF0ZXBpY2tlci1saW5rTmF0aXZlRWxlbWVudC1pbnB1dCcpO1xyXG4gICAgICAgICAgICB0aGlzLiRjb21waWxlKCRpbnB1dCkoJHNjb3BlKTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdkYXRlcGlja2VyLWxpbmtOYXRpdmVFbGVtZW50JylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKFwiaHJlZlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgkaW5wdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua0VsZW1lbnQoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCBuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRhYkluZGV4KCRlbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5wb3BvdmVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua0lubGluZSgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsIG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNyZWF0ZUNvbnRlbnQoJHNjb3BlKTtcclxuICAgICAgICAgICAgJGVsZW1lbnQuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGFiSW5kZXgoJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSkge1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEVsZW1lbnQgPSAkZWxlbWVudC5nZXQoMCk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50VGFiSW5kZXggPSBjdXJyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ0YWJJbmRleFwiKTtcclxuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuc2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIiwgY3VycmVudFRhYkluZGV4ICE9IG51bGwgPyBjdXJyZW50VGFiSW5kZXggOiBcIi0xXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcG9wb3Zlcigkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB2YXIgY29udGVudCxcclxuICAgICAgICAgICAgICAgIHRldGhlcixcclxuICAgICAgICAgICAgICAgICRib2R5OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkb05vdFJlb3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zdCBvblNlbGVjdCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZG9Ob3RSZW9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIGRvTm90UmVvcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkY3RybFsnZGF0ZVNlbGVjdGVkJ10gPSAoZGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb25TZWxlY3QoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsWydyYW5nZVNlbGVjdGVkJ10gPSAoc3RhcnQsIGVuZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb25TZWxlY3QoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBjbGljay4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgZm9jdXMuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkb05vdFJlb3BlbilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5jcmVhdGVEcm9wRG93bigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsKTtcclxuICAgICAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZXRoZXIgPSBuZXcgVGV0aGVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiAkZWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QXR0YWNobWVudDogJ2JvdHRvbSBjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50OiAndG9wIGNlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzUHJlZml4OiAnZGF0ZXBpY2tlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE9mZnNldDogJzE0cHggMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0cmFpbnRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86ICd3aW5kb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b2dldGhlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGluOiBbJ3RvcCcsICdsZWZ0JywgJ2JvdHRvbScsICdyaWdodCddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB0ZXRoZXIucG9zaXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYmx1clRpbWVyO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgYmx1ci4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gQWxsb3cgYW55IGNsaWNrIG9uIHRoZSBtZW51IHRvIGNvbWUgdGhyb3VnaCBmaXJzdFxyXG4gICAgICAgICAgICAgICAgYmx1clRpbWVyID0gdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRjdHJsLmlzU2VsZWN0aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGJvZHkub24oYGNsaWNrLiR7JHNjb3BlLiRpZH1gLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghJGN0cmwuaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRlbnQgfHwgJGVsZW1lbnQuaXMoZS50YXJnZXQpIHx8IGNvbnRlbnQuaGFzKGUudGFyZ2V0KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dC5jYW5jZWwoYmx1clRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudCAmJiBjb250ZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkYm9keS5vZmYoYGNsaWNrLiR7JHNjb3BlLiRpZH1gKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50KSBjb250ZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZURyb3BEb3duKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKTogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5IHtcclxuICAgICAgICAgICAgdmFyIHNpbmdsZURhdGVCaW5kaW5nID0gYGRhdGU9XCIke3RoaXMuY29udHJvbGxlckFzfS5kYXRlXCIgb24tZGF0ZS1zZWxlY3Q9XCIke3RoaXMuY29udHJvbGxlckFzfS5kYXRlU2VsZWN0ZWQoZGF0ZSlcImAsXHJcbiAgICAgICAgICAgICAgICByYW5nZUJpbmRpbmcgPSBgc3RhcnQ9XCIke3RoaXMuY29udHJvbGxlckFzfS5zdGFydFwiIGVuZD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmVuZFwiIG9uLXJhbmdlLXNlbGVjdD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LnJhbmdlU2VsZWN0ZWQoc3RhcnQsZW5kKVwiYCxcclxuICAgICAgICAgICAgICAgIGJpbmRpbmdzID0gJGN0cmwuaXNTaW5nbGVEYXRlID8gc2luZ2xlRGF0ZUJpbmRpbmcgOiByYW5nZUJpbmRpbmcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1kcm9wZG93blwiIG5nLWNsYXNzPVwieydkYXRlcGlja2VyLW9wZW4nOiR7dGhpcy5jb250cm9sbGVyQXN9LmlzVmlzaWJsZX1cIj48ZGF0ZS1waWNrZXIgbWluLXZpZXc9XCIkeyRhdHRyc1snbWluVmlldyddfVwiIGlzLXNlbGVjdGluZz1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmlzU2VsZWN0aW5nXCIgJHtiaW5kaW5nc31cIiBoaWdobGlnaHRlZD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmhpZ2hsaWdodGVkXCIgZGVmYXVsdC1kYXRlPVwie3ske3RoaXMuY29udHJvbGxlckFzfS5kZWZhdWx0RGF0ZX19XCI+PC9kYXRlLXBpY2tlcj48L2Rpdj5gLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSAkZWxlbWVudC5wb3NpdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gJGVsZW1lbnQub3V0ZXJIZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgIG1hcmdpbiA9ICgkZWxlbWVudC5vdXRlckhlaWdodCh0cnVlKSAtIGhlaWdodCksXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBtYXJnaW4gLyAyICsgaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRvcDogcG9zaXRpb24udG9wICsgb2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgbGVmdDogcG9zaXRpb24ubGVmdFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZShjb250ZW50KSgkc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2ZW50RGVmYXVsdChlOiBKUXVlcnlFdmVudE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzRXNjYXBlKGU6IEpRdWVyeUV2ZW50T2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSAyNztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbnRlbnQoJHNjb3BlOiBhbmd1bGFyLklTY29wZSk6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy4kdGVtcGxhdGVDYWNoZS5nZXQodGhpcy5jYWxlbmRhclRlbXBsYXRlKTtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbXBpbGUoY29udGVudCkoJHNjb3BlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXR1cERheVNlbGVjdCgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF5Q3NzID0gJy5kYXRlUGlja2VyRGF5cy1kYXknLFxyXG4gICAgICAgICAgICAgICAgJGJvZHk6IGFueSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgbW91c2VEb3duID0gYG1vdXNlZG93bi4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIG1vdXNlVXAgPSBgbW91c2V1cC4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9uU2VsZWN0ZWQgPSAocmFuZ2U6IERhdGVQaWNrZXJNb3VzZVJhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF5cyA9IHJhbmdlLmdldERheXMoKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdGVkKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VEb3duLCBkYXlDc3MsIChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBuZXcgRGF0ZVBpY2tlck1vdXNlUmFuZ2UoJGN0cmwsIGUpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNTZWxlY3RpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRib2R5Lm9uKG1vdXNlVXAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkYm9keS5vZmYobW91c2VVcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldHVwUmFuZ2VTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRib2R5OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIG1vdXNlRG93biA9IGBtb3VzZWRvd24uJHskc2NvcGUuJGlkfWAsXHJcbiAgICAgICAgICAgICAgICBtb3VzZU92ZXIgPSBgbW91c2VvdmVyLiR7JHNjb3BlLiRpZH1gLFxyXG4gICAgICAgICAgICAgICAgbW91c2VVcCA9IGBtb3VzZXVwLiR7JHNjb3BlLiRpZH1gLFxyXG4gICAgICAgICAgICAgICAgZGF5Q3NzID0gJy5kYXRlUGlja2VyRGF5cy1kYXknO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25TZWxlY3RpbmcgPSAocmFuZ2U6IERhdGVQaWNrZXJNb3VzZVJhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXlzID0gcmFuZ2UuZ2V0RGF5cygpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0aW5nKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25TZWxlY3RlZCA9IChyYW5nZTogRGF0ZVBpY2tlck1vdXNlUmFuZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRheXMgPSByYW5nZS5nZXREYXlzKCk7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3RlZChkYXlzKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKG1vdXNlRG93biwgZGF5Q3NzLCAoZTogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gbmV3IERhdGVQaWNrZXJNb3VzZVJhbmdlKCRjdHJsLCBlKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLmlzU2VsZWN0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vbihtb3VzZU92ZXIsIGRheUNzcywgKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc2V0RW5kKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0aW5nKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRib2R5Lm9uKG1vdXNlVXAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYobW91c2VPdmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAkYm9keS5vZmYobW91c2VVcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuZGlyZWN0aXZlKCdkYXRlUGlja2VyJywgRGF0ZVBpY2tlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlclJhbmdlXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyUmFuZ2Uge1xyXG4gICAgICAgIHN0YXJ0OiBzdHJpbmc7XHJcbiAgICAgICAgZW5kOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlclJhbmdlIGltcGxlbWVudHMgSURhdGVQaWNrZXJSYW5nZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RhcnQ6IGFueSwgZW5kOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIG1TdGFydCA9IG1vbWVudChzdGFydCk7XHJcbiAgICAgICAgICAgIHZhciBtRW5kID0gbW9tZW50KGVuZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobUVuZC5pc0JlZm9yZShtU3RhcnQpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IG1TdGFydDtcclxuICAgICAgICAgICAgICAgIG1TdGFydCA9IG1FbmQ7XHJcbiAgICAgICAgICAgICAgICBtRW5kID0gdGVtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1TdGFydC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBtRW5kLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnQ6IHN0cmluZztcclxuICAgICAgICBlbmQ6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvLyBEYXRlUGlja2VyTW9udGhcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJNb250aCB7XHJcbiAgICAgICAgdmFsdWU6IG51bWJlcjtcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaXNDdXJyZW50TW9udGg6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlck1vbnRoIGltcGxlbWVudHMgSURhdGVQaWNrZXJNb250aCB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIG0gPSBtb21lbnQoKTtcclxuICAgICAgICAgICAgdmFyIHRoaXNNb250aCA9IG0ubW9udGgoKTtcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gbS5tb250aCh2YWx1ZSkuZm9ybWF0KCdNTU0nKTtcclxuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRNb250aCA9IHZhbHVlID09PSB0aGlzTW9udGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaXNDdXJyZW50TW9udGg6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlck1vbnRoXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyWWVhciB7XHJcbiAgICAgICAgdmFsdWU6IG51bWJlcjtcclxuICAgICAgICBpc0N1cnJlbnRZZWFyOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJZZWFyIGltcGxlbWVudHMgSURhdGVQaWNrZXJZZWFyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmlzQ3VycmVudFllYXIgPSB2YWx1ZSA9PT0gbW9tZW50KCkueWVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNDdXJyZW50WWVhcjogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJRGF0ZVBpY2tlckRheVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlckRheSB7XHJcbiAgICAgICAgZGF0ZTogbnVtYmVyO1xyXG4gICAgICAgIHZhbHVlOiBhbnk7XHJcbiAgICAgICAgaXNUb2RheTogYm9vbGVhbjtcclxuICAgICAgICBpc05vdEluTW9udGg6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgaXNCZWZvcmUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTYW1lKGRheTogSURhdGVQaWNrZXJEYXkpOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJEYXkgaW1wbGVtZW50cyBJRGF0ZVBpY2tlckRheSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoZnJvbURhdGU6IGFueSwgZGF5T2ZXZWVrOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG1vbWVudChkYXlPZldlZWspO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLnZhbHVlLmRhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5pc1RvZGF5ID0gZGF5T2ZXZWVrLmlzU2FtZShtb21lbnQoKSwgJ2RheScpO1xyXG4gICAgICAgICAgICB0aGlzLmlzTm90SW5Nb250aCA9ICF0aGlzLnZhbHVlLmlzU2FtZShmcm9tRGF0ZSwgJ21vbnRoJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRlOiBudW1iZXI7XHJcbiAgICAgICAgdmFsdWU6IGFueTtcclxuICAgICAgICBpc1RvZGF5OiBib29sZWFuO1xyXG4gICAgICAgIGlzTm90SW5Nb250aDogYm9vbGVhbjtcclxuICAgICAgICBpc1NlbGVjdGluZzogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgaXNCZWZvcmUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgaXNCZWZvcmUgPSB0aGlzLnZhbHVlLmlzQmVmb3JlKGRheS52YWx1ZSwgJ2RheScpO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNCZWZvcmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1NhbWUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgaXNTYW1lID0gdGhpcy52YWx1ZS5pc1NhbWUoZGF5LnZhbHVlLCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpc1NhbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIERhdGVQaWNrZXJTZXJ2aWNlXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgZ2V0TW9udGhzKCk6IElEYXRlUGlja2VyTW9udGhbXTtcclxuICAgICAgICBnZXREYXlzT2ZXZWVrKCk6IHN0cmluZ1tdO1xyXG4gICAgICAgIGdldFllYXJzKGZyb21EYXRlKTogSURhdGVQaWNrZXJZZWFyW107XHJcbiAgICAgICAgZ2V0V2Vlayhmcm9tRGF0ZSwgc3RhcnRPZldlZWspOiBJRGF0ZVBpY2tlckRheVtdO1xyXG4gICAgICAgIGdldFJhbmdlRGF5cyhzdGFydDogSURhdGVQaWNrZXJEYXksIGVuZDogSURhdGVQaWNrZXJEYXksIHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pOiBJRGF0ZVBpY2tlckRheVtdO1xyXG4gICAgICAgIGRlc2VsZWN0QWxsKHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pO1xyXG4gICAgICAgIHNlbGVjdERheXMoZGF5czogSURhdGVQaWNrZXJEYXlbXSk7XHJcbiAgICAgICAgaW5wdXRUb01vbWVudCh2YWx1ZTogc3RyaW5nKTogYW55O1xyXG4gICAgICAgIGlucHV0VG9SYW5nZSh2YWx1ZTogc3RyaW5nKTogSURhdGVQaWNrZXJSYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyU2VydmljZSBpbXBsZW1lbnRzIElEYXRlUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgZ2V0TW9udGhzKCk6IElEYXRlUGlja2VyTW9udGhbXSB7XHJcbiAgICAgICAgICAgIHZhciBtb250aHMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJNb250aD4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbW9udGhzLnB1c2gobmV3IERhdGVQaWNrZXJNb250aChpKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtb250aHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRZZWFycyhmcm9tRGF0ZSk6IElEYXRlUGlja2VyWWVhcltdIHtcclxuICAgICAgICAgICAgdmFyIGZyb21ZZWFyID0gbW9tZW50KGZyb21EYXRlKS55ZWFyKCksXHJcbiAgICAgICAgICAgICAgICB5ZWFycyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlclllYXI+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZnJvbVllYXI7IGkgPD0gKGZyb21ZZWFyICsgOCk7IGkrKylcclxuICAgICAgICAgICAgICAgIHllYXJzLnB1c2gobmV3IERhdGVQaWNrZXJZZWFyKGkpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB5ZWFycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFdlZWsoZnJvbURhdGUsIHN0YXJ0T2ZXZWVrKTogSURhdGVQaWNrZXJEYXlbXSB7XHJcbiAgICAgICAgICAgIHZhciBlbmRPZldlZWsgPSBtb21lbnQoc3RhcnRPZldlZWspLmVuZE9mKCd3ZWVrJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF5cyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlckRheT4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF5T2ZXZWVrID0gbW9tZW50KHN0YXJ0T2ZXZWVrKTsgZGF5T2ZXZWVrLmlzQmVmb3JlKGVuZE9mV2Vlayk7IGRheU9mV2Vlay5hZGQoMSwgJ2RheXMnKSkge1xyXG4gICAgICAgICAgICAgICAgZGF5cy5wdXNoKG5ldyBEYXRlUGlja2VyRGF5KGZyb21EYXRlLCBkYXlPZldlZWspKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXREYXlzT2ZXZWVrKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudC53ZWVrZGF5c1Nob3J0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRSYW5nZURheXMoc3RhcnQ6IElEYXRlUGlja2VyRGF5LCBlbmQ6IElEYXRlUGlja2VyRGF5LCB3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKTogSURhdGVQaWNrZXJEYXlbXSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZW5kLmlzQmVmb3JlKHN0YXJ0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBzdGFydDtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgICAgICAgICAgICAgZW5kID0gdGVtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGFsbERheXMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJEYXk+KCksXHJcbiAgICAgICAgICAgICAgICBpc0FkZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgd2Vla3MuZm9yRWFjaCh3ZWVrID0+IHtcclxuICAgICAgICAgICAgICAgIHdlZWsuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXkuaXNTYW1lKHN0YXJ0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBZGRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNBZGRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsRGF5cy5wdXNoKGRheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5LmlzU2FtZShlbmQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FkZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFsbERheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXNlbGVjdEFsbCh3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKSB7XHJcbiAgICAgICAgICAgIHdlZWtzLmZvckVhY2god2VlayA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZWVrLmZvckVhY2goZGF5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXkuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdERheXMoZGF5czogSURhdGVQaWNrZXJEYXlbXSkge1xyXG4gICAgICAgICAgICBkYXlzLmZvckVhY2goZGF5ID0+IGRheS5pc1NlbGVjdGluZyA9IHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXRUb01vbWVudCh2YWx1ZTogc3RyaW5nKTogbW9tZW50Lk1vbWVudCB7XHJcbiAgICAgICAgICAgIHZhciBsYW5nID0gbW9tZW50LmxvY2FsZURhdGEoKTtcclxuICAgICAgICAgICAgdmFyIGZvcm1hdHMgPSBbXHJcbiAgICAgICAgICAgICAgICBsYW5nLmxvbmdEYXRlRm9ybWF0KFwibFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKSxcclxuICAgICAgICAgICAgICAgIGxhbmcubG9uZ0RhdGVGb3JtYXQoXCJMXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gIC9nLCAnICcpXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG1vbWVudCh2YWx1ZSwgZm9ybWF0cyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXRUb1JhbmdlKHZhbHVlOiBzdHJpbmcpOiBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgIXZhbHVlLnRyaW0oKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgdmFyIHRyaW1tZWQgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnRyaW0oKTtcclxuICAgICAgICAgICAgdmFyIGV4cFN0YXJ0ID0gbmV3IFJlZ0V4cChcIl4oKFswLTldezEsNH1bIF0qKXszfSlcIik7XHJcbiAgICAgICAgICAgIHZhciBleHBFbmQgPSBuZXcgUmVnRXhwKFwiKChbMC05XXsxLDR9WyBdKil7M30pJFwiKTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0UmVzdWx0ID0gZXhwU3RhcnQuZXhlYyh0cmltbWVkKTtcclxuICAgICAgICAgICAgdmFyIGVuZFJlc3VsdCA9IGV4cEVuZC5leGVjKHRyaW1tZWQpO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmlucHV0VG9Nb21lbnQoc3RhcnRSZXN1bHRbMF0udHJpbSgpKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMuaW5wdXRUb01vbWVudCgoZW5kUmVzdWx0WzBdIHx8IHN0YXJ0UmVzdWx0WzBdKS50cmltKCkpO1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBuZXcgRGF0ZVBpY2tlclJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLnNlcnZpY2UoJ2RhdGVQaWNrZXJTZXJ2aWNlJywgRGF0ZVBpY2tlclNlcnZpY2UpO1xyXG59IiwiXHJcbm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyQ29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSAkcG9zdExpbmsoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHRoaXMuX3RpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX3RpbWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgZ2V0IHRpbWUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgdGltZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc0NoYW5nZWQgPSB0aGlzLl90aW1lICE9PSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fdGltZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChoYXNDaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoeyB0aW1lOiB2YWx1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0Vmlld1ZhbHVlOiAodGltZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgICAgIG9uQ2hhbmdlOiAocGFyYW1zOiB7IHRpbWU6IHN0cmluZyB9KSA9PiB2b2lkO1xyXG4gICAgICAgIHByaXZhdGUgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuY29udHJvbGxlcigndGltZVBpY2tlcicsIFRpbWVQaWNrZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsndGltZVBpY2tlclNlcnZpY2UnLCAnaXNNb2JpbGUnLCAnJHBhcnNlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZVBpY2tlclNlcnZpY2U6IElUaW1lUGlja2VyU2VydmljZSwgcHJpdmF0ZSBpc01vYmlsZTogYm9vbGVhbiwgcHJpdmF0ZSAkcGFyc2U6IGFuZ3VsYXIuSVBhcnNlU2VydmljZSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsndGltZVBpY2tlcicsICduZ01vZGVsJ107XHJcbiAgICAgICAgY29udHJvbGxlciA9IFRpbWVQaWNrZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd0aW1lcGlja2VyJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGltZTogJz0nLFxyXG4gICAgICAgICAgICBvbkNoYW5nZTogJyYnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIFskY3RybCwgJG5nTW9kZWxDdHJsXTogW1RpbWVQaWNrZXJDb250cm9sbGVyLCBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcl0pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua01vYmlsZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsLCAkbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxpbmtEZXNrdG9wKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwsICRuZ01vZGVsQ3RybCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlua01vYmlsZSA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsOiBUaW1lUGlja2VyQ29udHJvbGxlciwgJG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5wcm9wKCd0eXBlJywgJ3RpbWUnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNldFZpZXdWYWx1ZSA9ICh0aW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdWYWx1ZSA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UuZm9ybWF0SXNvKHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRjdHJsLnNldFZpZXdWYWx1ZSA9IHNldFZpZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kdmlld0NoYW5nZUxpc3RlbmVycy5wdXNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRjdHJsLnRpbWUgPSB0aGlzLnRpbWVQaWNrZXJTZXJ2aWNlLmZvcm1hdElzbygkbmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmtEZXNrdG9wID0gKCRzY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzLCAkY3RybDogVGltZVBpY2tlckNvbnRyb2xsZXIsICRuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnRJZCA9ICguLi5uYW1lczogc3RyaW5nW10pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lcy5tYXAobmFtZSA9PiBgJHtuYW1lfS4keyRzY29wZS4kaWR9YCkuam9pbignICcpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwudGltZSA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UuZm9ybWF0SXNvKCRuZ01vZGVsQ3RybC4kbW9kZWxWYWx1ZSwgbnVsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNWYWxpZFRpbWUgPSAkY3RybC50aW1lICE9IG51bGxcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzUmVxdWlyZWQgPSAkYXR0cnNbJ3JlcXVpcmVkJ107XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gIWlzUmVxdWlyZWQgfHwgKGlzUmVxdWlyZWQgJiYgaXNWYWxpZFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWYWxpZGl0eSgnaW52YWxpZFRpbWUnLCBpc1ZhbGlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVPbkVudGVyID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IEVOVEVSX0tFWSA9IDEzO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RG93biA9IGUgPT4gZS53aGljaDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGtleURvd24oZSkgIT09IEVOVEVSX0tFWSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNldFZpZXdWYWx1ZSA9ICh0aW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdWYWx1ZSA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UuZm9ybWF0KHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRjdHJsLnNldFZpZXdWYWx1ZSA9IHNldFZpZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAub24oZXZlbnRJZCgnYmx1cicpLCB1cGRhdGUpXHJcbiAgICAgICAgICAgICAgICAub24oZXZlbnRJZCgna2V5ZG93bicpLCB1cGRhdGVPbkVudGVyKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKGV2ZW50SWQoJ2JsdXInLCAna2V5ZG93bicpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuZGlyZWN0aXZlKCd0aW1lUGlja2VyJywgVGltZVBpY2tlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVGltZVBpY2tlclNlcnZpY2Uge1xyXG4gICAgICAgIHBhcnNlKHRleHQ6IHN0cmluZyk6IGFueTtcclxuICAgICAgICBmb3JtYXQodGV4dDogc3RyaW5nLCB2YWx1ZT86IHN0cmluZyk6IHN0cmluZztcclxuICAgICAgICBmb3JtYXRJc28odGV4dDogc3RyaW5nLCB2YWx1ZT86IHN0cmluZyk6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyU2VydmljZSBpbXBsZW1lbnRzIElUaW1lUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgcGFyc2UodGV4dDogc3RyaW5nKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIHBhdHRlcm5zID0gW1xyXG4gICAgICAgICAgICAgICAgJ0xUJyxcclxuICAgICAgICAgICAgICAgICdMVFMnLFxyXG4gICAgICAgICAgICAgICAgJ0hIOm1tOnNzJyxcclxuICAgICAgICAgICAgICAgICdISDptbSBBJ1xyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KHRleHQsIHBhdHRlcm5zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdCh0ZXh0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5wYXJzZSh0ZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIG0uaXNWYWxpZCgpID8gbS5mb3JtYXQoJ0xUJykgOiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdElzbyh0ZXh0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5wYXJzZSh0ZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIG0uaXNWYWxpZCgpID8gbS5mb3JtYXQoXCJISDptbTpzc1wiKSA6IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5zZXJ2aWNlKCd0aW1lUGlja2VyU2VydmljZScsIFRpbWVQaWNrZXJTZXJ2aWNlKTtcclxufSJdfQ==