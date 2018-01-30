
module DatePickerModule {

    class TimePickerController {
        private $postLink() {
            this.setViewValue(this._time);
            this.initialized = true;
        }

        private _time: string;

        get time(): string {
            return this._time;
        }

        set time(value: string) {
            const hasChanged = this._time !== value;
            if (!hasChanged)
                return;

            this._time = value;
            this.setViewValue(value);

            if (this.initialized) {
                setTimeout(() => this.onChange({ time: value }), 1);
            }
        }

        setViewValue(time: string) { };
        onChange: (params: { time: string }) => void;
        private initialized: boolean;
    }

    Angular.module("ngDatePicker").controller('timePicker', TimePickerController);

    class TimePickerDirective {
        static $inject = ['timePickerService', 'isMobile', '$parse'];

        constructor(private timePickerService: ITimePickerService, private isMobile: boolean, private $parse: angular.IParseService) {
        }

        restrict = 'A';
        require = ['timePicker', 'ngModel'];
        controller = TimePickerController;
        controllerAs = 'timepicker';
        bindToController = true;
        scope = {
            time: '=',
            onChange: '&'
        };

        link = ($scope, $element, $attrs, [$ctrl, $ngModelCtrl]: [TimePickerController, angular.INgModelController]) => {
            if (this.isMobile) {
                this.linkMobile($scope, $element, $attrs, $ctrl, $ngModelCtrl);
                return;
            }

            this.linkDesktop($scope, $element, $attrs, $ctrl, $ngModelCtrl);
        };

        linkMobile = ($scope, $element, $attrs, $ctrl: TimePickerController, $ngModelCtrl: angular.INgModelController) => {
            $element.prop('type', 'time');

            const setViewValue = (time: string) => {
                const viewValue = this.timePickerService.formatIso(time);
                $ngModelCtrl.$setViewValue(viewValue);
                $ngModelCtrl.$render();
            }

            $ctrl.setViewValue = setViewValue;

            $ngModelCtrl.$viewChangeListeners.push(() => {
                $ctrl.time = this.timePickerService.formatIso($ngModelCtrl.$viewValue, null);;
            });
        };

        linkDesktop = ($scope, $element: angular.IAugmentedJQuery, $attrs, $ctrl: TimePickerController, $ngModelCtrl: angular.INgModelController) => {
            const eventId = (...names: string[]) => {
                return names.map(name => `${name}.${$scope.$id}`).join(' ');
            };

            const update = () => {
                $ctrl.time = this.timePickerService.formatIso($ngModelCtrl.$modelValue, null);

                const isValidTime = $ctrl.time != null
                const isRequired = $attrs['required'];
                const isValid = !isRequired || (isRequired && isValidTime);
                $ngModelCtrl.$setValidity('invalidTime', isValid);

                $scope.$apply();
            };

            const updateOnEnter = (e) => {
                const ENTER_KEY = 13;
                const keyDown = e => e.which;

                if (keyDown(e) !== ENTER_KEY)
                    return;

                update();
            }

            const setViewValue = (time: string) => {
                const viewValue = this.timePickerService.format(time);
                $ngModelCtrl.$setViewValue(viewValue);
                $ngModelCtrl.$render();
            }

            $ctrl.setViewValue = setViewValue;

            $element
                .on(eventId('blur'), update)
                .on(eventId('keydown'), updateOnEnter);

            $scope.$on('$destroy', () => {
                $element.off(eventId('blur', 'keydown'));
            });
        };

    }

    Angular.module("ngDatePicker").directive('timePicker', TimePickerDirective);
}