var lista = new Array();
var table = getId('table-listar');
const rowsPerPage = 10;
const totalPages = Math.ceil(lista.length / rowsPerPage);
var currentPage = 1;

function setActivePage() {
    getId("pageAnterior").classList.toggle("disabled", currentPage === 1);
    getId("proximoPage").classList.toggle("disabled", currentPage === totalPages);
}

function displayTable(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = lista.slice(start, end);
    const tableBody = getId("table-body");
    tableBody.innerHTML = "";
    
    paginatedData.forEach(item => {
        const row = `<tr><td>${item.albumId}</td><td>${item.id}</td><td>${item.url}</td><td>${item.thumbnailUrl}</td>
        <td><button type="button" class="btn btn-outline-warning">Alterar</button>
        <button type="button" class="btn btn-outline-danger" onClick="console.log("oi")">Excluir</button></td></tr>`;
        tableBody.innerHTML += row;
    });

    setActivePage();
}



//add todos os itens na lista
const criaLista = (data) => {
    debugger
    lista = new Array();
    data.forEach(item => {
        lista.push(item);
    });

    //add no localstorage
    setJSONItem("LISTA", lista);

    displayTable(currentPage);
    document.getElementById("pageAnterior").addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            displayTable(currentPage);
        }
    });

    document.getElementById("proximoPage").addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            displayTable(currentPage);
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {
    comunAPI(criaLista);
    // console.log(lista);
    // lista = [
    //     {id: 1, albumId:1, url: "oi"}
    // ]
    // displayTable(currentPage);
    // setupPagination();
});

 console.log(lista);