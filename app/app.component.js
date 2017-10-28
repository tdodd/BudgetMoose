// Main app module
// budgetMoose component contains all other application components

// Requires ngRoute for routing
const budgetMoose = angular.module('budgetMoose', ['ngRoute'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

		// Remove hashbang from paths
		$locationProvider.html5Mode(true);

		// Configure all app routes
		$routeProvider

			// Homepage
			.when('/', { template: '<root></root>' })

			// Budget page
			.when('/budget', { template: '<income></income>' })

			// Page not found
			.otherwise({ redirectTo: '/' });

	}]);