'use client';

import React, { useState } from 'react';
import { 
  AlertCircle, 
  Send, 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Copy, 
  Check, 
  Phone, 
  FileText,
  ShieldAlert
} from 'lucide-react';
import { useData } from '@/context/DataContext';

export const GrievanceBox: React.FC = () => {
  const { grievances, addGrievance } = useData();
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');

  // Submit Form State
  const [citizenName, setCitizenName] = useState('');
  const [phone, setPhone] = useState('');
  const [ward, setWard] = useState('ওয়ার্ড ১');
  const [village, setVillage] = useState('');
  const [category, setCategory] = useState<'রাস্তাঘাট' | 'জলাবদ্ধতা ও ড্রেন' | 'বিশুদ্ধ পানি' | 'ঘুষ ও দুর্নীতি' | 'বিদ্যুৎ ও সোলার' | 'অন্যান্য'>('রাস্তাঘাট');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Track State
  const [searchCode, setSearchCode] = useState('');
  const [trackedItem, setTrackedItem] = useState<(typeof grievances)[0] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!citizenName || !phone || !description || !title) return;

    const code = addGrievance({
      title,
      citizenName,
      phone,
      ward,
      village: village || 'যুগিখালী',
      category,
      description,
      photoUrl: photoUrl || undefined
    });

    setCreatedCode(code);
    // Reset form
    setTitle('');
    setDescription('');
    setPhotoUrl('');
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const found = grievances.find(
      g => g.trackingCode.toLowerCase().trim() === searchCode.toLowerCase().trim()
    );
    setTrackedItem(found || null);
  };

  return (
    <section id="grievance" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
            <span>নাগরিক অভিযোগ ও সমস্যা বক্স • Grievance Redressal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ঘরে বসেই ইউনিয়নের যেকোনো সমস্যা জানান
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            এলাকার রাস্তাঘাট ভাঙা, জলাবদ্ধতা, পানীয় জল বা সরকারি সেবা সংক্রান্ত কোনো অনিয়ম হলে নির্ভয়ে আমাদের জানান। সরাসরি চেয়ারম্যান সেল কর্তৃক তদারকি করা হবে।
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex gap-2">
            <button
              onClick={() => { setActiveTab('submit'); setCreatedCode(null); }}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'submit'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Send className="w-4 h-4" />
              নতুন অভিযোগ দাখিল
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'track'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Search className="w-4 h-4" />
              অভিযোগের অগ্রগতি ট্র্যাকিং
            </button>
          </div>
        </div>

        {/* Tab 1: Submit Form */}
        {activeTab === 'submit' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
            {createdCode ? (
              <div className="text-center py-8 space-y-5 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    অভিযোগ সফলভাবে গ্রহণ করা হয়েছে!
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    আপনার সমস্যাটি চেয়ারম্যানের বিশেষ পর্যবেক্ষণ সেলে নিবন্ধিত হয়েছে।
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto">
                  <span className="text-xs text-slate-500 font-semibold uppercase block mb-1">
                    আপনার অভিযোগ ট্র্যাকিং কোড
                  </span>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-mono font-extrabold text-emerald-700 tracking-wider">
                      {createdCode}
                    </span>
                    <button
                      onClick={() => handleCopy(createdCode)}
                      className="p-2 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 transition"
                      title="কোড কপি করুন"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    ভবিষ্যতে অগ্রগতির খোঁজ নিতে এই কোডটি সংরক্ষণ করুন।
                  </p>
                </div>

                <div className="flex justify-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      setSearchCode(createdCode);
                      setActiveTab('track');
                      const found = grievances.find(g => g.trackingCode === createdCode);
                      setTrackedItem(found || null);
                      setSearched(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-sm text-sm"
                  >
                    অবস্থা দেখুন
                  </button>
                  <button
                    onClick={() => setCreatedCode(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-xl transition text-sm"
                  >
                    আরেকটি অভিযোগ দিন
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      আপনার নাম <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মো: আব্দুল্লাহ"
                      value={citizenName}
                      onChange={(e) => setCitizenName(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      মোবাইল নম্বর <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="০১৭১২-XXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      ওয়ার্ড নম্বর <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((w) => (
                        <option key={w} value={`ওয়ার্ড ${w}`}>
                          ওয়ার্ড {w}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      গ্রাম / পাড়ার নাম
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: পূর্ব বিলপাড়া"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      সমস্যার ধরণ <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                    >
                      <option value="রাস্তাঘাট">রাস্তাঘাট ভাঙা / সংস্কার</option>
                      <option value="জলাবদ্ধতা ও ড্রেন">জলাবদ্ধতা ও ড্রেনেজ</option>
                      <option value="বিশুদ্ধ পানি">বিশুদ্ধ পানীয় জল / নলকূপ</option>
                      <option value="ঘুষ ও দুর্নীতি">ঘুষ, দুর্নীতি বা স্বজনপ্রীতি</option>
                      <option value="বিদ্যুৎ ও সোলার">বিদ্যুৎ ও সোলার লাইট</option>
                      <option value="অন্যান্য">অন্যান্য জনসেবা</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    অভিযোগের শিরোনাম <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ৩ নং ওয়ার্ডের প্রধান সংযোগ সড়কের কালভার্ট ভেঙে গেছে"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    সমস্যার বিস্তারিত বিবরণ <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="কোথায় সমস্যাটি, কতদিন ধরে চলছে, এবং জনগণের কী দুর্ভোগ হচ্ছে তা স্পষ্টভাবে লিখুন..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ছবি বা প্রমাণের লিংক (ঐচ্ছিক)
                  </label>
                  <input
                    type="url"
                    placeholder="https://... (ইমেজ বা ড্রাইভ লিংক)"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    মোবাইল দিয়ে তোলা সমস্যার ছবি ফেসবুক বা ইমেজ ড্রাইভে আপলোড করে লিংক দেওয়া যাবে।
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>অভিযোগটি জমা দিন</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Track Status */}
        {activeTab === 'track' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="আপনার ট্র্যাকিং কোড লিখুন (যেমন: JUG-2026-1042)"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-sm text-sm flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  অনুসন্ধান করুন
                </button>
              </form>

              {/* Sample Quick Tracking IDs */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>পরীক্ষা করার জন্য নমুনা কোড:</span>
                {grievances.slice(0, 3).map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setSearchCode(g.trackingCode);
                      setTrackedItem(g);
                      setSearched(true);
                    }}
                    className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-2.5 py-1 rounded-md font-mono font-medium border border-slate-200 transition"
                  >
                    {g.trackingCode}
                  </button>
                ))}
              </div>
            </div>

            {/* Track Result Card */}
            {searched && (
              trackedItem ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md animate-in fade-in space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        {trackedItem.trackingCode}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-2">
                        {trackedItem.title}
                      </h3>
                    </div>
                    <div>
                      {trackedItem.status.includes('সমাধানকৃত') ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          {trackedItem.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <Clock className="w-4 h-4 text-amber-600" />
                          {trackedItem.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block">ক্যাটাগরি</span>
                      <strong className="text-slate-800 font-semibold">{trackedItem.category}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">স্থান</span>
                      <strong className="text-slate-800 font-semibold">{trackedItem.ward}, {trackedItem.village}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">আবেদনকারী</span>
                      <strong className="text-slate-800 font-semibold">{trackedItem.citizenName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">দাখিলের তারিখ</span>
                      <strong className="text-slate-800 font-semibold">{trackedItem.submittedAt}</strong>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1">
                      সমস্যার বিবরণ
                    </h4>
                    <p className="text-sm text-slate-700 bg-slate-50/50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                      {trackedItem.description}
                    </p>
                  </div>

                  {trackedItem.adminResponse && (
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>চেয়ারম্যান সেল ও মনিটরিং টিমের মন্তব্য / পদক্ষেপ:</span>
                      </div>
                      <p className="text-sm text-emerald-950 font-medium leading-relaxed">
                        {trackedItem.adminResponse}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
                  <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
                  <p className="font-bold text-slate-800">কোনো তথ্য পাওয়া যায়নি!</p>
                  <p className="text-xs text-slate-500 mt-1">
                    দয়া করে আপনার ট্র্যাকিং কোডটি সঠিকভাবে যাচাই করে আবার চেষ্টা করুন।
                  </p>
                </div>
              )
            )}
          </div>
        )}

      </div>
    </section>
  );
};
