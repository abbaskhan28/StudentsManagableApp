import db from "@/Lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, city, age, marks, result } = body;

    const sql = `Insert into students(name ,  age, marks, result, city) values (?, ?, ?, ?, ?)`;

    const [results] = await db.execute(sql, [name, age, marks, result, city]);
    return Response.json({
      success: true,
      message: "Student added successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    return Response.json(
      {
        success: false,
        message: "Error adding student",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const [rows] = await db.execute("SELECT * FROM students ");
    return Response.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching students",
      },
      { status: 500 },
    );
  }
}
