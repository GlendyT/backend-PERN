import { Request, Response } from "express";

import Product from "../models/Producto.model";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [["price", "DESC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json({ data: products });
};

export const getProductsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Producto No Encontrado",
    });
  }

  res.json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Producto No Encontrado",
    });
  }
  //ACTUALIZAR
  await product.update(req.body);
  await product.save();
  res.json({ data: product });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Producto No Encontrado",
    });
  }
  //ACTUALIZAR
  product.availability = !product.dataValues.availability;
  await product.save();

  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Producto No Encontrado",
    });
  }
  await product.destroy();
  res.json({ data: "Producto Eliminado" });
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
