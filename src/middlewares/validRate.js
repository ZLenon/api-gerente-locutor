const validRate = (request, response, next) => {
  const { talk: { rate } } = request.body;

  if (rate === undefined) {
    return response.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  } if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return response.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  return next();
};

const validRateQuery = (request, response, next) => {
  const { rate } = request.query;
  if (!rate) {
    return next();
  }
  if (!Number.isInteger(+rate) || +rate < 1 || +rate > 5) {
    return response.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  return next();
};
const validPatchRate = (request, response, next) => {
  const { rate } = request.body;

  if (rate === undefined) {
    return response.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  } if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return response.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  return next();
};
module.exports = { validRate, validRateQuery, validPatchRate };