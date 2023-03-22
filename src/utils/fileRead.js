const fs = require('fs').promises;
const path = require('path');

const talkers = path.resolve('src', 'talker.json');

const readFile = async () => {
  try {
  const returnTalker = await fs.readFile(talkers, 'utf-8');
    return JSON.parse(returnTalker);
  } catch (error) {
    return error.message;
  }
};

module.exports = readFile;