"use client";

import { useContext } from "react";
import { InventoryContext } from "@/Contexts/InventoryContext";
import FactoryPageShell, { ShellPanel } from "@/components/FactoryPageShell";
import Spinner from "@/components/Spinner";

export default function Inventory() {
  const inventoryContext = useContext(InventoryContext);

  if (!inventoryContext) return <Spinner />;

  const { inventory } = inventoryContext;

  return (
    <FactoryPageShell
      hero={{
        eyebrow: "Admin",
        title: "Inventory",
        description: "All lab equipment and components tracked in one place.",
      }}
    >
      <div className="max-w-360 mx-auto px-6 pb-16">
        <ShellPanel>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white/80">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-white/50 uppercase text-xs tracking-widest">
                  <th className="px-5 py-3 text-left font-semibold">Name</th>
                  <th className="px-5 py-3 text-left font-semibold">Category</th>
                  <th className="px-5 py-3 text-left font-semibold">Qty</th>
                  <th className="px-5 py-3 text-left font-semibold">Brand</th>
                  <th className="px-5 py-3 text-left font-semibold">Model</th>
                  <th className="px-5 py-3 text-left font-semibold">Serial</th>
                  <th className="px-5 py-3 text-left font-semibold">Location</th>
                  <th className="px-5 py-3 text-left font-semibold">State</th>
                  <th className="px-5 py-3 text-left font-semibold">Type</th>
                  <th className="px-5 py-3 text-left font-semibold">Class</th>
                </tr>
              </thead>
              <tbody>
                {inventory.length > 0 ? (
                  inventory.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-white/5 hover:bg-white/6 transition-colors"
                    >
                      <td className="px-5 py-3">{item.name}</td>
                      <td className="px-5 py-3 text-white/60">{item.category}</td>
                      <td className="px-5 py-3">{item.quantity}</td>
                      <td className="px-5 py-3 text-white/60">{item.brand}</td>
                      <td className="px-5 py-3 text-white/60">{item.modelNumber}</td>
                      <td className="px-5 py-3 text-white/60">{item.serialNumber}</td>
                      <td className="px-5 py-3 text-white/60">{item.location}</td>
                      <td className="px-5 py-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-medium bg-factory-green/15 text-factory-green">
                          {item.state}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-white/60">{item.type}</td>
                      <td className="px-5 py-3 text-white/60">{item.class}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="px-5 py-10 text-center text-white/30">
                      No inventory items available.
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
