import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import mysql from "mysql2/promise";
import GetDBSettings from "@lib/db";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, userType } =
      await request.json();

    if (!firstName || !lastName || !email || !password || !userType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const hashedPassword = await hash(password, 10);

    const db = await mysql.createConnection(GetDBSettings());

    let checkQuery = "";
    let insertQuery = "";
    let params: any[] = [];

    // check if user is a student or instructor and create queries
    if (userType === "student") {
      checkQuery = "SELECT s_id FROM students WHERE s_email = ?";
      insertQuery =
        "INSERT INTO students (s_name, s_email, s_password) VALUES (?, ?, ?)";
      params = [`${firstName} ${lastName}`, email, hashedPassword];
    } else if (userType === "instructor") {
      checkQuery = "SELECT i_id FROM instructors WHERE i_email = ?";
      insertQuery =
        "INSERT INTO instructors (i_name, i_email, i_password) VALUES (?, ?, ?)";
      params = [`${firstName} ${lastName}`, email, hashedPassword];
    } else {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 });
    }

    // check if user already exists
    const [existingUser]: any = await db.execute(checkQuery, [email]);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    // insert new user into the database
    await db.execute(insertQuery, params);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
