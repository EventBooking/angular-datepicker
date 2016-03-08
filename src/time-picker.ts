
module DatePickerModule {

    class TimePickerController {
        static $inject = ['timePickerService'];

        constructor(private timePickerService: ITimePickerService) {
            this.initialized = true;
        }

        onInit($scope, $element, ngModelCtrl) {
            this.$scope = $scope;
            this.ngModelCtrl = ngModelCtrl;

            $element.on(`blur.${$scope.$id}`, () => {
                var m = this.timePickerService.parse(ngModelCtrl.$modelValue);
                this.time = m.isValid() ? m.format("HH:mm:ss") : null;
            });

            $scope.$on('$destroy', () => {
                $element.off(`blur.${$scope.$id}`);
            });

            this.setValue(this._time);
        }

        private _time: string;

        get time(): string {
            return this._time;
        }

        set time(value: string) {
            this._time = value;

            if (this.initialized) {
                this.setValue(value);
            }
        }

        private setValue(value) {
            var viewValue = this.timePickerService.format(value);
            this.ngModelCtrl.$setViewValue(viewValue);
            this.ngModelCtrl.$render();
        }

        ngModelCtrl;
        $scope;
        initialized: boolean;
    }

    class TimePickerDirective {
        static $inject = [];

        constructor() { }

        restrict = 'A';
        require = 'ngModel';
        controller = TimePickerController;
        controllerAs = 'timepicker';
        bindToController = true;
        scope = {
            time: '='
        };

        link = ($scope, $element, $attrs, ngModelCtrl) => {
            var ctrl: TimePickerController = $scope[this.controllerAs];
            ctrl.onInit($scope, $element, ngModelCtrl);
        };

    }

    Angular.module("ngDatePicker").directive('timePicker', TimePickerDirective);
}