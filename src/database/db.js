// importar a dependência do sqlite3
const sqlite3 = require('sqlite3').verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database('./src/database/database.db')
// após linha acima, rodar no terminal --> node src/database/db.js e o arquivo .db será criado

module.exports = db

// utilizar o objeto banco de dados para nossas operações
// db.serialize(()=>{
//     // com comandos SQL eu vou:
    
//     // // 1 - criar uma tabela
//     // db.run(`
//     //     CREATE TABLE IF NOT EXISTS places (
//     //         id INTEGER PRIMARY KEY AUTOINCREMENT,
//     //         image TEXT,
//     //         name,
//     //         adress TEXT,
//     //         adress2 TEXT,
//     //         state TEXT,
//     //         city TEXT,
//     //         items TEXT
//     //     );
//     // `) // precisa ser crase para poder dar o enter, com ' ou " não daria certo
//     // // 2- inserir dados na tabela
//     // const query = `
//     //     INSERT INTO places (
//     //         image,
//     //         name,
//     //         adress,
//     //         adress2,
//     //         state,
//     //         city,
//     //         items
//     //     ) VALUES (?,?,?,?,?,?,?);
//     // `

//     // const values = [
//     //     'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
//     //     'Papersider',
//     //     'Guilherme Gembala, Jardim América',
//     //     'Nº 260',
//     //     'Santa Catarina',
//     //     'Rio do Sul',
//     //     'Papeis e Papelão'
//     // ]

//     // function afterInsertData(err) {
//     //     if(err) {
//     //         return console.log(err)
//     //     }

//     //     console.log('Cadastrado com sucesso')
//     //     console.log(this) // por causa desse 'this', não se pode usar arrow functions
//     // }

//     // db.run(query, values, afterInsertData) // função sem (), pois está sendo passada como referência. Os () executariam ela imediatamente

//     // 3 - consultar dados da tabela
//     // db.all(`SELECT * FROM places`, function(err, rows) {
//     //     if(err) {
//     //         return console.log(err)
//     //     }

//     //     console.log('Aqui estão seus registros: ')
//     //     console.log(rows)
//     // })

//     // // 4 - deletar um dado da tabela
//     // db.run(`DELETE FROM places WHERE id = ?`, [30], function(err) {
//     //     if(err) {
//     //         return console.log(err)
//     //     }

//     //     console.log('Registro deletado com sucesso')
//     // })
// })