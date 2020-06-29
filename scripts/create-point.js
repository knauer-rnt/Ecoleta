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
    const stateInput = document.querySelector('input[name=state]') // pode ficar sem o select e o input também
    
    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for (let city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities) // não pode chamar getCities() para ela não executar a função. Está apenas sendo referenciada