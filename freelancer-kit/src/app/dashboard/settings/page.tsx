"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import { Toaster, toast } from 'react-hot-toast';
import { LogOut, KeyRound, AlertTriangle, Loader2 } from 'lucide-react';

export default function Settings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Password state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Delete account state
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/login');
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsUpdating(true);
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      toast.error(`Update failed: ${error.message}`);
    } else {
      toast.success('Password updated successfully');
      setPassword('');
      setConfirmPassword('');
    }
    setIsUpdating(false);
  };

  const handleLogout = async () => {
    setIsUpdating(true);
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    router.replace('/');
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }
    
    setIsDeleting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.replace('/login');
        return;
      }

      // We call our backend API to delete the account
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://freelancerkit.onrender.com';
      const response = await fetch(`${API_URL}/api/user/account`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete account');
      }

      toast.success('Account deleted successfully');
      await supabase.auth.signOut();
      router.replace('/');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-gray-950 transition-colors">
      <Toaster position="top-center" />
      
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-800">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-gray-100 tracking-tight">Account Settings</h1>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Manage your security and account preferences.</p>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-200 dark:border-gray-800 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-gray-200">Change Password</h2>
          </div>
          
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2 text-slate-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2 text-slate-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                placeholder="Confirm new password"
              />
            </div>
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isUpdating || !password || !confirmPassword}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50 flex items-center"
              >
                {isUpdating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Global Actions Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-200 dark:border-gray-800 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400">
              <LogOut className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-gray-200">Session</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">
            Sign out of your active session on this device.
          </p>
          <button
            onClick={handleLogout}
            disabled={isUpdating}
            className="border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300 px-5 py-2 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50 flex items-center"
          >
            {isUpdating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Sign Out
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-950/20 rounded-xl shadow-sm border border-red-200 dark:border-red-900/50 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg text-red-600 dark:text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-red-800 dark:text-red-200">Danger Zone</h2>
          </div>
          <p className="text-sm text-red-700 dark:text-red-300 mb-4">
            Deleting your account is permanent. All your data, saved documents, and lifetime access will be permanently erased.
          </p>
          
          <div className="space-y-4 max-w-sm">
            <div>
              <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                Type <span className="font-bold border bg-red-100 dark:bg-red-900/50 px-1 rounded">DELETE</span> to confirm
              </label>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="w-full bg-white dark:bg-gray-900 border border-red-300 dark:border-red-800 rounded-lg px-4 py-2 text-slate-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 outline-none transition-colors"
                placeholder="DELETE"
              />
            </div>
            <button
              onClick={handleDeleteAccount}
              disabled={isDeleting || deleteConfirmation !== 'DELETE'}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50 flex items-center w-full justify-center"
            >
              {isDeleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Permanently Delete Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
