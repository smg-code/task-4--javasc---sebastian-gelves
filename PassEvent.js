let urlapi = ("https://mindhub-xj03.onrender.com/api/amazing")
let data = {}
let  eventos = []
let  fecha   = []

async function traerdatosapi(){ 
  try{
    const response = await fetch(urlapi) //await espera la promesa y fetch trae los datos
    const data = await response.json() //await espera la promesa y json convierte los datos en manejables
    console.log(data)
    eventos = data.events
    fecha   = data.currentDate
    
    EventPass(eventos)

    Categorias = categoriasNoRep(eventos)
    console.log("categorias",Categorias)

    checkBoxesYSearch('#SelectroYBusquedaPasadas',Categorias)
   
  }
  catch(error) { //manejo del error
    console.log(error)
  }
}

traerdatosapi()

function EventPass (array){
  let arrayDeEventos = array
  let body = ``;
  const tagToUpdate = document.getElementById("targPass");
  for (let i = 0; i < arrayDeEventos.length; i++) {
      if (fecha>arrayDeEventos[i].date){
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


function categoriasNoRep(eventos) {
  let Categorias = [] 
      eventos.forEach(each => {                          
      if ( ! Categorias.includes(each.category) ) {                                          
          Categorias.push(each.category)
      }    
  })                                              
  return Categorias
  }                                                 

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

function captureData() {
    let texto = document.getElementById('ID_BUSQUEDA').value.toLocaleLowerCase() 
    //console.log(texto)
    let checks = Array.from(document.querySelectorAll('.class_checks:checked')).map(each => each.value)
    let filtro = eventos.filter(each => {
        return ((each.name.toLocaleLowerCase().includes(texto)) && 
        (checks.length === 0 || checks.includes(each.category)))
    })
    console.log(filtro)
    if (filtro.length>0) {
      EventPass(filtro);
    } else {
      EventPass(noEncontrada());
    }
}

function noEncontrada() {
  let nofound = [{_id: 0,
          "image":"https://cdn.pixabay.com/photo/2016/05/30/14/23/detective-1424831_1280.png",
          "name":"No se encontro evento",
          "date":"2020-12-12", //fecha futura para que funciones son el if
          "description":"haga una nueva busqueda.",
  }]
  return nofound
  }



