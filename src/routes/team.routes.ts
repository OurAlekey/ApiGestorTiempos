import { Router } from "express";
import {
  getTeams,
  getTeam,
  deleteTeam,
  updateTeam,
  createTeam,
} from "../controllers/teamController";
import validateToken from "./validate-token";

const router = Router();

/**
 * @swagger
 * /api/teams:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todos los equipos registrados
 *    tags: [Teams]
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de equipos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Team'
 *      404:
 *        description: No se encontraron equipos registrados
 */
router.get("/", validateToken, getTeams);

/**
 * @swagger
 * /api/teams/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna un equipo por ID
 *    tags: [Teams]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID Equipo
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro del equipo
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Team'
 *      404:
 *        description: Equipo no encontrado.
 */
router.get("/:id", validateToken, getTeam);

/**
 * @swagger
 * /api/teams/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Elimina un equipo por ID
 *    tags: [Teams]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID Equipo
 *    responses:
 *      200:
 *        description: Equipo eliminado
 *      404:
 *        description: Equipo no encontrado.
 */
router.delete("/:id", validateToken, deleteTeam);

/**
 * @swagger
 * /api/teams/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Actualiza un equipo por ID
 *    tags: [Teams]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID Equipo
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Team'
 *    responses:
 *      201:
 *        description: Equipo actualizado
 *      404:
 *        description: Equipo no encontrado.
 */
router.put("/:id", validateToken, updateTeam);

/**
 * @swagger
 * /api/teams:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Crea un equipo
 *    tags: [Teams]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Team'
 *    responses:
 *      201:
 *        description: Equipo creado
 *      404:
 *        description: Equipo no creado.
 */
router.post("/", validateToken, createTeam);

export default router;
