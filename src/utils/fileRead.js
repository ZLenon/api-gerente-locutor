const fs = require('fs').promises;
const path = require('path');

// caminho onde esta o arquivo com as informações da API
const talkers = path.resolve('src', 'talker.json');

const readFile = async () => {
  try { // decodifica o arquivo trazendo as iformaçoes de forma legivel
  const returnTalker = await fs.readFile(talkers, 'utf-8');
    return JSON.parse(returnTalker);
  } catch (error) {
    return error.message;
  }
};

const writeFile = async (newtalker) => {
  // transforma o arquivo js em string
  await fs.writeFile(talkers, JSON.stringify(newtalker, null, 2));

  return newtalker;
};

const filterSearchQ = (query, talkered) => {
  if (query) {
    const filteredQ = talkered.filter(({ name }) => name.toLowerCase()
      .includes(query.toLowerCase()));
    return filteredQ;
  }
};
const filterSearchRate = (rate, talkered) => {
  if (rate) {
    const filteredRate = talkered.filter(({ talk }) => talk.rate === +rate);
    return filteredRate;
  }
}; const filterSearchDATE = (date, talkered) => {
  if (date) {
    const filteredDate = talkered.filter(({ talk }) => talk.watchedAt === date);
    return filteredDate;
  }
};
module.exports = { readFile, writeFile, filterSearchQ, filterSearchRate, filterSearchDATE };