const router = require("express").Router();
const { loginController } = require('../controllers/loginController.js')
const { registerController } = require('../controllers/registerController.js');
const adminTypeContoller = require('../controllers/01.adminTypeController');
const adminController = require('../controllers/02.adminController');
const userController = require('../controllers/03.userController');
const productCategoryController = require('../controllers/04.productCategoryController');
const discountController = require('../controllers/05.discountController');
const inventoryController = require('../controllers/06.inventoryController');
const productController = require('../controllers/07.productConroller');
const sepetController = require('../controllers/08.sepetController');
const imagesController = require('../controllers/09.imagesController');

const multer  = require('multer');
const upload = multer();

router.post("/login", loginController);
router.post("/register", registerController);


/* admin type crud operations */
router.get("/admin/type",        adminTypeContoller.getAll);
router.get("/admin/type/:id",    adminTypeContoller.getById);
router.put("/admin/type",        adminTypeContoller.update);
router.post("/admin/type",       adminTypeContoller.create);
router.delete("/admin/type",     adminTypeContoller.delete);


/* admin crud operations */
router.get("/admin",           adminController.getAll);
router.get("/admin/:id",       adminController.getById);
router.put("/admin",           adminController.update);
router.post("/admin",          adminController.create);
router.delete("/admin",        adminController.delete);


/* user crud operations */
router.get("/user",           userController.getAll);
router.get("/user/:id",       userController.getById);
router.put("/user",           userController.update);
router.post("/user",          userController.create);
router.delete("/user",        userController.delete);


/* product category crud operations */
router.get("/product/category",           productCategoryController.getAll);
router.get("/product/category/detailed",  productCategoryController.getAllDetailed);
router.get("/product/category/:id",       productCategoryController.getById);
router.put("/product/category",           productCategoryController.update);
router.post("/product/category",          productCategoryController.create);
router.delete("/product/category",        productCategoryController.delete);


/* discount  crud operations */
router.get("/discount",           discountController.getAll);
router.get("/discount/:id",       discountController.getById);
router.put("/discount",           discountController.update);
router.post("/discount",          discountController.create);
router.delete("/discount",        discountController.delete);


/* product inventory crud operations */
router.get("/product/inventory",           inventoryController.getAll);
router.get("/product/inventory/:id",       inventoryController.getById);
router.put("/product/inventory",           inventoryController.update);
router.post("/product/inventory",          inventoryController.create);
router.delete("/product/inventory",        inventoryController.delete);


/* product crud operations */
router.get("/product",                    productController.getAll);
router.put("/product",                    productController.update);
router.post("/product",                   productController.create);
router.delete("/product",                 productController.delete);
router.get("/product/:id",                productController.getById);
router.get("/product/categoryid/:id",     productController.getByCategoryId);
router.get("/product/categorypath/:path", productController.getByCategoryPath);
/*product search with elastic*/
router.get("/products",                   productController.elasticSearchGetAll);
router.post("/products",                  productController.elasticSearch);


/* sepet crud operations */
router.get("/sepets",           sepetController.getAll);
router.post("/sepet",          sepetController.create);
router.delete("/sepet",        sepetController.delete);
router.post("/sepet/all",       sepetController.getById);


router.get("/images",           imagesController.getAll);
router.get("/images/:id",       imagesController.getById);
router.post("/images", upload.array('images', 12), imagesController.create);
router.delete("/images",        imagesController.delete);
router.post("/images/:id",      imagesController.getByProductId);
router.delete("/images",        imagesController.deleteProductImages);

module.exports = router