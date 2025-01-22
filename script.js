// Array para armazenar estudantes e notas
let students = [];

window.addEventListener("load", () => {
  // Se o Item students não existe no localStorage, cria um array vazio
  if(!localStorage.getItem("students"))  {
    localStorage.setItem("students", JSON.stringify([]))
    
    
    // Esses dados são armazenados prepositadamente para o professor testar partes do projeto que dependem dele
    //localStorage.setItem("students", JSON.stringify(
    //  [
    //    {
    //      name: "João Baptista",
    //      matricula: "20220456",
    //      grade: [10, 10, 10],
    //      status: "Aprovado"
    //    } , 
    //    
    //    {
    //      name: "Maria Joiana Mateus",
    //      matricula: "20210789",
    //      grade: [7, 7, 7],
    //      status: "Reprovado"
    //    } , 

    //    {
    //      name: "Pedro Joaquim",
    //      matricula: "789",
    //      grade: [8, 8, 8],
    //      status: "Recurso"
    //    }
    //  ])
    //)


    //
  }
  
  
    loadSavedGrades(); 
    preencherTabelaAlunos();
});

////
// Função para carregar dados salvos ao abrir a página
function loadSavedGrades() {
    const savedData = localStorage.getItem("students");
    if (savedData) {
        students = JSON.parse(savedData);
    }
}

// Função para atribuir notas aleatórias de 0 a 20
function assignGrades() {
    const name = document.getElementById("name").value;
    const matricula = document.getElementById("matricula").value;

    if (name && matricula) {
        const grade = Math.floor(Math.random() * 21); // Nota entre 0 e 20
        let   status = null

        if(grade < 7) status = "Reprovado"; 
        else if(grade >= 7 && grade < 10) status = "Recurso";
        else if(grade >= 10) status = "Aprovado";
            
        students.push({ name, matricula, grade, status });
        alert(`Nota atribuída a ${name} com sucesso!`);
        clearForm();
    } else {
        alert("Por favor, insira o nome e número de matrícula.");
    }
}

// Função para limpar o formulário
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("matricula").value = "";
}

// Função para salvar notas
function saveGrades() {
    localStorage.setItem("students", JSON.stringify(students));
    alert("Notas salvas com sucesso!");
}

// Função para exibir o popup com as notas dos estudantes
function viewGrades() {
    const resultList = document.getElementById("resultList").getElementsByTagName("tbody")[0];
    resultList.innerHTML = ""; // limpar lista

    if (students.length > 0) {
        var controler = 0;
        students.forEach((student) => {
            const listItem = document.createElement("tr");
            listItem.innerHTML = `
                <td> ${++controler} </td>
                <td> ${student.name} </td>
                <td> ${student.matricula} </td> 
                <td> ${((student.grades[0] + student.grades[1] + student.grades[2]) / 3).toFixed(2)} </td>
                <td> ${student.status} </td>
            `;
            resultList.appendChild(listItem);
        });
        document.getElementById("popup").style.display = "flex";
    } else {
        resultList.innerHTML = "<li>Nenhum dado disponível.</li>";
        document.getElementById("popup").style.display = "flex";
    }
}

// Função para fechar o popup
function closePopup() {
    document.getElementById("resultList").getElementsByTagName("tbody")[0].innerHTML = "";
    document.getElementById("popup").style.display = "none";
}

// Função para atualizar a hora
function updateCurrentTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();

    // Formatar a hora (HH:MM:SS)
    const formattedTime = now.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Exibir a hora no elemento
    timeElement.textContent = formattedTime;
}

// Atualizar a hora a cada segundo
setInterval(updateCurrentTime, 1000);

// Atualizar a hora imediatamente ao carregar a página
updateCurrentTime();


// Controlo da mundança de UI, para alterar os sides
var mudarLayout = document.getElementById("mudarLayout");
let mudarLayoutIcon = document.body.getElementsByClassName("mudar-layout-icon")[0];


