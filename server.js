/******************** CLASE 10 ********************/
/********* Desafio Entregable: Handlebars *********/

const express = require("express")
const {engine} = require("express-handlebars")
const app = express()

//Configuración para handlebars
app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "index.hbs",
      layoutsDir: __dirname + "/views/layouts",
      partialsDir: __dirname + "/views/partials",
    })
)

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json())
app.use(express.urlencoded({extended: true}))

/*********** API PRODUCTOS *************/

const productos = []

/*********** RENDER HANDLEBARS *************/

app.get("/", (req, res) => {
    //Sirve el cuerpo de la página "main.hbs" en el contenedor "index.hbs"
    if (productos != []) {
        res.render("main", { listProd: productos, listExists: true } );
    } else {
        res.render("main", { listProd: productos, listExists: false } );
    }
});

/********** Me devuelve el array de productos entero **********/

app.get("/productos", (req, res) => {
    res.redirect('/')
})

/********** Guarda un producto nuevo en el array productos **********/

app.post("/productos", (req, res) => {
    req.body = {...req.body, id: productos.length + 1}
    productos.push(req.body)
    // productos[productos.length].id = productos.length
    // res.json(res.body)
    res.render("main", { listProd: productos, listExists: true } );
})

/*************SERVER LISTEN***********/

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en el servidor ${error}`))

/************************************/
