// Setar dados e asfuncao de atualizar cartões como global

let dados = [];

function atualizarCartoes() {
    // Verifique se os dados foram carregados
    if (dados.length === 0) {
        console.error('Os dados ainda não foram carregados.');
        return;
    }
    // Limpe o contêiner de cartões
    let container = document.getElementById('grid-cards');
    container.innerHTML = '';

    // Filtre os dados com base nas seleções do usuário
    let filtroEspecialidade = document.getElementById('especialidade').value;
    let filtroOrdem = document.getElementById('ordenar').value === 'descendente' ? 'desc' : 'asc';
    let dadosFiltrados = dados.filter(item => item.especialidade === filtroEspecialidade);
    dadosFiltrados.sort((a, b) => filtroOrdem === 'desc' ? b.nota_media - a.nota_media : a.nota_media - b.nota_media);

    // Crie novos cartões para cada item filtrado
    dadosFiltrados.forEach(item => {
        let cartao = document.createElement('div');
        cartao.className = 'card';

        let avatar = document.createElement('span');
        avatar.className = 'card-avatar';
        avatar.id = 'card-avatar-no-' + item.prestador_id;
        avatar.innerHTML = '<img src="' + item.avatar + '" alt="Avatar do colaborador" height="75%" width="75%">';
        cartão.appendChild(avatar);

        let info = document.createElement('span');
        info.className = 'card-info';
        info.id = 'card-info-no-' + item.prestador_id;
        info.innerHTML = `
            <p><b>Nome:</b> ${item.nome}</p> 
            <p><b>Especialidade:</b> ${item.especialidade}</p>
            <p><b>Fone:</b> ${item.fone}</p>
            <p><b>Media:</b> ${item.nota_media}</p>
        `;
        cartao.appendChild(info);

        container.appendChild(cartao);
    });
}

// Forçar a captura do DOM

document.addEventListener("DOMContentLoaded", function() {
    //Usar fetch para convertert o CSV em strings
    fetch('./Database/prestador_age_no_embarked.csv')
        //then - response é o metodo quer aguarda a resposta de fetch
        .then(response => {
            //if para tratativas em caso de erros
            if (!response.ok) {
                throw new Error('Erro ao buscar o arquivo CSV');
            }
            // response.text() converte o CSV em string
            return response.text();
         })
        //Aqui, then está processando a string 
        .then(data => {
            // Divida a string em linhas
            let linhas = data.split('\n');

            // Divida a primeira linha em cabeçalhos
            let cabecalhos = linhas[0].split(',');

            // Mapeie cada linha restante para um objeto JavaScript
            dados = linhas.slice(1).map(linha => {
                let valores = linha.split(',');
                let obj = {};
                cabecalhos.forEach((cabecalho, indice) => {
                    obj[cabecalho] = valores[indice];
                });
                return obj;
            });
            // Imprime a array pra conferencia
            console.log(dados);

            // Agora que os dados foram carregados, atualizar os cartões
            atualizarCartoes();
        })
    //tratativa de erro da função fetch    
    .catch(error => {
        console.error('Um erro ocorreu:', error);
    });

    // Adicione um event listener aos seletores
    document.getElementById('especialidade').addEventListener('change', atualizarCartoes);
    document.getElementById('ordenar').addEventListener('change', atualizarCartoes);


}) 