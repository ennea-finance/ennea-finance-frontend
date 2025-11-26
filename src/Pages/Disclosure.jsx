import React from "react";
import commissionTable from "../images/disclosure.png";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Disclosure = () => {
    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Header */}
            <div className="mx-auto pb-12 pt-40 px-40">
                <p className="text-gray-500 text-md mb-2">
                    Home <span className="text-gray-800">/ Disclosure</span>
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="font-playfair italic text-deepblue">Disclosure</span>
                </h1>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-16 mx-auto px-40 mb-4">
                <div>
                    {/* Heading */}
                    <h1 className="text-3xl font-semibold mb-4">
                        Commission Disclosure
                    </h1>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-6 text-2xl">
                        The firm is offered commissions for mutual fund business sourced under
                        its own ARN code. The commission earned by the firm varies from Fund
                        House to Fund House and from Scheme to Scheme. As per SEBI circular:
                        SEBI/IMD/CIR No. 4/ 168230/09, following are the details of the
                        commission earned by Etica Wealth Pvt Ltd from various AMCs, whose
                        products are being distributed:
                    </p>
                </div>
                {/* Commission Table Image */}
                <div className="flex-shrink-0 w-full md:w-2/5">
                    <img
                        src={commissionTable}
                        alt="Commission Table"
                        className="w-full rounded-lg shadow-md border border-gray-200"
                    />
                </div>
            </div>

            <div className="flex-1 px-40">
                <h2 className="text-2xl font-semibold text-deepblue mb-5">
                    The rates of commission disclosed above:
                </h2>
                <ul className="list-decimal list-inside space-y-6 text-gray-700 leading-relaxed text-2xl">
                    <li>
                        Refers to T30 cities in India as defined by AMFI, and commission
                        could be higher in case of B30 cities.
                    </li>
                    <li>
                        Are subject to change, without any prior consent and at a sole
                        discretion and agreement between Etica Wealth Pvt Ltd and the
                        respective AMCs.
                    </li>
                    <li>
                        For investments subscribed into Regular/Distributor Plan which
                        involves payment of commission to MFD. No upfront commission is
                        paid to/received by Etica Wealth Pvt Ltd.
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
                        Please check the gross commissions earned by Etica Wealth Pvt Ltd
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
                <h2 className="text-2xl font-semibold text-deepblue mb-3">
                    Risk Factors –
                </h2>
                <p className="text-gray-700 leading-relaxed mb-10 text-2xl">
                    Investments in Mutual Funds are subject to Market Risks. Read all scheme
                    related documents carefully before investing. Mutual Fund Schemes do not
                    assure or guarantee any returns. Past performance of any Mutual Fund
                    Scheme may or may not be sustained in future. There is no guarantee that
                    the investment objective of any suggested scheme shall be achieved. All
                    investors are advised to check and evaluate the Exit loads and other
                    cost structure (TER) applicable at the time of making the investment
                    before finalizing any investment decision. We deal in Regular Plans only
                    for Mutual Fund Schemes and earn a Trailing Commission on client
                    investments. Disclosure for Commission earnings is made to clients at
                    the time of investments. Option of Direct Plan for every Mutual Fund
                    Scheme is available to investors offering advantage of lower expense
                    ratio. We do not earn any commission on Direct Plans.
                </p>
            </div>
            <Footer />
        </div>


    );
};

export default Disclosure;
