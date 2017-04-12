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
        }
        DatePickerController.prototype.onInit = function () {
            if (this.defaultDate == "")
                this.defaultDate = null;
            this.dateInternal = this.isSingleDate ? (this.date || this.defaultDate) : this.start;
            this.calculate(this.dateInternal);
            this.initialized = true;
        };
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
                ctrl.onInit();
                // Fixes a bug where Tether cannot correctly get width/height because of ngAnimate
                var $animate = _this.$injector.get('$animate');
                if ($animate != null)
                    $animate.enabled(false, $element);
                if ($element.is('input[type="text"]')) {
                    if (_this.isMobile)
                        _this.linkNative($scope, $element, $attrs, ngModelCtrl);
                    else
                        _this.linkInput($scope, $element, $attrs, ngModelCtrl);
                }
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
        DatePickerDirective.prototype.linkNative = function ($scope, $element, $attrs, ngModelCtrl) {
            var ctrl = $scope[this.controllerAs];
            var dateFormat = function (date) {
                var iso = date == null ? '' : moment(date).format("YYYY-MM-DD");
                return iso;
            };
            var monthFormat = function (date) {
                var iso = date == null ? '' : moment(date).format("YYYY-MM");
                return iso;
            };
            var type = "date", formatter = dateFormat;
            if ($attrs['minView'] == "months") {
                type = "month";
                formatter = monthFormat;
            }
            $element.prop("type", type);
            var setViewValue = function (date) {
                var iso = formatter(date);
                ngModelCtrl.$setViewValue(iso);
                ngModelCtrl.$render();
            };
            $scope.$watch(function () { return ctrl.date; }, function (date) {
                setViewValue(date);
            });
            ngModelCtrl.$viewChangeListeners.push(function () {
                var m = moment(ngModelCtrl.$viewValue);
                ctrl.date = m.isValid() ? dateFormat(ngModelCtrl.$viewValue) : null;
            });
            setViewValue(ctrl.date || ctrl.defaultDate);
        };
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
            var currentElement = $element.get(0);
            var currentTabIndex = currentElement.getAttribute("tabIndex");
            currentElement.setAttribute("tabIndex", currentTabIndex != null ? currentTabIndex : "-1");
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
                time: '='
            };
            this.link = function ($scope, $element, $attrs, ctrls) {
                var $ctrl = ctrls[0], $ngModelCtrl = ctrls[1];
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
                $scope.$watch(function () { return $ctrl.time; }, function (time) {
                    setViewValue(time);
                });
                $ngModelCtrl.$viewChangeListeners.push(function () {
                    var iso = _this.timePickerService.formatIso($ngModelCtrl.$viewValue, null);
                    $ctrl.time = iso;
                });
                setViewValue($ctrl.time);
            };
            this.linkDesktop = function ($scope, $element, $attrs, $ctrl, $ngModelCtrl) {
                $element.on("blur." + $scope.$id, function () {
                    var m = _this.timePickerService.parse($ngModelCtrl.$modelValue);
                    $ctrl.time = m.isValid() ? m.format("HH:mm:ss") : null;
                    setViewValue($ngModelCtrl.$modelValue);
                    var isRequired = $attrs['required'];
                    var isValid = !isRequired || (isRequired && m.isValid());
                    $ngModelCtrl.$setValidity('invalidTime', isValid);
                    $scope.$apply();
                });
                $scope.$on('$destroy', function () {
                    $element.off("blur." + $scope.$id);
                });
                var setViewValue = function (value) {
                    var viewValue = _this.timePickerService.format(value);
                    $ngModelCtrl.$setViewValue(viewValue);
                    $ngModelCtrl.$render();
                };
                $scope.$watch(function () { return $ctrl.time; }, function (time) {
                    setViewValue(time);
                });
                setViewValue($ctrl.time);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kYXRlcGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyIsIi4uL3NyYy9tb2JpbGUudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXIudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXItc2VydmljZS50cyIsIi4uL3NyYy90aW1lLXBpY2tlci50cyIsIi4uL3NyYy90aW1lLXBpY2tlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FDQW5DLElBQU8sZ0JBQWdCLENBY3RCO0FBZEQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBQ3JCO1FBQUE7UUFVQSxDQUFDO1FBVFUscUJBQVEsR0FBZjtZQUNJLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkUsSUFBSSxLQUFLLEdBQUcsMFRBQTBULENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5WLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksS0FBSyxHQUFHLHlrREFBeWtELENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXhtRCxNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUMxQixDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBVkQsSUFVQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUNqRixDQUFDLEVBZE0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQWN0QjtBQ2JELElBQU8sZ0JBQWdCLENBOHNCdEI7QUE5c0JELFdBQU8sZ0JB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LGdCQUFnQixDQStCdEI7QUEvQkQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBUXJCO1FBQUE7UUFvQkEsQ0FBQztRQW5CRyxpQ0FBSyxHQUFMLFVBQU0sSUFBWTtZQUNkLElBQUksUUFBUSxHQUFHO2dCQUNYLElBQUk7Z0JBQ0osS0FBSztnQkFDTCxVQUFVO2dCQUNWLFNBQVM7YUFDWixDQUFDO1lBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUVELGtDQUFNLEdBQU4sVUFBTyxJQUFZLEVBQUUsS0FBa0I7WUFBbEIscUJBQWtCLEdBQWxCLFVBQWtCO1lBQ25DLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoRCxDQUFDO1FBRUQscUNBQVMsR0FBVCxVQUFVLElBQVksRUFBRSxLQUFrQjtZQUFsQixxQkFBa0IsR0FBbEIsVUFBa0I7WUFDdEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3RELENBQUM7UUFDTCx3QkFBQztJQUFELENBQUMsQUFwQkQsSUFvQkM7SUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ25GLENBQUMsRUEvQk0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQStCdEIiLCJzb3VyY2VzQ29udGVudCI6WyJBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiLCBbXSk7IiwibW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG4gICAgY2xhc3MgTW9iaWxlQ29uZmlnIHtcclxuICAgICAgICBzdGF0aWMgaXNNb2JpbGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBhZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3dbXCJvcGVyYVwiXTtcclxuICAgICAgICAgICAgdmFyIHRlc3QxID0gLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWluby9pLnRlc3QoYWdlbnQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFnZW50UHJlZml4ID0gYWdlbnQuc3Vic3RyKDAsIDQpO1xyXG4gICAgICAgICAgICB2YXIgdGVzdDIgPSAvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGFnZW50UHJlZml4KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0ZXN0MSB8fCB0ZXN0MjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuY29uc3RhbnQoJ2lzTW9iaWxlJywgTW9iaWxlQ29uZmlnLmlzTW9iaWxlKCkpO1xyXG59IiwiXHJcbm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuICAgIGRlY2xhcmUgdmFyIFRldGhlcjogYW55O1xyXG5cclxuICAgIGVudW0gRGF0ZVBpY2tlclZpZXcge1xyXG4gICAgICAgIERheXMgPSAwLFxyXG4gICAgICAgIE1vbnRocyA9IDEsXHJcbiAgICAgICAgWWVhcnMgPSAyXHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlckNvbnRyb2xsZXIge1xyXG5cclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGF0dHJzJywgJ2RhdGVQaWNrZXJTZXJ2aWNlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGF0dHJzLCBwcml2YXRlIGRhdGVQaWNrZXJTZXJ2aWNlOiBJRGF0ZVBpY2tlclNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5tb250aE5hbWVzID0gZGF0ZVBpY2tlclNlcnZpY2UuZ2V0TW9udGhzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF5c09mV2VlayA9IGRhdGVQaWNrZXJTZXJ2aWNlLmdldERheXNPZldlZWsoKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoJGF0dHJzLm1pblZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXJzJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5ZZWFycztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblZpZXcgPSBEYXRlUGlja2VyVmlldy5ZZWFycztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3Lk1vbnRocztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuRGF5cztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzU2luZ2xlRGF0ZSA9ICEoJGF0dHJzLnN0YXJ0ICE9IG51bGwgfHwgJGF0dHJzLmVuZCAhPSBudWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVmYXVsdERhdGUgPT0gXCJcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuaXNTaW5nbGVEYXRlID8gKHRoaXMuZGF0ZSB8fCB0aGlzLmRlZmF1bHREYXRlKSA6IHRoaXMuc3RhcnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKHRoaXMuZGF0ZUludGVybmFsKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaW5nbGUgRGF0ZVxyXG4gICAgICAgIHByaXZhdGUgX2RhdGU6IHN0cmluZyB8IERhdGU7XHJcblxyXG4gICAgICAgIGdldCBkYXRlKCk6IHN0cmluZyB8IERhdGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBkYXRlKHZhbHVlOiBzdHJpbmcgfCBEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuX2RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSYW5nZVxyXG4gICAgICAgIHByaXZhdGUgX3N0YXJ0OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGdldCBzdGFydCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgc3RhcnQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydCA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZClcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5fc3RhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9lbmQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgZ2V0IGVuZCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5kO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGVuZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZCA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25EYXRlU2VsZWN0O1xyXG4gICAgICAgIG9uUmFuZ2VTZWxlY3Q7XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHZpZXc6IERhdGVQaWNrZXJWaWV3O1xyXG4gICAgICAgIG1pblZpZXc6IERhdGVQaWNrZXJWaWV3O1xyXG4gICAgICAgIHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW107XHJcbiAgICAgICAgeWVhcnM6IElEYXRlUGlja2VyWWVhcltdO1xyXG4gICAgICAgIG1vbnRoTmFtZXM6IElEYXRlUGlja2VyTW9udGhbXTtcclxuICAgICAgICBkYXlzT2ZXZWVrOiBzdHJpbmdbXTtcclxuICAgICAgICBpc1Zpc2libGU6IGJvb2xlYW47XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgaXNvRm9ybWF0ID0gJ1lZWVktTU0tREQnO1xyXG4gICAgICAgIGlzU2luZ2xlRGF0ZTogYm9vbGVhbjtcclxuICAgICAgICBoaWdobGlnaHRlZDogc3RyaW5nW107XHJcbiAgICAgICAgZGVmYXVsdERhdGU6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfZGF0ZUludGVybmFsO1xyXG5cclxuICAgICAgICBnZXQgZGF0ZUludGVybmFsKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGRhdGVJbnRlcm5hbCh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBtID0gdmFsdWUgIT0gbnVsbCA/IG1vbWVudCh2YWx1ZSkgOiBtb21lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0ZUludGVybmFsID0gbTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSh0aGlzLl9kYXRlSW50ZXJuYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHRpdGxlKCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuRGF5czpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsLmZvcm1hdCgnTU1NTSBZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3Lk1vbnRoczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsLmZvcm1hdCgnWVlZWScpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5ZZWFyczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlbGVjdCBhIHllYXInO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdmlld1R5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuTW9udGhzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm1vbnRoc1wiO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5ZZWFyczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ5ZWFyc1wiO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuRGF5czpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJkYXlzXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dEYXlzKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID4gRGF0ZVBpY2tlclZpZXcuRGF5cylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuRGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dNb250aHMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPiBEYXRlUGlja2VyVmlldy5Nb250aHMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3Lk1vbnRocztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dZZWFycygpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuWWVhcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWxjdWxhdGUoZnJvbURhdGUpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gbW9tZW50KGZyb21EYXRlKS5zdGFydE9mKCdtb250aCcpLnN0YXJ0T2YoJ3dlZWsnKSxcclxuICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudChmcm9tRGF0ZSkuZW5kT2YoJ21vbnRoJykuZW5kT2YoJ3dlZWsnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2Vla3MgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJEYXlbXT4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF5ID0gbW9tZW50KHN0YXJ0KTsgZGF5LmlzQmVmb3JlKGVuZCk7IGRheS5hZGQoMSwgJ3dlZWsnKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdlZWsgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFdlZWsoZnJvbURhdGUsIGRheSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlZWtzLnB1c2god2Vlayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMueWVhcnMgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFllYXJzKGZyb21EYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzU2VsZWN0ZWQoZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMuZGF0ZSkuaXNTYW1lKGRheS52YWx1ZSwgJ2RheScpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRheS52YWx1ZS5pc0JldHdlZW4odGhpcy5zdGFydCwgdGhpcy5lbmQsICdkYXknKSB8fFxyXG4gICAgICAgICAgICAgICAgZGF5LnZhbHVlLmlzU2FtZSh0aGlzLnN0YXJ0LCAnZGF5JykgfHxcclxuICAgICAgICAgICAgICAgIGRheS52YWx1ZS5pc1NhbWUodGhpcy5lbmQsICdkYXknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzSGlnaGxpZ2h0ZWQoZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oaWdobGlnaHRlZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmhpZ2hsaWdodGVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmhpZ2hsaWdodGVkW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCh2YWx1ZSkuaXNTYW1lKGRheS52YWx1ZSwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGluZyhkYXlzOiBJRGF0ZVBpY2tlckRheVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZGVzZWxlY3RBbGwodGhpcy53ZWVrcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2Uuc2VsZWN0RGF5cyhkYXlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkKGRheXM6IElEYXRlUGlja2VyRGF5W10pIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5kZXNlbGVjdEFsbCh0aGlzLndlZWtzKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGRheXNbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGVuZCA9IGRheXNbZGF5cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWREYXRlKGRheTogSURhdGVQaWNrZXJEYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlID0gbW9tZW50KGRheS52YWx1ZSkuZm9ybWF0KHRoaXMuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgdGhpcy5vbkRhdGVTZWxlY3QoeyBkYXRlOiB0aGlzLmRhdGUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZFJhbmdlKHN0YXJ0OiBJRGF0ZVBpY2tlckRheSwgZW5kOiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHN0YXJ0LnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG1vbWVudChlbmQudmFsdWUpLmZvcm1hdCh0aGlzLmlzb0Zvcm1hdCk7XHJcbiAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiB0aGlzLnN0YXJ0LCBlbmQ6IHRoaXMuZW5kIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0TW9udGgoaWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IHRoaXMubW9udGhOYW1lc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vbnRoKG1vbnRoLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA9PT0gRGF0ZVBpY2tlclZpZXcuTW9udGhzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLmRhdGVJbnRlcm5hbC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IHRoaXMuZGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLmRhdGVJbnRlcm5hbCkuZW5kT2YoJ21vbnRoJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmQgPSBtb21lbnQodGhpcy5kYXRlSW50ZXJuYWwpLmVuZE9mKCdtb250aCcpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiB0aGlzLnN0YXJ0LCBlbmQ6IHRoaXMuZW5kIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93RGF5cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNNb250aChtb250aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlSW50ZXJuYWwubW9udGgoKSA9PSBtb250aC52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldE1vbnRoKG1vbnRoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuc2V0KCdtb250aCcsIG1vbnRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzWWVhcih5ZWFyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVJbnRlcm5hbC55ZWFyKCkgPT0geWVhci52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFllYXIoaWR4KSB7XHJcbiAgICAgICAgICAgIHZhciB5ZWFyID0gdGhpcy55ZWFyc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldFllYXIoeWVhci52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPT09IERhdGVQaWNrZXJWaWV3LlllYXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLmRhdGVJbnRlcm5hbC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IHRoaXMuZGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLmRhdGVJbnRlcm5hbCkuc3RhcnRPZigneWVhcicpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kID0gbW9tZW50KHRoaXMuZGF0ZUludGVybmFsKS5lbmRPZigneWVhcicpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiB0aGlzLnN0YXJ0LCBlbmQ6IHRoaXMuZW5kIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93TW9udGhzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRZZWFyKHllYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5zZXQoJ3llYXInLCB5ZWFyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZNb250aCgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5zdWJ0cmFjdCgxLCAnbW9udGhzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0TW9udGgoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuYWRkKDEsICdtb250aHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZZZWFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnN1YnRyYWN0KDEsICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV4dFllYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuYWRkKDEsICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldlJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnN1YnRyYWN0KDksICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV4dFJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLmFkZCg5LCAneWVhcnMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuY29udHJvbGxlcignZGF0ZVBpY2tlcicsIERhdGVQaWNrZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGluamVjdG9yJywgJyRjb21waWxlJywgJyR0ZW1wbGF0ZUNhY2hlJywgJyR0aW1lb3V0JywgJyR3aW5kb3cnLCAnZGF0ZVBpY2tlclNlcnZpY2UnLCAnaXNNb2JpbGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaW5qZWN0b3IsIHByaXZhdGUgJGNvbXBpbGUsIHByaXZhdGUgJHRlbXBsYXRlQ2FjaGUsIHByaXZhdGUgJHRpbWVvdXQsIHByaXZhdGUgJHdpbmRvdywgcHJpdmF0ZSBkYXRlUGlja2VyU2VydmljZTogSURhdGVQaWNrZXJTZXJ2aWNlLCBwcml2YXRlIGlzTW9iaWxlOiBib29sZWFuKSB7IH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQUUnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnP25nTW9kZWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBEYXRlUGlja2VyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAnZGF0ZXBpY2tlcic7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIC8vIFNpbmdsZSBEYXRlXHJcbiAgICAgICAgICAgIGRhdGU6ICc9JyxcclxuICAgICAgICAgICAgb25EYXRlU2VsZWN0OiAnJicsXHJcblxyXG4gICAgICAgICAgICAvLyBSYW5nZVxyXG4gICAgICAgICAgICBzdGFydDogJz0nLFxyXG4gICAgICAgICAgICBlbmQ6ICc9JyxcclxuICAgICAgICAgICAgb25SYW5nZVNlbGVjdDogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gT3RoZXJcclxuICAgICAgICAgICAgaXNTZWxlY3Rpbmc6ICc9PycsXHJcbiAgICAgICAgICAgIGRlZmF1bHREYXRlOiAnQD8nLFxyXG5cclxuICAgICAgICAgICAgLy8gQ29sbGVjdGlvbiBvZiBkYXRlIHN0cmluZ3MgKGllLiBbJzIwMTItMTItMDEnLCcyMDEyLTEyLTAyJ11cclxuICAgICAgICAgICAgaGlnaGxpZ2h0ZWQ6ICc9PydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYWxlbmRhclRlbXBsYXRlID0gJ2RhdGUtcGlja2VyLmh0bWwnO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpID0+IHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuICAgICAgICAgICAgY3RybC5vbkluaXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpeGVzIGEgYnVnIHdoZXJlIFRldGhlciBjYW5ub3QgY29ycmVjdGx5IGdldCB3aWR0aC9oZWlnaHQgYmVjYXVzZSBvZiBuZ0FuaW1hdGVcclxuICAgICAgICAgICAgdmFyICRhbmltYXRlID0gdGhpcy4kaW5qZWN0b3IuZ2V0KCckYW5pbWF0ZScpO1xyXG4gICAgICAgICAgICBpZiAoJGFuaW1hdGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICRhbmltYXRlLmVuYWJsZWQoZmFsc2UsICRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkZWxlbWVudC5pcygnaW5wdXRbdHlwZT1cInRleHRcIl0nKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rTmF0aXZlKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua0lucHV0KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCRlbGVtZW50LmlzKCdkYXRlLXBpY2tlcicpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rSW5saW5lKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtFbGVtZW50KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRheVNlbGVjdCgkc2NvcGUsICRlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yYW5nZVNlbGVjdCgkc2NvcGUsICRlbGVtZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rTmF0aXZlKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0ZUZvcm1hdCA9IChkYXRlKTogc3RyaW5nID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBpc28gPSBkYXRlID09IG51bGwgPyAnJyA6IG1vbWVudChkYXRlKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzbztcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtb250aEZvcm1hdCA9IChkYXRlKTogc3RyaW5nID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBpc28gPSBkYXRlID09IG51bGwgPyAnJyA6IG1vbWVudChkYXRlKS5mb3JtYXQoXCJZWVlZLU1NXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzbztcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIgPSBkYXRlRm9ybWF0O1xyXG4gICAgICAgICAgICBpZiAoJGF0dHJzWydtaW5WaWV3J10gPT0gXCJtb250aHNcIikge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwibW9udGhcIjtcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlciA9IG1vbnRoRm9ybWF0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRlbGVtZW50LnByb3AoXCJ0eXBlXCIsIHR5cGUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNldFZpZXdWYWx1ZSA9IChkYXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNvID0gZm9ybWF0dGVyKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZShpc28pO1xyXG4gICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiBjdHJsLmRhdGUsIGRhdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0Vmlld1ZhbHVlKGRhdGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG5nTW9kZWxDdHJsLiR2aWV3Q2hhbmdlTGlzdGVuZXJzLnB1c2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIG0gPSBtb21lbnQobmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmRhdGUgPSBtLmlzVmFsaWQoKSA/IGRhdGVGb3JtYXQobmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSkgOiBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNldFZpZXdWYWx1ZShjdHJsLmRhdGUgfHwgY3RybC5kZWZhdWx0RGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rSW5wdXQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlcigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IGN0cmwuZGF0ZSwgZGF0ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSBkYXRlID09IG51bGwgPyAnJyA6IG1vbWVudChkYXRlKS5mb3JtYXQoXCJMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2V0Vmlld1ZhbHVlID0gKHN0YXJ0LCBlbmQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnQgIT0gbnVsbCAmJiBlbmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbVN0YXJ0ID0gbW9tZW50KHN0YXJ0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1FbmQgPSBtb21lbnQoZW5kKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtU3RhcnQuaXNTYW1lKGVuZCwgJ2RheScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gbVN0YXJ0LmZvcm1hdChcIkxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gYCR7bVN0YXJ0LmZvcm1hdChcIkxcIil9IC0gJHttRW5kLmZvcm1hdChcIkxcIil9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IG1vbWVudChlbmQpLmZvcm1hdChcIkxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gbW9tZW50KGVuZCkuZm9ybWF0KFwiTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IGN0cmwuc3RhcnQsIHN0YXJ0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRWaWV3VmFsdWUoc3RhcnQsIGN0cmwuZW5kKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4gY3RybC5lbmQsIGVuZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0Vmlld1ZhbHVlKGN0cmwuc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGNoYW5nZS4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGUgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0VG9Nb21lbnQobmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0ZS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5kYXRlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGUuaXNTYW1lKGN0cmwuZGF0ZSwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuZGF0ZSA9IGRhdGUuZm9ybWF0KGN0cmwuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5pbnB1dFRvUmFuZ2UobmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zdGFydCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuZW5kID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtb21lbnQocmFuZ2Uuc3RhcnQpLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zdGFydCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbW9tZW50KHJhbmdlLmVuZCkuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLmVuZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLnN0YXJ0ID09IG51bGwgfHwgY3RybC5lbmQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb21lbnQocmFuZ2Uuc3RhcnQpLmlzU2FtZShjdHJsLnN0YXJ0LCAnZGF5JykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudChyYW5nZS5lbmQpLmlzU2FtZShjdHJsLmVuZCwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zdGFydCA9IHJhbmdlLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLmVuZCA9IHJhbmdlLmVuZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBrZXlkb3duLiR7JHNjb3BlLiRpZH1gLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghY3RybC5pc1Zpc2libGUgfHwgIXRoaXMuaXNFc2NhcGUoZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpbmtFbGVtZW50KCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gJGVsZW1lbnQuZ2V0KDApO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRhYkluZGV4ID0gY3VycmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIik7XHJcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LnNldEF0dHJpYnV0ZShcInRhYkluZGV4XCIsIGN1cnJlbnRUYWJJbmRleCAhPSBudWxsID8gY3VycmVudFRhYkluZGV4IDogXCItMVwiKTtcclxuICAgICAgICAgICAgdGhpcy5wb3BvdmVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rSW5saW5lKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLmNyZWF0ZUNvbnRlbnQoJHNjb3BlKTtcclxuICAgICAgICAgICAgJGVsZW1lbnQuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0RGF5cyhyYW5nZSwgY3RybCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQ6IElEYXRlUGlja2VyRGF5ID0gYW5ndWxhci5lbGVtZW50KHJhbmdlLnN0YXJ0LnRhcmdldCkuc2NvcGUoKVsnZGF5J10sXHJcbiAgICAgICAgICAgICAgICBlbmQ6IElEYXRlUGlja2VyRGF5ID0gYW5ndWxhci5lbGVtZW50KHJhbmdlLmVuZC50YXJnZXQpLnNjb3BlKClbJ2RheSddO1xyXG4gICAgICAgICAgICB2YXIgZGF5cyA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0UmFuZ2VEYXlzKHN0YXJ0LCBlbmQsIGN0cmwud2Vla3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBvcG92ZXIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgdGV0aGVyLFxyXG4gICAgICAgICAgICAgICAgJGJvZHk6IGFueSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRvTm90UmVvcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGN0cmxbJ2RhdGVTZWxlY3RlZCddID0gKGRhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkb05vdFJlb3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgZG9Ob3RSZW9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGN0cmwub25EYXRlU2VsZWN0KHsgZGF0ZTogZGF0ZSB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGN0cmxbJ3JhbmdlU2VsZWN0ZWQnXSA9IChzdGFydCwgZW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZG9Ob3RSZW9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIGRvTm90UmVvcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjdHJsLm9uUmFuZ2VTZWxlY3QoeyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGNsaWNrLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGZvY3VzLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9Ob3RSZW9wZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmNyZWF0ZURyb3BEb3duKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGV0aGVyID0gbmV3IFRldGhlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogJGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEF0dGFjaG1lbnQ6ICdib3R0b20gY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudDogJ3RvcCBjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc1ByZWZpeDogJ2RhdGVwaWNrZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRPZmZzZXQ6ICcxNHB4IDAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiAnd2luZG93JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50OiAndG9nZXRoZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpbjogWyd0b3AnLCAnbGVmdCcsICdib3R0b20nLCAncmlnaHQnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgdGV0aGVyLnBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJsdXJUaW1lcjtcclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGJsdXIuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIEFsbG93IGFueSBjbGljayBvbiB0aGUgbWVudSB0byBjb21lIHRocm91Z2ggZmlyc3RcclxuICAgICAgICAgICAgICAgIGJsdXJUaW1lciA9IHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLmlzU2VsZWN0aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAkYm9keS5vbihgRE9NTW91c2VTY3JvbGwuJHskc2NvcGUuJGlkfSBtb3VzZXdoZWVsLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAoIWN0cmwuaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFuZ3VsYXIuZWxlbWVudCh0aGlzLiR3aW5kb3cpLm9uKGByZXNpemUuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAgICAgJGJvZHkub24oYGNsaWNrLiR7JHNjb3BlLiRpZH1gLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghY3RybC5pc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY29udGVudCB8fCAkZWxlbWVudC5pcyhlLnRhcmdldCkgfHwgY29udGVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0LmNhbmNlbChibHVyVGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50ICYmIGNvbnRlbnQuaGFzKGUudGFyZ2V0KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGJvZHkub2ZmKGBjbGljay4keyRzY29wZS4kaWR9IERPTU1vdXNlU2Nyb2xsLiR7JHNjb3BlLiRpZH0gbW91c2V3aGVlbC4keyRzY29wZS4kaWR9YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQpIGNvbnRlbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlRHJvcERvd24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBzaW5nbGVEYXRlQmluZGluZyA9IGBkYXRlPVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uZGF0ZVwiIG9uLWRhdGUtc2VsZWN0PVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uZGF0ZVNlbGVjdGVkKGRhdGUpXCJgLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2VCaW5kaW5nID0gYHN0YXJ0PVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uc3RhcnRcIiBlbmQ9XCIke3RoaXMuY29udHJvbGxlckFzfS5lbmRcIiBvbi1yYW5nZS1zZWxlY3Q9XCIke3RoaXMuY29udHJvbGxlckFzfS5yYW5nZVNlbGVjdGVkKHN0YXJ0LGVuZClcImAsXHJcbiAgICAgICAgICAgICAgICBiaW5kaW5ncyA9IGN0cmwuaXNTaW5nbGVEYXRlID8gc2luZ2xlRGF0ZUJpbmRpbmcgOiByYW5nZUJpbmRpbmcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1kcm9wZG93blwiIG5nLWNsYXNzPVwieydkYXRlcGlja2VyLW9wZW4nOiR7dGhpcy5jb250cm9sbGVyQXN9LmlzVmlzaWJsZX1cIj48ZGF0ZS1waWNrZXIgbWluLXZpZXc9XCIkeyRhdHRycy5taW5WaWV3fVwiIGlzLXNlbGVjdGluZz1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmlzU2VsZWN0aW5nXCIgJHtiaW5kaW5nc31cIiBoaWdobGlnaHRlZD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmhpZ2hsaWdodGVkXCIgZGVmYXVsdC1kYXRlPVwie3ske3RoaXMuY29udHJvbGxlckFzfS5kZWZhdWx0RGF0ZX19XCI+PC9kYXRlLXBpY2tlcj48L2Rpdj5gLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogYW55ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gJGVsZW1lbnQucG9zaXRpb24oKSxcclxuICAgICAgICAgICAgICAgIGhlaWdodCA9ICRlbGVtZW50Lm91dGVySGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICBtYXJnaW4gPSAoJGVsZW1lbnQub3V0ZXJIZWlnaHQodHJ1ZSkgLSBoZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gbWFyZ2luIC8gMiArIGhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnRlbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRvcDogcG9zaXRpb24udG9wICsgb2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgbGVmdDogcG9zaXRpb24ubGVmdFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGNvbXBpbGUoY29udGVudCkoJHNjb3BlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldmVudERlZmF1bHQoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzRXNjYXBlKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUud2hpY2ggPT09IDI3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ29udGVudCgkc2NvcGUpIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gdGhpcy4kdGVtcGxhdGVDYWNoZS5nZXQodGhpcy5jYWxlbmRhclRlbXBsYXRlKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLiRjb21waWxlKGNvbnRlbnQpKCRzY29wZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF5U2VsZWN0KCRzY29wZSwgJGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgIGRheUNzcyA9ICcuZGF0ZVBpY2tlckRheXMtZGF5JyxcclxuICAgICAgICAgICAgICAgICRib2R5OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIG1vdXNlRG93biA9IGBtb3VzZWRvd24uJHskc2NvcGUuJGlkfWAsXHJcbiAgICAgICAgICAgICAgICBtb3VzZVVwID0gYG1vdXNldXAuJHskc2NvcGUuJGlkfWA7XHJcblxyXG4gICAgICAgICAgICB2YXIgb25TZWxlY3RlZCA9IHJhbmdlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXlzID0gdGhpcy5nZXREYXlzKHJhbmdlLCBjdHJsKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWQoZGF5cyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihtb3VzZURvd24sIGRheUNzcywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSB7IHN0YXJ0OiBlLCBlbmQ6IGUgfTtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNTZWxlY3RpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRib2R5Lm9uKG1vdXNlVXAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkYm9keS5vZmYobW91c2VVcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3RybC5pc1NlbGVjdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0ZWQocmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmFuZ2VTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdLFxyXG4gICAgICAgICAgICAgICAgJGJvZHk6IGFueSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgbW91c2VEb3duID0gYG1vdXNlZG93bi4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIG1vdXNlT3ZlciA9IGBtb3VzZW92ZXIuJHskc2NvcGUuJGlkfWAsXHJcbiAgICAgICAgICAgICAgICBtb3VzZVVwID0gYG1vdXNldXAuJHskc2NvcGUuJGlkfWAsXHJcbiAgICAgICAgICAgICAgICBkYXlDc3MgPSAnLmRhdGVQaWNrZXJEYXlzLWRheSc7XHJcblxyXG4gICAgICAgICAgICB2YXIgb25TZWxlY3RpbmcgPSByYW5nZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF5cyA9IHRoaXMuZ2V0RGF5cyhyYW5nZSwgY3RybCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGluZyhkYXlzKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBvblNlbGVjdGVkID0gcmFuZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRheXMgPSB0aGlzLmdldERheXMocmFuZ2UsIGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZChkYXlzKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKG1vdXNlRG93biwgZGF5Q3NzLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IHsgc3RhcnQ6IGUsIGVuZDogZSB9O1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1NlbGVjdGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VPdmVyLCBkYXlDc3MsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLmVuZCA9IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RpbmcocmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJvZHkub24obW91c2VVcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihtb3VzZU92ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5Lm9mZihtb3VzZVVwKTtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmlzU2VsZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RlZChyYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLmRpcmVjdGl2ZSgnZGF0ZVBpY2tlcicsIERhdGVQaWNrZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG5cclxuICAgIC8vIERhdGVQaWNrZXJSYW5nZVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICBzdGFydDogc3RyaW5nO1xyXG4gICAgICAgIGVuZDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJSYW5nZSBpbXBsZW1lbnRzIElEYXRlUGlja2VyUmFuZ2Uge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBhbnksIGVuZDogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBtU3RhcnQgPSBtb21lbnQoc3RhcnQpO1xyXG4gICAgICAgICAgICB2YXIgbUVuZCA9IG1vbWVudChlbmQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1FbmQuaXNCZWZvcmUobVN0YXJ0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBtU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBtU3RhcnQgPSBtRW5kO1xyXG4gICAgICAgICAgICAgICAgbUVuZCA9IHRlbXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBtU3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gbUVuZC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0OiBzdHJpbmc7XHJcbiAgICAgICAgZW5kOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlck1vbnRoXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyTW9udGgge1xyXG4gICAgICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJNb250aCBpbXBsZW1lbnRzIElEYXRlUGlja2VyTW9udGgge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBtID0gbW9tZW50KCk7XHJcbiAgICAgICAgICAgIHZhciB0aGlzTW9udGggPSBtLm1vbnRoKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG0ubW9udGgodmFsdWUpLmZvcm1hdCgnTU1NJyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50TW9udGggPSB2YWx1ZSA9PT0gdGhpc01vbnRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGlzQ3VycmVudE1vbnRoOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERhdGVQaWNrZXJNb250aFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlclllYXIge1xyXG4gICAgICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICAgICAgaXNDdXJyZW50WWVhcjogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyWWVhciBpbXBsZW1lbnRzIElEYXRlUGlja2VyWWVhciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRZZWFyID0gdmFsdWUgPT09IG1vbWVudCgpLnllYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzQ3VycmVudFllYXI6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSURhdGVQaWNrZXJEYXlcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJEYXkge1xyXG4gICAgICAgIGRhdGU6IG51bWJlcjtcclxuICAgICAgICB2YWx1ZTogYW55O1xyXG4gICAgICAgIGlzVG9kYXk6IGJvb2xlYW47XHJcbiAgICAgICAgaXNOb3RJbk1vbnRoOiBib29sZWFuO1xyXG4gICAgICAgIGlzU2VsZWN0aW5nOiBib29sZWFuO1xyXG4gICAgICAgIGlzQmVmb3JlKGRheTogSURhdGVQaWNrZXJEYXkpOiBib29sZWFuO1xyXG4gICAgICAgIGlzU2FtZShkYXk6IElEYXRlUGlja2VyRGF5KTogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyRGF5IGltcGxlbWVudHMgSURhdGVQaWNrZXJEYXkge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGZyb21EYXRlOiBhbnksIGRheU9mV2VlazogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBtb21lbnQoZGF5T2ZXZWVrKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlID0gdGhpcy52YWx1ZS5kYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNUb2RheSA9IGRheU9mV2Vlay5pc1NhbWUobW9tZW50KCksICdkYXknKTtcclxuICAgICAgICAgICAgdGhpcy5pc05vdEluTW9udGggPSAhdGhpcy52YWx1ZS5pc1NhbWUoZnJvbURhdGUsICdtb250aCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0ZTogbnVtYmVyO1xyXG4gICAgICAgIHZhbHVlOiBhbnk7XHJcbiAgICAgICAgaXNUb2RheTogYm9vbGVhbjtcclxuICAgICAgICBpc05vdEluTW9udGg6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGlzQmVmb3JlKGRheTogSURhdGVQaWNrZXJEYXkpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGlzQmVmb3JlID0gdGhpcy52YWx1ZS5pc0JlZm9yZShkYXkudmFsdWUsICdkYXknKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzQmVmb3JlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNTYW1lKGRheTogSURhdGVQaWNrZXJEYXkpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGlzU2FtZSA9IHRoaXMudmFsdWUuaXNTYW1lKGRheS52YWx1ZSwgJ2RheScpO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNTYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBEYXRlUGlja2VyU2VydmljZVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlclNlcnZpY2Uge1xyXG4gICAgICAgIGdldE1vbnRocygpOiBJRGF0ZVBpY2tlck1vbnRoW107XHJcbiAgICAgICAgZ2V0RGF5c09mV2VlaygpOiBzdHJpbmdbXTtcclxuICAgICAgICBnZXRZZWFycyhmcm9tRGF0ZSk6IElEYXRlUGlja2VyWWVhcltdO1xyXG4gICAgICAgIGdldFdlZWsoZnJvbURhdGUsIHN0YXJ0T2ZXZWVrKTogSURhdGVQaWNrZXJEYXlbXTtcclxuICAgICAgICBnZXRSYW5nZURheXMoc3RhcnQ6IElEYXRlUGlja2VyRGF5LCBlbmQ6IElEYXRlUGlja2VyRGF5LCB3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKTogSURhdGVQaWNrZXJEYXlbXTtcclxuICAgICAgICBkZXNlbGVjdEFsbCh3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKTtcclxuICAgICAgICBzZWxlY3REYXlzKGRheXM6IElEYXRlUGlja2VyRGF5W10pO1xyXG4gICAgICAgIGlucHV0VG9Nb21lbnQodmFsdWU6IHN0cmluZyk6IGFueTtcclxuICAgICAgICBpbnB1dFRvUmFuZ2UodmFsdWU6IHN0cmluZyk6IElEYXRlUGlja2VyUmFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlclNlcnZpY2UgaW1wbGVtZW50cyBJRGF0ZVBpY2tlclNlcnZpY2Uge1xyXG4gICAgICAgIGdldE1vbnRocygpOiBJRGF0ZVBpY2tlck1vbnRoW10ge1xyXG4gICAgICAgICAgICB2YXIgbW9udGhzID0gbmV3IEFycmF5PElEYXRlUGlja2VyTW9udGg+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG1vbnRocy5wdXNoKG5ldyBEYXRlUGlja2VyTW9udGgoaSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbW9udGhzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0WWVhcnMoZnJvbURhdGUpOiBJRGF0ZVBpY2tlclllYXJbXSB7XHJcbiAgICAgICAgICAgIHZhciBmcm9tWWVhciA9IG1vbWVudChmcm9tRGF0ZSkueWVhcigpLFxyXG4gICAgICAgICAgICAgICAgeWVhcnMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJZZWFyPigpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGZyb21ZZWFyOyBpIDw9IChmcm9tWWVhciArIDgpOyBpKyspXHJcbiAgICAgICAgICAgICAgICB5ZWFycy5wdXNoKG5ldyBEYXRlUGlja2VyWWVhcihpKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geWVhcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRXZWVrKGZyb21EYXRlLCBzdGFydE9mV2Vlayk6IElEYXRlUGlja2VyRGF5W10ge1xyXG4gICAgICAgICAgICB2YXIgZW5kT2ZXZWVrID0gbW9tZW50KHN0YXJ0T2ZXZWVrKS5lbmRPZignd2VlaycpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRheXMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJEYXk+KCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGRheU9mV2VlayA9IG1vbWVudChzdGFydE9mV2Vlayk7IGRheU9mV2Vlay5pc0JlZm9yZShlbmRPZldlZWspOyBkYXlPZldlZWsuYWRkKDEsICdkYXlzJykpIHtcclxuICAgICAgICAgICAgICAgIGRheXMucHVzaChuZXcgRGF0ZVBpY2tlckRheShmcm9tRGF0ZSwgZGF5T2ZXZWVrKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0RGF5c09mV2VlaygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQud2Vla2RheXNTaG9ydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0UmFuZ2VEYXlzKHN0YXJ0OiBJRGF0ZVBpY2tlckRheSwgZW5kOiBJRGF0ZVBpY2tlckRheSwgd2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSk6IElEYXRlUGlja2VyRGF5W10ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVuZC5pc0JlZm9yZShzdGFydCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IGVuZDtcclxuICAgICAgICAgICAgICAgIGVuZCA9IHRlbXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhbGxEYXlzID0gbmV3IEFycmF5PElEYXRlUGlja2VyRGF5PigpLFxyXG4gICAgICAgICAgICAgICAgaXNBZGRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHdlZWtzLmZvckVhY2god2VlayA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZWVrLmZvckVhY2goZGF5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5LmlzU2FtZShzdGFydCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWRkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQWRkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbERheXMucHVzaChkYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRheS5pc1NhbWUoZW5kKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBZGRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxEYXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVzZWxlY3RBbGwod2Vla3M6IElEYXRlUGlja2VyRGF5W11bXSkge1xyXG4gICAgICAgICAgICB3ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2Vlay5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5LmlzU2VsZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3REYXlzKGRheXM6IElEYXRlUGlja2VyRGF5W10pIHtcclxuICAgICAgICAgICAgZGF5cy5mb3JFYWNoKGRheSA9PiBkYXkuaXNTZWxlY3RpbmcgPSB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0VG9Nb21lbnQodmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgICAgIHZhciBsYW5nID0gbW9tZW50LmxvY2FsZURhdGEoKTtcclxuICAgICAgICAgICAgdmFyIGZvcm1hdHMgPSBbXHJcbiAgICAgICAgICAgICAgICBsYW5nLmxvbmdEYXRlRm9ybWF0KFwibFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcgJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKSxcclxuICAgICAgICAgICAgICAgIGxhbmcubG9uZ0RhdGVGb3JtYXQoXCJMXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gIC9nLCAnICcpXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG1vbWVudCh2YWx1ZSwgZm9ybWF0cyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXRUb1JhbmdlKHZhbHVlOiBzdHJpbmcpOiBJRGF0ZVBpY2tlclJhbmdlIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgIXZhbHVlLnRyaW0oKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgdmFyIHRyaW1tZWQgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvICAvZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgLnRyaW0oKTtcclxuICAgICAgICAgICAgdmFyIGV4cFN0YXJ0ID0gbmV3IFJlZ0V4cChcIl4oKFswLTldezEsNH1bIF0qKXszfSlcIik7XHJcbiAgICAgICAgICAgIHZhciBleHBFbmQgPSBuZXcgUmVnRXhwKFwiKChbMC05XXsxLDR9WyBdKil7M30pJFwiKTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0UmVzdWx0ID0gZXhwU3RhcnQuZXhlYyh0cmltbWVkKTtcclxuICAgICAgICAgICAgdmFyIGVuZFJlc3VsdCA9IGV4cEVuZC5leGVjKHRyaW1tZWQpO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmlucHV0VG9Nb21lbnQoc3RhcnRSZXN1bHRbMF0udHJpbSgpKTtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMuaW5wdXRUb01vbWVudCgoZW5kUmVzdWx0WzBdIHx8IHN0YXJ0UmVzdWx0WzBdKS50cmltKCkpO1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBuZXcgRGF0ZVBpY2tlclJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLnNlcnZpY2UoJ2RhdGVQaWNrZXJTZXJ2aWNlJywgRGF0ZVBpY2tlclNlcnZpY2UpO1xyXG59IiwiXHJcbm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyQ29udHJvbGxlciB7XHJcbiAgICAgICAgdGltZTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLmNvbnRyb2xsZXIoJ3RpbWVQaWNrZXInLCBUaW1lUGlja2VyQ29udHJvbGxlcik7XHJcblxyXG4gICAgY2xhc3MgVGltZVBpY2tlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJ3RpbWVQaWNrZXJTZXJ2aWNlJywgJ2lzTW9iaWxlJywgJyRwYXJzZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVQaWNrZXJTZXJ2aWNlOiBJVGltZVBpY2tlclNlcnZpY2UsIHByaXZhdGUgaXNNb2JpbGU6IGJvb2xlYW4sIHByaXZhdGUgJHBhcnNlOiBhbmd1bGFyLklQYXJzZVNlcnZpY2UpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ3RpbWVQaWNrZXInLCAnbmdNb2RlbCddO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBUaW1lUGlja2VyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndGltZXBpY2tlcic7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpbWU6ICc9J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBjdHJsczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgdmFyICRjdHJsOiBUaW1lUGlja2VyQ29udHJvbGxlciA9IGN0cmxzWzBdLFxyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciA9IGN0cmxzWzFdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlua01vYmlsZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsLCAkbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxpbmtEZXNrdG9wKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwsICRuZ01vZGVsQ3RybCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlua01vYmlsZSA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsOiBUaW1lUGlja2VyQ29udHJvbGxlciwgJG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5wcm9wKCd0eXBlJywgJ3RpbWUnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZXRWaWV3VmFsdWUgPSAodGltZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZXdWYWx1ZSA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UuZm9ybWF0SXNvKHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4gJGN0cmwudGltZSwgdGltZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXRWaWV3VmFsdWUodGltZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiR2aWV3Q2hhbmdlTGlzdGVuZXJzLnB1c2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzbyA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UuZm9ybWF0SXNvKCRuZ01vZGVsQ3RybC4kdmlld1ZhbHVlLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLnRpbWUgPSBpc287XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2V0Vmlld1ZhbHVlKCRjdHJsLnRpbWUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmtEZXNrdG9wID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmw6IFRpbWVQaWNrZXJDb250cm9sbGVyLCAkbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGJsdXIuJHskc2NvcGUuJGlkfWAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBtID0gdGhpcy50aW1lUGlja2VyU2VydmljZS5wYXJzZSgkbmdNb2RlbEN0cmwuJG1vZGVsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwudGltZSA9IG0uaXNWYWxpZCgpID8gbS5mb3JtYXQoXCJISDptbTpzc1wiKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0Vmlld1ZhbHVlKCRuZ01vZGVsQ3RybC4kbW9kZWxWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlzUmVxdWlyZWQgPSAkYXR0cnNbJ3JlcXVpcmVkJ107XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNWYWxpZCA9ICFpc1JlcXVpcmVkIHx8IChpc1JlcXVpcmVkICYmIG0uaXNWYWxpZCgpKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWYWxpZGl0eSgnaW52YWxpZFRpbWUnLCBpc1ZhbGlkKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihgYmx1ci4keyRzY29wZS4kaWR9YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNldFZpZXdWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZXdWYWx1ZSA9IHRoaXMudGltZVBpY2tlclNlcnZpY2UuZm9ybWF0KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHZpZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+ICRjdHJsLnRpbWUsIHRpbWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0Vmlld1ZhbHVlKHRpbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNldFZpZXdWYWx1ZSgkY3RybC50aW1lKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5kaXJlY3RpdmUoJ3RpbWVQaWNrZXInLCBUaW1lUGlja2VyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUaW1lUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgcGFyc2UodGV4dDogc3RyaW5nKTogYW55O1xyXG4gICAgICAgIGZvcm1hdCh0ZXh0OiBzdHJpbmcsIHZhbHVlPzogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgICAgIGZvcm1hdElzbyh0ZXh0OiBzdHJpbmcsIHZhbHVlPzogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRpbWVQaWNrZXJTZXJ2aWNlIGltcGxlbWVudHMgSVRpbWVQaWNrZXJTZXJ2aWNlIHtcclxuICAgICAgICBwYXJzZSh0ZXh0OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgcGF0dGVybnMgPSBbXHJcbiAgICAgICAgICAgICAgICAnTFQnLFxyXG4gICAgICAgICAgICAgICAgJ0xUUycsXHJcbiAgICAgICAgICAgICAgICAnSEg6bW06c3MnLFxyXG4gICAgICAgICAgICAgICAgJ0hIOm1tIEEnXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQodGV4dCwgcGF0dGVybnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybWF0KHRleHQ6IHN0cmluZywgdmFsdWU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIG0gPSB0aGlzLnBhcnNlKHRleHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbS5pc1ZhbGlkKCkgPyBtLmZvcm1hdCgnTFQnKSA6IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybWF0SXNvKHRleHQ6IHN0cmluZywgdmFsdWU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIG0gPSB0aGlzLnBhcnNlKHRleHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbS5pc1ZhbGlkKCkgPyBtLmZvcm1hdChcIkhIOm1tOnNzXCIpIDogdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdEYXRlUGlja2VyXCIpLnNlcnZpY2UoJ3RpbWVQaWNrZXJTZXJ2aWNlJywgVGltZVBpY2tlclNlcnZpY2UpO1xyXG59Il19