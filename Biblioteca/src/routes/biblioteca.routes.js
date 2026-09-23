import Router from "express"
import { crearLibro,listarLibros,eliminarLibro,pedirPrestadoLibro,verMisPrestamos} from "../controllers/biblioteca.controller.js"
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router()

router.post("/", authMiddleware, crearLibro)
router.get("/", authMiddleware, listarLibros)
router.delete("/:id", authMiddleware, eliminarLibro)
router.post("/prestamo", authMiddleware, pedirPrestadoLibro)
router.get("/prestamo/mis-prestamos", authMiddleware, verMisPrestamos)

export default router