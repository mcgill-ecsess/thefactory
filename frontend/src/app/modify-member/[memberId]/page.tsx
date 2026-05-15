"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import FactoryPageShell, { ShellPanel } from "@/components/FactoryPageShell";
import Spinner from "@/components/Spinner";
import { ArrowLeft } from "lucide-react";

type Member = {
  id: number;
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

export default function ModifyMember() {
  const params = useParams();
  const memberId = params.memberId as string;
  const router = useRouter();

  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      try {
        const decodedToken = jwtDecode(token) as { exp: number };
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          fetchMemberDetails();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  }, [router]);

  const fetchMemberDetails = async () => {
    try {
      const response = await axios.get(
        `https://factorystrapi.mcgilleus.ca/api/members/${memberId}`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      setMember({ id: response.data.data.id, ...response.data.data.attributes });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching member details:", error);
      setError("Failed to load member details.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (member) setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://factorystrapi.mcgilleus.ca/api/members/${memberId}`,
        {
          data: {
            name: member?.name,
            studentId: member?.studentId,
            email: member?.email,
            phoneNumber: member?.phoneNumber,
            department: member?.department,
            year: member?.year,
          },
        },
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Member updated successfully!");
        setTimeout(() => router.push("/members"), 2000);
      }
    } catch (error) {
      console.error("Error updating member:", error);
      setError("Failed to update member. Please try again.");
    }
  };

  if (loading) return <Spinner />;
  if (error)
    return (
      <FactoryPageShell>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className="text-red-400">{error}</p>
        </div>
      </FactoryPageShell>
    );

  return (
    <FactoryPageShell
      hero={{
        eyebrow: "Admin",
        title: "Modify Member",
        description: member ? `Editing record for ${member.name}` : undefined,
      }}
    >
      <div className="max-w-2xl mx-auto px-6 pb-20">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Members
        </button>

        <ShellPanel className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>Name</label>
              <input type="text" name="name" value={member?.name || ""} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>Student ID</label>
              <input type="text" name="studentId" value={member?.studentId || ""} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input type="email" name="email" value={member?.email || ""} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>Phone Number</label>
              <input type="text" name="phoneNumber" value={member?.phoneNumber || ""} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>Department</label>
              <select name="department" value={member?.department || "Computer Engineering"} onChange={handleChange} className={inputClass} required>
                {departments.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className={labelClass}>Year</label>
              <select name="year" value={member?.year || "U0"} onChange={handleChange} className={inputClass} required>
                {["U0", "U1", "U2", "U3", "U4+"].map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full bg-factory-green hover:bg-factory-dark-green text-white font-bold py-3 rounded-xl transition-colors tracking-wide uppercase text-sm">
                Update Member
              </button>
            </div>

            {successMessage && <p className="text-factory-green text-sm text-center">{successMessage}</p>}
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          </form>
        </ShellPanel>
      </div>
    </FactoryPageShell>
  );
}
