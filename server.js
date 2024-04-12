const express = require('express');
const mysql = require('mysql2');
const mysql_config = require('./mysql_config');
const connection = mysql.createConnection(mysql_config);
const app = express();

app.listen(3000, () => {

    console.log('Servidor em execução');
});

app.get('/', (req, res) => {
    //criando um objeto result para todos os end points da API
    let result = {
        status: 'sucesso',
        message: null,
        data: null
    }
    //fazendo a conexão
    connection.query('SELECT * FROM tasks', (err, results) => {
        //cuidar do erro
        if(err){

            result.status = 'erro';
            result.message = 'Erro na obtenção das tarefas';
            result.data = [];
            //res.send(results);
            res.json(result);
        } else {

            result.status = 'sucesso';
            result.message = 'Tarefas obtidas com sucesso';
            result.data = results;
            //res.send(results);
            res.json(result);
        }
    });
});