mudarLayout.addEventListener("click", (event) => {
    console.log(event)
    let waveEffect = document.getElementById("wave-effect");
    let layout = event.target.offsetParent.dataset.layout;

    waveEffect.classList.toggle("right-left-layout")

    if (layout === "left-right") {
        mudarLayout.setAttribute("data-layout", "right-left")
        //waveEffect.classList.remove("right-left-layout")
         
    } else {
        mudarLayout.setAttribute("data-layout", "left-right")
        //waveEffect.classList.add("right-left-layout")
    }
})


// Controle de atribuição de notas 
const nameInput = document.getElementById("name");
const matriculaInput = document.getElementById("matricula");

// Função chamada quando ambos os campos não estão vazios
function atribuirNota() {
  
}

// Função para encontrar aluno a partir do número de matrícula
function encontrarAluno(matricula) {
  const aluno = students.find((student) => student.matricula === matricula);
  
  if (aluno) {
    document.getElementById("name").value = aluno.name;
    document.getElementById("matricula").value = aluno.matricula;
    document.getElementById("grade1").value = aluno.grades[0];
    document.getElementById("grade2").value = aluno.grades[1];
    document.getElementById("grade3").value = aluno.grades[2];
    document.getElementById("average").value = ((aluno.grades[0] + aluno.grades[1] + aluno.grades[2]) / 3) ; 
  } else {
    alert("Aluno não encontrado.");
  }
}


// Verifica os valores dos campos
function verificarCampos() {
    console.log("Verificação de campos")
    console.log(matriculaInput.value.trim())
  if (matriculaInput.value.trim().length == 8 && matriculaInput.value.trim() !== "") {
    
    let podeSerNumero = parseInt(matriculaInput.value.trim());
    console.log("Verificação concluida")
    encontrarAluno(matriculaInput.value.trim());
  }

  if(matriculaInput.value.trim() == "") {
    document.getElementById("name").value = ""
    document.getElementById("matricula").value = ""
    document.getElementById("grade1").value = ""
    document.getElementById("grade2").value = ""
    document.getElementById("grade3").value = ""
    document.getElementById("average").value = ""
  }
}

// Adiciona o evento change aos campos
//nameInput.addEventListener("change", verificarCampos);
matriculaInput.addEventListener("input", verificarCampos);

// Atribuição de nota e calculando media
const grade1Input = document.getElementById("grade1");
const grade2Input = document.getElementById("grade2");
const grade3Input = document.getElementById("grade3");
const averageInput = document.getElementById("average");

// Função para calcular a média
function calcularMedia() {
  const grade1 = parseFloat(grade1Input.value) || 0; // Converte para número, usa 0 se vazio
  const grade2 = parseFloat(grade2Input.value) || 0;
  const grade3 = parseFloat(grade3Input.value) || 0;
  const media = (grade1 + grade2 + grade3) / 3;
  // Atualiza o campo da média, limitando a 2 casas decimais
  averageInput.value = media.toFixed(2);
}

// Adiciona o evento de input para os campos de notas
grade1Input.addEventListener("input", calcularMedia);
grade2Input.addEventListener("input", calcularMedia);
grade3Input.addEventListener("input", calcularMedia);


// Função para capturar matrícula, notas e média
function capturarDados() {
    // Captura o número de matrícula
    const matricula = document.getElementById("matricula").value.trim();

    // Captura as notas
    const grade1 = parseFloat(document.getElementById("grade1").value) || 0;
    const grade2 = parseFloat(document.getElementById("grade2").value) || 0;
    const grade3 = parseFloat(document.getElementById("grade3").value) || 0;

    // Captura a média
    const media = parseFloat(document.getElementById("average").value) || 0;

    // Retorna os dados em um objeto
    return {
      matricula,
      notas: [grade1, grade2, grade3],
      media,
    };
}

