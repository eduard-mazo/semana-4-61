const jwt = require('jsonwebtoken');
const models = require('../models');

async function checkToken(token) {
  let __id = null;
  try {
    const { id } = await jwt.decode(token);
    __id = id;
  } catch (e) {
    return false;
  }
  const user = await models.Usuario.findOne({ where: { id: __id, estado: 1 } });
  if (user) {
    const accessToken = jwt.sign({ id: __id }, 'secretKeyToGenerateToken', { expiresIn: '1d' });
    return { token: accessToken, rol: user.rol };
  }
  return false;
}

module.exports = {
  // generar el token
  encode: async (_id, rol) => {
    const token = jwt.sign({ id: _id, rol }, 'secretKeyToGenerateToken', { expiresIn: '1d' });
    return token;
  },
  // permite decodificar el token
  decode: async (token) => {
    try {
      const { id } = await jwt.verify(token, 'secretKeyToGenerateToken');
      const user = await models.Usuario.findOne({ where: { id } });
      if (user) {
        return user;
      }
      return false;
    } catch (e) {
      const newToken = await checkToken(token);
      return newToken;
    }
  },
};
