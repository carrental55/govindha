"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('admin_token', 'verified');
        router.push('/adminpage');
      } else {
        alert('Incorrect password!');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="mb-4 text-2xl font-bold">Admin Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-72">
        <input type="password" placeholder="Enter Admin Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded" />
        <button type="submit" className="py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}
