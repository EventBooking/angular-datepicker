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
            var hasChanged = this._date !== date;
            if (!hasChanged)
                return;
            this._date = date;
            this._start = date;
            this._end = date;
            this.setDateInternal(this._date);
            this.setViewDate(date);
            if (this.initialized && this.onDateSelect)
                this.onDateSelect({ date: date });
        };
        DatePickerController.prototype.setRange = function (start, end) {
            var hasChanged = this._start !== start || this._end !== end;
            if (!hasChanged)
                return;
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
            var format = function (date) { return date.format("L"); };
            var setViewDate = function (date) {
                var text = date == null ? '' : format(moment(date));
                ngModelCtrl.$setViewValue(text);
                ngModelCtrl.$render();
            };
            var setViewRange = function (start, end) {
                var text = '';
                if (start != null && end != null) {
                    var mStart = moment(start), mEnd = moment(end);
                    if (mStart.isSame(end, 'day')) {
                        text = format(mStart);
                    }
                    else {
                        text = format(mStart) + " - " + format(mEnd);
                    }
                }
                else if (start != null) {
                    text = format(moment(end));
                }
                else if (end != null) {
                    text = format(moment(end));
                }
                ngModelCtrl.$setViewValue(text);
                ngModelCtrl.$render();
            };
            $ctrl.setViewDate = setViewDate;
            $ctrl.setViewRange = setViewRange;
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
            this.popover($scope, $element, $attrs, $ctrl);
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
                if (!hasChanged)
                    return;
                this._time = value;
                this.setViewValue(value);
                if (this.initialized) {
                    this.onChange({ time: value });
                }
            },
            enumerable: true,
            configurable: true
        });
        TimePickerController.prototype.setViewValue = function (time) { };
        ;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kYXRlcGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyIsIi4uL3NyYy9tb2JpbGUudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXIudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXItc2VydmljZS50cyIsIi4uL3NyYy90aW1lLXBpY2tlci50cyIsIi4uL3NyYy90aW1lLXBpY2tlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FDQW5DLElBQU8sZ0JBQWdCLENBY3RCO0FBZEQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBQ3JCO1FBQUE7UUFVQSxDQUFDO1FBVFUscUJBQVEsR0FBZjtZQUNJLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkUsSUFBSSxLQUFLLEdBQUcsMFRBQTBULENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5WLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksS0FBSyxHQUFHLHlrREFBeWtELENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXhtRCxNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUMxQixDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBVkQsSUFVQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUNqRixDQUFDLEVBZE0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQWN0QjtBQ2JELElBQU8sZ0JBQWdCLENBMjFCdEI7QUEzMUJELFdBQU8sZ0JB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QUFJLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hELENBQUM7UUFFRCxxQ0FBUyxHQUFULFVBQVUsSUFBWSxFQUFFLEtBQWtCO1lBQWxCLHFCQUFrQixHQUFsQixVQUFrQjtZQUN0QyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDdEQsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FBQyxBQXBCRCxJQW9CQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDbkYsQ0FBQyxFQS9CTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBK0J0QiIsInNvdXJjZXNDb250ZW50IjpbIkFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIsIFtdKTsiLCJtb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcbiAgICBjbGFzcyBNb2JpbGVDb25maWcge1xyXG4gICAgICAgIHN0YXRpYyBpc01vYmlsZSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvd1tcIm9wZXJhXCJdO1xyXG4gICAgICAgICAgICB2YXIgdGVzdDEgPSAvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2kudGVzdChhZ2VudCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWdlbnRQcmVmaXggPSBhZ2VudC5zdWJzdHIoMCwgNCk7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0MiA9IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYWdlbnRQcmVmaXgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRlc3QxIHx8IHRlc3QyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5jb25zdGFudCgnaXNNb2JpbGUnLCBNb2JpbGVDb25maWcuaXNNb2JpbGUoKSk7XHJcbn0iLCJcclxubW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG4gICAgZGVjbGFyZSB2YXIgVGV0aGVyOiBhbnk7XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlck1vdXNlUmFuZ2Uge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRhdGVQaWNrZXJTZXJ2aWNlOiBJRGF0ZVBpY2tlclNlcnZpY2U7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyLCBlOiBKUXVlcnlFdmVudE9iamVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXJ0KGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEVuZChlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBib290c3RyYXAoZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZSkge1xyXG4gICAgICAgICAgICBEYXRlUGlja2VyTW91c2VSYW5nZS5kYXRlUGlja2VyU2VydmljZSA9IGRhdGVQaWNrZXJTZXJ2aWNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3RhcnQoZTogSlF1ZXJ5RXZlbnRPYmplY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IHRoaXMuZ2V0RWxlbWVudChlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEVuZChlOiBKUXVlcnlFdmVudE9iamVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IHRoaXMuZ2V0RWxlbWVudChlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldERheXMoKTogSURhdGVQaWNrZXJEYXlbXSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRheXMgPSBEYXRlUGlja2VyTW91c2VSYW5nZS5kYXRlUGlja2VyU2VydmljZS5nZXRSYW5nZURheXModGhpcy5zdGFydCwgdGhpcy5lbmQsIHRoaXMuJGN0cmwud2Vla3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RWxlbWVudChlOiBKUXVlcnlFdmVudE9iamVjdCk6IElEYXRlUGlja2VyRGF5IHtcclxuICAgICAgICAgICAgaWYgKCFlLnRhcmdldClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgJGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICBjb25zdCAkc2NvcGUgPSAkZWxlbWVudC5zY29wZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXkgPSAkc2NvcGVbJ2RheSddO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnQ6IElEYXRlUGlja2VyRGF5O1xyXG4gICAgICAgIGVuZDogSURhdGVQaWNrZXJEYXk7XHJcbiAgICB9XHJcblxyXG4gICAgZW51bSBEYXRlUGlja2VyVmlldyB7XHJcbiAgICAgICAgRGF5cyA9IDAsXHJcbiAgICAgICAgTW9udGhzID0gMSxcclxuICAgICAgICBZZWFycyA9IDJcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyQ29udHJvbGxlciB7XHJcblxyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnLCAnZGF0ZVBpY2tlclNlcnZpY2UnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsIHByaXZhdGUgZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZSkge1xyXG4gICAgICAgICAgICBEYXRlUGlja2VyTW91c2VSYW5nZS5ib290c3RyYXAoZGF0ZVBpY2tlclNlcnZpY2UpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pc1NpbmdsZURhdGUgPSAoJGF0dHJzWydzdGFydCddID09IG51bGwgJiYgJGF0dHJzWydlbmQnXSA9PSBudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5tb250aE5hbWVzID0gZGF0ZVBpY2tlclNlcnZpY2UuZ2V0TW9udGhzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF5c09mV2VlayA9IGRhdGVQaWNrZXJTZXJ2aWNlLmdldERheXNPZldlZWsoKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoJGF0dHJzWydtaW5WaWV3J10pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXJzJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5ZZWFycztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblZpZXcgPSBEYXRlUGlja2VyVmlldy5ZZWFycztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3Lk1vbnRocztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuRGF5cztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkb25Jbml0KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWZhdWx0RGF0ZSA9PSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0RGF0ZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkYXRlSW50ZXJuYWwgPSAodGhpcy5pc1NpbmdsZURhdGUgPyB0aGlzLmRhdGUgOiB0aGlzLnN0YXJ0KSB8fCB0aGlzLmRlZmF1bHREYXRlO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZUludGVybmFsKGRhdGVJbnRlcm5hbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcG9zdExpbmsoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWaWV3RGF0ZSh0aGlzLmRhdGUgfHwgdGhpcy5kZWZhdWx0RGF0ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLnN0YXJ0IHx8IHRoaXMuZGVmYXVsdERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1JhbmdlKHN0YXJ0LCB0aGlzLmVuZCB8fCBzdGFydClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNpbmdsZSBEYXRlXHJcbiAgICAgICAgX2RhdGU6IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgcHVibGljIGdldCBkYXRlKCk6IHN0cmluZyB8IERhdGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBkYXRlKHZhbHVlOiBzdHJpbmcgfCBEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSYW5nZVxyXG4gICAgICAgIF9zdGFydDogc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICBwdWJsaWMgZ2V0IHN0YXJ0KCk6IHN0cmluZyB8IERhdGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgc3RhcnQodmFsdWU6IHN0cmluZyB8IERhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRSYW5nZSh2YWx1ZSwgdGhpcy5fZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9lbmQ6IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgcHVibGljIGdldCBlbmQoKTogc3RyaW5nIHwgRGF0ZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgZW5kKHZhbHVlOiBzdHJpbmcgfCBEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UmFuZ2UodGhpcy5fc3RhcnQsIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBoYXNDaGFuZ2VkID0gdGhpcy5fZGF0ZSAhPT0gZGF0ZTtcclxuICAgICAgICAgICAgaWYgKCFoYXNDaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gZGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fZW5kID0gZGF0ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZUludGVybmFsKHRoaXMuX2RhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXdEYXRlKGRhdGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQgJiYgdGhpcy5vbkRhdGVTZWxlY3QpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IGRhdGUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRSYW5nZShzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc0NoYW5nZWQgPSB0aGlzLl9zdGFydCAhPT0gc3RhcnQgfHwgdGhpcy5fZW5kICE9PSBlbmQ7XHJcbiAgICAgICAgICAgIGlmICghaGFzQ2hhbmdlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGUgPSBzdGFydDtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnQgPSBzdGFydDtcclxuICAgICAgICAgICAgdGhpcy5fZW5kID0gZW5kO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRlSW50ZXJuYWwodGhpcy5fZGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1JhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vblJhbmdlU2VsZWN0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblJhbmdlU2VsZWN0KHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2RhdGVJbnRlcm5hbDogbW9tZW50Lk1vbWVudDtcclxuXHJcbiAgICAgICAgZ2V0IGRhdGVJbnRlcm5hbCgpOiBtb21lbnQuTW9tZW50IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVJbnRlcm5hbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0RGF0ZUludGVybmFsKHZhbHVlOiBzdHJpbmcgfCBEYXRlIHwgbW9tZW50Lk1vbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRlSW50ZXJuYWwgPSAodmFsdWUgIT0gbnVsbCkgPyBtb21lbnQodmFsdWUpIDogbW9tZW50KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZClcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKHRoaXMuX2RhdGVJbnRlcm5hbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNhbGN1bGF0ZShmcm9tRGF0ZTogbW9tZW50Lk1vbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGZyb21EYXRlLmNsb25lKCkuc3RhcnRPZignbW9udGgnKS5zdGFydE9mKCd3ZWVrJyksXHJcbiAgICAgICAgICAgICAgICBlbmQgPSBmcm9tRGF0ZS5jbG9uZSgpLmVuZE9mKCdtb250aCcpLmVuZE9mKCd3ZWVrJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndlZWtzID0gbmV3IEFycmF5PElEYXRlUGlja2VyRGF5W10+KCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSA9IHN0YXJ0OyBkYXkuaXNCZWZvcmUoZW5kKTsgZGF5ID0gZGF5LmNsb25lKCkuYWRkKDEsICd3ZWVrJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdlZWsgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFdlZWsoZnJvbURhdGUsIGRheSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlZWtzLnB1c2god2Vlayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMueWVhcnMgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFllYXJzKGZyb21EYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFZpZXdEYXRlKGRhdGUpIHtcclxuICAgICAgICAgICAgLy8gb3ZlcnJpZGUgaW4gbGluayBmdW5jdGlvbnNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzZXRWaWV3UmFuZ2Uoc3RhcnQsIGVuZCkge1xyXG4gICAgICAgICAgICAvLyBvdmVycmlkZSBpbiBsaW5rIGZ1bmN0aW9uc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGdldCB0aXRsZSgpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LkRheXM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVJbnRlcm5hbC5mb3JtYXQoJ01NTU0gWVlZWScpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5Nb250aHM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVJbnRlcm5hbC5mb3JtYXQoJ1lZWVknKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuWWVhcnM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdzZWxlY3QgYSB5ZWFyJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHZpZXdUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3Lk1vbnRoczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJtb250aHNcIjtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuWWVhcnM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwieWVhcnNcIjtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LkRheXM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZGF5c1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaG93RGF5cygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA+IERhdGVQaWNrZXJWaWV3LkRheXMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3LkRheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaG93TW9udGhzKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID4gRGF0ZVBpY2tlclZpZXcuTW9udGhzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5Nb250aHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaG93WWVhcnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3LlllYXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNTZWxlY3RlZChkYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQodGhpcy5fZGF0ZSkuaXNTYW1lKGRheS52YWx1ZSwgJ2RheScpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRheS52YWx1ZS5pc0JldHdlZW4odGhpcy5fc3RhcnQsIHRoaXMuX2VuZCwgJ2RheScpIHx8XHJcbiAgICAgICAgICAgICAgICBkYXkudmFsdWUuaXNTYW1lKHRoaXMuX3N0YXJ0LCAnZGF5JykgfHxcclxuICAgICAgICAgICAgICAgIGRheS52YWx1ZS5pc1NhbWUodGhpcy5fZW5kLCAnZGF5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0hpZ2hsaWdodGVkKGRheTogSURhdGVQaWNrZXJEYXkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0ZWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oaWdobGlnaHRlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmhpZ2hsaWdodGVkW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCh2YWx1ZSkuaXNTYW1lKGRheS52YWx1ZSwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGluZyhkYXlzOiBJRGF0ZVBpY2tlckRheVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZGVzZWxlY3RBbGwodGhpcy53ZWVrcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2Uuc2VsZWN0RGF5cyhkYXlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkKGRheXM6IElEYXRlUGlja2VyRGF5W10pIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5kZXNlbGVjdEFsbCh0aGlzLndlZWtzKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gZGF5c1swXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZShzdGFydCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IGRheXNbZGF5cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWREYXRlKGRheTogSURhdGVQaWNrZXJEYXkpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG1vbWVudChkYXkudmFsdWUpLmZvcm1hdCh0aGlzLmlzb0Zvcm1hdCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZShkYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkUmFuZ2Uoc3RhcnREYXk6IElEYXRlUGlja2VyRGF5LCBlbmREYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gbW9tZW50KHN0YXJ0RGF5LnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICBjb25zdCBlbmQgPSBtb21lbnQoZW5kRGF5LnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0TW9udGgoaWR4KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vbnRoID0gdGhpcy5tb250aE5hbWVzW2lkeF07XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9udGgobW9udGgudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID09PSBEYXRlUGlja2VyVmlldy5Nb250aHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLmRhdGVJbnRlcm5hbC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGUoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5kYXRlSW50ZXJuYWwuY2xvbmUoKS5lbmRPZignbW9udGgnKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSB0aGlzLmRhdGVJbnRlcm5hbC5jbG9uZSgpLmVuZE9mKCdtb250aCcpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UmFuZ2Uoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dEYXlzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RZZWFyKGlkeCkge1xyXG4gICAgICAgICAgICBjb25zdCB5ZWFyID0gdGhpcy55ZWFyc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldFllYXIoeWVhci52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPT09IERhdGVQaWNrZXJWaWV3LlllYXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRlKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuZGF0ZUludGVybmFsLmNsb25lKCkuc3RhcnRPZigneWVhcicpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuZGF0ZUludGVybmFsLmNsb25lKCkuZW5kT2YoJ3llYXInKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93TW9udGhzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNoYW5nZURhdGUoYWN0aW9uOiAoZGF0ZTogbW9tZW50Lk1vbWVudCkgPT4gbW9tZW50Lk1vbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGVJbnRlcm5hbChhY3Rpb24odGhpcy5kYXRlSW50ZXJuYWwuY2xvbmUoKSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNNb250aChtb250aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlSW50ZXJuYWwubW9udGgoKSA9PSBtb250aC52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldE1vbnRoKG1vbnRoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0ZShkYXRlID0+IGRhdGUuc2V0KCdtb250aCcsIG1vbnRoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1llYXIoeWVhcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlSW50ZXJuYWwueWVhcigpID09IHllYXIudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRZZWFyKHllYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlKGRhdGUgPT4gZGF0ZS5zZXQoJ3llYXInLCB5ZWFyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2TW9udGgoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0ZShkYXRlID0+IGRhdGUuc3VidHJhY3QoMSwgJ21vbnRocycpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5leHRNb250aCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlKGRhdGUgPT4gZGF0ZS5hZGQoMSwgJ21vbnRocycpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZZZWFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLnN1YnRyYWN0KDEsICd5ZWFycycpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5leHRZZWFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLmFkZCgxLCAneWVhcnMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2UmFuZ2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0ZShkYXRlID0+IGRhdGUuc3VidHJhY3QoOSwgJ3llYXJzJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV4dFJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLmFkZCg5LCAneWVhcnMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkRhdGVTZWxlY3Q7XHJcbiAgICAgICAgb25SYW5nZVNlbGVjdDtcclxuICAgICAgICBpc1NlbGVjdGluZzogYm9vbGVhbjtcclxuICAgICAgICB2aWV3OiBEYXRlUGlja2VyVmlldztcclxuICAgICAgICBtaW5WaWV3OiBEYXRlUGlja2VyVmlldztcclxuICAgICAgICB3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdO1xyXG4gICAgICAgIHllYXJzOiBJRGF0ZVBpY2tlclllYXJbXTtcclxuICAgICAgICBtb250aE5hbWVzOiBJRGF0ZVBpY2tlck1vbnRoW107XHJcbiAgICAgICAgZGF5c09mV2Vlazogc3RyaW5nW107XHJcbiAgICAgICAgaXNWaXNpYmxlOiBib29sZWFuO1xyXG4gICAgICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgICAgIGlzb0Zvcm1hdCA9ICdZWVlZLU1NLUREJztcclxuICAgICAgICBpc1NpbmdsZURhdGU6IGJvb2xlYW47XHJcbiAgICAgICAgaGlnaGxpZ2h0ZWQ6IHN0cmluZ1tdO1xyXG4gICAgICAgIGRlZmF1bHREYXRlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGNsaWVudERhdGU6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5jb250cm9sbGVyKCdkYXRlUGlja2VyJywgRGF0ZVBpY2tlckNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckaW5qZWN0b3InLCAnJGNvbXBpbGUnLCAnJHRlbXBsYXRlQ2FjaGUnLCAnJHRpbWVvdXQnLCAnJHdpbmRvdycsICdkYXRlUGlja2VyU2VydmljZScsICdpc01vYmlsZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRpbmplY3RvciwgcHJpdmF0ZSAkY29tcGlsZSwgcHJpdmF0ZSAkdGVtcGxhdGVDYWNoZSwgcHJpdmF0ZSAkdGltZW91dCwgcHJpdmF0ZSAkd2luZG93LCBwcml2YXRlIGRhdGVQaWNrZXJTZXJ2aWNlOiBJRGF0ZVBpY2tlclNlcnZpY2UsIHByaXZhdGUgaXNNb2JpbGU6IGJvb2xlYW4pIHsgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdBRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsnZGF0ZVBpY2tlcicsICc/bmdNb2RlbCddO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBEYXRlUGlja2VyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAnZGF0ZXBpY2tlcic7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIC8vIFNpbmdsZSBEYXRlXHJcbiAgICAgICAgICAgICdkYXRlJzogJz0/ZGF0ZScsXHJcbiAgICAgICAgICAgIG9uRGF0ZVNlbGVjdDogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gUmFuZ2VcclxuICAgICAgICAgICAgJ3N0YXJ0JzogJz0/c3RhcnQnLFxyXG4gICAgICAgICAgICAnZW5kJzogJz0/ZW5kJyxcclxuICAgICAgICAgICAgb25SYW5nZVNlbGVjdDogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gT3RoZXJcclxuICAgICAgICAgICAgaXNTZWxlY3Rpbmc6ICc9PycsXHJcbiAgICAgICAgICAgIGRlZmF1bHREYXRlOiAnQD8nLFxyXG4gICAgICAgICAgICBvbkNoYW5nZTogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gQ29sbGVjdGlvbiBvZiBkYXRlIHN0cmluZ3MgKGllLiBbJzIwMTItMTItMDEnLCcyMDEyLTEyLTAyJ11cclxuICAgICAgICAgICAgaGlnaGxpZ2h0ZWQ6ICc9PydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYWxlbmRhclRlbXBsYXRlID0gJ2RhdGUtcGlja2VyLmh0bWwnO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgWyRjdHJsLCAkbmdNb2RlbF06IFtEYXRlUGlja2VyQ29udHJvbGxlciwgYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXJdKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlUZXRoZXJGaXgoJGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua01vYmlsZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtEZXNrdG9wKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmtNb2JpbGUgPSAoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCAkbmdNb2RlbDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0lucHV0KCRlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rTmF0aXZlSW5wdXQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNFbGVtZW50KCRlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rSW5saW5lKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua05hdGl2ZUVsZW1lbnQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rRGVza3RvcCA9ICgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsICRuZ01vZGVsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSW5wdXQoJGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtJbnB1dCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzRWxlbWVudCgkZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua0lubGluZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtFbGVtZW50KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCRjdHJsLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cERheVNlbGVjdCgkc2NvcGUsICRlbGVtZW50LCAkY3RybCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwUmFuZ2VTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0lucHV0KCRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmlzKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNFbGVtZW50KCRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmlzKCdkYXRlLXBpY2tlcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRml4ZXMgYSBidWcgd2hlcmUgVGV0aGVyIGNhbm5vdCBjb3JyZWN0bHkgZ2V0IHdpZHRoL2hlaWdodCBiZWNhdXNlIG9mIG5nQW5pbWF0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcGx5VGV0aGVyRml4KCRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkpIHtcclxuICAgICAgICAgICAgdmFyICRhbmltYXRlID0gdGhpcy4kaW5qZWN0b3IuZ2V0KCckYW5pbWF0ZScpO1xyXG4gICAgICAgICAgICBpZiAoJGFuaW1hdGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICRhbmltYXRlLmVuYWJsZWQoZmFsc2UsICRlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpbmtOYXRpdmVJbnB1dCgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsICRuZ01vZGVsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IChkYXRlLCBwYXR0ZXJuKTogc3RyaW5nID0+IChkYXRlID09IG51bGwpID8gJycgOiBtb21lbnQoZGF0ZSkuZm9ybWF0KHBhdHRlcm4pO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlRm9ybWF0ID0gKGRhdGUpID0+IGZvcm1hdChkYXRlLCBcIllZWVktTU0tRERcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vbnRoRm9ybWF0ID0gKGRhdGUpID0+IGZvcm1hdChkYXRlLCBcIllZWVktTU1cIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyID0gZGF0ZUZvcm1hdDtcclxuXHJcbiAgICAgICAgICAgIGlmICgkYXR0cnNbJ21pblZpZXcnXSA9PSBcIm1vbnRoc1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJtb250aFwiO1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyID0gbW9udGhGb3JtYXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNldFZpZXdEYXRlID0gKGRhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBpc28gPSBmb3JtYXR0ZXIoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbC4kc2V0Vmlld1ZhbHVlKGlzbyk7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5wcm9wKFwidHlwZVwiLCB0eXBlKTtcclxuICAgICAgICAgICAgJGN0cmwuc2V0Vmlld0RhdGUgPSBzZXRWaWV3RGF0ZTtcclxuXHJcbiAgICAgICAgICAgICRuZ01vZGVsLiR2aWV3Q2hhbmdlTGlzdGVuZXJzLnB1c2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZXdWYWx1ZSA9IG1vbWVudCgkbmdNb2RlbC4kdmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSB2aWV3VmFsdWUuaXNWYWxpZCgpID8gZGF0ZUZvcm1hdCgkbmdNb2RlbC4kdmlld1ZhbHVlKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZXREYXRlKGRhdGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpbmtJbnB1dCgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsIG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IChkYXRlOm1vbWVudC5Nb21lbnQpID0+IGRhdGUuZm9ybWF0KFwiTFwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNldFZpZXdEYXRlID0gKGRhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gZGF0ZSA9PSBudWxsID8gJycgOiBmb3JtYXQobW9tZW50KGRhdGUpKTtcclxuICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodGV4dCk7XHJcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXRWaWV3UmFuZ2UgPSAoc3RhcnQsIGVuZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSAnJztcclxuICAgICAgICAgICAgICAgIGlmIChzdGFydCAhPSBudWxsICYmIGVuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1TdGFydCA9IG1vbWVudChzdGFydCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1FbmQgPSBtb21lbnQoZW5kKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1TdGFydC5pc1NhbWUoZW5kLCAnZGF5JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGZvcm1hdChtU3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBgJHtmb3JtYXQobVN0YXJ0KX0gLSAke2Zvcm1hdChtRW5kKX1gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gZm9ybWF0KG1vbWVudChlbmQpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gZm9ybWF0KG1vbWVudChlbmQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGN0cmwuc2V0Vmlld0RhdGUgPSBzZXRWaWV3RGF0ZTtcclxuICAgICAgICAgICAgJGN0cmwuc2V0Vmlld1JhbmdlID0gc2V0Vmlld1JhbmdlO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGNoYW5nZS4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRjdHJsLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0VG9Nb21lbnQobmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0ZS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2V0RGF0ZShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGUuaXNTYW1lKCRjdHJsLmRhdGUsICdkYXknKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5zZXREYXRlKGRhdGUuZm9ybWF0KCRjdHJsLmlzb0Zvcm1hdCkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5nZSA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb1JhbmdlKG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY3RybC5zZXRSYW5nZShudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBtb21lbnQocmFuZ2Uuc3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gbW9tZW50KHJhbmdlLmVuZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXJ0LmlzVmFsaWQoKSB8fCAhZW5kLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2V0UmFuZ2UobnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFydC5pc1NhbWUoJGN0cmwuc3RhcnQsICdkYXknKSAmJiBlbmQuaXNTYW1lKCRjdHJsLmVuZCwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2V0UmFuZ2UocmFuZ2Uuc3RhcnQsIHJhbmdlLmVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihga2V5ZG93bi4keyRzY29wZS4kaWR9YCwgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISRjdHJsLmlzVmlzaWJsZSB8fCAhdGhpcy5pc0VzY2FwZShlKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpbmtOYXRpdmVFbGVtZW50KCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyLCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUYWJJbmRleCgkZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnZXRWbSA9IChuYW1lKSA9PiBgJHt0aGlzLmNvbnRyb2xsZXJBc30uJHtuYW1lfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGdldEF0dHIgPSAobmFtZSwgdmFsdWUpID0+IGAke25hbWV9PVwiJHt2YWx1ZX1cImBcclxuICAgICAgICAgICAgY29uc3QgZ2V0Vm1BdHRyID0gKG5hbWUsIHZhbHVlKSA9PiBnZXRBdHRyKG5hbWUsIGdldFZtKHZhbHVlKSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBUeXBlQnVpbGRlcigpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IF9idWlsZGVyID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEF0dHIgPSAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLnB1c2goZ2V0QXR0cihuYW1lLCB2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYnVpbGRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZExpdGVyYWwgPSAobmFtZSwgYXR0cikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgJGF0dHJzW2F0dHJdICE9IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMucHVzaChnZXRBdHRyKG5hbWUsICRhdHRyc1thdHRyXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYnVpbGRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJpbmRpbmcgPSAobmFtZSwgYXR0ciwgY3RybCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0ciA9PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyID0gJGF0dHJzW2F0dHJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0ciAhPSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLnB1c2goZ2V0Vm1BdHRyKG5hbWUsIGN0cmwpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2J1aWxkZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQcm94eSA9IChuYW1lOiBzdHJpbmcsIGZuOiBGdW5jdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsW25hbWVdID0gZm47XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9idWlsZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnQgPSAobmFtZSwgYXR0ciwgY3RybCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgJGF0dHJzW2F0dHJdICE9IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMucHVzaChnZXRWbUF0dHIobmFtZSwgY3RybCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYnVpbGRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBgPGlucHV0IGRhdGUtcGlja2VyICR7dGhpcy5hdHRycy5qb2luKCcgJyl9IHJlcXVpcmVkPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJ1aWxkZXIgPSBuZXcgVHlwZUJ1aWxkZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFkZEF0dHIoXCJ0eXBlXCIsIFwidGV4dFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZExpdGVyYWwoXCJtaW4tdmlld1wiLCBcIm1pblZpZXdcIilcclxuICAgICAgICAgICAgICAgIC5hZGRCaW5kaW5nKFwibmctbW9kZWxcIiwgdHJ1ZSwgXCJkYXRlU3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQmluZGluZyhcImRhdGVcIiwgXCJkYXRlXCIsIFwiZGF0ZVwiKVxyXG4gICAgICAgICAgICAgICAgLy8gLmFkZFByb3h5KFwiZGF0ZVNlbGVjdGVkXCIsIChkYXRlKSA9PiAkY3RybC5vbkRhdGVTZWxlY3QoeyBkYXRlOiBkYXRlIH0pKVxyXG4gICAgICAgICAgICAgICAgLy8gLmFkZEV2ZW50KFwib24tZGF0ZS1zZWxlY3RcIiwgXCJvbkRhdGVTZWxlY3RcIiwgXCJkYXRlU2VsZWN0ZWQoZGF0ZSlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRCaW5kaW5nKFwic3RhcnRcIiwgXCJzdGFydFwiLCBcInN0YXJ0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQmluZGluZyhcImVuZFwiLCBcImVuZFwiLCBcImVuZFwiKVxyXG4gICAgICAgICAgICAgICAgLy8gLmFkZFByb3h5KFwicmFuZ2VTZWxlY3RlZFwiLCAoc3RhcnQsIGVuZCkgPT4gJGN0cmwub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfSkpXHJcbiAgICAgICAgICAgICAgICAvLyAuYWRkRXZlbnQoXCJvbi1yYW5nZS1zZWxlY3RcIiwgXCJvblJhbmdlU2VsZWN0XCIsIFwicmFuZ2VTZWxlY3RlZChzdGFydCxlbmQpXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQmluZGluZyhcImlzLXNlbGVjdGluZ1wiLCBcImlzU2VsZWN0aW5nXCIsIFwiaXNTZWxlY3RpbmdcIilcclxuICAgICAgICAgICAgICAgIC5hZGRMaXRlcmFsKFwiZGVmYXVsdC1kYXRlXCIsIFwiZGVmYXVsdERhdGVcIilcclxuICAgICAgICAgICAgICAgIC5hZGRCaW5kaW5nKFwiaGlnaGxpZ2h0ZWRcIiwgXCJoaWdobGlnaHRlZFwiLCBcImhpZ2hsaWdodGVkXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGJ1aWxkZXIuYnVpbGQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRpbnB1dCA9IGFuZ3VsYXIuZWxlbWVudChjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdkYXRlcGlja2VyLWxpbmtOYXRpdmVFbGVtZW50LWlucHV0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbXBpbGUoJGlucHV0KSgkc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ2RhdGVwaWNrZXItbGlua05hdGl2ZUVsZW1lbnQnKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoXCJocmVmXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCRpbnB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rRWxlbWVudCgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsIG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGFiSW5kZXgoJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rSW5saW5lKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyLCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuY3JlYXRlQ29udGVudCgkc2NvcGUpO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoY29udGVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUYWJJbmRleCgkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RWxlbWVudCA9ICRlbGVtZW50LmdldCgwKTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRUYWJJbmRleCA9IGN1cnJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcInRhYkluZGV4XCIpO1xyXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ0YWJJbmRleFwiLCBjdXJyZW50VGFiSW5kZXggIT0gbnVsbCA/IGN1cnJlbnRUYWJJbmRleCA6IFwiLTFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3BvdmVyKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgdGV0aGVyLFxyXG4gICAgICAgICAgICAgICAgJGJvZHk6IGFueSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRvTm90UmVvcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uU2VsZWN0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkb05vdFJlb3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgZG9Ob3RSZW9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsWydkYXRlU2VsZWN0ZWQnXSA9IChkYXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvblNlbGVjdCgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGN0cmxbJ3JhbmdlU2VsZWN0ZWQnXSA9IChzdGFydCwgZW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvblNlbGVjdCgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGNsaWNrLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBmb2N1cy4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvTm90UmVvcGVuKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmNyZWF0ZURyb3BEb3duKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5LmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRldGhlciA9IG5ldyBUZXRoZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICRlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBdHRhY2htZW50OiAnYm90dG9tIGNlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b3AgY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NQcmVmaXg6ICdkYXRlcGlja2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0T2Zmc2V0OiAnMTRweCAwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogJ3dpbmRvdycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudDogJ3RvZ2V0aGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaW46IFsndG9wJywgJ2xlZnQnLCAnYm90dG9tJywgJ3JpZ2h0J11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHRldGhlci5wb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBibHVyVGltZXI7XHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBibHVyLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBBbGxvdyBhbnkgY2xpY2sgb24gdGhlIG1lbnUgdG8gY29tZSB0aHJvdWdoIGZpcnN0XHJcbiAgICAgICAgICAgICAgICBibHVyVGltZXIgPSB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGN0cmwuaXNTZWxlY3RpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkYm9keS5vbihgY2xpY2suJHskc2NvcGUuJGlkfWAsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkY3RybC5pc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY29udGVudCB8fCAkZWxlbWVudC5pcyhlLnRhcmdldCkgfHwgY29udGVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0LmNhbmNlbChibHVyVGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50ICYmIGNvbnRlbnQuaGFzKGUudGFyZ2V0KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRib2R5Lm9mZihgY2xpY2suJHskc2NvcGUuJGlkfWApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQpIGNvbnRlbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlRHJvcERvd24oJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpOiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkge1xyXG4gICAgICAgICAgICB2YXIgc2luZ2xlRGF0ZUJpbmRpbmcgPSBgZGF0ZT1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmRhdGVcIiBvbi1kYXRlLXNlbGVjdD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmRhdGVTZWxlY3RlZChkYXRlKVwiYCxcclxuICAgICAgICAgICAgICAgIHJhbmdlQmluZGluZyA9IGBzdGFydD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LnN0YXJ0XCIgZW5kPVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uZW5kXCIgb24tcmFuZ2Utc2VsZWN0PVwiJHt0aGlzLmNvbnRyb2xsZXJBc30ucmFuZ2VTZWxlY3RlZChzdGFydCxlbmQpXCJgLFxyXG4gICAgICAgICAgICAgICAgYmluZGluZ3MgPSAkY3RybC5pc1NpbmdsZURhdGUgPyBzaW5nbGVEYXRlQmluZGluZyA6IHJhbmdlQmluZGluZyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gYDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWRyb3Bkb3duXCIgbmctY2xhc3M9XCJ7J2RhdGVwaWNrZXItb3Blbic6JHt0aGlzLmNvbnRyb2xsZXJBc30uaXNWaXNpYmxlfVwiPjxkYXRlLXBpY2tlciBtaW4tdmlldz1cIiR7JGF0dHJzWydtaW5WaWV3J119XCIgaXMtc2VsZWN0aW5nPVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uaXNTZWxlY3RpbmdcIiAke2JpbmRpbmdzfVwiIGhpZ2hsaWdodGVkPVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uaGlnaGxpZ2h0ZWRcIiBkZWZhdWx0LWRhdGU9XCJ7eyR7dGhpcy5jb250cm9sbGVyQXN9LmRlZmF1bHREYXRlfX1cIj48L2RhdGUtcGlja2VyPjwvZGl2PmAsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9ICRlbGVtZW50LnBvc2l0aW9uKCksXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSAkZWxlbWVudC5vdXRlckhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luID0gKCRlbGVtZW50Lm91dGVySGVpZ2h0KHRydWUpIC0gaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG9mZnNldCA9IG1hcmdpbiAvIDIgKyBoZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgY29udGVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdG9wOiBwb3NpdGlvbi50b3AgKyBvZmZzZXQsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBwb3NpdGlvbi5sZWZ0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRjb21waWxlKGNvbnRlbnQpKCRzY29wZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZlbnREZWZhdWx0KGU6IEpRdWVyeUV2ZW50T2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNFc2NhcGUoZTogSlF1ZXJ5RXZlbnRPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUud2hpY2ggPT09IDI3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ29udGVudCgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlKTogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLiR0ZW1wbGF0ZUNhY2hlLmdldCh0aGlzLmNhbGVuZGFyVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZShjb250ZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldHVwRGF5U2VsZWN0KCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBjb25zdCBkYXlDc3MgPSAnLmRhdGVQaWNrZXJEYXlzLWRheScsXHJcbiAgICAgICAgICAgICAgICAkYm9keTogYW55ID0gYW5ndWxhci5lbGVtZW50KCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICBtb3VzZURvd24gPSBgbW91c2Vkb3duLiR7JHNjb3BlLiRpZH1gLFxyXG4gICAgICAgICAgICAgICAgbW91c2VVcCA9IGBtb3VzZXVwLiR7JHNjb3BlLiRpZH1gO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25TZWxlY3RlZCA9IChyYW5nZTogRGF0ZVBpY2tlck1vdXNlUmFuZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXlzID0gcmFuZ2UuZ2V0RGF5cygpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0ZWQoZGF5cyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihtb3VzZURvd24sIGRheUNzcywgKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByYW5nZSA9IG5ldyBEYXRlUGlja2VyTW91c2VSYW5nZSgkY3RybCwgZSk7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1NlbGVjdGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJvZHkub24obW91c2VVcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5Lm9mZihtb3VzZVVwKTtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5pc1NlbGVjdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0ZWQocmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0dXBSYW5nZVNlbGVjdCgkc2NvcGUsICRlbGVtZW50LCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgJGJvZHk6IGFueSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgbW91c2VEb3duID0gYG1vdXNlZG93bi4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIG1vdXNlT3ZlciA9IGBtb3VzZW92ZXIuJHskc2NvcGUuJGlkfWAsXHJcbiAgICAgICAgICAgICAgICBtb3VzZVVwID0gYG1vdXNldXAuJHskc2NvcGUuJGlkfWAsXHJcbiAgICAgICAgICAgICAgICBkYXlDc3MgPSAnLmRhdGVQaWNrZXJEYXlzLWRheSc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvblNlbGVjdGluZyA9IChyYW5nZTogRGF0ZVBpY2tlck1vdXNlUmFuZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRheXMgPSByYW5nZS5nZXREYXlzKCk7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3RpbmcoZGF5cyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvblNlbGVjdGVkID0gKHJhbmdlOiBEYXRlUGlja2VyTW91c2VSYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF5cyA9IHJhbmdlLmdldERheXMoKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdGVkKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VEb3duLCBkYXlDc3MsIChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBuZXcgRGF0ZVBpY2tlck1vdXNlUmFuZ2UoJGN0cmwsIGUpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNTZWxlY3RpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9uKG1vdXNlT3ZlciwgZGF5Q3NzLCAoZTogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByYW5nZS5zZXRFbmQoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RpbmcocmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJvZHkub24obW91c2VVcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihtb3VzZU92ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5Lm9mZihtb3VzZVVwKTtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5pc1NlbGVjdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0ZWQocmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5kaXJlY3RpdmUoJ2RhdGVQaWNrZXInLCBEYXRlUGlja2VyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICAvLyBEYXRlUGlja2VyUmFuZ2VcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJSYW5nZSB7XHJcbiAgICAgICAgc3RhcnQ6IHN0cmluZztcclxuICAgICAgICBlbmQ6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyUmFuZ2UgaW1wbGVtZW50cyBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGFydDogYW55LCBlbmQ6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgbVN0YXJ0ID0gbW9tZW50KHN0YXJ0KTtcclxuICAgICAgICAgICAgdmFyIG1FbmQgPSBtb21lbnQoZW5kKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtRW5kLmlzQmVmb3JlKG1TdGFydCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gbVN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgbVN0YXJ0ID0gbUVuZDtcclxuICAgICAgICAgICAgICAgIG1FbmQgPSB0ZW1wO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbVN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG1FbmQuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGFydDogc3RyaW5nO1xyXG4gICAgICAgIGVuZDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERhdGVQaWNrZXJNb250aFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlck1vbnRoIHtcclxuICAgICAgICB2YWx1ZTogbnVtYmVyO1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBpc0N1cnJlbnRNb250aDogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyTW9udGggaW1wbGVtZW50cyBJRGF0ZVBpY2tlck1vbnRoIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgbSA9IG1vbWVudCgpO1xyXG4gICAgICAgICAgICB2YXIgdGhpc01vbnRoID0gbS5tb250aCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBtLm1vbnRoKHZhbHVlKS5mb3JtYXQoJ01NTScpO1xyXG4gICAgICAgICAgICB0aGlzLmlzQ3VycmVudE1vbnRoID0gdmFsdWUgPT09IHRoaXNNb250aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBpc0N1cnJlbnRNb250aDogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEYXRlUGlja2VyTW9udGhcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJZZWFyIHtcclxuICAgICAgICB2YWx1ZTogbnVtYmVyO1xyXG4gICAgICAgIGlzQ3VycmVudFllYXI6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlclllYXIgaW1wbGVtZW50cyBJRGF0ZVBpY2tlclllYXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50WWVhciA9IHZhbHVlID09PSBtb21lbnQoKS55ZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0N1cnJlbnRZZWFyOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElEYXRlUGlja2VyRGF5XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyRGF5IHtcclxuICAgICAgICBkYXRlOiBudW1iZXI7XHJcbiAgICAgICAgdmFsdWU6IGFueTtcclxuICAgICAgICBpc1RvZGF5OiBib29sZWFuO1xyXG4gICAgICAgIGlzTm90SW5Nb250aDogYm9vbGVhbjtcclxuICAgICAgICBpc1NlbGVjdGluZzogYm9vbGVhbjtcclxuICAgICAgICBpc0JlZm9yZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbjtcclxuICAgICAgICBpc1NhbWUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlckRheSBpbXBsZW1lbnRzIElEYXRlUGlja2VyRGF5IHtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihmcm9tRGF0ZTogYW55LCBkYXlPZldlZWs6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbW9tZW50KGRheU9mV2Vlayk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMudmFsdWUuZGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzVG9kYXkgPSBkYXlPZldlZWsuaXNTYW1lKG1vbWVudCgpLCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNOb3RJbk1vbnRoID0gIXRoaXMudmFsdWUuaXNTYW1lKGZyb21EYXRlLCAnbW9udGgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGU6IG51bWJlcjtcclxuICAgICAgICB2YWx1ZTogYW55O1xyXG4gICAgICAgIGlzVG9kYXk6IGJvb2xlYW47XHJcbiAgICAgICAgaXNOb3RJbk1vbnRoOiBib29sZWFuO1xyXG4gICAgICAgIGlzU2VsZWN0aW5nOiBib29sZWFuO1xyXG5cclxuICAgICAgICBpc0JlZm9yZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBpc0JlZm9yZSA9IHRoaXMudmFsdWUuaXNCZWZvcmUoZGF5LnZhbHVlLCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpc0JlZm9yZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzU2FtZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBpc1NhbWUgPSB0aGlzLnZhbHVlLmlzU2FtZShkYXkudmFsdWUsICdkYXknKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzU2FtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlclNlcnZpY2VcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJTZXJ2aWNlIHtcclxuICAgICAgICBnZXRNb250aHMoKTogSURhdGVQaWNrZXJNb250aFtdO1xyXG4gICAgICAgIGdldERheXNPZldlZWsoKTogc3RyaW5nW107XHJcbiAgICAgICAgZ2V0WWVhcnMoZnJvbURhdGUpOiBJRGF0ZVBpY2tlclllYXJbXTtcclxuICAgICAgICBnZXRXZWVrKGZyb21EYXRlLCBzdGFydE9mV2Vlayk6IElEYXRlUGlja2VyRGF5W107XHJcbiAgICAgICAgZ2V0UmFuZ2VEYXlzKHN0YXJ0OiBJRGF0ZVBpY2tlckRheSwgZW5kOiBJRGF0ZVBpY2tlckRheSwgd2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSk6IElEYXRlUGlja2VyRGF5W107XHJcbiAgICAgICAgZGVzZWxlY3RBbGwod2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSk7XHJcbiAgICAgICAgc2VsZWN0RGF5cyhkYXlzOiBJRGF0ZVBpY2tlckRheVtdKTtcclxuICAgICAgICBpbnB1dFRvTW9tZW50KHZhbHVlOiBzdHJpbmcpOiBhbnk7XHJcbiAgICAgICAgaW5wdXRUb1JhbmdlKHZhbHVlOiBzdHJpbmcpOiBJRGF0ZVBpY2tlclJhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJTZXJ2aWNlIGltcGxlbWVudHMgSURhdGVQaWNrZXJTZXJ2aWNlIHtcclxuICAgICAgICBnZXRNb250aHMoKTogSURhdGVQaWNrZXJNb250aFtdIHtcclxuICAgICAgICAgICAgdmFyIG1vbnRocyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlck1vbnRoPigpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aHMucHVzaChuZXcgRGF0ZVBpY2tlck1vbnRoKGkpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1vbnRocztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFllYXJzKGZyb21EYXRlKTogSURhdGVQaWNrZXJZZWFyW10ge1xyXG4gICAgICAgICAgICB2YXIgZnJvbVllYXIgPSBtb21lbnQoZnJvbURhdGUpLnllYXIoKSxcclxuICAgICAgICAgICAgICAgIHllYXJzID0gbmV3IEFycmF5PElEYXRlUGlja2VyWWVhcj4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBmcm9tWWVhcjsgaSA8PSAoZnJvbVllYXIgKyA4KTsgaSsrKVxyXG4gICAgICAgICAgICAgICAgeWVhcnMucHVzaChuZXcgRGF0ZVBpY2tlclllYXIoaSkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHllYXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0V2Vlayhmcm9tRGF0ZSwgc3RhcnRPZldlZWspOiBJRGF0ZVBpY2tlckRheVtdIHtcclxuICAgICAgICAgICAgdmFyIGVuZE9mV2VlayA9IG1vbWVudChzdGFydE9mV2VlaykuZW5kT2YoJ3dlZWsnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXlzID0gbmV3IEFycmF5PElEYXRlUGlja2VyRGF5PigpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkYXlPZldlZWsgPSBtb21lbnQoc3RhcnRPZldlZWspOyBkYXlPZldlZWsuaXNCZWZvcmUoZW5kT2ZXZWVrKTsgZGF5T2ZXZWVrLmFkZCgxLCAnZGF5cycpKSB7XHJcbiAgICAgICAgICAgICAgICBkYXlzLnB1c2gobmV3IERhdGVQaWNrZXJEYXkoZnJvbURhdGUsIGRheU9mV2VlaykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldERheXNPZldlZWsoKTogc3RyaW5nW10ge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50LndlZWtkYXlzU2hvcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFJhbmdlRGF5cyhzdGFydDogSURhdGVQaWNrZXJEYXksIGVuZDogSURhdGVQaWNrZXJEYXksIHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pOiBJRGF0ZVBpY2tlckRheVtdIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbmQuaXNCZWZvcmUoc3RhcnQpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSBlbmQ7XHJcbiAgICAgICAgICAgICAgICBlbmQgPSB0ZW1wO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgYWxsRGF5cyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlckRheT4oKSxcclxuICAgICAgICAgICAgICAgIGlzQWRkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB3ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2Vlay5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRheS5pc1NhbWUoc3RhcnQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FkZGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0FkZGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxEYXlzLnB1c2goZGF5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXkuaXNTYW1lKGVuZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWRkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYWxsRGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlc2VsZWN0QWxsKHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pIHtcclxuICAgICAgICAgICAgd2Vla3MuZm9yRWFjaCh3ZWVrID0+IHtcclxuICAgICAgICAgICAgICAgIHdlZWsuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRheS5pc1NlbGVjdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0RGF5cyhkYXlzOiBJRGF0ZVBpY2tlckRheVtdKSB7XHJcbiAgICAgICAgICAgIGRheXMuZm9yRWFjaChkYXkgPT4gZGF5LmlzU2VsZWN0aW5nID0gdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnB1dFRvTW9tZW50KHZhbHVlOiBzdHJpbmcpOiBtb21lbnQuTW9tZW50IHtcclxuICAgICAgICAgICAgdmFyIGxhbmcgPSBtb21lbnQubG9jYWxlRGF0YSgpO1xyXG4gICAgICAgICAgICB2YXIgZm9ybWF0cyA9IFtcclxuICAgICAgICAgICAgICAgIGxhbmcubG9uZ0RhdGVGb3JtYXQoXCJsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gIC9nLCAnICcpLFxyXG4gICAgICAgICAgICAgICAgbGFuZy5sb25nRGF0ZUZvcm1hdChcIkxcIilcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvLS9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyAgL2csICcgJylcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gbW9tZW50KHZhbHVlLCBmb3JtYXRzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnB1dFRvUmFuZ2UodmFsdWU6IHN0cmluZyk6IElEYXRlUGlja2VyUmFuZ2Uge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAhdmFsdWUudHJpbSgpLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB2YXIgdHJpbW1lZCA9IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvLS9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcgJylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gIC9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAudHJpbSgpO1xyXG4gICAgICAgICAgICB2YXIgZXhwU3RhcnQgPSBuZXcgUmVnRXhwKFwiXigoWzAtOV17MSw0fVsgXSopezN9KVwiKTtcclxuICAgICAgICAgICAgdmFyIGV4cEVuZCA9IG5ldyBSZWdFeHAoXCIoKFswLTldezEsNH1bIF0qKXszfSkkXCIpO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRSZXN1bHQgPSBleHBTdGFydC5leGVjKHRyaW1tZWQpO1xyXG4gICAgICAgICAgICB2YXIgZW5kUmVzdWx0ID0gZXhwRW5kLmV4ZWModHJpbW1lZCk7XHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuaW5wdXRUb01vbWVudChzdGFydFJlc3VsdFswXS50cmltKCkpO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gdGhpcy5pbnB1dFRvTW9tZW50KChlbmRSZXN1bHRbMF0gfHwgc3RhcnRSZXN1bHRbMF0pLnRyaW0oKSk7XHJcbiAgICAgICAgICAgIHZhciByYW5nZSA9IG5ldyBEYXRlUGlja2VyUmFuZ2Uoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuc2VydmljZSgnZGF0ZVBpY2tlclNlcnZpY2UnLCBEYXRlUGlja2VyU2VydmljZSk7XHJcbn0iLCJcclxubW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFRpbWVQaWNrZXJDb250cm9sbGVyIHtcclxuICAgICAgICBwcml2YXRlICRwb3N0TGluaygpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUodGhpcy5fdGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfdGltZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgdGltZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCB0aW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc3QgaGFzQ2hhbmdlZCA9IHRoaXMuX3RpbWUgIT09IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoIWhhc0NoYW5nZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLl90aW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHsgdGltZTogdmFsdWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFZpZXdWYWx1ZSh0aW1lOiBzdHJpbmcpIHt9O1xyXG4gICAgICAgIG9uQ2hhbmdlOiAocGFyYW1zOiB7IHRpbWU6IHN0cmluZyB9KSA9PiB2b2lkO1xyXG4gICAgICAgIHByaXZhdGUgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuY29udHJvbGxlcigndGltZVBpY2tlcicsIFRpbWVQaWNrZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsndGltZVBpY2tlclNlcnZpY2UnLCAnaXNNb2JpbGUnLCAnJHBhcnNlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZVBpY2tlclNlcnZpY2U6IElUaW1lUGlja2VyU2VydmljZSwgcHJpdmF0ZSBpc01vYmlsZTogYm9vbGVhbiwgcHJpdmF0ZSAkcGFyc2U6IGFuZ3VsYXIuSVBhcnNlU2VydmljZSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsndGltZVBpY2tlcicsICduZ01vZGVsJ107XHJcbiAgICAgICAgY29udHJvbGxlciA9IFRpbWVQaWNrZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd0aW1lcGlja2VyJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGltZTogJz0nLFxyXG4gICAgICAgICAgICBvbkNoYW5nZTogJyYnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIFskY3RybCwgJG5nTW9kZWxDdHJsXTogW1RpbWVQaWNrZXJDb250cm9sbGVyLCBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcl0pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua01vYmlsZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsLCAkbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxpbmtEZXNrdG9wKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwsICRuZ01vZGVsQ3RybCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlua01vYmlsZSA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsOiBUaW1lUGlja2VyQ29udHJvbGxlciwgJG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5wcm9wKCd0eXBlJywgJ3RpbWUnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNldFZpZXdWYWx1ZSA9ICh0aW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdWYWx1ZSA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UuZm9ybWF0SXNvKHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRjdHJsLnNldFZpZXdWYWx1ZSA9IHNldFZpZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kdmlld0NoYW5nZUxpc3RlbmVycy5wdXNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRjdHJsLnRpbWUgPSB0aGlzLnRpbWVQaWNrZXJTZXJ2aWNlLmZvcm1hdElzbygkbmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmtEZXNrdG9wID0gKCRzY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzLCAkY3RybDogVGltZVBpY2tlckNvbnRyb2xsZXIsICRuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnRJZCA9ICguLi5uYW1lczogc3RyaW5nW10pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lcy5tYXAobmFtZSA9PiBgJHtuYW1lfS4keyRzY29wZS4kaWR9YCkuam9pbignICcpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwudGltZSA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UuZm9ybWF0SXNvKCRuZ01vZGVsQ3RybC4kbW9kZWxWYWx1ZSwgbnVsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNWYWxpZFRpbWUgPSAkY3RybC50aW1lICE9IG51bGxcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzUmVxdWlyZWQgPSAkYXR0cnNbJ3JlcXVpcmVkJ107XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gIWlzUmVxdWlyZWQgfHwgKGlzUmVxdWlyZWQgJiYgaXNWYWxpZFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWYWxpZGl0eSgnaW52YWxpZFRpbWUnLCBpc1ZhbGlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVPbkVudGVyID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IEVOVEVSX0tFWSA9IDEzO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RG93biA9IGUgPT4gZS53aGljaDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5RG93bihlKSAhPT0gRU5URVJfS0VZKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB1cGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2V0Vmlld1ZhbHVlID0gKHRpbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgdmlld1ZhbHVlID0gdGhpcy50aW1lUGlja2VyU2VydmljZS5mb3JtYXQodGltZSk7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh2aWV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGN0cmwuc2V0Vmlld1ZhbHVlID0gc2V0Vmlld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIC5vbihldmVudElkKCdibHVyJyksIHVwZGF0ZSlcclxuICAgICAgICAgICAgICAgIC5vbihldmVudElkKCdrZXlkb3duJyksIHVwZGF0ZU9uRW50ZXIpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoZXZlbnRJZCgnYmx1cicsICdrZXlkb3duJykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5kaXJlY3RpdmUoJ3RpbWVQaWNrZXInLCBUaW1lUGlja2VyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUaW1lUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgcGFyc2UodGV4dDogc3RyaW5nKTogYW55O1xyXG4gICAgICAgIGZvcm1hdCh0ZXh0OiBzdHJpbmcsIHZhbHVlPzogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgICAgIGZvcm1hdElzbyh0ZXh0OiBzdHJpbmcsIHZhbHVlPzogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRpbWVQaWNrZXJTZXJ2aWNlIGltcGxlbWVudHMgSVRpbWVQaWNrZXJTZXJ2aWNlIHtcclxuICAgICAgICBwYXJzZSh0ZXh0OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgcGF0dGVybnMgPSBbXHJcbiAgICAgICAgICAgICAgICAnTFQnLFxyXG4gICAgICAgICAgICAgICAgJ0xUUycsXHJcbiAgICAgICAgICAgICAgICAnSEg6bW06c3MnLFxyXG4gICAgICAgICAgICAgICAgJ0hIOm1tIEEnXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQodGV4dCwgcGF0dGVybnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybWF0KHRleHQ6IHN0cmluZywgdmFsdWU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIG0gPSB0aGlzLnBhcnNlKHRleHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbS5pc1ZhbGlkKCkgPyBtLmZvcm1hdCgnTFQnKSA6IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybWF0SXNvKHRleHQ6IHN0cmluZywgdmFsdWU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIG0gPSB0aGlzLnBhcnNlKHRleHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbS5pc1ZhbGlkKCkgPyBtLmZvcm1hdChcIkhIOm1tOnNzXCIpIDogdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLnNlcnZpY2UoJ3RpbWVQaWNrZXJTZXJ2aWNlJywgVGltZVBpY2tlclNlcnZpY2UpO1xyXG59Il19