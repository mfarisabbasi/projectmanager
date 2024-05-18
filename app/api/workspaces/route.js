import { connectToDB } from "@/lib/database";
import User from "@/models/userModel";
import Workspace from "@/models/workspaceModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (req) => {
  const token = cookies().get("token").value;
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

    const workspaces = await Workspace.find({ userId: user._id });

    if (workspaces.length === 0) {
      return NextResponse.json({
        status: 200,
        statusText: "No Workspace Found",
      });
    }

    return NextResponse.json(workspaces, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to fetch workspaces, Please try again later..",
        error_message: error,
      },
      {
        status: 500,
        statusText: "Failed to fetch workspaces, Please try again later..",
      }
    );
  }
};
