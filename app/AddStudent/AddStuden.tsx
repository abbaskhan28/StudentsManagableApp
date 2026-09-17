"use client";
import { useState } from "react";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [marks, setMarks] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const studentResult = Number(marks) >= 75 ? "Pass" : "Fail";

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
      className="min-h-screen w-full flex items-center justify-center px-4 py-14"
      style={{
        background:
          "radial-gradient(circle at 10% 5%, #275769 0%, #10243b 39%, #081522 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap');
        .serif-display { font-family: 'Fraunces', serif; }
        input::placeholder { color: #6b6b70; }
        input:focus, select:focus { outline: none; }
      `}</style>

      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d9bb77] mb-2">
              Student Records
            </p>
            <h1 className="serif-display text-4xl text-[#fffdf8] leading-none">
              Add a new student
            </h1>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs text-[#8fa8b5]">Record ID</p>
            <p className="serif-display text-lg text-[#f8e8bf]">#0142</p>
          </div>
        </div>

        <div
          className="rounded-2xl border border-white/15 shadow-2xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.035) 100%)",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="px-7 py-8 sm:px-10 sm:py-10 space-y-9"
          >
            {/* Basic Information */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="serif-display text-sm text-[#d9bb77]">01</span>
                <h2 className="text-[13px] font-medium text-[#e9eff0]">
                  Basic information
                </h2>
                <span className="flex-1 h-px bg-white/10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label
                    htmlFor="studentName"
                    className="block text-xs text-[#a9bbc4] mb-2"
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
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-zinc-100 text-[15px] transition-colors duration-200 focus:border-[#d9bb77]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-xs text-[#a9bbc4] mb-2"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 20"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-zinc-100 text-[15px] transition-colors duration-200 focus:border-[#d9bb77]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-xs text-[#a9bbc4] mb-2"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Kohat"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-zinc-100 text-[15px] transition-colors duration-200 focus:border-[#d9bb77]"
                  />
                </div>
              </div>
            </section>

            {/* Academic Information */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="serif-display text-sm text-[#d9bb77]">02</span>
                <h2 className="text-[13px] font-medium text-[#e9eff0]">
                  Academic record
                </h2>
                <span className="flex-1 h-px bg-white/10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="marks"
                    className="block text-xs text-[#a9bbc4] mb-2"
                  >
                    Marks
                  </label>
                  <input
                    id="marks"
                    type="number"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    placeholder="e.g. 85"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-zinc-100 text-[15px] transition-colors duration-200 focus:border-[#d9bb77]"
                  />
                </div>

                {/* <div>
                  <label
                    htmlFor="result"
                    className="block text-xs text-[#a9bbc4] mb-2"
                  >
                    Result
                  </label>
                  <select
                    id="result"
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-[15px] appearance-none transition-colors duration-200 focus:border-[#d9bb77]"
                    style={{ color: result ? "#f4f4f5" : "#6b6b70" }}
                  >
                    <option value="" style={{ background: "#1c1c1e" }}>
                      Select result
                    </option>
                    <option value="Pass" style={{ background: "#1c1c1e" }}>
                      Pass
                    </option>
                    <option value="Fail" style={{ background: "#1c1c1e" }}>
                      Fail
                    </option>
                  </select>
                </div> */}
                {/* <div>
                  <label className="block text-xs text-[#a9bbc4] mb-2">
                    Result
                  </label>

                  <div className="w-full border-b border-white/20 pb-3 text-[15px] text-zinc-100">
                    {marks
                      ? Number(marks) >= 75
                        ? "Pass"
                        : "Fail"
                      : "Result will be calculated automatically"}
                  </div>
                </div> */}
              </div>
            </section>

            {/* Note */}
            <div className="rounded-xl border border-[#d9bb77]/25 bg-[#081522]/25 px-5 py-4">
              <p className="text-[13px] leading-6 text-[#afbec5]">
                Double-check the name, age, city, marks and result before saving
                — records can&aops;t be edited once submitted.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-7 sm:flex-row sm:justify-end">
              <button
                type="reset"
                onClick={() => {
                  setName("");
                  setCity("");
                  setAge("");
                  setMarks("");
                  setResult("");
                }}
                className="rounded-full px-6 py-3 text-sm text-[#c4d1d5] border border-white/20 transition-colors duration-200 hover:text-white hover:border-[#d9bb77]"
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

        <p className="mt-8 text-center text-[11px] uppercase tracking-[0.16em] text-[#8fa8b5]">
          Student Management System
        </p>
      </div>
    </div>
  );
}
