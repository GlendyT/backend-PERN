import { Request, Response } from "express";

import Product from "../models/Producto.model";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ["price", "DESC"]
            ],
            attributes: {exclude: ["createdAt", "updatedAt"]}
        })
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.json({ data: product });
    } catch (error) {
        console.log(error)
    }
};

/*  //VALIUDACION
  await check("name")
    .notEmpty()
    .withMessage("El nombre del Producto no puede ir vacio")
    .run(req);
  await check("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El nombre del Producto no puede ir vacio")
    .custom(value => value > 0).withMessage("Precio No valido")
    .run(req)

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }*/