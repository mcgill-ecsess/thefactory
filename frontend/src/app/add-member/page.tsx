"use client";

import { useState } from "react";
import axios from "axios";

type Member = {
  name: string;
  studentId: string;
  email: string;
  phoneNumber: string;
  department: string;
  year: string;
};

export default function AddMember() {
  const [formData, setFormData] = useState<Member>({
    name: "",
    studentId: "",
    email: "",
    phoneNumber: "",
    department: "Computer Engineering", // default value
    year: "U0", // default value
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post(
        "https://factorystrapi.mcgilleus.ca/api/members",
        {
          data: {
            name: formData.name,
            studentId: formData.studentId,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            department: formData.department,
            year: formData.year,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Member added successfully!");
        setFormData({
          name: "",
          studentId: "",
          email: "",
          phoneNumber: "",
          department: "Computer Engineering",
          year: "U0",
        });

        // Close the tab after successful form submission
        setTimeout(() => {
          window.close();
        }, 2000);
      } else {
        setErrorMessage("Something went wrong, please try again.");
      }
    } catch (error) {
      setErrorMessage("Error adding member. Please check the input or try again later.");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl mb-6 font-bold text-center">Factory Membership Agreement Form</h1>
      <p className="text-gray-600 mb-6 text-justify">
        This membership agreement is made between The Factory, a lab under the direction of the
        Electrical, Computer and Software Engineering Student Society (ECSESS) of McGill
        University, and the undersigned member. This agreement is made because the member wishes to
        receive and The Factory wishes to provide services in the form of hardware rental services,
        tutorial and workshop sessions, equipment accessibility, defined herein.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Department:</label>
          <select
            name="department"
            value={formData.department}
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
          <label className="block font-semibold">Year:</label>
          <select
            name="year"
            value={formData.year}
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
          <label className="block font-semibold">Safety Contract:</label>
          <p className="text-gray-600 mb-4">
            The Factory is a hardware development laboratory that makes different types of equipment
            readily available to students at McGill University. Lab membership requires that all
            procedural and safety rules be followed at all times.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4">
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

          <input type="checkbox" required className="mr-2" />
          <span className="text-gray-600">I understand:</span>
        </div>

        <div>
          <label className="block font-semibold">Agreement:</label>
          <p className="text-gray-600 mb-4">
            I fully understand and acknowledge the risks associated with working in The Factory
            alongside potentially dangerous electrical equipment.
          </p>

          <label className="block font-semibold">Please enter your full name:</label>
          <input
            type="text"
            name="fullName"
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>

        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
}
