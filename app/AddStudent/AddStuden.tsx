// "use client";
// import { useState } from "react";

// export default function AddStudent() {
//   const [name, setName] = useState("");
//   const [city, setCity] = useState("");
//   const [age, setAge] = useState("");
//   const [marks, setMarks] = useState("");
//   const [result, setResult] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const studentResult = Number(marks) >= 75 ? "Pass" : "Fail";

//     try {
//       const response = await fetch("/api/students", {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           name,
//           age: Number(age),
//           city,
//           marks: Number(marks),
//           result: studentResult,
//         }),
//       });
//       const data = await response.json();

//       if (data.success) {
//         alert("Student successfully saved!");

//         setName("");
//         setAge("");
//         setCity("");
//         setMarks("");
//         setResult("");
//       } else {
//         alert("Student save nahi hua!");
//       }
//     } catch (error) {
//       console.error("Error adding student:", error);
//       alert("An error occurred while adding the student.");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen w-full flex items-center justify-center px-4 py-14"
//       style={{
//         background:
//           "radial-gradient(ellipse at 50% -10%, #f4f4f5 0%, #e9eaeb 45%, #dcdde0 100%)",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap');
//         .serif-display { font-family: 'Fraunces', serif; }
//         input::placeholder { color: #6b6b70; }
//         input:focus, select:focus { outline: none; }
//       `}</style>

//       <div className="w-full max-w-3xl">
//         {/* Header */}
//         <div className="mb-10 flex items-end justify-between border-b border-[#1c2b38]/12 pb-6">
//           <div>
//             <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a7548] mb-2">
//               Student Records
//             </p>
//             <h1 className="serif-display text-4xl text-[#26282b] leading-none">
//               Add a new student
//             </h1>
//           </div>
//           <div className="hidden sm:block text-right">
//             <p className="text-xs text-[#6b6d70]">Record ID</p>
//             <p className="serif-display text-lg text-[#8a7548]">#0142</p>
//           </div>
//         </div>

