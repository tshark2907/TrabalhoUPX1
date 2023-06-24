const radials = document.getElementsByName('group');
const inputContainer = document.getElementById('input_container');
const popup = document.getElementById('popup');
const janela = document.getElementById('popup_window');
const pesquisar = document.getElementById('search');
const caixaDeTexto = document.getElementById('textbox');
let dataType = '';
const sair = document.getElementById('popup_exit');
const disclaimer = document.getElementById('popup_disclaimer');
const iAgree = document.getElementById('exit_disclaimer')

function loading(){
  janela.classList.remove('noResults');
  janela.classList.remove('resultsFound');
  janela.classList.add('loading');
  popup.style.display = 'block';

  const existingElement = document.getElementById('loading_wheel');
  const loadAnimation = document.createElement('span');
  loadAnimation.classList.add('material-symbols-outlined');
  loadAnimation.innerHTML = 'progress_activity';
  loadAnimation.id = 'loading_wheel';
  janela.appendChild(loadAnimation);

  let rotationAngle = 0;

  function rotateLoadingIcon(){
  rotationAngle += 1;
  loadAnimation.style.transform = `rotate(${rotationAngle}deg) scale(5)`;
    }
  setInterval(rotateLoadingIcon,10);
  }


function resultsFound(){
  janela.querySelector('#loading_wheel').remove();
  janela.classList.remove('noResults');
  janela.classList.remove('loading');
  janela.classList.add('resultsFound');
  popup.style.display = 'block';

  let alerta = document.createElement('span');
  alerta.classList.add('material-symbols-outlined');
  alerta.innerHTML = 'warning';
  alerta.id = 'alerta';

  let alertaTitle = document.createElement('h2');
  alertaTitle.classList.add('alerta_titulo');
  alertaTitle.innerHTML = "Alerta!";

  let alertaText = document.createElement('span');
  alertaText.classList.add('alerta_texto');
  alertaText.innerHTML = `O dado inserido foi encontrado no banco de dados como suspeito de 
  fraudes, é recomendado não prosseguir com transações utilizando este dado. No caso de 
  duvidas, entre em contato com a Polícia Civil.`;

  janela.appendChild(alertaText);
  janela.appendChild(alertaTitle);
  janela.appendChild(alerta);
}

function noResults(){
  janela.querySelector('#loading_wheel').remove();
  janela.classList.remove('resultsFound');
  janela.classList.remove('loading');
  janela.classList.add('noResults');
  popup.style.display = 'block';

  let confirmar = document.createElement('span');
  confirmar.classList.add('material-symbols-outlined');
  confirmar.innerHTML = 'task_alt';
  confirmar.id = 'check';

  let confirmarTitle = document.createElement('h2');
  confirmarTitle.classList.add('check_titulo');
  confirmarTitle.innerHTML = "Confirmado!";

  let confirmarText = document.createElement('span');
  confirmarText.classList.add('check_texto');
  confirmarText.innerHTML = `O dado inserido não foi encontrado no banco de dados.`;

  janela.appendChild(confirmar);
  janela.appendChild(confirmarTitle);
  janela.appendChild(confirmarText);
}

iAgree.addEventListener('click', () => {
  disclaimer.style.display = 'none';
})
sair.addEventListener('click', () => {
  const elementsToRemove = janela.querySelectorAll('.alerta_texto, .alerta_titulo, .check_texto, .check_titulo, #alerta, #check');
  elementsToRemove.forEach(element => {
    janela.removeChild(element);
  });

  janela.classList.remove('resultsFound');
  janela.classList.remove('noResults');
  popup.style.display = 'none';
});


pesquisar.addEventListener('click', () => {
  loading();

  let conteudo = input.value;

  if (caixaDeTexto !== '') {
      if(conteudo === '@usuario'){
      setTimeout(resultsFound,5000)
        }else{
          setTimeout(noResults,5000)
        }
      }
    })

let input;

for (var i = 0; i < radials.length; i++) {
  radials[i].addEventListener('change', function() {
    inputContainer.innerHTML = '';

    if (this.checked) {
      input = document.createElement('input');
      input.type = 'text';
      input.id = 'textbox';
      pesquisar.style.display = 'inline-block'

      switch (this.value) {
        case 'option1':
          input.placeholder = 'Insira o CPF';
          dataType = 'cpf_cnpj';
          break;

        case 'option2':
          input.type = 'number';
          input.placeholder = 'Insira o número de telefone';
          dataType = 'phonenumber';
          break;

        case 'option3':
          input.type = 'number';
          input.placeholder = 'Insira o número do RG';
          dataType = 'rg';
          break;

        case 'option4':
          input.type = 'email';
          input.placeholder = 'Insira o Email';
          dataType = 'email';
          break;

        case 'option5':
          input.type = 'url';
          input.placeholder = 'Insira o Site em questão';
          dataType = 'url';
          break;

        case 'option6':
          input.placeholder = 'Insira o nome de usuário (@exemplo)';
          dataType = 'username';
          break;
          
        default:
          break;
      }
      inputContainer.appendChild(input);
    }
  });
}