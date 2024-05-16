import User from "@/models/userModel";
import { connectToDB } from "@/lib/database";
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/utils";
import { cookies } from "next/headers";

export const POST = async (req) => {
  const { email, password } = await req.json();

  try {
    await connectToDB();

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400, statusText: "Invalid email or password" }
      );
    }

    if (userExist.matchPassword(password)) {
      const token = generateToken(userExist._id);
      cookies().set("token", token, { secure: true });
      return NextResponse.json(
        {
          fullName: userExist.fullName,
          email: userExist.email,
          membership: userExist.membership,
          email_verified: userExist.email_verified,
          _id: userExist._id,
          token: token,
        },
        {
          status: 200,
          statusText: "Sign In Successful",
        }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400, statusText: "Invalid email or password" }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to sign in, Please try again later..",
        error_message: error,
      },
      { status: 500 }
    );
  }
};
