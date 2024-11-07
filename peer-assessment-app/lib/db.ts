export interface IDBSettings {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string
}


export default function GetDBSettings(): IDBSettings {

    console.log('database: ', process.env.DB_DATABASE);
    console.log('host: ', process.env.DB_HOST);
    console.log('port: ', process.env.DB_PORT);
    console.log('user: ', process.env.DB_USER);
    console.log('password: ', process.env.DB_PASSWORD);

    return {
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT!),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_DATABASE!,

    }
}
