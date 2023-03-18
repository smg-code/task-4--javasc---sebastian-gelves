const queryString = location.search  // la ruta - forma de generar el id para luego buscarlo
                                     //<a href="./Ficha.html?id=${eventos[i]._id}" class="boton-ficha">Info</a>
console.log(queryString)
                                     
const params = new URLSearchParams(queryString)   // instanciamos una url de una ruta

const id = params.get("id") // obtenemos al id que esta en el home.js y es: ${eventos._id}
                            // para el boton de info
console.log(id)
const eventoParaMostrarDetails = eventos.find(evento => eventos._id == id)

const div = document.querySelector("#fichas")
div.innerHTML = ` <div class="card mb-3">
                        <div class="card-body">
                            <img class="card-img-top" src="${eventos[id-1].image}" alt="${eventos[id-1].name}">
                            <h5 class="card-title">${eventos[id-1].name}</h5>
                            <p class="card-text">${eventos[id-1].description}</p>
                            <a href="./index.html" class="boton-ficha">Volver</a>
                        </div>
                    </div> `

