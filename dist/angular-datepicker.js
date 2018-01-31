Angular.module("ngDatePicker", []);
var DatePickerModule;
(function (DatePickerModule) {
    var MobileConfig = /** @class */ (function () {
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
    var DatePickerMouseRange = /** @class */ (function () {
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
    var DatePickerController = /** @class */ (function () {
        function DatePickerController($scope, $element, $attrs, datePickerService, isMobile) {
            this.$scope = $scope;
            this.$element = $element;
            this.$attrs = $attrs;
            this.datePickerService = datePickerService;
            this.isMobile = isMobile;
            this.isoFormat = 'YYYY-MM-DD';
            DatePickerMouseRange.bootstrap(datePickerService);
            this.isSingleDate = this.isMobile || ($attrs['start'] == null && $attrs['end'] == null);
            this.monthNames = datePickerService.getMonths();
            this.daysOfWeek = datePickerService.getDaysOfWeek();
        }
        DatePickerController.prototype.$onInit = function () {
            if (this.defaultDate == "")
                this.defaultDate = null;
            this.resetView();
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
        DatePickerController.prototype.initView = function () {
            switch (this.$attrs['minView']) {
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
        };
        DatePickerController.prototype.resetView = function () {
            this.initView();
            this.initDateInternal();
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
        DatePickerController.prototype.initDateInternal = function () {
            var dateInternal = (this.isSingleDate ? this.date : this.start) || this.defaultDate;
            this.setDateInternal(dateInternal);
            this.calculate(this._dateInternal);
        };
        DatePickerController.prototype.momentFromValue = function (value) {
            return (value != null) ? moment(value) : moment();
        };
        DatePickerController.prototype.setDateInternal = function (value) {
            this._dateInternal = this.momentFromValue(value);
            if (!this.initialized)
                return;
            this.calculate(this._dateInternal);
        };
        DatePickerController.prototype.calculate = function (fromDate) {
            var start = fromDate.clone().startOf('month').startOf('week'), end = fromDate.clone().endOf('month').endOf('week');
            var now = moment();
            var today = moment(now.format('YYYY-MM-DD'), 'YYYY-MM-DD');
            this.weeks = new Array();
            for (var day = start; day.isBefore(end); day = day.clone().add(1, 'week')) {
                var week = this.datePickerService.getWeek(fromDate, day, today);
                this.weeks.push(week);
            }
            this.years = this.datePickerService.getYears(fromDate);
            this.setHighlights(this.highlighted);
            this.setSelected(this.start, this.end);
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
        DatePickerController.prototype.setSelected = function (start, end) {
            var _this = this;
            this.weeks.forEach(function (week) {
                week.forEach(function (day) {
                    day.isSelected = _this.isSelected(start, end, day);
                });
            });
        };
        DatePickerController.prototype.isSelected = function (start, end, day) {
            if (start == null || end == null)
                return false;
            return day.value.isBetween(start, end, 'day') ||
                day.value.isSame(start, 'day') ||
                day.value.isSame(end, 'day');
        };
        DatePickerController.prototype.setHighlights = function (highlights) {
            var _this = this;
            this.weeks.forEach(function (week) {
                week.forEach(function (day) { return day.isHighlighted = _this.isHighlighted(highlights, day); });
            });
        };
        DatePickerController.prototype.isHighlighted = function (highlights, day) {
            if (highlights == null)
                highlights = [];
            var isoHighlights = highlights.map(function (value) { return moment(value).format('YYYY-DD-MM'); });
            for (var i = 0; i < isoHighlights.length; i++) {
                var isoDate = isoHighlights[i];
                if (isoDate === day.isoDate)
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
        DatePickerController.$inject = ['$scope', '$element', '$attrs', 'datePickerService', 'isMobile'];
        return DatePickerController;
    }());
    Angular.module("ngDatePicker").controller('datePicker', DatePickerController);
    var PopoverState = /** @class */ (function () {
        function PopoverState($ctrl) {
            this.$ctrl = $ctrl;
            this._isOpen = false;
            this._isSelecting = false;
            this.allowClose = true;
        }
        Object.defineProperty(PopoverState.prototype, "defaultDate", {
            get: function () {
                return this.$ctrl.defaultDate || moment().format("YYYY-MM-DD");
            },
            enumerable: true,
            configurable: true
        });
        PopoverState.prototype.onChange = function (fn) {
            this._onChange = fn;
        };
        PopoverState.prototype.notify = function (action) {
            if (!this._onChange)
                return;
            this._onChange(this, action);
        };
        PopoverState.prototype.setDate = function (date) {
            this.$ctrl.setDate(date);
            this.close();
        };
        PopoverState.prototype.setRange = function (start, end) {
            this.$ctrl.setRange(start, end);
            this.close();
        };
        PopoverState.prototype.open = function () {
            this._isOpen = true;
            this.notify('open');
        };
        PopoverState.prototype.close = function () {
            if (!this.allowClose)
                return;
            this._isOpen = false;
            this['childDatepicker'].resetView();
            this.notify('close');
        };
        Object.defineProperty(PopoverState.prototype, "isOpen", {
            get: function () {
                return this._isOpen;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PopoverState.prototype, "isVisible", {
            get: function () {
                return this._isOpen;
            },
            set: function (value) {
                if (value)
                    this.open();
                else
                    this.close();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PopoverState.prototype, "isSelecting", {
            get: function () {
                return this._isSelecting;
            },
            set: function (value) {
                this._isSelecting = value;
                if (!value && this.isOpen)
                    this.close();
            },
            enumerable: true,
            configurable: true
        });
        return PopoverState;
    }());
    var DatePickerDirective = /** @class */ (function () {
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
                    // } else if (this.isIOS) {
                    //     this.linkNativeElement($scope, $element, $attrs, $ngModel, $ctrl);
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
            var getVm = function (name) { return _this.controllerAs + "." + name; };
            var getAttr = function (name, value) { return name + "=\"" + value + "\""; };
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
            if ($element.is("label"))
                console.warn("[date-picker] Invalid link element, <label> is incapable of gaining :focus in Firefox/Safari", $element);
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
            return names.split(' ').map(function (name) { return name + ".datepicker" + $scope.$id; }).join(' ');
        };
        DatePickerDirective.prototype.popover = function ($scope, $element, $attrs, $ctrl) {
            var _this = this;
            var content, tether, $body = angular.element('body');
            var evt = function (names) { return _this.evt(names, $scope); };
            var events = {
                mousedown: evt('mousedown'),
                focus: evt('focus'),
                click: evt('click'),
                blur: evt('blur'),
                mouseup: evt('mouseup')
            };
            var state = new PopoverState($ctrl);
            state.onChange(function (newState, action) {
                //console.info('onChange', action, newState);
                switch (action) {
                    case 'close':
                        onClose();
                        break;
                    case 'open':
                        onOpen();
                        break;
                }
            });
            var listenOpen = function () {
                $element
                    .on(events.mousedown, onElementMouseDown)
                    .on(events.mouseup, onElementMouseUp);
                $body.off(events.mouseup);
            };
            var listenClose = function () {
                $element
                    .off(events.mousedown)
                    .off(events.mouseup);
                $body.one(events.mouseup, onBodyUp);
            };
            var onOpen = function () {
                if (!content) {
                    createContent();
                    content.on(events.mousedown, 'date-picker', onContentBodyMouseDown);
                    content.on(events.mouseup, 'date-picker', onContentBodyMouseUp);
                }
                $scope.$apply();
                if (tether) {
                    tether.position();
                }
                listenClose();
            };
            var onClose = function () {
                listenOpen();
            };
            var createContent = function () {
                content = _this.createDropDown($scope, $element, $attrs, $ctrl, state);
                $body.append(content);
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
            var preventElementBlur = function () {
                state.allowClose = false;
            };
            var enableElementBlur = function () {
                state.allowClose = true;
            };
            var onContentBodyMouseDown = function (e) {
                //console.info('onContentBodyMouseDown');
                preventElementBlur();
            };
            var onContentBodyMouseUp = function (e) {
                if (state.isSelecting)
                    return;
                //console.info('onContentBodyMouseUp');
                var preventBodyMouseUp = function () { return _this.preventDefault(e); };
                preventBodyMouseUp();
                $element.focus();
            };
            var onElementMouseDown = function (e) {
                //console.info('onElementMouseDown');
                var preventElementFocus = function () { return _this.preventDefault(e); };
                preventElementFocus();
            };
            var onElementMouseUp = function (e) {
                //console.info('onElementMouseUp');
                _this.preventDefault(e);
                $element.focus(); // now manually focus
            };
            var onElementFocus = function (e) {
                //console.info('onElementFocus', e);
                enableElementBlur();
                state.open();
            };
            var onElementBlur = function (e) {
                if (!state.allowClose)
                    return;
                //console.info('onElementBlur');
                state.close();
                $scope.$apply();
            };
            var onBodyUp = function (e) {
                enableElementBlur();
                if (state.isSelecting || !state.isOpen || $element.is(e.target))
                    return;
                //console.info('onBodyUp', e);
                state.close();
                $scope.$apply();
            };
            $element.on(events.focus, onElementFocus);
            $element.on(events.blur, onElementBlur);
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
            var singleDateBinding = "date=\"datepicker.date\" on-date-select=\"dropdown.setDate(date)\"", rangeBinding = "start=\"datepicker.start\" end=\"datepicker.end\" on-range-select=\"dropdown.setRange(start,end)\"", bindings = $ctrl.isSingleDate ? singleDateBinding : rangeBinding, template = "\n                    <div ng-class=\"{'datepicker-open':dropdown.isOpen}\">\n                        <date-picker \n                            min-view=\"" + $attrs['minView'] + "\" \n                            is-selecting=\"dropdown.isSelecting\" \n                            " + bindings + "\" \n                            highlighted=\"datepicker.highlighted\" \n                            default-date=\"{{dropdown.defaultDate}}\">\n                        </date-picker>\n                    </div>";
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
            localScope['childDatepicker'] = content.find(".datePicker").scope()['datepicker'];
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
                //console.info('day mousedown');
                _this.preventDefault(e);
                var range = new DatePickerMouseRange($ctrl, e);
                $ctrl.isSelecting = true;
                $scope.$apply();
                $body.one(mouseUp, function () {
                    //console.info('day body mouseup');
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
                //console.info('range mousedown');
                _this.preventDefault(e);
                var range = new DatePickerMouseRange($ctrl, e);
                $ctrl.isSelecting = true;
                $scope.$apply();
                $element.on(mouseOver, dayCss, function (e) {
                    //console.info('range mouseover');
                    _this.preventDefault(e);
                    range.setEnd(e);
                    onSelecting(range);
                });
                $body.one(mouseUp, function () {
                    //console.info('range body mouseup');
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
    var DatePickerRange = /** @class */ (function () {
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
    var DatePickerMonth = /** @class */ (function () {
        function DatePickerMonth(value) {
            this.value = value;
            var m = moment();
            var thisMonth = m.month();
            this.name = m.month(value).format('MMM');
            this.isCurrentMonth = value === thisMonth;
        }
        return DatePickerMonth;
    }());
    var DatePickerYear = /** @class */ (function () {
        function DatePickerYear(value) {
            this.value = value;
            this.isCurrentYear = value === moment().year();
        }
        return DatePickerYear;
    }());
    var DatePickerDay = /** @class */ (function () {
        function DatePickerDay(fromDate, dayOfWeek, today) {
            this.value = dayOfWeek.clone();
            this.isoDate = this.value.format("YYYY-DD-MM");
            this.date = this.value.date();
            this.isToday = dayOfWeek.isSame(today, 'day');
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
    var DatePickerService = /** @class */ (function () {
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
        DatePickerService.prototype.getWeek = function (fromDate, startOfWeek, today) {
            var endOfWeek = startOfWeek.clone().endOf('week');
            var days = new Array();
            for (var dayOfWeek = startOfWeek.clone(); dayOfWeek.isBefore(endOfWeek); dayOfWeek.add(1, 'days')) {
                days.push(new DatePickerDay(fromDate, dayOfWeek, today));
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
    var TimePickerController = /** @class */ (function () {
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
    var TimePickerDirective = /** @class */ (function () {
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
                        names[_i] = arguments[_i];
                    }
                    return names.map(function (name) { return name + "." + $scope.$id; }).join(' ');
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
    var TimePickerService = /** @class */ (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kYXRlcGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyIsIi4uL3NyYy9tb2JpbGUudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXIudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXItc2VydmljZS50cyIsIi4uL3NyYy90aW1lLXBpY2tlci50cyIsIi4uL3NyYy90aW1lLXBpY2tlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FDQW5DLElBQU8sZ0JBQWdCLENBc0J0QjtBQXRCRCxXQUFPLGdCQUFnQjtJQUNuQjtRQUFBO1FBZ0JBLENBQUM7UUFmVSxxQkFBUSxHQUFmO1lBQ0ksSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RSxJQUFJLEtBQUssR0FBRywwVEFBMFQsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFblYsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxLQUFLLEdBQUcseWtEQUF5a0QsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFeG1ELE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO1FBQzFCLENBQUM7UUFFTSxrQkFBSyxHQUFaO1lBQ0ksSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RSxJQUFJLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0wsbUJBQUM7SUFB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RCxDQUFDO1FBRUQscUNBQVMsR0FBVCxVQUFVLElBQVksRUFBRSxLQUFrQjtZQUFsQixzQkFBQSxFQUFBLFVBQWtCO1lBQ3RDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELENBQUM7UUFDTCx3QkFBQztJQUFELENBQUMsQUFwQkQsSUFvQkM7SUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ25GLENBQUMsRUEvQk0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQStCdEIiLCJzb3VyY2VzQ29udGVudCI6WyJBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiLCBbXSk7IiwibW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG4gICAgY2xhc3MgTW9iaWxlQ29uZmlnIHtcclxuICAgICAgICBzdGF0aWMgaXNNb2JpbGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBhZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3dbXCJvcGVyYVwiXTtcclxuICAgICAgICAgICAgdmFyIHRlc3QxID0gLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWluby9pLnRlc3QoYWdlbnQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFnZW50UHJlZml4ID0gYWdlbnQuc3Vic3RyKDAsIDQpO1xyXG4gICAgICAgICAgICB2YXIgdGVzdDIgPSAvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGFnZW50UHJlZml4KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0ZXN0MSB8fCB0ZXN0MjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBpc0lPUygpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvd1tcIm9wZXJhXCJdO1xyXG4gICAgICAgICAgICB2YXIgdGVzdDEgPSAvaVBob25lfGlQb2R8aVBhZC9pLnRlc3QoYWdlbnQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGVzdDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpXHJcbiAgICAgICAgLmNvbnN0YW50KCdpc01vYmlsZScsIE1vYmlsZUNvbmZpZy5pc01vYmlsZSgpKVxyXG4gICAgICAgIC5jb25zdGFudCgnaXNJT1MnLCBNb2JpbGVDb25maWcuaXNJT1MoKSk7XHJcbn0iLCJcclxubW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG4gICAgZGVjbGFyZSB2YXIgVGV0aGVyOiBhbnk7XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlck1vdXNlUmFuZ2Uge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRhdGVQaWNrZXJTZXJ2aWNlOiBJRGF0ZVBpY2tlclNlcnZpY2U7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyLCBlOiBKUXVlcnlFdmVudE9iamVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXJ0KGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEVuZChlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBib290c3RyYXAoZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZSkge1xyXG4gICAgICAgICAgICBEYXRlUGlja2VyTW91c2VSYW5nZS5kYXRlUGlja2VyU2VydmljZSA9IGRhdGVQaWNrZXJTZXJ2aWNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3RhcnQoZTogSlF1ZXJ5RXZlbnRPYmplY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IHRoaXMuZ2V0RWxlbWVudChlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEVuZChlOiBKUXVlcnlFdmVudE9iamVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IHRoaXMuZ2V0RWxlbWVudChlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldERheXMoKTogSURhdGVQaWNrZXJEYXlbXSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRheXMgPSBEYXRlUGlja2VyTW91c2VSYW5nZS5kYXRlUGlja2VyU2VydmljZS5nZXRSYW5nZURheXModGhpcy5zdGFydCwgdGhpcy5lbmQsIHRoaXMuJGN0cmwud2Vla3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RWxlbWVudChlOiBKUXVlcnlFdmVudE9iamVjdCk6IElEYXRlUGlja2VyRGF5IHtcclxuICAgICAgICAgICAgaWYgKCFlLnRhcmdldClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgJGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICBjb25zdCAkc2NvcGUgPSAkZWxlbWVudC5zY29wZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXkgPSAkc2NvcGVbJ2RheSddO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnQ6IElEYXRlUGlja2VyRGF5O1xyXG4gICAgICAgIGVuZDogSURhdGVQaWNrZXJEYXk7XHJcbiAgICB9XHJcblxyXG4gICAgZW51bSBEYXRlUGlja2VyVmlldyB7XHJcbiAgICAgICAgRGF5cyA9IDAsXHJcbiAgICAgICAgTW9udGhzID0gMSxcclxuICAgICAgICBZZWFycyA9IDJcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyQ29udHJvbGxlciB7XHJcblxyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnJGF0dHJzJywgJ2RhdGVQaWNrZXJTZXJ2aWNlJywgJ2lzTW9iaWxlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgcHJpdmF0ZSAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCBwcml2YXRlICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgcHJpdmF0ZSBkYXRlUGlja2VyU2VydmljZTogSURhdGVQaWNrZXJTZXJ2aWNlLCBwcml2YXRlIGlzTW9iaWxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIERhdGVQaWNrZXJNb3VzZVJhbmdlLmJvb3RzdHJhcChkYXRlUGlja2VyU2VydmljZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzU2luZ2xlRGF0ZSA9IHRoaXMuaXNNb2JpbGUgfHwgKCRhdHRyc1snc3RhcnQnXSA9PSBudWxsICYmICRhdHRyc1snZW5kJ10gPT0gbnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMubW9udGhOYW1lcyA9IGRhdGVQaWNrZXJTZXJ2aWNlLmdldE1vbnRocygpO1xyXG4gICAgICAgICAgICB0aGlzLmRheXNPZldlZWsgPSBkYXRlUGlja2VyU2VydmljZS5nZXREYXlzT2ZXZWVrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkb25Jbml0KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWZhdWx0RGF0ZSA9PSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0RGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcG9zdExpbmsoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWaWV3RGF0ZSh0aGlzLmRhdGUgfHwgdGhpcy5kZWZhdWx0RGF0ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuc3RhcnQgfHwgdGhpcy5kZWZhdWx0RGF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Vmlld1JhbmdlKHN0YXJ0LCB0aGlzLmVuZCB8fCBzdGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy4kYXR0cnNbJ21pblZpZXcnXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3LlllYXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3LlllYXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGhzJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5Nb250aHM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WaWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3LkRheXM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc2V0VmlldygpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0VmlldygpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXREYXRlSW50ZXJuYWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNpbmdsZSBEYXRlXHJcbiAgICAgICAgX2RhdGU6IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgcHVibGljIGdldCBkYXRlKCk6IHN0cmluZyB8IERhdGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBkYXRlKHZhbHVlOiBzdHJpbmcgfCBEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZSh2YWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmFuZ2VcclxuICAgICAgICBfc3RhcnQ6IHN0cmluZyB8IERhdGU7XHJcbiAgICAgICAgcHVibGljIGdldCBzdGFydCgpOiBzdHJpbmcgfCBEYXRlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IHN0YXJ0KHZhbHVlOiBzdHJpbmcgfCBEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UmFuZ2UodmFsdWUsIHRoaXMuX2VuZCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX2VuZDogc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICBwdWJsaWMgZ2V0IGVuZCgpOiBzdHJpbmcgfCBEYXRlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBlbmQodmFsdWU6IHN0cmluZyB8IERhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRSYW5nZSh0aGlzLl9zdGFydCwgdmFsdWUsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgbm90aWZ5OiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBoYXNDaGFuZ2VkID0gdGhpcy5fZGF0ZSAhPT0gZGF0ZTtcclxuICAgICAgICAgICAgaWYgKCFoYXNDaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBkYXRlO1xyXG4gICAgICAgICAgICBjb25zdCBlbmQgPSBkYXRlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gc3RhcnQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZCA9IGVuZDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZUludGVybmFsKGRhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXdEYXRlKGRhdGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFub3RpZnkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5vdGlmeUNoYW5nZXMoZGF0ZSwgc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRSYW5nZShzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBub3RpZnk6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc0NoYW5nZWQgPSB0aGlzLl9zdGFydCAhPT0gc3RhcnQgfHwgdGhpcy5fZW5kICE9PSBlbmQ7XHJcbiAgICAgICAgICAgIGlmICghaGFzQ2hhbmdlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBzdGFydDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGUgPSBkYXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydCA9IHN0YXJ0O1xyXG4gICAgICAgICAgICB0aGlzLl9lbmQgPSBlbmQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGVJbnRlcm5hbChkYXRlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWaWV3UmFuZ2Uoc3RhcnQsIGVuZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW5vdGlmeSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlcyhkYXRlLCBzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbm90aWZ5Q2hhbmdlcyhkYXRlOiBzdHJpbmcgfCBEYXRlLCBzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9uRGF0ZVNlbGVjdClcclxuICAgICAgICAgICAgICAgIHRoaXMub25EYXRlU2VsZWN0KHsgZGF0ZTogZGF0ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9uUmFuZ2VTZWxlY3QpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmFuZ2VTZWxlY3QoeyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfZGF0ZUludGVybmFsOiBtb21lbnQuTW9tZW50O1xyXG5cclxuICAgICAgICBnZXQgZGF0ZUludGVybmFsKCk6IG1vbWVudC5Nb21lbnQge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXREYXRlSW50ZXJuYWwoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVJbnRlcm5hbCA9ICh0aGlzLmlzU2luZ2xlRGF0ZSA/IHRoaXMuZGF0ZSA6IHRoaXMuc3RhcnQpIHx8IHRoaXMuZGVmYXVsdERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZUludGVybmFsKGRhdGVJbnRlcm5hbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKHRoaXMuX2RhdGVJbnRlcm5hbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vbWVudEZyb21WYWx1ZSh2YWx1ZTogc3RyaW5nIHwgRGF0ZSB8IG1vbWVudC5Nb21lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSAhPSBudWxsKSA/IG1vbWVudCh2YWx1ZSkgOiBtb21lbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0RGF0ZUludGVybmFsKHZhbHVlOiBzdHJpbmcgfCBEYXRlIHwgbW9tZW50Lk1vbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRlSW50ZXJuYWwgPSB0aGlzLm1vbWVudEZyb21WYWx1ZSh2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSh0aGlzLl9kYXRlSW50ZXJuYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjYWxjdWxhdGUoZnJvbURhdGU6IG1vbWVudC5Nb21lbnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBmcm9tRGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ21vbnRoJykuc3RhcnRPZignd2VlaycpLFxyXG4gICAgICAgICAgICAgICAgZW5kID0gZnJvbURhdGUuY2xvbmUoKS5lbmRPZignbW9udGgnKS5lbmRPZignd2VlaycpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgbm93ID0gbW9tZW50KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvZGF5ID0gbW9tZW50KG5vdy5mb3JtYXQoJ1lZWVktTU0tREQnKSwgJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgdGhpcy53ZWVrcyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlckRheVtdPigpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBkYXkgPSBzdGFydDsgZGF5LmlzQmVmb3JlKGVuZCk7IGRheSA9IGRheS5jbG9uZSgpLmFkZCgxLCAnd2VlaycpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3ZWVrID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5nZXRXZWVrKGZyb21EYXRlLCBkYXksIHRvZGF5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2Vla3MucHVzaCh3ZWVrKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy55ZWFycyA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0WWVhcnMoZnJvbURhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEhpZ2hsaWdodHModGhpcy5oaWdobGlnaHRlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWQodGhpcy5zdGFydCwgdGhpcy5lbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0Vmlld0RhdGUoZGF0ZSkge1xyXG4gICAgICAgICAgICAvLyBvdmVycmlkZSBpbiBsaW5rIGZ1bmN0aW9uc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNldFZpZXdSYW5nZShzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgICAgIC8vIG92ZXJyaWRlIGluIGxpbmsgZnVuY3Rpb25zXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZ2V0IHRpdGxlKCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuRGF5czpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsLmZvcm1hdCgnTU1NTSBZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3Lk1vbnRoczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsLmZvcm1hdCgnWVlZWScpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5ZZWFyczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlbGVjdCBhIHllYXInO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdmlld1R5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuTW9udGhzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm1vbnRoc1wiO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5ZZWFyczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ5ZWFyc1wiO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuRGF5czpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJkYXlzXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dEYXlzKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID4gRGF0ZVBpY2tlclZpZXcuRGF5cylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuRGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dNb250aHMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPiBEYXRlUGlja2VyVmlldy5Nb250aHMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3Lk1vbnRocztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dZZWFycygpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuWWVhcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTZWxlY3RlZChzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2Vla3MuZm9yRWFjaCh3ZWVrID0+IHtcclxuICAgICAgICAgICAgICAgIHdlZWsuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRheS5pc1NlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKHN0YXJ0LCBlbmQsIGRheSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1NlbGVjdGVkKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRheTogSURhdGVQaWNrZXJEYXkpIHtcclxuICAgICAgICAgICAgaWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXkudmFsdWUuaXNCZXR3ZWVuKHN0YXJ0LCBlbmQsICdkYXknKSB8fFxyXG4gICAgICAgICAgICAgICAgZGF5LnZhbHVlLmlzU2FtZShzdGFydCwgJ2RheScpIHx8XHJcbiAgICAgICAgICAgICAgICBkYXkudmFsdWUuaXNTYW1lKGVuZCwgJ2RheScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0SGlnaGxpZ2h0cyhoaWdobGlnaHRzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgICAgICB0aGlzLndlZWtzLmZvckVhY2god2VlayA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZWVrLmZvckVhY2goZGF5ID0+IGRheS5pc0hpZ2hsaWdodGVkID0gdGhpcy5pc0hpZ2hsaWdodGVkKGhpZ2hsaWdodHMsIGRheSkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNIaWdobGlnaHRlZChoaWdobGlnaHRzOiBzdHJpbmdbXSwgZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBpZiAoaGlnaGxpZ2h0cyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXNvSGlnaGxpZ2h0cyA9IGhpZ2hsaWdodHMubWFwKHZhbHVlID0+IG1vbWVudCh2YWx1ZSkuZm9ybWF0KCdZWVlZLURELU1NJykpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpc29IaWdobGlnaHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc29EYXRlID0gaXNvSGlnaGxpZ2h0c1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChpc29EYXRlID09PSBkYXkuaXNvRGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RpbmcoZGF5czogSURhdGVQaWNrZXJEYXlbXSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmRlc2VsZWN0QWxsKHRoaXMud2Vla3MpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnNlbGVjdERheXMoZGF5cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZChkYXlzOiBJRGF0ZVBpY2tlckRheVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZGVzZWxlY3RBbGwodGhpcy53ZWVrcyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGRheXNbMF07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUoc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbmQgPSBkYXlzW2RheXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkRGF0ZShkYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBtb21lbnQoZGF5LnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGUoZGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZFJhbmdlKHN0YXJ0RGF5OiBJRGF0ZVBpY2tlckRheSwgZW5kRGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IG1vbWVudChzdGFydERheS52YWx1ZSkuZm9ybWF0KHRoaXMuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgY29uc3QgZW5kID0gbW9tZW50KGVuZERheS52YWx1ZSkuZm9ybWF0KHRoaXMuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdE1vbnRoKGlkeCkge1xyXG4gICAgICAgICAgICBjb25zdCBtb250aCA9IHRoaXMubW9udGhOYW1lc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vbnRoKG1vbnRoLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA9PT0gRGF0ZVBpY2tlclZpZXcuTW9udGhzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRlKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuZGF0ZUludGVybmFsLmNsb25lKCkuZW5kT2YoJ21vbnRoJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5kID0gdGhpcy5kYXRlSW50ZXJuYWwuY2xvbmUoKS5lbmRPZignbW9udGgnKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93RGF5cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0WWVhcihpZHgpIHtcclxuICAgICAgICAgICAgY29uc3QgeWVhciA9IHRoaXMueWVhcnNbaWR4XTtcclxuICAgICAgICAgICAgdGhpcy5zZXRZZWFyKHllYXIudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID09PSBEYXRlUGlja2VyVmlldy5ZZWFycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuZGF0ZUludGVybmFsLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0ZShkYXRlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmRhdGVJbnRlcm5hbC5jbG9uZSgpLnN0YXJ0T2YoJ3llYXInKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSB0aGlzLmRhdGVJbnRlcm5hbC5jbG9uZSgpLmVuZE9mKCd5ZWFyJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vbnRocygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEYXRlKGFjdGlvbjogKGRhdGU6IG1vbWVudC5Nb21lbnQpID0+IG1vbWVudC5Nb21lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRlSW50ZXJuYWwoYWN0aW9uKHRoaXMuZGF0ZUludGVybmFsLmNsb25lKCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzTW9udGgobW9udGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUludGVybmFsLm1vbnRoKCkgPT0gbW9udGgudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRNb250aChtb250aCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLnNldCgnbW9udGgnLCBtb250aCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNZZWFyKHllYXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUludGVybmFsLnllYXIoKSA9PSB5ZWFyLnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0WWVhcih5ZWFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0ZShkYXRlID0+IGRhdGUuc2V0KCd5ZWFyJywgeWVhcikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldk1vbnRoKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLnN1YnRyYWN0KDEsICdtb250aHMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0TW9udGgoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0ZShkYXRlID0+IGRhdGUuYWRkKDEsICdtb250aHMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2WWVhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlKGRhdGUgPT4gZGF0ZS5zdWJ0cmFjdCgxLCAneWVhcnMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0WWVhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlKGRhdGUgPT4gZGF0ZS5hZGQoMSwgJ3llYXJzJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldlJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLnN1YnRyYWN0KDksICd5ZWFycycpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5leHRSYW5nZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlKGRhdGUgPT4gZGF0ZS5hZGQoOSwgJ3llYXJzJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25EYXRlU2VsZWN0O1xyXG4gICAgICAgIG9uUmFuZ2VTZWxlY3Q7XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgdmlldzogRGF0ZVBpY2tlclZpZXc7XHJcbiAgICAgICAgbWluVmlldzogRGF0ZVBpY2tlclZpZXc7XHJcbiAgICAgICAgd2Vla3M6IElEYXRlUGlja2VyRGF5W11bXTtcclxuICAgICAgICB5ZWFyczogSURhdGVQaWNrZXJZZWFyW107XHJcbiAgICAgICAgbW9udGhOYW1lczogSURhdGVQaWNrZXJNb250aFtdO1xyXG4gICAgICAgIGRheXNPZldlZWs6IHN0cmluZ1tdO1xyXG4gICAgICAgIGlzVmlzaWJsZTogYm9vbGVhbjtcclxuICAgICAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcclxuICAgICAgICBpc29Gb3JtYXQgPSAnWVlZWS1NTS1ERCc7XHJcbiAgICAgICAgaXNTaW5nbGVEYXRlOiBib29sZWFuO1xyXG4gICAgICAgIGhpZ2hsaWdodGVkOiBzdHJpbmdbXTtcclxuICAgICAgICBkZWZhdWx0RGF0ZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBjbGllbnREYXRlOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuY29udHJvbGxlcignZGF0ZVBpY2tlcicsIERhdGVQaWNrZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICBpbnRlcmZhY2UgSVBvcG92ZXJTdGF0ZSB7XHJcbiAgICAgICAgaXNPcGVuOiBib29sZWFuO1xyXG4gICAgICAgIHNldERhdGU6IChkYXRlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICAgICAgc2V0UmFuZ2U6IChzdGFydDogc3RyaW5nLCBlbmQ6IHN0cmluZykgPT4gdm9pZDtcclxuICAgICAgICBpc1NlbGVjdGluZzogYm9vbGVhbjtcclxuICAgICAgICBpc1Zpc2libGU6IGJvb2xlYW47XHJcbiAgICAgICAgYWxsb3dDbG9zZTogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQb3BvdmVyU3RhdGUgaW1wbGVtZW50cyBJUG9wb3ZlclN0YXRlIHtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5faXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hbGxvd0Nsb3NlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBkZWZhdWx0RGF0ZSgpOiBzdHJpbmcgfCBEYXRlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGN0cmwuZGVmYXVsdERhdGUgfHwgbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9vbkNoYW5nZTogKHN0YXRlOiBQb3BvdmVyU3RhdGUsIGFjdGlvbjogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgICAgIG9uQ2hhbmdlKGZuOiAoc3RhdGU6IFBvcG92ZXJTdGF0ZSwgYWN0aW9uOiBzdHJpbmcpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbm90aWZ5KGFjdGlvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fb25DaGFuZ2UpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMsIGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXREYXRlKGRhdGU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLiRjdHJsLnNldERhdGUoZGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFJhbmdlKHN0YXJ0OiBzdHJpbmcsIGVuZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGN0cmwuc2V0UmFuZ2Uoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wZW4oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KCdvcGVuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbG9zZSgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmFsbG93Q2xvc2UpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzWydjaGlsZERhdGVwaWNrZXInXS5yZXNldFZpZXcoKTtcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnkoJ2Nsb3NlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9pc09wZW46IGJvb2xlYW47XHJcbiAgICAgICAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpc1Zpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc09wZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBpc1Zpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB0aGlzLm9wZW4oKTtcclxuICAgICAgICAgICAgZWxzZSB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9pc1NlbGVjdGluZzogYm9vbGVhbjtcclxuICAgICAgICBnZXQgaXNTZWxlY3RpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1NlbGVjdGluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IGlzU2VsZWN0aW5nKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzU2VsZWN0aW5nID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICghdmFsdWUgJiYgdGhpcy5pc09wZW4pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbGxvd0Nsb3NlOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckaW5qZWN0b3InLCAnJGNvbXBpbGUnLCAnJHRlbXBsYXRlQ2FjaGUnLCAnJHRpbWVvdXQnLCAnJHdpbmRvdycsICdkYXRlUGlja2VyU2VydmljZScsICdpc01vYmlsZScsICdpc0lPUyddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRpbmplY3RvciwgcHJpdmF0ZSAkY29tcGlsZSwgcHJpdmF0ZSAkdGVtcGxhdGVDYWNoZSwgcHJpdmF0ZSAkdGltZW91dCwgcHJpdmF0ZSAkd2luZG93LCBwcml2YXRlIGRhdGVQaWNrZXJTZXJ2aWNlOiBJRGF0ZVBpY2tlclNlcnZpY2UsIHByaXZhdGUgaXNNb2JpbGU6IGJvb2xlYW4sIHByaXZhdGUgaXNJT1M6IGJvb2xlYW4pIHsgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdBRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsnZGF0ZVBpY2tlcicsICc/bmdNb2RlbCddO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBEYXRlUGlja2VyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAnZGF0ZXBpY2tlcic7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIC8vIFNpbmdsZSBEYXRlXHJcbiAgICAgICAgICAgIGRhdGU6ICc9PycsXHJcbiAgICAgICAgICAgIG9uRGF0ZVNlbGVjdDogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gUmFuZ2VcclxuICAgICAgICAgICAgc3RhcnQ6ICc9PycsXHJcbiAgICAgICAgICAgIGVuZDogJz0/JyxcclxuICAgICAgICAgICAgb25SYW5nZVNlbGVjdDogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gT3RoZXJcclxuICAgICAgICAgICAgaXNTZWxlY3Rpbmc6ICc9PycsXHJcbiAgICAgICAgICAgIGRlZmF1bHREYXRlOiAnQD8nLFxyXG4gICAgICAgICAgICBvbkNoYW5nZTogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gQ29sbGVjdGlvbiBvZiBkYXRlIHN0cmluZ3MgKGllLiBbJzIwMTItMTItMDEnLCcyMDEyLTEyLTAyJ11cclxuICAgICAgICAgICAgaGlnaGxpZ2h0ZWQ6ICc9PydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYWxlbmRhclRlbXBsYXRlID0gJ2RhdGUtcGlja2VyLmh0bWwnO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgWyRjdHJsLCAkbmdNb2RlbF06IFtEYXRlUGlja2VyQ29udHJvbGxlciwgYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXJdKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlUZXRoZXJGaXgoJGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua01vYmlsZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtEZXNrdG9wKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmtNb2JpbGUgPSAoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCAkbmdNb2RlbDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0lucHV0KCRlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rTmF0aXZlSW5wdXQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNFbGVtZW50KCRlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rSW5saW5lKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKTtcclxuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAodGhpcy5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMubGlua05hdGl2ZUVsZW1lbnQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rRWxlbWVudCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpbmtEZXNrdG9wID0gKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgJG5nTW9kZWw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyLCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnB1dCgkZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua0lucHV0KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNFbGVtZW50KCRlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rSW5saW5lKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua0VsZW1lbnQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXR1cFNlbGVjdGlvbnMoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGlmICgkY3RybC5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBEYXlTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cFJhbmdlU2VsZWN0KCRzY29wZSwgJGVsZW1lbnQsICRjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNJbnB1dCgkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5pcygnaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzRWxlbWVudCgkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5pcygnZGF0ZS1waWNrZXInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpeGVzIGEgYnVnIHdoZXJlIFRldGhlciBjYW5ub3QgY29ycmVjdGx5IGdldCB3aWR0aC9oZWlnaHQgYmVjYXVzZSBvZiBuZ0FuaW1hdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHBseVRldGhlckZpeCgkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIHZhciAkYW5pbWF0ZSA9IHRoaXMuJGluamVjdG9yLmdldCgnJGFuaW1hdGUnKTtcclxuICAgICAgICAgICAgaWYgKCRhbmltYXRlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAkYW5pbWF0ZS5lbmFibGVkKGZhbHNlLCAkZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rTmF0aXZlSW5wdXQoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCAkbmdNb2RlbDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXQgPSAoZGF0ZSwgcGF0dGVybik6IHN0cmluZyA9PiAoZGF0ZSA9PSBudWxsKSA/ICcnIDogbW9tZW50KGRhdGUpLmZvcm1hdChwYXR0ZXJuKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZUZvcm1hdCA9IChkYXRlKSA9PiBmb3JtYXQoZGF0ZSwgXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBtb250aEZvcm1hdCA9IChkYXRlKSA9PiBmb3JtYXQoZGF0ZSwgXCJZWVlZLU1NXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlciA9IGRhdGVGb3JtYXQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGF0dHJzWydtaW5WaWV3J10gPT0gXCJtb250aHNcIikge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwibW9udGhcIjtcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlciA9IG1vbnRoRm9ybWF0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXRWaWV3RGF0ZSA9IChkYXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNvID0gZm9ybWF0dGVyKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWwuJHNldFZpZXdWYWx1ZShpc28pO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQucHJvcChcInR5cGVcIiwgdHlwZSk7XHJcbiAgICAgICAgICAgICRjdHJsLnNldFZpZXdEYXRlID0gc2V0Vmlld0RhdGU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXREYXRlRnJvbVZpZXcgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlld1ZhbHVlID0gbW9tZW50KCRuZ01vZGVsLiR2aWV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHZpZXdWYWx1ZS5pc1ZhbGlkKCkgPyBkYXRlRm9ybWF0KCRuZ01vZGVsLiR2aWV3VmFsdWUpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgICRjdHJsLnNldERhdGUoZGF0ZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5pc0lPUykge1xyXG4gICAgICAgICAgICAvLyAgICAgJGVsZW1lbnQub24oYGJsdXIuJHskc2NvcGUuJGlkfWAsIHNldERhdGVGcm9tVmlldyk7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRuZ01vZGVsLiR2aWV3Q2hhbmdlTGlzdGVuZXJzLnB1c2goc2V0RGF0ZUZyb21WaWV3KTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rSW5wdXQoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCBuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXQgPSAoZGF0ZTogbW9tZW50Lk1vbWVudCkgPT4gZGF0ZS5mb3JtYXQoXCJMXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2V0Vmlld0RhdGUgPSAoZGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSBkYXRlID09IG51bGwgPyAnJyA6IGZvcm1hdChtb21lbnQoZGF0ZSkpO1xyXG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh0ZXh0KTtcclxuICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNldFZpZXdSYW5nZSA9IChzdGFydCwgZW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0ICE9IG51bGwgJiYgZW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbVN0YXJ0ID0gbW9tZW50KHN0YXJ0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbUVuZCA9IG1vbWVudChlbmQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobVN0YXJ0LmlzU2FtZShlbmQsICdkYXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gZm9ybWF0KG1TdGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGAke2Zvcm1hdChtU3RhcnQpfSAtICR7Zm9ybWF0KG1FbmQpfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBmb3JtYXQobW9tZW50KGVuZCkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBmb3JtYXQobW9tZW50KGVuZCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodGV4dCk7XHJcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkY3RybC5zZXRWaWV3RGF0ZSA9IHNldFZpZXdEYXRlO1xyXG4gICAgICAgICAgICAkY3RybC5zZXRWaWV3UmFuZ2UgPSBzZXRWaWV3UmFuZ2U7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgY2hhbmdlLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb01vbWVudChuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRlLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY3RybC5zZXREYXRlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0ZS5pc1NhbWUoJGN0cmwuZGF0ZSwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLnNldERhdGUoZGF0ZS5mb3JtYXQoJGN0cmwuaXNvRm9ybWF0KSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5pbnB1dFRvUmFuZ2UobmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYW5nZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjdHJsLnNldFJhbmdlKG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IG1vbWVudChyYW5nZS5zdGFydCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSBtb21lbnQocmFuZ2UuZW5kKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RhcnQuaXNWYWxpZCgpIHx8ICFlbmQuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY3RybC5zZXRSYW5nZShudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0LmlzU2FtZSgkY3RybC5zdGFydCwgJ2RheScpICYmIGVuZC5pc1NhbWUoJGN0cmwuZW5kLCAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY3RybC5zZXRSYW5nZShyYW5nZS5zdGFydCwgcmFuZ2UuZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBrZXlkb3duLiR7JHNjb3BlLiRpZH1gLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghJGN0cmwuaXNWaXNpYmxlIHx8ICF0aGlzLmlzRXNjYXBlKGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wb3BvdmVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua05hdGl2ZUVsZW1lbnQoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCBuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRhYkluZGV4KCRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdldFZtID0gKG5hbWUpID0+IGAke3RoaXMuY29udHJvbGxlckFzfS4ke25hbWV9YDtcclxuICAgICAgICAgICAgY29uc3QgZ2V0QXR0ciA9IChuYW1lLCB2YWx1ZSkgPT4gYCR7bmFtZX09XCIke3ZhbHVlfVwiYFxyXG4gICAgICAgICAgICBjb25zdCBnZXRWbUF0dHIgPSAobmFtZSwgdmFsdWUpID0+IGdldEF0dHIobmFtZSwgZ2V0Vm0odmFsdWUpKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIFR5cGVCdWlsZGVyKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRycyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgX2J1aWxkZXIgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQXR0ciA9IChuYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMucHVzaChnZXRBdHRyKG5hbWUsIHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9idWlsZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTGl0ZXJhbCA9IChuYW1lLCBhdHRyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAkYXR0cnNbYXR0cl0gIT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRycy5wdXNoKGdldEF0dHIobmFtZSwgJGF0dHJzW2F0dHJdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9idWlsZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQmluZGluZyA9IChuYW1lLCBhdHRyLCBjdHJsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyID09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHIgPSAkYXR0cnNbYXR0cl07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyICE9IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMucHVzaChnZXRWbUF0dHIobmFtZSwgY3RybCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYnVpbGRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFByb3h5ID0gKG5hbWU6IHN0cmluZywgZm46IEZ1bmN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmxbbmFtZV0gPSBmbjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2J1aWxkZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudCA9IChuYW1lLCBhdHRyLCBjdHJsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAkYXR0cnNbYXR0cl0gIT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRycy5wdXNoKGdldFZtQXR0cihuYW1lLCBjdHJsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9idWlsZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGA8aW5wdXQgZGF0ZS1waWNrZXIgJHt0aGlzLmF0dHJzLmpvaW4oJyAnKX0+YDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGN0cmxbJ19fZGF0ZSddID0gJGN0cmwuZGF0ZTtcclxuICAgICAgICAgICAgJGN0cmxbJ19fc3RhcnQnXSA9ICRjdHJsLmRhdGU7XHJcbiAgICAgICAgICAgICRjdHJsWydfX2VuZCddID0gJGN0cmwuZGF0ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJ1aWxkZXIgPSBuZXcgVHlwZUJ1aWxkZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFkZEF0dHIoXCJ0eXBlXCIsIFwidGV4dFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZExpdGVyYWwoXCJtaW4tdmlld1wiLCBcIm1pblZpZXdcIilcclxuICAgICAgICAgICAgICAgIC5hZGRCaW5kaW5nKFwibmctbW9kZWxcIiwgdHJ1ZSwgXCJkYXRlU3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQmluZGluZyhcImRhdGVcIiwgXCJkYXRlXCIsIFwiX19kYXRlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQmluZGluZyhcInN0YXJ0XCIsIFwic3RhcnRcIiwgXCJfX3N0YXJ0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQmluZGluZyhcImVuZFwiLCBcImVuZFwiLCBcIl9fZW5kXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkQmluZGluZyhcImlzLXNlbGVjdGluZ1wiLCBcImlzU2VsZWN0aW5nXCIsIFwiaXNTZWxlY3RpbmdcIilcclxuICAgICAgICAgICAgICAgIC5hZGRMaXRlcmFsKFwiZGVmYXVsdC1kYXRlXCIsIFwiZGVmYXVsdERhdGVcIilcclxuICAgICAgICAgICAgICAgIC5hZGRCaW5kaW5nKFwiaGlnaGxpZ2h0ZWRcIiwgXCJoaWdobGlnaHRlZFwiLCBcImhpZ2hsaWdodGVkXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGJ1aWxkZXIuYnVpbGQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRpbnB1dCA9IGFuZ3VsYXIuZWxlbWVudChjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdkYXRlcGlja2VyLWxpbmtOYXRpdmVFbGVtZW50LWlucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgJGlucHV0Lm9uKGBibHVyLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2V0RGF0ZSgkY3RybFsnX19kYXRlJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGNvbXBpbGUoJGlucHV0KSgkc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ2RhdGVwaWNrZXItbGlua05hdGl2ZUVsZW1lbnQnKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoXCJocmVmXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCRpbnB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rRWxlbWVudCgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsIG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGlmKCRlbGVtZW50LmlzKFwibGFiZWxcIikpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbZGF0ZS1waWNrZXJdIEludmFsaWQgbGluayBlbGVtZW50LCA8bGFiZWw+IGlzIGluY2FwYWJsZSBvZiBnYWluaW5nIDpmb2N1cyBpbiBGaXJlZm94L1NhZmFyaVwiLCAkZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGFiSW5kZXgoJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rSW5saW5lKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyLCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuY3JlYXRlQ29udGVudCgkc2NvcGUsICRlbGVtZW50LCAkY3RybCk7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRhYkluZGV4KCRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gJGVsZW1lbnQuZ2V0KDApO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRhYkluZGV4ID0gY3VycmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIik7XHJcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LnNldEF0dHJpYnV0ZShcInRhYkluZGV4XCIsIGN1cnJlbnRUYWJJbmRleCAhPSBudWxsID8gY3VycmVudFRhYkluZGV4IDogXCItMVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV2dChuYW1lczogc3RyaW5nLCAkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lcy5zcGxpdCgnICcpLm1hcChuYW1lID0+IGAke25hbWV9LmRhdGVwaWNrZXIkeyRzY29wZS4kaWR9YCkuam9pbignICcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcG9wb3Zlcigkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB2YXIgY29udGVudCwgdGV0aGVyLCAkYm9keTogYW55ID0gYW5ndWxhci5lbGVtZW50KCdib2R5Jyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBldnQgPSAobmFtZXM6IHN0cmluZykgPT4gdGhpcy5ldnQobmFtZXMsICRzY29wZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICAgICAgICAgIG1vdXNlZG93bjogZXZ0KCdtb3VzZWRvd24nKSxcclxuICAgICAgICAgICAgICAgIGZvY3VzOiBldnQoJ2ZvY3VzJyksXHJcbiAgICAgICAgICAgICAgICBjbGljazogZXZ0KCdjbGljaycpLFxyXG4gICAgICAgICAgICAgICAgYmx1cjogZXZ0KCdibHVyJyksXHJcbiAgICAgICAgICAgICAgICBtb3VzZXVwOiBldnQoJ21vdXNldXAnKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBuZXcgUG9wb3ZlclN0YXRlKCRjdHJsKTtcclxuICAgICAgICAgICAgc3RhdGUub25DaGFuZ2UoKG5ld1N0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKCdvbkNoYW5nZScsIGFjdGlvbiwgbmV3U3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdjbG9zZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnb3Blbic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uT3BlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5PcGVuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAub24oZXZlbnRzLm1vdXNlZG93biwgb25FbGVtZW50TW91c2VEb3duKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihldmVudHMubW91c2V1cCwgb25FbGVtZW50TW91c2VVcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJvZHkub2ZmKGV2ZW50cy5tb3VzZXVwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgbGlzdGVuQ2xvc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgIC5vZmYoZXZlbnRzLm1vdXNlZG93bilcclxuICAgICAgICAgICAgICAgICAgICAub2ZmKGV2ZW50cy5tb3VzZXVwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYm9keS5vbmUoZXZlbnRzLm1vdXNldXAsIG9uQm9keVVwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25PcGVuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQub24oZXZlbnRzLm1vdXNlZG93biwgJ2RhdGUtcGlja2VyJywgb25Db250ZW50Qm9keU1vdXNlRG93bik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5vbihldmVudHMubW91c2V1cCwgJ2RhdGUtcGlja2VyJywgb25Db250ZW50Qm9keU1vdXNlVXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGV0aGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV0aGVyLnBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGlzdGVuQ2xvc2UoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5PcGVuKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVDb250ZW50ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IHRoaXMuY3JlYXRlRHJvcERvd24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgJGJvZHkuYXBwZW5kKGNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTW9iaWxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZXRoZXIgPSBuZXcgVGV0aGVyKHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICRlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEF0dGFjaG1lbnQ6ICdib3R0b20gY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b3AgY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc1ByZWZpeDogJ2RhdGVwaWNrZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldE9mZnNldDogJzE0cHggMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86ICd3aW5kb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudDogJ3RvZ2V0aGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpbjogWyd0b3AnLCAnbGVmdCcsICdib3R0b20nLCAncmlnaHQnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHByZXZlbnRFbGVtZW50Qmx1ciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLmFsbG93Q2xvc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZW5hYmxlRWxlbWVudEJsdXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5hbGxvd0Nsb3NlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25Db250ZW50Qm9keU1vdXNlRG93biA9IChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ29uQ29udGVudEJvZHlNb3VzZURvd24nKTtcclxuICAgICAgICAgICAgICAgIHByZXZlbnRFbGVtZW50Qmx1cigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25Db250ZW50Qm9keU1vdXNlVXAgPSAoZTogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5pc1NlbGVjdGluZylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ29uQ29udGVudEJvZHlNb3VzZVVwJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2ZW50Qm9keU1vdXNlVXAgPSAoKSA9PiB0aGlzLnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgICAgICAgcHJldmVudEJvZHlNb3VzZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25FbGVtZW50TW91c2VEb3duID0gKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUuaW5mbygnb25FbGVtZW50TW91c2VEb3duJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2ZW50RWxlbWVudEZvY3VzID0gKCkgPT4gdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIHByZXZlbnRFbGVtZW50Rm9jdXMoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9uRWxlbWVudE1vdXNlVXAgPSAoZTogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKCdvbkVsZW1lbnRNb3VzZVVwJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9jdXMoKTsgLy8gbm93IG1hbnVhbGx5IGZvY3VzXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvbkVsZW1lbnRGb2N1cyA9IChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ29uRWxlbWVudEZvY3VzJywgZSk7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVFbGVtZW50Qmx1cigpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUub3BlbigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25FbGVtZW50Qmx1ciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXRlLmFsbG93Q2xvc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ29uRWxlbWVudEJsdXInKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvbkJvZHlVcCA9IChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlRWxlbWVudEJsdXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuaXNTZWxlY3RpbmcgfHwgIXN0YXRlLmlzT3BlbiB8fCAkZWxlbWVudC5pcyhlLnRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ29uQm9keVVwJywgZSk7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGV2ZW50cy5mb2N1cywgb25FbGVtZW50Rm9jdXMpO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihldmVudHMuYmx1ciwgb25FbGVtZW50Qmx1cik7XHJcbiAgICAgICAgICAgIGxpc3Rlbk9wZW4oKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGJvZHkub2ZmKGV2ZW50cy5jbGljayk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudCkgY29udGVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVEcm9wRG93bihzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyLCBsb2NhbFNjb3BlOiBQb3BvdmVyU3RhdGUpOiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkge1xyXG4gICAgICAgICAgICBzY29wZVsnZHJvcGRvd24nXSA9IGxvY2FsU2NvcGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVwaWNrZXIgPSB0aGlzLmNvbnRyb2xsZXJBcztcclxuXHJcbiAgICAgICAgICAgIHZhciBzaW5nbGVEYXRlQmluZGluZyA9IGBkYXRlPVwiZGF0ZXBpY2tlci5kYXRlXCIgb24tZGF0ZS1zZWxlY3Q9XCJkcm9wZG93bi5zZXREYXRlKGRhdGUpXCJgLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2VCaW5kaW5nID0gYHN0YXJ0PVwiZGF0ZXBpY2tlci5zdGFydFwiIGVuZD1cImRhdGVwaWNrZXIuZW5kXCIgb24tcmFuZ2Utc2VsZWN0PVwiZHJvcGRvd24uc2V0UmFuZ2Uoc3RhcnQsZW5kKVwiYCxcclxuICAgICAgICAgICAgICAgIGJpbmRpbmdzID0gJGN0cmwuaXNTaW5nbGVEYXRlID8gc2luZ2xlRGF0ZUJpbmRpbmcgOiByYW5nZUJpbmRpbmcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IG5nLWNsYXNzPVwieydkYXRlcGlja2VyLW9wZW4nOmRyb3Bkb3duLmlzT3Blbn1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRhdGUtcGlja2VyIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluLXZpZXc9XCIkeyRhdHRyc1snbWluVmlldyddfVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMtc2VsZWN0aW5nPVwiZHJvcGRvd24uaXNTZWxlY3RpbmdcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7YmluZGluZ3N9XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHRlZD1cImRhdGVwaWNrZXIuaGlnaGxpZ2h0ZWRcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQtZGF0ZT1cInt7ZHJvcGRvd24uZGVmYXVsdERhdGV9fVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2RhdGUtcGlja2VyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgY29udGVudC5hZGRDbGFzcyhcImRhdGVwaWNrZXItZHJvcGRvd25cIik7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5hZGRDbGFzcyhcImRhdGVwaWNrZXItZHJvcGRvd24tLWlzTW9iaWxlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSAkZWxlbWVudC5wb3NpdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9ICRlbGVtZW50Lm91dGVySGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luID0gKCRlbGVtZW50Lm91dGVySGVpZ2h0KHRydWUpIC0gaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBtYXJnaW4gLyAyICsgaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHBvc2l0aW9uLnRvcCArIG9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBwb3NpdGlvbi5sZWZ0XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZShjb250ZW50KShzY29wZSk7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFNjb3BlWydjaGlsZERhdGVwaWNrZXInXSA9IGNvbnRlbnQuZmluZChcIi5kYXRlUGlja2VyXCIpLnNjb3BlKClbJ2RhdGVwaWNrZXInXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldmVudERlZmF1bHQoZTogSlF1ZXJ5LkV2ZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNFc2NhcGUoZTogSlF1ZXJ5LkV2ZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSAyNztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbnRlbnQoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKTogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLiR0ZW1wbGF0ZUNhY2hlLmdldCh0aGlzLmNhbGVuZGFyVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZShjb250ZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwU2VsZWN0aW9ucygkc2NvcGUsICRlbGVtZW50LCAkY3RybCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0dXBEYXlTZWxlY3QoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRheUNzcyA9ICcuZGF0ZVBpY2tlckRheXMtZGF5JyxcclxuICAgICAgICAgICAgICAgICRib2R5OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIG1vdXNlRG93biA9IHRoaXMuZXZ0KCdtb3VzZWRvd24gdG91Y2hzdGFydCcsICRzY29wZSksXHJcbiAgICAgICAgICAgICAgICBtb3VzZVVwID0gdGhpcy5ldnQoJ21vdXNldXAgdG91Y2hlbmQnLCAkc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25TZWxlY3RlZCA9IChyYW5nZTogRGF0ZVBpY2tlck1vdXNlUmFuZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXlzID0gcmFuZ2UuZ2V0RGF5cygpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0ZWQoZGF5cyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihtb3VzZURvd24sIGRheUNzcywgKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUuaW5mbygnZGF5IG1vdXNlZG93bicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gbmV3IERhdGVQaWNrZXJNb3VzZVJhbmdlKCRjdHJsLCBlKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLmlzU2VsZWN0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYm9keS5vbmUobW91c2VVcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKCdkYXkgYm9keSBtb3VzZXVwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldHVwUmFuZ2VTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRib2R5OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIG1vdXNlRG93biA9IHRoaXMuZXZ0KCdtb3VzZWRvd24gdG91Y2hzdGFydCcsICRzY29wZSksXHJcbiAgICAgICAgICAgICAgICBtb3VzZU92ZXIgPSB0aGlzLmV2dCgnbW91c2VvdmVyIHRvdWNoZW5kJywgJHNjb3BlKSxcclxuICAgICAgICAgICAgICAgIG1vdXNlVXAgPSB0aGlzLmV2dCgnbW91c2V1cCcsICRzY29wZSksXHJcbiAgICAgICAgICAgICAgICBkYXlDc3MgPSAnLmRhdGVQaWNrZXJEYXlzLWRheSc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvblNlbGVjdGluZyA9IChyYW5nZTogRGF0ZVBpY2tlck1vdXNlUmFuZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRheXMgPSByYW5nZS5nZXREYXlzKCk7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3RpbmcoZGF5cyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvblNlbGVjdGVkID0gKHJhbmdlOiBEYXRlUGlja2VyTW91c2VSYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF5cyA9IHJhbmdlLmdldERheXMoKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdGVkKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VEb3duLCBkYXlDc3MsIChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ3JhbmdlIG1vdXNlZG93bicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gbmV3IERhdGVQaWNrZXJNb3VzZVJhbmdlKCRjdHJsLCBlKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLmlzU2VsZWN0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vbihtb3VzZU92ZXIsIGRheUNzcywgKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ3JhbmdlIG1vdXNlb3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc2V0RW5kKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0aW5nKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRib2R5Lm9uZShtb3VzZVVwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ3JhbmdlIGJvZHkgbW91c2V1cCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihtb3VzZU92ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLmlzU2VsZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RlZChyYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLmRpcmVjdGl2ZSgnZGF0ZVBpY2tlcicsIERhdGVQaWNrZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG5cclxuICAgIC8vIERhdGVQaWNrZXJSYW5nZVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICBzdGFydDogc3RyaW5nO1xyXG4gICAgICAgIGVuZDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJSYW5nZSBpbXBsZW1lbnRzIElEYXRlUGlja2VyUmFuZ2Uge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBhbnksIGVuZDogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBtU3RhcnQgPSBtb21lbnQoc3RhcnQpO1xyXG4gICAgICAgICAgICB2YXIgbUVuZCA9IG1vbWVudChlbmQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1FbmQuaXNCZWZvcmUobVN0YXJ0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBtU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBtU3RhcnQgPSBtRW5kO1xyXG4gICAgICAgICAgICAgICAgbUVuZCA9IHRlbXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBtU3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbUVuZC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0OiBzdHJpbmc7XHJcbiAgICAgICAgZW5kOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlck1vbnRoXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyTW9udGgge1xyXG4gICAgICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJNb250aCBpbXBsZW1lbnRzIElEYXRlUGlja2VyTW9udGgge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBtID0gbW9tZW50KCk7XHJcbiAgICAgICAgICAgIHZhciB0aGlzTW9udGggPSBtLm1vbnRoKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG0ubW9udGgodmFsdWUpLmZvcm1hdCgnTU1NJyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50TW9udGggPSB2YWx1ZSA9PT0gdGhpc01vbnRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERhdGVQaWNrZXJNb250aFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlclllYXIge1xyXG4gICAgICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICAgICAgaXNDdXJyZW50WWVhcjogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyWWVhciBpbXBsZW1lbnRzIElEYXRlUGlja2VyWWVhciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRZZWFyID0gdmFsdWUgPT09IG1vbWVudCgpLnllYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzQ3VycmVudFllYXI6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSURhdGVQaWNrZXJEYXlcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJEYXkge1xyXG4gICAgICAgIGRhdGU6IG51bWJlcjtcclxuICAgICAgICB2YWx1ZTogbW9tZW50Lk1vbWVudDtcclxuICAgICAgICBpc29EYXRlOiBzdHJpbmc7XHJcbiAgICAgICAgaXNUb2RheTogYm9vbGVhbjtcclxuICAgICAgICBpc05vdEluTW9udGg6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3RlZDogYm9vbGVhbjtcclxuICAgICAgICBpc0JlZm9yZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbjtcclxuICAgICAgICBpc1NhbWUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW47XHJcbiAgICAgICAgaXNIaWdobGlnaHRlZDogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyRGF5IGltcGxlbWVudHMgSURhdGVQaWNrZXJEYXkge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGZyb21EYXRlOiBhbnksIGRheU9mV2VlazogbW9tZW50Lk1vbWVudCwgdG9kYXk6IG1vbWVudC5Nb21lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGRheU9mV2Vlay5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzb0RhdGUgPSB0aGlzLnZhbHVlLmZvcm1hdChcIllZWVktREQtTU1cIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMudmFsdWUuZGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzVG9kYXkgPSBkYXlPZldlZWsuaXNTYW1lKHRvZGF5LCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNOb3RJbk1vbnRoID0gIXRoaXMudmFsdWUuaXNTYW1lKGZyb21EYXRlLCAnbW9udGgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGU6IG51bWJlcjtcclxuICAgICAgICB2YWx1ZTogbW9tZW50Lk1vbWVudDtcclxuICAgICAgICBpc29EYXRlOiBzdHJpbmc7XHJcbiAgICAgICAgaXNUb2RheTogYm9vbGVhbjtcclxuICAgICAgICBpc05vdEluTW9udGg6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3RlZDogYm9vbGVhbjtcclxuICAgICAgICBpc0hpZ2hsaWdodGVkOiBib29sZWFuO1xyXG5cclxuICAgICAgICBpc0JlZm9yZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBpc0JlZm9yZSA9IHRoaXMudmFsdWUuaXNCZWZvcmUoZGF5LnZhbHVlLCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpc0JlZm9yZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzU2FtZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBpc1NhbWUgPSB0aGlzLnZhbHVlLmlzU2FtZShkYXkudmFsdWUsICdkYXknKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzU2FtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlclNlcnZpY2VcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJTZXJ2aWNlIHtcclxuICAgICAgICBnZXRNb250aHMoKTogSURhdGVQaWNrZXJNb250aFtdO1xyXG4gICAgICAgIGdldERheXNPZldlZWsoKTogc3RyaW5nW107XHJcbiAgICAgICAgZ2V0WWVhcnMoZnJvbURhdGU6IG1vbWVudC5Nb21lbnQpOiBJRGF0ZVBpY2tlclllYXJbXTtcclxuICAgICAgICBnZXRXZWVrKGZyb21EYXRlOiBtb21lbnQuTW9tZW50LCBzdGFydE9mV2VlazogbW9tZW50Lk1vbWVudCwgdG9kYXk6IG1vbWVudC5Nb21lbnQpOiBJRGF0ZVBpY2tlckRheVtdO1xyXG4gICAgICAgIGdldFJhbmdlRGF5cyhzdGFydDogSURhdGVQaWNrZXJEYXksIGVuZDogSURhdGVQaWNrZXJEYXksIHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pOiBJRGF0ZVBpY2tlckRheVtdO1xyXG4gICAgICAgIGRlc2VsZWN0QWxsKHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pO1xyXG4gICAgICAgIHNlbGVjdERheXMoZGF5czogSURhdGVQaWNrZXJEYXlbXSk7XHJcbiAgICAgICAgaW5wdXRUb01vbWVudCh2YWx1ZTogc3RyaW5nKTogYW55O1xyXG4gICAgICAgIGlucHV0VG9SYW5nZSh2YWx1ZTogc3RyaW5nKTogSURhdGVQaWNrZXJSYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyU2VydmljZSBpbXBsZW1lbnRzIElEYXRlUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgZ2V0TW9udGhzKCk6IElEYXRlUGlja2VyTW9udGhbXSB7XHJcbiAgICAgICAgICAgIHZhciBtb250aHMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJNb250aD4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbW9udGhzLnB1c2gobmV3IERhdGVQaWNrZXJNb250aChpKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtb250aHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRZZWFycyhmcm9tRGF0ZSk6IElEYXRlUGlja2VyWWVhcltdIHtcclxuICAgICAgICAgICAgdmFyIGZyb21ZZWFyID0gbW9tZW50KGZyb21EYXRlKS55ZWFyKCksXHJcbiAgICAgICAgICAgICAgICB5ZWFycyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlclllYXI+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZnJvbVllYXI7IGkgPD0gKGZyb21ZZWFyICsgOCk7IGkrKylcclxuICAgICAgICAgICAgICAgIHllYXJzLnB1c2gobmV3IERhdGVQaWNrZXJZZWFyKGkpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB5ZWFycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFdlZWsoZnJvbURhdGU6IG1vbWVudC5Nb21lbnQsIHN0YXJ0T2ZXZWVrOiBtb21lbnQuTW9tZW50LCB0b2RheTogbW9tZW50Lk1vbWVudCk6IElEYXRlUGlja2VyRGF5W10ge1xyXG4gICAgICAgICAgICB2YXIgZW5kT2ZXZWVrID0gc3RhcnRPZldlZWsuY2xvbmUoKS5lbmRPZignd2VlaycpO1xyXG4gICAgICAgICAgICB2YXIgZGF5cyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlckRheT4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF5T2ZXZWVrID0gc3RhcnRPZldlZWsuY2xvbmUoKTsgZGF5T2ZXZWVrLmlzQmVmb3JlKGVuZE9mV2Vlayk7IGRheU9mV2Vlay5hZGQoMSwgJ2RheXMnKSkge1xyXG4gICAgICAgICAgICAgICAgZGF5cy5wdXNoKG5ldyBEYXRlUGlja2VyRGF5KGZyb21EYXRlLCBkYXlPZldlZWssIHRvZGF5KSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0RGF5c09mV2VlaygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQud2Vla2RheXNTaG9ydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0UmFuZ2VEYXlzKHN0YXJ0OiBJRGF0ZVBpY2tlckRheSwgZW5kOiBJRGF0ZVBpY2tlckRheSwgd2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSk6IElEYXRlUGlja2VyRGF5W10ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVuZC5pc0JlZm9yZShzdGFydCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IGVuZDtcclxuICAgICAgICAgICAgICAgIGVuZCA9IHRlbXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhbGxEYXlzID0gbmV3IEFycmF5PElEYXRlUGlja2VyRGF5PigpLFxyXG4gICAgICAgICAgICAgICAgaXNBZGRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHdlZWtzLmZvckVhY2god2VlayA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZWVrLmZvckVhY2goZGF5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5LmlzU2FtZShzdGFydCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWRkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQWRkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbERheXMucHVzaChkYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRheS5pc1NhbWUoZW5kKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBZGRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxEYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVzZWxlY3RBbGwod2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSkge1xyXG4gICAgICAgICAgICB3ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2Vlay5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5LmlzU2VsZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3REYXlzKGRheXM6IElEYXRlUGlja2VyRGF5W10pIHtcclxuICAgICAgICAgICAgZGF5cy5mb3JFYWNoKGRheSA9PiBkYXkuaXNTZWxlY3RpbmcgPSB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0VG9Nb21lbnQodmFsdWU6IHN0cmluZyk6IG1vbWVudC5Nb21lbnQge1xyXG4gICAgICAgICAgICB2YXIgbGFuZyA9IG1vbWVudC5sb2NhbGVEYXRhKCk7XHJcbiAgICAgICAgICAgIHZhciBmb3JtYXRzID0gW1xyXG4gICAgICAgICAgICAgICAgbGFuZy5sb25nRGF0ZUZvcm1hdChcImxcIilcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvLS9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyAgL2csICcgJyksXHJcbiAgICAgICAgICAgICAgICBsYW5nLmxvbmdEYXRlRm9ybWF0KFwiTFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQodmFsdWUsIGZvcm1hdHMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHllYXIgPSBkYXRlLnllYXIoKTtcclxuICAgICAgICAgICAgaWYoeWVhciA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFllYXIgPSBtb21lbnQoKS55ZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWRkWWVhcnMgPSBjdXJyZW50WWVhciAtIChjdXJyZW50WWVhciUxMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3WWVhciA9IHllYXIgKyBhZGRZZWFycztcclxuICAgICAgICAgICAgICAgIGRhdGUuc2V0KCd5ZWFyJywgbmV3WWVhcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXRUb1JhbmdlKHZhbHVlOiBzdHJpbmcpOiBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgIXZhbHVlLnRyaW0oKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgdmFyIHRyaW1tZWQgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnRyaW0oKTtcclxuICAgICAgICAgICAgdmFyIGV4cFN0YXJ0ID0gbmV3IFJlZ0V4cChcIl4oKFswLTldezEsNH1bIF0qKXszfSlcIik7XHJcbiAgICAgICAgICAgIHZhciBleHBFbmQgPSBuZXcgUmVnRXhwKFwiKChbMC05XXsxLDR9WyBdKil7M30pJFwiKTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0UmVzdWx0ID0gZXhwU3RhcnQuZXhlYyh0cmltbWVkKTtcclxuICAgICAgICAgICAgdmFyIGVuZFJlc3VsdCA9IGV4cEVuZC5leGVjKHRyaW1tZWQpO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmlucHV0VG9Nb21lbnQoc3RhcnRSZXN1bHRbMF0udHJpbSgpKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMuaW5wdXRUb01vbWVudCgoZW5kUmVzdWx0WzBdIHx8IHN0YXJ0UmVzdWx0WzBdKS50cmltKCkpO1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBuZXcgRGF0ZVBpY2tlclJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLnNlcnZpY2UoJ2RhdGVQaWNrZXJTZXJ2aWNlJywgRGF0ZVBpY2tlclNlcnZpY2UpO1xyXG59IiwiXHJcbm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyQ29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSAkcG9zdExpbmsoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHRoaXMuX3RpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX3RpbWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgZ2V0IHRpbWUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgdGltZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc0NoYW5nZWQgPSB0aGlzLl90aW1lICE9PSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKCFoYXNDaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGltZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh7IHRpbWU6IHZhbHVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRWaWV3VmFsdWUodGltZTogc3RyaW5nKSB7fTtcclxuICAgICAgICBvbkNoYW5nZTogKHBhcmFtczogeyB0aW1lOiBzdHJpbmcgfSkgPT4gdm9pZDtcclxuICAgICAgICBwcml2YXRlIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLmNvbnRyb2xsZXIoJ3RpbWVQaWNrZXInLCBUaW1lUGlja2VyQ29udHJvbGxlcik7XHJcblxyXG4gICAgY2xhc3MgVGltZVBpY2tlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJ3RpbWVQaWNrZXJTZXJ2aWNlJywgJ2lzTW9iaWxlJywgJyRwYXJzZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVQaWNrZXJTZXJ2aWNlOiBJVGltZVBpY2tlclNlcnZpY2UsIHByaXZhdGUgaXNNb2JpbGU6IGJvb2xlYW4sIHByaXZhdGUgJHBhcnNlOiBhbmd1bGFyLklQYXJzZVNlcnZpY2UpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ3RpbWVQaWNrZXInLCAnbmdNb2RlbCddO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBUaW1lUGlja2VyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndGltZXBpY2tlcic7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpbWU6ICc9JyxcclxuICAgICAgICAgICAgb25DaGFuZ2U6ICcmJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBbJGN0cmwsICRuZ01vZGVsQ3RybF06IFtUaW1lUGlja2VyQ29udHJvbGxlciwgYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXJdKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtNb2JpbGUoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCwgJG5nTW9kZWxDdHJsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5saW5rRGVza3RvcCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsLCAkbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmtNb2JpbGUgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybDogVGltZVBpY2tlckNvbnRyb2xsZXIsICRuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucHJvcCgndHlwZScsICd0aW1lJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXRWaWV3VmFsdWUgPSAodGltZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWV3VmFsdWUgPSB0aGlzLnRpbWVQaWNrZXJTZXJ2aWNlLmZvcm1hdElzbyh0aW1lKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHZpZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkY3RybC5zZXRWaWV3VmFsdWUgPSBzZXRWaWV3VmFsdWU7XHJcblxyXG4gICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHZpZXdDaGFuZ2VMaXN0ZW5lcnMucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC50aW1lID0gdGhpcy50aW1lUGlja2VyU2VydmljZS5mb3JtYXRJc28oJG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUsIG51bGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rRGVza3RvcCA9ICgkc2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRycywgJGN0cmw6IFRpbWVQaWNrZXJDb250cm9sbGVyLCAkbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50SWQgPSAoLi4ubmFtZXM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZXMubWFwKG5hbWUgPT4gYCR7bmFtZX0uJHskc2NvcGUuJGlkfWApLmpvaW4oJyAnKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRjdHJsLnRpbWUgPSB0aGlzLnRpbWVQaWNrZXJTZXJ2aWNlLmZvcm1hdElzbygkbmdNb2RlbEN0cmwuJG1vZGVsVmFsdWUsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzVmFsaWRUaW1lID0gJGN0cmwudGltZSAhPSBudWxsXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1JlcXVpcmVkID0gJGF0dHJzWydyZXF1aXJlZCddO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNWYWxpZCA9ICFpc1JlcXVpcmVkIHx8IChpc1JlcXVpcmVkICYmIGlzVmFsaWRUaW1lKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kc2V0VmFsaWRpdHkoJ2ludmFsaWRUaW1lJywgaXNWYWxpZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlT25FbnRlciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBFTlRFUl9LRVkgPSAxMztcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleURvd24gPSBlID0+IGUud2hpY2g7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGtleURvd24oZSkgIT09IEVOVEVSX0tFWSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNldFZpZXdWYWx1ZSA9ICh0aW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdWYWx1ZSA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UuZm9ybWF0KHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRjdHJsLnNldFZpZXdWYWx1ZSA9IHNldFZpZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAub24oZXZlbnRJZCgnYmx1cicpLCB1cGRhdGUpXHJcbiAgICAgICAgICAgICAgICAub24oZXZlbnRJZCgna2V5ZG93bicpLCB1cGRhdGVPbkVudGVyKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKGV2ZW50SWQoJ2JsdXInLCAna2V5ZG93bicpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuZGlyZWN0aXZlKCd0aW1lUGlja2VyJywgVGltZVBpY2tlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVGltZVBpY2tlclNlcnZpY2Uge1xyXG4gICAgICAgIHBhcnNlKHRleHQ6IHN0cmluZyk6IGFueTtcclxuICAgICAgICBmb3JtYXQodGV4dDogc3RyaW5nLCB2YWx1ZT86IHN0cmluZyk6IHN0cmluZztcclxuICAgICAgICBmb3JtYXRJc28odGV4dDogc3RyaW5nLCB2YWx1ZT86IHN0cmluZyk6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyU2VydmljZSBpbXBsZW1lbnRzIElUaW1lUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgcGFyc2UodGV4dDogc3RyaW5nKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIHBhdHRlcm5zID0gW1xyXG4gICAgICAgICAgICAgICAgJ0xUJyxcclxuICAgICAgICAgICAgICAgICdMVFMnLFxyXG4gICAgICAgICAgICAgICAgJ0hIOm1tOnNzJyxcclxuICAgICAgICAgICAgICAgICdISDptbSBBJ1xyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KHRleHQsIHBhdHRlcm5zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdCh0ZXh0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5wYXJzZSh0ZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIG0uaXNWYWxpZCgpID8gbS5mb3JtYXQoJ0xUJykgOiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdElzbyh0ZXh0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5wYXJzZSh0ZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIG0uaXNWYWxpZCgpID8gbS5mb3JtYXQoXCJISDptbTpzc1wiKSA6IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5zZXJ2aWNlKCd0aW1lUGlja2VyU2VydmljZScsIFRpbWVQaWNrZXJTZXJ2aWNlKTtcclxufSJdfQ==