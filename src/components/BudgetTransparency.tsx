'use client';

import React from 'react';
import { 
  Coins, 
  Landmark, 
  TrendingUp, 
  PieChart, 
  CheckCircle2, 
  ShieldCheck, 
  FileSpreadsheet
} from 'lucide-react';
import { useData } from '@/context/DataContext';

export const BudgetTransparency: React.FC = () => {
  const { budget } = useData();

  return (
    <section id="budget" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Coins className="w-3.5 h-3.5 text-emerald-700" />
            <span>বাজেট স্বচ্ছতা ও নাগরিক অডিট • Financial Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ইউনিয়নের প্রতিটি টাকার হিসাব থাকবে উন্মুক্ত
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            সরকারি অনুদান (ADP / LGSP), স্থানীয় রাজস্ব এবং উন্নয়ন কাজের বরাদ্দের প্রতিটি পয়সা জনগণের সামনে প্রকাশ করা হবে। কোনো লুকোচুরি থাকবে না।
          </p>
        </div>

        {/* Financial Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">মোট বাজেট (অর্থবছর)</span>
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                <Landmark className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{budget.totalBudget}</p>
            <p className="text-xs text-slate-500 mt-1">{budget.fiscalYear}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">সরকারি অনুদান ও এডিপি</span>
              <div className="p-2 bg-blue-50 rounded-xl text-blue-700">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-700">{budget.govGrant}</p>
            <p className="text-xs text-slate-500 mt-1">কেন্দ্রীয় ও স্থানীয় উন্নয়ন বরাদ্দ</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">স্থানীয় রাজস্ব ও ট্যাক্স</span>
              <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                <Coins className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-700">{budget.localTax}</p>
            <p className="text-xs text-slate-500 mt-1">স্থানীয় ব্যবসা ও হোল্ডিং কর</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">উন্নয়ন কাজে ব্যয়িত</span>
              <div className="p-2 bg-purple-50 rounded-xl text-purple-700">
                <PieChart className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-700">{budget.spentAmount}</p>
            <p className="text-xs text-slate-500 mt-1">প্রকল্পভিত্তিক বাস্তবায়ন চলমান</p>
          </div>
        </div>

        {/* Project Breakdown Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-10">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h3 className="font-bold text-lg text-slate-900">
                চলমান ও সমাপ্ত প্রকল্পের বিস্তারিত হিসাব
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                কোন ওয়ার্ডে কত টাকা বরাদ্দ দেওয়া হয়েছে এবং কত টাকা ব্যয় হয়েছে তার উন্মুক্ত তালিকা
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>জিরো টলারেন্স দুর্নীতি নীতি</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-100/75 text-xs uppercase font-bold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">প্রকল্পের নাম ও বিবরণ</th>
                  <th className="py-3.5 px-4">ওয়ার্ড / এলাকা</th>
                  <th className="py-3.5 px-4">মোট বরাদ্দ</th>
                  <th className="py-3.5 px-4">ব্যয়িত অর্থ</th>
                  <th className="py-3.5 px-6 text-right">কাজের অবস্থা</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {budget.projects.map((proj, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {proj.name}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-600">
                      {proj.ward}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-800">
                      {proj.allocated}
                    </td>
                    <td className="py-4 px-4 font-bold text-emerald-700">
                      {proj.spent}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {proj.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Public Audit Pledge Box */}
        <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-800 rounded-2xl shrink-0">
              <FileSpreadsheet className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1">
                প্রতি ৬ মাস অন্তর উন্মুক্ত নাগরিক অডিট সভা
              </h4>
              <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed max-w-2xl">
                মাওলানা আব্দুল লতিফ চেয়ারম্যান নির্বাচিত হলে ইউনিয়নের প্রতিটি টাকা কোথায় ব্যয় হয়েছে তা মাইকিং করে সাধারণ মানুষের সামনে ব্যালেন্সশিট পেশ করবেন।
              </p>
            </div>
          </div>
          <a
            href="#manifesto"
            className="shrink-0 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-6 py-3 rounded-xl transition shadow-sm text-sm"
          >
            অঙ্গীকারনামা পড়ুন
          </a>
        </div>

      </div>
    </section>
  );
};
