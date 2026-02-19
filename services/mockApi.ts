import { RationCard, User, ApplicationStatus } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || '';

export const mockApi = {
  // Application CRUD
  async submitApplication(data: Partial<RationCard>): Promise<RationCard> {
    const response = await fetch(`${BASE_URL}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to submit application');
    return response.json();
  },

  async getApplicationByAadhar(aadhar: string): Promise<RationCard | null> {
    const response = await fetch(`${BASE_URL}/api/applications/aadhar/${aadhar}`);
    if (!response.ok) throw new Error('Failed to fetch application');
    return response.json();
  },

  async getUserApplications(userId: string): Promise<RationCard[]> {
    const response = await fetch(`${BASE_URL}/api/applications/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user applications');
    return response.json();
  },

  async getAllApplications(): Promise<RationCard[]> {
    const response = await fetch(`${BASE_URL}/api/applications`);
    if (!response.ok) throw new Error('Failed to fetch applications');
    return response.json();
  },

  async updateStatus(id: string, status: ApplicationStatus): Promise<boolean> {
    const response = await fetch(`${BASE_URL}/api/applications/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return response.ok;
  },

  async login(email: string, password: string): Promise<User | null> {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 404) return null;
    if (response.status === 401) throw new Error('Incorrect password');
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  async register(username: string, email: string, password: string): Promise<User> {
    const response = await fetch(`${BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Registration failed');
    }
    return response.json();
  },

  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/api/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async deleteUser(id: string): Promise<boolean> {
    const response = await fetch(`${BASE_URL}/api/users/${id}`, { method: 'DELETE' });
    return response.ok;
  },

  async createUser(user: Partial<User> & { password: string }): Promise<User> {
    const response = await fetch(`${BASE_URL}/api/users/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to create user');
    }
    return response.json();
  },

  getCards(): RationCard[] {
    return [];
  },

  getUsers(): User[] {
    return [];
  }
};