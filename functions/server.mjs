import express from 'express';
import { json } from 'express';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import cors from 'cors';

const app = express();

// Parâmetros de autenticação
require('dotenv').config(); // Carregar as variáveis de ambiente do arquivo .env

const email = process.env.email;
const apiKey = process.env.apiKey;
const spreadsheetId = process.env.spreadsheetId;


// Ler dados da planilha
async function readSpreadsheetData() {
  try {
    const doc = new GoogleSpreadsheet(spreadsheetId);

    // Autenticar usando a chave da API
    await doc.useApiKey(apiKey);

    // Carregar as informações da planilha
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Primeira planilha da lista

    // Ler os dados da planilha
    const rows = await sheet.getRows();

    console.log('Dados da planilha:');
    rows.forEach((row) => {
      console.log(row._rawData);
    });
  } catch (error) {
    console.error('Erro ao ler a planilha:', error.message);
  }
}

readSpreadsheetData();

app.use(json());
app.use(cors());

app.post('', async (req, res) => {

  try {
    console.log('API conectada. Carregando a planilha...');

    const doc = new GoogleSpreadsheet(spreadsheetId);

    // Autenticar usando a chave da API
    await doc.useApiKey(apiKey);

    // Carregar a planilha
    console.log('Carregando a planilha...');
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // Exemplo: realizar pesquisa na planilha
    console.log('Realizando a pesquisa na planilha...');
    const rows = await sheet.getRows();

    const filteredRows = rows.filter((row) => {
      // Altere a lógica de filtro para usar o dado @usuario na coluna usuarios
      return (
        row.usuarios && row.usuarios.toString().includes(req.body.conteudo)
      );
    });

    const rowCount = filteredRows.length;

    const resultadoPesquisa = rowCount > 0;

    console.log('Pesquisa concluída. Enviando a resposta...');
    res.json({ resultadoDaPesquisa: resultadoPesquisa });
  } catch (error) {
    console.log('Ocorreu um erro ao processar a solicitação.', error);
    res
      .status(500)
      .json({ error: 'Ocorreu um erro ao processar a solicitação.' });
  }
});
