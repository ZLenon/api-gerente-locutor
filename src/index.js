const express = require('express');
const { readFile, tokenGenerator, writeFile } = require('./utils');
const { 
  validationForm,
  validName,
  validToken,
  validAge,
  validTalk,
  validWatchedAt,
  validRate,
 } = require('./middlewares');

const app = express();
app.use(express.json());

const HTTP_ERROR_STATUS = 404;
const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// requisito 8
app.get('/talker/search', validToken, async (request, response) => {
  const queryPass = request.query.q;
  
  const talker = await readFile();
  const fiteredQ = talker.filter(({ name }) => name.includes(queryPass));
  
  if (!queryPass) return response.status(HTTP_OK_STATUS).json(talker);
 
  return response.status(HTTP_OK_STATUS).json(fiteredQ);
});

// Requisito 1
app.get('/talker', async (_request, response) => {
  const leitura = await readFile();
  if (leitura.length === 0) {
    return response.status(HTTP_OK_STATUS).json([]);
  }
  return response.status(HTTP_OK_STATUS).json(leitura);
});

// Requisito 2
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

// Requisito 3 e 4validationForm
app.post('/login', validationForm, async (_request, response) => {  
  const token = tokenGenerator();

  return response.status(HTTP_OK_STATUS).json({ token });
});

// Requisito 5
app.post('/talker',
  validName,
  validToken,
  validAge,
  validTalk,
  validWatchedAt,
  validRate, 

  async (request, response) => {
  const talker = await readFile();
  const objTalker = request.body;
  // inserindo o novo talker no obj talker somando o utimo id +1
  const newObjTalker = { id: talker.length + 1, ...objTalker };
  talker.push(newObjTalker);
  await writeFile(talker);
  
  return response.status(201).json(newObjTalker);
});

// Requisito 6
app.put('/talker/:id',
  validName,
  validToken,
  validAge,
  validTalk,
  validWatchedAt,
  validRate,

  async (request, response) => {
  const { id } = request.params;
  const bodyTalker = request.body;
  const talker = await readFile();
  const fiteredID = talker.find((tk) => tk.id === +id);
  if (!fiteredID) {
    return response.status(HTTP_ERROR_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  const index = talker.findIndex((tk) => tk.id === +id);
  const newObjTalker = { id: +id, ...bodyTalker };
  talker[index] = newObjTalker;
  await writeFile(talker);
  return response.status(HTTP_OK_STATUS).json(newObjTalker);
});

// Requisito 7
app.delete('/talker/:id', validToken, async (request, response) => {
  const { id } = request.params;
  const talker = await readFile();
  const fiteredID = talker.find((tk) => tk.id === +id);
  if (!fiteredID) {
    return response.status(HTTP_ERROR_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  // encontra atraves do ID todos que nao tem esse ID
  const talkersOBJ = talker.filter((tk) => tk.id !== +id);
  // sobrescreve o json anterio agora sem o talker ID informado
  await writeFile(talkersOBJ);
  return response.status(204).json();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
