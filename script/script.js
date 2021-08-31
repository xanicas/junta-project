let excelMysql = require('excel-to-mysql');

const credentialsForDB = {
	host: 'localhost',
	user: 'root',
	pass: 'password',
	path: './teste.csv',
	table: 'eleitores',
	db: 'juntadb',
	endConnection: true
};

const initialOptions = {
	customStartEnd: false,
	startRow: 1,
	startCol: 1,
	endRow: 100,
	endCol: 13,
	autoId: true,
	destination: "",
};

function generateOutput(error, resultIsError, results) {
    if(error) {
      if (resultIsError) {
        console.log('\x1b[36m%s\x1b[0m', 'Passed!');
      } else {
        throw error;
      }
    }
    else{
      if (resultIsError) {
        throw new Error('Failure! No error detected');
      } else {
        console.log(results);
        console.log('\x1b[36m%s\x1b[0m', 'Passed!');
      }
    }
  }

async function mysql(data, options, resultIsError = false) {
	try {
        await excelMysql.covertToMYSQL(data, options, function(error, results) {
            if (!error) generateOutput(error, resultIsError, results);
        });
    } catch (error) {
        generateOutput(error, resultIsError, null);
    }
}

mysql(credentialsForDB, initialOptions);