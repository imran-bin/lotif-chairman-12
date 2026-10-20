'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Search, 
  BarChart3, 
  Building2, 
  Calendar, 
  MapPin, 
  FileText
} from 'lucide-react';
import { useData } from '@/context/DataContext';

export const PromiseTracker: React.FC = () => {
  const { promises } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['সকল', 'সুশাসন', 'নাগরিক সেবা', 'অবকাঠামো', 'স্বাস্থ্য ও শিক্ষা', 'কৃষি ও অর্থনীতি'];

  const filteredPromises = promises.filter((item) => {
    const matchesCategory = selectedCategory === 'সকল' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Calculate stats
  const total = promises.length;
  const completed = promises.filter(p => p.progress === 100).length;
  const inProgress = promises.filter(p => p.progress > 0 && p.progress < 100).length;
  const averageProgress = Math.round(promises.reduce((acc, p) => acc + p.progress, 0) / (total || 1));

  const getStatusBadge = (status: string, progress: number) => {
    if (progress === 100) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          বাস্তবায়িত (১০০%)
        </span>
      );
    }
    if (progress > 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
          <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
          চলমান ({progress}%)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
        পরিকল্পনাধীন
      </span>
    );
  };

  const getProgressBarColor = (progress: number) => {
    if (progress >= 80) return 'bg-emerald-600';
    if (progress >= 40) return 'bg-amber-500';
    return 'bg-blue-500';
  };

  return (
    <section id="tracker" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Description */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            <span>স্মার্ট প্রমিজ ট্র্যাকার • Accountability Dashboard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            রিয়েল-টাইম নির্বাচনী প্রতিশ্রুতি ট্র্যাকার
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            কোন কাজটি কত শতাংশ বাস্তবায়িত হলো তা রিয়েল-টাইমে স্বচ্ছভাবে পর্যবেক্ষণ করুন। কোনো ফাঁকি বা লুকোচুরি থাকবে না।
          </p>
        </div>

        {/* Accountability Stat Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-center">
            <span className="text-xs text-slate-500 font-semibold block mb-1">মোট প্রধান প্রতিশ্রুতি</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{total} টি</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 text-center">
            <span className="text-xs text-emerald-700 font-semibold block mb-1">বাস্তবায়িত / রেডি</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{completed} টি</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 text-center">
            <span className="text-xs text-amber-700 font-semibold block mb-1">কার্যক্রম চলমান</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-700">{inProgress} টি</span>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 text-center">
            <span className="text-xs text-blue-700 font-semibold block mb-1">গড় বাস্তবায়ন অগ্রগতি</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-700">{averageProgress}%</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="প্রতিশ্রুতি খুঁজুন (যেমন: ড্রেন, অ্যাম্বুলেন্স)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Promises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPromises.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {item.category}
                  </span>
                  {getStatusBadge(item.status, item.progress)}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Progress Bar Container */}
                <div className="space-y-1.5 mb-5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-600">বাস্তবায়ন অগ্রগতি</span>
                    <span className="text-emerald-700 font-extrabold text-sm">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${getProgressBarColor(item.progress)}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Meta details footer */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>সময়সীমা: <strong className="text-slate-700">{item.targetDate}</strong></span>
                </div>
                {item.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{item.location}</span>
                  </div>
                )}
                {item.budgetAllocated && (
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>বরাদ্দ: <strong className="text-emerald-700">{item.budgetAllocated}</strong></span>
                  </div>
                )}
                {item.lastUpdated && (
                  <div className="flex items-center gap-1 col-span-2 text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                    <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate font-medium">{item.lastUpdated}</span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {filteredPromises.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">কোনো প্রতিশ্রুতি পাওয়া যায়নি। অন্য ক্যাটাগরি বা শব্দ দিয়ে চেষ্টা করুন।</p>
          </div>
        )}

      </div>
    </section>
  );
};
