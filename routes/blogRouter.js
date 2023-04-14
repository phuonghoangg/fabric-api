const blogController = require('../controllers/blogController');
const router = require('express').Router();

router.post('/',blogController.addBlog)
router.post('/all-blog',blogController.getAllBlogPagin)
router.get('/',blogController.getAllBlog)
router.get('/:id',blogController.getAnBlog)
router.delete("/:id",blogController.deleteBlog)
router.put("/:id",blogController.updateBlog)

module.exports = router
