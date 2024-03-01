function salvar() {
    var data = document.getElementById("data").value;
    var descricao = document.getElementById("descricao").value;
  
    // Verifica se os campos de entrada não são nulos e maiores ou iguais a 1
    if (
      !data ||
      !descricao 
    ) {
      alert(
        "Por favor, preencha todos os campos e insira valores maiores ou iguais a 1."
      );
      return;
    } else {
      // Cria o objeto compra
      var pendencia = {
        data: data,
        descricao: descricao,
      };
  
      var pendencias = JSON.parse(localStorage.getItem("pendencias")) || [];
      pendencias.push(pendencia);
      localStorage.setItem("pendencias", JSON.stringify(pendencias));
  
      renderizarLista();
    }
  }
  function renderizarLista() {
    limparFormulario();
    mostrarTabela();
    var lista = document.getElementById("lista");
    lista.innerHTML = "";
  
    var pendencias = JSON.parse(localStorage.getItem("pendencias")) || [];
    pendencias.forEach(function (pendencia, index) {
      var tr = document.createElement("tr");
      var td0 = document.createElement("td"); // Nova célula para a data de compra
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
  
      td0.textContent = `${formatarData(pendencia.data)}`; // Adiciona a data de compra à célula
      td1.textContent = `${pendencia.descricao}`;
      
      var botaoAlterar = document.createElement("button");
      botaoAlterar.textContent = "Alterar";
      botaoAlterar.id = `alterar${index}`; // Adiciona um id único ao botão
      botaoAlterar.onclick = function () {
        alterar(index);
      }; // Define a função a ser chamada quando o botão for clicado
      td2.appendChild(botaoAlterar);
  
      tr.appendChild(td0); // Adiciona a nova célula à linha
      tr.appendChild(td1);
      tr.appendChild(td2);
  
      lista.appendChild(tr);
    });
  }
  
  
  document.addEventListener("DOMContentLoaded", function () {
    renderizarLista();
  });
  
  function limparLocalStorage() {
    localStorage.removeItem("pendencias");
    renderizarLista();
  }
  function alterar(index) {
    var pendencias = JSON.parse(localStorage.getItem("pendencias")) || [];
    var pendencia = pendencias[index];
  
    // Preenche os campos do formulário com os dados da compra selecionada
    document.getElementById("data").value = pendencia.data;
    document.getElementById("descricao").value = pendencia.descricao;
  
    // Remove a compra do array de pendências
    pendencias.splice(index, 1);
  
    // Atualiza o localStorage com o novo array de pendências
    localStorage.setItem("pendencias", JSON.stringify(pendencias));
  
    // Renderiza a lista de compras atualizada
    // renderizarListaCompras();
  
    mostrarFormulario();
}

  function mostrarFormulario() {
    document.getElementById("formulario").style.display = "block";
    document.getElementById("tabela").style.display = "none";
  }
  
  function mostrarTabela() {
    document.getElementById("formulario").style.display = "none";
    document.getElementById("tabela").style.display = "block";
  }
  
  function limparFormulario() {
    var dataAtual = new Date();
    var dataAtualFormatada = dataAtual.toISOString().split("T")[0];
    document.getElementById("data").value = dataAtualFormatada;
    document.getElementById("descricao").value = "Descrição Ativo";
  }
  
  
  function formatarData(data) {
    // Converte a string da data para um objeto Date
    var dataObj = new Date(data);
  
    // Obtém os componentes da data
    var dia = dataObj.getDate().toString().padStart(2, "0"); // Adiciona um zero à esquerda, se necessário
    var mes = (dataObj.getMonth() + 1).toString().padStart(2, "0"); // Adiciona um zero à esquerda, se necessário
    var ano = dataObj.getFullYear();
  
    // Formata a data no formato "dia/mês/ano"
    var dataFormatada = `${dia}/${mes}/${ano}`;
  
    // Retorna a data formatada
    return dataFormatada;
  }
  
  mostrarTabela();
  
