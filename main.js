var lista = new Array();
var table = getId('table-listar');
const linhasPorPagina = 10;
var totalPag;
var pagAtual = 1;


$("#btn-listar").click(function(){
    $("#forms-section").hide();
    criarListagem();
});

$("#btn-inserir").click(function(){
    $("#tabela-section").hide();
    $("#forms-section").show();
});

$("#btn-cadastrar").click(function(){

    let registro = {
        id: 0,
        albumId: $("#albumId-input").val(),
        title: $("#title-input").val(),
        url: $("#url-input").val(),
        thumbnailUrl: $("#thumbnail-input").val(),
    };

    cadastrarRegistro(registro);
});


$("#pageAnterior").click(function () {
    if (pagAtual > 1) {
        pagAtual--;
        let listaDados = getJSONItem("LISTA");
        displayTable(pagAtual, listaDados);
    }
});

$("#proximoPage").click(function () {
    if (pagAtual < totalPag) {
        pagAtual++;
        let listaDados = getJSONItem("LISTA");
        displayTable(pagAtual, listaDados);
    }
});

$("#btn-excluir").click(function(){
    let id = $("#id-registro-excluir").val();
    excluirRegistro(id);
})



const criarListagem = () =>{
    let list = getJSONItem("LISTA");

    displayTable(pagAtual, list);
    $('#tabela-section').show();
}


function setActivePage() {
    debugger;
    getId("pageAnterior").classList.toggle("disabled", pagAtual === 1);
    getId("proximoPage").classList.toggle("disabled", pagAtual === totalPag);
}

function displayTable(page, listaDados) {
    debugger;
    const inicio = (page - 1) * linhasPorPagina;
    const fim = inicio + linhasPorPagina;
    const paginatedData = listaDados.slice(inicio, fim);
    const tabelaBody = getId("table-body");
    tabelaBody.innerHTML = "";
    
    paginatedData.forEach(item => {
        const linha = `<tr>
        <td>${item.id}</td>
        <td>${item.albumId}</td>
        <td>${item.title}</td>
        <td><img src=${item.url} width="30"></td>
        <td><img src=${item.thumbnailUrl} width="30""></td>
        <td><button type="button" class="btn btn-outline-warning onClick="alterarRegistro(${item.id})"">Alterar</button>
        <button type="button" class="btn btn-outline-danger" onClick="excluirRegistro(${item.id})">Excluir</button></td></tr>`;
        tabelaBody.innerHTML += linha;
    });
    setActivePage();
}

//add todos os itens na lista
const criaLista = (data) => {
    data.forEach(item => {
        lista.push(item);
    });

    totalPag = Math.ceil(lista.length / linhasPorPagina);
    //add no localstorage
    setJSONItem("LISTA", lista);
}


const cadastrarRegistro = (registro) => {
    debugger;
    //var teste = lista[-1].id;
    registro.id = lista.length > 0 ? lista[[lista.length - 1]].id + 1: 1;
    lista.push(registro);

    atualizarLocalStorage();
    alert(`Registro cadastrado com sucesso!`);
}

const excluirRegistro = (id) =>{
    let registroId = lista.findIndex(item => item.id == id);

    if(registroId == -1){
        alert("Registro não encontrado!");
        return;
    }


    lista.splice(registroId, 1);
    atualizarLocalStorage();
    alert(`Registro ${id} foi excluído`);
}

const alterarRegistro = (id) =>{
    let registroId = lista.findIndex(item => item.id == id);

    if(registroId == -1){
        alert("Registro não encontrado!");
        return;
    }


    lista.splice(registroId, 1);
    atualizarLocalStorage();
    alert(`Registro ${id} foi excluído`);
}

const atualizarLocalStorage = () =>{
    removeItem("LISTA");
    setJSONItem("LISTA", lista);
    displayTable(pagAtual, lista);
}


document.addEventListener("DOMContentLoaded", function () {

    //$("#tabela-section").hide();
    $("#forms-section").hide();

    comunAPI(criaLista);

    criarListagem();

});