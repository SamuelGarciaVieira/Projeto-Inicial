document.addEventListener("DOMContentLoaded", function () {
    let data = {};
fetch("https://api.github.com/users/SamuelGarciaVieira")
    .then(res => res.json())
    .then(json => {
        data = json;
        MostrarPerfil(data);
        return fetch(data.repos_url);
    })
    .then(res => res.json())
    .then(json => {
        let resp = json;
        MostrarRepo(resp);
        return fetch("http://localhost:3000/topicos");
    })
    .then(res => res.json())
    .then(json => {
        let conteudo = json;
        MostrarConteudo(conteudo);
        return fetch("http://localhost:3000/amigos");
    })
    .then(res => res.json())
    .then(json => {
        let amigos = json;
        MostrarAmigos(amigos);
    })
    .catch(error => console.error("Erro ao buscar dados JSON", error));

    function MostrarPerfil(data) {
        const mostrartela = document.getElementById("mostrarperfil");
        const div = document.createElement("div");
        div.className = 'row';
        div.innerHTML = `
            <div class="col-md-3">
                <img class="border border-3 rounded-start img-fluid d-block" src="${data.avatar_url}" alt="perfil">
            </div>
            <div class="col-md-9 align-items-start">
                <p class="text-primary fw-semibold mt-2 fs-4">${data.name}</p>
                <p>${data.bio}</p>
                <p><span class="fw-bold">Localização: </span>${data.location}</p>
                <p>
                    <span class="p-1">
                        <a target="_blank" class="ml text-dark text-decoration-none" href="https://www.linkedin.com/in/samuelgarciavieira/">
                            <i class="bi bi-linkedin h1"></i>
                        </a>
                    </span>
                    <span class="p-1">
                        <a target="_blank" class="text-dark text-decoration-none" href="https://github.com/SamuelGarciaVieira">
                            <i class="bi bi-github h1"></i>
                        </a>
                    </span>
                    <span class="p-1">
                        <a target="_blank" class="text-dark text-decoration-none" href="https://www.instagram.com/samuellg__/">
                            <i class="bi bi-instagram h1"></i>
                        </a>
                    </span>
                </p>
            </div>
        `;
        mostrartela.appendChild(div);
    }

    function MostrarRepo(resp) {
        const mostrarepo = document.getElementById("mostrarRepo");
        const div = document.createElement("div");
        div.className = 'row';
        resp.forEach(element => {
            const div2 = document.createElement("div");
            div2.className = 'col-lg-2 mt-3';
            div2.id = `repo-${element.id}`;
            div2.innerHTML = `
                <div class="card">
                    <div class="card-header">${element.name}</div>
                    <div class="card-body">
                        <p>${element.description}</p>
                        <button type="button" class="btn btn-light">
                            <a target="_blank" class="text-dark text-decoration-none stretched-link" href="repo.html?id=${element.id}">
                                <span class="fw-bold" id="informacao">Saiba Mais</span>
                            </a>
                        </button>
                        <span class="p-2">
                            <i class="bi bi-person-fill h4"></i> ${element.watchers}
                        </span>
                        <i class="bi bi-star h4"></i> ${element.watchers}
                    </div>
                </div>
            `;
            div.appendChild(div2);
        });
        mostrarepo.append(div);
    }

    function MostrarConteudo(conteudo) {
        const contmostra = document.getElementById("mostrarCarousel");
        let newDiv = document.createElement("div");
        newDiv.className = "col-md-5";
    
        let carouselIndicators = "";
        let carouselItems = "";

        conteudo.forEach((item, index) => {
            const isActive = index === 0 ? "active" : "";
            carouselIndicators += `<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" class="${isActive}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
            carouselItems += `
                <div class="carousel-item ${isActive}">
                <a href="${item.url_link}">
                <img src="${item.url_img}" class="d-block w-100" id="carrosel" alt="Slide ${index + 1}">
                </a>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${item.nome}</h5>
                    </div>
                </div>
            `;
        });

        newDiv.innerHTML = `
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                <div class="carousel-indicators">
                    ${carouselIndicators}
                </div>
                <div class="carousel-inner">
                    ${carouselItems}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `;

        contmostra.appendChild(newDiv);
        var myCarousel = new bootstrap.Carousel(document.getElementById('carouselExampleCaptions'), {
            interval: 5000 
        });
    }

    function MostrarAmigos(amigos) {
        const mostraAmigos = document.getElementById("mostrarAmigos");
        const div = document.createElement("div");
        div.className = 'row';
        amigos.forEach(element => {
            const div2 = document.createElement("div");
            div2.className = 'col-lg-2 mt-3';
            div2.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img id="equipe" class="img-fluid" src="${element.url_img}" alt="equipe1">
                    <h5 class="m-1 text-center fw-semibold text-primary fs-4">${element.nome}</p>
                </div>
            `;
            div.appendChild(div2);
        });
        mostraAmigos.append(div);
    }
});