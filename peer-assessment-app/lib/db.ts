export interface IDBSettings {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string
}

export default function GetDBSettings(): IDBSettings {
    // const env = process.env.NODE_ENV;

    console.log('host: ', process.env.host);
    console.log('port: ', process.env.port);
    console.log('user: ', process.env.user);
    console.log('user: ', process.env.user);
    console.log('password: ',process.env.password);
    console.log('database: ', process.env.database);

    return {
                host: process.env.host!,
                port: parseInt(process.env.port!),
                user: process.env.user!,
                password: process.env.password!,
                database: process.env.database!,
    
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
