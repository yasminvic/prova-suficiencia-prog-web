var listPers = new Array();

var todos = getId('btn-all');
var aluno = getId('btn-aluno');
var func = getId('btn-func');
var destaque = getId('destaque');

//add evento de clique
aluno.addEventListener('click', function(){
    destaque.hidden=true;
    comunAPI(URL_ALUNO, criaListaPers, 'Alunos');
});

func.addEventListener('click', function(){
    destaque.hidden=true;
    comunAPI(URL_FUNC, criaListaPers, 'Funcionários');
});

todos.addEventListener('click', function(){
    destaque.hidden = true;
    comunAPI(URL_CHARACTERS, criaListaPers, 'Personagens');
})

//add todos os personagens na lista
const criaListaPers = (data, title) => {
    listPers = new Array();
    listPers.push(title);
    data.forEach(character => {
        listPers.push(character);
    });

    //retira os personagens que nao tem foto
    if (listPers[0] == 'Alunos'){
        listPers.splice(12, listPers.length - 11);
        listPers.shift();
    
    }else if (listPers[0] == 'Funcionários'){
        listPers.splice(9, listPers.length - 8);
        listPers.shift();
    
    }else if (listPers[0] == 'Personagens'){
        listPers.splice(26, listPers.length - 25);
        listPers.shift();
    }  
    //funcao que constroe os cards  
    listaCharacters(title);
}

//construindo o card
const listaCharacters = (title) =>{
    //pegando e limpando a main
    let main = getId('main-content');
    main.innerHTML = ''; 

    //criando html
    let div = document.createElement('div');
    let h1 = `<h1 class="text-center mt-4 title">Lista de ${title}</h1>`;

    //percorrendo a lista de personagens
    listPers.forEach((character) => {

        //cor das casas
        let casa = `${character.house}`;
        let cor = '';
        if(casa === 'Gryffindor'){
            cor = 'danger';
        }else if(casa === 'Slytherin'){
            cor = 'success';
        }else if(casa === 'Hufflepuff'){
            cor = 'warning';
        }else if(casa === 'Ravenclaw'){
            cor = 'info';
        }else if(casa === ""){
            cor = 0;
        }

        //casa nula
        if (casa === ""){
            casa = 'No house';
            cor = 'light';
        }

        //criando html
        let card = document.createElement('div');
        let cardBody = `<div class="card-header bg-dark border-bottom border-light carta-header">
                    <h2 class="text-center title-card">${character.name}</h2>
                </div>
                <div class="card-body bg-dark carta-body">
                    <img src="${character.image}" alt="${character.name}" class="card-image card-img-top mt-2 mb-1 img-fluid img-custom">
                    <h3 class="mt-3 p-2 text-${cor} text-center border border-${cor}">${casa}</h3>
                </div>`
            
        //add event de clique
        card.addEventListener('click', () => criaModal(character));

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

const criaModal = (character) =>{

    let modal = getId('modal-body');
    modal.innerHTML = "";
    //criando html
    let card = document.createElement('div');
    let cardBody = `<div class="row g-0">
                    <div>
                    <h1 class="text-white text-center title">${character.name}</h1>
                    </div>
                    <div class="col-md-4 card-header">
                        <img src="${character.image}" alt="${character.name}" class="img-fluid rounded-start">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <ol class="list-group list-group-numbered">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Specie</div>
                            ${character.species}
                        </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Gender</div>
                            ${character.gender}
                        </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">House</div>
                            ${character.house}
                        </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Date of Birth</div>
                            ${character.dateOfBirth}
                        </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Ancestry</div>
                            ${character.ancestry}
                        </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">Patronus</div>
                            ${character.patronus}
                        </div>
                        </li>
                        </ol> 
                    </div>
                    </div>
                    </div>`;

    //estilizando
    card.classList.add('card', 'col-12', 'my-4', 'border-secondary', 'bg-dark', 'ms-1', 'm-3');
    
    //append
    card.innerHTML = cardBody;

    modal.appendChild(card);

    $('#charModal').modal('show');
}

// obje = {
//     "name": "Minerva McGonagall",
//     "species": "human",
//     "gender": "female",
//     "house": "Gryffindor",
//     "dateOfBirth": "04-10-1925",
//     "ancestry": "",
//     "wand": {
//       "wood": "",
//       "core": "",
//       "length": null
//     },
//     "patronus": "tabby cat",
//     "hogwartsStudent": false,
//     "hogwartsStaff": true,
//     "image": "https://hp-api.herokuapp.com/images/mcgonagall.jpg"
//   };

 