// budget component
budgetMoose.component('budget', {
	templateUrl: '/app/budget/budget.html',
	bindings: {
		netIncome: '<'
	},
	controller: ['$scope', function($scope) {

		$scope.savings = 0;
		$scope.netIncome = 0;
		$scope.expenses = [];
		$scope.invalidExpense = false;

		// Initialize bound properties
		this.$onInit = function () {
			$scope.netIncome = Math.round(this.netIncome / 12);
			$scope.savings = Math.round(this.netIncome / 12);
		}

		// Watch bound properties
		this.$onChanges = function(changes) {
			$scope.netIncome = Math.round(changes.netIncome.currentValue / 12);
			$scope.updateSavings();
		}

		/**
		 * Add an expense to the list
		 *
		 * @param {string} name the name of the expense
		 * @param {string} value the cost of the expense
		 */
		$scope.addExpense = function(name, value) {

			// Validate Input
			if (!$scope.validateExpense(name, value)) {

				$scope.invalidExpense = true;

				// Show toast for 3s
				setTimeout(() => { $scope.invalidExpense = false; }, 2000);

			} else {

				// Add expense
				$scope.expenses.push({
					'name': name,
					'value': parseInt(value)
				});

				// Subtract expense from monthly savings
				$scope.savings -= value;

			}

		}

		/**
		 *	Check if an expense's parameters are valid
		 *
		 * @param {string} name the name of the expense
		 * @param {string} value the cost of the expense
		 * @return {boolean} true if the expense is valid and false otherwise
		 */
		$scope.validateExpense = function(name, value) {
			if (typeof(name) !== 'string') return false;
			if (isNaN(parseInt(value))) return false;
			if (name.length === 0 || value.length === 0) return false;
			return true;
		}

		/**
		 * Update savings when an expense is added
		 */
		$scope.updateSavings = function() {

			$scope.savings = Math.round(this.netIncome);

			if ($scope.expenses.length > 0) {

				for (expense of $scope.expenses) {
					$scope.savings -= expense.value;
				}

			}

		}

	}]

});