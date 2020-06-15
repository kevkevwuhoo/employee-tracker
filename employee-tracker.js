require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const DbHelpers = require('./util/dbHelpers.js');

var connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: process.env.DB_PASSWORD,
  database: 'employee_tracker_db',
});

connection.connect(function (err) {
  if (err) throw err;
  askUser();
});

async function askUser() {
  try {
    const questions = [
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'View All Employees by Department',
          'View All Employees by Manager',
          'Add Employee',
          'Remove Employee',
          'Update Employee Role',
          'Update Employee Manager',
          'Quit',
        ],
        name: 'action',
      },
    ];
    const dbHelpers = new DbHelpers();
    const choice = await inquirer.prompt(questions);
    const { userChoice } = choice;
    switch (userChoice) {
      case 'View All Employees':
        dbHelpers.viewAllEmployees(connection);
        break;
    }
  } catch (err) {
    throw err;
  }
}
