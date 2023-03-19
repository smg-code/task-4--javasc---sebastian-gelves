let urlapi = ("https://mindhub-xj03.onrender.com/api/amazing")
let data = {}
let  eventos = []
let  fecha   = []

let idMayorPorcentajeAsis = 0
let idMenorPorcentajeAsis = 0
let idMayorCapacidad = 0

let CategoriasFut = []
let ingresos = []
let porcDeAscisEventFut = []

let CategoriasPass = []
let ingresosPass = []
let porcDeAscisEventPass = []

async function traerdatosapi(){ 
  try{
    const response = await fetch(urlapi) //await espera la promesa y fetch trae los datos
    const data = await response.json() //await espera la promesa y json convierte los datos en manejables
    //console.log(data)
    eventos = data.events
    fecha = data.currentDate
    //console.log(fecha)
    
    mostarLosTresEvents(eventos)
    //console.log("id mayor porcentaje asistencia", idMayorPorcentajeAsis)
    //console.log("id menor porcentaje asistencia", idMenorPorcentajeAsis)
    //console.log("id mayor capacidad", idMayorCapacidad)

    mostrarUpcomEvenPorCateg(eventos,fecha)
    console.log("Categorias futuras",CategoriasFut)
    console.log("ingreso bbbxalida",ingresos)
    console.log("porcentaje asistencio por categoria", porcDeAscisEventFut)

    mostraPassEvenPorCateg(eventos,fecha)
    console.log("Categorias pasadas",CategoriasPass)
    console.log("ingreso event pasadas",ingresosPass)
    console.log("porcentaje asistencio por categoria pasadas", porcDeAscisEventPass)

    diplayTablaUno(eventos,idMayorPorcentajeAsis,idMenorPorcentajeAsis,idMayorCapacidad)

    diplayTablaDos(eventos,CategoriasFut,ingresos,porcDeAscisEventFut)

    

  }
  catch(error) { //manejo del error
    error={}
    console.log(error)
  }
}

traerdatosapi()

function  diplayTablaDos(eventos,CategoriasFut,ingresos,porcDeAscisEventFut){
    let CategFut = CategoriasFut
    let ingresosFut = ingresos
    let PorcentajeAsistenciaCatgFut = porcDeAscisEventFut
    let eventosT = eventos
    //let MayorPorcentajeAsistentes = ((eventos[idMayorPorc-1].assistance/eventos[idMayorPorc-1].capacity)*100).toFixed(2)
    //let MenorPorcentajeAsistentes = ((eventos[idMenorPorc-1].assistance/eventos[idMenorPorc-1].capacity)*100).toFixed(2)
    //console.log("eventos para tabla",eventosT)
    //console.log("idM",idMayorC)
    const tablaDosBody = document.getElementById("tabla-2"); //capturamos la tabla del Stats.html para despues modificar el DOM
    let bodyTablaDos = ``;
    for (let i = 0; i < CategFut.length; i++) {
        bodyTablaDos += ` <tr>
                            <td>${CategFut[i]}</td>
                            <td> $ ${ingresosFut[i]}</td>
                            <td>${PorcentajeAsistenciaCatgFut[i]}% </td>
                         </tr> `;                             
    }
    tablaDosBody.innerHTML = bodyTablaDos;
}

function diplayTablaUno(eventos,idMayorPorcentajeAsis,idMenorPorcentajeAsis,idMayorCapacidad){
    let idMayorPorc = idMayorPorcentajeAsis
    let idMenorPorc = idMenorPorcentajeAsis
    let idMayorC = idMayorCapacidad
    let eventosT = eventos
    let MayorPorcentajeAsistentes = ((eventos[idMayorPorc-1].assistance/eventos[idMayorPorc-1].capacity)*100).toFixed(2)
    let MenorPorcentajeAsistentes = ((eventos[idMenorPorc-1].assistance/eventos[idMenorPorc-1].capacity)*100).toFixed(2)
    console.log("eventos para tabla",eventosT)
    console.log("idM",idMayorC)
    const tablaUnoBody = document.getElementById("tabla-1"); //capturamos la tabla del Stats.html para despues modificar el DOM
    
    let bodyTablaUno = `<tr>
                            <td>${eventosT[idMayorPorc-1].name}  ( ${MayorPorcentajeAsistentes} %)</td>
                            <td>${eventosT[idMenorPorc-1].name}  ( ${MenorPorcentajeAsistentes} %)</td>
                            <td>${eventosT[idMayorC-1].name}  (${eventosT[idMayorC-1].capacity})</td>
                         </tr> `;                             
    tablaUnoBody.innerHTML = bodyTablaUno;
}

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
    //console.log("tres",arrayeventos)
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

