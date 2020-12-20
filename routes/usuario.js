/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');
const router = routerx();


router.post('/login', usuarioController.login);
router.get('/test', (req, res) => {
    console.log('path /');
    res.send('path /api/usuario/test');
  });
router.post('/add', usuarioController.add);


module.exports = router;