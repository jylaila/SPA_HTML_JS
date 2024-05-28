window.onload = function()
{
    //Verifico o endereço constante da url
    //exemplo: localhost/ => path[1] retorna ""
    //exemplo: localhost/pacientes => path[1] retorna pacientes
    const path = window.location.pathname.split("/")    
        switch (path[1]) {        
        case "":
            {
                //carrego a função passando como parâmetro o path que será concatenado 
                //com .html posteriomente
                loadPage("home");
                break;
            }

        case "pacientes":
            {
                loadPage("pacientes");
                break;
            }
        case "medicos":
            {
                loadPage("medicos");
                break;
            }
        default:
            {//caso a url não seja encontrada, redireciono para a página notfound
                loadPage('notFound');
                break;
            }
    }

    //adiciono o evento click para cada elemento do menu
    //e redireciono para a página selecionada
    document.querySelectorAll(".menu-item").forEach((item) => {
        item.addEventListener("click", function () {
            const path = item.getAttribute("value");
            loadPage(path);

            if (path == "") {
                window.history.pushState("", "", "/");
                return;
            }

            window.history.pushState("", "", path);
        });
    });

    function loadPage($path) {
        console.log('entrou')

        if ($path == "") return;
        //localizo na página o elemento container, onde os dados serão renderizados
        const container = document.getElementById('container')
        //crio uma requisição http
        const request = new XMLHttpRequest();
        //abro a página
        request.open("GET", "pages/" + $path + ".html");
        request.send();
        //carrego os dados no container caso a página requisitada seja localizada
        request.onload = function () {
            if (request.status == 200) {
                container.innerHTML = request.responseText;
                document.title = $path;
            }
        }
    }
}