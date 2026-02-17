
import React, { useState } from 'react';
import { useAppContext } from '../App';
import { mockApi } from '../services/mockApi';
import { RationCard, ApplicationStatus } from '../types';

const Status: React.FC = () => {
  const { t } = useAppContext();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RationCard | null>(null);
  const [error, setError] = useState('');

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const card = await mockApi.getApplicationByAadhar(query);
      if (card) {
        setResult(card);
      } else {
        setError('No application found with these details. Please check and try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.PENDING: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case ApplicationStatus.APPROVED: return 'bg-green-100 text-green-800 border-green-200';
      case ApplicationStatus.REJECTED: return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('status.title')}</h1>
        <p className="text-gray-500">Track the progress of your ration card application in real-time.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <form onSubmit={handleCheckStatus} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('status.placeholder')}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[180px]"
          >
            {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-search mr-2"></i>}
            {t('status.button')}
          </button>
        </form>
        {error && <p className="mt-4 text-red-600 text-sm font-medium">{error}</p>}
      </div>

      {result && (
        <div className="fade-in bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 p-6 border-b flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Application Ref</p>
              <h2 className="text-2xl font-bold text-gray-900">{result.cardNumber}</h2>
            </div>
            <div className={`px-4 py-2 rounded-full border text-sm font-bold ${getStatusColor(result.status)}`}>
              {result.status}
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-10">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase mb-1">Applicant Name</p>
                <p className="font-semibold">{result.applicantName}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase mb-1">Aadhar Number</p>
                <p className="font-semibold">**** **** {result.aadharNumber.slice(-4)}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase mb-1">Applied Date</p>
                <p className="font-semibold">{new Date(result.appliedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase mb-1">Card Type</p>
                <p className="font-semibold">{result.cardType}</p>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-6">Application Timeline</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="relative pl-10 mb-8">
                  <div className="absolute left-2.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white ring-4 ring-green-50"></div>
                  <p className="text-sm font-bold text-gray-900">{t('status.timeline.applied')}</p>
                  <p className="text-xs text-gray-500">{new Date(result.appliedDate).toLocaleString()}</p>
                </div>

                <div className="relative pl-10 mb-8">
                  <div className={`absolute left-2.5 w-3.5 h-3.5 rounded-full border-2 border-white ring-4 ${
                    result.status === ApplicationStatus.PENDING ? 'bg-blue-500 ring-blue-50 animate-pulse' : 'bg-green-500 ring-green-50'
                  }`}></div>
                  <p className="text-sm font-bold text-gray-900">{t('status.timeline.verifying')}</p>
                  <p className="text-xs text-gray-500">Local inspector verification in progress</p>
                </div>

                {result.status !== ApplicationStatus.PENDING && (
                  <div className="relative pl-10">
                    <div className={`absolute left-2.5 w-3.5 h-3.5 rounded-full border-2 border-white ring-4 ${
                      result.status === ApplicationStatus.APPROVED ? 'bg-green-500 ring-green-50' : 'bg-red-500 ring-red-50'
                    }`}></div>
                    <p className="text-sm font-bold text-gray-900">
                      {result.status === ApplicationStatus.APPROVED ? t('status.timeline.approved') : t('status.timeline.rejected')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {result.approvedDate ? new Date(result.approvedDate).toLocaleString() : 'Action completed'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {result.status === ApplicationStatus.APPROVED && (
              <div className="mt-10 pt-8 border-t">
                <button className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center">
                  <i className="fas fa-download mr-2"></i>
                  Download Digital Ration Card
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