// Exemplo de uso: capturar e exibir os dados no console
function exibirDados() {
  const dados = capturarDados();
  console.log("Dados capturados:", dados);
}



// Função para fechar o formulário
document.getElementById("fecharForm").addEventListener("click", function () {
    const form = document.getElementById("cadastramentoAluno");
    form.style.display = "none"; // Esconde o formulário
    console.log("Formulário fechado.");
});

// Função para guardar e capturar os dados de cadastramento
document.getElementById("guardarAluno").addEventListener("click", function () {
                debugger
  // Captura os valores dos campos
  const nome = document.getElementById("cadastramentoNome").value.trim();
  const matricula = document.getElementById("cadastramentoMatricula").value.trim();

  // Verifica se os campos estão preenchidos
  if (!nome || !matricula) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Exibe os dados no console (substitua isso pelo envio ao backend, se necessário)
  console.log("Aluno cadastrado:");
  console.log("Nome:", nome);
  console.log("Matrícula:", matricula);
  
  // Limpa os campos do formulário
  document.getElementById("cadastramentoNome").value = "";
  document.getElementById("cadastramentoMatricula").value = "";
  alert("Aluno cadastrado com sucesso!");

  persistirDadosDeCadastramento({name: nome, matricula: matricula});
});

// Recebe dados que estão sendo cadastrados e persiste-os no localStorage
function persistirDadosDeCadastramento(aluno) {
  
    // carregar os dados salvos no localStorage
    let alunos = JSON.parse(localStorage.getItem("students")) || [];
    aluno.grades = [0, 0, 0]
    aluno.status = "Reprovado"
    alunos.push(aluno);
    localStorage.setItem("students", JSON.stringify(alunos));
    loadSavedGrades();
}

// Armazena a matricula do aluno a ser atualizado
var aAtualizarMatricula = "";

// Função para capturar os dados de atualização e atualizar o aluno
document.getElementById("atualizarAluno").addEventListener("click", function () {
  const nome = document.getElementById("atualizacaoNome").value.trim();
  const matricula = document.getElementById("atualizacaoMatricula").value.trim();
  debugger
  if (!nome || !matricula) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  console.log("Aluno atualizado:");
  console.log("Nome:", nome);
  console.log("Matrícula:", matricula);
  
  document.getElementById("atualizacaoNome").value = "";
  document.getElementById("atualizacaoMatricula").value = "";
  alert("Aluno atualizado com sucesso!");
  
  atualizarAluno({name: nome, matricula: matricula});
})

// Função para persistir os dados de atualização do aluno
function atualizarAluno(aluno) {
  let alunos = JSON.parse(localStorage.getItem("students")) || [];
  const index = alunos.findIndex(aluno => aluno.matricula === aAtualizarMatricula);
  alunos[index].name = aluno.name;
  alunos[index].matricula = aluno.matricula;
  localStorage.setItem("students", JSON.stringify(alunos));
  loadSavedGrades();
}

// Função para atualizar nota de aluno
function atualizarNota() {
  debugger
  const matricula = document.getElementById("matricula").value;
  const grade1 = document.getElementById("grade1").value;
  const grade2 = document.getElementById("grade2").value;
  const grade3 = document.getElementById("grade3").value;
  const aluno = students.find(aluno => aluno.matricula === matricula);

  if (aluno) {
    const index = students.indexOf(aluno);
    aluno.grades[0] = parseFloat(grade1);
    aluno.grades[1] = parseFloat(grade2);
    aluno.grades[2] = parseFloat(grade3);

    let average = (aluno.grades[0] + aluno.grades[1] + aluno.grades[2]) / 3;
    
    if(average < 7) aluno.status = "Reprovado"; 
    else if(average >= 7 && average < 10) aluno.status = "Recurso";
    else if(average >= 10) aluno.status = "Aprovado";

    students[index] = aluno
    localStorage.setItem("students", JSON.stringify(students));
    alert("Nota atualizada com sucesso!");
  } else {
    alert("Aluno nao encontrado.");
  }
}


