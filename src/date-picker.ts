
module DatePickerModule {
    declare var Tether: any;

    class DatePickerMouseRange {
        private static datePickerService: IDatePickerService;

        constructor(private $ctrl: DatePickerController, e: JQueryEventObject) {
            this.setStart(e);
            this.setEnd(e);
        }

        static bootstrap(datePickerService: IDatePickerService) {
            DatePickerMouseRange.datePickerService = datePickerService;
        }

        setStart(e: JQueryEventObject) {
            this.start = this.getElement(e);
        }

        setEnd(e: JQueryEventObject) {
            this.end = this.getElement(e);
        }

        getDays(): IDatePickerDay[] {
            const days = DatePickerMouseRange.datePickerService.getRangeDays(this.start, this.end, this.$ctrl.weeks);
            return days;
        }

        private getElement(e: JQueryEventObject): IDatePickerDay {
            if (!e.target)
                return;
            const $element = angular.element(e.target);
            const $scope = $element.scope();
            const day = $scope['day'];
            return day;
        }

        start: IDatePickerDay;
        end: IDatePickerDay;
    }

    enum DatePickerView {
        Days = 0,
        Months = 1,
        Years = 2
    }

    class DatePickerController {

        static $inject = ['$attrs', 'datePickerService'];

        constructor(private $attrs: angular.IAttributes, private datePickerService: IDatePickerService) {
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

        $onInit() {
            if (this.defaultDate == "")
                this.defaultDate = null;

            const dateInternal = (this.isSingleDate ? this.date : this.start) || this.defaultDate;
            this.initialized = true;

            this.setDateInternal(dateInternal);
        }

        $postLink() {
            if (this.isSingleDate) {
                this.setViewDate(this.date || this.defaultDate);
                return;
            }
            const start = this.start || this.defaultDate;
            this.setViewRange(start, this.end || start)
        }

        // Single Date
        _date: string | Date;
        public get date(): string | Date {
            return this._date;
        }
        public set date(value: string | Date) {
            this.setDate(value);
        }

        // Range
        _start: string | Date;
        public get start(): string | Date {
            return this._start;
        }
        public set start(value: string | Date) {
            this.setRange(value, this._end);
        }

        _end: string | Date;
        public get end(): string | Date {
            return this._end;
        }
        public set end(value: string | Date) {
            this.setRange(this._start, value);
        }

        setDate(date: string | Date) {
            const hasChanged = this._date !== date;
            if (!hasChanged)
                return;

            this._date = date;
            this._start = date;
            this._end = date;

            this.setDateInternal(this._date);
            this.setViewDate(date);

            if (this.initialized && this.onDateSelect)
                this.onDateSelect({ date: date });
        }

        setRange(start: string | Date, end: string | Date) {
            const hasChanged = this._start !== start || this._end !== end;
            if (!hasChanged)
                return;

            this._date = start;
            this._start = start;
            this._end = end;

            this.setDateInternal(this._date);
            this.setViewRange(start, end);
            if (this.onRangeSelect)
                this.onRangeSelect({ start: start, end: end });
        }

        private _dateInternal: moment.Moment;

        get dateInternal(): moment.Moment {
            return this._dateInternal;
        }

        private setDateInternal(value: string | Date | moment.Moment) {
            this._dateInternal = (value != null) ? moment(value) : moment();

            if (this.initialized)
                this.calculate(this._dateInternal);
        }

        private calculate(fromDate: moment.Moment) {
            const start = fromDate.clone().startOf('month').startOf('week'),
                end = fromDate.clone().endOf('month').endOf('week');

            this.weeks = new Array<IDatePickerDay[]>();
            for (let day = start; day.isBefore(end); day = day.clone().add(1, 'week')) {
                const week = this.datePickerService.getWeek(fromDate, day);
                this.weeks.push(week);
            }

            this.years = this.datePickerService.getYears(fromDate);
        }

        setViewDate(date) {
            // override in link functions
        };

        setViewRange(start, end) {
            // override in link functions
        };

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

        isSelected(day: IDatePickerDay) {
            if (this.isSingleDate)
                return moment(this._date).isSame(day.value, 'day');

            return day.value.isBetween(this._start, this._end, 'day') ||
                day.value.isSame(this._start, 'day') ||
                day.value.isSame(this._end, 'day');
        }

        isHighlighted(day: IDatePickerDay) {
            if (this.highlighted == null)
                return false;

            for (let i = 0; i < this.highlighted.length; i++) {
                const value = this.highlighted[i];
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

            const start = days[0];
            if (this.isSingleDate) {
                this.selectedDate(start);
                return;
            }

            const end = days[days.length - 1];
            this.selectedRange(start, end);
        }

        selectedDate(day: IDatePickerDay) {
            const date = moment(day.value).format(this.isoFormat);
            this.setDate(date);
        }

        selectedRange(startDay: IDatePickerDay, endDay: IDatePickerDay) {
            const start = moment(startDay.value).format(this.isoFormat);
            const end = moment(endDay.value).format(this.isoFormat);
            this.setRange(start, end);
        }

        selectMonth(idx) {
            const month = this.monthNames[idx];
            this.setMonth(month.value);
            if (this.minView === DatePickerView.Months) {
                if (this.isSingleDate) {
                    const date = this.dateInternal.format('YYYY-MM-DD');
                    this.setDate(date);
                } else {
                    const start = this.dateInternal.clone().endOf('month').format('YYYY-MM-DD');
                    const end = this.dateInternal.clone().endOf('month').format('YYYY-MM-DD');
                    this.setRange(start, end);
                }
                this.isVisible = false;
                return;
            }

            this.showDays();
        }

        selectYear(idx) {
            const year = this.years[idx];
            this.setYear(year.value);
            if (this.minView === DatePickerView.Years) {
                if (this.isSingleDate) {
                    const date = this.dateInternal.format('YYYY-MM-DD');
                    this.setDate(date);
                } else {
                    const start = this.dateInternal.clone().startOf('year').format('YYYY-MM-DD');
                    const end = this.dateInternal.clone().endOf('year').format('YYYY-MM-DD');
                    this.setRange(start, end);
                }
                this.isVisible = false;
                return;
            }

            this.showMonths();
        }

        private changeDate(action: (date: moment.Moment) => moment.Moment) {
            this.setDateInternal(action(this.dateInternal.clone()));
        }

        isMonth(month) {
            return this.dateInternal.month() == month.value;
        }

        setMonth(month) {
            this.changeDate(date => date.set('month', month));
        }

        isYear(year) {
            return this.dateInternal.year() == year.value;
        }

        setYear(year) {
            this.changeDate(date => date.set('year', year));
        }

        prevMonth() {
            this.changeDate(date => date.subtract(1, 'months'));
        }

        nextMonth() {
            this.changeDate(date => date.add(1, 'months'));
        }

        prevYear() {
            this.changeDate(date => date.subtract(1, 'years'));
        }

        nextYear() {
            this.changeDate(date => date.add(1, 'years'));
        }

        prevRange() {
            this.changeDate(date => date.subtract(9, 'years'));
        }

        nextRange() {
            this.changeDate(date => date.add(9, 'years'));
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

        clientDate: string;
    }

    Angular.module("ngDatePicker").controller('datePicker', DatePickerController);

    class DatePickerDirective {
        static $inject = ['$injector', '$compile', '$templateCache', '$timeout', '$window', 'datePickerService', 'isMobile', 'isIOS'];

        constructor(private $injector, private $compile, private $templateCache, private $timeout, private $window, private datePickerService: IDatePickerService, private isMobile: boolean, private isIOS: boolean) { }

        restrict = 'AE';
        require = ['datePicker', '?ngModel'];
        controller = DatePickerController;
        controllerAs = 'datepicker';
        bindToController = true;
        scope = {
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

        calendarTemplate = 'date-picker.html';

        link = ($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, [$ctrl, $ngModel]: [DatePickerController, angular.INgModelController]) => {
            this.applyTetherFix($element);

            if (this.isMobile) {
                this.linkMobile($scope, $element, $attrs, $ngModel, $ctrl);
            } else {
                this.linkDesktop($scope, $element, $attrs, $ngModel, $ctrl);
            }
        };

        linkMobile = ($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, $ngModel: angular.INgModelController, $ctrl: DatePickerController) => {
            if (this.isInput($element)) {
                this.linkNativeInput($scope, $element, $attrs, $ngModel, $ctrl);
            }
            else if (this.isElement($element)) {
                this.linkInline($scope, $element, $attrs, $ngModel, $ctrl);
            }
            else if (this.isIOS) {
                this.linkNativeElement($scope, $element, $attrs, $ngModel, $ctrl);
            } else {
                this.linkElement($scope, $element, $attrs, $ngModel, $ctrl);
            }
        }

        linkDesktop = ($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, $ngModel: angular.INgModelController, $ctrl: DatePickerController) => {
            if (this.isInput($element)) {
                this.linkInput($scope, $element, $attrs, $ngModel, $ctrl)
            }
            else if (this.isElement($element)) {
                this.linkInline($scope, $element, $attrs, $ngModel, $ctrl);
            }
            else {
                this.linkElement($scope, $element, $attrs, $ngModel, $ctrl);
            }
        }

        setupSelections($scope: angular.IScope, $element: angular.IAugmentedJQuery, $ctrl: DatePickerController) {
            if ($ctrl.isSingleDate) {
                this.setupDaySelect($scope, $element, $ctrl);
            } else {
                this.setupRangeSelect($scope, $element, $ctrl);
            }
        }

        isInput($element: angular.IAugmentedJQuery) {
            return $element.is('input[type="text"]');
        }

        isElement($element: angular.IAugmentedJQuery) {
            return $element.is('date-picker');
        }

        /**
         * Fixes a bug where Tether cannot correctly get width/height because of ngAnimate
         */
        applyTetherFix($element: angular.IAugmentedJQuery) {
            var $animate = this.$injector.get('$animate');
            if ($animate != null)
                $animate.enabled(false, $element);
        }

        linkNativeInput($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, $ngModel: angular.INgModelController, $ctrl: DatePickerController) {
            const format = (date, pattern): string => (date == null) ? '' : moment(date).format(pattern);
            const dateFormat = (date) => format(date, "YYYY-MM-DD");
            const monthFormat = (date) => format(date, "YYYY-MM");

            var type = "date",
                formatter = dateFormat;

            if ($attrs['minView'] == "months") {
                type = "month";
                formatter = monthFormat;
            }

            const setViewDate = (date) => {
                var iso = formatter(date);
                $ngModel.$setViewValue(iso);
                $ngModel.$render();
            };

            $element.prop("type", type);
            $ctrl.setViewDate = setViewDate;

            $ngModel.$viewChangeListeners.push(() => {
                var viewValue = moment($ngModel.$viewValue);
                const date = viewValue.isValid() ? dateFormat($ngModel.$viewValue) : null;
                $ctrl.setDate(date);
            });
        }

        linkInput($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, ngModelCtrl: angular.INgModelController, $ctrl: DatePickerController) {
            const format = (date: moment.Moment) => date.format("L");

            const setViewDate = (date) => {
                var text = date == null ? '' : format(moment(date));
                ngModelCtrl.$setViewValue(text);
                ngModelCtrl.$render();
            };

            const setViewRange = (start, end) => {
                var text = '';
                if (start != null && end != null) {
                    var mStart = moment(start),
                        mEnd = moment(end);

                    if (mStart.isSame(end, 'day')) {
                        text = format(mStart);
                    } else {
                        text = `${format(mStart)} - ${format(mEnd)}`;
                    }

                } else if (start != null) {
                    text = format(moment(end));
                } else if (end != null) {
                    text = format(moment(end));
                }

                ngModelCtrl.$setViewValue(text);
                ngModelCtrl.$render();
            };

            $ctrl.setViewDate = setViewDate;
            $ctrl.setViewRange = setViewRange;

            $element.on(`change.${$scope.$id}`, () => {
                if ($ctrl.isSingleDate) {
                    const date = this.datePickerService.inputToMoment(ngModelCtrl.$viewValue);

                    if (!date.isValid()) {
                        $ctrl.setDate(null);
                        return;
                    }

                    if (date.isSame($ctrl.date, 'day'))
                        return;

                    $ctrl.setDate(date.format($ctrl.isoFormat));
                } else {
                    const range = this.datePickerService.inputToRange(ngModelCtrl.$viewValue);

                    if (range == null) {
                        $ctrl.setRange(null, null);
                    } else {

                        const start = moment(range.start),
                            end = moment(range.end);

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

            $element.on(`keydown.${$scope.$id}`, e => {
                if (!$ctrl.isVisible || !this.isEscape(e))
                    return true;

                $ctrl.isVisible = false;
                $scope.$apply();
                return this.preventDefault(e);
            });

            this.popover($scope, $element, $attrs, $ctrl);
        }

        linkNativeElement($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, ngModelCtrl: angular.INgModelController, $ctrl: DatePickerController) {
            this.setTabIndex($element);

            const getVm = (name) => `${this.controllerAs}.${name}`;
            const getAttr = (name, value) => `${name}="${value}"`
            const getVmAttr = (name, value) => getAttr(name, getVm(value));

            function TypeBuilder() {
                this.attrs = [];
                const _builder = this;

                this.addAttr = (name, value) => {
                    this.attrs.push(getAttr(name, value));
                    return _builder;
                }

                this.addLiteral = (name, attr) => {
                    if (typeof $attrs[attr] != "undefined")
                        this.attrs.push(getAttr(name, $attrs[attr]));
                    return _builder;
                }

                this.addBinding = (name, attr, ctrl) => {
                    if (typeof attr == "string")
                        attr = $attrs[attr];
                    if (typeof attr != "undefined")
                        this.attrs.push(getVmAttr(name, ctrl));
                    return _builder;
                }

                this.addProxy = (name: string, fn: Function) => {
                    $ctrl[name] = fn;
                    return _builder;
                }

                this.addEvent = (name, attr, ctrl) => {
                    if (typeof $attrs[attr] != "undefined")
                        this.attrs.push(getVmAttr(name, ctrl));
                    return _builder;
                }

                this.build = () => {
                    const content = `<input date-picker ${this.attrs.join(' ')} required>`;
                    return content;
                }
            }

            const builder = new TypeBuilder()
                .addAttr("type", "text")
                .addLiteral("min-view", "minView")
                .addBinding("ng-model", true, "dateString")
                .addBinding("date", "date", "date")
                // .addProxy("dateSelected", (date) => $ctrl.onDateSelect({ date: date }))
                // .addEvent("on-date-select", "onDateSelect", "dateSelected(date)")
                .addBinding("start", "start", "start")
                .addBinding("end", "end", "end")
                // .addProxy("rangeSelected", (start, end) => $ctrl.onRangeSelect({ start: start, end: end }))
                // .addEvent("on-range-select", "onRangeSelect", "rangeSelected(start,end)")
                .addBinding("is-selecting", "isSelecting", "isSelecting")
                .addLiteral("default-date", "defaultDate")
                .addBinding("highlighted", "highlighted", "highlighted");

            const content = builder.build();

            const $input = angular.element(content)
                .addClass('datepicker-linkNativeElement-input');
            this.$compile($input)($scope);

            $element.addClass('datepicker-linkNativeElement')
                .removeAttr("href")
                .append($input);
        }

        linkElement($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, ngModelCtrl: angular.INgModelController, $ctrl: DatePickerController) {
            this.setTabIndex($element);
            this.popover($scope, $element, $attrs, $ctrl);
        }

        linkInline($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, ngModelCtrl: angular.INgModelController, $ctrl: DatePickerController) {
            const content = this.createContent($scope, $element, $ctrl);
            $element.append(content);
        }

        setTabIndex($element: angular.IAugmentedJQuery) {
            var currentElement = $element.get(0);
            var currentTabIndex = currentElement.getAttribute("tabIndex");
            currentElement.setAttribute("tabIndex", currentTabIndex != null ? currentTabIndex : "-1");
        }

        popover($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, $ctrl: DatePickerController) {
            var content,
                tether,
                $body: any = angular.element('body');

            var doNotReopen = false;
            const onSelect = () => {
                $ctrl.isVisible = false;
                doNotReopen = true;
                $element.focus();
                doNotReopen = false;
            };

            $ctrl['dateSelected'] = (date) => {
                onSelect();
            };

            $ctrl['rangeSelected'] = (start, end) => {
                onSelect();
            };

            $element.on(`click.${$scope.$id}`, () => {
                $ctrl.isVisible = true;
                $scope.$apply();
            });

            const createContent = () => {
                content = this.createDropDown($scope, $element, $attrs, $ctrl);
                $body.append(content);
                $scope.$apply();

                if (this.isMobile)
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
            }

            $element.on(`focus.${$scope.$id}`, () => {
                if (doNotReopen)
                    return;

                $ctrl.isVisible = true;

                if (!content) {
                    createContent();
                }

                $scope.$apply();

                if (tether)
                    tether.position();
            });

            var blurTimer;
            $element.on(`blur.${$scope.$id}`, () => {
                // Allow any click on the menu to come through first
                blurTimer = this.$timeout(() => {
                    if ($ctrl.isSelecting)
                        return;

                    $ctrl.isVisible = false;
                    $scope.$apply();
                }, 300);
            });

            $body.on(`click.${$scope.$id}`, e => {
                if (!$ctrl.isVisible)
                    return;

                if (!content || $element.is(e.target) || content.has(e.target).length > 0) {
                    this.$timeout.cancel(blurTimer);
                    if (content && content.has(e.target).length > 0) {
                        $element.focus();
                    }
                    return;
                }

                $ctrl.isVisible = false;
                $scope.$apply();
            });

            $scope.$on('$destroy', () => {
                $body.off(`click.${$scope.$id}`);
                if (content) content.remove();
            });
        }

        createDropDown($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, $ctrl: DatePickerController): angular.IAugmentedJQuery {
            var singleDateBinding = `date="${this.controllerAs}.date" on-date-select="${this.controllerAs}.dateSelected(date)"`,
                rangeBinding = `start="${this.controllerAs}.start" end="${this.controllerAs}.end" on-range-select="${this.controllerAs}.rangeSelected(start,end)"`,
                bindings = $ctrl.isSingleDate ? singleDateBinding : rangeBinding,
                template = `<div ng-class="{'datepicker-open':${this.controllerAs}.isVisible}"><date-picker min-view="${$attrs['minView']}" is-selecting="${this.controllerAs}.isSelecting" ${bindings}" highlighted="${this.controllerAs}.highlighted" default-date="{{${this.controllerAs}.defaultDate}}"></date-picker></div>`;

            const content = angular.element(template);

            content.addClass("datepicker-dropdown");

            if (this.isMobile) {
                content.addClass("datepicker-dropdown--isMobile");
            } else {
                const position = $element.position(),
                    height = $element.outerHeight(),
                    margin = ($element.outerHeight(true) - height),
                    offset = margin / 2 + height;

                content.css({
                    top: position.top + offset,
                    left: position.left
                });
            }

            this.$compile(content)($scope);

            return content;
        }

        preventDefault(e: JQueryEventObject): boolean {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        isEscape(e: JQueryEventObject): boolean {
            return e.which === 27;
        }

        createContent($scope: angular.IScope, $element: angular.IAugmentedJQuery, $ctrl: DatePickerController): angular.IAugmentedJQuery {
            const template = this.$templateCache.get(this.calendarTemplate);
            const content = angular.element(template);
            this.$compile(content)($scope);
            this.setupSelections($scope, $element, $ctrl);
            return content;
        }

        setupDaySelect($scope: angular.IScope, $element: angular.IAugmentedJQuery, $ctrl: DatePickerController) {
            const dayCss = '.datePickerDays-day',
                $body: any = angular.element('body'),
                mouseDown = `mousedown.${$scope.$id}`,
                mouseUp = `mouseup.${$scope.$id}`;

            const onSelected = (range: DatePickerMouseRange) => {
                var days = range.getDays();
                $ctrl.selected(days);
                $scope.$apply();
            };

            $element.on(mouseDown, dayCss, (e: JQueryEventObject) => {
                const range = new DatePickerMouseRange($ctrl, e);
                $ctrl.isSelecting = true;

                $body.on(mouseUp, () => {
                    $body.off(mouseUp);
                    $ctrl.isSelecting = false;
                    onSelected(range);
                });
            });
        }

        setupRangeSelect($scope, $element, $ctrl: DatePickerController) {
            const $body: any = angular.element('body'),
                mouseDown = `mousedown.${$scope.$id}`,
                mouseOver = `mouseover.${$scope.$id}`,
                mouseUp = `mouseup.${$scope.$id}`,
                dayCss = '.datePickerDays-day';

            const onSelecting = (range: DatePickerMouseRange) => {
                const days = range.getDays();
                $ctrl.selecting(days);
                $scope.$apply();
            };

            const onSelected = (range: DatePickerMouseRange) => {
                const days = range.getDays();
                $ctrl.selected(days);
                $scope.$apply();
            };

            $element.on(mouseDown, dayCss, (e: JQueryEventObject) => {
                const range = new DatePickerMouseRange($ctrl, e);
                $ctrl.isSelecting = true;

                $element.on(mouseOver, dayCss, (e: JQueryEventObject) => {
                    range.setEnd(e);
                    onSelecting(range);
                });

                $body.on(mouseUp, () => {
                    $element.off(mouseOver);
                    $body.off(mouseUp);
                    $ctrl.isSelecting = false;
                    onSelected(range);
                });
            });
        }
    }

    Angular.module("ngDatePicker").directive('datePicker', DatePickerDirective);
}