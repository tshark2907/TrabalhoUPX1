const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
  "label": "Dados Salvos",
  "host": "localhost",
  "user": "postgres",
  "port": 5432,
  "ssl": false,
  "database": "DadosSalvos",
  "password": "1234" // porta padrão do PostgreSQL
});

app.use(express.json());
app.use(cors());

app.post('/api/pesquisar', (req, res) => {
  const { value, dataType } = req.body;

  if (!value) {
    return res.status(400).json({ error: 'O valor da pesquisa é obrigatório.' });
  }

  const data = {
    type: dataType,
    information: value,
  };

  const dadosASeremPesquisados = JSON.stringify(data);

  const query = `
  SELECT
  'id' AS ${dataType},
  COUNT(*) FILTER (WHERE "id" LIKE '%' || ${value} || '%') AS results
FROM
  "DadosSalvos.public.dados"
UNION ALL
SELECT
  'cpf_cnpj' AS ${dataType},
  COUNT(*) FILTER (WHERE "cpf_cnpj" LIKE '%' || ${value} || '%') AS results
FROM
  "DadosSalvos.public.dados"
UNION ALL
SELECT
  'email' AS ${dataType},
  COUNT(*) FILTER (WHERE "email" LIKE '%' ||  ${value}  || '%') AS results
FROM
  "DadosSalvos.public.dados"
UNION ALL
SELECT
  'username' AS ${dataType},
  COUNT(*) FILTER (WHERE "username" LIKE '%' || ${value} || '%') AS results
FROM
  "DadosSalvos.public.dados"
UNION ALL
SELECT
  'phonenumber' AS ${dataType},
  COUNT(*) FILTER (WHERE "phonenumber" LIKE '%' || ${value} || '%') AS results
FROM
  "DadosSalvos.public.dados"
UNION ALL
SELECT
  'rg' AS ${dataType},
  COUNT(*) FILTER (WHERE "rg" LIKE '%' || ${value} || '%') AS results
FROM
  "DadosSalvos.public.dados"
UNION ALL
SELECT
  'url' AS ${dataType},
  COUNT(*) FILTER (WHERE "url" LIKE '%' || ${value} || '%') AS results
FROM
  "DadosSalvos.public.dados";
`;

  pool.query(query, [value, dataType])
    .then(result => {
      const rowCount = result.rows[0].results;
      if (rowCount > 0) {
        res.json({ results: rowCount });
      } else {
        res.status(404).json({
          results: rowCount,
          error: 'Nenhum resultado encontrado.' });
      }
    })
    .catch(error => {
      console.error('Erro ao consultar o banco de dados:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação.' });
    });
});

app.listen(3000, () => {
  console.log('API em execução na porta 3000');
});
