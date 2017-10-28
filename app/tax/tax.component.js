// tax component
budgetMoose.component('tax', {
	templateUrl: '/app/tax/tax.html',
	bindings: {
		taxBracket: '<',
		taxesPaid: '<',
		netIncome: '<',
	},
	controller: ['$scope', function ($scope) {

		// Initialize bound properties
		this.$onInit = function() {
			$scope.netIncome = this.netIncome;
			$scope.taxBracket = this.taxBracket;
			$scope.taxesPaid = this.taxesPaid;
		}

		// Watch bound properties
		this.$onChanges = function(changes) {
			$scope.netIncome = changes.netIncome.currentValue;
			$scope.taxBracket = changes.taxBracket.currentValue;
			$scope.taxesPaid = changes.taxesPaid.currentValue;
		}

	}]

});