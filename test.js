



function vaiAlCatalogo() {
    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
            let prodotti = data;
            visualizzaProdotti(prodotti);
        }).catch((err) => console.log(err));
        window.location.href = "catalogo.html";

    }





function visualizzaProdotti (prodotti){

    let container = document.getElementById("container-cards");

    for (let i = 0; i < prodotti.length; i++) {
        let prodotto = prodotti[i];

        container.innerHTML += `
        <div class="container-cards">

        <div class="cards-catalogo">
            <div>
                <img src="${prodotto.image}" alt="" style="width: 248px;height: 250px;border-bottom: 1px solid black;padding: 10px;">
            </div>

            <div style="position: relative;left: 10px;">
                <div style="width: 80px;height: 20px; color: white;">${prodotto.price}</div>
            </div>

            <div style="padding: 10px;">
                <div class="div-h3">
                    <h3 style="color: white;">${prodotto.title}</h3>
                </div>
                <div class="div-p">
                    <p style="color: white;">${prodotto.description}</p>
                </div>
            </div>



            <div style="position: relative;left: 150px;">
                <button
                    style="width: 80px;height: 20px; background-color:#FF8C00;border-radius: 20px; color: white;">Acquista</button>
            </div>

        </div>`

}}
