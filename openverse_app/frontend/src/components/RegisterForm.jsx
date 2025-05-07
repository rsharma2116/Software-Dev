import { useState } from 'react';
import API from '../api';

export default function RegisterForm() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful. You can now log in.');
    } catch (err) {
      alert('Registration failed. Username might already exist.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="block w-full p-2 mb-2 border rounded"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        className="block w-full p-2 mb-2 border rounded"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded w-full" type="submit">
        Register
      </button>
    </form>
  );
}
