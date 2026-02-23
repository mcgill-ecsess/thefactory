"use client";

import { useContext } from "react";
import { InventoryContext } from "@/Contexts/InventoryContext";

export default function Inventory() {
  const inventoryContext = useContext(InventoryContext);

  if (!inventoryContext) {
    return <p>Loading...</p>; // Handle loading state
  }

  const { inventory } = inventoryContext;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Inventory List</h1>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Model Number</th>
            <th className="border px-4 py-2">Serial Number</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">State</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Class</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length > 0 ? (
            inventory.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.category}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.brand}</td>
                <td className="border px-4 py-2">{item.modelNumber}</td>
                <td className="border px-4 py-2">{item.serialNumber}</td>
                <td className="border px-4 py-2">{item.location}</td>
                <td className="border px-4 py-2">{item.state}</td>
                <td className="border px-4 py-2">{item.type}</td>
                <td className="border px-4 py-2">{item.class}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="border px-4 py-2 text-center">
                No inventory items available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
