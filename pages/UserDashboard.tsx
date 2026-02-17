
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { mockApi } from '../services/mockApi';
import { RationCard, ApplicationStatus } from '../types';
import ChatAssistant from '../components/ChatAssistant';

const UserDashboard: React.FC = () => {
  const { user } = useAppContext();
  const [cards, setCards] = useState<RationCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (user) {
      mockApi.getUserApplications(user.id).then(res => {
        setCards(res);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.username}!</p>
        </div>
        <Link to="/apply" className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all">
          <i className="fas fa-plus mr-2"></i> New Application
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <i className="fas fa-history mr-3 text-blue-600"></i>
              My Applications
            </h2>

            {loading ? (
              <div className="py-20 text-center">
                <i className="fas fa-spinner fa-spin text-4xl text-blue-100"></i>
              </div>
            ) : cards.length > 0 ? (
              <div className="space-y-4">
                {cards.map(card => (
                  <div key={card.id} className="p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-bold text-gray-900">{card.cardNumber}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${card.status === ApplicationStatus.APPROVED ? 'bg-green-100 text-green-700' :
                            card.status === ApplicationStatus.PENDING ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                          }`}>
                          {card.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Applied on {new Date(card.appliedDate).toLocaleDateString()}</p>
                      <p className="text-xs font-medium text-gray-400 mt-2 uppercase tracking-wider">{card.cardType} • {card.familyMembers.length} Members</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-2">
                      <Link to={`/status?ref=${card.cardNumber}`} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50">
                        View Details
                      </Link>
                      {card.status === ApplicationStatus.APPROVED && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700">
                          <i className="fas fa-download mr-1"></i> Card
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <i className="fas fa-folder-open text-4xl text-gray-300 mb-4"></i>
                <p className="text-gray-500 mb-4">You haven't submitted any applications yet.</p>
                <Link to="/apply" className="text-blue-600 font-bold hover:underline">Start your first application</Link>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-lg font-bold mb-4">Need Help?</h3>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              Our AI assistant is available 24/7 to answer your questions about the ration card process.
            </p>
            <button
              onClick={() => setShowChat(!showChat)}
              className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all"
            >
              {showChat ? 'Close Assistant' : 'Chat with Assistant'}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold mb-4">Important Notices</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-gray-600">e-KYC mandatory for all family members by Dec 2023.</p>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-gray-600">New subsidy scheme for AAY card holders announced.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {showChat && (
        <div className="fixed bottom-6 right-6 z-50">
          <ChatAssistant isOpen={showChat} onClose={() => setShowChat(false)} />
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
