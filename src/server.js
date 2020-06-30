const express = require('express') // instalar antes o Express - npm install express
const server = express()

// configurar pasta public para disponibilizar seus conteúdos pro /
server.use(express.static('public'))

// configurar caminhos da minha aplicação
// página inicial
// req: Requisição
// res: Resposta
server.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html') // __dirname == variável global do node - retorna o diretório em que estou
})

server.get('/create-point', (req, res) => {
    res.sendFile(__dirname + '/views/create-point.html')
})

server.get('/search-results', (req, res) => {
    res.sendFile(__dirname + '/views/search-results.html')
})

// reiniciar o servidor a cada JS salvo -apenas durante o Desenvolvimento (npm install nodemon -D)
// antes de instalar o nodemon, o package.json no objeto scripts{} estava:
// "test": "echo \"Error: no test specified\" && exit 1"
// foi então alterado para "start": "node src/server.js" como um atalho pro npm start executá-lo
// após instalar o nodemon, a única mudança foi acrescentar o "mon" --> "start": "nodemon src/server.js"



// ligar o servidor
server.listen(3000) // porta 3000
