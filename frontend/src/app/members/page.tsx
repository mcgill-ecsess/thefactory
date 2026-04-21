"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import FactoryPageShell, { ShellPanel } from "@/components/FactoryPageShell";
import Spinner from "@/components/Spinner";

type Member = {
  id: number;
  name: string;
  studentId: string;
  email: string;
  phoneNumber: string;
  department: string;
  year: string;
};

export default function Members() {
  const router = useRouter();

  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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
          fetchMembers();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  }, [router]);

  const fetchMembers = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const response = await axios.get("https://factorystrapi.mcgilleus.ca/api/members", {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const membersData = response.data.data.map((item: any) => ({
        id: item.id,
        name: item.attributes.name,
        studentId: item.attributes.studentId,
        email: item.attributes.email,
        phoneNumber: item.attributes.phoneNumber,
        department: item.attributes.department,
        year: item.attributes.year,
      }));
      setMembers(membersData);
      setFilteredMembers(membersData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching members:", error);
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    setFilteredMembers(members.filter((m) => m.name.toLowerCase().includes(searchValue)));
  };

  const handleAddMember = () => {
    window.open("/add-member", "_blank");
  };

  const handleModifyMember = (memberId: number) => {
    router.push(`/modify-member/${memberId}`);
  };

  if (loading) return <Spinner />;

  return (
    <FactoryPageShell
      hero={{
        eyebrow: "Admin",
        title: "Members",
        description: `${members.length} registered members in the Factory network.`,
      }}
    >
      <div className="max-w-360 mx-auto px-6 pb-16">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name…"
            value={searchTerm}
            onChange={handleSearch}
            className="flex-1 min-w-[200px] max-w-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-factory-green/60 transition-colors"
          />
          <button
            onClick={handleAddMember}
            className="bg-factory-green hover:bg-factory-dark-green text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            + Add Member
          </button>
        </div>

        <ShellPanel>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white/80">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-white/50 uppercase text-xs tracking-widest">
                  <th className="px-5 py-3 text-left font-semibold">Name</th>
                  <th className="px-5 py-3 text-left font-semibold">Student ID</th>
                  <th className="px-5 py-3 text-left font-semibold">Email</th>
                  <th className="px-5 py-3 text-left font-semibold">Phone</th>
                  <th className="px-5 py-3 text-left font-semibold">Department</th>
                  <th className="px-5 py-3 text-left font-semibold">Year</th>
                  <th className="px-5 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-white/5 hover:bg-white/6 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-white">{member.name}</td>
                      <td className="px-5 py-3 text-white/60">{member.studentId}</td>
                      <td className="px-5 py-3 text-white/60">{member.email}</td>
                      <td className="px-5 py-3 text-white/60">{member.phoneNumber}</td>
                      <td className="px-5 py-3 text-white/60">{member.department}</td>
                      <td className="px-5 py-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-medium bg-factory-green/15 text-factory-green">
                          {member.year}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => handleModifyMember(member.id)}
                          className="bg-factory-green/15 hover:bg-factory-green text-factory-green hover:text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                        >
                          Modify
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-white/30">
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ShellPanel>
      </div>
    </FactoryPageShell>
  );
}
