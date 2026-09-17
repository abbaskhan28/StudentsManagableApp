import db from "@/Lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT 1 AS connected");

    return Response.json({
      success: true,
      message: " Database connected successfully",
      data: rows,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 },
    );
  }
}
