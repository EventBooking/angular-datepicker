
module DatePickerModule {

    class TimePickerController {
        time: string;
    }

    Angular.module("ngDatePicker").controller('timePicker', TimePickerController);

    class TimePickerDirective {
        static $inject = ['timePickerService', 'isMobile'];

        constructor(private timePickerService: ITimePickerService, private isMobile: boolean) {
        }

        restrict = 'A';
        require = ['timePicker', 'ngModel'];
        controller = TimePickerController;
        controllerAs = 'timepicker';
        bindToController = true;
        scope = {
            time: '='
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
            $element.on(`blur.${$scope.$id}`, () => {
                var m = this.timePickerService.parse($ngModelCtrl.$modelValue);
                $ctrl.time = m.isValid() ? m.format("HH:mm:ss") : null;
                $scope.$apply();
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