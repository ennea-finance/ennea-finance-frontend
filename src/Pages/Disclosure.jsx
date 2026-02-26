import React from "react";
// import commissionTable from "../images/disclosure.png";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CommissionTable from "../Components/CommissionTable";

const Disclosure = () => {
    return (
        <div className="min-h-screen font-satoshi">
            <Navbar />

            {/* Header */}
            <div className="mx-auto pb-12 pt-40 px-40">
                <p className="text-gray-500 text-lg mb-2 font-satoshi">
                    Home <span className="text-gray-900">/ Disclosure</span>
                </p>
                {/* <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="font-playfair italic text-deepblue">Disclosure</span>
                </h1> */}
            </div>

            <div className="items-start gap-16 mx-auto px-40 mb-4">
                <div>
                    {/* Heading */}
                    <h1 className="text-4xl text-deepblue font-semibold mb-4">
                        Commission Disclosure
                    </h1>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-6 text-2xl text-justify">
                        The firm, Ennea Financial Services LLP, is registered as a Mutual Fund Distributor with AMFI and earns commissions on mutual fund transactions executed under its own ARN. The commission structure differs across Asset Management Companies (AMCs) and may also vary between individual mutual fund schemes. In line with SEBI Circular SEBI/IMD/CIR No. 4/168230/09, we disclose below the nature of commissions received from AMCs whose mutual fund products are distributed by us.
                    </p>
                </div>
                {/* Commission Table Image */}
                <div className="flex-shrink-0 w-full my-16">
                    <CommissionTable />
                </div>
            </div>

            <div className="flex-1 px-40 mt-6">
                <h2 className="text-3xl font-semibold text-deepblue my-5">
                    The rates of commission disclosed above:
                </h2>
                <ul className="list-decimal list-inside space-y-6 text-gray-700 leading-relaxed text-2xl text-justify">
                    <li>
                        Refers to T30 cities in India as defined by AMFI, and commission
                        could be higher in case of B30 cities.
                    </li>
                    <li>
                        Are subject to change, without any prior consent and at a sole
                        discretion and agreement between Ennea Financial Services LLP and the
                        respective AMCs.
                    </li>
                    <li>
                        For investments subscribed into Regular/Distributor Plan which
                        involves payment of commission to MFD. No upfront commission is
                        paid to/received by Ennea Financial Services LLP.
                    </li>
                    <li>
                        Details of scheme-level commission on Mutual Funds are available
                        with your Wealth/Relationship Manager and would be provided on
                        request.
                    </li>
                    <li>
                        This information is compiled on a best-effort basis and rates are
                        updated as and when they are received from AMCs.
                    </li>
                    <li>
                        Please check the gross commissions earned by Ennea Financial Services LLP
                        in any particular FY by visiting:{" "}
                        <a
                            href="https://www.amfiindia.com/commission-disclosure"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-deepblue underline hover:text-blue-800"
                        >
                            www.amfiindia.com/commission-disclosure
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex-1 px-40 my-24">
                {/* Risk Factors */}
                <h2 className="text-3xl font-semibold text-deepblue mb-3">
                    Risk Factors –
                </h2>
                <p className="text-gray-700 leading-relaxed mb-10 text-2xl text-justify">
                    Investments in Mutual Funds are subject to Market Risks. Read all scheme related documents carefully before investing. Mutual Fund Schemes do not assure or guarantee any returns. Past performances of any Mutual Fund Scheme may or may not be sustained in future. There is no guarantee that the investment objective of any suggested scheme shall be achieved. All existing and prospective investors are advised to check and evaluate the Exit loads and other cost structure (TER) applicable at the time of making the investment before finalizing on any investment decision for Mutual Funds schemes. Ennea Financial Services LLP distributes Regular Plans of Mutual Fund schemes only and earns a trail commission on client investments. Commission disclosures are made to clients at the time of investment. Investors are informed that option for Direct Plans are available for all Mutual Fund schemes offering advantage of lower expense ratio. We are not entitled to earn any commission on Direct plans. Hence we do not deal in Direct Plans.
                </p>
            </div>
            <Footer />
        </div>


    );
};

export default Disclosure;
