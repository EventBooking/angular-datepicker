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
            this.dateInternal = (this.isSingleDate ? this.date : this.start) || this.defaultDate;
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
                date: '=?',
                onDateSelect: '&',
                // Range
                start: '=?',
                end: '=?',
                onRangeSelect: '&',
                // Other
                isSelecting: '=?',
                defaultDate: '@?',
                // Collection of date strings (ie. ['2012-12-01','2012-12-02']
                highlighted: '=?'
            };
            this.calendarTemplate = 'date-picker.html';
            this.link = function ($scope, $element, $attrs, ngModelCtrl) {
                var $ctrl = $scope[_this.controllerAs];
                $ctrl.onInit();
                // Fixes a bug where Tether cannot correctly get width/height because of ngAnimate
                var $animate = _this.$injector.get('$animate');
                if ($animate != null)
                    $animate.enabled(false, $element);
                var linkRun = function (fn) {
                    fn.call(_this, $scope, $element, $attrs, ngModelCtrl, $ctrl);
                };
                if ($element.is('input[type="text"]')) {
                    linkRun(_this.isMobile ? _this.linkNativeInput : _this.linkInput);
                }
                else if ($element.is('date-picker')) {
                    linkRun(_this.linkInline);
                }
                else {
                    linkRun(_this.isMobile ? _this.linkNativeElement : _this.linkElement);
                }
                if ($ctrl.isSingleDate) {
                    _this.daySelect($scope, $element);
                    return;
                }
                _this.rangeSelect($scope, $element);
            };
        }
        DatePickerDirective.prototype.linkNativeInput = function ($scope, $element, $attrs, ngModelCtrl) {
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
                    if (typeof attr != "undefined")
                        _this.attrs.push(getAttr(name, attr));
                    return _builder;
                };
                this.addBinding = function (name, attr, ctrl) {
                    if (typeof attr != "undefined")
                        _this.attrs.push(getVmAttr(name, ctrl));
                    return _builder;
                };
                this.addEvent = function (name, attr, ctrl) {
                    if (typeof attr != "undefined")
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
                .addLiteral("min-view", $attrs.minView)
                .addBinding("ng-model", true, "dateString")
                .addBinding("date", $attrs.date, "date")
                .addEvent("on-date-select", $attrs.onDateSelect, "onDateSelect(date)")
                .addBinding("start", $attrs.start, "start")
                .addBinding("end", $attrs.end, "end")
                .addEvent("on-rangeSelect", $attrs.onRangeSelect, "onRangeSelect(start,end)")
                .addBinding("is-selecting", $attrs.isSelecting, "isSelecting")
                .addLiteral("default-date", $attrs.defaultDate)
                .addBinding("highlighted", $attrs.highlighted, "highlighted");
            var content = builder.build();
            var $input = angular.element(content)
                .addClass('datepicker-linkNativeElement-input');
            this.$compile($input)($scope);
            $element.addClass('datepicker-linkNativeElement')
                .removeAttr("href")
                .append($input);
            console.log(content);
        };
        DatePickerDirective.prototype.linkElement = function ($scope, $element, $attrs, ngModelCtrl) {
            this.setTabIndex($element);
            this.popover($scope, $element, $attrs);
        };
        DatePickerDirective.prototype.linkInline = function ($scope, $element, $attrs, ngModelCtrl) {
            var content = this.createContent($scope);
            $element.append(content);
        };
        DatePickerDirective.prototype.setTabIndex = function ($element) {
            var currentElement = $element.get(0);
            var currentTabIndex = currentElement.getAttribute("tabIndex");
            currentElement.setAttribute("tabIndex", currentTabIndex != null ? currentTabIndex : "-1");
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
                var update = function () {
                    var m = _this.timePickerService.parse($ngModelCtrl.$modelValue);
                    $ctrl.time = m.isValid() ? m.format("HH:mm:ss") : null;
                    setViewValue($ngModelCtrl.$modelValue);
                    var isRequired = $attrs['required'];
                    var isValid = !isRequired || (isRequired && m.isValid());
                    $ngModelCtrl.$setValidity('invalidTime', isValid);
                    $scope.$apply();
                };
                $element.on("blur." + $scope.$id, update);
                $element.on("keydown." + $scope.$id + " keydown." + $scope.$id, function (e) {
                    if (e.which !== 13)
                        return;
                    update();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kYXRlcGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyIsIi4uL3NyYy9tb2JpbGUudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXIudHMiLCIuLi9zcmMvZGF0ZS1waWNrZXItc2VydmljZS50cyIsIi4uL3NyYy90aW1lLXBpY2tlci50cyIsIi4uL3NyYy90aW1lLXBpY2tlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FDQW5DLElBQU8sZ0JBQWdCLENBY3RCO0FBZEQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBQ3JCO1FBQUE7UUFVQSxDQUFDO1FBVFUscUJBQVEsR0FBZjtZQUNJLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkUsSUFBSSxLQUFLLEdBQUcsMFRBQTBULENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5WLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksS0FBSyxHQUFHLHlrREFBeWtELENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXhtRCxNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUMxQixDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBVkQsSUFVQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUNqRixDQUFDLEVBZE0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQWN0QjtBQ2JELElBQU8sZ0JBQWdCLENBeXdCdEI7QUF6d0JELFdBQU8sZ0JB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TyxnQkFBZ0IsRUFBQyxDQUFDO0lBUXJCO1FBQUE7UUFvQkEsQ0FBQztRQW5CRyxpQ0FBSyxHQUFMLFVBQU0sSUFBWTtZQUNkLElBQUksUUFBUSxHQUFHO2dCQUNYLElBQUk7Z0JBQ0osS0FBSztnQkFDTCxVQUFVO2dCQUNWLFNBQVM7YUFDWixDQUFDO1lBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUVELGtDQUFNLEdBQU4sVUFBTyxJQUFZLEVBQUUsS0FBa0I7WUFBbEIscUJBQWtCLEdBQWxCLFVBQWtCO1lBQ25DLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoRCxDQUFDO1FBRUQscUNBQVMsR0FBVCxVQUFVLElBQVksRUFBRSxLQUFrQjtZQUFsQixxQkFBa0IsR0FBbEIsVUFBa0I7WUFDdEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3RELENBQUM7UUFDTCx3QkFBQztJQUFELENBQUMsQUFwQkQsSUFvQkM7SUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ25GLENBQUMsRUEvQk0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQStCdEIiLCJzb3VyY2VzQ29udGVudCI6WyJBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiLCBbXSk7IiwibW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG4gICAgY2xhc3MgTW9iaWxlQ29uZmlnIHtcclxuICAgICAgICBzdGF0aWMgaXNNb2JpbGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBhZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3dbXCJvcGVyYVwiXTtcclxuICAgICAgICAgICAgdmFyIHRlc3QxID0gLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWluby9pLnRlc3QoYWdlbnQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFnZW50UHJlZml4ID0gYWdlbnQuc3Vic3RyKDAsIDQpO1xyXG4gICAgICAgICAgICB2YXIgdGVzdDIgPSAvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGFnZW50UHJlZml4KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0ZXN0MSB8fCB0ZXN0MjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuY29uc3RhbnQoJ2lzTW9iaWxlJywgTW9iaWxlQ29uZmlnLmlzTW9iaWxlKCkpO1xyXG59IiwiXHJcbm1vZHVsZSBEYXRlUGlja2VyTW9kdWxlIHtcclxuICAgIGRlY2xhcmUgdmFyIFRldGhlcjogYW55O1xyXG5cclxuICAgIGVudW0gRGF0ZVBpY2tlclZpZXcge1xyXG4gICAgICAgIERheXMgPSAwLFxyXG4gICAgICAgIE1vbnRocyA9IDEsXHJcbiAgICAgICAgWWVhcnMgPSAyXHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlckNvbnRyb2xsZXIge1xyXG5cclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGF0dHJzJywgJ2RhdGVQaWNrZXJTZXJ2aWNlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGF0dHJzLCBwcml2YXRlIGRhdGVQaWNrZXJTZXJ2aWNlOiBJRGF0ZVBpY2tlclNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5tb250aE5hbWVzID0gZGF0ZVBpY2tlclNlcnZpY2UuZ2V0TW9udGhzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF5c09mV2VlayA9IGRhdGVQaWNrZXJTZXJ2aWNlLmdldERheXNPZldlZWsoKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoJGF0dHJzLm1pblZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3llYXJzJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBEYXRlUGlja2VyVmlldy5ZZWFycztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblZpZXcgPSBEYXRlUGlja2VyVmlldy5ZZWFycztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRocyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuTW9udGhzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmlldyA9IERhdGVQaWNrZXJWaWV3Lk1vbnRocztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuRGF5cztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblZpZXcgPSBEYXRlUGlja2VyVmlldy5EYXlzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzU2luZ2xlRGF0ZSA9ICEoJGF0dHJzLnN0YXJ0ICE9IG51bGwgfHwgJGF0dHJzLmVuZCAhPSBudWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVmYXVsdERhdGUgPT0gXCJcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9ICh0aGlzLmlzU2luZ2xlRGF0ZSA/IHRoaXMuZGF0ZSA6IHRoaXMuc3RhcnQpIHx8IHRoaXMuZGVmYXVsdERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKHRoaXMuZGF0ZUludGVybmFsKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaW5nbGUgRGF0ZVxyXG4gICAgICAgIHByaXZhdGUgX2RhdGU6IHN0cmluZyB8IERhdGU7XHJcblxyXG4gICAgICAgIGdldCBkYXRlKCk6IHN0cmluZyB8IERhdGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBkYXRlKHZhbHVlOiBzdHJpbmcgfCBEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuX2RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSYW5nZVxyXG4gICAgICAgIHByaXZhdGUgX3N0YXJ0OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGdldCBzdGFydCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgc3RhcnQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydCA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZClcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5fc3RhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9lbmQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgZ2V0IGVuZCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5kO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGVuZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZCA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25EYXRlU2VsZWN0O1xyXG4gICAgICAgIG9uUmFuZ2VTZWxlY3Q7XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHZpZXc6IERhdGVQaWNrZXJWaWV3O1xyXG4gICAgICAgIG1pblZpZXc6IERhdGVQaWNrZXJWaWV3O1xyXG4gICAgICAgIHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW107XHJcbiAgICAgICAgeWVhcnM6IElEYXRlUGlja2VyWWVhcltdO1xyXG4gICAgICAgIG1vbnRoTmFtZXM6IElEYXRlUGlja2VyTW9udGhbXTtcclxuICAgICAgICBkYXlzT2ZXZWVrOiBzdHJpbmdbXTtcclxuICAgICAgICBpc1Zpc2libGU6IGJvb2xlYW47XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgaXNvRm9ybWF0ID0gJ1lZWVktTU0tREQnO1xyXG4gICAgICAgIGlzU2luZ2xlRGF0ZTogYm9vbGVhbjtcclxuICAgICAgICBoaWdobGlnaHRlZDogc3RyaW5nW107XHJcbiAgICAgICAgZGVmYXVsdERhdGU6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfZGF0ZUludGVybmFsO1xyXG5cclxuICAgICAgICBnZXQgZGF0ZUludGVybmFsKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGRhdGVJbnRlcm5hbCh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBtID0gdmFsdWUgIT0gbnVsbCA/IG1vbWVudCh2YWx1ZSkgOiBtb21lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0ZUludGVybmFsID0gbTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSh0aGlzLl9kYXRlSW50ZXJuYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHRpdGxlKCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuRGF5czpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsLmZvcm1hdCgnTU1NTSBZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhdGVQaWNrZXJWaWV3Lk1vbnRoczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUludGVybmFsLmZvcm1hdCgnWVlZWScpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5ZZWFyczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlbGVjdCBhIHllYXInO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdmlld1R5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuTW9udGhzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm1vbnRoc1wiO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYXRlUGlja2VyVmlldy5ZZWFyczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ5ZWFyc1wiO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNhc2UgRGF0ZVBpY2tlclZpZXcuRGF5czpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJkYXlzXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dEYXlzKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taW5WaWV3ID4gRGF0ZVBpY2tlclZpZXcuRGF5cylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuRGF5cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dNb250aHMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPiBEYXRlUGlja2VyVmlldy5Nb250aHMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IERhdGVQaWNrZXJWaWV3Lk1vbnRocztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dZZWFycygpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gRGF0ZVBpY2tlclZpZXcuWWVhcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWxjdWxhdGUoZnJvbURhdGUpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gbW9tZW50KGZyb21EYXRlKS5zdGFydE9mKCdtb250aCcpLnN0YXJ0T2YoJ3dlZWsnKSxcclxuICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudChmcm9tRGF0ZSkuZW5kT2YoJ21vbnRoJykuZW5kT2YoJ3dlZWsnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2Vla3MgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJEYXlbXT4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF5ID0gbW9tZW50KHN0YXJ0KTsgZGF5LmlzQmVmb3JlKGVuZCk7IGRheS5hZGQoMSwgJ3dlZWsnKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdlZWsgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFdlZWsoZnJvbURhdGUsIGRheSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlZWtzLnB1c2god2Vlayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMueWVhcnMgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFllYXJzKGZyb21EYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzU2VsZWN0ZWQoZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMuZGF0ZSkuaXNTYW1lKGRheS52YWx1ZSwgJ2RheScpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRheS52YWx1ZS5pc0JldHdlZW4odGhpcy5zdGFydCwgdGhpcy5lbmQsICdkYXknKSB8fFxyXG4gICAgICAgICAgICAgICAgZGF5LnZhbHVlLmlzU2FtZSh0aGlzLnN0YXJ0LCAnZGF5JykgfHxcclxuICAgICAgICAgICAgICAgIGRheS52YWx1ZS5pc1NhbWUodGhpcy5lbmQsICdkYXknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzSGlnaGxpZ2h0ZWQoZGF5OiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oaWdobGlnaHRlZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmhpZ2hsaWdodGVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmhpZ2hsaWdodGVkW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCh2YWx1ZSkuaXNTYW1lKGRheS52YWx1ZSwgJ2RheScpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGluZyhkYXlzOiBJRGF0ZVBpY2tlckRheVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZGVzZWxlY3RBbGwodGhpcy53ZWVrcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2Uuc2VsZWN0RGF5cyhkYXlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkKGRheXM6IElEYXRlUGlja2VyRGF5W10pIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5kZXNlbGVjdEFsbCh0aGlzLndlZWtzKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGRheXNbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGVuZCA9IGRheXNbZGF5cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWREYXRlKGRheTogSURhdGVQaWNrZXJEYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlID0gbW9tZW50KGRheS52YWx1ZSkuZm9ybWF0KHRoaXMuaXNvRm9ybWF0KTtcclxuICAgICAgICAgICAgdGhpcy5vbkRhdGVTZWxlY3QoeyBkYXRlOiB0aGlzLmRhdGUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZFJhbmdlKHN0YXJ0OiBJRGF0ZVBpY2tlckRheSwgZW5kOiBJRGF0ZVBpY2tlckRheSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KHN0YXJ0LnZhbHVlKS5mb3JtYXQodGhpcy5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IG1vbWVudChlbmQudmFsdWUpLmZvcm1hdCh0aGlzLmlzb0Zvcm1hdCk7XHJcbiAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiB0aGlzLnN0YXJ0LCBlbmQ6IHRoaXMuZW5kIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0TW9udGgoaWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IHRoaXMubW9udGhOYW1lc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vbnRoKG1vbnRoLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmlldyA9PT0gRGF0ZVBpY2tlclZpZXcuTW9udGhzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLmRhdGVJbnRlcm5hbC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IHRoaXMuZGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLmRhdGVJbnRlcm5hbCkuZW5kT2YoJ21vbnRoJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmQgPSBtb21lbnQodGhpcy5kYXRlSW50ZXJuYWwpLmVuZE9mKCdtb250aCcpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiB0aGlzLnN0YXJ0LCBlbmQ6IHRoaXMuZW5kIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93RGF5cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNNb250aChtb250aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlSW50ZXJuYWwubW9udGgoKSA9PSBtb250aC52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldE1vbnRoKG1vbnRoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuc2V0KCdtb250aCcsIG1vbnRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzWWVhcih5ZWFyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVJbnRlcm5hbC55ZWFyKCkgPT0geWVhci52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFllYXIoaWR4KSB7XHJcbiAgICAgICAgICAgIHZhciB5ZWFyID0gdGhpcy55ZWFyc1tpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnNldFllYXIoeWVhci52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZpZXcgPT09IERhdGVQaWNrZXJWaWV3LlllYXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLmRhdGVJbnRlcm5hbC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IHRoaXMuZGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1vbWVudCh0aGlzLmRhdGVJbnRlcm5hbCkuc3RhcnRPZigneWVhcicpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kID0gbW9tZW50KHRoaXMuZGF0ZUludGVybmFsKS5lbmRPZigneWVhcicpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SYW5nZVNlbGVjdCh7IHN0YXJ0OiB0aGlzLnN0YXJ0LCBlbmQ6IHRoaXMuZW5kIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93TW9udGhzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRZZWFyKHllYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5zZXQoJ3llYXInLCB5ZWFyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZNb250aCgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW50ZXJuYWwgPSB0aGlzLmRhdGVJbnRlcm5hbC5zdWJ0cmFjdCgxLCAnbW9udGhzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0TW9udGgoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuYWRkKDEsICdtb250aHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZZZWFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnN1YnRyYWN0KDEsICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV4dFllYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUludGVybmFsID0gdGhpcy5kYXRlSW50ZXJuYWwuYWRkKDEsICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldlJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLnN1YnRyYWN0KDksICd5ZWFycycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV4dFJhbmdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVJbnRlcm5hbCA9IHRoaXMuZGF0ZUludGVybmFsLmFkZCg5LCAneWVhcnMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuY29udHJvbGxlcignZGF0ZVBpY2tlcicsIERhdGVQaWNrZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGluamVjdG9yJywgJyRjb21waWxlJywgJyR0ZW1wbGF0ZUNhY2hlJywgJyR0aW1lb3V0JywgJyR3aW5kb3cnLCAnZGF0ZVBpY2tlclNlcnZpY2UnLCAnaXNNb2JpbGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaW5qZWN0b3IsIHByaXZhdGUgJGNvbXBpbGUsIHByaXZhdGUgJHRlbXBsYXRlQ2FjaGUsIHByaXZhdGUgJHRpbWVvdXQsIHByaXZhdGUgJHdpbmRvdywgcHJpdmF0ZSBkYXRlUGlja2VyU2VydmljZTogSURhdGVQaWNrZXJTZXJ2aWNlLCBwcml2YXRlIGlzTW9iaWxlOiBib29sZWFuKSB7IH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQUUnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnP25nTW9kZWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBEYXRlUGlja2VyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAnZGF0ZXBpY2tlcic7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIC8vIFNpbmdsZSBEYXRlXHJcbiAgICAgICAgICAgIGRhdGU6ICc9PycsXHJcbiAgICAgICAgICAgIG9uRGF0ZVNlbGVjdDogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gUmFuZ2VcclxuICAgICAgICAgICAgc3RhcnQ6ICc9PycsXHJcbiAgICAgICAgICAgIGVuZDogJz0/JyxcclxuICAgICAgICAgICAgb25SYW5nZVNlbGVjdDogJyYnLFxyXG5cclxuICAgICAgICAgICAgLy8gT3RoZXJcclxuICAgICAgICAgICAgaXNTZWxlY3Rpbmc6ICc9PycsXHJcbiAgICAgICAgICAgIGRlZmF1bHREYXRlOiAnQD8nLFxyXG5cclxuICAgICAgICAgICAgLy8gQ29sbGVjdGlvbiBvZiBkYXRlIHN0cmluZ3MgKGllLiBbJzIwMTItMTItMDEnLCcyMDEyLTEyLTAyJ11cclxuICAgICAgICAgICAgaGlnaGxpZ2h0ZWQ6ICc9PydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYWxlbmRhclRlbXBsYXRlID0gJ2RhdGUtcGlja2VyLmh0bWwnO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpID0+IHtcclxuICAgICAgICAgICAgdmFyICRjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gRml4ZXMgYSBidWcgd2hlcmUgVGV0aGVyIGNhbm5vdCBjb3JyZWN0bHkgZ2V0IHdpZHRoL2hlaWdodCBiZWNhdXNlIG9mIG5nQW5pbWF0ZVxyXG4gICAgICAgICAgICB2YXIgJGFuaW1hdGUgPSB0aGlzLiRpbmplY3Rvci5nZXQoJyRhbmltYXRlJyk7XHJcbiAgICAgICAgICAgIGlmICgkYW5pbWF0ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgJGFuaW1hdGUuZW5hYmxlZChmYWxzZSwgJGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbGlua1J1biA9IChmbjogRnVuY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGZuLmNhbGwodGhpcywgJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKCRlbGVtZW50LmlzKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpKSB7XHJcbiAgICAgICAgICAgICAgICBsaW5rUnVuKHRoaXMuaXNNb2JpbGUgPyB0aGlzLmxpbmtOYXRpdmVJbnB1dCA6IHRoaXMubGlua0lucHV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICgkZWxlbWVudC5pcygnZGF0ZS1waWNrZXInKSkge1xyXG4gICAgICAgICAgICAgICAgbGlua1J1bih0aGlzLmxpbmtJbmxpbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGlua1J1bih0aGlzLmlzTW9iaWxlID8gdGhpcy5saW5rTmF0aXZlRWxlbWVudCA6IHRoaXMubGlua0VsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJGN0cmwuaXNTaW5nbGVEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRheVNlbGVjdCgkc2NvcGUsICRlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yYW5nZVNlbGVjdCgkc2NvcGUsICRlbGVtZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rTmF0aXZlSW5wdXQoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCBuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRlRm9ybWF0ID0gKGRhdGUpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzbyA9IGRhdGUgPT0gbnVsbCA/ICcnIDogbW9tZW50KGRhdGUpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNvO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG1vbnRoRm9ybWF0ID0gKGRhdGUpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzbyA9IGRhdGUgPT0gbnVsbCA/ICcnIDogbW9tZW50KGRhdGUpLmZvcm1hdChcIllZWVktTU1cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNvO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlciA9IGRhdGVGb3JtYXQ7XHJcbiAgICAgICAgICAgIGlmICgkYXR0cnNbJ21pblZpZXcnXSA9PSBcIm1vbnRoc1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJtb250aFwiO1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyID0gbW9udGhGb3JtYXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGVsZW1lbnQucHJvcChcInR5cGVcIiwgdHlwZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2V0Vmlld1ZhbHVlID0gKGRhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBpc28gPSBmb3JtYXR0ZXIoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKGlzbyk7XHJcbiAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IGN0cmwuZGF0ZSwgZGF0ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXRWaWV3VmFsdWUoZGF0ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHZpZXdDaGFuZ2VMaXN0ZW5lcnMucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbSA9IG1vbWVudChuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuZGF0ZSA9IG0uaXNWYWxpZCgpID8gZGF0ZUZvcm1hdChuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKSA6IG51bGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2V0Vmlld1ZhbHVlKGN0cmwuZGF0ZSB8fCBjdHJsLmRlZmF1bHREYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpbmtJbnB1dCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wb3BvdmVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3RybC5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4gY3RybC5kYXRlLCBkYXRlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IGRhdGUgPT0gbnVsbCA/ICcnIDogbW9tZW50KGRhdGUpLmZvcm1hdChcIkxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh0ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZXRWaWV3VmFsdWUgPSAoc3RhcnQsIGVuZCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydCAhPSBudWxsICYmIGVuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtU3RhcnQgPSBtb21lbnQoc3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbUVuZCA9IG1vbWVudChlbmQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1TdGFydC5pc1NhbWUoZW5kLCAnZGF5JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBtU3RhcnQuZm9ybWF0KFwiTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBgJHttU3RhcnQuZm9ybWF0KFwiTFwiKX0gLSAke21FbmQuZm9ybWF0KFwiTFwiKX1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gbW9tZW50KGVuZCkuZm9ybWF0KFwiTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBtb21lbnQoZW5kKS5mb3JtYXQoXCJMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh0ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4gY3RybC5zdGFydCwgc3RhcnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFZpZXdWYWx1ZShzdGFydCwgY3RybC5lbmQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiBjdHJsLmVuZCwgZW5kID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRWaWV3VmFsdWUoY3RybC5zdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgY2hhbmdlLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3RybC5pc1NpbmdsZURhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRUb01vbWVudChuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRlLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLmRhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0ZS5pc1NhbWUoY3RybC5kYXRlLCAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3RybC5kYXRlID0gZGF0ZS5mb3JtYXQoY3RybC5pc29Gb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0VG9SYW5nZShuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnN0YXJ0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5lbmQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1vbWVudChyYW5nZS5zdGFydCkuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnN0YXJ0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtb21lbnQocmFuZ2UuZW5kKS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuZW5kID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0cmwuc3RhcnQgPT0gbnVsbCB8fCBjdHJsLmVuZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbWVudChyYW5nZS5zdGFydCkuaXNTYW1lKGN0cmwuc3RhcnQsICdkYXknKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50KHJhbmdlLmVuZCkuaXNTYW1lKGN0cmwuZW5kLCAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnN0YXJ0ID0gcmFuZ2Uuc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuZW5kID0gcmFuZ2UuZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGtleWRvd24uJHskc2NvcGUuJGlkfWAsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjdHJsLmlzVmlzaWJsZSB8fCAhdGhpcy5pc0VzY2FwZShlKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua05hdGl2ZUVsZW1lbnQoJHNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnMsIG5nTW9kZWxDdHJsLCAkY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUYWJJbmRleCgkZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnZXRWbSA9IChuYW1lKSA9PiBgJHt0aGlzLmNvbnRyb2xsZXJBc30uJHtuYW1lfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGdldEF0dHIgPSAobmFtZSwgdmFsdWUpID0+IGAke25hbWV9PVwiJHt2YWx1ZX1cImBcclxuICAgICAgICAgICAgY29uc3QgZ2V0Vm1BdHRyID0gKG5hbWUsIHZhbHVlKSA9PiBnZXRBdHRyKG5hbWUsIGdldFZtKHZhbHVlKSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBUeXBlQnVpbGRlcigpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IF9idWlsZGVyID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEF0dHIgPSAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLnB1c2goZ2V0QXR0cihuYW1lLCB2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYnVpbGRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZExpdGVyYWwgPSAobmFtZSwgYXR0cikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0ciAhPSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLnB1c2goZ2V0QXR0cihuYW1lLCBhdHRyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9idWlsZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQmluZGluZyA9IChuYW1lLCBhdHRyLCBjdHJsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyICE9IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMucHVzaChnZXRWbUF0dHIobmFtZSwgY3RybCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYnVpbGRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50ID0gKG5hbWUsIGF0dHIsIGN0cmwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGF0dHIgIT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRycy5wdXNoKGdldFZtQXR0cihuYW1lLCBjdHJsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9idWlsZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGA8aW5wdXQgZGF0ZS1waWNrZXIgJHt0aGlzLmF0dHJzLmpvaW4oJyAnKX0gcmVxdWlyZWQ+YDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYnVpbGRlciA9IG5ldyBUeXBlQnVpbGRlcigpXHJcbiAgICAgICAgICAgICAgICAuYWRkQXR0cihcInR5cGVcIiwgXCJ0ZXh0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkTGl0ZXJhbChcIm1pbi12aWV3XCIsICRhdHRycy5taW5WaWV3KVxyXG4gICAgICAgICAgICAgICAgLmFkZEJpbmRpbmcoXCJuZy1tb2RlbFwiLCB0cnVlLCBcImRhdGVTdHJpbmdcIilcclxuICAgICAgICAgICAgICAgIC5hZGRCaW5kaW5nKFwiZGF0ZVwiLCAkYXR0cnMuZGF0ZSwgXCJkYXRlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRXZlbnQoXCJvbi1kYXRlLXNlbGVjdFwiLCAkYXR0cnMub25EYXRlU2VsZWN0LCBcIm9uRGF0ZVNlbGVjdChkYXRlKVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEJpbmRpbmcoXCJzdGFydFwiLCAkYXR0cnMuc3RhcnQsIFwic3RhcnRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRCaW5kaW5nKFwiZW5kXCIsICRhdHRycy5lbmQsIFwiZW5kXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRXZlbnQoXCJvbi1yYW5nZVNlbGVjdFwiLCAkYXR0cnMub25SYW5nZVNlbGVjdCwgXCJvblJhbmdlU2VsZWN0KHN0YXJ0LGVuZClcIilcclxuICAgICAgICAgICAgICAgIC5hZGRCaW5kaW5nKFwiaXMtc2VsZWN0aW5nXCIsICRhdHRycy5pc1NlbGVjdGluZywgXCJpc1NlbGVjdGluZ1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZExpdGVyYWwoXCJkZWZhdWx0LWRhdGVcIiwgJGF0dHJzLmRlZmF1bHREYXRlKVxyXG4gICAgICAgICAgICAgICAgLmFkZEJpbmRpbmcoXCJoaWdobGlnaHRlZFwiLCAkYXR0cnMuaGlnaGxpZ2h0ZWQsIFwiaGlnaGxpZ2h0ZWRcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYnVpbGRlci5idWlsZCgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJGlucHV0ID0gYW5ndWxhci5lbGVtZW50KGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2RhdGVwaWNrZXItbGlua05hdGl2ZUVsZW1lbnQtaW5wdXQnKTtcclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZSgkaW5wdXQpKCRzY29wZSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnZGF0ZXBpY2tlci1saW5rTmF0aXZlRWxlbWVudCcpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cihcImhyZWZcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlua0VsZW1lbnQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRhYkluZGV4KCRlbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5wb3BvdmVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW5rSW5saW5lKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLmNyZWF0ZUNvbnRlbnQoJHNjb3BlKTtcclxuICAgICAgICAgICAgJGVsZW1lbnQuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGFiSW5kZXgoJGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gJGVsZW1lbnQuZ2V0KDApO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRhYkluZGV4ID0gY3VycmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIik7XHJcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LnNldEF0dHJpYnV0ZShcInRhYkluZGV4XCIsIGN1cnJlbnRUYWJJbmRleCAhPSBudWxsID8gY3VycmVudFRhYkluZGV4IDogXCItMVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldERheXMocmFuZ2UsIGN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0OiBJRGF0ZVBpY2tlckRheSA9IGFuZ3VsYXIuZWxlbWVudChyYW5nZS5zdGFydC50YXJnZXQpLnNjb3BlKClbJ2RheSddLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBJRGF0ZVBpY2tlckRheSA9IGFuZ3VsYXIuZWxlbWVudChyYW5nZS5lbmQudGFyZ2V0KS5zY29wZSgpWydkYXknXTtcclxuICAgICAgICAgICAgdmFyIGRheXMgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldFJhbmdlRGF5cyhzdGFydCwgZW5kLCBjdHJsLndlZWtzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3BvdmVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xyXG4gICAgICAgICAgICB2YXIgY29udGVudCxcclxuICAgICAgICAgICAgICAgIHRldGhlcixcclxuICAgICAgICAgICAgICAgICRib2R5OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkb05vdFJlb3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjdHJsWydkYXRlU2VsZWN0ZWQnXSA9IChkYXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZG9Ob3RSZW9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIGRvTm90UmVvcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjdHJsLm9uRGF0ZVNlbGVjdCh7IGRhdGU6IGRhdGUgfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjdHJsWydyYW5nZVNlbGVjdGVkJ10gPSAoc3RhcnQsIGVuZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRvTm90UmVvcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICBkb05vdFJlb3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY3RybC5vblJhbmdlU2VsZWN0KHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBjbGljay4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBmb2N1cy4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvTm90UmVvcGVuKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5jcmVhdGVEcm9wRG93bigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5LmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRldGhlciA9IG5ldyBUZXRoZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICRlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRBdHRhY2htZW50OiAnYm90dG9tIGNlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b3AgY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NQcmVmaXg6ICdkYXRlcGlja2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0T2Zmc2V0OiAnMTRweCAwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogJ3dpbmRvdycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudDogJ3RvZ2V0aGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaW46IFsndG9wJywgJ2xlZnQnLCAnYm90dG9tJywgJ3JpZ2h0J11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHRldGhlci5wb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBibHVyVGltZXI7XHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBibHVyLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBBbGxvdyBhbnkgY2xpY2sgb24gdGhlIG1lbnUgdG8gY29tZSB0aHJvdWdoIGZpcnN0XHJcbiAgICAgICAgICAgICAgICBibHVyVGltZXIgPSB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5pc1NlbGVjdGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkYm9keS5vbihgY2xpY2suJHskc2NvcGUuJGlkfWAsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjdHJsLmlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZW50IHx8ICRlbGVtZW50LmlzKGUudGFyZ2V0KSB8fCBjb250ZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQuY2FuY2VsKGJsdXJUaW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQgJiYgY29udGVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkYm9keS5vZmYoYGNsaWNrLiR7JHNjb3BlLiRpZH0gRE9NTW91c2VTY3JvbGwuJHskc2NvcGUuJGlkfSBtb3VzZXdoZWVsLiR7JHNjb3BlLiRpZH1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudCkgY29udGVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVEcm9wRG93bigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IERhdGVQaWNrZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgIHNpbmdsZURhdGVCaW5kaW5nID0gYGRhdGU9XCIke3RoaXMuY29udHJvbGxlckFzfS5kYXRlXCIgb24tZGF0ZS1zZWxlY3Q9XCIke3RoaXMuY29udHJvbGxlckFzfS5kYXRlU2VsZWN0ZWQoZGF0ZSlcImAsXHJcbiAgICAgICAgICAgICAgICByYW5nZUJpbmRpbmcgPSBgc3RhcnQ9XCIke3RoaXMuY29udHJvbGxlckFzfS5zdGFydFwiIGVuZD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LmVuZFwiIG9uLXJhbmdlLXNlbGVjdD1cIiR7dGhpcy5jb250cm9sbGVyQXN9LnJhbmdlU2VsZWN0ZWQoc3RhcnQsZW5kKVwiYCxcclxuICAgICAgICAgICAgICAgIGJpbmRpbmdzID0gY3RybC5pc1NpbmdsZURhdGUgPyBzaW5nbGVEYXRlQmluZGluZyA6IHJhbmdlQmluZGluZyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gYDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWRyb3Bkb3duXCIgbmctY2xhc3M9XCJ7J2RhdGVwaWNrZXItb3Blbic6JHt0aGlzLmNvbnRyb2xsZXJBc30uaXNWaXNpYmxlfVwiPjxkYXRlLXBpY2tlciBtaW4tdmlldz1cIiR7JGF0dHJzLm1pblZpZXd9XCIgaXMtc2VsZWN0aW5nPVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uaXNTZWxlY3RpbmdcIiAke2JpbmRpbmdzfVwiIGhpZ2hsaWdodGVkPVwiJHt0aGlzLmNvbnRyb2xsZXJBc30uaGlnaGxpZ2h0ZWRcIiBkZWZhdWx0LWRhdGU9XCJ7eyR7dGhpcy5jb250cm9sbGVyQXN9LmRlZmF1bHREYXRlfX1cIj48L2RhdGUtcGlja2VyPjwvZGl2PmAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBhbnkgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGUpLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSAkZWxlbWVudC5wb3NpdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gJGVsZW1lbnQub3V0ZXJIZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgIG1hcmdpbiA9ICgkZWxlbWVudC5vdXRlckhlaWdodCh0cnVlKSAtIGhlaWdodCksXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBtYXJnaW4gLyAyICsgaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29udGVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdG9wOiBwb3NpdGlvbi50b3AgKyBvZmZzZXQsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBwb3NpdGlvbi5sZWZ0XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZShjb250ZW50KSgkc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNFc2NhcGUoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS53aGljaCA9PT0gMjc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVDb250ZW50KCRzY29wZSkge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLiR0ZW1wbGF0ZUNhY2hlLmdldCh0aGlzLmNhbGVuZGFyVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICB2YXIgY29udGVudCA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbXBpbGUoY29udGVudCkoJHNjb3BlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXlTZWxlY3QoJHNjb3BlLCAkZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogRGF0ZVBpY2tlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdLFxyXG4gICAgICAgICAgICAgICAgZGF5Q3NzID0gJy5kYXRlUGlja2VyRGF5cy1kYXknLFxyXG4gICAgICAgICAgICAgICAgJGJvZHk6IGFueSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgbW91c2VEb3duID0gYG1vdXNlZG93bi4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIG1vdXNlVXAgPSBgbW91c2V1cC4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgICAgIHZhciBvblNlbGVjdGVkID0gcmFuZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRheXMgPSB0aGlzLmdldERheXMocmFuZ2UsIGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZChkYXlzKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKG1vdXNlRG93biwgZGF5Q3NzLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IHsgc3RhcnQ6IGUsIGVuZDogZSB9O1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc1NlbGVjdGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJvZHkub24obW91c2VVcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5Lm9mZihtb3VzZVVwKTtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmlzU2VsZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RlZChyYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYW5nZVNlbGVjdCgkc2NvcGUsICRlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBEYXRlUGlja2VyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICAkYm9keTogYW55ID0gYW5ndWxhci5lbGVtZW50KCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICBtb3VzZURvd24gPSBgbW91c2Vkb3duLiR7JHNjb3BlLiRpZH1gLFxyXG4gICAgICAgICAgICAgICAgbW91c2VPdmVyID0gYG1vdXNlb3Zlci4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIG1vdXNlVXAgPSBgbW91c2V1cC4keyRzY29wZS4kaWR9YCxcclxuICAgICAgICAgICAgICAgIGRheUNzcyA9ICcuZGF0ZVBpY2tlckRheXMtZGF5JztcclxuXHJcbiAgICAgICAgICAgIHZhciBvblNlbGVjdGluZyA9IHJhbmdlID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXlzID0gdGhpcy5nZXREYXlzKHJhbmdlLCBjdHJsKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0aW5nKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG9uU2VsZWN0ZWQgPSByYW5nZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF5cyA9IHRoaXMuZ2V0RGF5cyhyYW5nZSwgY3RybCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkKGRheXMpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24obW91c2VEb3duLCBkYXlDc3MsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0geyBzdGFydDogZSwgZW5kOiBlIH07XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzU2VsZWN0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vbihtb3VzZU92ZXIsIGRheUNzcywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UuZW5kID0gZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGluZyhyYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYm9keS5vbihtb3VzZVVwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKG1vdXNlT3Zlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkub2ZmKG1vdXNlVXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkKHJhbmdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuZGlyZWN0aXZlKCdkYXRlUGlja2VyJywgRGF0ZVBpY2tlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlclJhbmdlXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyUmFuZ2Uge1xyXG4gICAgICAgIHN0YXJ0OiBzdHJpbmc7XHJcbiAgICAgICAgZW5kOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlclJhbmdlIGltcGxlbWVudHMgSURhdGVQaWNrZXJSYW5nZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RhcnQ6IGFueSwgZW5kOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIG1TdGFydCA9IG1vbWVudChzdGFydCk7XHJcbiAgICAgICAgICAgIHZhciBtRW5kID0gbW9tZW50KGVuZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobUVuZC5pc0JlZm9yZShtU3RhcnQpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IG1TdGFydDtcclxuICAgICAgICAgICAgICAgIG1TdGFydCA9IG1FbmQ7XHJcbiAgICAgICAgICAgICAgICBtRW5kID0gdGVtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IG1TdGFydC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBtRW5kLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnQ6IHN0cmluZztcclxuICAgICAgICBlbmQ6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvLyBEYXRlUGlja2VyTW9udGhcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURhdGVQaWNrZXJNb250aCB7XHJcbiAgICAgICAgdmFsdWU6IG51bWJlcjtcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaXNDdXJyZW50TW9udGg6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRGF0ZVBpY2tlck1vbnRoIGltcGxlbWVudHMgSURhdGVQaWNrZXJNb250aCB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIG0gPSBtb21lbnQoKTtcclxuICAgICAgICAgICAgdmFyIHRoaXNNb250aCA9IG0ubW9udGgoKTtcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gbS5tb250aCh2YWx1ZSkuZm9ybWF0KCdNTU0nKTtcclxuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRNb250aCA9IHZhbHVlID09PSB0aGlzTW9udGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaXNDdXJyZW50TW9udGg6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0ZVBpY2tlck1vbnRoXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyWWVhciB7XHJcbiAgICAgICAgdmFsdWU6IG51bWJlcjtcclxuICAgICAgICBpc0N1cnJlbnRZZWFyOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJZZWFyIGltcGxlbWVudHMgSURhdGVQaWNrZXJZZWFyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmlzQ3VycmVudFllYXIgPSB2YWx1ZSA9PT0gbW9tZW50KCkueWVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNDdXJyZW50WWVhcjogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJRGF0ZVBpY2tlckRheVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRGF0ZVBpY2tlckRheSB7XHJcbiAgICAgICAgZGF0ZTogbnVtYmVyO1xyXG4gICAgICAgIHZhbHVlOiBhbnk7XHJcbiAgICAgICAgaXNUb2RheTogYm9vbGVhbjtcclxuICAgICAgICBpc05vdEluTW9udGg6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTZWxlY3Rpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgaXNCZWZvcmUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW47XHJcbiAgICAgICAgaXNTYW1lKGRheTogSURhdGVQaWNrZXJEYXkpOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERhdGVQaWNrZXJEYXkgaW1wbGVtZW50cyBJRGF0ZVBpY2tlckRheSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoZnJvbURhdGU6IGFueSwgZGF5T2ZXZWVrOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG1vbWVudChkYXlPZldlZWspO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLnZhbHVlLmRhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5pc1RvZGF5ID0gZGF5T2ZXZWVrLmlzU2FtZShtb21lbnQoKSwgJ2RheScpO1xyXG4gICAgICAgICAgICB0aGlzLmlzTm90SW5Nb250aCA9ICF0aGlzLnZhbHVlLmlzU2FtZShmcm9tRGF0ZSwgJ21vbnRoJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRlOiBudW1iZXI7XHJcbiAgICAgICAgdmFsdWU6IGFueTtcclxuICAgICAgICBpc1RvZGF5OiBib29sZWFuO1xyXG4gICAgICAgIGlzTm90SW5Nb250aDogYm9vbGVhbjtcclxuICAgICAgICBpc1NlbGVjdGluZzogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgaXNCZWZvcmUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgaXNCZWZvcmUgPSB0aGlzLnZhbHVlLmlzQmVmb3JlKGRheS52YWx1ZSwgJ2RheScpO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNCZWZvcmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1NhbWUoZGF5OiBJRGF0ZVBpY2tlckRheSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgaXNTYW1lID0gdGhpcy52YWx1ZS5pc1NhbWUoZGF5LnZhbHVlLCAnZGF5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpc1NhbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIERhdGVQaWNrZXJTZXJ2aWNlXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElEYXRlUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgZ2V0TW9udGhzKCk6IElEYXRlUGlja2VyTW9udGhbXTtcclxuICAgICAgICBnZXREYXlzT2ZXZWVrKCk6IHN0cmluZ1tdO1xyXG4gICAgICAgIGdldFllYXJzKGZyb21EYXRlKTogSURhdGVQaWNrZXJZZWFyW107XHJcbiAgICAgICAgZ2V0V2Vlayhmcm9tRGF0ZSwgc3RhcnRPZldlZWspOiBJRGF0ZVBpY2tlckRheVtdO1xyXG4gICAgICAgIGdldFJhbmdlRGF5cyhzdGFydDogSURhdGVQaWNrZXJEYXksIGVuZDogSURhdGVQaWNrZXJEYXksIHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pOiBJRGF0ZVBpY2tlckRheVtdO1xyXG4gICAgICAgIGRlc2VsZWN0QWxsKHdlZWtzOiBJRGF0ZVBpY2tlckRheVtdW10pO1xyXG4gICAgICAgIHNlbGVjdERheXMoZGF5czogSURhdGVQaWNrZXJEYXlbXSk7XHJcbiAgICAgICAgaW5wdXRUb01vbWVudCh2YWx1ZTogc3RyaW5nKTogYW55O1xyXG4gICAgICAgIGlucHV0VG9SYW5nZSh2YWx1ZTogc3RyaW5nKTogSURhdGVQaWNrZXJSYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEYXRlUGlja2VyU2VydmljZSBpbXBsZW1lbnRzIElEYXRlUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgZ2V0TW9udGhzKCk6IElEYXRlUGlja2VyTW9udGhbXSB7XHJcbiAgICAgICAgICAgIHZhciBtb250aHMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJNb250aD4oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbW9udGhzLnB1c2gobmV3IERhdGVQaWNrZXJNb250aChpKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtb250aHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRZZWFycyhmcm9tRGF0ZSk6IElEYXRlUGlja2VyWWVhcltdIHtcclxuICAgICAgICAgICAgdmFyIGZyb21ZZWFyID0gbW9tZW50KGZyb21EYXRlKS55ZWFyKCksXHJcbiAgICAgICAgICAgICAgICB5ZWFycyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlclllYXI+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZnJvbVllYXI7IGkgPD0gKGZyb21ZZWFyICsgOCk7IGkrKylcclxuICAgICAgICAgICAgICAgIHllYXJzLnB1c2gobmV3IERhdGVQaWNrZXJZZWFyKGkpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB5ZWFycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFdlZWsoZnJvbURhdGUsIHN0YXJ0T2ZXZWVrKTogSURhdGVQaWNrZXJEYXlbXSB7XHJcbiAgICAgICAgICAgIHZhciBlbmRPZldlZWsgPSBtb21lbnQoc3RhcnRPZldlZWspLmVuZE9mKCd3ZWVrJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF5cyA9IG5ldyBBcnJheTxJRGF0ZVBpY2tlckRheT4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF5T2ZXZWVrID0gbW9tZW50KHN0YXJ0T2ZXZWVrKTsgZGF5T2ZXZWVrLmlzQmVmb3JlKGVuZE9mV2Vlayk7IGRheU9mV2Vlay5hZGQoMSwgJ2RheXMnKSkge1xyXG4gICAgICAgICAgICAgICAgZGF5cy5wdXNoKG5ldyBEYXRlUGlja2VyRGF5KGZyb21EYXRlLCBkYXlPZldlZWspKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXREYXlzT2ZXZWVrKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudC53ZWVrZGF5c1Nob3J0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRSYW5nZURheXMoc3RhcnQ6IElEYXRlUGlja2VyRGF5LCBlbmQ6IElEYXRlUGlja2VyRGF5LCB3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKTogSURhdGVQaWNrZXJEYXlbXSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZW5kLmlzQmVmb3JlKHN0YXJ0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBzdGFydDtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgICAgICAgICAgICAgZW5kID0gdGVtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGFsbERheXMgPSBuZXcgQXJyYXk8SURhdGVQaWNrZXJEYXk+KCksXHJcbiAgICAgICAgICAgICAgICBpc0FkZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgd2Vla3MuZm9yRWFjaCh3ZWVrID0+IHtcclxuICAgICAgICAgICAgICAgIHdlZWsuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXkuaXNTYW1lKHN0YXJ0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBZGRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNBZGRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsRGF5cy5wdXNoKGRheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5LmlzU2FtZShlbmQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FkZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFsbERheXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXNlbGVjdEFsbCh3ZWVrczogSURhdGVQaWNrZXJEYXlbXVtdKSB7XHJcbiAgICAgICAgICAgIHdlZWtzLmZvckVhY2god2VlayA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZWVrLmZvckVhY2goZGF5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXkuaXNTZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdERheXMoZGF5czogSURhdGVQaWNrZXJEYXlbXSkge1xyXG4gICAgICAgICAgICBkYXlzLmZvckVhY2goZGF5ID0+IGRheS5pc1NlbGVjdGluZyA9IHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXRUb01vbWVudCh2YWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIGxhbmcgPSBtb21lbnQubG9jYWxlRGF0YSgpO1xyXG4gICAgICAgICAgICB2YXIgZm9ybWF0cyA9IFtcclxuICAgICAgICAgICAgICAgIGxhbmcubG9uZ0RhdGVGb3JtYXQoXCJsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gIC9nLCAnICcpLFxyXG4gICAgICAgICAgICAgICAgbGFuZy5sb25nRGF0ZUZvcm1hdChcIkxcIilcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvLS9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyAgL2csICcgJylcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gbW9tZW50KHZhbHVlLCBmb3JtYXRzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnB1dFRvUmFuZ2UodmFsdWU6IHN0cmluZyk6IElEYXRlUGlja2VyUmFuZ2Uge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAhdmFsdWUudHJpbSgpLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB2YXIgdHJpbW1lZCA9IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvLS9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcgJylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gIC9nLCAnICcpXHJcbiAgICAgICAgICAgICAgICAudHJpbSgpO1xyXG4gICAgICAgICAgICB2YXIgZXhwU3RhcnQgPSBuZXcgUmVnRXhwKFwiXigoWzAtOV17MSw0fVsgXSopezN9KVwiKTtcclxuICAgICAgICAgICAgdmFyIGV4cEVuZCA9IG5ldyBSZWdFeHAoXCIoKFswLTldezEsNH1bIF0qKXszfSkkXCIpO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRSZXN1bHQgPSBleHBTdGFydC5leGVjKHRyaW1tZWQpO1xyXG4gICAgICAgICAgICB2YXIgZW5kUmVzdWx0ID0gZXhwRW5kLmV4ZWModHJpbW1lZCk7XHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuaW5wdXRUb01vbWVudChzdGFydFJlc3VsdFswXS50cmltKCkpO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gdGhpcy5pbnB1dFRvTW9tZW50KChlbmRSZXN1bHRbMF0gfHwgc3RhcnRSZXN1bHRbMF0pLnRyaW0oKSk7XHJcbiAgICAgICAgICAgIHZhciByYW5nZSA9IG5ldyBEYXRlUGlja2VyUmFuZ2Uoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuc2VydmljZSgnZGF0ZVBpY2tlclNlcnZpY2UnLCBEYXRlUGlja2VyU2VydmljZSk7XHJcbn0iLCJcclxubW9kdWxlIERhdGVQaWNrZXJNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFRpbWVQaWNrZXJDb250cm9sbGVyIHtcclxuICAgICAgICB0aW1lOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuY29udHJvbGxlcigndGltZVBpY2tlcicsIFRpbWVQaWNrZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsndGltZVBpY2tlclNlcnZpY2UnLCAnaXNNb2JpbGUnLCAnJHBhcnNlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZVBpY2tlclNlcnZpY2U6IElUaW1lUGlja2VyU2VydmljZSwgcHJpdmF0ZSBpc01vYmlsZTogYm9vbGVhbiwgcHJpdmF0ZSAkcGFyc2U6IGFuZ3VsYXIuSVBhcnNlU2VydmljZSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsndGltZVBpY2tlcicsICduZ01vZGVsJ107XHJcbiAgICAgICAgY29udHJvbGxlciA9IFRpbWVQaWNrZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd0aW1lcGlja2VyJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGltZTogJz0nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGN0cmxzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgJGN0cmw6IFRpbWVQaWNrZXJDb250cm9sbGVyID0gY3RybHNbMF0sXHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyID0gY3RybHNbMV07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5rTW9iaWxlKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwsICRuZ01vZGVsQ3RybCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubGlua0Rlc2t0b3AoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCwgJG5nTW9kZWxDdHJsKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rTW9iaWxlID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmw6IFRpbWVQaWNrZXJDb250cm9sbGVyLCAkbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnByb3AoJ3R5cGUnLCAndGltZScpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNldFZpZXdWYWx1ZSA9ICh0aW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlld1ZhbHVlID0gdGhpcy50aW1lUGlja2VyU2VydmljZS5mb3JtYXRJc28odGltZSk7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh2aWV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiAkY3RybC50aW1lLCB0aW1lID0+IHtcclxuICAgICAgICAgICAgICAgIHNldFZpZXdWYWx1ZSh0aW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHZpZXdDaGFuZ2VMaXN0ZW5lcnMucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNvID0gdGhpcy50aW1lUGlja2VyU2VydmljZS5mb3JtYXRJc28oJG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwudGltZSA9IGlzbztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZXRWaWV3VmFsdWUoJGN0cmwudGltZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlua0Rlc2t0b3AgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybDogVGltZVBpY2tlckNvbnRyb2xsZXIsICRuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBtID0gdGhpcy50aW1lUGlja2VyU2VydmljZS5wYXJzZSgkbmdNb2RlbEN0cmwuJG1vZGVsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwudGltZSA9IG0uaXNWYWxpZCgpID8gbS5mb3JtYXQoXCJISDptbTpzc1wiKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0Vmlld1ZhbHVlKCRuZ01vZGVsQ3RybC4kbW9kZWxWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlzUmVxdWlyZWQgPSAkYXR0cnNbJ3JlcXVpcmVkJ107XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNWYWxpZCA9ICFpc1JlcXVpcmVkIHx8IChpc1JlcXVpcmVkICYmIG0uaXNWYWxpZCgpKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWYWxpZGl0eSgnaW52YWxpZFRpbWUnLCBpc1ZhbGlkKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oYGJsdXIuJHskc2NvcGUuJGlkfWAsIHVwZGF0ZSk7XHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBrZXlkb3duLiR7JHNjb3BlLiRpZH0ga2V5ZG93bi4keyRzY29wZS4kaWR9YCwgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihlLndoaWNoICE9PSAxMylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoYGJsdXIuJHskc2NvcGUuJGlkfWApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZXRWaWV3VmFsdWUgPSAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB2aWV3VmFsdWUgPSB0aGlzLnRpbWVQaWNrZXJTZXJ2aWNlLmZvcm1hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh2aWV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiAkY3RybC50aW1lLCB0aW1lID0+IHtcclxuICAgICAgICAgICAgICAgIHNldFZpZXdWYWx1ZSh0aW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZXRWaWV3VmFsdWUoJGN0cmwudGltZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0RhdGVQaWNrZXJcIikuZGlyZWN0aXZlKCd0aW1lUGlja2VyJywgVGltZVBpY2tlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgRGF0ZVBpY2tlck1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVGltZVBpY2tlclNlcnZpY2Uge1xyXG4gICAgICAgIHBhcnNlKHRleHQ6IHN0cmluZyk6IGFueTtcclxuICAgICAgICBmb3JtYXQodGV4dDogc3RyaW5nLCB2YWx1ZT86IHN0cmluZyk6IHN0cmluZztcclxuICAgICAgICBmb3JtYXRJc28odGV4dDogc3RyaW5nLCB2YWx1ZT86IHN0cmluZyk6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUaW1lUGlja2VyU2VydmljZSBpbXBsZW1lbnRzIElUaW1lUGlja2VyU2VydmljZSB7XHJcbiAgICAgICAgcGFyc2UodGV4dDogc3RyaW5nKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIHBhdHRlcm5zID0gW1xyXG4gICAgICAgICAgICAgICAgJ0xUJyxcclxuICAgICAgICAgICAgICAgICdMVFMnLFxyXG4gICAgICAgICAgICAgICAgJ0hIOm1tOnNzJyxcclxuICAgICAgICAgICAgICAgICdISDptbSBBJ1xyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KHRleHQsIHBhdHRlcm5zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdCh0ZXh0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5wYXJzZSh0ZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIG0uaXNWYWxpZCgpID8gbS5mb3JtYXQoJ0xUJykgOiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1hdElzbyh0ZXh0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5wYXJzZSh0ZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIG0uaXNWYWxpZCgpID8gbS5mb3JtYXQoXCJISDptbTpzc1wiKSA6IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nRGF0ZVBpY2tlclwiKS5zZXJ2aWNlKCd0aW1lUGlja2VyU2VydmljZScsIFRpbWVQaWNrZXJTZXJ2aWNlKTtcclxufSJdfQ==