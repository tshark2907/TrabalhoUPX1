const radials = document.getElementsByName('group');
const inputContainer = document.getElementById('input_container');
let value = inputContainer.value;
const popup = document.getElementById('popup');
const janela = document.getElementById('popup_window');
const pesquisar = document.getElementById('search');
let dataType = ''
const sair = document.getElementById('popup_exit');

function loading(){
  popup.classList.remove('noResults');
  popup.classList.remove('resultsFound');
  popup.classList.add('loading');
  popup.style.display = 'block';

  let loadAnimation = document.createElement('span');
  loadAnimation.classList.add('material-symbols-outlined');
  loadAnimation.innerHTML = 'app_badging'
  loadAnimation.id = 'loading_wheel';
  janela.appendChild(loadAnimation)
}

sair.addEventListener('click', () => {
  popup.style.display = 'none';
})

pesquisar.addEventListener('click', () => {
  loading()
  if (value !== '') {
    let data = {
      type: dataType,
      information: value,
    };
    const dadosASeremPesquisados = JSON.stringify(data);

    const fetchAPI = () => {

      return new Promise((resolve, reject) => {

        fetch('Url_da_api', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: dadosASeremPesquisados
        })
          .then(response => response.json())
          .then(data => {

            if (data.results > 0) {
              popup.classList.add("NoResultsFound")
              resolve("Resultados não encontrados");
            }
             else if (data.results === 0) {
              popup.classList.add("ResultsFound")
              reject("Resultados encontrados");
            }
          })
          .catch(error => {
            console.error('Erro ao enviar dados para a API:', error);
          });
      });
    };

    fetchAPI()

      .then(() => {
        // A promessa foi resolvida
        console.log('Deu certo, existem resultados');
      })

      .catch(() => {
        // A promessa foi rejeitada
        console.log('Deu certo, sem resultados');
      });
  }
});

for (var i = 0; i < radials.length; i++) {
  radials[i].addEventListener('change', function() {
    inputContainer.innerHTML = '';

    if (this.checked) {
      var input = document.createElement('input');
      input.type = 'text';
      input.id = 'textbox';

      switch (this.value) {
        case 'option1':
          input.placeholder = 'Insira o CPF';
          dataType = 'cpf';
          break;

        case 'option2':
          input.type = 'number';
          input.placeholder = 'Insira o número de telefone';
          dataType = 'phone_number';
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

