const express = require('express') // instalar antes o Express - npm install express
const server = express()

// configurar pasta public para disponibilizar seus conteúdos pro /
server.use(express.static('public'))

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
    return res.render('create-point.html')             // as 3 viraram render para o Nunjucks +
})                                                     // retira o caminho até as views pois já
                                                       // está especificado na linha 9
server.get('/search', (req, res) => {
    return res.render('search-results.html')           // return sempre necessário
})

// reiniciar o servidor a cada JS salvo -apenas durante o Desenvolvimento (npm install nodemon -D)
// antes de instalar o nodemon, o package.json no objeto scripts{} estava:
// "test": "echo \"Error: no test specified\" && exit 1"
// foi então alterado para "start": "node src/server.js" como um atalho pro npm start executá-lo
// após instalar o nodemon, a única mudança foi acrescentar o "mon" --> "start": "nodemon src/server.js"

// ligar o servidor
server.listen(3000) // porta 3000
