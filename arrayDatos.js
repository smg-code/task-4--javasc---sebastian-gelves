
let urlapid = ("https://mindhub-xj03.onrender.com/api/amazing")
let data = {}
let  eventos = []
let  fecha   = []

//hago una funcion para traer los datos de la api
//funcion asincronica
async function traerdatosapi(){ 
  try{
    const response = await fetch(urlapid) //await espera la promesa y fetch trae los datos
    data = await response.json() //await espera la promesa y json convierte los datos en manejables
    console.log(data)
    eventos = data.events
    fecha   = data.currentDate

  }
  catch(error) { //manejo del error
    console.log(error)
  }
}

traerdatosapi()





