const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };





// Documentation
// sqlForPartialUpdate(dataToUpdate, jsToSql)
// Description: sqlForPartialUpdate is a utility function that generates a SQL query fragment for updating specific columns in a database row. It takes two parameters:

// dataToUpdate: An object where the keys are the column names to update and the values are the new values to set.
// jsToSql: An optional object that maps JavaScript-style camelCase keys to SQL-style snake_case column names.
// Parameters:

// dataToUpdate (Object): The data to update, with key-value pairs representing the column names and their new values.
// Example: { firstName: 'Aliya', age: 32 }
// jsToSql (Object): A mapping of JavaScript-style keys to SQL column names.
// Example: { firstName: "first_name" }
// Returns:

// An object containing two properties:
// setCols (String): A string representing the columns to update in the SQL format, with placeholders for values.
// Example: "first_name"=$1, "age"=$2
// values (Array): An array of values to be used in the SQL query.
// Example: ['Aliya', 32]
// Throws:

// BadRequestError: If dataToUpdate is empty, indicating that there is no data to update.