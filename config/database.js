const sql = require('mssql');

const config = {
    user: 'r00t',
    password: 'Pr0yecto.2023#',  // Cambia 'your_password_here' por tu contraseña real.
    server: 'reservago-server.database.windows.net',
    port: 1433,
    database: 'ReservasDB',
    options: {
        encrypt: true,
        trustServerCertificate: false,
    },
    connectionTimeout: 30000
};

let connectionPool;

// Función para obtener la conexión a la base de datos
async function getConnection() {
    try {
        if (connectionPool) return connectionPool;
        connectionPool = await sql.connect(config);
        return connectionPool;
    } catch (error) {
        console.error("Error al conectar a la base de datos", error);
        throw error;
    }
}

module.exports = {
    getConnection
};
