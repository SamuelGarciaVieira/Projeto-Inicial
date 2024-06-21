document.addEventListener("DOMContentLoaded", function () {
    let data = {};
    fetch("https://api.github.com/users/SamuelGarciaVieira")
        .then(res => res.json())
        .then(json => {
            data = json;
            MostrarPerfil(data);
            return fetch(data.repos_url)
        })
        .then(res => res.json())
        .then(json => {
            let resp = json;
            MostrarRepo(resp);
        })
        .catch(error => console.error(console.error("Erro ao buscar dados JSON")));

    function MostrarPerfil(data) {
        const mostrartela = document.getElementById("mostrarperfil");
        const div = document.createElement("div");
        div.className = 'row';
        div.innerHTML = `
        <div class="col-md-3">
                    <img class="border border-3 rounded-start img-fluid d-block" src="${data.avatar_url}" alt="perfil">
                </div>
                <div class="col-md-9 align-items-start">
                    <p class="text-primary fw-semibold mt-2 fs fs-4">${data.name}</p>
                    <p>
                        ${data.bio}    
                    </p>
                    <p><span class="fw-bold">Localização: </span>${data.location}</p>
                    <p>
                       <span class="p-1">
                            <a target="_blank" class="ml text-dark text-decoration-none" href="https://www.linkedin.com/in/samuelgarciavieira/"> 
                                <i class="bi bi-linkedin h1" ></i>
                         </a>
                         </span>
                        <span class="p-1">
                            <a target="_blank" class="text-dark text-decoration-none" href="https://github.com/SamuelGarciaVieira">
                                <i class="bi bi-github h1" ></i>
                            </a>
                        </span>
                        <span class="p-1" >
                            <a target="_blank" class="text-dark text-decoration-none" href="https://www.instagram.com/samuellg__/">
                                <i class="bi bi-instagram h1" ></i>
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
                <div class="card ">
                    <div class="card-header">${element.name}</div>
                    <div class="card-body">
                        <p>${element.description}</p>
                    <button type="button"class="btn btn-light">
                        <a target="_blank" class="text-dark text-decoration-none stretched-link" href="repo.html">
                        <span class="fw-bold" id="informacao">Saiba Mais</span>
                    </a>
                    </button>
                    <span class="p-2">
                        <i class="bi bi-person-fill h4 "></i> ${element.watchers}
                    </span>
                    <i class="bi bi-star h4"></i> ${element.watchers}
                </div>
            `;
            div.appendChild(div2);
        });
        mostrarepo.append(div);
    }

    document.querySelectorAll('#informacao').forEach(button => {
        button.addEventListener('click', function(event) {
            const repoId = this.getAttribute('data-id');
            localStorage.setItem('selectedRepoId', repoId);
            window.location.href = 'repo.html';  // Redireciona para a nova página
        });
    });
    
})