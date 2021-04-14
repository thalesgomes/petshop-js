const moment = require('moment');
const fs = require('fs');
const nomeArquivo = 'pets.json';
const petshop = "PETSHOP DH";
let petsJSON = fs.readFileSync(nomeArquivo); // lê conteudo do arquivo
let arquivoPets = JSON.parse(petsJSON); // converte para formato JS
// console.log(arquivoPets.pets);
const atualizarJson = () => {
  let listaJson = JSON.stringify(arquivoPets, null, 2); // objeto pra converter, null para não minificar, 2 para numero de linhas - converte o objeto literal para JSON
  fs.writeFileSync(nomeArquivo, listaJson, 'utf-8'); // caminho arquivo, conteudo novo, formato
}
const listarPets = (listaDePets) => {
  for (let contador = 0; contador < listaDePets.length; contador++) {
    console.log(`${listaDePets[contador].nome}, ${listaDePets[contador].idade} anos, ${listaDePets[contador].tipo}, ${listaDePets[contador].raca}, ${(listaDePets[contador].vacinado) ? 'vacinado' : 'não vacinado'}`);
    for (let index = 0; index < listaDePets[contador].servicos.length; index++) {
        console.log(`${listaDePets[contador].servicos[index].data} - ${listaDePets[contador].servicos[index].nome}`);
    }
  }
};
const vacinarPet = (pet) => {
    if (!pet.vacinado) {
        pet.vacinado = true;
        atualizarJson();
        console.log(`${pet.nome} foi vacinado com sucesso!`);
    } else {
        console.log(`Ops, ${pet.nome} já está vacinado!`);
    }
} 
const campanhaVacina = (listaPets) => {
    let totalVacinados = 0;
    for (let i = 0; i < listaPets.length; i++) {
        if (!listaPets[i].vacinado) {
            listaPets[i].vacinado = true;
            totalVacinados++;
        }
    }
    atualizarJson();
    console.log(`Parabéns, ${totalVacinados} pets foram vacinados nessa campanha!`);
};
const adicionarPet = (infoPet) => {
    arquivoPets.pets.push(infoPet);
    atualizarJson();
    console.log(`${infoPet.nome} está cadastrado no nosso sistema!`);
}
// adicionarPet({
//   nome: 'Rex', 
//   idade: 1, 
//   raca: 'Maltes', 
//   tipo: 'cachorro', 
//   vacinado: false,
//   genero: 'M',
//   servicos: []
// }); 
const darBanhoPet = (pet) => {
    pet.servicos.push({
        nome: 'banho',
        data: moment().format('DD-MM-YYYY')
    });
    atualizarJson();
    console.log(`${pet.nome} está de banho tomado!`);
}
const tosarPet = pet => {
    pet.servicos.push({
        'nome':'tosa',
        'data': moment().format('DD-MM-YYYY')
    });
    atualizarJson();
    console.log(`${pet.nome} está com cabelinho na régua :)`);
};
const apararUnhasPet = pet => {
    pet.servicos.push({
        'nome':'corte de unhas',
        'data': moment().format('DD-MM-YYYY')
    });
    atualizarJson();
    console.log(`${pet.nome} está de unhas aparadas!`);
};

const buscarPet = (nomePet) =>{
    const petEncontrado = arquivoPets.pets.find((pet)=>{
        return pet.nome == nomePet;
    });
    console.log (petEncontrado ? petEncontrado :`Nenhum pet encontrado com esse nome: ${nomePet}`);
};

const atenderCliente = (pet, servico) => {
    console.log(`Olá ${pet.nome}!`);
    servico(pet);
    console.log('Até mais!');
};

const addInfoCastrado =()=>{
        arquivoPets = listaPets.map((pet)=>{// adicionar um novo atributo no pets.json 
        pet.castrado = true;
        return pet;
    });
    
    atualizarJson();
};

const listarVacinado = () =>{
    console.log(" ** VACINADO ** ");
       
    let vacinados = arquivoPets.pets.filter((pet)=>{
        return pet.vacinado;
    });
    console.log (vacinados)
    console.log(`Temos ${vacinados.length} pets vacinados!`);
}

listarVacinado();
//atenderCliente(arquivoPets.pets[0], darBanhoPet);
//atenderCliente(arquivoPets.pets[3], tosarPet);
//buscarPet('Batman');
//listarPets(arquivoPets.pets);
// vacinarPet(pets[0]);
// darBanhoPet(pets[4]);
// apararUnhasPet(pets[2]);
// tosarPet(pets[3]);
// campanhaVacina(pets);