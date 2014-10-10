		.directive('@name', [function () {
			/**
			 *
			 * @name Directive
			 * @description
			 *
			 */
			return {
				name: '@name',
				controller: @controller
				replace: true
				restrict: '@restrict',
				templateUrl: @template,
				transclude: true
			};
		}])