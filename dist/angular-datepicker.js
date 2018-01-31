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
                //$element.focus();
                $element.trigger("focus"); // for firefox
            };
            var onElementMouseDown = function (e) {
                //console.info('onElementMouseDown');
                var preventElementFocus = function () { return _this.preventDefault(e); };
                preventElementFocus();
            };
            var onElementMouseUp = function (e) {
                //console.info('onElementMouseUp');
                _this.preventDefault(e);
                //$element.focus(); // now manually focus
                $element.trigger("focus"); // for firefox
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kYXRlcGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyIsIi4uL3NyYy9tb2JpbGUudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXIudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXItc2VydmljZS50cyIsIi4uL3NyYy90aW1lLXBpY2tlci50cyIsIi4uL3NyYy90aW1lLXBpY2tlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FDQW5DLElBQU8sZ0JBQWdCLENBc0J0QjtBQXRCRCxXQUFPLGdCQUFnQjtJQUNuQjtRQUFBO1FBZ0JBLENBQUM7UUFmVSxxQkFBUSxHQUFmO1lBQ0ksSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RSxJQUFJLEtBQUssR0FBRywwVEFBMFQsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFblYsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxLQUFLLEdBQUcseWtEQUF5a0QsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFeG1ELE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO1FBQzFCLENBQUM7UUFFTSxrQkFBSyxHQUFaO1lBQ0ksSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RSxJQUFJLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0wsbUJBQUM7SUFB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QUFBLEVBQUEsVUFBa0I7WUFDdEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEQsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FBQyxBQXBCRCxJQW9CQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDbkYsQ0FBQyxFQS9CTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBK0J0QiIsInNvdXJjZXNDb250ZW50IjpbIkFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIsIFtdKTsiLCJtb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcbiAgICBjbGFzcyBNb2JpbGVDb25maWcge1xyXG4gICAgICAgIHN0YXRpYyBpc01vYmlsZSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvd1tcIm9wZXJhXCJdO1xyXG4gICAgICAgICAgICB2YXIgdGVzdDEgPSAvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2kudGVzdChhZ2VudCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWdlbnRQcmVmaXggPSBhZ2VudC5zdWJzdHIoMCwgNCk7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0MiA9IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYWdlbnRQcmVmaXgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRlc3QxIHx8IHRlc3QyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGlzSU9TKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgYWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93W1wib3BlcmFcIl07XHJcbiAgICAgICAgICAgIHZhciB0ZXN0MSA9IC9pUGhvbmV8aVBvZHxpUGFkL2kudGVzdChhZ2VudCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXN0MTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIilcclxuICAgICAgICAuY29uc3RhbnQoJ2lzTW9iaWxlJywgTW9iaWxlQ29uZmlnLmlzTW9iaWxlKCkpXHJcbiAgICAgICAgLmNvbnN0YW50KCdpc0lPUycsIE1vYmlsZUNvbmZpZy5pc0lPUygpKTtcclxufSIsIlxyXG5tb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcbiAgICBkZWNsYXJlIHZhciBUZXRoZXI6IGFueTtcclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyTW91c2VSYW5nZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIsIGU6IEpRdWVyeUV2ZW50T2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhcnQoZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RW5kKGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGJvb3RzdHJhcChkYXRlUGlja2VyU2VydmljZTogSURhdGVQaWNrZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIERhdGVQaWNrZXJNb3VzZVJhbmdlLmRhdGVQaWNrZXJTZXJ2aWNlID0gZGF0ZVBpY2tlclNlcnZpY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGFydChlOiBKUXVlcnlFdmVudE9iamVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gdGhpcy5nZXRFbGVtZW50KGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0RW5kKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gdGhpcy5nZXRFbGVtZW50KGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0RGF5cygpOiBJRGF0ZVBpY2tlckRheVtdIHtcclxuICAgICAgICAgICAgY29uc3QgZGF5cyA9IERhdGVQaWNrZXJNb3VzZVJhbmdlLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFJhbmdlRGF5cyh0aGlzLnN0YXJ0LCB0aGlzLmVuZCwgdGhpcy4kY3RybC53ZWVrcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRFbGVtZW50KGU6IEpRdWVyeUV2ZW50T2JqZWN0KTogSURhdGVQaWNrZXJEYXkge1xyXG4gICAgICAgICAgICBpZiAoIWUudGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCAkZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGNvbnN0ICRzY29wZSA9ICRlbGVtZW50LnNjb3BlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRheSA9ICRzY29wZVsnZGF5J107XHJcbiAgICAgICAgICAgIHJldHVybiBkYXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGFydDogSURhdGVQaWNrZXJEYXk7XHJcbiAgICAgICAgZW5kOiBJRGF0ZVBpY2tlckRheTtcclxuICAgIH1cclxuXHJcbiAgICBlbnVtIERhdGVQaWNrZXJWaWV3IHtcclxuICAgICAgICBEYXlzID0gMCxcclxuICAgICAgICBNb250aHMgPSAxLFxyXG4gICAgICAgIFllYXJzID0gMlxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJDb250cm9sbGVyIHtcclxuXHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICckYXR0cnMnLCAnZGF0ZVBpY2tlclNlcnZpY2UnLCAnaXNNb2JpbGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCBwcml2YXRlICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksIHByaXZhdGUgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCBwcml2YXRlIGRhdGVQaWNrZXJTZXJ2aWNlOiBJRGF0ZVBpY2tlclNlcnZpY2UsIHByaXZhdGUgaXNNb2JpbGU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgRGF0ZVBpY2tlck1vdXNlUmFuZ2UuYm9vdHN0cmFwKGRhdGVQaWNrZXJTZXJ2aWNlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNTaW5nbGVEYXRlID0gdGhpcy5pc01vYmlsZSB8fCAoJGF0dHJzWydzdGFydCddID09IG51bGwgJiYgJGF0dHJzWydlbmQnXSA9PSBudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5tb250aE5hbWVzID0gZGF0ZVBpY2tlclNlcnZpY2UuZ2V0TW9udGhzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF5c09mV2VlayA9IGRhdGVQaWNrZXJTZXJ2aWNlLmdldERheXNPZldlZWsoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRvbkluaXQoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlZmF1bHREYXRlID09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHREYXRlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRwb3N0TGluaygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZpZXdEYXRlKHRoaXMuZGF0ZSB8fCB0aGlzLmRlZmF1bHREYXRlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5zdGFydCB8fCB0aGlzLmRlZmF1bHREYXRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWaWV3UmFuZ2Uoc3RhcnQsIHRoaXMuZW5kIHx8IHN0YXJ0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0VmlldygpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLiRhdHRyc1snbWluVmlldyddKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFycyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuWWVhcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WaWV3ID0gRGF0ZVBpY2tlclZpZXcuWWVhcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtb250aHMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3Lk1vbnRocztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblZpZXcgPSBEYXRlUGlja2VyVmlldy5Nb250aHM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3LkRheXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WaWV3ID0gRGF0ZVBpY2tlclZpZXcuRGF5cztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzZXRWaWV3KCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRWaWV3KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGVJbnRlcm5hbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2luZ2xlIERhdGVcclxuICAgICAgICBfZGF0ZTogc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICBwdWJsaWMgZ2V0IGRhdGUoKTogc3RyaW5nIHwgRGF0ZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IGRhdGUodmFsdWU6IHN0cmluZyB8IERhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRlKHZhbHVlLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSYW5nZVxyXG4gICAgICAgIF9zdGFydDogc3RyaW5nIHwgRGF0ZTtcclxuICAgICAgICBwdWJsaWMgZ2V0IHN0YXJ0KCk6IHN0cmluZyB8IERhdGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgc3RhcnQodmFsdWU6IHN0cmluZyB8IERhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRSYW5nZSh2YWx1ZSwgdGhpcy5fZW5kLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfZW5kOiBzdHJpbmcgfCBEYXRlO1xyXG4gICAgICAgIHB1YmxpYyBnZXQgZW5kKCk6IHN0cmluZyB8IERhdGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IGVuZCh2YWx1ZTogc3RyaW5nIHwgRGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFJhbmdlKHRoaXMuX3N0YXJ0LCB2YWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBub3RpZnk6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc0NoYW5nZWQgPSB0aGlzLl9kYXRlICE9PSBkYXRlO1xyXG4gICAgICAgICAgICBpZiAoIWhhc0NoYW5nZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGRhdGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IGRhdGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9kYXRlID0gZGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnQgPSBzdGFydDtcclxuICAgICAgICAgICAgdGhpcy5fZW5kID0gZW5kO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRlSW50ZXJuYWwoZGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld0RhdGUoZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW5vdGlmeSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5Q2hhbmdlcyhkYXRlLCBzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFJhbmdlKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIG5vdGlmeTogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICAgICAgY29uc3QgaGFzQ2hhbmdlZCA9IHRoaXMuX3N0YXJ0ICE9PSBzdGFydCB8fCB0aGlzLl9lbmQgIT09IGVuZDtcclxuICAgICAgICAgICAgaWYgKCFoYXNDaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHN0YXJ0O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gc3RhcnQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZCA9IGVuZDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZUludGVybmFsKGRhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXdSYW5nZShzdGFydCwgZW5kKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbm90aWZ5KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VzKGRhdGUsIHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBub3RpZnlDaGFuZ2VzKGRhdGU6IHN0cmluZyB8IERhdGUsIHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub25EYXRlU2VsZWN0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkRhdGVTZWxlY3QoeyBkYXRlOiBkYXRlIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub25SYW5nZVNlbGVjdClcclxuICAgICAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9kYXRlSW50ZXJuYWw6IG1vbWVudC5Nb21lbnQ7XHJcblxyXG4gICAgICAgIGdldCBkYXRlSW50ZXJuYWwoKTogbW9tZW50Lk1vbWVudCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW5pdERhdGVJbnRlcm5hbCgpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZUludGVybmFsID0gKHRoaXMuaXNTaW5nbGVEYXRlID8gdGhpcy5kYXRlIDogdGhpcy5zdGFydCkgfHwgdGhpcy5kZWZhdWx0RGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRlSW50ZXJuYWwoZGF0ZUludGVybmFsKTtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGUodGhpcy5fZGF0ZUludGVybmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW9tZW50RnJvbVZhbHVlKHZhbHVlOiBzdHJpbmcgfCBEYXRlIHwgbW9tZW50Lk1vbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlICE9IG51bGwpID8gbW9tZW50KHZhbHVlKSA6IG1vbWVudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXREYXRlSW50ZXJuYWwodmFsdWU6IHN0cmluZyB8IERhdGUgfCBtb21lbnQuTW9tZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGVJbnRlcm5hbCA9IHRoaXMubW9tZW50RnJvbVZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKHRoaXMuX2RhdGVJbnRlcm5hbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNhbGN1bGF0ZShmcm9tRGF0ZTogbW9tZW50Lk1vbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGZyb21EYXRlLmNsb25lKCkuc3RhcnRPZignbW9udGgnKS5zdGFydE9mKCd3ZWVrJyksXHJcbiAgICAgICAgICAgICAgICBlbmQgPSBmcm9tRGF0ZS5jbG9uZSgpLmVuZE9mKCdtb250aCcpLmVuZE9mKCd3ZWVrJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBub3cgPSBtb21lbnQoKTtcclxuICAgICAgICAgICAgY29uc3QgdG9kYXkgPSBtb21lbnQobm93LmZvcm1hdCgnWVlZWS1NTS1ERCcpLCAnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICB0aGlzLndlZWtzID0gbmV3IEFycmF5PElEYXRlUGlja2VyRGF5W10+KCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSA9IHN0YXJ0OyBkYXkuaXNCZWZvcmUoZW5kKTsgZGF5ID0gZGF5LmNsb25lKCkuYWRkKDEsICd3ZWVrJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdlZWsgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFdlZWsoZnJvbURhdGUsIGRheSwgdG9kYXkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrcy5wdXNoKHdlZWspO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnllYXJzID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5nZXRZZWFycyhmcm9tRGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGlnaGxpZ2h0cyh0aGlzLmhpZ2hsaWdodGVkKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZCh0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRWaWV3RGF0ZShkYXRlKSB7XHJcbiAgICAgICAgICAgIC8vIG92ZXJyaWRlIGluIGxpbmsgZnVuY3Rpb25zXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2V0Vmlld1JhbmdlKHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICAgICAgLy8gb3ZlcnJpZGUgaW4gbGluayBmdW5jdGlvbnNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBnZXQgdGl0bGUoKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5EYXlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWwuZm9ybWF0KCdNTU1NIFlZWVknKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuTW9udGhzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LlllYXJzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnc2VsZWN0IGEgeWVhcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB2aWV3VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5Nb250aHM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwibW9udGhzXCI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3LlllYXJzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInllYXJzXCI7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5EYXlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImRheXNcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd0RheXMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPiBEYXRlUGlja2VyVmlldy5EYXlzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd01vbnRocygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA+IERhdGVQaWNrZXJWaWV3Lk1vbnRocylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd1llYXJzKCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5ZZWFycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFNlbGVjdGVkKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy53ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2Vlay5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5LmlzU2VsZWN0ZWQgPSB0aGlzLmlzU2VsZWN0ZWQoc3RhcnQsIGVuZCwgZGF5KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzU2VsZWN0ZWQoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBpZiAoc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIGRheS52YWx1ZS5pc0JldHdlZW4oc3RhcnQsIGVuZCwgJ2RheScpIHx8XHJcbiAgICAgICAgICAgICAgICBkYXkudmFsdWUuaXNTYW1lKHN0YXJ0LCAnZGF5JykgfHxcclxuICAgICAgICAgICAgICAgIGRheS52YWx1ZS5pc1NhbWUoZW5kLCAnZGF5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRIaWdobGlnaHRzKGhpZ2hsaWdodHM6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2Vla3MuZm9yRWFjaCh3ZWVrID0+IHtcclxuICAgICAgICAgICAgICAgIHdlZWsuZm9yRWFjaChkYXkgPT4gZGF5LmlzSGlnaGxpZ2h0ZWQgPSB0aGlzLmlzSGlnaGxpZ2h0ZWQoaGlnaGxpZ2h0cywgZGF5KSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0hpZ2hsaWdodGVkKGhpZ2hsaWdodHM6IHN0cmluZ1tdLCBkYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIGlmIChoaWdobGlnaHRzID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRzID0gW107XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpc29IaWdobGlnaHRzID0gaGlnaGxpZ2h0cy5tYXAodmFsdWUgPT4gbW9tZW50KHZhbHVlKS5mb3JtYXQoJ1lZWVktREQtTU0nKSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlzb0hpZ2hsaWdodHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzb0RhdGUgPSBpc29IaWdobGlnaHRzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzb0RhdGUgPT09IGRheS5pc29EYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGluZyhkYXlzOiBJRGF0ZVBpY2tlckRheVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZGVzZWxlY3RBbGwodGhpcy53ZWVrcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2Uuc2VsZWN0RGF5cyhkYXlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkKGRheXM6IElEYXRlUGlja2VyRGF5W10pIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5kZXNlbGVjdEFsbCh0aGlzLndlZWtzKTtcclxuICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gZGF5c1swXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZShzdGFydCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IGRheXNbZGF5cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWREYXRlKGRheTogSURhdGVQaWNrZXJEYXkpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG1vbWVudChkYXkudmFsdWUpLmZvcm1hdCh0aGlzLmlzb0Zvcm1hdCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZShkYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkUmFuZ2Uoc3RhcnREYXk6IElEYXRlUGlja2VyRGF5LCBlbmREYXk6IElEYXRlUGlja2VyRGF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gbW9tZW50KHN0YXJ0RGF5LnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICBjb25zdCBlbmQgPSBtb21lbnQoZW5kRGF5LnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0TW9udGgoaWR4KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vbnRoID0gdGhpcy5tb250aE5hbWVzW2lkeF07XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9udGgobW9udGgudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID09PSBEYXRlUGlja2VyVmlldy5Nb250aHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLmRhdGVJbnRlcm5hbC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGUoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5kYXRlSW50ZXJuYWwuY2xvbmUoKS5lbmRPZignbW9udGgnKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSB0aGlzLmRhdGVJbnRlcm5hbC5jbG9uZSgpLmVuZE9mKCdtb250aCcpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UmFuZ2Uoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dEYXlzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RZZWFyKGlkeCkge1xyXG4gICAgICAgICAgICBjb25zdCB5ZWFyID0gdGhpcy55ZWFyc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldFllYXIoeWVhci52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPT09IERhdGVQaWNrZXJWaWV3LlllYXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRlKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuZGF0ZUludGVybmFsLmNsb25lKCkuc3RhcnRPZigneWVhcicpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuZGF0ZUludGVybmFsLmNsb25lKCkuZW5kT2YoJ3llYXInKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93TW9udGhzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNoYW5nZURhdGUoYWN0aW9uOiAoZGF0ZTogbW9tZW50Lk1vbWVudCkgPT4gbW9tZW50Lk1vbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGVJbnRlcm5hbChhY3Rpb24odGhpcy5kYXRlSW50ZXJuYWwuY2xvbmUoKSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNNb250aChtb250aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlSW50ZXJuYWwubW9udGgoKSA9PSBtb250aC52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldE1vbnRoKG1vbnRoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0ZShkYXRlID0+IGRhdGUuc2V0KCdtb250aCcsIG1vbnRoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1llYXIoeWVhcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlSW50ZXJuYWwueWVhcigpID09IHllYXIudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRZZWFyKHllYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlKGRhdGUgPT4gZGF0ZS5zZXQoJ3llYXInLCB5ZWFyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2TW9udGgoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0ZShkYXRlID0+IGRhdGUuc3VidHJhY3QoMSwgJ21vbnRocycpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5leHRNb250aCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlKGRhdGUgPT4gZGF0ZS5hZGQoMSwgJ21vbnRocycpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZZZWFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLnN1YnRyYWN0KDEsICd5ZWFycycpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5leHRZZWFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLmFkZCgxLCAneWVhcnMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2UmFuZ2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0ZShkYXRlID0+IGRhdGUuc3VidHJhY3QoOSwgJ3llYXJzJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV4dFJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURhdGUoZGF0ZSA9PiBkYXRlLmFkZCg5LCAneWVhcnMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkRhdGVTZWxlY3Q7XHJcbiAgICAgICAgb25SYW5nZVNlbGVjdDtcclxuICAgICAgICBpc1NlbGVjdGluZzogYm9vbGVhbjtcclxuICAgICAgICB2aWV3OiBEYXRlUGlja2VyVmlldztcclxuICAgICAgICBtaW5WaWV3OiBEYXRlUGlja2VyVmlldztcclxuICAgICAgICB3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdO1xyXG4gICAgICAgIHllYXJzOiBJRGF0ZVBpY2tlclllYXJbXTtcclxuICAgICAgICBtb250aE5hbWVzOiBJRGF0ZVBpY2tlck1vbnRoW107XHJcbiAgICAgICAgZGF5c09mV2Vlazogc3RyaW5nW107XHJcbiAgICAgICAgaXNWaXNpYmxlOiBib29sZWFuO1xyXG4gICAgICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgICAgIGlzb0Zvcm1hdCA9ICdZWVlZLU1NLUREJztcclxuICAgICAgICBpc1NpbmdsZURhdGU6IGJvb2xlYW47XHJcbiAgICAgICAgaGlnaGxpZ2h0ZWQ6IHN0cmluZ1tdO1xyXG4gICAgICAgIGRlZmF1bHREYXRlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGNsaWVudERhdGU6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5jb250cm9sbGVyKCdkYXRlUGlja2VyJywgRGF0ZVBpY2tlckNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGludGVyZmFjZSBJUG9wb3ZlclN0YXRlIHtcclxuICAgICAgICBpc09wZW46IGJvb2xlYW47XHJcbiAgICAgICAgc2V0RGF0ZTogKGRhdGU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgICAgICBzZXRSYW5nZTogKHN0YXJ0OiBzdHJpbmcsIGVuZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgICAgIGlzU2VsZWN0aW5nOiBib29sZWFuO1xyXG4gICAgICAgIGlzVmlzaWJsZTogYm9vbGVhbjtcclxuICAgICAgICBhbGxvd0Nsb3NlOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBvcG92ZXJTdGF0ZSBpbXBsZW1lbnRzIElQb3BvdmVyU3RhdGUge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9pc1NlbGVjdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmFsbG93Q2xvc2UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGRlZmF1bHREYXRlKCk6IHN0cmluZyB8IERhdGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kY3RybC5kZWZhdWx0RGF0ZSB8fCBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX29uQ2hhbmdlOiAoc3RhdGU6IFBvcG92ZXJTdGF0ZSwgYWN0aW9uOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICAgICAgb25DaGFuZ2UoZm46IChzdGF0ZTogUG9wb3ZlclN0YXRlLCBhY3Rpb246IHN0cmluZykgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBub3RpZnkoYWN0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9vbkNoYW5nZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UodGhpcywgYWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldERhdGUoZGF0ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGN0cmwuc2V0RGF0ZShkYXRlKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0UmFuZ2Uoc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy4kY3RybC5zZXRSYW5nZShzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3BlbigpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnkoJ29wZW4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYWxsb3dDbG9zZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXNbJ2NoaWxkRGF0ZXBpY2tlciddLnJlc2V0VmlldygpO1xyXG4gICAgICAgICAgICB0aGlzLm5vdGlmeSgnY2xvc2UnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2lzT3BlbjogYm9vbGVhbjtcclxuICAgICAgICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNPcGVuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlzVmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IGlzVmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHRoaXMub3BlbigpO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2lzU2VsZWN0aW5nOiBib29sZWFuO1xyXG4gICAgICAgIGdldCBpc1NlbGVjdGluZygpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzU2VsZWN0aW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgaXNTZWxlY3RpbmcodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5faXNTZWxlY3RpbmcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKCF2YWx1ZSAmJiB0aGlzLmlzT3BlbilcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFsbG93Q2xvc2U6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRpbmplY3RvcicsICckY29tcGlsZScsICckdGVtcGxhdGVDYWNoZScsICckdGltZW91dCcsICckd2luZG93JywgJ2RhdGVQaWNrZXJTZXJ2aWNlJywgJ2lzTW9iaWxlJywgJ2lzSU9TJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGluamVjdG9yLCBwcml2YXRlICRjb21waWxlLCBwcml2YXRlICR0ZW1wbGF0ZUNhY2hlLCBwcml2YXRlICR0aW1lb3V0LCBwcml2YXRlICR3aW5kb3csIHByaXZhdGUgZGF0ZVBpY2tlclNlcnZpY2U6IElEYXRlUGlja2VyU2VydmljZSwgcHJpdmF0ZSBpc01vYmlsZTogYm9vbGVhbiwgcHJpdmF0ZSBpc0lPUzogYm9vbGVhbikgeyB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0FFJztcclxuICAgICAgICByZXF1aXJlID0gWydkYXRlUGlja2VyJywgJz9uZ01vZGVsJ107XHJcbiAgICAgICAgY29udHJvbGxlciA9IERhdGVQaWNrZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICdkYXRlcGlja2VyJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgLy8gU2luZ2xlIERhdGVcclxuICAgICAgICAgICAgZGF0ZTogJz0/JyxcclxuICAgICAgICAgICAgb25EYXRlU2VsZWN0OiAnJicsXHJcblxyXG4gICAgICAgICAgICAvLyBSYW5nZVxyXG4gICAgICAgICAgICBzdGFydDogJz0/JyxcclxuICAgICAgICAgICAgZW5kOiAnPT8nLFxyXG4gICAgICAgICAgICBvblJhbmdlU2VsZWN0OiAnJicsXHJcblxyXG4gICAgICAgICAgICAvLyBPdGhlclxyXG4gICAgICAgICAgICBpc1NlbGVjdGluZzogJz0/JyxcclxuICAgICAgICAgICAgZGVmYXVsdERhdGU6ICdAPycsXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiAnJicsXHJcblxyXG4gICAgICAgICAgICAvLyBDb2xsZWN0aW9uIG9mIGRhdGUgc3RyaW5ncyAoaWUuIFsnMjAxMi0xMi0wMScsJzIwMTItMTItMDInXVxyXG4gICAgICAgICAgICBoaWdobGlnaHRlZDogJz0/J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhbGVuZGFyVGVtcGxhdGUgPSAnZGF0ZS1waWNrZXIuaHRtbCc7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCBbJGN0cmwsICRuZ01vZGVsXTogW0RhdGVQaWNrZXJDb250cm9sbGVyLCBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcl0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVRldGhlckZpeCgkZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rTW9iaWxlKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua0Rlc2t0b3AoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlua01vYmlsZSA9ICgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsICRuZ01vZGVsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSW5wdXQoJGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtOYXRpdmVJbnB1dCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0VsZW1lbnQoJGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtJbmxpbmUoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIGlmICh0aGlzLmlzSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5saW5rTmF0aXZlRWxlbWVudCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtFbGVtZW50KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwsICRjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua0Rlc2t0b3AgPSAoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCAkbmdNb2RlbDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0lucHV0KCRlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rSW5wdXQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc0VsZW1lbnQoJGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtJbmxpbmUoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbmdNb2RlbCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rRWxlbWVudCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRuZ01vZGVsLCAkY3RybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldHVwU2VsZWN0aW9ucygkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgaWYgKCRjdHJsLmlzU2luZ2xlRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cERheVNlbGVjdCgkc2NvcGUsICRlbGVtZW50LCAkY3RybCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwUmFuZ2VTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0lucHV0KCRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmlzKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNFbGVtZW50KCRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmlzKCdkYXRlLXBpY2tlcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRml4ZXMgYSBidWcgd2hlcmUgVGV0aGVyIGNhbm5vdCBjb3JyZWN0bHkgZ2V0IHdpZHRoL2hlaWdodCBiZWNhdXNlIG9mIG5nQW5pbWF0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcGx5VGV0aGVyRml4KCRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkpIHtcclxuICAgICAgICAgICAgdmFyICRhbmltYXRlID0gdGhpcy4kaW5qZWN0b3IuZ2V0KCckYW5pbWF0ZScpO1xyXG4gICAgICAgICAgICBpZiAoJGFuaW1hdGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICRhbmltYXRlLmVuYWJsZWQoZmFsc2UsICRlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpbmtOYXRpdmVJbnB1dCgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsICRuZ01vZGVsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IChkYXRlLCBwYXR0ZXJuKTogc3RyaW5nID0+IChkYXRlID09IG51bGwpID8gJycgOiBtb21lbnQoZGF0ZSkuZm9ybWF0KHBhdHRlcm4pO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlRm9ybWF0ID0gKGRhdGUpID0+IGZvcm1hdChkYXRlLCBcIllZWVktTU0tRERcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vbnRoRm9ybWF0ID0gKGRhdGUpID0+IGZvcm1hdChkYXRlLCBcIllZWVktTU1cIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyID0gZGF0ZUZvcm1hdDtcclxuXHJcbiAgICAgICAgICAgIGlmICgkYXR0cnNbJ21pblZpZXcnXSA9PSBcIm1vbnRoc1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJtb250aFwiO1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyID0gbW9udGhGb3JtYXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNldFZpZXdEYXRlID0gKGRhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBpc28gPSBmb3JtYXR0ZXIoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbC4kc2V0Vmlld1ZhbHVlKGlzbyk7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5wcm9wKFwidHlwZVwiLCB0eXBlKTtcclxuICAgICAgICAgICAgJGN0cmwuc2V0Vmlld0RhdGUgPSBzZXRWaWV3RGF0ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNldERhdGVGcm9tVmlldyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB2aWV3VmFsdWUgPSBtb21lbnQoJG5nTW9kZWwuJHZpZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdmlld1ZhbHVlLmlzVmFsaWQoKSA/IGRhdGVGb3JtYXQoJG5nTW9kZWwuJHZpZXdWYWx1ZSkgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2V0RGF0ZShkYXRlKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmlzSU9TKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAkZWxlbWVudC5vbihgYmx1ci4keyRzY29wZS4kaWR9YCwgc2V0RGF0ZUZyb21WaWV3KTtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgJG5nTW9kZWwuJHZpZXdDaGFuZ2VMaXN0ZW5lcnMucHVzaChzZXREYXRlRnJvbVZpZXcpO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpbmtJbnB1dCgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsIG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IChkYXRlOiBtb21lbnQuTW9tZW50KSA9PiBkYXRlLmZvcm1hdChcIkxcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXRWaWV3RGF0ZSA9IChkYXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IGRhdGUgPT0gbnVsbCA/ICcnIDogZm9ybWF0KG1vbWVudChkYXRlKSk7XHJcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2V0Vmlld1JhbmdlID0gKHN0YXJ0LCBlbmQpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnQgIT0gbnVsbCAmJiBlbmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtU3RhcnQgPSBtb21lbnQoc3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtRW5kID0gbW9tZW50KGVuZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtU3RhcnQuaXNTYW1lKGVuZCwgJ2RheScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBmb3JtYXQobVN0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gYCR7Zm9ybWF0KG1TdGFydCl9IC0gJHtmb3JtYXQobUVuZCl9YDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGZvcm1hdChtb21lbnQoZW5kKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGZvcm1hdChtb21lbnQoZW5kKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh0ZXh0KTtcclxuICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLnNldFZpZXdEYXRlID0gc2V0Vmlld0RhdGU7XHJcbiAgICAgICAgICAgICRjdHJsLnNldFZpZXdSYW5nZSA9IHNldFZpZXdSYW5nZTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBjaGFuZ2UuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgkY3RybC5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5pbnB1dFRvTW9tZW50KG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGUuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjdHJsLnNldERhdGUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRlLmlzU2FtZSgkY3RybC5kYXRlLCAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2V0RGF0ZShkYXRlLmZvcm1hdCgkY3RybC5pc29Gb3JtYXQpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0VG9SYW5nZShuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2V0UmFuZ2UobnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gbW9tZW50KHJhbmdlLnN0YXJ0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudChyYW5nZS5lbmQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGFydC5pc1ZhbGlkKCkgfHwgIWVuZC5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjdHJsLnNldFJhbmdlKG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnQuaXNTYW1lKCRjdHJsLnN0YXJ0LCAnZGF5JykgJiYgZW5kLmlzU2FtZSgkY3RybC5lbmQsICdkYXknKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjdHJsLnNldFJhbmdlKHJhbmdlLnN0YXJ0LCByYW5nZS5lbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGtleWRvd24uJHskc2NvcGUuJGlkfWAsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkY3RybC5pc1Zpc2libGUgfHwgIXRoaXMuaXNFc2NhcGUoZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rTmF0aXZlRWxlbWVudCgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsIG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGFiSW5kZXgoJGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZ2V0Vm0gPSAobmFtZSkgPT4gYCR7dGhpcy5jb250cm9sbGVyQXN9LiR7bmFtZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBnZXRBdHRyID0gKG5hbWUsIHZhbHVlKSA9PiBgJHtuYW1lfT1cIiR7dmFsdWV9XCJgXHJcbiAgICAgICAgICAgIGNvbnN0IGdldFZtQXR0ciA9IChuYW1lLCB2YWx1ZSkgPT4gZ2V0QXR0cihuYW1lLCBnZXRWbSh2YWx1ZSkpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gVHlwZUJ1aWxkZXIoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJzID0gW107XHJcbiAgICAgICAgICAgICAgICBjb25zdCBfYnVpbGRlciA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRBdHRyID0gKG5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRycy5wdXNoKGdldEF0dHIobmFtZSwgdmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2J1aWxkZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRMaXRlcmFsID0gKG5hbWUsIGF0dHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mICRhdHRyc1thdHRyXSAhPSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLnB1c2goZ2V0QXR0cihuYW1lLCAkYXR0cnNbYXR0cl0pKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2J1aWxkZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCaW5kaW5nID0gKG5hbWUsIGF0dHIsIGN0cmwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGF0dHIgPT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ciA9ICRhdHRyc1thdHRyXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGF0dHIgIT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRycy5wdXNoKGdldFZtQXR0cihuYW1lLCBjdHJsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9idWlsZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUHJveHkgPSAobmFtZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybFtuYW1lXSA9IGZuO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYnVpbGRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50ID0gKG5hbWUsIGF0dHIsIGN0cmwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mICRhdHRyc1thdHRyXSAhPSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLnB1c2goZ2V0Vm1BdHRyKG5hbWUsIGN0cmwpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2J1aWxkZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYDxpbnB1dCBkYXRlLXBpY2tlciAke3RoaXMuYXR0cnMuam9pbignICcpfT5gO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkY3RybFsnX19kYXRlJ10gPSAkY3RybC5kYXRlO1xyXG4gICAgICAgICAgICAkY3RybFsnX19zdGFydCddID0gJGN0cmwuZGF0ZTtcclxuICAgICAgICAgICAgJGN0cmxbJ19fZW5kJ10gPSAkY3RybC5kYXRlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYnVpbGRlciA9IG5ldyBUeXBlQnVpbGRlcigpXHJcbiAgICAgICAgICAgICAgICAuYWRkQXR0cihcInR5cGVcIiwgXCJ0ZXh0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkTGl0ZXJhbChcIm1pbi12aWV3XCIsIFwibWluVmlld1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEJpbmRpbmcoXCJuZy1tb2RlbFwiLCB0cnVlLCBcImRhdGVTdHJpbmdcIilcclxuICAgICAgICAgICAgICAgIC5hZGRCaW5kaW5nKFwiZGF0ZVwiLCBcImRhdGVcIiwgXCJfX2RhdGVcIilcclxuICAgICAgICAgICAgICAgIC5hZGRCaW5kaW5nKFwic3RhcnRcIiwgXCJzdGFydFwiLCBcIl9fc3RhcnRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRCaW5kaW5nKFwiZW5kXCIsIFwiZW5kXCIsIFwiX19lbmRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRCaW5kaW5nKFwiaXMtc2VsZWN0aW5nXCIsIFwiaXNTZWxlY3RpbmdcIiwgXCJpc1NlbGVjdGluZ1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZExpdGVyYWwoXCJkZWZhdWx0LWRhdGVcIiwgXCJkZWZhdWx0RGF0ZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEJpbmRpbmcoXCJoaWdobGlnaHRlZFwiLCBcImhpZ2hsaWdodGVkXCIsIFwiaGlnaGxpZ2h0ZWRcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYnVpbGRlci5idWlsZCgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJGlucHV0ID0gYW5ndWxhci5lbGVtZW50KGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2RhdGVwaWNrZXItbGlua05hdGl2ZUVsZW1lbnQtaW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAkaW5wdXQub24oYGJsdXIuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5zZXREYXRlKCRjdHJsWydfX2RhdGUnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZSgkaW5wdXQpKCRzY29wZSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnZGF0ZXBpY2tlci1saW5rTmF0aXZlRWxlbWVudCcpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cihcImhyZWZcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJGlucHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpbmtFbGVtZW50KCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyLCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUYWJJbmRleCgkZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpbmtJbmxpbmUoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCBuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIsICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5jcmVhdGVDb250ZW50KCRzY29wZSwgJGVsZW1lbnQsICRjdHJsKTtcclxuICAgICAgICAgICAgJGVsZW1lbnQuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGFiSW5kZXgoJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSkge1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEVsZW1lbnQgPSAkZWxlbWVudC5nZXQoMCk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50VGFiSW5kZXggPSBjdXJyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ0YWJJbmRleFwiKTtcclxuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuc2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIiwgY3VycmVudFRhYkluZGV4ICE9IG51bGwgPyBjdXJyZW50VGFiSW5kZXggOiBcIi0xXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXZ0KG5hbWVzOiBzdHJpbmcsICRzY29wZTogYW5ndWxhci5JU2NvcGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5hbWVzLnNwbGl0KCcgJykubWFwKG5hbWUgPT4gYCR7bmFtZX0uZGF0ZXBpY2tlciR7JHNjb3BlLiRpZH1gKS5qb2luKCcgJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3BvdmVyKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50LCB0ZXRoZXIsICRib2R5OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGV2dCA9IChuYW1lczogc3RyaW5nKSA9PiB0aGlzLmV2dChuYW1lcywgJHNjb3BlKTtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0ge1xyXG4gICAgICAgICAgICAgICAgbW91c2Vkb3duOiBldnQoJ21vdXNlZG93bicpLFxyXG4gICAgICAgICAgICAgICAgZm9jdXM6IGV2dCgnZm9jdXMnKSxcclxuICAgICAgICAgICAgICAgIGNsaWNrOiBldnQoJ2NsaWNrJyksXHJcbiAgICAgICAgICAgICAgICBibHVyOiBldnQoJ2JsdXInKSxcclxuICAgICAgICAgICAgICAgIG1vdXNldXA6IGV2dCgnbW91c2V1cCcpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IG5ldyBQb3BvdmVyU3RhdGUoJGN0cmwpO1xyXG4gICAgICAgICAgICBzdGF0ZS5vbkNoYW5nZSgobmV3U3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ29uQ2hhbmdlJywgYWN0aW9uLCBuZXdTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Nsb3NlJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdvcGVuJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25PcGVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3Rlbk9wZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihldmVudHMubW91c2Vkb3duLCBvbkVsZW1lbnRNb3VzZURvd24pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKGV2ZW50cy5tb3VzZXVwLCBvbkVsZW1lbnRNb3VzZVVwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYm9keS5vZmYoZXZlbnRzLm1vdXNldXApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5DbG9zZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLm9mZihldmVudHMubW91c2Vkb3duKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vZmYoZXZlbnRzLm1vdXNldXApO1xyXG5cclxuICAgICAgICAgICAgICAgICRib2R5Lm9uZShldmVudHMubW91c2V1cCwgb25Cb2R5VXApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvbk9wZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVDb250ZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5vbihldmVudHMubW91c2Vkb3duLCAnZGF0ZS1waWNrZXInLCBvbkNvbnRlbnRCb2R5TW91c2VEb3duKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50Lm9uKGV2ZW50cy5tb3VzZXVwLCAnZGF0ZS1waWNrZXInLCBvbkNvbnRlbnRCb2R5TW91c2VVcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0ZXRoZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXRoZXIucG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5DbG9zZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25DbG9zZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxpc3Rlbk9wZW4oKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUNvbnRlbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5jcmVhdGVEcm9wRG93bigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmQoY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIHRldGhlciA9IG5ldyBUZXRoZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogJGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QXR0YWNobWVudDogJ2JvdHRvbSBjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudDogJ3RvcCBjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzUHJlZml4OiAnZGF0ZXBpY2tlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0T2Zmc2V0OiAnMTRweCAwJyxcclxuICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogJ3dpbmRvdycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50OiAndG9nZXRoZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGluOiBbJ3RvcCcsICdsZWZ0JywgJ2JvdHRvbScsICdyaWdodCddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcHJldmVudEVsZW1lbnRCbHVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuYWxsb3dDbG9zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbmFibGVFbGVtZW50Qmx1ciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLmFsbG93Q2xvc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvbkNvbnRlbnRCb2R5TW91c2VEb3duID0gKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUuaW5mbygnb25Db250ZW50Qm9keU1vdXNlRG93bicpO1xyXG4gICAgICAgICAgICAgICAgcHJldmVudEVsZW1lbnRCbHVyKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvbkNvbnRlbnRCb2R5TW91c2VVcCA9IChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmlzU2VsZWN0aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUuaW5mbygnb25Db250ZW50Qm9keU1vdXNlVXAnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZlbnRCb2R5TW91c2VVcCA9ICgpID0+IHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgICAgICBwcmV2ZW50Qm9keU1vdXNlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyRlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAoJGVsZW1lbnQgYXMgSlF1ZXJ5KS50cmlnZ2VyKFwiZm9jdXNcIik7IC8vIGZvciBmaXJlZm94XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9uRWxlbWVudE1vdXNlRG93biA9IChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ29uRWxlbWVudE1vdXNlRG93bicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmVudEVsZW1lbnRGb2N1cyA9ICgpID0+IHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgICAgICBwcmV2ZW50RWxlbWVudEZvY3VzKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvbkVsZW1lbnRNb3VzZVVwID0gKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUuaW5mbygnb25FbGVtZW50TW91c2VVcCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIC8vJGVsZW1lbnQuZm9jdXMoKTsgLy8gbm93IG1hbnVhbGx5IGZvY3VzXHJcbiAgICAgICAgICAgICAgICAoJGVsZW1lbnQgYXMgSlF1ZXJ5KS50cmlnZ2VyKFwiZm9jdXNcIik7IC8vIGZvciBmaXJlZm94XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvbkVsZW1lbnRGb2N1cyA9IChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ29uRWxlbWVudEZvY3VzJywgZSk7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVFbGVtZW50Qmx1cigpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUub3BlbigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25FbGVtZW50Qmx1ciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXRlLmFsbG93Q2xvc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ29uRWxlbWVudEJsdXInKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvbkJvZHlVcCA9IChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlRWxlbWVudEJsdXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuaXNTZWxlY3RpbmcgfHwgIXN0YXRlLmlzT3BlbiB8fCAkZWxlbWVudC5pcyhlLnRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ29uQm9keVVwJywgZSk7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGV2ZW50cy5mb2N1cywgb25FbGVtZW50Rm9jdXMpO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihldmVudHMuYmx1ciwgb25FbGVtZW50Qmx1cik7XHJcbiAgICAgICAgICAgIGxpc3Rlbk9wZW4oKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGJvZHkub2ZmKGV2ZW50cy5jbGljayk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudCkgY29udGVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVEcm9wRG93bihzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyLCBsb2NhbFNjb3BlOiBQb3BvdmVyU3RhdGUpOiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnkge1xyXG4gICAgICAgICAgICBzY29wZVsnZHJvcGRvd24nXSA9IGxvY2FsU2NvcGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVwaWNrZXIgPSB0aGlzLmNvbnRyb2xsZXJBcztcclxuXHJcbiAgICAgICAgICAgIHZhciBzaW5nbGVEYXRlQmluZGluZyA9IGBkYXRlPVwiZGF0ZXBpY2tlci5kYXRlXCIgb24tZGF0ZS1zZWxlY3Q9XCJkcm9wZG93bi5zZXREYXRlKGRhdGUpXCJgLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2VCaW5kaW5nID0gYHN0YXJ0PVwiZGF0ZXBpY2tlci5zdGFydFwiIGVuZD1cImRhdGVwaWNrZXIuZW5kXCIgb24tcmFuZ2Utc2VsZWN0PVwiZHJvcGRvd24uc2V0UmFuZ2Uoc3RhcnQsZW5kKVwiYCxcclxuICAgICAgICAgICAgICAgIGJpbmRpbmdzID0gJGN0cmwuaXNTaW5nbGVEYXRlID8gc2luZ2xlRGF0ZUJpbmRpbmcgOiByYW5nZUJpbmRpbmcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IG5nLWNsYXNzPVwieydkYXRlcGlja2VyLW9wZW4nOmRyb3Bkb3duLmlzT3Blbn1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRhdGUtcGlja2VyIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluLXZpZXc9XCIkeyRhdHRyc1snbWluVmlldyddfVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMtc2VsZWN0aW5nPVwiZHJvcGRvd24uaXNTZWxlY3RpbmdcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7YmluZGluZ3N9XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHRlZD1cImRhdGVwaWNrZXIuaGlnaGxpZ2h0ZWRcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQtZGF0ZT1cInt7ZHJvcGRvd24uZGVmYXVsdERhdGV9fVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2RhdGUtcGlja2VyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgY29udGVudC5hZGRDbGFzcyhcImRhdGVwaWNrZXItZHJvcGRvd25cIik7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5hZGRDbGFzcyhcImRhdGVwaWNrZXItZHJvcGRvd24tLWlzTW9iaWxlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSAkZWxlbWVudC5wb3NpdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9ICRlbGVtZW50Lm91dGVySGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luID0gKCRlbGVtZW50Lm91dGVySGVpZ2h0KHRydWUpIC0gaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBtYXJnaW4gLyAyICsgaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHBvc2l0aW9uLnRvcCArIG9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBwb3NpdGlvbi5sZWZ0XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZShjb250ZW50KShzY29wZSk7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFNjb3BlWydjaGlsZERhdGVwaWNrZXInXSA9IGNvbnRlbnQuZmluZChcIi5kYXRlUGlja2VyXCIpLnNjb3BlKClbJ2RhdGVwaWNrZXInXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldmVudERlZmF1bHQoZTogSlF1ZXJ5LkV2ZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNFc2NhcGUoZTogSlF1ZXJ5LkV2ZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSAyNztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbnRlbnQoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKTogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLiR0ZW1wbGF0ZUNhY2hlLmdldCh0aGlzLmNhbGVuZGFyVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZShjb250ZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwU2VsZWN0aW9ucygkc2NvcGUsICRlbGVtZW50LCAkY3RybCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0dXBEYXlTZWxlY3QoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRheUNzcyA9ICcuZGF0ZVBpY2tlckRheXMtZGF5JyxcclxuICAgICAgICAgICAgICAgICRib2R5OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIG1vdXNlRG93biA9IHRoaXMuZXZ0KCdtb3VzZWRvd24gdG91Y2hzdGFydCcsICRzY29wZSksXHJcbiAgICAgICAgICAgICAgICBtb3VzZVVwID0gdGhpcy5ldnQoJ21vdXNldXAgdG91Y2hlbmQnLCAkc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25TZWxlY3RlZCA9IChyYW5nZTogRGF0ZVBpY2tlck1vdXNlUmFuZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXlzID0gcmFuZ2UuZ2V0RGF5cygpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0ZWQoZGF5cyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihtb3VzZURvd24sIGRheUNzcywgKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUuaW5mbygnZGF5IG1vdXNlZG93bicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gbmV3IERhdGVQaWNrZXJNb3VzZVJhbmdlKCRjdHJsLCBlKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLmlzU2VsZWN0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYm9keS5vbmUobW91c2VVcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKCdkYXkgYm9keSBtb3VzZXVwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldHVwUmFuZ2VTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCwgJGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRib2R5OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIG1vdXNlRG93biA9IHRoaXMuZXZ0KCdtb3VzZWRvd24gdG91Y2hzdGFydCcsICRzY29wZSksXHJcbiAgICAgICAgICAgICAgICBtb3VzZU92ZXIgPSB0aGlzLmV2dCgnbW91c2VvdmVyIHRvdWNoZW5kJywgJHNjb3BlKSxcclxuICAgICAgICAgICAgICAgIG1vdXNlVXAgPSB0aGlzLmV2dCgnbW91c2V1cCcsICRzY29wZSksXHJcbiAgICAgICAgICAgICAgICBkYXlDc3MgPSAnLmRhdGVQaWNrZXJEYXlzLWRheSc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvblNlbGVjdGluZyA9IChyYW5nZTogRGF0ZVBpY2tlck1vdXNlUmFuZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRheXMgPSByYW5nZS5nZXREYXlzKCk7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3RpbmcoZGF5cyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvblNlbGVjdGVkID0gKHJhbmdlOiBEYXRlUGlja2VyTW91c2VSYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF5cyA9IHJhbmdlLmdldERheXMoKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdGVkKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VEb3duLCBkYXlDc3MsIChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ3JhbmdlIG1vdXNlZG93bicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gbmV3IERhdGVQaWNrZXJNb3VzZVJhbmdlKCRjdHJsLCBlKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLmlzU2VsZWN0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vbihtb3VzZU92ZXIsIGRheUNzcywgKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ3JhbmdlIG1vdXNlb3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc2V0RW5kKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0aW5nKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRib2R5Lm9uZShtb3VzZVVwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ3JhbmdlIGJvZHkgbW91c2V1cCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihtb3VzZU92ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLmlzU2VsZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RlZChyYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLmRpcmVjdGl2ZSgnZGF0ZVBpY2tlcicsIERhdGVQaWNrZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG5cclxuICAgIC8vIERhdGVQaWNrZXJSYW5nZVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICBzdGFydDogc3RyaW5nO1xyXG4gICAgICAgIGVuZDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJSYW5nZSBpbXBsZW1lbnRzIElEYXRlUGlja2VyUmFuZ2Uge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBhbnksIGVuZDogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBtU3RhcnQgPSBtb21lbnQoc3RhcnQpO1xyXG4gICAgICAgICAgICB2YXIgbUVuZCA9IG1vbWVudChlbmQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1FbmQuaXNCZWZvcmUobVN0YXJ0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBtU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBtU3RhcnQgPSBtRW5kO1xyXG4gICAgICAgICAgICAgICAgbUVuZCA9IHRlbXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBtU3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbUVuZC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0OiBzdHJpbmc7XHJcbiAgICAgICAgZW5kOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlck1vbnRoXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyTW9udGgge1xyXG4gICAgICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJNb250aCBpbXBsZW1lbnRzIElEYXRlUGlja2VyTW9udGgge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBtID0gbW9tZW50KCk7XHJcbiAgICAgICAgICAgIHZhciB0aGlzTW9udGggPSBtLm1vbnRoKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG0ubW9udGgodmFsdWUpLmZvcm1hdCgnTU1NJyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50TW9udGggPSB2YWx1ZSA9PT0gdGhpc01vbnRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERhdGVQaWNrZXJNb250aFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlclllYXIge1xyXG4gICAgICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICAgICAgaXNDdXJyZW50WWVhcjogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyWWVhciBpbXBsZW1lbnRzIElEYXRlUGlja2VyWWVhciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRZZWFyID0gdmFsdWUgPT09IG1vbWVudCgpLnllYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzQ3VycmVudFllYXI6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSURhdGVQaWNrZXJEYXlcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJEYXkge1xyXG4gICAgICAgIGRhdGU6IG51bWJlcjtcclxuICAgICAgICB2YWx1ZTogbW9tZW50Lk1vbWVudDtcclxuICAgICAgICBpc29EYXRlOiBzdHJpbmc7XHJcbiAgICAgICAgaXNUb2RheTogYm9vbGVhbjtcclxuICAgICAgICBpc05vdEluTW9udGg6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3RlZDogYm9vbGVhbjtcclxuICAgICAgICBpc0JlZm9yZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbjtcclxuICAgICAgICBpc1NhbWUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW47XHJcbiAgICAgICAgaXNIaWdobGlnaHRlZDogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyRGF5IGltcGxlbWVudHMgSURhdGVQaWNrZXJEYXkge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGZyb21EYXRlOiBhbnksIGRheU9mV2VlazogbW9tZW50Lk1vbWVudCwgdG9kYXk6IG1vbWVudC5Nb21lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGRheU9mV2Vlay5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzb0RhdGUgPSB0aGlzLnZhbHVlLmZvcm1hdChcIllZWVktREQtTU1cIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMudmFsdWUuZGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzVG9kYXkgPSBkYXlPZldlZWsuaXNTYW1lKHRvZGF5LCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNOb3RJbk1vbnRoID0gIXRoaXMudmFsdWUuaXNTYW1lKGZyb21EYXRlLCAnbW9udGgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGU6IG51bWJlcjtcclxuICAgICAgICB2YWx1ZTogbW9tZW50Lk1vbWVudDtcclxuICAgICAgICBpc29EYXRlOiBzdHJpbmc7XHJcbiAgICAgICAgaXNUb2RheTogYm9vbGVhbjtcclxuICAgICAgICBpc05vdEluTW9udGg6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3RlZDogYm9vbGVhbjtcclxuICAgICAgICBpc0hpZ2hsaWdodGVkOiBib29sZWFuO1xyXG5cclxuICAgICAgICBpc0JlZm9yZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBpc0JlZm9yZSA9IHRoaXMudmFsdWUuaXNCZWZvcmUoZGF5LnZhbHVlLCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpc0JlZm9yZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzU2FtZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBpc1NhbWUgPSB0aGlzLnZhbHVlLmlzU2FtZShkYXkudmFsdWUsICdkYXknKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzU2FtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlclNlcnZpY2VcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJTZXJ2aWNlIHtcclxuICAgICAgICBnZXRNb250aHMoKTogSURhdGVQaWNrZXJNb250aFtdO1xyXG4gICAgICAgIGdldERheXNPZldlZWsoKTogc3RyaW5nW107XHJcbiAgICAgICAgZ2V0WWVhcnMoZnJvbURhdGU6IG1vbWVudC5Nb21lbnQpOiBJRGF0ZVBpY2tlclllYXJbXTtcclxuICAgICAgICBnZXRXZWVrKGZyb21EYXRlOiBtb21lbnQuTW9tZW50LCBzdGFydE9mV2VlazogbW9tZW50Lk1vbWVudCwgdG9kYXk6IG1vbWVudC5Nb21lbnQpOiBJRGF0ZVBpY2tlckRheVtdO1xyXG4gICAgICAgIGdldFJhbmdlRGF5cyhzdGFydDogSURhdGVQaWNrZXJEYXksIGVuZDogSURhdGVQaWNrZXJEYXksIHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pOiBJRGF0ZVBpY2tlckRheVtdO1xyXG4gICAgICAgIGRlc2VsZWN0QWxsKHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pO1xyXG4gICAgICAgIHNlbGVjdERheXMoZGF5czogSURhdGVQaWNrZXJEYXlbXSk7XHJcbiAgICAgICAgaW5wdXRUb01vbWVudCh2YWx1ZTogc3RyaW5nKTogYW55O1xyXG4gICAgICAgIGlucHV0VG9SYW5nZSh2YWx1ZTogc3RyaW5nKTogSURhdGVQaWNrZXJSYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyU2VydmljZSBpbXBsZW1lbnRzIElEYXRlUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgZ2V0TW9udGhzKCk6IElEYXRlUGlja2VyTW9udGhbXSB7XHJcbiAgICAgICAgICAgIHZhciBtb250aHMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJNb250aD4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbW9udGhzLnB1c2gobmV3IERhdGVQaWNrZXJNb250aChpKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtb250aHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRZZWFycyhmcm9tRGF0ZSk6IElEYXRlUGlja2VyWWVhcltdIHtcclxuICAgICAgICAgICAgdmFyIGZyb21ZZWFyID0gbW9tZW50KGZyb21EYXRlKS55ZWFyKCksXHJcbiAgICAgICAgICAgICAgICB5ZWFycyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlclllYXI+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZnJvbVllYXI7IGkgPD0gKGZyb21ZZWFyICsgOCk7IGkrKylcclxuICAgICAgICAgICAgICAgIHllYXJzLnB1c2gobmV3IERhdGVQaWNrZXJZZWFyKGkpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB5ZWFycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFdlZWsoZnJvbURhdGU6IG1vbWVudC5Nb21lbnQsIHN0YXJ0T2ZXZWVrOiBtb21lbnQuTW9tZW50LCB0b2RheTogbW9tZW50Lk1vbWVudCk6IElEYXRlUGlja2VyRGF5W10ge1xyXG4gICAgICAgICAgICB2YXIgZW5kT2ZXZWVrID0gc3RhcnRPZldlZWsuY2xvbmUoKS5lbmRPZignd2VlaycpO1xyXG4gICAgICAgICAgICB2YXIgZGF5cyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlckRheT4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF5T2ZXZWVrID0gc3RhcnRPZldlZWsuY2xvbmUoKTsgZGF5T2ZXZWVrLmlzQmVmb3JlKGVuZE9mV2Vlayk7IGRheU9mV2Vlay5hZGQoMSwgJ2RheXMnKSkge1xyXG4gICAgICAgICAgICAgICAgZGF5cy5wdXNoKG5ldyBEYXRlUGlja2VyRGF5KGZyb21EYXRlLCBkYXlPZldlZWssIHRvZGF5KSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0RGF5c09mV2VlaygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQud2Vla2RheXNTaG9ydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0UmFuZ2VEYXlzKHN0YXJ0OiBJRGF0ZVBpY2tlckRheSwgZW5kOiBJRGF0ZVBpY2tlckRheSwgd2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSk6IElEYXRlUGlja2VyRGF5W10ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVuZC5pc0JlZm9yZShzdGFydCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IGVuZDtcclxuICAgICAgICAgICAgICAgIGVuZCA9IHRlbXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhbGxEYXlzID0gbmV3IEFycmF5PElEYXRlUGlja2VyRGF5PigpLFxyXG4gICAgICAgICAgICAgICAgaXNBZGRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHdlZWtzLmZvckVhY2god2VlayA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZWVrLmZvckVhY2goZGF5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5LmlzU2FtZShzdGFydCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWRkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQWRkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbERheXMucHVzaChkYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRheS5pc1NhbWUoZW5kKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBZGRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxEYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVzZWxlY3RBbGwod2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSkge1xyXG4gICAgICAgICAgICB3ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2Vlay5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5LmlzU2VsZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3REYXlzKGRheXM6IElEYXRlUGlja2VyRGF5W10pIHtcclxuICAgICAgICAgICAgZGF5cy5mb3JFYWNoKGRheSA9PiBkYXkuaXNTZWxlY3RpbmcgPSB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0VG9Nb21lbnQodmFsdWU6IHN0cmluZyk6IG1vbWVudC5Nb21lbnQge1xyXG4gICAgICAgICAgICB2YXIgbGFuZyA9IG1vbWVudC5sb2NhbGVEYXRhKCk7XHJcbiAgICAgICAgICAgIHZhciBmb3JtYXRzID0gW1xyXG4gICAgICAgICAgICAgICAgbGFuZy5sb25nRGF0ZUZvcm1hdChcImxcIilcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvLS9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyAgL2csICcgJyksXHJcbiAgICAgICAgICAgICAgICBsYW5nLmxvbmdEYXRlRm9ybWF0KFwiTFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQodmFsdWUsIGZvcm1hdHMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHllYXIgPSBkYXRlLnllYXIoKTtcclxuICAgICAgICAgICAgaWYoeWVhciA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFllYXIgPSBtb21lbnQoKS55ZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWRkWWVhcnMgPSBjdXJyZW50WWVhciAtIChjdXJyZW50WWVhciUxMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3WWVhciA9IHllYXIgKyBhZGRZZWFycztcclxuICAgICAgICAgICAgICAgIGRhdGUuc2V0KCd5ZWFyJywgbmV3WWVhcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXRUb1JhbmdlKHZhbHVlOiBzdHJpbmcpOiBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgIXZhbHVlLnRyaW0oKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgdmFyIHRyaW1tZWQgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnRyaW0oKTtcclxuICAgICAgICAgICAgdmFyIGV4cFN0YXJ0ID0gbmV3IFJlZ0V4cChcIl4oKFswLTldezEsNH1bIF0qKXszfSlcIik7XHJcbiAgICAgICAgICAgIHZhciBleHBFbmQgPSBuZXcgUmVnRXhwKFwiKChbMC05XXsxLDR9WyBdKil7M30pJFwiKTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0UmVzdWx0ID0gZXhwU3RhcnQuZXhlYyh0cmltbWVkKTtcclxuICAgICAgICAgICAgdmFyIGVuZFJlc3VsdCA9IGV4cEVuZC5leGVjKHRyaW1tZWQpO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmlucHV0VG9Nb21lbnQoc3RhcnRSZXN1bHRbMF0udHJpbSgpKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMuaW5wdXRUb01vbWVudCgoZW5kUmVzdWx0WzBdIHx8IHN0YXJ0UmVzdWx0WzBdKS50cmltKCkpO1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBuZXcgRGF0ZVBpY2tlclJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLnNlcnZpY2UoJ2RhdGVQaWNrZXJTZXJ2aWNlJywgRGF0ZVBpY2tlclNlcnZpY2UpO1xyXG59IiwiXHJcbm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyQ29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSAkcG9zdExpbmsoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld1ZhbHVlKHRoaXMuX3RpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX3RpbWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgZ2V0IHRpbWUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgdGltZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc0NoYW5nZWQgPSB0aGlzLl90aW1lICE9PSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKCFoYXNDaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGltZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXdWYWx1ZSh2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh7IHRpbWU6IHZhbHVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRWaWV3VmFsdWUodGltZTogc3RyaW5nKSB7fTtcclxuICAgICAgICBvbkNoYW5nZTogKHBhcmFtczogeyB0aW1lOiBzdHJpbmcgfSkgPT4gdm9pZDtcclxuICAgICAgICBwcml2YXRlIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLmNvbnRyb2xsZXIoJ3RpbWVQaWNrZXInLCBUaW1lUGlja2VyQ29udHJvbGxlcik7XHJcblxyXG4gICAgY2xhc3MgVGltZVBpY2tlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJ3RpbWVQaWNrZXJTZXJ2aWNlJywgJ2lzTW9iaWxlJywgJyRwYXJzZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVQaWNrZXJTZXJ2aWNlOiBJVGltZVBpY2tlclNlcnZpY2UsIHByaXZhdGUgaXNNb2JpbGU6IGJvb2xlYW4sIHByaXZhdGUgJHBhcnNlOiBhbmd1bGFyLklQYXJzZVNlcnZpY2UpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ3RpbWVQaWNrZXInLCAnbmdNb2RlbCddO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBUaW1lUGlja2VyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndGltZXBpY2tlcic7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpbWU6ICc9JyxcclxuICAgICAgICAgICAgb25DaGFuZ2U6ICcmJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBbJGN0cmwsICRuZ01vZGVsQ3RybF06IFtUaW1lUGlja2VyQ29udHJvbGxlciwgYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXJdKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtNb2JpbGUoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCwgJG5nTW9kZWxDdHJsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5saW5rRGVza3RvcCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsLCAkbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmtNb2JpbGUgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybDogVGltZVBpY2tlckNvbnRyb2xsZXIsICRuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucHJvcCgndHlwZScsICd0aW1lJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXRWaWV3VmFsdWUgPSAodGltZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWV3VmFsdWUgPSB0aGlzLnRpbWVQaWNrZXJTZXJ2aWNlLmZvcm1hdElzbyh0aW1lKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHZpZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkY3RybC5zZXRWaWV3VmFsdWUgPSBzZXRWaWV3VmFsdWU7XHJcblxyXG4gICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHZpZXdDaGFuZ2VMaXN0ZW5lcnMucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC50aW1lID0gdGhpcy50aW1lUGlja2VyU2VydmljZS5mb3JtYXRJc28oJG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUsIG51bGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rRGVza3RvcCA9ICgkc2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRycywgJGN0cmw6IFRpbWVQaWNrZXJDb250cm9sbGVyLCAkbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50SWQgPSAoLi4ubmFtZXM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZXMubWFwKG5hbWUgPT4gYCR7bmFtZX0uJHskc2NvcGUuJGlkfWApLmpvaW4oJyAnKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRjdHJsLnRpbWUgPSB0aGlzLnRpbWVQaWNrZXJTZXJ2aWNlLmZvcm1hdElzbygkbmdNb2RlbEN0cmwuJG1vZGVsVmFsdWUsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzVmFsaWRUaW1lID0gJGN0cmwudGltZSAhPSBudWxsXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1JlcXVpcmVkID0gJGF0dHJzWydyZXF1aXJlZCddO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNWYWxpZCA9ICFpc1JlcXVpcmVkIHx8IChpc1JlcXVpcmVkICYmIGlzVmFsaWRUaW1lKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kc2V0VmFsaWRpdHkoJ2ludmFsaWRUaW1lJywgaXNWYWxpZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlT25FbnRlciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBFTlRFUl9LRVkgPSAxMztcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleURvd24gPSBlID0+IGUud2hpY2g7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGtleURvd24oZSkgIT09IEVOVEVSX0tFWSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNldFZpZXdWYWx1ZSA9ICh0aW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdWYWx1ZSA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UuZm9ybWF0KHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRjdHJsLnNldFZpZXdWYWx1ZSA9IHNldFZpZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAub24oZXZlbnRJZCgnYmx1cicpLCB1cGRhdGUpXHJcbiAgICAgICAgICAgICAgICAub24oZXZlbnRJZCgna2V5ZG93bicpLCB1cGRhdGVPbkVudGVyKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKGV2ZW50SWQoJ2JsdXInLCAna2V5ZG93bicpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuZGlyZWN0aXZlKCd0aW1lUGlja2VyJywgVGltZVBpY2tlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVGltZVBpY2tlclNlcnZpY2Uge1xyXG4gICAgICAgIHBhcnNlKHRleHQ6IHN0cmluZyk6IGFueTtcclxuICAgICAgICBmb3JtYXQodGV4dDogc3RyaW5nLCB2YWx1ZT86IHN0cmluZyk6IHN0cmluZztcclxuICAgICAgICBmb3JtYXRJc28odGV4dDogc3RyaW5nLCB2YWx1ZT86IHN0cmluZyk6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyU2VydmljZSBpbXBsZW1lbnRzIElUaW1lUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgcGFyc2UodGV4dDogc3RyaW5nKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIHBhdHRlcm5zID0gW1xyXG4gICAgICAgICAgICAgICAgJ0xUJyxcclxuICAgICAgICAgICAgICAgICdMVFMnLFxyXG4gICAgICAgICAgICAgICAgJ0hIOm1tOnNzJyxcclxuICAgICAgICAgICAgICAgICdISDptbSBBJ1xyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KHRleHQsIHBhdHRlcm5zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdCh0ZXh0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5wYXJzZSh0ZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIG0uaXNWYWxpZCgpID8gbS5mb3JtYXQoJ0xUJykgOiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdElzbyh0ZXh0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5wYXJzZSh0ZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIG0uaXNWYWxpZCgpID8gbS5mb3JtYXQoXCJISDptbTpzc1wiKSA6IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5zZXJ2aWNlKCd0aW1lUGlja2VyU2VydmljZScsIFRpbWVQaWNrZXJTZXJ2aWNlKTtcclxufSJdfQ==