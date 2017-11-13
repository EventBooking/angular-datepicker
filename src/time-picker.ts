
module DatePickerModule {

    class TimePickerController {
        private $postLink() {
            this.initialized = true;
        }

        private _time: string;

        get time(): string {
            return this._time;
        }

        set time(value: string) {
            this._time = value;
            
            if (this.initialized)
                this.onChange(value);
        }

        onChange: (time: string) => void;
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

        link = ($scope, $element, $attrs, ctrls: any[]) => {
            var $ctrl: TimePickerController = ctrls[0],
                $ngModelCtrl: angular.INgModelController = ctrls[1];

            if (this.isMobile) {
                this.linkMobile($scope, $element, $attrs, $ctrl, $ngModelCtrl);
                return;
            }

            this.linkDesktop($scope, $element, $attrs, $ctrl, $ngModelCtrl);
        };

        linkMobile = ($scope, $element, $attrs, $ctrl: TimePickerController, $ngModelCtrl: angular.INgModelController) => {
            $element.prop('type', 'time');

            var setViewValue = (time) => {
                var viewValue = this.timePickerService.formatIso(time);
                $ngModelCtrl.$setViewValue(viewValue);
                $ngModelCtrl.$render();
            }

            $scope.$watch(() => $ctrl.time, time => {
                setViewValue(time);
            });

            $ngModelCtrl.$viewChangeListeners.push(() => {
                var iso = this.timePickerService.formatIso($ngModelCtrl.$viewValue, null);
                $ctrl.time = iso;
            });

            setViewValue($ctrl.time);
        };

        linkDesktop = ($scope, $element, $attrs, $ctrl: TimePickerController, $ngModelCtrl: angular.INgModelController) => {

            const update = () => {
                var m = this.timePickerService.parse($ngModelCtrl.$modelValue);
                $ctrl.time = m.isValid() ? m.format("HH:mm:ss") : null;

                setViewValue($ngModelCtrl.$modelValue);

                var isRequired = $attrs['required'];
                var isValid = !isRequired || (isRequired && m.isValid());

                $ngModelCtrl.$setValidity('invalidTime', isValid);
                $scope.$apply();
            }

            $element.on(`blur.${$scope.$id}`, update);
            $element.on(`keydown.${$scope.$id} keydown.${$scope.$id}`, e => {
                if (e.which !== 13)
                    return;

                update();
            });

            $scope.$on('$destroy', () => {
                $element.off(`blur.${$scope.$id}`);
            });

            var setViewValue = (value) => {
                var viewValue = this.timePickerService.format(value);
                $ngModelCtrl.$setViewValue(viewValue);
                $ngModelCtrl.$render();
            }

            $scope.$watch(() => $ctrl.time, time => {
                setViewValue(time);
            });

            setViewValue($ctrl.time);
        };

    }

    Angular.module("ngDatePicker").directive('timePicker', TimePickerDirective);
}