//Genera los array para la tabla de elementos de las categorias futura
function mostrarUpcomEvenPorCateg(eventos,fechaActual){
    let arrayeventos = eventos
    let fechaRef = fechaActual
    let arrayDeEventosFut = []
        //console.log("f",arrayeventos)
        //console.log("a",fechaRef)

    arrayDeEventosFut = arrayeventos.filter(each =>each.date > fechaRef )
        //console.log("1",arrayDeEventosFut)
    // categorias de eventos 
    CategoriasFut = CategoriasUpComNoRep(arrayDeEventosFut)
        //console.log("categorias futuras dentro de la funcion fut",CategoriasFut)
    // Ingresos: estimaso * precio
        //recorro la array de caregorias
        CategoriasFut.forEach(each =>{ 
            let nombreCategoria = each
            //filtro elemento por categoria
            ingresos.push(SeparacionPorCategorias(arrayDeEventosFut,nombreCategoria))
            //a cada elemento que fue filtrado hacemos la cuenta 
            //esta dentro de la funcion  SeparacionPorCategorias()
            })
    //porcentaje de asistencia : (estimados totales / capacdidad total eventos )
    //let porcDeAscisEventFut = []
            //recorro la array de caregorias
        CategoriasFut.forEach(each =>{ 
            let nombreCategoria = each
            //filtro elemento por categoria
            porcDeAscisEventFut.push(PorcentajeAsistenciaPorCategoria(arrayDeEventosFut,nombreCategoria))
                //console.log("porcetaje estimado xalida",porcDeAscisEventFut)
            //dentro de la funcion xalculo el porcentaje de asistencia
            })
}
    //Array de categorias para futuros eventos
    function CategoriasUpComNoRep(eventos) {
        let CategoriasFut = [] 
            eventos.forEach(each => {                          
            if ( ! CategoriasFut.includes(each.category) ) {                                          
                CategoriasFut.push(each.category)
            }    
        })                                              
        return CategoriasFut
    } 
    //Array de ingresos por categoria futuros eventos
    function SeparacionPorCategorias(arrayDeEventos , nombreCategoria){
        let arrayAfiltra = arrayDeEventos
        let nombreCategoriaparaFiltra = nombreCategoria
            //console.log("entradaArray", arrayAfiltra)
            //console.log("entradanombre",nombreCategoria)
        ingresoPorCategoria = 0
        let arrayFiltrada = arrayAfiltra.filter(each => each.category == nombreCategoriaparaFiltra)
            //console.log("ssss",arrayFiltrada)
        //hago la cuenta de ingreso por categoria
        arrayFiltrada.forEach(each=>{
            if(each.estimate != undefined){  //para poder usasr con eventos futuros y pasados
                ingresoPorCategoria +=(each.estimate*each.price)
            }else{
                ingresoPorCategoria +=(each.assistance*each.price)
            }
                //console.log("ingreso",ingresoPorCategoria)
            })
        return ingresoPorCategoria
    }
    //Array de porcentaje de asistencia por categoria
    function PorcentajeAsistenciaPorCategoria(arrayDeEventos,nombreCategoria){
        let arrayAfiltra = arrayDeEventos
        let nombreCategoriaparaFiltra = nombreCategoria
            //console.log("entradaArray", arrayAfiltra)
            //console.log("entradanombre",nombreCategoriaparaFiltra)
        let sumaEstimadosTotal = 0
        let sumaCapacidadTotal = 0
        let porcentajePorCategoria = 0

        let arrayFiltrada = arrayAfiltra.filter(each => each.category == nombreCategoriaparaFiltra)
        arrayFiltrada.forEach(each=>{
            if(each.estimate != undefined){  //para poder usasr con eventos futuros y pasados
                sumaEstimadosTotal += each.estimate
            }else{
                sumaEstimadosTotal += each.assistance 
            }
                //console.log("estimado",sumaEstimadosTotal)
            sumaCapacidadTotal += each.capacity
            })
        return porcentajePorCategoria = ((sumaEstimadosTotal/sumaCapacidadTotal)*100).toFixed(2)
    }

//Genera los array para la tabla de elementos de las categorias futura
function mostraPassEvenPorCateg(eventos,fechaActual){
    let arrayeventos = eventos
    let fechaRef = fechaActual
    let arrayDeEventosPass = []
        //console.log("f",arrayeventos)
        //console.log("a",fechaRef)

    arrayDeEventosPass = arrayeventos.filter(each => each.date < fechaRef )
        //console.log("1",arrayDeEventosPass)
    // categorias de eventos 
    CategoriasPass = CategoriasPassNoRep(arrayDeEventosPass)
        //console.log("categorias futuras dentro de la funcion fut",CategoriasFut)
    // Ingresos: estimaso * precio
        //recorro la array de caregorias
        CategoriasPass.forEach(each =>{ 
            let nombreCategoria = each
            //filtro elemento por categoria
            ingresosPass.push(SeparacionPorCategorias(arrayDeEventosPass,nombreCategoria))
            //a cada elemento que fue filtrado hacemos la cuenta 
            //esta dentro de la funcion  SeparacionPorCategorias()
            })
    //porcentaje de asistencia : (estimados totales / capacdidad total eventos )
    //let porcDeAscisEventFut = []
            //recorro la array de caregorias
         CategoriasPass.forEach(each =>{ 
            let nombreCategoria = each
            //filtro elemento por categoria
            porcDeAscisEventPass.push(PorcentajeAsistenciaPorCategoria(arrayDeEventosPass,nombreCategoria))
                //console.log("porcetaje estimado xalida",porcDeAscisEventFut)
            //dentro de la funcion xalculo el porcentaje de asistencia
            })
}
    //Array de categorias para eventos pasados
    function CategoriasPassNoRep(eventos) {
        let CategoriasPass = [] 
            eventos.forEach(each => {                          
            if ( ! CategoriasPass.includes(each.category) ) {                                          
                CategoriasPass.push(each.category)
            }    
        })                                              
        return CategoriasPass
    } 
    

