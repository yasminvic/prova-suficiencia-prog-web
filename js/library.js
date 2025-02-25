
//Confs
const URL = 'https://jsonplaceholder.typicode.com/photos';

//realiza comunicação com a API
const comunAPI = (functionCallBack) =>{
    debugger;
    fetch(URL).then(
                    (response) => response.json(), 
                    (error) => console.log(error),
                    
                ).then(
                        (dataJson) => functionCallBack(dataJson),
                        (error) => console.log(error));
};

const getId = (id) => {
    return document.getElementById(id);
}
