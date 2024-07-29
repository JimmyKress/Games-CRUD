import mysql, { Pool, PoolConnection } from 'promise-mysql'; //En la biblioteca promise-mysql, la función createPool() devuelve un objeto de tipo Pool
import keys from './keys';

async function connectToDatabase() {
    const pool: Pool = await mysql.createPool(keys.database); // Await, indica que la ejecución de la función debe pausarse hasta que la promesa que está siendo esperada se resuelva o se rechace

    try {
        //Obtengo la conexión
        const connection: PoolConnection = await pool.getConnection();
        connection.release();// Libero la conexión utilizando release()
         //pool.releaseConnection(connection);
        console.log('DB is connected');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

export const connect = connectToDatabase();