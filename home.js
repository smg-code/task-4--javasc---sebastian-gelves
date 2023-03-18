console.log([document])

function mostraCards(eventos) {
    let body = ``;
    const tagToUpdate = document.getElementById("targetas");
    console.log("tagToUpdate", tagToUpdate);
    for (let i = 0; i < eventos.length; i++) {
        body += `
                <div class= "col-xs-12 col-sm-6 col-md-4 col-lg-3 card m-1" style="width: 18rem;"> 
                  <img  src = ${eventos[i].image} alt="#">
                  <h4 class="card-title text-center">${eventos[i].name}</h4>
                  <p class="card-text text-center">${eventos[i].description}</p>
                  <div class="row precio-Info">
                        <div class="col-6">
                            <p>Price $ ${eventos[i].price}</p>
                        </div>
                        <div class="col-6">
                            <a href="./Ficha.html?id=${eventos[i]._id}" class="boton-ficha">Info</a>
                        </div>
                  </div>
                </div>
        `;
    }
    tagToUpdate.innerHTML = body;
}

mostraCards(eventos);
















