
import React, { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';
import { RationCard, ApplicationStatus } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'APPLICATIONS' | 'USERS'>('APPLICATIONS');

  // Application State
  const [cards, setCards] = useState<RationCard[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [filter, setFilter] = useState<ApplicationStatus | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // User State
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'user' });

  const loadApps = async () => {
    setLoadingApps(true);
    const data = await mockApi.getAllApplications();
    setCards(data);
    setLoadingApps(false);
  };

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const data = await mockApi.getAllUsers();
      setUsers(data);
    } catch (e) {
      console.error("Failed to load users", e);
    }
    setLoadingUsers(false);
  };

  useEffect(() => {
    if (activeTab === 'APPLICATIONS') loadApps();
    else loadUsers();
  }, [activeTab]);

  const handleAppAction = async (id: string, status: ApplicationStatus) => {
    if (window.confirm(`Are you sure you want to ${status.toLowerCase()} this application?`)) {
      await mockApi.updateStatus(id, status);
      loadApps();
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      await mockApi.deleteUser(id);
      loadUsers();
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mockApi.createUser(newUser);
      setShowCreateUser(false);
      setNewUser({ username: '', email: '', role: 'user' });
      loadUsers();
      alert('User created successfully');
    } catch (err: any) {
      alert('Failed to create user: ' + err.message);
    }
  };

  const filteredCards = cards.filter(c => {
    const matchesFilter = filter === 'ALL' || c.status === filter;
    const matchesSearch = c.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cardNumber.includes(searchTerm) ||
      c.aadharNumber.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const stats = {
    total: cards.length,
    pending: cards.filter(c => c.status === ApplicationStatus.PENDING).length,
    approved: cards.filter(c => c.status === ApplicationStatus.APPROVED).length,
    rejected: cards.filter(c => c.status === ApplicationStatus.REJECTED).length,
    users: users.length // Only correct if users loaded, but good enough for now
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
          <p className="text-gray-500">Manage digital ration card system.</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => setActiveTab('APPLICATIONS')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'APPLICATIONS' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border'}`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveTab('USERS')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'USERS' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border'}`}
          >
            User Management
          </button>
        </div>
      </div>

      {/* Stats Section - Show general stats always or contextual? Let's show relevant stats based on tab or mixed */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Total Applications</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-yellow-500 uppercase mb-1">Pending Apps</p>
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-green-500 uppercase mb-1">Approved Apps</p>
          <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
        </div>
        {/* If on Users tab, show total users? For now showing Apps stats mostly as requested */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-500"></div>
          <p className="text-xs font-bold text-blue-500 uppercase mb-1">System Users</p>
          <p className="text-2xl font-bold text-gray-900">{activeTab === 'USERS' ? users.length : '-'}</p>
          <p className="text-[10px] text-gray-400">View users tab for details</p>
        </div>
      </div>

      {activeTab === 'APPLICATIONS' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search by Name, RC or Aadhar..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg outline-none text-sm"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              {['ALL', ...Object.values(ApplicationStatus)].map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s as any)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Applicant</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">RC Number</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Details</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loadingApps ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center"><i className="fas fa-spinner fa-spin text-2xl text-blue-600"></i></td>
                  </tr>
                ) : filteredCards.length > 0 ? (
                  filteredCards.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{c.applicantName}</div>
                        <div className="text-xs text-gray-500">ID: {c.aadharNumber}</div>
                      </td>
                      <td className="p-4 font-mono text-sm">{c.cardNumber}</td>
                      <td className="p-4">
                        <div className="text-xs text-gray-600">{c.cardType} • {c.familyMembers?.length || 0} Members</div>
                        <div className="text-xs text-gray-400 italic">Income: ₹{c.annualIncome}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${c.status === ApplicationStatus.APPROVED ? 'bg-green-100 text-green-700' :
                            c.status === ApplicationStatus.PENDING ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                          }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button onClick={() => handleAppAction(c.id, ApplicationStatus.APPROVED)} className="h-8 w-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-100" title="Approve">
                            <i className="fas fa-check"></i>
                          </button>
                          <button onClick={() => handleAppAction(c.id, ApplicationStatus.REJECTED)} className="h-8 w-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-100" title="Reject">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-gray-400">No matching applications found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* USER MANAGEMENT TAB */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search Users by Name or Email..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg outline-none text-sm"
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowCreateUser(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2"
            >
              <i className="fas fa-plus"></i> Create User
            </button>
          </div>

          {/* Create User Form - Inline or Modal? Let's do simple inline if active */}
          {showCreateUser && (
            <div className="bg-blue-50 p-6 border-b border-blue-100 animate-fade-in">
              <h3 className="font-bold text-blue-900 mb-4">Create New User</h3>
              <form onSubmit={handleCreateUser} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="w-full md:w-1/4">
                  <label className="text-xs font-bold text-blue-800 uppercase block mb-1">Username</label>
                  <input required type="text" className="w-full p-2 rounded border border-blue-200 outline-none"
                    value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
                </div>
                <div className="w-full md:w-1/4">
                  <label className="text-xs font-bold text-blue-800 uppercase block mb-1">Email</label>
                  <input required type="email" className="w-full p-2 rounded border border-blue-200 outline-none"
                    value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                </div>
                <div className="w-full md:w-1/4">
                  <label className="text-xs font-bold text-blue-800 uppercase block mb-1">Role</label>
                  <select className="w-full p-2 rounded border border-blue-200 outline-none"
                    value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700">Create</button>
                  <button type="button" onClick={() => setShowCreateUser(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded font-bold hover:bg-gray-300">Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Username</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Email</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Role</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Joined Date</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loadingUsers ? (
                  <tr><td colSpan={5} className="p-20 text-center"><i className="fas fa-spinner fa-spin text-2xl text-blue-600"></i></td></tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-900">{u.username}</td>
                      <td className="p-4 text-gray-600">{u.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        <button onClick={() => handleDeleteUser(u.id)} className="h-8 w-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-100" title="Delete User">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="p-10 text-center text-gray-400">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};


export default AdminDashboard;
