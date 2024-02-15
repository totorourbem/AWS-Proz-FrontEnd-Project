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


// Função para criar e renderizar os cartões dos colaboradores
  function renderizarCartoes(colaboradores) {
    const gridCartoes = document.getElementById('grid-cards');
    gridCartoes.innerHTML = ''; // Limpar o conteúdo anterior

    colaboradores.forEach(colaborador => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.width = '48%';

      card.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${colaborador.avatar}" class="card-img-top" alt="Avatar" style="height: 100%;">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h6 class="card-name"><strong>Nome:</strong> <i><em>${colaborador.nome}</em></i> </h6>
              <p class="card-especialidade"><b><strong>Especialidade:</strong></b> <i><em>${colaborador.especialidade}</em></i> </p>
              <p class="card-email"><b><strong>Email:</strong></b> <i><em>${colaborador.email}</em></i></p>
              <p class="card-fone"><b><strong>Telefone:</strong></b> <i><em>${colaborador.fone}</em></i></p>
              <p class="card-media"><b><strong>Nota Média:</strong></b> <i><em>${colaborador.nota_media}</em></i></p>
            </div>
          </div>
        </div>
      `;
      gridCartoes.appendChild(card);
    });
  }

  // Obtém os elementos do DOM
  const especialidadeSelect = document.getElementById('especialidade');
  const ordenarSelect = document.getElementById('ordenar');

  // Event listener para atualizar os cartões quando o usuário alterar os filtros
  especialidadeSelect.addEventListener('change', atualizarCartoes);
  ordenarSelect.addEventListener('change', atualizarCartoes);

  // Função para atualizar os cartões com base nos filtros selecionados
  function atualizarCartoes() {
    const especialidadeSelecionada = especialidadeSelect.value;
    const ordenarPor = ordenarSelect.value;

    // Filtrar colaboradores com base na especialidade selecionada
    let colaboradoresFiltrados = dados.filter(colaborador => colaborador.especialidade === especialidadeSelecionada);

    // Ordenar colaboradores com base na nota média
    if (ordenarPor === 'ascendente') {
      colaboradoresFiltrados.sort((a, b) => parseFloat(a.nota_media) - parseFloat(b.nota_media));
    } else {
      colaboradoresFiltrados.sort((a, b) => parseFloat(b.nota_media) - parseFloat(a.nota_media));
    }

    // Renderizar os cartões dos colaboradores filtrados e ordenados
    renderizarCartoes(colaboradoresFiltrados);
  }

  // Chamada inicial para renderizar os cartões com os dados iniciais
  atualizarCartoes();

