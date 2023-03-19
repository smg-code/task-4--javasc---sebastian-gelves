let urlapi = ("https://mindhub-xj03.onrender.com/api/amazing")
let data = {}
let  eventos = []
let  fecha   = []

let idMayorPorcentajeAsis = 0
let idMenorPorcentajeAsis = 0
let idMayorCapacidad = 0

let CategoriasFut = []

const tablaUnoBody = document.getElementById("tabla-1") //capturamos la tabla del Stats.html para despues modificar el DOM

async function traerdatosapi(){ 
  try{
    const response = await fetch(urlapi) //await espera la promesa y fetch trae los datos
    const data = await response.json() //await espera la promesa y json convierte los datos en manejables
    console.log(data)
    eventos = data.events
    fecha = data.currentDate
    console.log(fecha)
    
    mostarLosTresEvents(eventos)
    console.log("id mayor porcentaje asistencia", idMayorPorcentajeAsis)
    console.log("id menor porcentaje asistencia", idMenorPorcentajeAsis)
    console.log("id mayor capacidad", idMayorCapacidad)

    mostrarUpcomEvenPorCateg(eventos,fecha)
    console.log("Categorias futuras",CategoriasFut)

    //mostraPassEvenPorCateg(eventos)
    
  }
  catch(error) { //manejo del error
    error={}
    console.log(error)
  }
}

traerdatosapi()
//Array de categorias
function categoriasNoRep(eventos) {
    let Categorias = [] 
        eventos.forEach(each => {                          
        if ( ! Categorias.includes(each.category) ) {                                          
            Categorias.push(each.category)
        }    
    })                                              
    return Categorias
    } 
//Genera los ids de las busquedas, de la primera tabla
function mostarLosTresEvents(eventos) {
    let arrayeventos = eventos
    console.log("tres",arrayeventos)
    //tres elementos 
        // 1- Eventos con mayor porcentaje de asistencia
        MayorPorcentajeAsistencia(arrayeventos)
        
        // 2 - Eventos con menor porcentaje de asistencia
        MenorPorcentajeAsistencia(arrayeventos)

        // 3 - Eventos con mayor capacidad
        EventoMayorCapacidad(arrayeventos)
}    
//id mayor porcentaje asistencia
function MayorPorcentajeAsistencia(eventos) {
    let arrayeventos = eventos
    let porcentajeRef = 0
//propiedades : assistance capacity - (capacidad/asistencia)*100
    arrayeventos.forEach( each => {
        let asistentes = each.assistance 
        let capacidad = each.capacity
        if(asistentes!=undefined){ //algunos datos de asistentes no estan
            let porcentaje = (asistentes/capacidad)*100
            if(porcentaje > porcentajeRef){
                porcentajeRef = porcentaje.toFixed(2) //redondea a dos decimales
                idMayorPorcentajeAsis = each._id
            }
        }
    })
}
//id menor porcentaje asistentes
function MenorPorcentajeAsistencia(eventos){
    let arrayeventos = eventos
    let porcentajeRef = 100
//propiedades : assistance capacity - (capacidad/asistencia)*100
    arrayeventos.forEach( each => {
        let asistentes = each.assistance
        let capacidad = each.capacity
        if(asistentes!=undefined){
            let porcentaje = (asistentes/capacidad)*100
            if(porcentaje < porcentajeRef){
                porcentajeRef = porcentaje.toFixed(2)
                idMenorPorcentajeAsis = each._id
            }
        }
    })
}
//id mayor capacidad
function EventoMayorCapacidad(eventos){
    let arrayeventos = eventos
    let capacidadRef = 0
//propiedades : capacity -
    arrayeventos.forEach( each => {
        let capacidad = each.capacity
        if(capacidad > capacidadRef){
            capacidadRef = capacidad
            idMayorCapacidad = each._id
        }       
    })
}

function mostrarUpcomEvenPorCateg(eventos,fechaActual){
    let arrayeventos = eventos
    let fechaRef = fechaActual
    let arrayDeEventosFut = []
    let ingresos = []
    console.log("f",arrayeventos)
    console.log("a",fechaRef)

    arrayDeEventosFut = arrayeventos.filter(each =>each.date > fechaRef )
    console.log("1",arrayDeEventosFut)
    // categorias de eventos 
    CategoriasFut = CategoriasUpComNoRep(arrayDeEventosFut)
    // Ingresos: estimaso * precio
 /*   ingresos = arrayDeEventosFut.category.filter(each=>{
        each.category.includes(CategoriasFut)
        return ingresos.push(each.estimate * each.price)
    })
    console.log(ingresos)
    // Porcentaje de asistencia*/
}

function CategoriasUpComNoRep(eventos) {
    let CategoriasFut = [] 
        eventos.forEach(each => {                          
        if ( ! CategoriasFut.includes(each.category) ) {                                          
            CategoriasFut.push(each.category)
        }    
    })                                              
    return CategoriasFut
} 

