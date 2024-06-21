document.addEventListener("DOMContentLoaded", function(){
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

    function MostrarPerfil(data){
        const mostrartela = document.getElementById("mostrarperfil");
        const div = document.createElement("div");
        div.className = 'row';
        div.innerHTML = `
        <div class="col-md-3">
                    <img class="border border-3 rounded-start img-fluid d-block" src="${data.avatar_url}" alt="perfil">
                </div>
                <div class="col-md-9 align-items-start">
                    <p class="text-primary fw-semibold mt-2 fs fs-4">Samuel Garcia</p>
                    <p>
                        Meu nome é Samuel Garcia e sou estudante de Sistemas de Informação na PUC Minas. Tenho uma grande paixão por tecnologia e inovação, e estou sempre buscando novas                       formas de aplicar meus conhecimentos para resolver problemas reais. Comprometido com a aprendizagem contínua, tenho interesse em áreas como desenvolvimento de                      software, análise de dados e segurança da informação. Estou determinado a me tornar um profissional de destaque na área de TI.
                    </p>
                    <p><span class="fw-bold">Localização: </span>Belo Horizonte, MG, Brazil</p>
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

    function MostrarRepo(resp){
        const mostrarepo = document.getElementById("mostrarRepo");
        const div = document.createElement("div");
        div.className = 'row';
        resp.forEach(element => {
            const div2 = document.createElement("div");
            div2.className = 'col-lg-3';
            div2.innerHTML = `
                <div class="card">
                    <div class="card-header">Projeto Primeiro Site com Bootstrap </div>
                    <div class="card-body">
                        <p>Projeto referente a este site, primeiro site completo e responsivo, criado inicialmente como trabalho de <span class="fw-semibold">DIW</span>.</p>
                        <button type="button"class="btn btn-light">
                            <a target="_blank" class="text-dark text-decoration-none" href="https://github.com/SamuelGarciaVieira/Projeto-Primeiro-Site?tab=readme-ov-file#projeto-inicial">
                                <i class="bi bi-github h4" id="icones"></i>
                                <span class="fw-bold">Repositorio</span>
                            </a>
                        </button>
                        <button type="button"class="btn btn-light">
                           <a class="text-dark text-decoration-none" href="repo.html">
                               <span class="fw-semibold">Saiba Mais</span>
                           </a>
                        </button>
                    </div>
            `;
            div.appendChild(div2);
        });
        mostrarepo.append(div);
    }
})