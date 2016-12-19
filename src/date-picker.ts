
module DatePickerModule {
    declare var Tether: any;

    enum DatePickerView {
        Days = 0,
        Months = 1,
        Years = 2
    }

    class DatePickerController {

        static $inject = ['$attrs', 'datePickerService'];

        constructor(private $attrs, private datePickerService: IDatePickerService) {
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

        onInit() {
            if (this.defaultDate == "")
                this.defaultDate = null;
            this.dateInternal = this.isSingleDate ? (this.date || this.defaultDate) : this.start;
            this.calculate(this.dateInternal);
            this.initialized = true;
        }

        // Single Date
        private _date: string | Date;

        get date(): string | Date {
            return this._date;
        }

        set date(value: string | Date) {
            this._date = value;
            if (this.initialized)
                this.dateInternal = this._date;
        }

        // Range
        private _start: string;

        get start(): string {
            return this._start;
        }

        set start(value: string) {
            this._start = value;
            if (this.initialized)
                this.dateInternal = this._start;
        }

        private _end: string;

        get end(): string {
            return this._end;
        }

        set end(value: string) {
            this._end = value;
        }

        onDateSelect;
        onRangeSelect;
        isSelecting: boolean;

        view: DatePickerView;
        minView: DatePickerView;
        weeks: IDatePickerDay[][];
        years: IDatePickerYear[];
        monthNames: IDatePickerMonth[];
        daysOfWeek: string[];
        isVisible: boolean;
        initialized: boolean;
        isoFormat = 'YYYY-MM-DD';
        isSingleDate: boolean;
        highlighted: string[];
        defaultDate: string;

        private _dateInternal;

        get dateInternal() {
            return this._dateInternal;
        }

        set dateInternal(value: any) {
            var m = value != null ? moment(value) : moment();
            this._dateInternal = m;
            if (this.initialized)
                this.calculate(this._dateInternal);
        }

        get title() {
            switch (this.view) {
                default:
                case DatePickerView.Days:
                    return this._dateInternal.format('MMMM YYYY');
                case DatePickerView.Months:
                    return this._dateInternal.format('YYYY');
                case DatePickerView.Years:
                    return 'select a year';
            }
        }

        get viewType(): string {
            switch (this.view) {
                case DatePickerView.Months:
                    return "months";
                case DatePickerView.Years:
                    return "years";
                default:
                case DatePickerView.Days:
                    return "days";
            }
        }

        showDays() {
            if (this.minView > DatePickerView.Days)
                return;
            this.view = DatePickerView.Days;
        }

        showMonths() {
            if (this.minView > DatePickerView.Months)
                return;
            this.view = DatePickerView.Months;
        }

        showYears() {
            this.view = DatePickerView.Years;
        }

        calculate(fromDate) {
            var start = moment(fromDate).startOf('month').startOf('week'),
                end = moment(fromDate).endOf('month').endOf('week');

            this.weeks = new Array<IDatePickerDay[]>();
            for (var day = moment(start); day.isBefore(end); day.add(1, 'week')) {
                var week = this.datePickerService.getWeek(fromDate, day);
                this.weeks.push(week);
            }

            this.years = this.datePickerService.getYears(fromDate);
        }

        isSelected(day: IDatePickerDay) {
            if (this.isSingleDate)
                return moment(this.date).isSame(day.value, 'day');

            return day.value.isBetween(this.start, this.end, 'day') ||
                day.value.isSame(this.start, 'day') ||
                day.value.isSame(this.end, 'day');
        }

        isHighlighted(day: IDatePickerDay) {
            if (this.highlighted == null)
                return false;

            for (var i = 0; i < this.highlighted.length; i++) {
                var value = this.highlighted[i];
                if (moment(value).isSame(day.value, 'day'))
                    return true;
            }
            return false;
        }

        selecting(days: IDatePickerDay[]) {
            this.datePickerService.deselectAll(this.weeks);
            this.datePickerService.selectDays(days);
        }

        selected(days: IDatePickerDay[]) {
            this.datePickerService.deselectAll(this.weeks);

            var start = days[0];

            if (this.isSingleDate) {
                this.selectedDate(start);
                return;
            }

            var end = days[days.length - 1];
            this.selectedRange(start, end);
        }

        selectedDate(day: IDatePickerDay) {
            this.date = moment(day.value).format(this.isoFormat);
            this.onDateSelect({ date: this.date });
        }

        selectedRange(start: IDatePickerDay, end: IDatePickerDay) {
            this.start = moment(start.value).format(this.isoFormat);
            this.end = moment(end.value).format(this.isoFormat);
            this.onRangeSelect({ start: this.start, end: this.end });
        }

        selectMonth(idx) {
            var month = this.monthNames[idx];
            this.setMonth(month.value);
            if (this.minView === DatePickerView.Months) {
                if (this.isSingleDate) {
                    this.date = this.dateInternal.format('YYYY-MM-DD');
                    this.onDateSelect({ date: this.date });
                } else {
                    this.start = moment(this.dateInternal).endOf('month').format('YYYY-MM-DD');
                    this.end = moment(this.dateInternal).endOf('month').format('YYYY-MM-DD');
                    this.onRangeSelect({ start: this.start, end: this.end });
                }
                this.isVisible = false;
                return;
            }

            this.showDays();
        }

        isMonth(month) {
            return this.dateInternal.month() == month.value;
        }

        setMonth(month) {
            this.dateInternal = this.dateInternal.set('month', month);
        }

        isYear(year) {
            return this.dateInternal.year() == year.value;
        }

        selectYear(idx) {
            var year = this.years[idx];
            this.setYear(year.value);
            if (this.minView === DatePickerView.Years) {
                if (this.isSingleDate) {
                    this.date = this.dateInternal.format('YYYY-MM-DD');
                    this.onDateSelect({ date: this.date });
                } else {
                    this.start = moment(this.dateInternal).startOf('year').format('YYYY-MM-DD');
                    this.end = moment(this.dateInternal).endOf('year').format('YYYY-MM-DD');
                    this.onRangeSelect({ start: this.start, end: this.end });
                }
                this.isVisible = false;
                return;
            }

            this.showMonths();
        }

        setYear(year) {
            this.dateInternal = this.dateInternal.set('year', year);
        }

        prevMonth() {
            this.dateInternal = this.dateInternal.subtract(1, 'months');
        }

        nextMonth() {
            this.dateInternal = this.dateInternal.add(1, 'months');
        }

        prevYear() {
            this.dateInternal = this.dateInternal.subtract(1, 'years');
        }

        nextYear() {
            this.dateInternal = this.dateInternal.add(1, 'years');
        }

        prevRange() {
            this.dateInternal = this.dateInternal.subtract(9, 'years');
        }

        nextRange() {
            this.dateInternal = this.dateInternal.add(9, 'years');
        }
    }

