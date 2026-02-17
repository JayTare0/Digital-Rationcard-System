
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { mockApi } from '../services/mockApi';
import { CardType, FamilyMember, RationCard } from '../types';

const Apply: React.FC = () => {
  const { t, user } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<RationCard>>({
    applicantName: '',
    fatherHusbandName: '',
    dob: '',
    gender: 'Male',
    mobileNumber: '',
    email: user?.email || '',
    aadharNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    cardType: CardType.BPL,
    annualIncome: 0,
    familyMembers: [],
    userId: user?.id || 'guest'
  });

  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({
    name: '', relation: '', age: 0, aadharNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.aadharNumber) {
      const member: FamilyMember = {
        ...newMember as FamilyMember,
        id: Math.random().toString(36).substr(2, 9)
      };
      setFormData(prev => ({
        ...prev,
        familyMembers: [...(prev.familyMembers || []), member]
      }));
      setNewMember({ name: '', relation: '', age: 0, aadharNumber: '' });
    }
  };

  const handleRemoveMember = (id: string) => {
    setFormData(prev => ({
      ...prev,
      familyMembers: (prev.familyMembers || []).filter(m => m.id !== id)
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await mockApi.submitApplication(formData);
      alert(`Application Submitted! Your Reference Number: ${result.cardNumber}`);
      navigate('/status');
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = t('apply.steps');

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('apply.title')}</h1>
        <p className="text-gray-500">Please fill out all the details carefully to ensure smooth processing.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((s: string, idx: number) => (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 transition-colors ${
                step > idx + 1 ? 'bg-green-500 border-green-500 text-white' : 
                step === idx + 1 ? 'border-blue-600 text-blue-600 font-bold' : 'border-gray-300 text-gray-400'
              }`}>
                {step > idx + 1 ? <i className="fas fa-check"></i> : idx + 1}
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                step === idx + 1 ? 'text-blue-600' : 'text-gray-400'
              }`}>{s}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-2 h-1 bg-gray-200 rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300 rounded-full"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {step === 1 && (
          <div className="fade-in space-y-6">
            <h2 className="text-xl font-bold border-b pb-2 mb-6">{t('apply.personal.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('apply.personal.fullName')}</label>
                <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('apply.personal.fatherName')}</label>
                <input type="text" name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('apply.personal.dob')}</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('apply.personal.gender')}</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('apply.personal.mobile')}</label>
                <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" maxLength={10} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('apply.personal.aadhar')}</label>
                <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" maxLength={12} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="fade-in space-y-6">
            <h2 className="text-xl font-bold border-b pb-2 mb-6">{t('apply.address.title')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('apply.address.line1')}</label>
                <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('apply.address.line2')}</label>
                <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('apply.address.city')}</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('apply.address.state')}</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('apply.address.pincode')}</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" maxLength={6} />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="fade-in space-y-6">
            <h2 className="text-xl font-bold border-b pb-2 mb-6">{t('apply.details.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('apply.details.type')}</label>
                <div className="space-y-3">
                  {Object.values(CardType).map(type => (
                    <label key={type} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.cardType === type ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
                      <input type="radio" name="cardType" value={type} checked={formData.cardType === type} onChange={handleChange} className="h-4 w-4 text-blue-600 mr-3" />
                      <div>
                        <div className="font-bold">{type}</div>
                        <div className="text-xs text-gray-500">{type === 'BPL' ? 'Below Poverty Line' : type === 'AAY' ? 'Antyodaya Anna Yojana' : 'Above Poverty Line'}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('apply.details.income')}</label>
                  <input type="number" name="annualIncome" value={formData.annualIncome} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="fade-in space-y-6">
            <h2 className="text-xl font-bold border-b pb-2 mb-6">{t('apply.family.title')}</h2>
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
               <h3 className="font-semibold mb-4">{t('apply.family.addMember')}</h3>
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <input type="text" placeholder={t('apply.family.name')} value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} className="p-2.5 border border-gray-300 rounded-lg text-sm" />
                  <input type="text" placeholder={t('apply.family.relation')} value={newMember.relation} onChange={e => setNewMember({...newMember, relation: e.target.value})} className="p-2.5 border border-gray-300 rounded-lg text-sm" />
                  <input type="number" placeholder={t('apply.family.age')} value={newMember.age || ''} onChange={e => setNewMember({...newMember, age: parseInt(e.target.value)})} className="p-2.5 border border-gray-300 rounded-lg text-sm" />
                  <input type="text" placeholder={t('apply.family.aadhar')} value={newMember.aadharNumber} onChange={e => setNewMember({...newMember, aadharNumber: e.target.value})} className="p-2.5 border border-gray-300 rounded-lg text-sm" />
               </div>
               <button onClick={handleAddMember} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700">Add to List</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-sm font-bold text-gray-600">Name</th>
                    <th className="p-3 text-sm font-bold text-gray-600">Relation</th>
                    <th className="p-3 text-sm font-bold text-gray-600">Age</th>
                    <th className="p-3 text-sm font-bold text-gray-600">Aadhar</th>
                    <th className="p-3 text-sm font-bold text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {(formData.familyMembers || []).map(m => (
                    <tr key={m.id}>
                      <td className="p-3 text-sm">{m.name}</td>
                      <td className="p-3 text-sm">{m.relation}</td>
                      <td className="p-3 text-sm">{m.age}</td>
                      <td className="p-3 text-sm">{m.aadharNumber}</td>
                      <td className="p-3">
                        <button onClick={() => handleRemoveMember(m.id)} className="text-red-500 hover:text-red-700">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(formData.familyMembers || []).length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-400 italic">No family members added yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="fade-in space-y-8">
            <h2 className="text-xl font-bold border-b pb-2 mb-6">Review Information</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <h3 className="text-xs font-bold text-blue-600 uppercase mb-2">Personal Information</h3>
                <p className="font-semibold text-lg">{formData.applicantName}</p>
                <p className="text-gray-600 text-sm">Father/Husband: {formData.fatherHusbandName}</p>
                <p className="text-gray-600 text-sm">DOB: {formData.dob}</p>
                <p className="text-gray-600 text-sm">Aadhar: {formData.aadharNumber}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-blue-600 uppercase mb-2">Address</h3>
                <p className="text-gray-600 text-sm">{formData.addressLine1}</p>
                {formData.addressLine2 && <p className="text-gray-600 text-sm">{formData.addressLine2}</p>}
                <p className="text-gray-600 text-sm">{formData.city}, {formData.state} - {formData.pincode}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-blue-600 uppercase mb-2">Card Selection</h3>
                <p className="text-gray-600 text-sm">Type: <span className="font-bold text-gray-900">{formData.cardType}</span></p>
                <p className="text-gray-600 text-sm">Annual Income: ₹{formData.annualIncome}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-blue-600 uppercase mb-2">Family Summary</h3>
                <p className="text-gray-600 text-sm">{formData.familyMembers?.length} Members Listed</p>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg flex items-start">
               <input type="checkbox" className="mt-1 h-4 w-4 text-blue-600 mr-3" required />
               <p className="text-sm text-blue-800">I hereby declare that all the information provided above is true to the best of my knowledge and I agree to the terms and conditions of the Digital Ration Card system.</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-12 flex justify-between">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className={`px-8 py-3 rounded-lg font-bold transition-colors ${
              step === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t('common.prev')}
          </button>
          
          {step < 5 ? (
            <button
              onClick={() => setStep(s => Math.min(5, s + 1))}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              {t('common.next')}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center"
            >
              {loading && <i className="fas fa-spinner fa-spin mr-2"></i>}
              {t('common.submit')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Apply;
