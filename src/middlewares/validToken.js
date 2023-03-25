const validToken = (request, response, next) => {
  const { authorization: token } = request.headers;
  const SIXTEEN = 16;
  if (token === undefined) {
    return response.status(401).json({
      message: 'Token não encontrado',
    });
  }  
  const tokenValid = token.length !== SIXTEEN;
  if (tokenValid) {
    return response.status(401).json({
      message: 'Token inválido',
    });
  }
  return next();
};

module.exports = validToken;
