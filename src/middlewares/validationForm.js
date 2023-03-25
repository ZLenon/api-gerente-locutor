const validationForm = (request, response, next) => {
  const { email, password } = request.body;
  const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email === undefined) {
    return response.status(400)
    .json({ message: 'O campo "email" é obrigatório' });
  } if (!isEmail.test(email)) {
    return response.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    return response.status(400)
    .json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return response.status(400)
    .json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  return next();
};
module.exports = validationForm;