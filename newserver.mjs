import express from 'express';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import cors from 'cors';


const app = express();
const doc = new GoogleSpreadsheet('1a5OYgWSDOSjFEwNXa9MtCXngBPdoAJ8l8V4Xe_hDdtY');

app.use(express.json());
app.use(cors());

app.get('http://localhost:3000/resultado', async (req, res) => {
  const { value } = req.query;

  if (!value) {
    return res.status(400).json({ error: 'O valor da pesquisa é obrigatório.' });
  }

  try {
    // Autenticar com as credenciais do arquivo JSON da conta de serviço
    await doc.useServiceAccountAuth({
      client_email: 'thiago-projetos@upx1-cata-fraude.iam.gserviceaccount.com',
      private_key: '55e77b811acc6bb7bee6cfde02da2415c1564ad2',
    });

    // Carregar a planilha
    await doc.loadInfo();

    // Acessar a primeira aba da planilha
    const sheet = doc.sheetsByIndex[0];

    // Exemplo: realizar pesquisa na planilha
    const rows = await sheet.getRows();

    const filteredRows = rows.filter(row => {
      // Altere a lógica de filtro para usar o valor da pesquisa
      return Object.values(row).some(cellValue => cellValue.includes(value));
    });

    const rowCount = filteredRows.length;

    const resultadoPesquisa = rowCount > 0;

    res.json({ resultadoDaPesquisa: resultadoPesquisa });
  } catch (error) {
    console.error('Erro ao consultar a planilha:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação.' });
  }
});


const port = 3000; // Porta que o servidor irá escutar

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
