const express = require('express') // instalar antes o Express - npm install express
const server = express()

// pegar o banco de dados
const db = require('./database/db') // ele entende que é o db.js | repare que pra existir o require, tem que existir o "module.exports" no local de referência

// configurar pasta public para disponibilizar seus conteúdos pro /
server.use(express.static('public'))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// utilizando Template Engine Nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
}) // (pasta onde estão os htmls, objeto{servidor express, 
   // noCache para tirar possíveis caches antigos que foram criados pelo nunjucks})

// configurar caminhos da minha aplicação
// página inicial
// req: Requisição
// res: Resposta
server.get('/', (req, res) => {
    return res.render('index.html', {title: 'Um título'}) // __dirname == variável global do node - retorna o diretório em que estou
}) // o segundo argumento é um objeto cujas chaves são variáveis que entrarão no HTML onde desejar, através do {{title}} (nesse exemplo)

server.get('/create-point', (req, res) => {

    // req.query: Query Strings da nossa URL
    // console.log(req.query)

    return res.render('create-point.html')             // as 3 viraram render para o Nunjucks +
})                                                     // retira o caminho até as views pois já
                                                       // está especificado na linha 9
server.post('/savepoint', (req, res) => {

    // req.body: o corpo do nosso formulário
    // console.log(req.body)

    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.render('create-point.html', { error: true })
        }

        console.log('Cadastrado com sucesso')
        console.log(this) // por causa desse 'this', não se pode usar arrow functions
        
        return res.render('create-point.html', { saved: true })
    }

    db.run(query, values, afterInsertData)
})  

server.get('/search', (req, res) => {

    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        return res.render('search-results.html', { total: 0})
    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a págin HTML com os dados do banco de dados
        return res.render('search-results.html', { places: rows, total: total })    // return sempre necessário
    }) // linha acima: quando a chave tem o mesmo nome de seu valor, pode deixar só um deles
})

// reiniciar o servidor a cada JS salvo -apenas durante o Desenvolvimento (npm install nodemon -D)
// antes de instalar o nodemon, o package.json no objeto scripts{} estava:
// "test": "echo \"Error: no test specified\" && exit 1"
// foi então alterado para "start": "node src/server.js" como um atalho pro npm start executá-lo
// após instalar o nodemon, a única mudança foi acrescentar o "mon" --> "start": "nodemon src/server.js"

// ligar o servidor
server.listen(3000) // porta 3000
