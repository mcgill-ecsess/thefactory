"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const memberData = {
        id: response.data.data.id,
        ...response.data.data.attributes,
      };
      setMember(memberData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching member details:", error);
      setError("Failed to load member details.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (member) {
      setMember({
        ...member,
        [e.target.name]: e.target.value,
      });
    }
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
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Member updated successfully!");
        setTimeout(() => {
          router.push("/members");
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating member:", error);
      setError("Failed to update member. Please try again.");
    }
  };

  // Handler for the "Back" button
  const handleBack = () => {
    router.back(); // This navigates back to the previous page (Members page)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Modify Member</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={member?.name || ""}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label className="block">Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={member?.studentId || ""}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={member?.email || ""}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label className="block">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={member?.phoneNumber || ""}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label className="block">Department:</label>
          <select
            name="department"
            value={member?.department || "Computer Engineering"}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          >
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Materials Engineering">Materials Engineering</option>
            <option value="Mining Engineering">Mining Engineering</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Bioengineering">Bioengineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block">Year:</label>
          <select
            name="year"
            value={member?.year || "U0"}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          >
            <option value="U0">U0</option>
            <option value="U1">U1</option>
            <option value="U2">U2</option>
            <option value="U3">U3</option>
            <option value="U4+">U4+</option>
          </select>
        </div>

        <div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Update Member
          </button>
        </div>

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
