const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_express_mysql'
});

connection.connect((err) => {
    if (err) {
        console.error('Error koneksi MySQL:', err);
    } else {
        console.log('Koneksi MySQL berhasil');
    }
});

module.exports = connection;
