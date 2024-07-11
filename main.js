$(document).ready(function() {
    carregarTarefas();
    
    $('#botao-adicionar').click(function() {
        $('.container').slideDown();
    })

    $('#botao-cancelar').click(function() {
        $('.container').slideUp();
    })

    $('#botao-tarefa').on('click', function() {
        var tarefaText = $('#input-tarefa').val();
        if (tarefaText.length > 0) {
            addTarefa(tarefaText)
            salvarTarefas()
        } else {
            alert('Escreva uma tarefa')
        }
        $('#input-tarefa').val('');
    });

    $('#botao-tarefa').click(function() {
        $('#lista-tarefa').slideDown();
    })

    function addTarefa(text) {
        $('#lista-tarefa').append('<li>' + text + '<button id="botao-concluido">Concluida</button><button id="botao-apagar">Apagar</button></li>');
    }

    $(document).on('click', 'li', function() {
        $(this).toggleClass('completed');
        salvarTarefas()
    })

    $(document).on('click', '#botao-apagar', function(e) {
        e.stopPropagation();
        $(this).parent().fadeOut(500, function() {
            $(this).remove();
            salvarTarefas()
        });
    });

    function salvarTarefas() {
        var tarefas = $('#lista-tarefa').html();
        console.log(tarefas)
        localStorage.setItem('tarefas', tarefas);
    }

    function carregarTarefas() {
        var tarefas = localStorage.getItem('tarefas');
        console.log(tarefas)
        if (tarefas) {
            $('#lista-tarefa').html(tarefas);
        }
    }

    $('.container').on('submit', function(e) {
        console.log("submit");
        e.preventDefault();
    })
})