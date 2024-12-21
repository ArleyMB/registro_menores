require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const db = require("./config/db");

const PORT = process.env.PORT || 4000;

const usuarioRouter = require("./routes/usuarioRoutes");
const loginRouter = require("./routes/loginRouter");
const pacienteRouter = require("./routes/pacienteRoutes");

app.use(express.json());

// Permitir solicitudes desde el puerto 5173 (donde corre Vite)
const corsOptions = {
  origin: 'https://registro-menores.onrender.com', // El puerto del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  preflightContinue: false, // No continuar con la preflight a la siguiente ruta
  optionsSuccessStatus: 204, // Establece el código de estado para la respuesta preflight
};

// Usar CORS globalmente
app.use(cors(corsOptions));

// Usar las rutas de usuarios
app.use(loginRouter);
app.use(usuarioRouter);
app.use(pacienteRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`.bgGreen);
});
