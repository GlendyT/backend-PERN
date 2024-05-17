import { Router } from "express";
import { body } from "express-validator";
import { createProduct, getProducts } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

//Routing
router.get("/", getProducts);

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

router.put("/", (req, res) => {
  res.json("desde PUT");
});

router.patch("/", (req, res) => {
  res.json("desde PATCH");
});

router.delete("/", (req, res) => {
  res.json("desde DELETE");
});

export default router;
