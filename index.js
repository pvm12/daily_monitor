const express = require('express');

const sql = require('mssql');

const config = {
    user: 'datadbview',
    password: 'Datadb123view',
    server: 'sql-x125', // You can use 'localhost\\instance' to connect to named instance
    database: 'Data_DB',
    Trusted_Connection: true,
    trustServerCertificate: true
}

sql.on('error', err => {
})

var app = express();

app.get('/', function(req, res) {
    res.send('Working!');
})

app.get('/askue/:year/:month', function(req, res) {
    const year = req.params.year
    const month = req.params.month
    const s_sql = `SELECT * FROM OPENQUERY(SC, 'Data_DB.dbo.askue_ec1_soe2 1603,''01.${month}.${year}'',1')`

    sql.connect(config).then(pool => {
        return pool.request()
            .query(s_sql)
    }).then(result => {
        res.send(result["recordsets"][0]);
    }).catch(err => {
        console.dir(err)
        // ... error checks
    });

})


app.listen(5000);