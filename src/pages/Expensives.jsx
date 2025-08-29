import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import appData from "../app.json";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import "../App.css";

const ExpenseTracker = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const formatCurrency = (amount) => {
    const absAmount = Math.abs(amount);
    return `$${absAmount.toFixed(2)}`;
  };

  const formatBalance = (amount) => {
    if (amount < 0) {
      return `-$${Math.abs(amount).toFixed(2)}`;
    }
    return `$${amount.toFixed(2)}`;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <div className="relative">
          <div
            className="
    w-[90%] sm:w-[85%] md:w-[85%] lg:w-[90%] h-32 sm:h-32 md:h-60 lg:h-80 mx-auto bg-gradient-to-r from-cyan-400 via-teal-400 to-yellow-400 rounded-b-3xl md:rounded-2xl bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(45deg, rgba(6, 182, 212, 0.8), rgba(20, 184, 166, 0.8), rgba(251, 191, 36, 0.8)), url(${appData.trip.image})`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-4xl md:text-5xl font-bold text-center drop-shadow-lg">
                {appData.trip.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-4 md:px-8 py-6 md:py-8  w-[90%] mx-auto ">
          {isMobile ? (
            // Mobile Layout
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${appData.trip.totalSpent.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Your Share</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${appData.trip.yourShare.toFixed(2)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Balance</p>
                <p
                  className={`text-2xl font-bold ${
                    appData.trip.balance < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {formatBalance(appData.trip.balance)}
                </p>
              </div>
            </div>
          ) : (
            // Desktop Layout
            <div className="grid grid-cols-3 gap-8 ">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${appData.trip.totalSpent.toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Your Share</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${appData.trip.yourShare.toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Balance</p>
                <p
                  className={`text-3xl font-bold ${
                    appData.trip.balance < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {formatBalance(appData.trip.balance)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs - Desktop Only */}
        {!isMobile && (
          <div className=" md:px-8 mb-6 flex items-center w-[90%] gap-5 mx-auto ">
            <div className="flex bg-gray-100 rounded-lg p-1 w-fit ">
              <button className="px-6 py-2 bg-teal-500 text-white rounded-md font-medium">
                Expenses
              </button>
              <button className="px-6 py-2 text-gray-600 hover:bg-white rounded-md font-medium">
                Balances
              </button>
              <button className="px-6 py-2 text-gray-600 hover:bg-white rounded-md font-medium">
                Members
              </button>
              <button className="px-6 py-2 text-gray-600 hover:bg-white rounded-md font-medium">
                Reports
              </button>
            </div>
            <div className="flex justify-end ">
              <button className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition-colors">
                <Plus size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Expenses Section */}
        <div className="px-4 relative md:px-8 pb-6 w-[90%] mx-auto  ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {isMobile ? "Recent Expenses" : "Expenses"}
            </h2>
            {isMobile && (
              <div className="flex justify-center w-full absolute left-0  bottom-1 z-[999999]">
                <button className="bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-full shadow-lg transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Expense List */}
          <div className="space-y-2 grid lg:grid-cols-2 grid-cols-1 gap-4">
            {(isMobile ? appData.mobileExpenses : appData.expenses).map(
              (expense) => (
                <div
                  key={expense.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-fit  "
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="text-2xl">{expense.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                          {expense.title}
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm">
                          Paid by {expense.paidBy}
                          {!isMobile && expense.type && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{expense.type}</span>
                            </>
                          )}
                          {!isMobile && expense.date && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{expense.date}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold text-lg ${
                          isMobile ? "text-red-500" : "text-gray-900"
                        }`}
                      >
                        {isMobile
                          ? formatBalance(expense.amount)
                          : formatCurrency(expense.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Smart Features Section - Desktop Only */}
        {!isMobile && (
          <div className="px-4 md:px-8 pb-8 w-[90%] mx-auto ">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Smart Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-teal-500 rounded"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Currency Converter
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Real-time exchange rates
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Settle via UPI/PayPal
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Easy payments & transfers
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Expense Reminders
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Never miss a payment
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Gamified Badges
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Celebrate financial milestones
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-purple-500 rounded"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Trip Notes & Chat
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Collaborate with friends
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-14">
            <div className="flex justify-around px-1">
              <button className="flex flex-col items-center py-2 text-teal-500">
                <div className="w-6 h-6 mb-1 bg-teal-500 rounded"></div>
                <span className="text-xs font-medium">Expenses</span>
              </button>
              <button className="flex flex-col items-center py-2 text-gray-400">
                <div className="w-6 h-6 mb-1 bg-gray-400 rounded"></div>
                <span className="text-xs">Balances</span>
              </button>
              <button className="flex flex-col items-center py-2 text-gray-400">
                <div className="w-6 h-6 mb-1 bg-gray-400 rounded"></div>
                <span className="text-xs">Members</span>
              </button>
              <button className="flex flex-col items-center py-2 text-gray-400">
                <div className="w-6 h-6 mb-1 bg-gray-400 rounded"></div>
                <span className="text-xs">Reports</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ExpenseTracker;
