import express from "express"
import colors from "colors"
import swaggerUI from "swagger-ui-express"
import swaggerSpec, {swaggerUiOptions} from "./config/swagger"
import router from "./router"
import db from "./config/db"

//Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
      //  console.log(colors.magenta.bold("Conezion exitosa a la BD"))
    } catch (error) {
        //console.log(error)
       console.log(colors.red.bold ("Hubo un error al conectar a la base de datos"))
    }
}
connectDB()

//Instancia de express
const server = express()

//Leer datos de formularios
server.use(express.json())

server.use("/api/products", router)

//Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions))


export default server

/*
server.get("/api", (req, res) => {
    res.json({msg: "Desde Api"})
})
 */