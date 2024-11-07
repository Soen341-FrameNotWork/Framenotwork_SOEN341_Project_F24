export interface IDBSettings {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string
}

export default function GetDBSettings(): IDBSettings {
    // const env = process.env.NODE_ENV;

    console.log('database: ', process.env.DB_DATABASE);
    console.log('host: ', process.env.DB_HOST);
    console.log('port: ', process.env.DB_PORT);
    console.log('user: ', process.env.DB_USER);
    console.log('password: ',process.env.DB_PASSWORD);

    return {
                host: process.env.DB_HOST!,
                port: parseInt(process.env.DB_PORT!),
                user: process.env.DB_USER!,
                password: process.env.DB_PASSWORD!,
                database: process.env.DB_DATABASE!,
    
            }
    // if (env == 'development') {
    //     return {
    //         host: process.env.host_dev!,
    //         port: parseInt(process.env.port_dev!),
    //         user: process.env.user_dev!,
    //         password: process.env.password_dev!,
    //         database: process.env.database_dev!,
    //     }
    // }
    // else
    //     return {
    //         host: process.env.host!,
    //         port: parseInt(process.env.port!),
    //         user: process.env.user!,
    //         password: process.env.password!,
    //         database: process.env.database!,

    //     }
}
