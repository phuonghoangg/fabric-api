const productController = require('../controllers/productController');
const router = require('express').Router();



router.post('/add-product',productController.addProduct)
router.post('/all-product',productController.allProductPagi)
router.get('/',productController.getAllProduct)
router.get('/:id',productController.getAnProduct)
router.delete("/:id",productController.deleteProduct)
router.put("/:id",productController.updateProduct)

module.exports  = router
