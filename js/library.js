const URL = 'https://jsonplaceholder.typicode.com/photos';

//realiza comunicação com a API
const comunAPI = (functionCallBack) =>{
    fetch(URL).then(
                    (response) => response.json(), 
                    (error) => console.log(error),
                    
                ).then(
                        (dataJson) => functionCallBack(dataJson),
                        (error) => console.log(error));
};

const inserirApi = (registro) => {
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({registro})
    })
    .then(response => response.json())
    .then(data => console.log("Inserido com sucesso!"))
    .catch(error => console.error("Erro ao realizar operação de POST:", error));
};

const alterarApi = (registro) => {
    fetch(URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({registro})
    })
    .then(response => response.json())
    .then(data => console.log("Alterado com sucesso!"))
    .catch(error => console.error("Erro ao realizar operaçãop de PUT:", error));
};

const deletarApi = (id) => {
    fetch(URL + `/${id}`, {
        method: "DELETE"
    })
    .then(data => console.log("Excluído com sucesso!"))
    .catch(error => console.error("Erro no DELETE:", error));
};

const getId = (id) => {
    return document.getElementById(id);
}
