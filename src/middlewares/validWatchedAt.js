const validWatchedAt = (request, response, next) => {
  const { talk: { watchedAt } } = request.body;
  if (watchedAt === undefined) {
    return response.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  const watchedAtREGEX = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAtREGEX.test(watchedAt)) {
    return response.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  return next();
};

module.exports = validWatchedAt;