const typeProductController = require('../controllers/typeProductController')
const router = require('express').Router()

router.post('/add-type',typeProductController.addType)
router.get('/',typeProductController.getAllType)
router.get('/:id',typeProductController.getAnType)

router.put("/:id",typeProductController.UpdateType)
router.delete("/:id",typeProductController.DeleteType)



module.exports = router