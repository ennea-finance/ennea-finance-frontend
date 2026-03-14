import React from "react";

const CommissionTable = () => {
  return (
    <div className="w-full mx-auto font-satoshi rounded-xl overflow-hidden">

      {/* Scroll wrapper for mobile */}
      <div className="w-full">

        <table className="lg:min-w-[650px] w-full border-collapse text-xs md:text-base lg:text-lg">

          {/* Header */}
          <thead>
            <tr className="bg-deepblue text-white">
              <th className="px-3 md:px-6 py-2 md:py-5 text-left font-semibold border border-gray-300">
                Commission from Mutual Funds
              </th>
              <th className="px-3 md:px-6 py-2 md:py-5 text-left font-semibold border border-gray-300">
                Top 30 Cities
              </th>
            </tr>
          </thead>

          <tbody>

            {/* Fund Schemes */}
            <tr className="bg-gray-100 font-semibold text-deepblue">
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Fund Schemes
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Trail
              </td>
            </tr>

            {/* Equity */}
            <tr className="bg-gray-50 font-semibold">
              <td colSpan={2} className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Equity Schemes
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Equity Funds
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.20% to 1.75%
              </td>
            </tr>

            {/* Hybrid */}
            <tr className="bg-gray-50 font-semibold">
              <td colSpan={2} className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Hybrid Schemes
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Arbitrage Funds
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.45% to 0.80%
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Conservative Hybrid Funds
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.20% to 1.45%
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Other Hybrid Funds
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.25% to 1.75%
              </td>
            </tr>

            {/* Debt */}
            <tr className="bg-gray-50 font-semibold">
              <td colSpan={2} className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Debt Schemes
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Overnight & Liquid Funds
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.01% to 0.20%
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Ultra-Short Duration, Low Duration, Money Market, Short Duration Funds
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.05% to 1.30%
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Credit Risk
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.50% to 1.20%
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Gilt Funds
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.10% to 1.00%
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Floater Funds
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.15% to 0.68%
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Medium, Medium to Long, Long, Dynamic Duration Funds
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.12% to 1.25%
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Corporate Bond, Banking & PSU Funds
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.09% to 0.75%
              </td>
            </tr>

            {/* Other */}
            <tr className="bg-gray-50 font-semibold">
              <td colSpan={2} className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Other Schemes
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Index Funds / ETFs
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.03% to 1.10%
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Fund of Funds
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.05% to 1.25%
              </td>
            </tr>
            <tr>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                Retirement & Children’s Fund
              </td>
              <td className="px-3 md:px-6 py-2 md:py-5 border border-gray-300">
                0.50% to 1.75%
              </td>
            </tr>

          </tbody>
        </table>

      </div>
    </div>
  );
};

export default CommissionTable;