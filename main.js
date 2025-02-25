var lista = new Array();
var table = getId('table-listar');
const rowsPerPage = 10;
var currentPage = 1;

function setActivePage() {
    const paginationItems = document.querySelectorAll(".page-item");
    paginationItems.forEach((item, index) => {
        item.classList.toggle("active", index + 1 === currentPage);
    });
}

function setupPagination() {
    const totalPages = Math.ceil(lista.length / rowsPerPage);
    const pagination = getId("pagination");
    pagination.innerHTML = "";
    
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.classList.add("page-item");
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        
        li.addEventListener("click", function () {
            currentPage = i;
            displayTable(currentPage);
            setActivePage();
        });
        pagination.appendChild(li);
    }
    setActivePage();
}


function displayTable(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = lista.slice(start, end);
    const tableBody = getId("table-body");
    tableBody.innerHTML = "";
    
    paginatedData.forEach(item => {
        const row = `<tr><td>${item.albumId}</td><td>${item.id}</td><td>${item.url}</td></tr>`;
        tableBody.innerHTML += row;
    });
}



//add todos os itens na lista
const criaLista = (data) => {
    debugger
    lista = new Array();
    data.forEach(item => {
        lista.push(item);
    });
}

//construindo a tabela
const popularTabela = () =>{
    //pegando e limpando a main
    // let main = getId('main-content');
    // main.innerHTML = ''; 

    //criando html
    let div = document.createElement('div');
    let h1 = `<h1 class="text-center mt-4 title">Lista</h1>`;

    //percorrendo a lista de personagens
    listPers.forEach((item) => {
        //criando html
        let card = document.createElement('div');
        let cardBody = `<div class="card-header bg-dark border-bottom border-light carta-header">
                    <h2 class="text-center title-card">${item.title}</h2>
                </div>
                <div class="card-body bg-dark carta-body">
                    <img src="${item.url}" alt="${character.url}" class="card-image card-img-top mt-2 mb-1 img-fluid img-custom">
                </div>`
            
        //add event de clique
        card.addEventListener('click', () => criaModal(item));

        //estilizando
        card.classList.add('card', 'col-3', 'my-4', 'border-secondary', 'bg-dark', 'ms-1', 'm-3', 'carta');
        div.classList.add('d-flex', 'container', 'row', 'justify-content-center');

        //append
        card.innerHTML = cardBody;
        div.appendChild(card);
    })

    main.innerHTML = h1;
    main.appendChild(div);
};




document.addEventListener("DOMContentLoaded", function () {
    comunAPI(criaLista);
    console.log(lista);
    displayTable(currentPage);
    setupPagination();
});

 