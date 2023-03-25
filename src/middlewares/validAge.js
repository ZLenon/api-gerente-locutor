const validAge = (request, response, next) => {
  const { age } = request.body;
  if (age === undefined) {
    return response.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (!Number.isInteger(age) || +age < 18) {
    return response.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  return next();
};

module.exports = validAge;