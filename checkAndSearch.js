
function categoriasNoRep(eventos) {
let Categorias = [] 
eventos.forEach(each => {                          
    if ( ! Categorias.includes(each.category) ) {                                                  
        Categorias.push(each.category)
    }    
})
return Categorias
}
Categorias = categoriasNoRep(eventos)


function checkBoxesYSearch(id_etiquetas,category) { 
    let barraSelectorYBusqueda = document.querySelector(id_etiquetas); 
    console.log(barraSelectorYBusqueda)
    category = category.map(each=> { 
        return `
        <fieldset>
                <label class="contact-label" for="${each}">${each}</label>
                <input onclick="captureData()" class="class_checks contact-input" 
                type="checkbox" value="${each}" name="tipo" id="${each}">
        </fieldset>
        `;
    })
    category.push(`<input onkeyup="captureData()" id="ID_BUSQUEDA" 
    class="contact-input" type="text" name="texto" placeholder="Busqueda">`)
    barraSelectorYBusqueda.innerHTML = category.join('');
}

checkBoxesYSearch('#SelectroYBusqueda',Categorias)

function noEncontrada() {
let nofound = [{_id: 0,
        "image":"https://cdn.pixabay.com/photo/2016/05/30/14/23/detective-1424831_1280.png",
        "name":"No se encontro evento",
        "description":"haga una nueva busqueda.",
}]
return nofound
}

function captureData() {
    let texto = document.getElementById('ID_BUSQUEDA').value.toLocaleLowerCase()
    console.log(texto)
    let checks = Array.from(document.querySelectorAll('.class_checks:checked')).map(each => each.value)
    let filtro = eventos.filter(each => {   
        return ((each.name.toLocaleLowerCase().includes(texto)) && 
        (checks.length === 0 || checks.includes(each.category)))
    })
    if (filtro.length>0) {
        mostraCards(filtro);
    } else {
        mostraCards(noEncontrada());
    }
}

