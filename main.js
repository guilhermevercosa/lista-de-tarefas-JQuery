// Função principal que executa quando o documento está pronto
$(document).ready(function() {
    carregarTarefas(); // Carrega as tarefas salvas

    // Mostra o formulário para adicionar tarefa ao clicar no botão "Adicionar"
    $('#botao-adicionar').click(function() {
        $('.container').slideDown();
    });

    // Esconde o formulário ao clicar no botão "Cancelar"
    $('#botao-cancelar').click(function() {
        $('.container').slideUp();
    });

    // Adiciona uma nova tarefa ao clicar no botão "Adicionar Tarefa"
    $('#botao-tarefa').on('click', function() {
        var tarefaText = $('#input-tarefa').val();
        if (tarefaText.length > 0) {
            addTarefa(tarefaText); // Adiciona a tarefa à lista
            salvarTarefas(); // Salva as tarefas no localStorage
        } else {
            alert('Escreva uma tarefa'); // Alerta se o campo estiver vazio
        }
        $('#input-tarefa').val(''); // Limpa o campo de entrada após adicionar
    });

    // Mostra a lista de tarefas ao clicar no botão "Tarefa"
    $('#botao-tarefa').click(function() {
        $('#lista-tarefa').slideDown();
    });

    // Função para adicionar uma tarefa à lista
    function addTarefa(text) {
        $('#lista-tarefa').append('<li>' + text + '<button id="botao-concluido">Concluída</button><button id="botao-apagar">Apagar</button></li>');
    }

    // Marca ou desmarca uma tarefa como concluída ao clicar nela
    $(document).on('click', 'li', function() {
        $(this).toggleClass('completed');
        salvarTarefas(); // Salva as alterações no localStorage
    });

    // Remove uma tarefa ao clicar no botão "Apagar"
    $(document).on('click', '#botao-apagar', function(e) {
        e.stopPropagation(); // Impede a propagação do evento para o elemento pai
        $(this).parent().fadeOut(500, function() {
            $(this).remove(); // Remove o elemento da lista após a animação
            salvarTarefas(); // Salva as alterações no localStorage
        });
    });

    // Salva as tarefas no localStorage
    function salvarTarefas() {
        var tarefas = $('#lista-tarefa').html();
        localStorage.setItem('tarefas', tarefas);
    }

    // Carrega as tarefas salvas do localStorage
    function carregarTarefas() {
        var tarefas = localStorage.getItem('tarefas');
        if (tarefas) {
            $('#lista-tarefa').html(tarefas); // Insere as tarefas na lista
        }
    }

    // Impede o comportamento padrão do formulário ao ser submetido
    $('.container').on('submit', function(e) {
        e.preventDefault();
    });
});