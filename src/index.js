const express = require('express');
const { readFile, tokenGenerator } = require('./utils');
const valiData = require('./middlewares');

const app = express();
app.use(express.json());

const HTTP_ERROR_STATUS = 404;
const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/talker', async (_request, response) => {
  const leitura = await readFile();
  if (leitura.length === 0) {
    return response.status(HTTP_OK_STATUS).json([]);
  }
  return response.status(HTTP_OK_STATUS).json(leitura);
});

app.get('/talker/:id', async (request, response) => {
  // Esse id é um string a principio, deve transformar em number
  const { id } = request.params;
  const leitura = await readFile();
  const [talkerInfo] = leitura.filter((objInfo) => objInfo.id === +id);
  // Se a pessoa usuaria nao existir, retorna msg de erro  
  if (!talkerInfo) {
    return response.status(HTTP_ERROR_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' });    
  }
  return response.status(HTTP_OK_STATUS).json(talkerInfo);
});

app.post('/login', valiData, async (request, response) => {  
  const token = tokenGenerator();

  return response.status(HTTP_OK_STATUS).json({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
