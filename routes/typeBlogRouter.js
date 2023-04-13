const typeBlogController = require('../controllers/typeBlogController')
const router = require('express').Router()

router.post('/',typeBlogController.addType)
router.get('/',typeBlogController.getAllType)
router.get('/:id',typeBlogController.getAnType)

router.put("/:id",typeBlogController.UpdateType)
router.delete("/:id",typeBlogController.DeleteType)

module.exports = router