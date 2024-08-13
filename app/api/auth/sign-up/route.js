import User from "@/models/userModel";
import { connectToDB } from "@/lib/database";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { fullName, email, password } = await req.json();

  try {
    await connectToDB();

    const userExist = await User.findOne({ email });

    if (userExist) {
      return NextResponse.json(
        { error: "Account with this email already exist" },
        { status: 400, statusText: "Account with this email already exist" }
      );
    } else {
      const newUser = new User({
        fullName,
        email,
        password,
      });

      await newUser.save();

      return NextResponse.json(
        {
          fullName: newUser.fullName,
          email: newUser.email,
          membership: newUser.membership,
          email_verified: newUser.email_verified,
          _id: newUser._id,
        },
        {
          status: 201,
          statusText: "Account created successfully",
        }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to create new account, Please try again later..",
        error_message: error,
      },
      { status: 500 }
    );
  }
};
