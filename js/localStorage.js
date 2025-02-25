const setItem = (key, value) =>{
    //enviando pro localStorage
    localStorage.setItem(key, value);
};

const setJSONItem = (key, value) =>{
    //transformar JavaScript objeto em string (json)
    let objeto = JSON.stringify(value);
    setItem(key, objeto);
};

const getItem = (key) =>{
    return localStorage.getItem(key);
};

const getJSONItem = (key) =>{
    let objeto = getItem(key);
    return JSON.parse(objeto);
};

const removeItem = (key) =>{
    localStorage.removeItem(key);
};