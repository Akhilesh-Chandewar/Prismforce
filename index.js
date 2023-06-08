const fs = require('fs');

// Read input JSON file
// const inputData = JSON.parse(fs.readFileSync('1-input.json'));
const inputData = JSON.parse(fs.readFileSync('2-input.json'));

// Extract revenue and expense data from input
const revenueData = inputData.revenueData;
const expenseData = inputData.expenseData;

// Create a map to store the balance for each month
const balanceSheet = new Map();

// Calculate balance for revenue data
revenueData.forEach(revenue => {
  const month = revenue.startDate.slice(0, 7); // Extract year and month from the timestamp
  const balance = balanceSheet.get(month) || 0; // Get current balance or 0 if not present
  balanceSheet.set(month, balance + revenue.amount); // Add revenue amount to the balance
});

// Calculate balance for expense data
expenseData.forEach(expense => {
  const month = expense.startDate.slice(0, 7); // Extract year and month from the timestamp
  const balance = balanceSheet.get(month) || 0; // Get current balance or 0 if not present
  balanceSheet.set(month, balance - expense.amount); // Subtract expense amount from the balance
});

// Sort the balance sheet in ascending order by timestamp
const sortedBalanceSheet = Array.from(balanceSheet.entries()).sort((a, b) => a[0].localeCompare(b[0]));

// Prepare the output object
const output = {
  balance: sortedBalanceSheet.map(([month, amount]) => ({amount, startDate: month + '-01T00:00:00.000Z' }))
};

// Printing on console
console.log(output);