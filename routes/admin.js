const express = require('express');
const router = express.Router();

const productsController =  require('../controllers/products');
const accessController =  require('../controllers/access');



router.get('/login', accessController.getLogin);
router.post('/login', accessController.postLogin);

router.post('/upload', productsController.postUploadGame);
router.post('/uploadicon', productsController.postUploadGameIcon);
router.post('/newGame', productsController.postNewGame);
router.post('/ludoclubhost', productsController.postLudoClubHost);


module.exports = router;