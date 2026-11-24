import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, FileText, Camera, Loader2, Check } from 'lucide-react';
import { portfolioAPI, uploadAPI } from '../../services/api';

export const PersonalInfoSection = ({ portfolio, onUpdate, showToast }) => {
  const [formData, setFormData] = useState({
    full_name: portfolio?.full_name || '',
    title: portfolio?.title || '',
    bio: portfolio?.bio || '',
    location: portfolio?.location || '',
    phone: portfolio?.phone || '',
    email: portfolio?.email || '',
    avatar_url: portfolio?.avatar_url || '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleAvatarFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingAvatar(true);
      const res = await uploadAPI.uploadAvatar(file);
      setFormData((prev) => ({ ...prev, avatar_url: res.data.avatar_url }));
      onUpdate();
      showToast('Profile photo updated successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to upload photo.', 'error');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await portfolioAPI.updatePersonalInfo(formData);
      onUpdate();
      showToast('Personal information saved successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to save changes.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
        <div className="relative group shrink-0">
          <img
            src={formData.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-2xl object-cover border-2 border-white shadow-sm bg-slate-200"
          />
          <label className="absolute inset-0 bg-black/40 hover:bg-black/50 text-white rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
            <Camera className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-semibold">Change</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarFile}
              disabled={isUploadingAvatar}
            />
          </label>
        </div>

        <div className="space-y-1 text-center sm:text-left flex-1">
          <h3 className="text-sm font-bold text-slate-800">Profile Photo</h3>
          <p className="text-xs text-slate-500">
            Upload a clear square photo (PNG, JPG, or WEBP). It will be displayed prominently across all templates.
          </p>
          {isUploadingAvatar && (
            <p className="text-xs font-semibold text-indigo-600 flex items-center gap-1 justify-center sm:justify-start">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading photo...
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="e.g. Alex Morgan"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Professional Title *
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Full Stack Developer & AI Enthusiast"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@example.com"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Location / City
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. San Francisco, CA"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
          Short Bio / Summary
        </label>
        <div className="relative">
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Write a concise overview of your background, key strengths, passion, and what you aim to achieve..."
            className="w-full p-3.5 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white leading-relaxed"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          Save Personal Information
        </button>
      </div>
    </form>
  );
};
