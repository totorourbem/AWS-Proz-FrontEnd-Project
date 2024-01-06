// Forçar a captura do DOM

document.addEventListener("DOMContentLoaded", function() {
   
    // Botão de menu principal #menubtn in menu-button
    // Menu principal em burger-menu-open
    // Conteudo do site em content-menu-open
    // Botão de menu login #loginbtn in social-dock
    // Menu login em  em modal-login-close
    // Variáveis - captura de elementos

    const menubtn = document.querySelector('#menubtn');
    const mainmenu = document.querySelector('#burger-menu-open');
    const container = document.querySelector('#content-menu-open');
    const loginbtn = document.querySelector('#loginbtn');
    const loginmenu = document.querySelector('#modal-login-close');
    const closeloginbtn =document.querySelector('#close-modal')
    ;
    // Adicionar os 'event listener' para o botão de menu

    menubtn.addEventListener('click', () => {
        //Pega o id do menu e o fecha, coordenadamente com o menu
        if (mainmenu.id == 'burger-menu-open' && container.id == 'content-menu-open') {
            //Atribui novo valor
            mainmenu.id = 'burger-menu-closed';
            container.id = 'content-menu-closed';
        } else {
            // Atribui valor padrão
            mainmenu.id= 'burger-menu-open';
            container.id = 'content-menu-open';
        }
    });

    // Adiconar o listener par o icone de login

    loginbtn.addEventListener('click', () => {
        //Pega o id do menu e o abre a tela de login
        if (loginmenu.id == 'modal-login-close') {
            //Atribui novo valor
            loginmenu.id = 'modal-login-open';
        } 
    
    //pega o botão fechar do menu e volta à pagina
    
    closeloginbtn.addEventListener('click', () => {
        
        if (loginmenu.id = 'modal-login-open') {
            loginmenu.id = 'modal-login-close';
        }
    });
});
})