// Limpar dados
document.getElementById("limparDados").addEventListener("click", (event)=> {
    students = []
    localStorage.setItem("students", JSON.stringify([]))
    matriculaInput.value = ""
    matriculaInput.dispatchEvent(new Event("input"))
    preencherTabelaAlunos()
})



// Trabalhando com a listagem de alunos

// Função para preencher a tabela que lista os alunos
function preencherTabelaAlunos() {
  // Obtém a referência do corpo da tabela
  const tbody = document.querySelector('#tabelaAlunos tbody');

  // Esvazia a tabela
  tbody.innerHTML = '';

  // Preenche a tabela com os dados dos alunos
  students.forEach((student, index) => {
      // Cria uma nova linha
      const row = document.createElement('tr');

      // Preenche as colunas da linha
      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${student.name}</td>
          <td>${student.matricula}</td>
          <td class="buttons">
              <button class="btn-editar" onclick="editarAluno('${student.matricula}')">Editar</button>
              <button class="btn-excluir" onclick="excluirAluno('${student.matricula}')">Excluir</button>
          </td>
      `;

      // Adiciona a linha ao corpo da tabela
      tbody.appendChild(row);
  });
}


// Função para editar aluno
function editarAluno(matricula) {debugger
  aAtualizarMatricula = matricula
  // Localiza o aluno na lista de students pela matrícula
  const aluno = students.find(student => student.matricula === matricula);

  // Verifica se o aluno foi encontrado
  if (aluno) {
      // Obtém os campos de input
      const inputNome = document.querySelector('#atualizacaoNome');
      const inputMatricula = document.querySelector('#atualizacaoMatricula');

      // Preenche os valores dos inputs
      inputNome.value = aluno.name;
      inputMatricula.value = aluno.matricula;
      
      fecharContainer("#listaAlunos")
      abrirContainer("#atualizacaoAluno")
  } else {
      alert(`Aluno com matrícula ${matricula} não encontrado.`);
  }
}

// Função para excluir aluno
function excluirAluno(matricula) {debugger
  // Encontra o índice do aluno pela matrícula
  const index = students.findIndex(student => student.matricula === matricula);

  // Verifica se o aluno existe
  if (index !== -1) {
      // Alerta para confirmar a exclusão
      if (confirm(`Deseja excluir o aluno com matrícula ${matricula}?`)) {
          alert(`Aluno com matrícula ${matricula} foi excluído com sucesso!`);
          // Remove o aluno do array
          students.splice(index, 1);
          persistirDados();
      
          // Atualiza a tabela após a exclusão
          preencherTabelaAlunos();
      } else {
          alert(`Exclusão de aluno com matrícula ${matricula} foi cancelada.`);
      }
  } else {
      console.error(`Aluno com matrícula ${matricula} não encontrado para exclusão.`);
  }
}



// Função para ver lista de alunos
document.getElementById("verListaAlunos").addEventListener("click", () => {
  console.log("Ver lista de alunos")
  abrirContainer("#listaAlunos")
  fecharContainer("#cadastramentoAluno")
  preencherTabelaAlunos();
})


document.getElementById("cadastrarAluno").addEventListener("click", (event) => {
  console.log("Cadastrar aluno")
  abrirContainer("#cadastramentoAluno")
  fecharContainer("#listaAlunos")
})



function fecharContainer(container) {
  document.querySelector(container).style.display = "none";
}

function abrirContainer(container) {
  document.querySelector(container).style.display = "block";
}


// Persistir mudanças completas no localStorage
function persistirDados() {
  localStorage.setItem("students", JSON.stringify(students));
}

function cancelarAtualizacaoAluno() {
  aAtualizarMatricula = ''
  document.querySelector("#atualizacaoMatricula").value = ''
  document.querySelector("#atualizacaoNome").value = ''
  fecharContainer('#atualizacaoAluno')
}