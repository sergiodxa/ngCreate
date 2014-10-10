/**
 *
 * Test Module
 * Module description
 *
 */
(function() {
	"use stric";
	angular.module('Test', [])
		.directive('TestDirective', [function () {
			/**
			 *
			 * TestDirective Directive
			 * Test directive
			 *
			 */
			return {
				name: 'TestDirective',
				controller: TestCtrl,
				replace: true
				restrict: 'E',
				templateUrl: 'test.html',
				transclude: true
			};
		}])
})();