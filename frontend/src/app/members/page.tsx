"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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

  const [members, setMembers] = useState<Member[]>([]); // State to store members
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]); // State to store filtered members
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [loading, setLoading] = useState<boolean>(true); // State for loading status

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

  // Fetch members from the API using the API key from the .env file
  const fetchMembers = async () => {
    try {
      const apiKey = process.env.VITE_API_KEY; // Access the API key from .env file
      const response = await axios.get("https://factorystrapi.mcgilleus.ca/api/members", {
        headers: {
          Authorization: `Bearer ${apiKey}`, // Use the API key from the environment
        },
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
    const filtered = members.filter((member) =>
      member.name.toLowerCase().includes(searchValue)
    );
    setFilteredMembers(filtered);
  };

  const handleAddMember = () => {
    window.open("/add-member", "_blank");
  };

  const handleModifyMember = (memberId: number) => {
    router.push(`/modify-member/${memberId}`); // Navigate to modify member page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4 font-bold">Members Page</h1>

      {/* Action Buttons */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded-md w-1/2"
        />
        <div>
          <button
            onClick={handleAddMember}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
          >
            Add New Member
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Student ID</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">Department</th>
                <th className="py-2 px-4 border-b">Year</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{member.name}</td>
                    <td className="py-2 px-4 border-b">{member.studentId}</td>
                    <td className="py-2 px-4 border-b">{member.email}</td>
                    <td className="py-2 px-4 border-b">{member.phoneNumber}</td>
                    <td className="py-2 px-4 border-b">{member.department}</td>
                    <td className="py-2 px-4 border-b">{member.year}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleModifyMember(member.id)}
                        className="bg-green-500 text-white py-1 px-3 rounded-md"
                      >
                        Modify
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 text-center">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
