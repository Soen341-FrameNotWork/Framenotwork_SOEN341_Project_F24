import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import mysql from 'mysql2/promise';
import GetDBSettings from "@lib/db";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                userType: { label: "User Type", type: "text" },
            },
            async authorize(credentials) {
                try {
                    const db = await mysql.createConnection(GetDBSettings());

                    const email = credentials?.email;
                    const password = credentials?.password;
                    const userType = credentials?.userType;

                    if (!email || !password || !userType) {
                        return null;
                    }

                    let query = '';
                    let params: any = [];
                    let idField = '';
                    let nameField = '';
                    let emailField = '';
                    let passwordField = '';

                    if (userType === 'student') {
                        query = 'SELECT s_id as id, s_name as name, s_email as email, s_password as password FROM students WHERE s_email = ?';
                        params = [email];
                        idField = 'id';
                        nameField = 'name';
                        emailField = 'email';
                        passwordField = 'password';
                    } else if (userType === 'instructor') {
                        query = 'SELECT i_id as id, i_name as name, i_email as email, i_password as password FROM instructors WHERE i_email = ?';
                        params = [email];
                        idField = 'id';
                        nameField = 'name';
                        emailField = 'email';
                        passwordField = 'password';
                    } else {
                        // Invalid user type
                        return null;
                    }

                    const [rows]: any = await db.execute(query, params);

                    if (rows.length === 0) {
                        // No user found
                        return null;
                    }

                    const user = rows[0];

                    const passwordCorrect = await compare(password, user[passwordField]);

                    if (passwordCorrect) {
                        return {
                            id: user[idField],
                            email: user[emailField],
                            name: user[nameField],
                            role: userType,
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Database error:', error);
                    return null;
                }
            },
        }),
    ],

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

