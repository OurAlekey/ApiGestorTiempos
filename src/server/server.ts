import express, { Application, Request, Response } from "express";
import userRoutes from "../routes/user.routes";
import categoryRoutes from "../routes/category.routes";
import competitorRoutes from "../routes/competitor.routes";
import eventRoutes from "../routes/event.routes";
import timeRoutes from "../routes/time.routes";
import checkPointRoutes from "../routes/checkPoint.routes";
import teamRoutes from "../routes/team.routes";
import db from "../db/connection";
import Category from "../models/category";
import Competitor from "../models/competitor";
import Event from "../models/event";
import Team from "../models/team";
import Time from "../models/time";
import User from "../models/user";
import CheckPoint from "../models/check-point";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger";
import cors from "cors";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.listen();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }

  routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ msg: "API Working" });
    });
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/categories", categoryRoutes);
    this.app.use("/api/teams", teamRoutes);
    this.app.use("/api/times", timeRoutes);
    this.app.use("/api/competitors", competitorRoutes);
    this.app.use("/api/events", eventRoutes);
    this.app.use("/api/checkpoints", checkPointRoutes);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  middlewares() {
    this.app.use(express.json());

    // Configuración de CORS
    this.app.use(
      cors({
        origin: "*", // Permitir solicitudes desde cualquier origen
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos HTTP permitidos
        allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
      })
    );
  }

  async dbConnect() {
    try {
      await db.authenticate();
      await Category.sync({ alter: true });
      await Competitor.sync({ alter: true });
      await Event.sync({ alter: true });
      await Team.sync({ alter: true });
      await Time.sync({ alter: true });
      await User.sync({ alter: true });
      await CheckPoint.sync({ alter: true });

      console.log("Database connected!");
    } catch (error) {
      console.log("Error connecting to database: ", error);
    }
  }
}

export default Server;

//Swagger documentation
/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  security:
 *  - bearerAuth: []
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id_user:
 *          type: integer
 *          description: Autoincremental por defecto
 *        nombre:
 *          type: string
 *          description: Nombre del usuario
 *        contrasena:
 *          type: Number
 *          description: Correo del usuario
 *        correo:
 *          type: integer
 *          description: Contraseña del usuario
 *      required:
 *        - id_user
 *        - nombre
 *        - contrasena
 *        - correo
 *      example:
 *        id_user: 1
 *        nombre: Juan Pérez
 *        correo: juan@correo.com
 *        contrasena: "123456"
 *    Login:
 *      type: object
 *      properties:
 *        correo:
 *          type: string
 *          description: Correo del usuario
 *        contrasena:
 *          type: string
 *          description: Contraseña del usuario
 *      required:
 *        - correo
 *        - contrasena
 *      example:
 *        correo: admin@admin.com
 *        contrasena: "admin"
 *    Category:
 *      type: object
 *      properties:
 *        id_categoria:
 *          type: integer
 *          description: Autoincremental por defecto
 *        nombre:
 *          type: string
 *          description: Nombre de la categoría
 *      required:
 *        - id_categoria
 *        - nombre
 *      example:
 *        nombre: Montaña
 *    Team:
 *      type: object
 *      properties:
 *        id_equipo:
 *          type: integer
 *          description: Autoincremental por defecto
 *        nombre:
 *          type: string
 *          description: Nombre del equipo
 *      required:
 *        - id_equipo
 *        - nombre
 *      example:
 *        id_equipo: 1
 *        nombre: "Los campeones"
 *    Competitor:
 *      type: object
 *      properties:
 *        id_participante:
 *          type: integer
 *          description: Autoincremental por defecto
 *        nombre:
 *          type: string
 *          description: Nombre del competidor
 *        numero_competido:
 *          type: integer
 *          description: Número de participante
 *        equipo_id:
 *          type: integer
 *          description: Equipo al que pertenece el competidor
 *        evento_id:
 *          type: integer
 *          description: Evento al que pertenece el competidor
 *        categoria_id:
 *          type: integer
 *          description: Categoría del competidor
 *      required:
 *        - nombre
 *        - numero_competido
 *        - equipo_id
 *        - evento_id
 *        - categoria_id
 *      example:
 *        nombre: Leonel Messi
 *        numero_competido: 10
 *        equipo_id: 1
 *        evento_id: 1
 *        categoria_id: 1
 *    Time:
 *      type: object
 *      properties:
 *        id_tiempo:
 *          type: integer
 *          description: Autoincremental por defecto
 *        tiempo:
 *          type: time
 *          description: Tiempo del competidor
 *        tipo_registro:
 *          type: integer
 *          description: Tipo de registro
 *        participante_id:
 *          type: integer
 *          description: Participante al que pertenece el tiempo
 *        punto_control_id:
 *          type: integer
 *          description: Punto de control al que pertenece el tiempo
 *        usuario_id:
 *          type: integer
 *          description: Usuario que registra el tiempo
 *      required:
 *        - tiempo
 *        - tipo_registro
 *        - participante_id
 *        - punto_control_id
 *        - usuario_id
 *      example:
 *        tiempo: "00:30:00"
 *        tipo_registro: 1
 *        participante_id: 1
 *        punto_control_id: 1
 *        usuario_id: 1
 *    Event:
 *      type: object
 *      properties:
 *        id_evento:
 *          type: integer
 *          description: Autoincremental por defecto
 *        nombre:
 *          type: time
 *          description: Nombre del evento
 *        fecha:
 *          type: date
 *          description: Fecha del evento
 *        ubicacion:
 *          type: string
 *          description: Ubicación del evento
 *        categoria_id:
 *          type: integer
 *          description: Categoría del evento
 *      required:
 *        - nombre
 *        - fecha
 *        - ubicacion
 *        - categoria_id
 *      example:
 *        nombre: Maratón
 *        fecha: 2021-10-10
 *        ubicacion: "Parque la Sabana"
 *        categoria_id: 1
 *    CheckPoint:
 *      type: object
 *      properties:
 *        id_evento:
 *          type: integer
 *          description: Autoincremental por defecto
 *        nombre:
 *          type: string
 *          description: Nombre del evento
 *        kilometro:
 *          type: decimal
 *          description: Kilometraje del punto de control
 *        evento_id:
 *          type: integer
 *          description: Evento al que pertenece el punto de control
 *        id_usuario:
 *          type: integer
 *          description: Usuario que registra el punto de control
 *      required:
 *        - nombre
 *        - kilometro
 *        - evento_id
 *        - id_usuario
 *      example:
 *        nombre: "Parque la Sabana"
 *        kilometro: 5.5
 *        evento_id: 1
 *        id_usuario: 1
 */
