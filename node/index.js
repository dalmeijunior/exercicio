const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'meusql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const connexao = mysql.createConnection(config)
connexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao tentar conectar ao mysql")
    }
    else {
        console.log("Conectado com sucesso!")
    }
})
var sql = `INSERT INTO people(name) values('dalmei')`
connexao.query(sql)
sql = `INSERT INTO people(name) values('Junior')`
connexao.query(sql)
var linhas=[]
connexao.query('SELECT * FROM people;',(e,r)=> {
    if (e) throw e;
    r.forEach( (row) => {
        linhas.push(`${row.name}`);
      });
})
connexao.end()
var saida = "<h1>Full Cycle</h1>"
linhas.forEach((item) => {saida += '<p>'+item})

app.get('/', (req,res) => {
    res.send(saida)
})

app.listen(port,() => {
    console.log('Rodando na porta ' + port)
})