import { NextResponse } from "next/server";
import { AppDataSource } from "@/api/config/database";
import schema from "@/schema/sign-in-schema.json";
import Container from "typedi";
import { UserService } from "@/api/services/user";
import { createSchemaValidator } from "@/validator/create-schema-validator";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const validate = createSchemaValidator().compile(schema);
    const isValid = validate(data);
    if (!isValid) {
      return NextResponse.json(
        { error: validate.errors?.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    const userService = Container.get(UserService);
    const user = await userService.validateUser(
      data.email as string,
      data.password as string
    );
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = userService.encodeAccessToken(user);
    const response = NextResponse.json({ authenticated: true });
    response.cookies.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