//         <div
//           className="rounded-2xl border border-[#d9bb77]/25 shadow-xl"
//           style={{
//             background: "linear-gradient(180deg, #f1f2f3 0%, #e6e7e9 100%)",
//             boxShadow: "0 30px 60px -20px rgba(28,43,56,0.15)",
//           }}
//         >
//           <form
//             onSubmit={handleSubmit}
//             className="px-7 py-8 sm:px-10 sm:py-10 space-y-9"
//           >
//             {/* Basic Information */}
//             <section>
//               <div className="flex items-center gap-3 mb-6">
//                 <span className="serif-display text-sm text-[#8a7548]">01</span>
//                 <h2 className="text-[13px] font-medium text-[#2c2e31]">
//                   Basic information
//                 </h2>
//                 <span className="flex-1 h-px bg-[#1c1f22]/10" />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="md:col-span-2">
//                   <label
//                     htmlFor="studentName"
//                     className="block text-xs text-[#6b6d70] mb-2"
//                   >
//                     Full name
//                   </label>
//                   <input
//                     id="studentName"
//                     type="text"
//                     value={name}
//                     onChange={(e) =>
//                       e.target.value.length <= 20 && setName(e.target.value)
//                     }
//                     placeholder="e.g. Ahmed Raza"
//                     className="w-full bg-transparent border-b border-[#1c1f22]/20 pb-3 text-zinc-800 text-[15px] transition-colors duration-200 focus:border-[#8a7548]"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="age"
//                     className="block text-xs text-[#6b6d70] mb-2"
//                   >
//                     Age
//                   </label>
//                   <input
//                     id="age"
//                     type="number"
//                     value={age}
//                     onChange={(e) => setAge(e.target.value)}
//                     placeholder="e.g. 20"
//                     className="w-full bg-transparent border-b border-[#1c1f22]/20 pb-3 text-zinc-800 text-[15px] transition-colors duration-200 focus:border-[#8a7548]"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="city"
//                     className="block text-xs text-[#6b6d70] mb-2"
//                   >
//                     City
//                   </label>
//                   <input
//                     id="city"
//                     type="text"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     placeholder="e.g. Kohat"
//                     className="w-full bg-transparent border-b border-[#1c1f22]/20 pb-3 text-zinc-800 text-[15px] transition-colors duration-200 focus:border-[#8a7548]"
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Academic Information */}
//             <section>
//               <div className="flex items-center gap-3 mb-6">
//                 <span className="serif-display text-sm text-[#8a7548]">02</span>
//                 <h2 className="text-[13px] font-medium text-[#2c2e31]">
//                   Academic record
//                 </h2>
//                 <span className="flex-1 h-px bg-[#1c1f22]/10" />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label
//                     htmlFor="marks"
//                     className="block text-xs text-[#6b6d70] mb-2"
//                   >
//                     Marks
//                   </label>
//                   <input
//                     id="marks"
//                     type="number"
//                     value={marks}
//                     onChange={(e) => setMarks(e.target.value)}
//                     placeholder="e.g. 85"
//                     className="w-full bg-transparent border-b border-[#1c1f22]/20 pb-3 text-zinc-800 text-[15px] transition-colors duration-200 focus:border-[#8a7548]"
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Note */}
//             <div className="rounded-xl border border-[#d9bb77]/30 bg-[#8a7548]/[0.06] px-5 py-4">
//               <p className="text-[13px] leading-6 text-[#5c5e61]">
//                 Double-check the name, age, city, marks and result before saving
//                 — records can&apos;t be edited once submitted.
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col-reverse gap-3 border-t border-[#1c1f22]/10 pt-7 sm:flex-row sm:justify-end">
//               <button
//                 type="reset"
//                 onClick={() => {
//                   setName("");
//                   setCity("");
//                   setAge("");
//                   setMarks("");
//                   setResult("");
//                 }}
//                 className="rounded-full px-6 py-3 text-sm text-[#4a4c4f] border border-[#1c1f22]/20 transition-colors duration-200 hover:text-[#1c1f22] hover:border-[#8a7548]"
//               >
//                 Clear
//               </button>

//               <button
//                 type="submit"
//                 className="rounded-full px-7 py-3 text-sm font-semibold text-[#fffdf8] bg-[#147a69] shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition-all duration-200 hover:bg-[#1b917d] hover:-translate-y-0.5 active:scale-[0.98]"
//               >
//                 Save student
//               </button>
//             </div>
//           </form>
//         </div>

//         <p className="mt-8 text-center text-[11px] uppercase tracking-[0.16em] text-[#6b6d70]">
//           Student Management System
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";

export interface SavedStudent {
  name: string;
  age: number;
  city: string;
  marks: number;
  result: "Pass" | "Fail";
}

interface AddStudentProps {
  /** Called after the API says success (optional) */
  onSaved?: (student: SavedStudent) => void;
  /** true = no full-screen background, for use inside another page */
  embedded?: boolean;
}

export default function AddStuden({
  onSaved,
  embedded = false,
}: AddStudentProps) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [marks, setMarks] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const studentResult: "Pass" | "Fail" =
      Number(marks) >= 75 ? "Pass" : "Fail";

    try {
      const response = await fetch("/api/students", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          age: Number(age),
          city,
          marks: Number(marks),
          result: studentResult,
        }),
      });
      const data = await response.json();

      if (data.success) {
        alert("Student successfully saved!");
        onSaved?.({
          name,
          age: Number(age),
          city,
          marks: Number(marks),
          result: studentResult,
        });

        setName("");
        setAge("");
        setCity("");
        setMarks("");
        setResult("");
      } else {
        alert("Student save nahi hua!");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("An error occurred while adding the student.");
    }
  };

  return (
    <div
      className={
        embedded
          ? "w-full flex items-center justify-center py-2"
          : "min-h-screen w-full flex items-center justify-center px-4 py-14"
      }
      style={
        embedded
          ? undefined
          : {
              background:
                "radial-gradient(ellipse at 50% -10%, #f4f4f5 0%, #e9eaeb 45%, #dcdde0 100%)",
            }
      }
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap');
        .serif-display { font-family: 'Fraunces', serif; }
        input::placeholder { color: #6b6b70; }
        input:focus, select:focus { outline: none; }
      `}</style>

      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between border-b border-[#1c2b38]/12 pb-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a7548] mb-2">
              Student Records
            </p>
            <h1 className="serif-display text-4xl text-[#26282b] leading-none">
              Add a new student
            </h1>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs text-[#6b6d70]">Record ID</p>
            <p className="serif-display text-lg text-[#8a7548]">#0142</p>
          </div>
        </div>

        <div
          className="rounded-2xl border border-[#d9bb77]/25 shadow-xl"
          style={{
            background: "linear-gradient(180deg, #f1f2f3 0%, #e6e7e9 100%)",
            boxShadow: "0 30px 60px -20px rgba(28,43,56,0.15)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="px-7 py-8 sm:px-10 sm:py-10 space-y-9"
          >
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="serif-display text-sm text-[#8a7548]">01</span>
                <h2 className="text-[13px] font-medium text-[#2c2e31]">
                  Basic information
                </h2>
                <span className="flex-1 h-px bg-[#1c1f22]/10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label
                    htmlFor="studentName"
                    className="block text-xs text-[#6b6d70] mb-2"
                  >
                    Full name
                  </label>
                  <input
                    id="studentName"
                    type="text"
                    value={name}
                    onChange={(e) =>
                      e.target.value.length <= 20 && setName(e.target.value)
                    }
                    placeholder="e.g. Ahmed Raza"
                    className="w-full bg-transparent border-b border-[#1c1f22]/20 pb-3 text-zinc-800 text-[15px] transition-colors duration-200 focus:border-[#8a7548]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-xs text-[#6b6d70] mb-2"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 20"
                    className="w-full bg-transparent border-b border-[#1c1f22]/20 pb-3 text-zinc-800 text-[15px] transition-colors duration-200 focus:border-[#8a7548]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-xs text-[#6b6d70] mb-2"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Kohat"
                    className="w-full bg-transparent border-b border-[#1c1f22]/20 pb-3 text-zinc-800 text-[15px] transition-colors duration-200 focus:border-[#8a7548]"
                  />
                </div>
              </div>
            </section>

            {/* Academic Information */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="serif-display text-sm text-[#8a7548]">02</span>
                <h2 className="text-[13px] font-medium text-[#2c2e31]">
                  Academic record
                </h2>
                <span className="flex-1 h-px bg-[#1c1f22]/10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="marks"
                    className="block text-xs text-[#6b6d70] mb-2"
                  >
                    Marks
                  </label>
                  <input
                    id="marks"
                    type="number"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    placeholder="e.g. 85"
                    className="w-full bg-transparent border-b border-[#1c1f22]/20 pb-3 text-zinc-800 text-[15px] transition-colors duration-200 focus:border-[#8a7548]"
                  />
                </div>
              </div>
            </section>

            {/* Note */}
            <div className="rounded-xl border border-[#d9bb77]/30 bg-[#8a7548]/[0.06] px-5 py-4">
              <p className="text-[13px] leading-6 text-[#5c5e61]">
                Double-check the name, age, city, marks and result before saving
                — records can&apos;t be edited once submitted.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-[#1c1f22]/10 pt-7 sm:flex-row sm:justify-end">
              <button
                type="reset"
                onClick={() => {
                  setName("");
                  setCity("");
                  setAge("");
                  setMarks("");
                  setResult("");
                }}
                className="rounded-full px-6 py-3 text-sm text-[#4a4c4f] border border-[#1c1f22]/20 transition-colors duration-200 hover:text-[#1c1f22] hover:border-[#8a7548]"
              >
                Clear
              </button>

              <button
                type="submit"
                className="rounded-full px-7 py-3 text-sm font-semibold text-[#fffdf8] bg-[#147a69] shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition-all duration-200 hover:bg-[#1b917d] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Save student
              </button>
            </div>
          </form>
        </div>

        <p className="mt-8 text-center text-[11px] uppercase tracking-[0.16em] text-[#6b6d70]">
          Student Management System
        </p>
      </div>
    </div>
  );
}