    Angular.module("ngDatePicker").controller('datePicker', DatePickerController);

    class DatePickerDirective {
        static $inject = ['$injector', '$compile', '$templateCache', '$timeout', '$window', 'datePickerService', 'isMobile'];

        constructor(private $injector, private $compile, private $templateCache, private $timeout, private $window, private datePickerService: IDatePickerService, private isMobile: boolean) { }

        restrict = 'AE';
        require = '?ngModel';
        controller = DatePickerController;
        controllerAs = 'datepicker';
        bindToController = true;
        scope = {
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

        calendarTemplate = 'date-picker.html';

        link = ($scope, $element, $attrs, ngModelCtrl) => {
            var ctrl: DatePickerController = $scope[this.controllerAs];
            ctrl.onInit();

            // Fixes a bug where Tether cannot correctly get width/height because of ngAnimate
            var $animate = this.$injector.get('$animate');
            if ($animate != null)
                $animate.enabled(false, $element);

            if ($element.is('input[type="text"]')) {
                if (this.isMobile)
                    this.linkNative($scope, $element, $attrs, ngModelCtrl);
                else
                    this.linkInput($scope, $element, $attrs, ngModelCtrl);
            }
            else if ($element.is('date-picker'))
                this.linkInline($scope, $element, $attrs, ngModelCtrl);
            else
                this.linkElement($scope, $element, $attrs, ngModelCtrl);

            if (ctrl.isSingleDate) {
                this.daySelect($scope, $element);
                return;
            }

            this.rangeSelect($scope, $element);
        };

        linkNative($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, ngModelCtrl: angular.INgModelController) {
            var ctrl: DatePickerController = $scope[this.controllerAs];

            var dateFormat = (date): string => {
                var iso = date == null ? '' : moment(date).format("YYYY-MM-DD");
                return iso;
            };

            var monthFormat = (date): string => {
                var iso = date == null ? '' : moment(date).format("YYYY-MM");
                return iso;
            };

            var type = "date",
                formatter = dateFormat;
            if ($attrs['minView'] == "months") {
                type = "month";
                formatter = monthFormat;
            }
            $element.prop("type", type);

            var setViewValue = (date) => {
                var iso = formatter(date);
                ngModelCtrl.$setViewValue(iso);
                ngModelCtrl.$render();
            };

            $scope.$watch(() => ctrl.date, date => {
                setViewValue(date);
            });

            ngModelCtrl.$viewChangeListeners.push(() => {
                var m = moment(ngModelCtrl.$viewValue);
                ctrl.date = m.isValid() ? dateFormat(ngModelCtrl.$viewValue) : null;
            });

            setViewValue(ctrl.date || ctrl.defaultDate);
        }

        linkInput($scope, $element, $attrs, ngModelCtrl: angular.INgModelController) {
            var ctrl: DatePickerController = $scope[this.controllerAs];

            this.popover($scope, $element, $attrs);

            if (ctrl.isSingleDate) {
                $scope.$watch(() => ctrl.date, date => {
                    var text = date == null ? '' : moment(date).format("L");
                    ngModelCtrl.$setViewValue(text);
                    ngModelCtrl.$render();
                });
            } else {
                var setViewValue = (start, end) => {

                    var text = '';
                    if (start != null && end != null) {
                        var mStart = moment(start),
                            mEnd = moment(end);

                        if (mStart.isSame(end, 'day')) {
                            text = mStart.format("L");
                        } else {
                            text = `${mStart.format("L")} - ${mEnd.format("L")}`;
                        }

                    } else if (start != null) {
                        text = moment(end).format("L");
                    } else if (end != null) {
                        text = moment(end).format("L");
                    }

                    ngModelCtrl.$setViewValue(text);
                    ngModelCtrl.$render();
                };

                $scope.$watch(() => ctrl.start, start => {
                    setViewValue(start, ctrl.end);
                });

                $scope.$watch(() => ctrl.end, end => {
                    setViewValue(ctrl.start, end);
                });
            }

            $element.on(`change.${$scope.$id}`, () => {
                if (ctrl.isSingleDate) {
                    var date = this.datePickerService.inputToMoment(ngModelCtrl.$viewValue);

                    if (!date.isValid()) {
                        ctrl.date = null;
                        return;
                    }

                    if (date.isSame(ctrl.date, 'day'))
                        return;

                    ctrl.date = date.format(ctrl.isoFormat);
                } else {
                    var range = this.datePickerService.inputToRange(ngModelCtrl.$viewValue);
                    if (range == null) {
                        ctrl.start = null;
                        ctrl.end = null;
                    } else {

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

            $element.on(`keydown.${$scope.$id}`, e => {
                if (!ctrl.isVisible || !this.isEscape(e))
                    return true;

                ctrl.isVisible = false;
                $scope.$apply();
                return this.preventDefault(e);
            });
        }

        linkElement($scope, $element, $attrs, ngModelCtrl) {
            this.popover($scope, $element, $attrs);
        }

        linkInline($scope, $element, $attrs, ngModelCtrl) {
            var content = this.createContent($scope);
            $element.append(content);
        }

        getDays(range, ctrl) {
            var start: IDatePickerDay = angular.element(range.start.target).scope()['day'],
                end: IDatePickerDay = angular.element(range.end.target).scope()['day'];
            var days = this.datePickerService.getRangeDays(start, end, ctrl.weeks);
            return days;
        }

        popover($scope, $element, $attrs) {
            var content,
                tether,
                $body: any = angular.element('body'),
                ctrl: DatePickerController = $scope[this.controllerAs];

            var doNotReopen = false;
            ctrl['dateSelected'] = (date) => {
                ctrl.isVisible = false;
                doNotReopen = true;
                $element.focus();
                doNotReopen = false;
                ctrl.onDateSelect({ date: date });
            };

            ctrl['rangeSelected'] = (start, end) => {
                ctrl.isVisible = false;
                doNotReopen = true;
                $element.focus();
                doNotReopen = false;
                ctrl.onRangeSelect({ start: start, end: end });
            };

            $element.on(`click.${$scope.$id}`, () => {
                ctrl.isVisible = true;
                $scope.$apply();
            });

            $element.on(`focus.${$scope.$id}`, () => {
                if (doNotReopen)
                    return;
                ctrl.isVisible = true;

                if (!content) {
                    content = this.createDropDown($scope, $element, $attrs);
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
            $element.on(`blur.${$scope.$id}`, () => {
                // Allow any click on the menu to come through first
                blurTimer = this.$timeout(() => {
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

            $body.on(`click.${$scope.$id}`, e => {
                if (!ctrl.isVisible)
                    return;

                if (!content || $element.is(e.target) || content.has(e.target).length > 0) {
                    this.$timeout.cancel(blurTimer);
                    if (content && content.has(e.target).length > 0) {
                        $element.focus();
                    }
                    return;
                }

                ctrl.isVisible = false;
                $scope.$apply();
            });

            $scope.$on('$destroy', () => {
                $body.off(`click.${$scope.$id} DOMMouseScroll.${$scope.$id} mousewheel.${$scope.$id}`);

                if (content) content.remove();
            });
        }

        createDropDown($scope, $element, $attrs) {
            var ctrl: DatePickerController = $scope[this.controllerAs],
                singleDateBinding = `date="${this.controllerAs}.date" on-date-select="${this.controllerAs}.dateSelected(date)"`,
                rangeBinding = `start="${this.controllerAs}.start" end="${this.controllerAs}.end" on-range-select="${this.controllerAs}.rangeSelected(start,end)"`,
                bindings = ctrl.isSingleDate ? singleDateBinding : rangeBinding,
                template = `<div class="datepicker-dropdown" ng-class="{'datepicker-open':${this.controllerAs}.isVisible}"><date-picker min-view="${$attrs.minView}" is-selecting="${this.controllerAs}.isSelecting" ${bindings}" highlighted="${this.controllerAs}.highlighted" default-date="{{${this.controllerAs}.defaultDate}}"></date-picker></div>`,
                content: any = angular.element(template),
                position = $element.position(),
                height = $element.outerHeight(),
                margin = ($element.outerHeight(true) - height),
                offset = margin / 2 + height;

            content.css({
                top: position.top + offset,
                left: position.left
            });

            this.$compile(content)($scope);

            return content;
        }

        preventDefault(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        isEscape(e) {
            return e.which === 27;
        }

        createContent($scope) {
            var template = this.$templateCache.get(this.calendarTemplate);
            var content = angular.element(template);
            this.$compile(content)($scope);
            return content;
        }

        daySelect($scope, $element) {
            var ctrl: DatePickerController = $scope[this.controllerAs],
                dayCss = '.datePickerDays-day',
                $body: any = angular.element('body'),
                mouseDown = `mousedown.${$scope.$id}`,
                mouseUp = `mouseup.${$scope.$id}`;

            var onSelected = range => {
                var days = this.getDays(range, ctrl);
                ctrl.selected(days);
                $scope.$apply();
            };

            $element.on(mouseDown, dayCss, e => {
                var range = { start: e, end: e };
                ctrl.isSelecting = true;

                $body.on(mouseUp, () => {
                    $body.off(mouseUp);
                    ctrl.isSelecting = false;
                    onSelected(range);
                });
            });
        }

        rangeSelect($scope, $element) {
            var ctrl: DatePickerController = $scope[this.controllerAs],
                $body: any = angular.element('body'),
                mouseDown = `mousedown.${$scope.$id}`,
                mouseOver = `mouseover.${$scope.$id}`,
                mouseUp = `mouseup.${$scope.$id}`,
                dayCss = '.datePickerDays-day';

            var onSelecting = range => {
                var days = this.getDays(range, ctrl);
                ctrl.selecting(days);
                $scope.$apply();
            };

            var onSelected = range => {
                var days = this.getDays(range, ctrl);
                ctrl.selected(days);
                $scope.$apply();
            };

            $element.on(mouseDown, dayCss, e => {
                var range = { start: e, end: e };
                ctrl.isSelecting = true;

                $element.on(mouseOver, dayCss, e => {
                    range.end = e;
                    onSelecting(range);
                });

                $body.on(mouseUp, () => {
                    $element.off(mouseOver);
                    $body.off(mouseUp);
                    ctrl.isSelecting = false;
                    onSelected(range);
                });
            });
        }
    }

    Angular.module("ngDatePicker").directive('datePicker', DatePickerDirective);
}