// income component
budgetMoose.component('income', {
	templateUrl: '/app/income/income.html',
	controller: ['$scope', function($scope) {

		$scope.salary;
		$scope.taxesPaid = 0;
		$scope.validSalary = true;
		$scope.netIncome = 0;
		$scope.taxBracket = 0;

		/**
		 * Calculate net income for other budget functions
		 *
		 * @param {number} salary the salary input value
		 */
		$scope.calcIncome = function (salary) {

			// Check if input is valid
			if (!$scope.validateSalary(salary)) {
				$scope.validSalary = false;
			} else {

				// Get tax bracket and net income, and round to nearest dollar
				$scope.taxBracket = $scope.getTaxBracket(salary);
				$scope.netIncome = Math.round($scope.getNetIncome(salary));
				$scope.taxesPaid = Math.round(salary - $scope.netIncome);
			}

		}

		/**
		 * Check the salary input is valid
		 *
		 * @param {number} salary the salary input value
		 * @return {boolean} true if the salary is valid and false otherwise
		 */
		$scope.validateSalary = function (salary) {
			return typeof (parseInt(salary)) === 'number' && salary.length > 3;
		}

		/**
		 * Gets the tax bracket for a given salary.
		 * 	(See /app/tax/tax/service.js for bracket and percentage details)
		 *
		 * @param {number} salary the gross income
		 * @return {number} the tax bracket for the given salary
		 */
		$scope.getTaxBracket = function (salary) {

			// First Bracket
			if (salary < FIRST_BRACKET) return 1;

			// Second Bracket
			else if (salary >= FIRST_BRACKET && salary < SECOND_BRACKET) return 2;

			// Third Bracket
			else if (salary >= SECOND_BRACKET && salary < THIRD_BRACKET) return 3;

			// Fourth Bracket
			else if (salary >= THIRD_BRACKET && salary < FOURTH_BRACKET) return 4;

			// Fifth Bracket
			else return 5;

		}

		/**
		 * Calculate the net income after taxes for a given salary
		 *
		 * @param {number} salary the gross income before taxes
		 * @return {number} the net income after taxes
		 */
		$scope.getNetIncome = function (salary) {

			const taxBracket = $scope.getTaxBracket(salary);
			let netIncome = salary;

			// First Bracket
			if (taxBracket === 1) {
				netIncome -= salary * FIRST_TAX;
			}

			// Second Bracket
			else if (taxBracket === 2) {
				netIncome -= FIRST_BRACKET * FIRST_TAX;
				netIncome -= (salary - FIRST_BRACKET) * SECOND_TAX;
			}

			// Third Bracket
			else if (taxBracket === 3) {
				netIncome -= FIRST_BRACKET * FIRST_TAX;
				netIncome -= (SECOND_BRACKET - FIRST_BRACKET) * SECOND_TAX;
				netIncome -= (salary - SECOND_BRACKET) * THIRD_TAX;
			}

			// Fourth Bracket
			else if (taxBracket === 4) {
				netIncome -= FIRST_BRACKET * FIRST_TAX;
				netIncome -= (SECOND_BRACKET - FIRST_BRACKET) * SECOND_TAX;
				netIncome -= (THIRD_BRACKET - SECOND_BRACKET) * THIRD_TAX;
				netIncome -= (salary - THIRD_BRACKET) * FOURTH_TAX;
			}

			// Fifth Bracket
			else {
				netIncome -= FIRST_BRACKET * FIRST_TAX;
				netIncome -= (SECOND_BRACKET - FIRST_BRACKET) * SECOND_TAX;
				netIncome -= (THIRD_BRACKET - SECOND_BRACKET) * THIRD_TAX;
				netIncome -= (FOURTH_BRACKET - THIRD_BRACKET) * FOURTH_TAX;
				netIncome -= (salary - FOURTH_BRACKET) * FIFTH_TAX;
			}

			// Remove CPP
			netIncome -= netIncome * CPP_TAX;

			return netIncome;

		}

	}]

});
