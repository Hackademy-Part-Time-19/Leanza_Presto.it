function vaiAlCatalogo() {
    let nome = document.getElementById("inputNome").value;
    let prezzo = document.getElementById("inputPrezzo").value;
    let categoria = document.getElementById("inputCategoria").value;
    window.location.href = `catalogo.html?nome=${nome}&prezzo=${prezzo}&categoria=${categoria}`;
}

function vaiAlCatalogoCategoria(categoria) {
    window.location.href = `catalogo.html?categoria=${categoria}`;
}

window.addEventListener("load", function () {
    console.log("Pagina caricata");
    if (window.location.href.includes("catalogo.html")) {
        console.log("Sono nella pagina catalogo.html");
        let url = new URL(window.location.href);

        let nome = url.searchParams.get("nome");
        let prezzo = url.searchParams.get("prezzo");
        let categoria = url.searchParams.get("categoria");
        let limiteInferiorePrezzo;
        let limiteSuperiorePrezzo;

        if (prezzo == "") {
            limiteInferiorePrezzo = "";
            limiteSuperiorePrezzo = "";
        } else if (prezzo == "0-100") {
            limiteInferiorePrezzo = 0;
            limiteSuperiorePrezzo = 100;
        } else if (prezzo == "100-200") {
            limiteInferiorePrezzo = 100;
            limiteSuperiorePrezzo = 200;
        } else if (prezzo == "200-500") {
            limiteInferiorePrezzo = 200;
            limiteSuperiorePrezzo = 500;
        } else if (prezzo == "500") {
            limiteInferiorePrezzo = 500;
            limiteSuperiorePrezzo = Infinity;
        }

        filtraProdottiCatalogo(nome, limiteInferiorePrezzo, limiteSuperiorePrezzo, categoria);

    } else if (window.location.href.includes("paginaProdotto.html")) {
        let url = new URL(window.location.href);
        let idProdotto = url.searchParams.get("idProdotto");
        ottieniProdotto(idProdotto);

    } else if (window.location.href.includes("landingpage.html")) {
        ottieniProdottiCarusel();
    }else {
        console.log("Non sono nella pagina catalogo.html");
    }
});

function filtraProdottiCatalogo(nome, limiteInferiorePrezzo, limiteSuperiorePrezzo, categoria) {
    fetch("https://fakestoreapi.com/products")
        .then((Response) => Response.json())
        .then((data) => {


            document.getElementById("loadingProdotti").style.opacity = "0";
            setTimeout(function () {
                document.getElementById("loadingProdotti").style.display = "none";
            }, 170);

            let prodotti = data;

            let prodottiFiltrati = prodotti.filter((prodotto) => {
                return (!limiteSuperiorePrezzo || (prodotto.price >= limiteInferiorePrezzo && prodotto.price <= limiteSuperiorePrezzo)) &&
                    (!nome || prodotto.title.includes(nome)) &&
                    (!categoria || prodotto.category === categoria);
            });
            visualizzaProdotti(prodottiFiltrati);
        })
        .catch((err) => console.log(err));
}

function visualizzaProdotti(prodotti) {
    let container = document.getElementById("containerCard");
    container.innerHTML = ""; // Pulizia del container prima dell'aggiunta di nuovi elementi
    for (let i = 0; i < prodotti.length; i++) {
        let prodotto = prodotti[i];
        container.innerHTML += `<div id="cardProdotto" class="col-3">
            <div class="imgCard" onclick="vaiAlProdotto(${prodotto.id})"{>
                <img src="${prodotto.image}" alt="" class="">
            </div>
            <div class="testoCard">
                <h6 class="titoloProdotto">${prodotto.title}</h6>
                <h6 class="descrizioneArticoloCard">${prodotto.description}</h6>
            </div>
            <div class="buttonProdotto">
                <h6 class="prezzoProdotto">${prodotto.price} EUR</h6>
                <div class="buttonAggiungiCarello">
                    <i class="fa fa-cart-plus"></i>
                    <h6>Aggiungi al carrello</h6>
                </div>
            </div>
        </div>`;
    }
}

function visualizzaProdottiCarusel(prodotti) {
    let container = document.getElementById("containerCardCarusel");
    container.innerHTML = "";
    for (let i = 0; i < prodotti.length; i++) {
        let prodotto = prodotti[i];
        container.innerHTML += `<div id="cardProdottoCarusel">
            <div class="imgCardCarusel" onclick="vaiAlProdotto(${prodotto.id})">
                <img src="${prodotto.image}"
                    alt="" class="">
            </div>
            <div class="testoCardCarusel">
                <h6 class="titoloProdottoCarusel">${prodotto.title}</h6>
                <h6 class="descrizioneArticoloCardCarusel">${prodotto.description}</h6>

            </div>
            <div class="buttonProdottoCarusel">
                <h6 class="prezzoProdottoCarusel">${prodotto.price} EUR</h6>
                <div class="buttonAggiungiCarelloCarusel">
                    <i class="fa fa-cart-plus"></i>
                    <h6>Aggiungi al carrello</h6>
                </div>
            </div>
        </div>`
    }
}

function ottieniProdottiCarusel() {
    fetch("https://fakestoreapi.com/products")
        .then((Response) => Response.json())
        .then((data) => {
            let prodotti = data;
            let prodottiCarusel = prodotti.filter((prodotto) => {
                return prodotto.category === "jewelery";
            });
            visualizzaProdottiCarusel(prodottiCarusel);
        })
        .catch((err) => console.log(err));
}
function vaiAllaHome() {
    window.location.href = "./landingpage.html";
}
function vaiAlProdotto(id) {
    window.location.href = `./paginaProdotto.html?idProdotto=${id}`;

}
function ottieniProdotto(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then((Response) => Response.json())
        .then((data) => {
            let prodotto = data;
            document.getElementById("imgProdotto").src = prodotto.image;
            document.getElementById("titoloProdotto").innerHTML = prodotto.title;
            document.getElementById("descrizioneProdotto").innerHTML = prodotto.description;
            document.getElementById("prezzoProdotto").innerHTML = prodotto.price + " EUR";
        })
        .catch((err) => console.log(err));
}

// MODALE REGISTRATI
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

function apriModaleRegistrati() {
    document.getElementById("containerModaleRegistrati").style.opacity = "0";
    document.getElementById("containerModaleRegistrati").style.display = "flex";
    setTimeout(function () {
        document.getElementById("containerModaleRegistrati").style.opacity = "1";
    }, 100);
}
function chiudiModaleRegistrati() {
    document.getElementById("containerModaleRegistrati").style.opacity = "1";
    document.getElementById("containerModaleRegistrati").style.display = "none";
    setTimeout(function () {
        document.getElementById("containerModaleRegistrati").style.opacity = "0";
    }, 100);
}
// FINE MODALE REGISTRATI

// CARUSEL ARROW
const carousel = document.querySelector(".caruselCatagoryJewelery");
const slide = document.getElementById("cardProdottoCarusel");

function handleCarouselMove(positive = true) {
    const slideWidth = slide.clientWidth;
    carousel.scrollLeft = positive ? carousel.scrollLeft + slideWidth : carousel.scrollLeft - slideWidth;
}
// FINE CARUSEL ARROW



