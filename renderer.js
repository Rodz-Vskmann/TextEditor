const fs = require('fs');
const { dialog } = require('@electron/remote/main').initialize();
''
function salvarTextoComo() {
    const conteudo = document.getElementById('editor').innerText;
    dialog.showSaveDialog({
        title: 'Salvar como',
        buttonLabel: 'Salvar',
        filters: [
            { name: 'Text Files', extensions: ['txt', 'doc'] }
        ]
    }).then(file => {
        if (!file.canceled && file.filePath) {
            fs.writeFile(file.filePath, conteudo, (err) => {
                if (err) {
                    alert('Erro ao salvar o arquivo: ' + err.message);
                } else {
                    alert('Arquivo salvo com sucesso!');
                }
            });
        }
    }).catch(err => {
        alert('Erro ao salvar o arquivo: ' + err.message);
    });
}

function alternarCorTexto(cor) {
    const selection = window.getSelection(); // Obter a seleção atual

    if (!selection.rangeCount || selection.isCollapsed) return; // Não fazer nada se não há seleção ou se ela é um ponto de inserção

    const range = selection.getRangeAt(0); // Obter o range da seleção
    const selectedText = range.toString(); // Obter o texto selecionado

    if (selectedText.length === 0) return; // Se não há texto selecionado, retorna

    const parentNode = range.startContainer.parentNode;
    // Verifica se o elemento selecionado já é um span com a cor especificada
    if (parentNode.tagName === "SPAN" && parentNode.style.color === cor) {
        // Desmarca o texto removendo o span e restaurando o texto
        const textNode = document.createTextNode(parentNode.innerText);
        parentNode.parentNode.replaceChild(textNode, parentNode);
        const newRange = document.createRange();
        newRange.selectNodeContents(textNode);
        selection.removeAllRanges();
        selection.addRange(newRange);
    } else {
        // Aplica a cor criando ou atualizando um span
        const documentFragment = range.extractContents(); // Extrair o conteúdo da seleção
        const span = document.createElement('span'); // Criar um novo elemento span
        span.style.color = cor; // Definir a cor do texto do span
        span.appendChild(documentFragment); // Adicionar o conteúdo extraído ao span
        range.insertNode(span); // Inserir o span no lugar original

        // Limpar a seleção para evitar múltiplas aplicações ao clicar repetidamente
        selection.removeAllRanges();
        const newRange = document.createRange(); // Criar um novo range
        newRange.selectNodeContents(span); // Selecionar o conteúdo do novo span
        selection.addRange(newRange); // Adicionar o novo range à seleção
    }
}


function alternarMarcaTexto() {
    const highlightColor = 'rgba(255, 255, 0, 0.5)'; // Cor do marca-texto
    const selection = window.getSelection(); // Obter a seleção atual

    if (!selection.rangeCount || selection.isCollapsed) return; // Não fazer nada se não há seleção ou se ela é um ponto de inserção

    const range = selection.getRangeAt(0); // Obter o range da seleção
    const selectedText = range.toString(); // Obter o texto selecionado

    if (selectedText.length === 0) return; // Se não há texto selecionado, retorna

    // Verifica se o elemento selecionado já é um span com a cor de destaque
    const parentNode = range.startContainer.parentNode;
    if (parentNode.tagName === "SPAN" && parentNode.style.backgroundColor === highlightColor) {
        // Desmarca o texto removendo o span e restaurando o texto
        const textNode = document.createTextNode(parentNode.innerText);
        parentNode.parentNode.replaceChild(textNode, parentNode);
        const newRange = document.createRange();
        newRange.selectNodeContents(textNode);
        selection.removeAllRanges();
        selection.addRange(newRange);
    } else {
        const documentFragment = range.extractContents(); // Extrair o conteúdo da seleção
        const span = document.createElement('span'); // Criar um novo elemento span
        span.style.backgroundColor = highlightColor; // Definir a cor de fundo do span
        span.appendChild(documentFragment); // Adicionar o conteúdo extraído ao span
        range.insertNode(span); // Inserir o span no lugar original

        // Limpar a seleção para evitar múltiplas marcações ao clicar repetidamente
        selection.removeAllRanges();
        const newRange = document.createRange(); // Criar um novo range
        newRange.selectNodeContents(span); // Selecionar o conteúdo do novo span
        selection.addRange(newRange); // Adicionar o novo range à seleção
    }
}
