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
  ShieldAlert,
  X,
  Sparkles
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { jugikhaliWards } from '@/data/initialData';

export const GrievanceModal: React.FC = () => {
  const { isGrievanceModalOpen, openGrievanceModal, closeGrievanceModal, grievances, addGrievance } = useData();
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');

  // Submit Form State
  const [citizenName, setCitizenName] = useState('');
  const [phone, setPhone] = useState('');
  const [ward, setWard] = useState(jugikhaliWards[0].name);
  const [village, setVillage] = useState(jugikhaliWards[0].villages[0]);
  const [customVillage, setCustomVillage] = useState('');
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

  const handleWardChange = (newWard: string) => {
    setWard(newWard);
    const wardObj = jugikhaliWards.find(w => w.name === newWard);
    if (wardObj && wardObj.villages.length > 0) {
      setVillage(wardObj.villages[0]);
    } else {
      setVillage('অন্যান্য');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!citizenName.trim() || !phone.trim() || !description.trim() || !title.trim()) return;

    const finalVillage = village === 'অন্যান্য' ? (customVillage.trim() || 'যুগিখালী') : village;

    const code = addGrievance({
      title: title.trim(),
      citizenName: citizenName.trim(),
      phone: phone.trim(),
      ward,
      village: finalVillage,
      category,
      description: description.trim(),
      photoUrl: photoUrl.trim() || undefined
    });

    setCreatedCode(code);
    setTitle('');
    setDescription('');
    setPhotoUrl('');
    setCustomVillage('');
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
    <>
      {/* Floating Action Button (Always Accessible on Every Page) */}
      {!isGrievanceModalOpen && (
        <button
          onClick={openGrievanceModal}
          className="fixed bottom-6 right-5 z-40 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-3 rounded-full shadow-2xl border-2 border-amber-300 flex items-center gap-2.5 glow-amber cursor-pointer transition-all hover:scale-105 active:scale-95 group"
          title="নাগরিক অভিযোগ ও সমস্যা জানান"
        >
          <div className="relative">
            <AlertCircle className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-600" />
          </div>
          <span className="text-xs sm:text-sm font-black pr-0.5">অভিযোগ জানান</span>
        </button>
      )}

      {/* Modal Popup Dialog */}
      {isGrievanceModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
          onClick={closeGrievanceModal}
        >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-500/40 relative my-auto max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing Top Ambient Strip */}
        <div className="h-2 bg-gradient-to-r from-emerald-600 via-teal-400 to-amber-500 shadow-sm" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-start justify-between gap-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-2 shadow-xs">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>জনতার অভিযোগ ও সরাসরি সমস্যা বক্স</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              ১২ নং যুগিখালী চেয়ারম্যান সেল
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              রাস্তাঘাট, সুপেয় পানি, ড্রেনেজ বা অনিয়ম সংক্রান্ত যেকোনো তথ্য সরাসরি জানান।
            </p>
          </div>

          <button
            onClick={closeGrievanceModal}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition shrink-0 active:scale-95"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="p-3 sm:px-6 bg-slate-50 border-b border-slate-200 flex gap-2">
          <button
            onClick={() => { setActiveTab('submit'); setCreatedCode(null); }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'submit'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Send className="w-4 h-4 shrink-0" />
            <span>নতুন অভিযোগ দাখিল</span>
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'track'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4 shrink-0" />
            <span>অগ্রগতি ট্র্যাকিং</span>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[62vh] space-y-4">
          
          {/* TAB 1: SUBMIT FORM */}
          {activeTab === 'submit' && (
            <div>
              {createdCode ? (
                <div className="text-center py-6 space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">
                      অভিযোগ সফলভাবে গ্রহণ করা হয়েছে!
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      আপনার সমস্যাটি চেয়ারম্যানের বিশেষ পর্যবেক্ষণ সেলে নিবন্ধিত হয়েছে।
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto">
                    <span className="text-[11px] text-slate-500 font-bold uppercase block mb-1">
                      আপনার ট্র্যাকিং কোড
                    </span>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl font-mono font-black text-emerald-700 tracking-wider">
                        {createdCode}
                      </span>
                      <button
                        onClick={() => handleCopy(createdCode)}
                        className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 transition"
                        title="কপি করুন"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSearchCode(createdCode);
                        setActiveTab('track');
                        setSearched(true);
                        const found = grievances.find(g => g.trackingCode === createdCode);
                        setTrackedItem(found || null);
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
                    >
                      অগ্রগতি দেখুন
                    </button>
                    <button
                      onClick={() => setCreatedCode(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                    >
                      আরেকটি অভিযোগ দাখিল করুন
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        আপনার নাম <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: মো: আব্দুল্লাহ"
                        value={citizenName}
                        onChange={(e) => setCitizenName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        মোবাইল নম্বর <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="০১৭১২-XXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ওয়ার্ড নম্বর <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={ward}
                        onChange={(e) => handleWardChange(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-medium"
                      >
                        {jugikhaliWards.map((w) => (
                          <option key={w.number} value={w.name}>
                            {w.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        গ্রাম / এলাকা <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-medium"
                      >
                        {(jugikhaliWards.find(w => w.name === ward)?.villages || []).map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                        <option value="অন্যান্য">অন্যান্য / নির্দিষ্ট পাড়া</option>
                      </select>
                      {village === 'অন্যান্য' && (
                        <input
                          type="text"
                          placeholder="পাড়ার নাম লিখুন"
                          value={customVillage}
                          onChange={(e) => setCustomVillage(e.target.value)}
                          className="w-full mt-2 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        সমস্যার ক্যাটাগরি <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-medium"
                      >
                        <option value="রাস্তাঘাট">রাস্তাঘাট</option>
                        <option value="জলাবদ্ধতা ও ড্রেন">জলাবদ্ধতা ও ড্রেন</option>
                        <option value="বিশুদ্ধ পানি">বিশুদ্ধ পানি</option>
                        <option value="ঘুষ ও দুর্নীতি">ঘুষ ও দুর্নীতি</option>
                        <option value="বিদ্যুৎ ও সোলার">বিদ্যুৎ ও সোলার</option>
                        <option value="অন্যান্য">অন্যান্য</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      অভিযোগের শিরোনাম <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: ৩ নং ওয়ার্ডের প্রধান কালভার্টের ভাঙা অংশ মেরামত প্রয়োজন"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      বিস্তারিত বিবরণ <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="সমস্যার বিস্তারিত বর্ণনা দিন—কবে থেকে এই সমস্যা এবং কী ধরনের সহায়তা দরকার..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ছবির লিংক (ঐচ্ছিক)
                    </label>
                    <input
                      type="url"
                      placeholder="https://... (ইন্টারনেটে আপলোড করা ছবির লিংক থাকলে দিতে পারেন)"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none text-xs"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 active:scale-98"
                    >
                      <Send className="w-4 h-4" />
                      <span>অভিযোগ দাখিল করুন</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: TRACK STATUS */}
          {activeTab === 'track' && (
            <div className="space-y-4">
              <form onSubmit={handleTrack} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="ট্র্যাকিং কোড দিন (যেমন: JUGI-XXXX)"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-mono"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>খুঁজুন</span>
                </button>
              </form>

              {searched && (
                <div>
                  {trackedItem ? (
                    <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {trackedItem.category}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-1">
                            {trackedItem.title}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {trackedItem.ward} • {trackedItem.village}
                          </p>
                        </div>

                        <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                          trackedItem.status === 'সমাধানকৃত (Resolved)'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : trackedItem.status === 'তদন্তাধীন (In Review)'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {trackedItem.status === 'সমাধানকৃত (Resolved)' ? '✅ সমাধানকৃত' : trackedItem.status === 'তদন্তাধীন (In Review)' ? '🔍 তদন্তাধীন' : '⌛ পর্যালোচনায়'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">
                        {trackedItem.description}
                      </p>

                      {trackedItem.adminResponse && (
                        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900">
                          <strong className="block text-emerald-950 font-bold mb-0.5">চেয়ারম্যান সেল থেকে আপডেট:</strong>
                          {trackedItem.adminResponse}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-6 text-center bg-slate-50 rounded-2xl border border-slate-200">
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        &quot;{searchCode}&quot; কোডটির সাথে কোনো অভিযোগ পাওয়া যায়নি। দয়া করে সঠিক কোডটি লিখুন।
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer Hotkey Note */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>জরুরি প্রয়োজনে সরাসরি হটলাইনে কল করুন: <strong>+880 1735-885527</strong></span>
        </div>

      </div>
    </div>
  )}
</>
);
};
