// "use client";

// import { useEffect, useState } from "react";

// type Student = {
//   id: number;
//   name: string;
//   age: number;
//   city: string;
//   result: string;
//   marks: number;
// };

// export default function ShowStudent() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getStudents = async () => {
//       try {
//         const response = await fetch("api/students");

//         const data = await response.json();
//         if (data.success) {
//           setStudents(data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getStudents();
//   }, []);

//   const handleDelete = async (id: number) => {
//     const responce = await fetch(`/api/students?id=${id}`, {
//       method: "DELETE",
//     });

//     if (responce.ok) {
//       setStudents((prev) => prev.filter((student) => student.id !== id));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f6f3ec] px-4 py-10 sm:px-6 lg:px-10">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-8 border-b border-[#d8ddd9] pb-6">
//           <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] text-[#10243b]">
//             Students
//           </h1>
//         </div>

//         <div className="overflow-x-auto rounded-2xl border border-[#d8ddd9] bg-[#fffdf8] shadow-[0_20px_50px_rgba(16,36,59,0.08)]">
//           <table className="w-full border-collapse text-left">
//             <thead>
//               <tr className="border-b border-[#d8ddd9] bg-[#edf3f0]">
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#52636f]">
//                   ID
//                 </th>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#52636f]">
//                   Name
//                 </th>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#52636f]">
//                   Age
//                 </th>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#52636f]">
//                   City
//                 </th>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#52636f]">
//                   Marks
//                 </th>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#52636f]">
//                   Result
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {students.map((student) => (
//                 <tr
//                   key={student.id}
//                   className="border-b border-[#e6e8e3] last:border-0 transition-colors hover:bg-[#f3f7f4]"
//                 >
//                   <td className="px-5 py-4 font-mono text-sm text-[#147a69]">
//                     {student.id}
//                   </td>

//                   <td className="px-5 py-4 font-semibold text-[#10243b]">
//                     {student.name}
//                   </td>

//                   <td className="px-5 py-4 text-[#52636f]">{student.age}</td>

//                   <td className="px-5 py-4 text-[#52636f]">{student.city}</td>

//                   <td className="px-5 py-4 font-semibold text-[#10243b]">
//                     {student.marks}
//                   </td>
//                   <td className="px-5 py-4 font-semibold">
//                     <span
//                       className={
//                         student.result === "Pass"
//                           ? "text-green-600"
//                           : "text-red-500"
//                       }
//                     >
//                       {student.result}
//                     </span>
//                   </td>

//                   <td className="px-5 py-4">
//                     {" "}
//                     <button
//                       onClick={() => handleDelete(student.id)}
//                       className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
//                     >
//                       {" "}
//                       Delete{" "}
//                     </button>{" "}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

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

interface ShowStudentProps {
  /** true = no full-screen background, for use inside another page */
  embedded?: boolean;
}

const th =
  "px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#52636f]";

export default function ShowStudent({ embedded = false }: ShowStudentProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStudents = async () => {
      try {
        // leading "/" so it works from any page
        const response = await fetch("/api/students");

        const data = await response.json();
        if (data.success) {
          setStudents(data.data);
        } else {
          setError("Could not load students.");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Could not reach the server.");
      } finally {
        setLoading(false);
      }
    };
    getStudents();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this student?")) return;

    const responce = await fetch(`/api/students?id=${id}`, {
      method: "DELETE",
    });

    if (responce.ok) {
      setStudents((prev) => prev.filter((student) => student.id !== id));
    }
  };

  return (
    <div
      className={
        embedded
          ? "w-full text-left"
          : "min-h-screen bg-[#f6f3ec] px-4 py-10 sm:px-6 lg:px-10"
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-[#d8ddd9] pb-6">
          <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] text-[#10243b] dark:text-white">
            Students
          </h1>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#d8ddd9] bg-[#fffdf8] shadow-[0_20px_50px_rgba(16,36,59,0.08)]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#d8ddd9] bg-[#edf3f0]">
                <th className={th}>ID</th>
                <th className={th}>Name</th>
                <th className={th}>Age</th>
                <th className={th}>City</th>
                <th className={th}>Marks</th>
                <th className={th}>Result</th>
                <th className={th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-8 text-center text-[#52636f]"
                  >
                    Loading students...
                  </td>
                </tr>
              )}

              {!loading && error && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-8 text-center text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && students.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-8 text-center text-[#52636f]"
                  >
                    No students saved yet.
                  </td>
                </tr>
              )}

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

                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>
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
