var lista = new Array();
const linhasPorPagina = 10;
var totalPag;
var pagAtual = 1;


$("#btn-listar").click(function(){
    $("#forms-section").hide();
    $("#forms-alterar-section").hide();
    criarListagem();
});

$("#btn-inserir").click(function(){
    $("#tabela-section").hide();
    $("#forms-alterar-section").hide();
    $("#forms-section").show();
});

$("#btn-alterar").click(function(){
    $("#tabela-section").hide();
    $("#forms-section").hide();
    $("#forms-alterar-section").show();
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
});

$("#id-alterar-input").on("change keyup", function () {
    var idAlterar = $("#id-alterar-input").val();
    var item = lista.find(item => item.id == idAlterar);

    if (item != undefined) {
        $("#albumId-alterar-input").val(item.albumId);
        $("#title-alterar-input").val(item.title);
        $("#url-alterar-input").val(item.url);
        $("#thumbnail-alterar-input").val(item.thumbnailUrl);
    } else {
        $("#albumId-alterar-input").val("");
        $("#title-alterar-input").val("");
        $("#url-alterar-input").val("");
        $("#thumbnail-alterar-input").val("");
    }
});

$("#btn-alterar-registro").click(function(){
    var registro = {
        id: $("#id-alterar-input").val(),
        albumId: $("#albumId-alterar-input").val(),
        title: $("#title-alterar-input").val(),
        url: $("#url-alterar-input").val(),
        thumbnailUrl: $("#thumbnail-alterar-input").val()
    };

    alterarRegistro(registro);
});

const criarListagem = () =>{
    let list = getJSONItem("LISTA");

    displayTable(pagAtual, list);
    $('#tabela-section').show();
}


function setActivePage() {
    getId("pageAnterior").classList.toggle("disabled", pagAtual === 1);
    getId("proximoPage").classList.toggle("disabled", pagAtual === totalPag);
}

function displayTable(page, listaDados) {
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
        <td><button type="button" class="btn btn-outline-danger" onClick="excluirRegistro(${item.id})">Excluir</button></td></tr>`;
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
    registro.id = lista.length > 0 ? lista[[lista.length - 1]].id + 1: 1;
    lista.push(registro);

    inserirApi(registro);
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
    deletarApi(id);
    atualizarLocalStorage();
    alert(`Registro ${id} foi excluído.`);
}

const alterarRegistro = (registroAlterado) =>{
    let registroId = lista.findIndex(item => item.id == registroAlterado.id);

    if(registroId == -1){
        alert("Registro não encontrado!");
        return;
    }

    lista[registroId] = registroAlterado;
    alert(`Registro ${registroAlterado.id} foi alterado com sucesso.`);
    alterarApi(registroAlterado);
    atualizarLocalStorage();
}

const atualizarLocalStorage = () =>{
    removeItem("LISTA");
    setJSONItem("LISTA", lista);
    displayTable(pagAtual, lista);
}


document.addEventListener("DOMContentLoaded", function () {
    $("#forms-section").hide();
    $("#forms-alterar-section").hide();

    comunAPI(criaLista);

    criarListagem();
});