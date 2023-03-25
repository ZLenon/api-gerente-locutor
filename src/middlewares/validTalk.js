const validTalk = (request, response, next) => {
  const { talk } = request.body;
  // verifica se o obj talk tem as respectivas chaves  'watchedAt' in talk || 'rate' in talk
  if (talk === undefined) {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
  }
  next();
};

module.exports = validTalk;