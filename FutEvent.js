

function EventFut (array){
  let arrayDeEventos = array
  let body = ``;
  const tagToUpdate = document.getElementById("targFut");
  for (let i = 0; i < arrayDeEventos.length; i++) {
      if (fecha<arrayDeEventos[i].date){
      body += `
              <div class= "col-xs-12 col-sm-6 col-md-4 col-lg-3 card m-1" style="width: 18rem;"> 
                <img  src = ${arrayDeEventos[i].image} alt="#">
                <h4 class="card-title text-center">${arrayDeEventos[i].name}</h4>
                <p class="card-text text-center">${arrayDeEventos[i].description}</p>
                <div class="row precio-Info">
                      <div class="col-6">
                          <p>Price $ ${arrayDeEventos[i].price}</p>
                      </div>
                      <div class="col-6">
                          <a href="./Ficha.html?id=${arrayDeEventos[i]._id}" class="boton-ficha">Info</a>
                      </div>
                </div>
              </div>
      `;
    }    
  }
  tagToUpdate.innerHTML = body;
}
EventFut(eventos)

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
checkBoxesYSearch('#SelectroYBusquedaFuturas',Categorias) 

function noEncontrada() {
let nofound = [{_id: 0,
        "image":"https://cdn.pixabay.com/photo/2016/05/30/14/23/detective-1424831_1280.png",
        "name":"No se encontro evento",
        "date":"2023-12-12", //fecha futura para que funciones son el if
        "description":"haga una nueva busqueda.",
}]
return nofound
}

function captureData() {
    let texto = document.getElementById('ID_BUSQUEDA').value.toLocaleLowerCase() 
    let checks = Array.from(document.querySelectorAll('.class_checks:checked')).map(each => each.value)
    let filtro = eventos.filter(each => {
        return ((each.name.toLocaleLowerCase().includes(texto)) && 
        (checks.length === 0 || checks.includes(each.category)))
    })
    if (filtro.length>0) {
      EventFut(filtro);
    } else {
      EventFut(noEncontrada());
    }
}
