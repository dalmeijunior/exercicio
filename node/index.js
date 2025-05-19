const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'meusql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql2')
const connexao = mysql.createConnection(config)
connexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao tentar conectar ao mysql")
    }
    else {
        console.log("Conectado com sucesso!")
    }
})
var sql = `SHOW TABLES LIKE '%PEOPLE%'`
var resultado
var linhas=[]
connexao.query(sql, (e,r)=> {
    if (e) throw e;
    r.forEach((tab)=>{resultado=tab})
})
if (!resultado) {
    console.log("Não existe a tabela")
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS people (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255)
        );
    `;
    connexao.query(createTableSQL)
    console.log("tabela criada")
}

sql = `INSERT INTO people(name) values('dalmei')`
connexao.query(sql)
sql = `INSERT INTO people(name) values('Junior')`
connexao.query(sql)
connexao.query('SELECT * FROM people;',(e,r)=> {
    if (e) throw e;
    r.forEach( (row) => {
        linhas.push(`${row.name}`);
    });
})

connexao.end()
var saida = "<h1>Full Cycle</h1>"
if (linhas)
    linhas.forEach((item) => {saida += '<p>'+item})

app.get('/', (req,res) => {
    res.send(saida)
})

app.listen(port,() => {
    console.log('Rodando na porta ' + port)
})