import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import mysql2 from 'mysql2'
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const conn = mysql2.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
})
app.listen(
    process.env.PORT, () =>
    conn.connect((err) => {
        if (err) throw err;

        console.log(`DataBASE CONNECTED http://localhost:${process.env.PORT}`)
    })
)

app.get("/all", (req, res) => {
    // Configurar o header 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    let sql_query = `select * from pessoas`;
    conn.query(sql_query, (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
});

app.get("/all/:id", (req, res) => {
    // Configurar o header
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    let sql_query = ""; // Declaração inicial da variável sql_query
    let id = req.params.id;

    if (!id) {
        sql_query = `select * from pessoas`;
    } else {
        sql_query = `select * from pessoas where Id = ${id}`;
    }

    conn.query(sql_query, (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
});

app.post("/all", (req, res) => {
    //consulta feita ocm placeholders
    const { Nome, Idade } = req.body;
    const sql_query = 'INSERT INTO `pessoas` (Nome, Idade) VALUES (?, ?)';
    conn.query(sql_query, [Nome, Idade], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erro ao inserir registro');
      } else {
        res.send('Registro inserido com sucesso!');
        console.log(result);
      }
    });
  });

app.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const nome = req.body.Nome;
    const idade = req.body.Idade;

    // Consulta SQL com placeholders
    const sql_query = 'UPDATE `pessoas` SET `Nome` = ?, `Idade` = ? WHERE Id = ?';

    // Executar a consulta com os valores dos placeholders
    conn.query(sql_query, [nome, idade, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao atualizar registro');
        } else {
            res.send('Registro atualizado com sucesso!');
            console.log(result);
        }
    });
});

app.delete("delete/:id", (req, res) => {
    const id = req.params.id;
    const sql_query = `DELETE FROM pessoas WHERE id = ${id};`
})



