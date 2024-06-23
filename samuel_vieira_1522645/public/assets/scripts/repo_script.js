document.addEventListener("DOMContentLoaded", function(){
    let data = {};
    fetch("https://api.github.com/users/SamuelGarciaVieira/repos")
        .then(res => res.json())
        .then(json => {
            data = json;
            MostrarQuestao(data);
        })
        .catch(error => console.error(console.error("Erro ao buscar dados JSON")));
    
    function MostrarQuestao(data){
        const params = new URLSearchParams(location.search);
        const repoId = parseInt(params.get("id"));
        let repositorio = data.find(repo => repo.id === repoId);
        const topico = repositorio.topics.map(topic => {
            return `<span class="badge bg-primary border border-primary me-1">${topic}</span>`;
        }).join(' ');

        const mostrarquestao = document.getElementById("Questao");
        
        const div = document.createElement("div");
        div.className = 'row';
        div.innerHTML = `<h2 class="m-2">Repositórios: ${repositorio.name}</h2>
                <hr class="border-bottom border-dark">
                <div class="col-lg-11">
                <span class="fw-bold text-primary" >Descrição</span>
                <p>
                    ${repositorio.description}
                </p>
                <span class="fw-bold text-primary ">Data de criação</span>
                <p>
                    ${repositorio.created_at}
                </p>
                <span class="fw-bold text-primary ">Linguagem</span>
                <p>
                    ${repositorio.language}
                </p>
                <span class="fw-bold text-primary ">Topicos</span>
                <p>
                    ${topico}
                </p>
                <span class="fw-bold text-primary">Link de acesso</span>
                <p>
                    <button type="button"class="btn btn-light">
                        <a target="_blank" class="text-dark text-decoration-none" href="${repositorio.svn_url}">
                            <i class="bi bi-github h4" ></i>
                            <span class="fw-bold">Repositorio</span>
                        </a>
                    </button>
                </p>
            </div>
            <div class="col-lg">
                <i class="bi bi-person-fill h4 p-1"></i>${repositorio.watchers}
                <i class="bi bi-star h4 ps-2 p-1"></i>${repositorio.stargazers_count}
                <img src="/samuel_vieira_1522645/public/assets/img/fork.png" alt="fork" id="fork" class="ms-1 mx-1">${repositorio.forks}
            </div>
        `;
        mostrarquestao.append(div);
    }
})