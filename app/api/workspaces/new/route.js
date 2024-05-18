import { connectToDB } from "@/lib/database";
import User from "@/models/userModel";
import Workspace from "@/models/workspaceModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  const token = cookies().get("token").value;
  const { name } = await req.json();
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

    const nameExist = await Workspace.findOne({ userId: user._id, name });

    console.log(nameExist);

    if (nameExist) {
      return NextResponse.json(
        { error: "Workspace already exists" },
        { status: 400, statusText: "Workspace already exists" }
      );
    }

    const newWorkspace = Workspace.create({ userId: user._id, name });

    return NextResponse.json(newWorkspace, {
      status: 201,
      statusText: "New Workspace created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to create new workspace, Please try again later..",
        error_message: error,
      },
      {
        status: 500,
        statusText: "Failed to create new workspace, Please try again later..",
      }
    );
  }
};
