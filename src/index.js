const express = require('express');
const readFile = require('./utils/fileRead');
// const talkers = require('./talker.json');

const app = express();
app.use(express.json());

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
  const { id } = request.params;
  const leitura = await readFile();
  const [talkerInfo] = leitura.filter((objInfo) => {
    if (objInfo.id == id) {
      return objInfo;
    }
  });  
  if (!talkerInfo) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });    
  }
  return response.status(200).json(talkerInfo);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
