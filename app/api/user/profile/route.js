import User from "@/models/userModel";
import { connectToDB } from "@/lib/database";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const GET = async (req) => {
  const token = cookies().get("token").value;
  console.log(token);
  try {
    await connectToDB();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: 400, statusText: "Failed to fetch user" }
      );
    }

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to fetch user profile, Please try again later..",
        error_message: error,
      },
      {
        status: 500,
        statusText: "Failed to fetch user profile, Please try again later..",
      }
    );
  }
};

export const POST = async (req) => {
  cookies().delete("token");
  try {
    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to logout, Please try again later..",
        error_message: error,
      },
      {
        status: 500,
        statusText: "Failed to logout, Please try again later..",
      }
    );
  }
};
