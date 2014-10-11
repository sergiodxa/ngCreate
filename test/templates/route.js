/**
 *
 * Test Module
 * Module description
 *
 */
(function() {
	"use stric";
	angular.module('Test', [])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/tasks/:id', {
					templateUrl: 'task-detail.html',
					controller : TaskDetailCtrl
				});
		}])
})();