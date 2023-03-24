const tokenGenerator = () => {
  // Gera um token aleatorio de letras e numeros com tamanho de 16 Characters
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let resultado = '';
  const SIXTEEN = 16;
  Array.from({ length: SIXTEEN }).forEach(() => {
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  });
  return resultado;
};

module.exports = tokenGenerator;