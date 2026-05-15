"use client";

import { useState } from "react";
import axios from "axios";
import FactoryPageShell, { ShellPanel } from "@/components/FactoryPageShell";

type Member = {
  name: string;
  studentId: string;
  email: string;
  phoneNumber: string;
  department: string;
  year: string;
};

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-factory-green/60 transition-colors";

const labelClass = "block text-white/60 text-xs uppercase tracking-widest font-semibold mb-1.5";

const departments = [
  "Computer Engineering",
  "Software Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Materials Engineering",
  "Mining Engineering",
  "Chemical Engineering",
  "Bioengineering",
  "Civil Engineering",
  "Other",
];

export default function AddMember() {
  const [formData, setFormData] = useState<Member>({
    name: "",
    studentId: "",
    email: "",
    phoneNumber: "",
    department: "Computer Engineering",
    year: "U0",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post(
        "https://factorystrapi.mcgilleus.ca/api/members",
        { data: formData },
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Member added successfully!");
        setFormData({ name: "", studentId: "", email: "", phoneNumber: "", department: "Computer Engineering", year: "U0" });
        setTimeout(() => window.close(), 2000);
      } else {
        setErrorMessage("Something went wrong, please try again.");
      }
    } catch {
      setErrorMessage("Error adding member. Please check the input or try again later.");
    }
  };

  return (
    <FactoryPageShell
      hero={{
        eyebrow: "Admin",
        title: "Membership Form",
        description: "Complete this agreement to join The Factory makerspace.",
      }}
    >
      <div className="max-w-2xl mx-auto px-6 pb-20">
        <ShellPanel className="p-8">
          {/* Intro text */}
          <p className="text-white/50 text-sm leading-relaxed mb-8 text-justify">
            This membership agreement is made between The Factory, a lab under the direction of
            the Electrical, Computer and Software Engineering Student Society (ECSESS) of McGill
            University, and the undersigned member. This agreement is made because the member
            wishes to receive, and The Factory wishes to provide services in the form of hardware
            rental services, tutorial and workshop sessions, and equipment accessibility.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} required placeholder="Full name" />
            </div>

            <div>
              <label className={labelClass}>Student ID</label>
              <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} className={inputClass} required placeholder="e.g. 260123456" />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} required placeholder="mcgill email preferred" />
            </div>

            <div>
              <label className={labelClass}>Phone Number</label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={inputClass} required placeholder="+1 (514) 000-0000" />
            </div>

            <div>
              <label className={labelClass}>Department</label>
              <select name="department" value={formData.department} onChange={handleChange} className={inputClass} required>
                {departments.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className={labelClass}>Year</label>
              <select name="year" value={formData.year} onChange={handleChange} className={inputClass} required>
                {["U0", "U1", "U2", "U3", "U4+"].map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            {/* Safety Contract */}
            <div className="rounded-xl border border-white/8 bg-white/3 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Safety Contract</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                The Factory is a hardware development laboratory that makes different types of
                equipment readily available to students at McGill University. Lab membership
                requires that all procedural and safety rules be followed at all times.
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-white/50 text-sm">
                <li>Conduct yourself in a responsible manner at all times in The Factory.</li>
                <li>Follow all written and verbal rules. Contact a Factory Manager if uncertain.</li>
                <li>Seek instructions from a Factory Manager on using all equipment.</li>
                <li>You may be liable for fees if you damage equipment or lose rental hardware.</li>
                <li>No food or drinks are allowed in The Factory.</li>
                <li>Keep lab benches clean and organized.</li>
                <li>Do not engage in dangerous projects.</li>
                <li>Report unsafe situations to a Factory Manager.</li>
                <li>A supervisor must be present while using the lab unless otherwise stated.</li>
              </ol>
              <label className="flex items-center gap-3 cursor-pointer mt-2">
                <input type="checkbox" required className="w-4 h-4 accent-factory-green rounded" />
                <span className="text-white/70 text-sm">I have read and understand the safety rules.</span>
              </label>
            </div>

            {/* Agreement */}
            <div className="rounded-xl border border-white/8 bg-white/3 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Agreement</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                I fully understand and acknowledge the risks associated with working in The Factory
                alongside potentially dangerous electrical equipment.
              </p>
              <div>
                <label className={labelClass}>Please enter your full name to agree</label>
                <input type="text" name="fullName" className={inputClass} required placeholder="Full legal name" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-factory-green hover:bg-factory-dark-green text-white font-bold py-3 rounded-xl transition-colors tracking-wide uppercase text-sm"
              >
                Submit Application
              </button>
            </div>

            {successMessage && <p className="text-factory-green text-sm text-center mt-2">{successMessage}</p>}
            {errorMessage && <p className="text-red-400 text-sm text-center mt-2">{errorMessage}</p>}
          </form>
        </ShellPanel>
      </div>
    </FactoryPageShell>
  );
}
