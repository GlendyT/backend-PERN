import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *     schemas:
 *         Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 Pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availavility
 *                      example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *        summary: Get a list of products
 *        tags:
 *           - Products
 *        description: Return a list of products
 *        responses:
 *             200:
 *               description: Succcesful response
 *               content:
 *                     application/json:
 *                          schema:
 *                             type: array
 *                             items:
 *                                  $ref: "#/components/schemas/Product"
 */
//Routing
router.get("/", getProducts);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     description: Return a product based on its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema: 
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful Response
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad Request - Invalid ID
 */

router.get(
  "/:id",
  param("id").isInt().withMessage("ID No Valido"),
  handleInputErrors,
  getProductsById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *         - Products
 *      description: Returns a new record in the database
 */

router.post(
  "/",
  //VALIUDACION
  body("name")
    .notEmpty()
    .withMessage("El nombre del Producto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El nombre del Producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio No valido"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("ID No Valido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del Producto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El nombre del Producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio No valido"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID No Valido"),
  handleInputErrors,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID No Valido"),
  handleInputErrors,
  deleteProduct
);

export default router;
