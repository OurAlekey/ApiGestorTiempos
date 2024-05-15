import { Router } from "express";
import {
  getCategories,
  deleteCategory,
  getCategory,
  updateCategory,
  createCategory,
} from "../controllers/categoryController";
import validateToken from "./validate-token";

const router = Router();

/**
 * @swagger
 * /api/categories:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las categorias registradas
 *    tags: [Categories]
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de categorias
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Category'
 *      404:
 *        description: No se encontraron categorias registradas
 */
router.get("/", validateToken, getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna una categoria por ID
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID Categoria
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de la categoria
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Category'
 *      404:
 *        description: Categoría no encontrada.
 */
router.get("/:id", validateToken, getCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Elimina una categoria por ID
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID Categoria
 *    responses:
 *      200:
 *        description: Se ha eliminado la categoria
 *      404:
 *        description: Categoría no encontrada.
 */
router.delete("/:id", validateToken, deleteCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Actualiza una categoria por ID
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID de la categoria
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *        description: Categoria actualizada
 *      404:
 *        description: Categoría no encontrada.
 */
router.put("/:id", validateToken, updateCategory);

/**
 * @swagger
 * /api/categories:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Crea una categoria
 *    tags: [Categories]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      201:
 *        description: Categoria creada
 */
router.post("/", validateToken, createCategory);

export default router;
