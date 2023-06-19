const express = require('express');
const app = express();
const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dados',
  password: '1234',
  port: 5432, // porta padrão do PostgreSQL
});

app.use(express.json());

app.post('/api/pesquisar', (req, res) => {
  const { value, dataType } = req.body;

  if (!value) {
    return res.status(400).json({ error: 'O valor da pesquisa é obrigatório.' });
  }

  const data = {
    type: dataType,
    information: value,
  };

  dadosASeremPesquisados = JSON.stringify(data);

  const query = `
  SELECT COUNT(*) as results
  FROM DadosSalvos
  WHERE informacao = '${value}' AND tipo = '${dataType}',
  `;

  pool.query(query, [value])
    .then(result => {
      const rowCount = result.rows[0].results;
      if (rowCount > 0) {
        res.json({ results: rowCount });
      } else {
        res.status(404).json({ error: 'Nenhum resultado encontrado.' });
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
