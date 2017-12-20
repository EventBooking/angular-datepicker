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
        MobileConfig.isIOS = function () {
            var agent = navigator.userAgent || navigator.vendor || window["opera"];
            var test1 = /iPhone|iPod|iPad/i.test(agent);
            return test1;
        };
        return MobileConfig;
    }());
    Angular.module("ngDatePicker")
        .constant('isMobile', MobileConfig.isMobile())
        .constant('isIOS', MobileConfig.isIOS());
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
        function DatePickerController($element, $attrs, datePickerService, isMobile) {
            this.$element = $element;
            this.$attrs = $attrs;
            this.datePickerService = datePickerService;
            this.isMobile = isMobile;
            this.isoFormat = 'YYYY-MM-DD';
            DatePickerMouseRange.bootstrap(datePickerService);
            this.isSingleDate = this.isMobile || ($attrs['start'] == null && $attrs['end'] == null);
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
            this.setDateInternal(dateInternal);
            this.calculate(this._dateInternal);
        };
        DatePickerController.prototype.$postLink = function () {
            if (this.isSingleDate) {
                this.setViewDate(this.date || this.defaultDate);
            }
            else {
                var start = this.start || this.defaultDate;
                this.setViewRange(start, this.end || start);
            }
            this.initialized = true;
        };
        Object.defineProperty(DatePickerController.prototype, "date", {
            get: function () {
                return this._date;
            },
            set: function (value) {
                this.setDate(value, false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerController.prototype, "start", {
            get: function () {
                return this._start;
            },
            set: function (value) {
                this.setRange(value, this._end, false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerController.prototype, "end", {
            get: function () {
                return this._end;
            },
            set: function (value) {
                this.setRange(this._start, value, false);
            },
            enumerable: true,
            configurable: true
        });
        DatePickerController.prototype.setDate = function (date, notify) {
            if (notify === void 0) { notify = true; }
            var hasChanged = this._date !== date;
            if (!hasChanged)
                return;
            var start = date;
            var end = date;
            this._date = date;
            this._start = start;
            this._end = end;
            this.setDateInternal(date);
            this.setViewDate(date);
            if (!notify)
                return;
            this.notifyChanges(date, start, end);
        };
        DatePickerController.prototype.setRange = function (start, end, notify) {
            if (notify === void 0) { notify = true; }
            var hasChanged = this._start !== start || this._end !== end;
            if (!hasChanged)
                return;
            var date = start;
            this._date = date;
            this._start = start;
            this._end = end;
            this.setDateInternal(date);
            this.setViewRange(start, end);
            if (!notify)
                return;
            this.notifyChanges(date, start, end);
        };
        DatePickerController.prototype.notifyChanges = function (date, start, end) {
            if (!this.initialized)
                return;
            if (this.onDateSelect)
                this.onDateSelect({ date: date });
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
            this.isVisible = false;
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
        DatePickerController.$inject = ['$element', '$attrs', 'datePickerService', 'isMobile'];
        return DatePickerController;
    }());
    Angular.module("ngDatePicker").controller('datePicker', DatePickerController);
    var DatePickerDirective = (function () {
        function DatePickerDirective($injector, $compile, $templateCache, $timeout, $window, datePickerService, isMobile, isIOS) {
            var _this = this;
            this.$injector = $injector;
            this.$compile = $compile;
            this.$templateCache = $templateCache;
            this.$timeout = $timeout;
            this.$window = $window;
            this.datePickerService = datePickerService;
            this.isMobile = isMobile;
            this.isIOS = isIOS;
            this.restrict = 'AE';
            this.require = ['datePicker', '?ngModel'];
            this.controller = DatePickerController;
            this.controllerAs = 'datepicker';
            this.bindToController = true;
            this.scope = {
                // Single Date
                date: '=?',
                onDateSelect: '&',
                // Range
                start: '=?',
                end: '=?',
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
                    _this.linkElement($scope, $element, $attrs, $ngModel, $ctrl);
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
            };
        }
        DatePickerDirective.prototype.setupSelections = function ($scope, $element, $ctrl) {
            if ($ctrl.isSingleDate) {
                this.setupDaySelect($scope, $element, $ctrl);
            }
            else {
                this.setupRangeSelect($scope, $element, $ctrl);
            }
        };
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
            var setDateFromView = function () {
                var viewValue = moment($ngModel.$viewValue);
                var date = viewValue.isValid() ? dateFormat($ngModel.$viewValue) : null;
                $ctrl.setDate(date);
            };
            // if (this.isIOS) {
            //     $element.on(`blur.${$scope.$id}`, setDateFromView);
            // } else {
            $ngModel.$viewChangeListeners.push(setDateFromView);
            //}
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
                    var content = "<input date-picker " + _this.attrs.join(' ') + ">";
                    return content;
                };
            }
            $ctrl['__date'] = $ctrl.date;
            $ctrl['__start'] = $ctrl.date;
            $ctrl['__end'] = $ctrl.date;
            var builder = new TypeBuilder()
                .addAttr("type", "text")
                .addLiteral("min-view", "minView")
                .addBinding("ng-model", true, "dateString")
                .addBinding("date", "date", "__date")
                .addBinding("start", "start", "__start")
                .addBinding("end", "end", "__end")
                .addBinding("is-selecting", "isSelecting", "isSelecting")
                .addLiteral("default-date", "defaultDate")
                .addBinding("highlighted", "highlighted", "highlighted");
            var content = builder.build();
            var $input = angular.element(content)
                .addClass('datepicker-linkNativeElement-input');
            if (this.isIOS) {
                $input.on("blur." + $scope.$id, function () {
                    $ctrl.setDate($ctrl['__date']);
                    $scope.$apply();
                });
            }
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
            var content = this.createContent($scope, $element, $ctrl);
            $element.append(content);
        };
        DatePickerDirective.prototype.setTabIndex = function ($element) {
            var currentElement = $element.get(0);
            var currentTabIndex = currentElement.getAttribute("tabIndex");
            currentElement.setAttribute("tabIndex", currentTabIndex != null ? currentTabIndex : "-1");
        };
        DatePickerDirective.prototype.evt = function (names, $scope) {
            return names.split(' ').map(function (name) { return (name + ".datepicker" + $scope.$id); }).join(' ');
        };
        DatePickerDirective.prototype.popover = function ($scope, $element, $attrs, $ctrl) {
            var _this = this;
            var content, tether, $body = angular.element('body');
            var evt = function (names) { return _this.evt(names, $scope); };
            var events = {
                mousedown: evt('mousedown touchstart'),
                focus: evt('focus'),
                click: evt('click'),
                blur: evt('blur'),
                mouseup: evt('mouseup touchend')
            };
            var state = angular.extend($scope.$new(), {
                isMouseDown: false,
                hasFocus: false,
                contentHasFocus: false,
                view: $ctrl.view,
                isOpen: false,
                setDate: function (date) {
                    console.info('setDate', date);
                    $ctrl.setDate(date);
                    close();
                },
                setRange: function (start, end) {
                    console.info('setRange', start, end);
                    $ctrl.setRange(start, end);
                    close();
                }
            });
            Object.defineProperty(state, 'isSelecting', {
                get: function () {
                    return $ctrl.isSelected;
                },
                set: function (value) {
                    console.info('isSelecting', value);
                    $ctrl.isSelecting = true;
                }
            });
            var listenOpen = function () {
                $element
                    .on(events.mousedown, onMouseDown)
                    .on(events.focus, onFocus);
                $element.off(events.blur, onBlur);
                $body.off(events.mouseup, onBodyUp);
            };
            var listenClose = function () {
                $element
                    .off(events.mousedown, onMouseDown)
                    .off(events.focus, onFocus);
                $element.one(events.blur, onBlur);
                $body.one(events.mouseup, onBodyUp);
            };
            var open = function (e) {
                if (state.isOpen)
                    return;
                state.view = $ctrl.view;
                state.isOpen = true;
                state.contentHasFocus = false;
                $ctrl.isVisible = true;
                $ctrl.isSelecting = false;
                if (!content) {
                    createContent();
                    content.on(events.mouseup, onContentMouseUp);
                    content.on(events.mouseup, 'date-picker', onContentBodyMouseUp);
                }
                $scope.$apply();
                if (tether) {
                    tether.position();
                }
                listenClose();
            };
            var blurTimer;
            var close = function () {
                if (!state.isOpen)
                    return;
                state.isOpen = false;
                $ctrl.isVisible = false;
                listenOpen();
            };
            var createContent = function () {
                content = _this.createDropDown($scope, $element, $attrs, $ctrl, state);
                $body.append(content);
                $scope.$apply();
                if (_this.isMobile)
                    return;
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
            };
            var onContentMouseUp = function (e) {
                if ($ctrl.isSelecting)
                    return;
                console.info('onContentMouseUp', $ctrl.isSelecting);
                close();
                _this.preventDefault(e);
                $scope.$apply();
            };
            var onContentBodyMouseUp = function (e) {
                if ($ctrl.isSelecting)
                    return;
                console.info('onContentBodyMouseUp', $ctrl.isSelecting);
                state.contentHasFocus = true;
                close();
                _this.preventDefault(e);
                $scope.$apply();
            };
            var onMouseDown = function (e) {
                if (state.hasFocus)
                    return;
                console.info('onMouseDown');
                state.isMouseDown = true;
                $element.one(events.mouseup, onMouseUp);
            };
            var onMouseUp = function (e) {
                console.info('onMouseUp');
                state.isMouseDown = false;
                _this.preventDefault(e);
                return open(e);
            };
            var onFocus = function (e) {
                if (state.isMouseDown)
                    return;
                state.hasFocus = true;
                _this.preventDefault(e);
                return open(e);
            };
            var onBlur = function (e) {
                if (state.contentHasFocus)
                    return;
                state.hasFocus = false;
                close();
                $scope.$apply();
            };
            var onBodyUp = function (e) {
                if (state.isMouseDown || state.hasFocus || state.contentHasFocus || $ctrl.isSelecting) {
                    return;
                }
                console.info('onBodyUp');
                $element.focus();
                close();
                $scope.$apply();
            };
            listenOpen();
            $scope.$on('$destroy', function () {
                $body.off(events.click);
                if (content)
                    content.remove();
            });
        };
        DatePickerDirective.prototype.createDropDown = function (scope, $element, $attrs, $ctrl, localScope) {
            scope['dropdown'] = localScope;
            var datepicker = this.controllerAs;
            var singleDateBinding = "date=\"dropdown.date\" on-date-select=\"dropdown.setDate(date)\"", rangeBinding = "start=\"dropdown.start\" end=\"dropdown.end\" on-range-select=\"dropdown.setRange(start,end)\"", bindings = $ctrl.isSingleDate ? singleDateBinding : rangeBinding, template = "<div ng-class=\"{'datepicker-open':dropdown.isOpen}\"><date-picker min-view=\"" + $attrs['minView'] + "\" is-selecting=\"dropdown.isSelecting\" " + bindings + "\" highlighted=\"datepicker.highlighted\" default-date=\"{{datepicker.defaultDate}}\"></date-picker></div>";
            var content = angular.element(template);
            content.addClass("datepicker-dropdown");
            if (this.isMobile) {
                content.addClass("datepicker-dropdown--isMobile");
            }
            else {
                var position = $element.position(), height = $element.outerHeight(), margin = ($element.outerHeight(true) - height), offset = margin / 2 + height;
                content.css({
                    top: position.top + offset,
                    left: position.left
                });
            }
            this.$compile(content)(scope);
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
        DatePickerDirective.prototype.createContent = function ($scope, $element, $ctrl) {
            var template = this.$templateCache.get(this.calendarTemplate);
            var content = angular.element(template);
            this.$compile(content)($scope);
            this.setupSelections($scope, $element, $ctrl);
            return content;
        };
        DatePickerDirective.prototype.setupDaySelect = function ($scope, $element, $ctrl) {
            var _this = this;
            var dayCss = '.datePickerDays-day', $body = angular.element('body'), mouseDown = this.evt('mousedown touchstart', $scope), mouseUp = this.evt('mouseup touchend', $scope);
            var onSelected = function (range) {
                var days = range.getDays();
                $ctrl.selected(days);
                $scope.$apply();
            };
            $element.on(mouseDown, dayCss, function (e) {
                console.log('day mousedown');
                var range = new DatePickerMouseRange($ctrl, e);
                $ctrl.isSelecting = true;
                _this.preventDefault(e);
                $scope.$apply();
                $body.one(mouseUp, function () {
                    console.log('day body mouseup');
                    $ctrl.isSelecting = false;
                    onSelected(range);
                });
            });
        };
        DatePickerDirective.prototype.setupRangeSelect = function ($scope, $element, $ctrl) {
            var _this = this;
            var $body = angular.element('body'), mouseDown = this.evt('mousedown touchstart', $scope), mouseOver = this.evt('mouseover touchend', $scope), mouseUp = this.evt('mouseup', $scope), dayCss = '.datePickerDays-day';
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
                console.log('range mousedown');
                _this.preventDefault(e);
                var range = new DatePickerMouseRange($ctrl, e);
                $ctrl.isSelecting = true;
                $scope.$apply();
                $element.on(mouseOver, dayCss, function (e) {
                    console.log('range mouseover');
                    _this.preventDefault(e);
                    range.setEnd(e);
                    onSelecting(range);
                });
                $body.one(mouseUp, function () {
                    _this.preventDefault(e);
                    console.log('range body mouseup');
                    $element.off(mouseOver);
                    $ctrl.isSelecting = false;
                    onSelected(range);
                });
            });
        };
        DatePickerDirective.$inject = ['$injector', '$compile', '$templateCache', '$timeout', '$window', 'datePickerService', 'isMobile', 'isIOS'];
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
            var year = date.year();
            if (year < 10) {
                var currentYear = moment().year();
                var addYears = currentYear - (currentYear % 10);
                var newYear = year + addYears;
                date.set('year', newYear);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kYXRlcGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyIsIi4uL3NyYy9tb2JpbGUudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXIudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXItc2VydmljZS50cyIsIi4uL3NyYy90aW1lLXBpY2tlci50cyIsIi4uL3NyYy90aW1lLXBpY2tlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FDQW5DLElBQU8sZ0JBQWdCLENBc0J0QjtBQXRCRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFDckI7UUFBQTtRQWdCQSxDQUFDO1FBZlUscUJBQVEsR0FBZjtZQUNJLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkUsSUFBSSxLQUFLLEdBQUcsMFRBQTBULENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5WLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksS0FBSyxHQUFHLHlrREFBeWtELENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXhtRCxNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUMxQixDQUFDO1FBRU0sa0JBQUssR0FBWjtZQUNJLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkUsSUFBSSxLQUFLLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNM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QWxCLHFCQUFrQixHQUFsQixVQUFrQjtZQUNuQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDaEQsQ0FBQztRQUVELHFDQUFTLEdBQVQsVUFBVSxJQUFZLEVBQUUsS0FBa0I7WUFBbEIscUJBQWtCLEdBQWxCLFVBQWtCO1lBQ3RDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN0RCxDQUFDO1FBQ0wsd0JBQUM7SUFBRCxDQUFDLEFBcEJELElBb0JDO0lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUNuRixDQUFDLEVBL0JNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUErQnRCIiwic291cmNlc0NvbnRlbnQiOlsiQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIiwgW10pOyIsIm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuICAgIGNsYXNzIE1vYmlsZUNvbmZpZyB7XHJcbiAgICAgICAgc3RhdGljIGlzTW9iaWxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgYWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93W1wib3BlcmFcIl07XHJcbiAgICAgICAgICAgIHZhciB0ZXN0MSA9IC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm8vaS50ZXN0KGFnZW50KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhZ2VudFByZWZpeCA9IGFnZW50LnN1YnN0cigwLCA0KTtcclxuICAgICAgICAgICAgdmFyIHRlc3QyID0gLzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhZ2VudFByZWZpeCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGVzdDEgfHwgdGVzdDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgaXNJT1MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBhZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3dbXCJvcGVyYVwiXTtcclxuICAgICAgICAgICAgdmFyIHRlc3QxID0gL2lQaG9uZXxpUG9kfGlQYWQvaS50ZXN0KGFnZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlc3QxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKVxyXG4gICAgICAgIC5jb25zdGFudCgnaXNNb2JpbGUnLCBNb2JpbGVDb25maWcuaXNNb2JpbGUoKSlcclxuICAgICAgICAuY29uc3RhbnQoJ2lzSU9TJywgTW9iaWxlQ29uZmlnLmlzSU9TKCkpO1xyXG59IiwiXHJcbm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuICAgIGRlY2xhcmUgdmFyIFRldGhlcjogYW55O1xyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJNb3VzZVJhbmdlIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkYXRlUGlja2VyU2VydmljZTogSURhdGVQaWNrZXJTZXJ2aWNlO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciwgZTogSlF1ZXJ5RXZlbnRPYmplY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGFydChlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRFbmQoZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgYm9vdHN0cmFwKGRhdGVQaWNrZXJTZXJ2aWNlOiBJRGF0ZVBpY2tlclNlcnZpY2UpIHtcclxuICAgICAgICAgICAgRGF0ZVBpY2tlck1vdXNlUmFuZ2UuZGF0ZVBpY2tlclNlcnZpY2UgPSBkYXRlUGlja2VyU2VydmljZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXJ0KGU6IEpRdWVyeUV2ZW50T2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLmdldEVsZW1lbnQoZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRFbmQoZTogSlF1ZXJ5RXZlbnRPYmplY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmQgPSB0aGlzLmdldEVsZW1lbnQoZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXREYXlzKCk6IElEYXRlUGlja2VyRGF5W10ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXlzID0gRGF0ZVBpY2tlck1vdXNlUmFuZ2UuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0UmFuZ2VEYXlzKHRoaXMuc3RhcnQsIHRoaXMuZW5kLCB0aGlzLiRjdHJsLndlZWtzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldEVsZW1lbnQoZTogSlF1ZXJ5RXZlbnRPYmplY3QpOiBJRGF0ZVBpY2tlckRheSB7XHJcbiAgICAgICAgICAgIGlmICghZS50YXJnZXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0ICRlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgY29uc3QgJHNjb3BlID0gJGVsZW1lbnQuc2NvcGUoKTtcclxuICAgICAgICAgICAgY29uc3QgZGF5ID0gJHNjb3BlWydkYXknXTtcclxuICAgICAgICAgICAgcmV0dXJuIGRheTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0OiBJRGF0ZVBpY2tlckRheTtcclxuICAgICAgICBlbmQ6IElEYXRlUGlja2VyRGF5O1xyXG4gICAgfVxyXG5cclxuICAgIGVudW0gRGF0ZVBpY2tlclZpZXcge1xyXG4gICAgICAgIERheXMgPSAwLFxyXG4gICAgICAgIE1vbnRocyA9IDEsXHJcbiAgICAgICAgWWVhcnMgPSAyXHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlckNvbnRyb2xsZXIge1xyXG5cclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGVsZW1lbnQnLCAnJGF0dHJzJywgJ2RhdGVQaWNrZXJTZXJ2aWNlJywgJ2lzTW9iaWxlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgcHJpdmF0ZSAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsIHByaXZhdGUgZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZSwgcHJpdmF0ZSBpc01vYmlsZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICBEYXRlUGlja2VyTW91c2VSYW5nZS5ib290c3RyYXAoZGF0ZVBpY2tlclNlcnZpY2UpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pc1NpbmdsZURhdGUgPSB0aGlzLmlzTW9iaWxlIHx8ICgkYXR0cnNbJ3N0YXJ0J10gPT0gbnVsbCAmJiAkYXR0cnNbJ2VuZCddID09IG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLm1vbnRoTmFtZXMgPSBkYXRlUGlja2VyU2VydmljZS5nZXRNb250aHMoKTtcclxuICAgICAgICAgICAgdGhpcy5kYXlzT2ZXZWVrID0gZGF0ZVBpY2tlclNlcnZpY2UuZ2V0RGF5c09mV2VlaygpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoICgkYXR0cnNbJ21pblZpZXcnXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3LlllYXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3LlllYXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5Nb250aHM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WaWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3LkRheXM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRvbkluaXQoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlZmF1bHREYXRlID09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHREYXRlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVJbnRlcm5hbCA9ICh0aGlzLmlzU2luZ2xlRGF0ZSA/IHRoaXMuZGF0ZSA6IHRoaXMuc3RhcnQpIHx8IHRoaXMuZGVmYXVsdERhdGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGVJbnRlcm5hbChkYXRlSW50ZXJuYWwpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSh0aGlzLl9kYXRlSW50ZXJuYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHBvc3RMaW5rKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Vmlld0RhdGUodGhpcy5kYXRlIHx8IHRoaXMuZGVmYXVsdERhdGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLnN0YXJ0IHx8IHRoaXMuZGVmYXVsdERhdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZpZXdSYW5nZShzdGFydCwgdGhpcy5lbmQgfHwgc3RhcnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2luZ2xlIERhdGVcclxuICAgICAgICBfZGF0ZTogc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICBwdWJsaWMgZ2V0IGRhdGUoKTogc3RyaW5nIHwgRGF0ZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IGRhdGUodmFsdWU6IHN0cmluZyB8IERhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRlKHZhbHVlLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSYW5nZVxyXG4gICAgICAgIF9zdGFydDogc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICBwdWJsaWMgZ2V0IHN0YXJ0KCk6IHN0cmluZyB8IERhdGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgc3RhcnQodmFsdWU6IHN0cmluZyB8IERhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRSYW5nZSh2YWx1ZSwgdGhpcy5fZW5kLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfZW5kOiBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgIHB1YmxpYyBnZXQgZW5kKCk6IHN0cmluZyB8IERhdGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IGVuZCh2YWx1ZTogc3RyaW5nIHwgRGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFJhbmdlKHRoaXMuX3N0YXJ0LCB2YWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBub3RpZnk6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc0NoYW5nZWQgPSB0aGlzLl9kYXRlICE9PSBkYXRlO1xyXG4gICAgICAgICAgICBpZiAoIWhhc0NoYW5nZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGRhdGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IGRhdGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9kYXRlID0gZGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnQgPSBzdGFydDtcclxuICAgICAgICAgICAgdGhpcy5fZW5kID0gZW5kO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRlSW50ZXJuYWwoZGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld0RhdGUoZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW5vdGlmeSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlcyhkYXRlLCBzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFJhbmdlKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIG5vdGlmeTogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICAgICAgY29uc3QgaGFzQ2hhbmdlZCA9IHRoaXMuX3N0YXJ0ICE9PSBzdGFydCB8fCB0aGlzLl9lbmQgIT09IGVuZDtcclxuICAgICAgICAgICAgaWYgKCFoYXNDaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHN0YXJ0O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gc3RhcnQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZCA9IGVuZDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZUludGVybmFsKGRhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXdSYW5nZShzdGFydCwgZW5kKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbm90aWZ5KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VzKGRhdGUsIHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBub3RpZnlDaGFuZ2VzKGRhdGU6IHN0cmluZyB8IERhdGUsIHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub25EYXRlU2VsZWN0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkRhdGVTZWxlY3QoeyBkYXRlOiBkYXRlIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub25SYW5nZVNlbGVjdClcclxuICAgICAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9kYXRlSW50ZXJuYWw6IG1vbWVudC5Nb21lbnQ7XHJcblxyXG4gICAgICAgIGdldCBkYXRlSW50ZXJuYWwoKTogbW9tZW50Lk1vbWVudCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldERhdGVJbnRlcm5hbCh2YWx1ZTogc3RyaW5nIHwgRGF0ZSB8IG1vbWVudC5Nb21lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0ZUludGVybmFsID0gKHZhbHVlICE9IG51bGwpID8gbW9tZW50KHZhbHVlKSA6IG1vbWVudCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSh0aGlzLl9kYXRlSW50ZXJuYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjYWxjdWxhdGUoZnJvbURhdGU6IG1vbWVudC5Nb21lbnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBmcm9tRGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ21vbnRoJykuc3RhcnRPZignd2VlaycpLFxyXG4gICAgICAgICAgICAgICAgZW5kID0gZnJvbURhdGUuY2xvbmUoKS5lbmRPZignbW9udGgnKS5lbmRPZignd2VlaycpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53ZWVrcyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlckRheVtdPigpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBkYXkgPSBzdGFydDsgZGF5LmlzQmVmb3JlKGVuZCk7IGRheSA9IGRheS5jbG9uZSgpLmFkZCgxLCAnd2VlaycpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3ZWVrID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5nZXRXZWVrKGZyb21EYXRlLCBkYXkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrcy5wdXNoKHdlZWspO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnllYXJzID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5nZXRZZWFycyhmcm9tRGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRWaWV3RGF0ZShkYXRlKSB7XHJcbiAgICAgICAgICAgIC8vIG92ZXJyaWRlIGluIGxpbmsgZnVuY3Rpb25zXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2V0Vmlld1JhbmdlKHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICAgICAgLy8gb3ZlcnJpZGUgaW4gbGluayBmdW5jdGlvbnNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBnZXQgdGl0bGUoKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5EYXlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWwuZm9ybWF0KCdNTU1NIFlZWVknKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuTW9udGhzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LlllYXJzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnc2VsZWN0IGEgeWVhcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB2aWV3VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5Nb250aHM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwibW9udGhzXCI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LlllYXJzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInllYXJzXCI7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5EYXlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImRheXNcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd0RheXMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPiBEYXRlUGlja2VyVmlldy5EYXlzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd01vbnRocygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA+IERhdGVQaWNrZXJWaWV3Lk1vbnRocylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd1llYXJzKCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5ZZWFycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzU2VsZWN0ZWQoZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMuX2RhdGUpLmlzU2FtZShkYXkudmFsdWUsICdkYXknKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXkudmFsdWUuaXNCZXR3ZWVuKHRoaXMuX3N0YXJ0LCB0aGlzLl9lbmQsICdkYXknKSB8fFxyXG4gICAgICAgICAgICAgICAgZGF5LnZhbHVlLmlzU2FtZSh0aGlzLl9zdGFydCwgJ2RheScpIHx8XHJcbiAgICAgICAgICAgICAgICBkYXkudmFsdWUuaXNTYW1lKHRoaXMuX2VuZCwgJ2RheScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNIaWdobGlnaHRlZChkYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGlnaGxpZ2h0ZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oaWdobGlnaHRlZFtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChtb21lbnQodmFsdWUpLmlzU2FtZShkYXkudmFsdWUsICdkYXknKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RpbmcoZGF5czogSURhdGVQaWNrZXJEYXlbXSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmRlc2VsZWN0QWxsKHRoaXMud2Vla3MpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnNlbGVjdERheXMoZGF5cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZChkYXlzOiBJRGF0ZVBpY2tlckRheVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZGVzZWxlY3RBbGwodGhpcy53ZWVrcyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGRheXNbMF07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUoc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbmQgPSBkYXlzW2RheXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkRGF0ZShkYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBtb21lbnQoZGF5LnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGUoZGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZFJhbmdlKHN0YXJ0RGF5OiBJRGF0ZVBpY2tlckRheSwgZW5kRGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IG1vbWVudChzdGFydERheS52YWx1ZSkuZm9ybWF0KHRoaXMuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgY29uc3QgZW5kID0gbW9tZW50KGVuZERheS52YWx1ZSkuZm9ybWF0KHRoaXMuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdE1vbnRoKGlkeCkge1xyXG4gICAgICAgICAgICBjb25zdCBtb250aCA9IHRoaXMubW9udGhOYW1lc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vbnRoKG1vbnRoLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA9PT0gRGF0ZVBpY2tlclZpZXcuTW9udGhzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRlKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuZGF0ZUludGVybmFsLmNsb25lKCkuZW5kT2YoJ21vbnRoJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5kID0gdGhpcy5kYXRlSW50ZXJuYWwuY2xvbmUoKS5lbmRPZignbW9udGgnKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93RGF5cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0WWVhcihpZHgpIHtcclxuICAgICAgICAgICAgY29uc3QgeWVhciA9IHRoaXMueWVhcnNbaWR4XTtcclxuICAgICAgICAgICAgdGhpcy5zZXRZZWFyKHllYXIudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID09PSBEYXRlUGlja2VyVmlldy5ZZWFycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuZGF0ZUludGVybmFsLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0ZShkYXRlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmRhdGVJbnRlcm5hbC5jbG9uZSgpLnN0YXJ0T2YoJ3llYXInKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSB0aGlzLmRhdGVJbnRlcm5hbC5jbG9uZSgpLmVuZE9mKCd5ZWFyJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vbnRocygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEYXRlKGFjdGlvbjogKGRhdGU6IG1vbWVudC5Nb21lbnQpID0+IG1vbWVudC5Nb21lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRlSW50ZXJuYWwoYWN0aW9uKHRoaXMuZGF0ZUludGVybmFsLmNsb25lKCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzTW9udGgobW9udGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUludGVybmFsLm1vbnRoKCkgPT0gbW9udGgudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRNb250aChtb250aCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLnNldCgnbW9udGgnLCBtb250aCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNZZWFyKHllYXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUludGVybmFsLnllYXIoKSA9PSB5ZWFyLnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0WWVhcih5ZWFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0ZShkYXRlID0+IGRhdGUuc2V0KCd5ZWFyJywgeWVhcikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldk1vbnRoKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLnN1YnRyYWN0KDEsICdtb250aHMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0TW9udGgoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0ZShkYXRlID0+IGRhdGUuYWRkKDEsICdtb250aHMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2WWVhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlKGRhdGUgPT4gZGF0ZS5zdWJ0cmFjdCgxLCAneWVhcnMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0WWVhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlKGRhdGUgPT4gZGF0ZS5hZGQoMSwgJ3llYXJzJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldlJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLnN1YnRyYWN0KDksICd5ZWFycycpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5leHRSYW5nZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlKGRhdGUgPT4gZGF0ZS5hZGQoOSwgJ3llYXJzJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25EYXRlU2VsZWN0O1xyXG4gICAgICAgIG9uUmFuZ2VTZWxlY3Q7XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgdmlldzogRGF0ZVBpY2tlclZpZXc7XHJcbiAgICAgICAgbWluVmlldzogRGF0ZVBpY2tlclZpZXc7XHJcbiAgICAgICAgd2Vla3M6IElEYXRlUGlja2VyRGF5W11bXTtcclxuICAgICAgICB5ZWFyczogSURhdGVQaWNrZXJZZWFyW107XHJcbiAgICAgICAgbW9udGhOYW1lczogSURhdGVQaWNrZXJNb250aFtdO1xyXG4gICAgICAgIGRheXNPZldlZWs6IHN0cmluZ1tdO1xyXG4gICAgICAgIGlzVmlzaWJsZTogYm9vbGVhbjtcclxuICAgICAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcclxuICAgICAgICBpc29Gb3JtYXQgPSAnWVlZWS1NTS1ERCc7XHJcbiAgICAgICAgaXNTaW5nbGVEYXRlOiBib29sZWFuO1xyXG4gICAgICAgIGhpZ2hsaWdodGVkOiBzdHJpbmdbXTtcclxuICAgICAgICBkZWZhdWx0RGF0ZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBjbGllbnREYXRlOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuY29udHJvbGxlcignZGF0ZVBpY2tlcicsIERhdGVQaWNrZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGluamVjdG9yJywgJyRjb21waWxlJywgJyR0ZW1wbGF0ZUNhY2hlJywgJyR0aW1lb3V0JywgJyR3aW5kb3cnLCAnZGF0ZVBpY2tlclNlcnZpY2UnLCAnaXNNb2JpbGUnLCAnaXNJT1MnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaW5qZWN0b3IsIHByaXZhdGUgJGNvbXBpbGUsIHByaXZhdGUgJHRlbXBsYXRlQ2FjaGUsIHByaXZhdGUgJHRpbWVvdXQsIHByaXZhdGUgJHdpbmRvdywgcHJpdmF0ZSBkYXRlUGlja2VyU2VydmljZTogSURhdGVQaWNrZXJTZXJ2aWNlLCBwcml2YXRlIGlzTW9iaWxlOiBib29sZWFuLCBwcml2YXRlIGlzSU9TOiBib29sZWFuKSB7IH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQUUnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ2RhdGVQaWNrZXInLCAnP25nTW9kZWwnXTtcclxuICAgICAgICBjb250cm9sbGVyID0gRGF0ZVBpY2tlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ2RhdGVwaWNrZXInO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICAvLyBTaW5nbGUgRGF0ZVxyXG4gICAgICAgICAgICBkYXRlOiAnPT8nLFxyXG4gICAgICAgICAgICBvbkRhdGVTZWxlY3Q6ICcmJyxcclxuXHJcbiAgICAgICAgICAgIC8vIFJhbmdlXHJcbiAgICAgICAgICAgIHN0YXJ0OiAnPT8nLFxyXG4gICAgICAgICAgICBlbmQ6ICc9PycsXHJcbiAgICAgICAgICAgIG9uUmFuZ2VTZWxlY3Q6ICcmJyxcclxuXHJcbiAgICAgICAgICAgIC8vIE90aGVyXHJcbiAgICAgICAgICAgIGlzU2VsZWN0aW5nOiAnPT8nLFxyXG4gICAgICAgICAgICBkZWZhdWx0RGF0ZTogJ0A/JyxcclxuICAgICAgICAgICAgb25DaGFuZ2U6ICcmJyxcclxuXHJcbiAgICAgICAgICAgIC8vIENvbGxlY3Rpb24gb2YgZGF0ZSBzdHJpbmdzIChpZS4gWycyMDEyLTEyLTAxJywnMjAxMi0xMi0wMiddXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodGVkOiAnPT8nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FsZW5kYXJUZW1wbGF0ZSA9ICdkYXRlLXBpY2tlci5odG1sJztcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsIFskY3RybCwgJG5nTW9kZWxdOiBbRGF0ZVBpY2tlckNvbnRyb2xsZXIsIGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyXSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5VGV0aGVyRml4KCRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtNb2JpbGUoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rRGVza3RvcCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rTW9iaWxlID0gKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgJG5nTW9kZWw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyLCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnB1dCgkZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua05hdGl2ZUlucHV0KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRWxlbWVudCgkZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua0lubGluZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2UgaWYgKHRoaXMuaXNJT1MpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmxpbmtOYXRpdmVFbGVtZW50KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua0VsZW1lbnQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rRGVza3RvcCA9ICgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsICRuZ01vZGVsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSW5wdXQoJGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtJbnB1dCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzRWxlbWVudCgkZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua0lubGluZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtFbGVtZW50KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0dXBTZWxlY3Rpb25zKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBpZiAoJGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwRGF5U2VsZWN0KCRzY29wZSwgJGVsZW1lbnQsICRjdHJsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBSYW5nZVNlbGVjdCgkc2NvcGUsICRlbGVtZW50LCAkY3RybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzSW5wdXQoJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuaXMoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0VsZW1lbnQoJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuaXMoJ2RhdGUtcGlja2VyJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaXhlcyBhIGJ1ZyB3aGVyZSBUZXRoZXIgY2Fubm90IGNvcnJlY3RseSBnZXQgd2lkdGgvaGVpZ2h0IGJlY2F1c2Ugb2YgbmdBbmltYXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXBwbHlUZXRoZXJGaXgoJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSkge1xyXG4gICAgICAgICAgICB2YXIgJGFuaW1hdGUgPSB0aGlzLiRpbmplY3Rvci5nZXQoJyRhbmltYXRlJyk7XHJcbiAgICAgICAgICAgIGlmICgkYW5pbWF0ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgJGFuaW1hdGUuZW5hYmxlZChmYWxzZSwgJGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua05hdGl2ZUlucHV0KCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgJG5nTW9kZWw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyLCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gKGRhdGUsIHBhdHRlcm4pOiBzdHJpbmcgPT4gKGRhdGUgPT0gbnVsbCkgPyAnJyA6IG1vbWVudChkYXRlKS5mb3JtYXQocGF0dGVybik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVGb3JtYXQgPSAoZGF0ZSkgPT4gZm9ybWF0KGRhdGUsIFwiWVlZWS1NTS1ERFwiKTtcclxuICAgICAgICAgICAgY29uc3QgbW9udGhGb3JtYXQgPSAoZGF0ZSkgPT4gZm9ybWF0KGRhdGUsIFwiWVlZWS1NTVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIgPSBkYXRlRm9ybWF0O1xyXG5cclxuICAgICAgICAgICAgaWYgKCRhdHRyc1snbWluVmlldyddID09IFwibW9udGhzXCIpIHtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBcIm1vbnRoXCI7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIgPSBtb250aEZvcm1hdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2V0Vmlld0RhdGUgPSAoZGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzbyA9IGZvcm1hdHRlcihkYXRlKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsLiRzZXRWaWV3VmFsdWUoaXNvKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50LnByb3AoXCJ0eXBlXCIsIHR5cGUpO1xyXG4gICAgICAgICAgICAkY3RybC5zZXRWaWV3RGF0ZSA9IHNldFZpZXdEYXRlO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2V0RGF0ZUZyb21WaWV3ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZXdWYWx1ZSA9IG1vbWVudCgkbmdNb2RlbC4kdmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSB2aWV3VmFsdWUuaXNWYWxpZCgpID8gZGF0ZUZvcm1hdCgkbmdNb2RlbC4kdmlld1ZhbHVlKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZXREYXRlKGRhdGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuaXNJT1MpIHtcclxuICAgICAgICAgICAgLy8gICAgICRlbGVtZW50Lm9uKGBibHVyLiR7JHNjb3BlLiRpZH1gLCBzZXREYXRlRnJvbVZpZXcpO1xyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkbmdNb2RlbC4kdmlld0NoYW5nZUxpc3RlbmVycy5wdXNoKHNldERhdGVGcm9tVmlldyk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua0lucHV0KCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyLCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gKGRhdGU6IG1vbWVudC5Nb21lbnQpID0+IGRhdGUuZm9ybWF0KFwiTFwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNldFZpZXdEYXRlID0gKGRhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gZGF0ZSA9PSBudWxsID8gJycgOiBmb3JtYXQobW9tZW50KGRhdGUpKTtcclxuICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodGV4dCk7XHJcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXRWaWV3UmFuZ2UgPSAoc3RhcnQsIGVuZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSAnJztcclxuICAgICAgICAgICAgICAgIGlmIChzdGFydCAhPSBudWxsICYmIGVuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1TdGFydCA9IG1vbWVudChzdGFydCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1FbmQgPSBtb21lbnQoZW5kKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1TdGFydC5pc1NhbWUoZW5kLCAnZGF5JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGZvcm1hdChtU3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBgJHtmb3JtYXQobVN0YXJ0KX0gLSAke2Zvcm1hdChtRW5kKX1gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gZm9ybWF0KG1vbWVudChlbmQpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gZm9ybWF0KG1vbWVudChlbmQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGN0cmwuc2V0Vmlld0RhdGUgPSBzZXRWaWV3RGF0ZTtcclxuICAgICAgICAgICAgJGN0cmwuc2V0Vmlld1JhbmdlID0gc2V0Vmlld1JhbmdlO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGNoYW5nZS4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRjdHJsLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0VG9Nb21lbnQobmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0ZS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2V0RGF0ZShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGUuaXNTYW1lKCRjdHJsLmRhdGUsICdkYXknKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5zZXREYXRlKGRhdGUuZm9ybWF0KCRjdHJsLmlzb0Zvcm1hdCkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5nZSA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb1JhbmdlKG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY3RybC5zZXRSYW5nZShudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBtb21lbnQocmFuZ2Uuc3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gbW9tZW50KHJhbmdlLmVuZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXJ0LmlzVmFsaWQoKSB8fCAhZW5kLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2V0UmFuZ2UobnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFydC5pc1NhbWUoJGN0cmwuc3RhcnQsICdkYXknKSAmJiBlbmQuaXNTYW1lKCRjdHJsLmVuZCwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2V0UmFuZ2UocmFuZ2Uuc3RhcnQsIHJhbmdlLmVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihga2V5ZG93bi4keyRzY29wZS4kaWR9YCwgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISRjdHJsLmlzVmlzaWJsZSB8fCAhdGhpcy5pc0VzY2FwZShlKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpbmtOYXRpdmVFbGVtZW50KCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyLCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUYWJJbmRleCgkZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnZXRWbSA9IChuYW1lKSA9PiBgJHt0aGlzLmNvbnRyb2xsZXJBc30uJHtuYW1lfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGdldEF0dHIgPSAobmFtZSwgdmFsdWUpID0+IGAke25hbWV9PVwiJHt2YWx1ZX1cImBcclxuICAgICAgICAgICAgY29uc3QgZ2V0Vm1BdHRyID0gKG5hbWUsIHZhbHVlKSA9PiBnZXRBdHRyKG5hbWUsIGdldFZtKHZhbHVlKSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBUeXBlQnVpbGRlcigpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IF9idWlsZGVyID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEF0dHIgPSAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLnB1c2goZ2V0QXR0cihuYW1lLCB2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYnVpbGRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZExpdGVyYWwgPSAobmFtZSwgYXR0cikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgJGF0dHJzW2F0dHJdICE9IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMucHVzaChnZXRBdHRyKG5hbWUsICRhdHRyc1thdHRyXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYnVpbGRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJpbmRpbmcgPSAobmFtZSwgYXR0ciwgY3RybCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0ciA9PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyID0gJGF0dHJzW2F0dHJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0ciAhPSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLnB1c2goZ2V0Vm1BdHRyKG5hbWUsIGN0cmwpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2J1aWxkZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQcm94eSA9IChuYW1lOiBzdHJpbmcsIGZuOiBGdW5jdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsW25hbWVdID0gZm47XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9idWlsZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnQgPSAobmFtZSwgYXR0ciwgY3RybCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgJGF0dHJzW2F0dHJdICE9IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMucHVzaChnZXRWbUF0dHIobmFtZSwgY3RybCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYnVpbGRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBgPGlucHV0IGRhdGUtcGlja2VyICR7dGhpcy5hdHRycy5qb2luKCcgJyl9PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRjdHJsWydfX2RhdGUnXSA9ICRjdHJsLmRhdGU7XHJcbiAgICAgICAgICAgICRjdHJsWydfX3N0YXJ0J10gPSAkY3RybC5kYXRlO1xyXG4gICAgICAgICAgICAkY3RybFsnX19lbmQnXSA9ICRjdHJsLmRhdGU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBidWlsZGVyID0gbmV3IFR5cGVCdWlsZGVyKClcclxuICAgICAgICAgICAgICAgIC5hZGRBdHRyKFwidHlwZVwiLCBcInRleHRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRMaXRlcmFsKFwibWluLXZpZXdcIiwgXCJtaW5WaWV3XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQmluZGluZyhcIm5nLW1vZGVsXCIsIHRydWUsIFwiZGF0ZVN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEJpbmRpbmcoXCJkYXRlXCIsIFwiZGF0ZVwiLCBcIl9fZGF0ZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEJpbmRpbmcoXCJzdGFydFwiLCBcInN0YXJ0XCIsIFwiX19zdGFydFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEJpbmRpbmcoXCJlbmRcIiwgXCJlbmRcIiwgXCJfX2VuZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEJpbmRpbmcoXCJpcy1zZWxlY3RpbmdcIiwgXCJpc1NlbGVjdGluZ1wiLCBcImlzU2VsZWN0aW5nXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkTGl0ZXJhbChcImRlZmF1bHQtZGF0ZVwiLCBcImRlZmF1bHREYXRlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQmluZGluZyhcImhpZ2hsaWdodGVkXCIsIFwiaGlnaGxpZ2h0ZWRcIiwgXCJoaWdobGlnaHRlZFwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBidWlsZGVyLmJ1aWxkKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkaW5wdXQgPSBhbmd1bGFyLmVsZW1lbnQoY29udGVudClcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZGF0ZXBpY2tlci1saW5rTmF0aXZlRWxlbWVudC1pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJT1MpIHtcclxuICAgICAgICAgICAgICAgICRpbnB1dC5vbihgYmx1ci4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLnNldERhdGUoJGN0cmxbJ19fZGF0ZSddKTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRjb21waWxlKCRpbnB1dCkoJHNjb3BlKTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdkYXRlcGlja2VyLWxpbmtOYXRpdmVFbGVtZW50JylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKFwiaHJlZlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgkaW5wdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua0VsZW1lbnQoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCBuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRhYkluZGV4KCRlbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5wb3BvdmVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua0lubGluZSgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsIG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNyZWF0ZUNvbnRlbnQoJHNjb3BlLCAkZWxlbWVudCwgJGN0cmwpO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoY29udGVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUYWJJbmRleCgkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RWxlbWVudCA9ICRlbGVtZW50LmdldCgwKTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRUYWJJbmRleCA9IGN1cnJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcInRhYkluZGV4XCIpO1xyXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ0YWJJbmRleFwiLCBjdXJyZW50VGFiSW5kZXggIT0gbnVsbCA/IGN1cnJlbnRUYWJJbmRleCA6IFwiLTFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBldnQobmFtZXM6IHN0cmluZywgJHNjb3BlOiBhbmd1bGFyLklTY29wZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmFtZXMuc3BsaXQoJyAnKS5tYXAobmFtZSA9PiBgJHtuYW1lfS5kYXRlcGlja2VyJHskc2NvcGUuJGlkfWApLmpvaW4oJyAnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBvcG92ZXIoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB0ZXRoZXIsXHJcbiAgICAgICAgICAgICAgICAkYm9keTogYW55ID0gYW5ndWxhci5lbGVtZW50KCdib2R5Jyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBldnQgPSAobmFtZXM6IHN0cmluZykgPT4gdGhpcy5ldnQobmFtZXMsICRzY29wZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICAgICAgICAgIG1vdXNlZG93bjogZXZ0KCdtb3VzZWRvd24gdG91Y2hzdGFydCcpLFxyXG4gICAgICAgICAgICAgICAgZm9jdXM6IGV2dCgnZm9jdXMnKSxcclxuICAgICAgICAgICAgICAgIGNsaWNrOiBldnQoJ2NsaWNrJyksXHJcbiAgICAgICAgICAgICAgICBibHVyOiBldnQoJ2JsdXInKSxcclxuICAgICAgICAgICAgICAgIG1vdXNldXA6IGV2dCgnbW91c2V1cCB0b3VjaGVuZCcpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGFuZ3VsYXIuZXh0ZW5kKCRzY29wZS4kbmV3KCksIHtcclxuICAgICAgICAgICAgICAgIGlzTW91c2VEb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGhhc0ZvY3VzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRIYXNGb2N1czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2aWV3OiAkY3RybC52aWV3LFxyXG4gICAgICAgICAgICAgICAgaXNPcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNldERhdGU6IChkYXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdzZXREYXRlJywgZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2V0RGF0ZShkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldFJhbmdlOiAoc3RhcnQsIGVuZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnc2V0UmFuZ2UnLCBzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5zZXRSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdGF0ZSwnaXNTZWxlY3RpbmcnLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkY3RybC5pc1NlbGVjdGVkO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ2lzU2VsZWN0aW5nJywgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLmlzU2VsZWN0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5PcGVuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAub24oZXZlbnRzLm1vdXNlZG93biwgb25Nb3VzZURvd24pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKGV2ZW50cy5mb2N1cywgb25Gb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKGV2ZW50cy5ibHVyLCBvbkJsdXIpO1xyXG4gICAgICAgICAgICAgICAgJGJvZHkub2ZmKGV2ZW50cy5tb3VzZXVwLCBvbkJvZHlVcCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbkNsb3NlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAub2ZmKGV2ZW50cy5tb3VzZWRvd24sIG9uTW91c2VEb3duKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vZmYoZXZlbnRzLmZvY3VzLCBvbkZvY3VzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vbmUoZXZlbnRzLmJsdXIsIG9uQmx1cik7XHJcbiAgICAgICAgICAgICAgICAkYm9keS5vbmUoZXZlbnRzLm1vdXNldXAsIG9uQm9keVVwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgb3BlbiA9IChlOiBKUXVlcnlFdmVudE9iamVjdCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmlzT3BlbilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUudmlldyA9ICRjdHJsLnZpZXc7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5pc09wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuY29udGVudEhhc0ZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVDb250ZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5vbihldmVudHMubW91c2V1cCwgb25Db250ZW50TW91c2VVcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5vbihldmVudHMubW91c2V1cCwgJ2RhdGUtcGlja2VyJywgb25Db250ZW50Qm9keU1vdXNlVXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGV0aGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV0aGVyLnBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGlzdGVuQ2xvc2UoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBibHVyVGltZXI7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5pc09wZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0YXRlLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5PcGVuKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVDb250ZW50ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IHRoaXMuY3JlYXRlRHJvcERvd24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgJGJvZHkuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTW9iaWxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZXRoZXIgPSBuZXcgVGV0aGVyKHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICRlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEF0dGFjaG1lbnQ6ICdib3R0b20gY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b3AgY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc1ByZWZpeDogJ2RhdGVwaWNrZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldE9mZnNldDogJzE0cHggMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86ICd3aW5kb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudDogJ3RvZ2V0aGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpbjogWyd0b3AnLCAnbGVmdCcsICdib3R0b20nLCAncmlnaHQnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9uQ29udGVudE1vdXNlVXAgPSAoZTogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKCRjdHJsLmlzU2VsZWN0aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ29uQ29udGVudE1vdXNlVXAnLCAkY3RybC5pc1NlbGVjdGluZyk7XHJcbiAgICAgICAgICAgICAgICBjbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25Db250ZW50Qm9keU1vdXNlVXAgPSAoZTogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKCRjdHJsLmlzU2VsZWN0aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ29uQ29udGVudEJvZHlNb3VzZVVwJywgJGN0cmwuaXNTZWxlY3RpbmcpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuY29udGVudEhhc0ZvY3VzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25Nb3VzZURvd24gPSAoZTogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5oYXNGb2N1cylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdvbk1vdXNlRG93bicpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuaXNNb3VzZURvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub25lKGV2ZW50cy5tb3VzZXVwLCBvbk1vdXNlVXApO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25Nb3VzZVVwID0gKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ29uTW91c2VVcCcpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuaXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3BlbihlKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9uRm9jdXMgPSAoZTogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5pc01vdXNlRG93bilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUuaGFzRm9jdXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcGVuKGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25CbHVyID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5jb250ZW50SGFzRm9jdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0YXRlLmhhc0ZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25Cb2R5VXAgPSAoZTogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5pc01vdXNlRG93biB8fCBzdGF0ZS5oYXNGb2N1cyB8fCBzdGF0ZS5jb250ZW50SGFzRm9jdXMgfHwgJGN0cmwuaXNTZWxlY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ29uQm9keVVwJyk7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxpc3Rlbk9wZW4oKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGJvZHkub2ZmKGV2ZW50cy5jbGljayk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudCkgY29udGVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVEcm9wRG93bihzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyLCBsb2NhbFNjb3BlOiBhbmd1bGFyLklTY29wZSk6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSB7XHJcbiAgICAgICAgICAgIHNjb3BlWydkcm9wZG93biddID0gbG9jYWxTY29wZTtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZXBpY2tlciA9IHRoaXMuY29udHJvbGxlckFzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNpbmdsZURhdGVCaW5kaW5nID0gYGRhdGU9XCJkcm9wZG93bi5kYXRlXCIgb24tZGF0ZS1zZWxlY3Q9XCJkcm9wZG93bi5zZXREYXRlKGRhdGUpXCJgLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2VCaW5kaW5nID0gYHN0YXJ0PVwiZHJvcGRvd24uc3RhcnRcIiBlbmQ9XCJkcm9wZG93bi5lbmRcIiBvbi1yYW5nZS1zZWxlY3Q9XCJkcm9wZG93bi5zZXRSYW5nZShzdGFydCxlbmQpXCJgLFxyXG4gICAgICAgICAgICAgICAgYmluZGluZ3MgPSAkY3RybC5pc1NpbmdsZURhdGUgPyBzaW5nbGVEYXRlQmluZGluZyA6IHJhbmdlQmluZGluZyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gYDxkaXYgbmctY2xhc3M9XCJ7J2RhdGVwaWNrZXItb3Blbic6ZHJvcGRvd24uaXNPcGVufVwiPjxkYXRlLXBpY2tlciBtaW4tdmlldz1cIiR7JGF0dHJzWydtaW5WaWV3J119XCIgaXMtc2VsZWN0aW5nPVwiZHJvcGRvd24uaXNTZWxlY3RpbmdcIiAke2JpbmRpbmdzfVwiIGhpZ2hsaWdodGVkPVwiZGF0ZXBpY2tlci5oaWdobGlnaHRlZFwiIGRlZmF1bHQtZGF0ZT1cInt7ZGF0ZXBpY2tlci5kZWZhdWx0RGF0ZX19XCI+PC9kYXRlLXBpY2tlcj48L2Rpdj5gO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuYWRkQ2xhc3MoXCJkYXRlcGlja2VyLWRyb3Bkb3duXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuYWRkQ2xhc3MoXCJkYXRlcGlja2VyLWRyb3Bkb3duLS1pc01vYmlsZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gJGVsZW1lbnQucG9zaXRpb24oKSxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAkZWxlbWVudC5vdXRlckhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbiA9ICgkZWxlbWVudC5vdXRlckhlaWdodCh0cnVlKSAtIGhlaWdodCksXHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gbWFyZ2luIC8gMiArIGhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBwb3NpdGlvbi50b3AgKyBvZmZzZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogcG9zaXRpb24ubGVmdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGNvbXBpbGUoY29udGVudCkoc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2ZW50RGVmYXVsdChlOiBKUXVlcnlFdmVudE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzRXNjYXBlKGU6IEpRdWVyeUV2ZW50T2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSAyNztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbnRlbnQoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKTogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLiR0ZW1wbGF0ZUNhY2hlLmdldCh0aGlzLmNhbGVuZGFyVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZShjb250ZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwU2VsZWN0aW9ucygkc2NvcGUsICRlbGVtZW50LCAkY3RybCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0dXBEYXlTZWxlY3QoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRheUNzcyA9ICcuZGF0ZVBpY2tlckRheXMtZGF5JyxcclxuICAgICAgICAgICAgICAgICRib2R5OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIG1vdXNlRG93biA9IHRoaXMuZXZ0KCdtb3VzZWRvd24gdG91Y2hzdGFydCcsICRzY29wZSksXHJcbiAgICAgICAgICAgICAgICBtb3VzZVVwID0gdGhpcy5ldnQoJ21vdXNldXAgdG91Y2hlbmQnLCAkc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25TZWxlY3RlZCA9IChyYW5nZTogRGF0ZVBpY2tlck1vdXNlUmFuZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXlzID0gcmFuZ2UuZ2V0RGF5cygpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0ZWQoZGF5cyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihtb3VzZURvd24sIGRheUNzcywgKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF5IG1vdXNlZG93bicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBuZXcgRGF0ZVBpY2tlck1vdXNlUmFuZ2UoJGN0cmwsIGUpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNTZWxlY3RpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYm9keS5vbmUobW91c2VVcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXkgYm9keSBtb3VzZXVwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldHVwUmFuZ2VTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRib2R5OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIG1vdXNlRG93biA9IHRoaXMuZXZ0KCdtb3VzZWRvd24gdG91Y2hzdGFydCcsICRzY29wZSksXHJcbiAgICAgICAgICAgICAgICBtb3VzZU92ZXIgPSB0aGlzLmV2dCgnbW91c2VvdmVyIHRvdWNoZW5kJywgJHNjb3BlKSxcclxuICAgICAgICAgICAgICAgIG1vdXNlVXAgPSB0aGlzLmV2dCgnbW91c2V1cCcsICRzY29wZSksXHJcbiAgICAgICAgICAgICAgICBkYXlDc3MgPSAnLmRhdGVQaWNrZXJEYXlzLWRheSc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvblNlbGVjdGluZyA9IChyYW5nZTogRGF0ZVBpY2tlck1vdXNlUmFuZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRheXMgPSByYW5nZS5nZXREYXlzKCk7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3RpbmcoZGF5cyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvblNlbGVjdGVkID0gKHJhbmdlOiBEYXRlUGlja2VyTW91c2VSYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF5cyA9IHJhbmdlLmdldERheXMoKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdGVkKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VEb3duLCBkYXlDc3MsIChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JhbmdlIG1vdXNlZG93bicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gbmV3IERhdGVQaWNrZXJNb3VzZVJhbmdlKCRjdHJsLCBlKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLmlzU2VsZWN0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vbihtb3VzZU92ZXIsIGRheUNzcywgKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JhbmdlIG1vdXNlb3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc2V0RW5kKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0aW5nKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRib2R5Lm9uZShtb3VzZVVwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmFuZ2UgYm9keSBtb3VzZXVwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKG1vdXNlT3Zlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuZGlyZWN0aXZlKCdkYXRlUGlja2VyJywgRGF0ZVBpY2tlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlclJhbmdlXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyUmFuZ2Uge1xyXG4gICAgICAgIHN0YXJ0OiBzdHJpbmc7XHJcbiAgICAgICAgZW5kOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlclJhbmdlIGltcGxlbWVudHMgSURhdGVQaWNrZXJSYW5nZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RhcnQ6IGFueSwgZW5kOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIG1TdGFydCA9IG1vbWVudChzdGFydCk7XHJcbiAgICAgICAgICAgIHZhciBtRW5kID0gbW9tZW50KGVuZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobUVuZC5pc0JlZm9yZShtU3RhcnQpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IG1TdGFydDtcclxuICAgICAgICAgICAgICAgIG1TdGFydCA9IG1FbmQ7XHJcbiAgICAgICAgICAgICAgICBtRW5kID0gdGVtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1TdGFydC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBtRW5kLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnQ6IHN0cmluZztcclxuICAgICAgICBlbmQ6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvLyBEYXRlUGlja2VyTW9udGhcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJNb250aCB7XHJcbiAgICAgICAgdmFsdWU6IG51bWJlcjtcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaXNDdXJyZW50TW9udGg6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlck1vbnRoIGltcGxlbWVudHMgSURhdGVQaWNrZXJNb250aCB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIG0gPSBtb21lbnQoKTtcclxuICAgICAgICAgICAgdmFyIHRoaXNNb250aCA9IG0ubW9udGgoKTtcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gbS5tb250aCh2YWx1ZSkuZm9ybWF0KCdNTU0nKTtcclxuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRNb250aCA9IHZhbHVlID09PSB0aGlzTW9udGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaXNDdXJyZW50TW9udGg6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlck1vbnRoXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyWWVhciB7XHJcbiAgICAgICAgdmFsdWU6IG51bWJlcjtcclxuICAgICAgICBpc0N1cnJlbnRZZWFyOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJZZWFyIGltcGxlbWVudHMgSURhdGVQaWNrZXJZZWFyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmlzQ3VycmVudFllYXIgPSB2YWx1ZSA9PT0gbW9tZW50KCkueWVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNDdXJyZW50WWVhcjogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJRGF0ZVBpY2tlckRheVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlckRheSB7XHJcbiAgICAgICAgZGF0ZTogbnVtYmVyO1xyXG4gICAgICAgIHZhbHVlOiBhbnk7XHJcbiAgICAgICAgaXNUb2RheTogYm9vbGVhbjtcclxuICAgICAgICBpc05vdEluTW9udGg6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgaXNCZWZvcmUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTYW1lKGRheTogSURhdGVQaWNrZXJEYXkpOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJEYXkgaW1wbGVtZW50cyBJRGF0ZVBpY2tlckRheSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoZnJvbURhdGU6IGFueSwgZGF5T2ZXZWVrOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG1vbWVudChkYXlPZldlZWspO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLnZhbHVlLmRhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5pc1RvZGF5ID0gZGF5T2ZXZWVrLmlzU2FtZShtb21lbnQoKSwgJ2RheScpO1xyXG4gICAgICAgICAgICB0aGlzLmlzTm90SW5Nb250aCA9ICF0aGlzLnZhbHVlLmlzU2FtZShmcm9tRGF0ZSwgJ21vbnRoJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRlOiBudW1iZXI7XHJcbiAgICAgICAgdmFsdWU6IGFueTtcclxuICAgICAgICBpc1RvZGF5OiBib29sZWFuO1xyXG4gICAgICAgIGlzTm90SW5Nb250aDogYm9vbGVhbjtcclxuICAgICAgICBpc1NlbGVjdGluZzogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgaXNCZWZvcmUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgaXNCZWZvcmUgPSB0aGlzLnZhbHVlLmlzQmVmb3JlKGRheS52YWx1ZSwgJ2RheScpO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNCZWZvcmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1NhbWUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgaXNTYW1lID0gdGhpcy52YWx1ZS5pc1NhbWUoZGF5LnZhbHVlLCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpc1NhbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIERhdGVQaWNrZXJTZXJ2aWNlXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgZ2V0TW9udGhzKCk6IElEYXRlUGlja2VyTW9udGhbXTtcclxuICAgICAgICBnZXREYXlzT2ZXZWVrKCk6IHN0cmluZ1tdO1xyXG4gICAgICAgIGdldFllYXJzKGZyb21EYXRlKTogSURhdGVQaWNrZXJZZWFyW107XHJcbiAgICAgICAgZ2V0V2Vlayhmcm9tRGF0ZSwgc3RhcnRPZldlZWspOiBJRGF0ZVBpY2tlckRheVtdO1xyXG4gICAgICAgIGdldFJhbmdlRGF5cyhzdGFydDogSURhdGVQaWNrZXJEYXksIGVuZDogSURhdGVQaWNrZXJEYXksIHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pOiBJRGF0ZVBpY2tlckRheVtdO1xyXG4gICAgICAgIGRlc2VsZWN0QWxsKHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pO1xyXG4gICAgICAgIHNlbGVjdERheXMoZGF5czogSURhdGVQaWNrZXJEYXlbXSk7XHJcbiAgICAgICAgaW5wdXRUb01vbWVudCh2YWx1ZTogc3RyaW5nKTogYW55O1xyXG4gICAgICAgIGlucHV0VG9SYW5nZSh2YWx1ZTogc3RyaW5nKTogSURhdGVQaWNrZXJSYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyU2VydmljZSBpbXBsZW1lbnRzIElEYXRlUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgZ2V0TW9udGhzKCk6IElEYXRlUGlja2VyTW9udGhbXSB7XHJcbiAgICAgICAgICAgIHZhciBtb250aHMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJNb250aD4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbW9udGhzLnB1c2gobmV3IERhdGVQaWNrZXJNb250aChpKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtb250aHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRZZWFycyhmcm9tRGF0ZSk6IElEYXRlUGlja2VyWWVhcltdIHtcclxuICAgICAgICAgICAgdmFyIGZyb21ZZWFyID0gbW9tZW50KGZyb21EYXRlKS55ZWFyKCksXHJcbiAgICAgICAgICAgICAgICB5ZWFycyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlclllYXI+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZnJvbVllYXI7IGkgPD0gKGZyb21ZZWFyICsgOCk7IGkrKylcclxuICAgICAgICAgICAgICAgIHllYXJzLnB1c2gobmV3IERhdGVQaWNrZXJZZWFyKGkpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB5ZWFycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFdlZWsoZnJvbURhdGUsIHN0YXJ0T2ZXZWVrKTogSURhdGVQaWNrZXJEYXlbXSB7XHJcbiAgICAgICAgICAgIHZhciBlbmRPZldlZWsgPSBtb21lbnQoc3RhcnRPZldlZWspLmVuZE9mKCd3ZWVrJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF5cyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlckRheT4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF5T2ZXZWVrID0gbW9tZW50KHN0YXJ0T2ZXZWVrKTsgZGF5T2ZXZWVrLmlzQmVmb3JlKGVuZE9mV2Vlayk7IGRheU9mV2Vlay5hZGQoMSwgJ2RheXMnKSkge1xyXG4gICAgICAgICAgICAgICAgZGF5cy5wdXNoKG5ldyBEYXRlUGlja2VyRGF5KGZyb21EYXRlLCBkYXlPZldlZWspKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXREYXlzT2ZXZWVrKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudC53ZWVrZGF5c1Nob3J0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRSYW5nZURheXMoc3RhcnQ6IElEYXRlUGlja2VyRGF5LCBlbmQ6IElEYXRlUGlja2VyRGF5LCB3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKTogSURhdGVQaWNrZXJEYXlbXSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZW5kLmlzQmVmb3JlKHN0YXJ0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBzdGFydDtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgICAgICAgICAgICAgZW5kID0gdGVtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGFsbERheXMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJEYXk+KCksXHJcbiAgICAgICAgICAgICAgICBpc0FkZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgd2Vla3MuZm9yRWFjaCh3ZWVrID0+IHtcclxuICAgICAgICAgICAgICAgIHdlZWsuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXkuaXNTYW1lKHN0YXJ0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBZGRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNBZGRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsRGF5cy5wdXNoKGRheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5LmlzU2FtZShlbmQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FkZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFsbERheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXNlbGVjdEFsbCh3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKSB7XHJcbiAgICAgICAgICAgIHdlZWtzLmZvckVhY2god2VlayA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZWVrLmZvckVhY2goZGF5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXkuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdERheXMoZGF5czogSURhdGVQaWNrZXJEYXlbXSkge1xyXG4gICAgICAgICAgICBkYXlzLmZvckVhY2goZGF5ID0+IGRheS5pc1NlbGVjdGluZyA9IHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXRUb01vbWVudCh2YWx1ZTogc3RyaW5nKTogbW9tZW50Lk1vbWVudCB7XHJcbiAgICAgICAgICAgIHZhciBsYW5nID0gbW9tZW50LmxvY2FsZURhdGEoKTtcclxuICAgICAgICAgICAgdmFyIGZvcm1hdHMgPSBbXHJcbiAgICAgICAgICAgICAgICBsYW5nLmxvbmdEYXRlRm9ybWF0KFwibFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKSxcclxuICAgICAgICAgICAgICAgIGxhbmcubG9uZ0RhdGVGb3JtYXQoXCJMXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gIC9nLCAnICcpXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG1vbWVudCh2YWx1ZSwgZm9ybWF0cyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgeWVhciA9IGRhdGUueWVhcigpO1xyXG4gICAgICAgICAgICBpZih5ZWFyIDwgMTApIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50WWVhciA9IG1vbWVudCgpLnllYXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBhZGRZZWFycyA9IGN1cnJlbnRZZWFyIC0gKGN1cnJlbnRZZWFyJTEwKTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdZZWFyID0geWVhciArIGFkZFllYXJzO1xyXG4gICAgICAgICAgICAgICAgZGF0ZS5zZXQoJ3llYXInLCBuZXdZZWFyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnB1dFRvUmFuZ2UodmFsdWU6IHN0cmluZyk6IElEYXRlUGlja2VyUmFuZ2Uge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAhdmFsdWUudHJpbSgpLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB2YXIgdHJpbW1lZCA9IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvLS9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcgJylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gIC9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAudHJpbSgpO1xyXG4gICAgICAgICAgICB2YXIgZXhwU3RhcnQgPSBuZXcgUmVnRXhwKFwiXigoWzAtOV17MSw0fVsgXSopezN9KVwiKTtcclxuICAgICAgICAgICAgdmFyIGV4cEVuZCA9IG5ldyBSZWdFeHAoXCIoKFswLTldezEsNH1bIF0qKXszfSkkXCIpO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRSZXN1bHQgPSBleHBTdGFydC5leGVjKHRyaW1tZWQpO1xyXG4gICAgICAgICAgICB2YXIgZW5kUmVzdWx0ID0gZXhwRW5kLmV4ZWModHJpbW1lZCk7XHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuaW5wdXRUb01vbWVudChzdGFydFJlc3VsdFswXS50cmltKCkpO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gdGhpcy5pbnB1dFRvTW9tZW50KChlbmRSZXN1bHRbMF0gfHwgc3RhcnRSZXN1bHRbMF0pLnRyaW0oKSk7XHJcbiAgICAgICAgICAgIHZhciByYW5nZSA9IG5ldyBEYXRlUGlja2VyUmFuZ2Uoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuc2VydmljZSgnZGF0ZVBpY2tlclNlcnZpY2UnLCBEYXRlUGlja2VyU2VydmljZSk7XHJcbn0iLCJcclxubW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFRpbWVQaWNrZXJDb250cm9sbGVyIHtcclxuICAgICAgICBwcml2YXRlICRwb3N0TGluaygpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRWaWV3VmFsdWUodGhpcy5fdGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfdGltZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgdGltZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCB0aW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc3QgaGFzQ2hhbmdlZCA9IHRoaXMuX3RpbWUgIT09IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoIWhhc0NoYW5nZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLl90aW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHsgdGltZTogdmFsdWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFZpZXdWYWx1ZSh0aW1lOiBzdHJpbmcpIHt9O1xyXG4gICAgICAgIG9uQ2hhbmdlOiAocGFyYW1zOiB7IHRpbWU6IHN0cmluZyB9KSA9PiB2b2lkO1xyXG4gICAgICAgIHByaXZhdGUgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuY29udHJvbGxlcigndGltZVBpY2tlcicsIFRpbWVQaWNrZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsndGltZVBpY2tlclNlcnZpY2UnLCAnaXNNb2JpbGUnLCAnJHBhcnNlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZVBpY2tlclNlcnZpY2U6IElUaW1lUGlja2VyU2VydmljZSwgcHJpdmF0ZSBpc01vYmlsZTogYm9vbGVhbiwgcHJpdmF0ZSAkcGFyc2U6IGFuZ3VsYXIuSVBhcnNlU2VydmljZSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsndGltZVBpY2tlcicsICduZ01vZGVsJ107XHJcbiAgICAgICAgY29udHJvbGxlciA9IFRpbWVQaWNrZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd0aW1lcGlja2VyJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGltZTogJz0nLFxyXG4gICAgICAgICAgICBvbkNoYW5nZTogJyYnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIFskY3RybCwgJG5nTW9kZWxDdHJsXTogW1RpbWVQaWNrZXJDb250cm9sbGVyLCBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcl0pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua01vYmlsZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsLCAkbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxpbmtEZXNrdG9wKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwsICRuZ01vZGVsQ3RybCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlua01vYmlsZSA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsOiBUaW1lUGlja2VyQ29udHJvbGxlciwgJG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5wcm9wKCd0eXBlJywgJ3RpbWUnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNldFZpZXdWYWx1ZSA9ICh0aW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdWYWx1ZSA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UuZm9ybWF0SXNvKHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRjdHJsLnNldFZpZXdWYWx1ZSA9IHNldFZpZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kdmlld0NoYW5nZUxpc3RlbmVycy5wdXNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRjdHJsLnRpbWUgPSB0aGlzLnRpbWVQaWNrZXJTZXJ2aWNlLmZvcm1hdElzbygkbmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmtEZXNrdG9wID0gKCRzY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzLCAkY3RybDogVGltZVBpY2tlckNvbnRyb2xsZXIsICRuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnRJZCA9ICguLi5uYW1lczogc3RyaW5nW10pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lcy5tYXAobmFtZSA9PiBgJHtuYW1lfS4keyRzY29wZS4kaWR9YCkuam9pbignICcpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwudGltZSA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UuZm9ybWF0SXNvKCRuZ01vZGVsQ3RybC4kbW9kZWxWYWx1ZSwgbnVsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNWYWxpZFRpbWUgPSAkY3RybC50aW1lICE9IG51bGxcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzUmVxdWlyZWQgPSAkYXR0cnNbJ3JlcXVpcmVkJ107XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gIWlzUmVxdWlyZWQgfHwgKGlzUmVxdWlyZWQgJiYgaXNWYWxpZFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWYWxpZGl0eSgnaW52YWxpZFRpbWUnLCBpc1ZhbGlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVPbkVudGVyID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IEVOVEVSX0tFWSA9IDEzO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RG93biA9IGUgPT4gZS53aGljaDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5RG93bihlKSAhPT0gRU5URVJfS0VZKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB1cGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2V0Vmlld1ZhbHVlID0gKHRpbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgdmlld1ZhbHVlID0gdGhpcy50aW1lUGlja2VyU2VydmljZS5mb3JtYXQodGltZSk7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh2aWV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGN0cmwuc2V0Vmlld1ZhbHVlID0gc2V0Vmlld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIC5vbihldmVudElkKCdibHVyJyksIHVwZGF0ZSlcclxuICAgICAgICAgICAgICAgIC5vbihldmVudElkKCdrZXlkb3duJyksIHVwZGF0ZU9uRW50ZXIpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoZXZlbnRJZCgnYmx1cicsICdrZXlkb3duJykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5kaXJlY3RpdmUoJ3RpbWVQaWNrZXInLCBUaW1lUGlja2VyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUaW1lUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgcGFyc2UodGV4dDogc3RyaW5nKTogYW55O1xyXG4gICAgICAgIGZvcm1hdCh0ZXh0OiBzdHJpbmcsIHZhbHVlPzogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgICAgIGZvcm1hdElzbyh0ZXh0OiBzdHJpbmcsIHZhbHVlPzogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRpbWVQaWNrZXJTZXJ2aWNlIGltcGxlbWVudHMgSVRpbWVQaWNrZXJTZXJ2aWNlIHtcclxuICAgICAgICBwYXJzZSh0ZXh0OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgcGF0dGVybnMgPSBbXHJcbiAgICAgICAgICAgICAgICAnTFQnLFxyXG4gICAgICAgICAgICAgICAgJ0xUUycsXHJcbiAgICAgICAgICAgICAgICAnSEg6bW06c3MnLFxyXG4gICAgICAgICAgICAgICAgJ0hIOm1tIEEnXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQodGV4dCwgcGF0dGVybnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybWF0KHRleHQ6IHN0cmluZywgdmFsdWU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIG0gPSB0aGlzLnBhcnNlKHRleHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbS5pc1ZhbGlkKCkgPyBtLmZvcm1hdCgnTFQnKSA6IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybWF0SXNvKHRleHQ6IHN0cmluZywgdmFsdWU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIG0gPSB0aGlzLnBhcnNlKHRleHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbS5pc1ZhbGlkKCkgPyBtLmZvcm1hdChcIkhIOm1tOnNzXCIpIDogdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLnNlcnZpY2UoJ3RpbWVQaWNrZXJTZXJ2aWNlJywgVGltZVBpY2tlclNlcnZpY2UpO1xyXG59Il19