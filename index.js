import express from 'express';
const app = express();
import mysql2 from 'mysql2'
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 8080

const conn = mysql2.createConnection({
    host:"localhost",
    database:"apicaio",
    user:"root",
    password: ""
    // host:process.env.HOST,
    // database:process.env.DATABASE,
    // user:process.env.USER,
    // password:process.env.PASSWORD
})
app.listen(
    port,
    () => console.log(`its alive on http://localhost:${process.env.PORT}`),
    conn.connect((err) =>{
        if(err) throw err;
        
    console.log(`DataBASE CONNECTED http://localhost:${process.env.HOST}`)
    })
)

app.get("/all", (req, res) => {
    // Configurar o header para permitir acesso de outras origens
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
    const sql_query = `select * from pessoas`;
    conn.query(sql_query, (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
});

app.post("/all", (req, res) => {
    const { Nome, Idade } = req.body;
    const sql_query = `INSERT INTO pessoas (Nome, Idade) VALUES ('${Nome}', '${Idade}')`;
    conn.query(sql_query, (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
});



