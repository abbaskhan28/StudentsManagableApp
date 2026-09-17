"use client";

import { useEffect, useState } from "react";

type Student = {
  id: number;
  name: string;
  age: number;
  city: string;
  result: string;
  marks: number;
};

export default function ShowStudent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetch("api/students");

        const data = await response.json();
        if (data.success) {
          setStudents(data.data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    getStudents();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f3ec] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-[#d8ddd9] pb-6">
          <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] text-[#10243b]">
            Students
          </h1>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#d8ddd9] bg-[#fffdf8] shadow-[0_20px_50px_rgba(16,36,59,0.08)]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#d8ddd9] bg-[#edf3f0]">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#52636f]">
                  ID
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#52636f]">
                  Name
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#52636f]">
                  Age
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#52636f]">
                  City
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#52636f]">
                  Marks
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#52636f]">
                  Result
                </th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-[#e6e8e3] last:border-0 transition-colors hover:bg-[#f3f7f4]"
                >
                  <td className="px-5 py-4 font-mono text-sm text-[#147a69]">
                    {student.id}
                  </td>

                  <td className="px-5 py-4 font-semibold text-[#10243b]">
                    {student.name}
                  </td>

                  <td className="px-5 py-4 text-[#52636f]">{student.age}</td>

                  <td className="px-5 py-4 text-[#52636f]">{student.city}</td>

                  <td className="px-5 py-4 font-semibold text-[#10243b]">
                    {student.marks}
                  </td>
                  <td className="px-5 py-4 font-semibold">
                    <span
                      className={
                        student.result === "Pass"
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {student.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
