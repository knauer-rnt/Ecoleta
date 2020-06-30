function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())
    .then(states => {
        for (let state of states)
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    })
} // no primeiro then foi a forma resumida de: (res) => { return res.json() }

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]') // pode ficar sem o select e o input também | input "hidden"
    
    const ufValue = event.target.value // event = change | target = select name="uf" | value = ao value selecionado (número)
    
    const indexOfSelectedState = event.target.selectedIndex // número relacionado à posição de escolha dentro do select | para input hidden
    stateInput.value = event.target.options[indexOfSelectedState].text // o nome da opção selecionada no número acima | para input "hidden"
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` // número UF necessário na URL

    citySelect.disabled = true // reseta o disabled para melhorar a interação do usuário com a próxima mudança de UF
    citySelect.innerHTML = '<option value="">Aguarde...</option>' // aguarda enquanto novas cidades carregam
    
    fetch(url)
    .then(res => res.json())
    .then(cities => {
        citySelect.innerHTML = '<option value="">Selecione a Cidade</option>' // retorna o nome após carregadas cidades (SP, BA, etc demoram mais que o normal)

        for (let city of cities)
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` // value = city.nome para ir na URL corretamente
        
        citySelect.disabled = false // libera o disabled lá no HTML
    })
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities) // não pode chamar getCities() para ela não executar a função. Está apenas sendo referenciada


// Itens de coleta

const itemsToCollect = document.querySelectorAll('.items-grid li')

for (let item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]') // para levar ao backend - linha 86 abaixo | input "hidden" no HTML
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    itemLi.classList.toggle("selected") // se existir ele remove, senão, adiciona

    const itemId = itemLi.dataset.id // data-id no HTML | retorna o valor do mesmo
    
    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( function(item) { // findIndex é uma repetição, então busca até achar true
        // const itemFound = item == itemId --> linha excluída, já vai direto embaixo
        return item == itemId // (era return itemFound antes)
    }) // essa função simplificada ficaria --> findIndex( item => item == itemId )

    // se já estiver selecionado,
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems // input "hidden" - linha 53 acima

}