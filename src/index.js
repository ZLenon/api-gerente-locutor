const express = require('express');
const readFile = require('./utils/fileRead');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/talker', async (request, response) => {
  const leitura = await readFile();
  if (leitura.length === 0) {
    return response.status(HTTP_OK_STATUS).json([]);
  }
  return response.status(HTTP_OK_STATUS).json(leitura);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
