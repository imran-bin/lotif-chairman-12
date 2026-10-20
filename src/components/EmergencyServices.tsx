'use client';

import React, { useState } from 'react';
import { 
  PhoneCall, 
  Flame, 
  Shield, 
  Stethoscope, 
  Droplet, 
  Heart, 
  Plus, 
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { jugikhaliWards } from '@/data/initialData';

export const EmergencyServices: React.FC = () => {
  const { emergencyContacts, bloodDonors, addBloodDonor } = useData();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('সকল');
  const [donorSearchWard, setDonorSearchWard] = useState<string>('সকল');
  const [showAddDonorModal, setShowAddDonorModal] = useState(false);

  // New Donor Form State
  const [donorName, setDonorName] = useState('');
  const [donorBlood, setDonorBlood] = useState('O+');
  const [donorWard, setDonorWard] = useState(jugikhaliWards[0].name);
  const [donorVillage, setDonorVillage] = useState(jugikhaliWards[0].villages[0]);
  const [donorPhone, setDonorPhone] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const bloodGroups = ['সকল', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  // Only show approved donors on the public front-end
  const filteredDonors = bloodDonors.filter(donor => {
    const isApproved = (donor.status || 'approved') === 'approved';
    const matchesGroup = selectedBloodGroup === 'সকল' || donor.bloodGroup === selectedBloodGroup;
    const matchesWard = donorSearchWard === 'সকল' || donor.ward === donorSearchWard;
    return isApproved && matchesGroup && matchesWard;
  });

  const getEmergencyIcon = (category: string) => {
    switch (category) {
      case 'অ্যাম্বুলেন্স':
        return <Heart className="w-6 h-6 text-rose-600" />;
      case 'ফায়ার সার্ভিস':
        return <Flame className="w-6 h-6 text-amber-600" />;
      case 'পুলিশ':
        return <Shield className="w-6 h-6 text-blue-600" />;
      case 'চিকিৎসক':
        return <Stethoscope className="w-6 h-6 text-emerald-600" />;
      default:
        return <PhoneCall className="w-6 h-6 text-purple-600" />;
    }
  };

  const handleWardChange = (newWard: string) => {
    setDonorWard(newWard);
    const wardObj = jugikhaliWards.find(w => w.name === newWard);
    if (wardObj && wardObj.villages.length > 0) {
      setDonorVillage(wardObj.villages[0]);
    }
  };

  const handleRegisterDonor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !donorPhone.trim()) return;

    addBloodDonor({
      name: donorName.trim(),
      bloodGroup: donorBlood,
      ward: donorWard,
      village: donorVillage,
      phone: donorPhone.trim(),
      lastDonated: 'সবেমাত্র নিবন্ধিত',
      isAvailable: true,
      status: 'pending'
    });

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setShowAddDonorModal(false);
      setDonorName('');
      setDonorPhone('');
    }, 3200);
  };

  return (
    <section id="emergency" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">
            <Heart className="w-3.5 h-3.5 text-rose-600" />
            <span>জরুরি ও জীবনরক্ষাকারী সেবা • 24/7 Helpline & Blood Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            এক ক্লিকেই সব জরুরি সেবা ও রক্তদান নেটওয়ার্ক
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            অ্যাম্বুলেন্স, ফায়ার সার্ভিস, পুলিশ হেল্পলাইন এবং এলাকার যুবকদের সমন্বয়ে গড়ে তোলা ব্লাড ডোনার ডিরেক্টরি
          </p>
        </div>

        {/* 1-Click Dial Emergency Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    {getEmergencyIcon(contact.category)}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700">
                    {contact.availableHours}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 mb-1">
                  {contact.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  {contact.location} {contact.note && `• ${contact.note}`}
                </p>
              </div>

              <a
                href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-2 text-sm mt-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>কল করুন: {contact.phone}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Blood Donor Section Header & Action */}
        <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-800/80 text-rose-200 text-xs font-bold border border-rose-700">
                <Droplet className="w-3.5 h-3.5 text-rose-300 fill-current" />
                <span>যুগিখালী যুব ব্লাড ব্যাংক</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                জরুরি রক্তের প্রয়োজনে রক্তের গ্রুপ অনুযায়ী ডোনার খুঁজুন
              </h3>
              <p className="text-xs sm:text-sm text-rose-200 max-w-2xl">
                কোনো মুমূর্ষু রোগীর রক্তের প্রয়োজন হলে সরাসরি স্থানীয় যুব রক্তদাতাদের সাথে যোগাযোগ করুন। আপনিও রক্তদাতা হিসেবে নাম নিবন্ধন করতে পারেন।
              </p>
            </div>
            
            <button
              onClick={() => setShowAddDonorModal(true)}
              className="shrink-0 bg-white hover:bg-rose-50 text-rose-900 font-bold px-6 py-3.5 rounded-xl shadow-md transition flex items-center gap-2 active:scale-95"
            >
              <Plus className="w-5 h-5 text-rose-700" />
              <span>রক্তদাতা হিসেবে যুক্ত হোন</span>
            </button>
          </div>
        </div>

        {/* Blood Filters */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Blood Groups */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 mr-2 whitespace-nowrap">গ্রুপ:</span>
            {bloodGroups.map((grp) => (
              <button
                key={grp}
                onClick={() => setSelectedBloodGroup(grp)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedBloodGroup === grp
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {grp}
              </button>
            ))}
          </div>

          {/* Ward Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
            <span className="font-bold text-slate-500 whitespace-nowrap">ওয়ার্ড:</span>
            <select
              value={donorSearchWard}
              onChange={(e) => setDonorSearchWard(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-medium outline-none text-slate-800"
            >
              <option value="সকল">সকল ওয়ার্ড ({jugikhaliWards.length}টি ওয়ার্ড)</option>
              {jugikhaliWards.map(w => (
                <option key={w.number} value={w.name}>
                  {w.name}: {w.villages.join(', ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Donors List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredDonors.map((donor) => (
            <div
              key={donor.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 font-extrabold flex items-center justify-center text-sm shadow-2xs">
                    {donor.bloodGroup}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    donor.isAvailable 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {donor.isAvailable ? 'রক্তদানে প্রস্তুত' : 'সম্প্রতি দিয়েছেন'}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">{donor.name}</h4>
                <p className="text-xs text-slate-500">
                  {donor.ward}{donor.village ? ` • ${donor.village}` : ''} • {donor.lastDonated}
                </p>
              </div>

              <a
                href={`tel:${donor.phone}`}
                className="mt-3 w-full bg-slate-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-slate-800 font-bold py-2 rounded-xl border border-slate-200 transition text-xs flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                <span>কল করুন: {donor.phone}</span>
              </a>
            </div>
          ))}
        </div>

        {filteredDonors.length === 0 && (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">এই গ্রুপ বা ওয়ার্ডে কোনো তালিকাভুক্ত রক্তদাতা পাওয়া যায়নি।</p>
          </div>
        )}

        {/* Add Donor Modal */}
        {showAddDonorModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                রক্তদাতা হিসেবে নিবন্ধন করুন
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                আপনার মূল্যবান ১ ব্যাগ রক্ত বাঁচাতে পারে একটি মুমূর্ষু জীবন।
              </p>

              {addedSuccess ? (
                <div className="text-center py-6 space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-slate-900 text-base">নিবন্ধন সফলভাবে জমা হয়েছে!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
                    সুপার অ্যাডমিন কর্তৃক যাচাই ও অনুমোদনের পর রক্তদাতা তালিকায় আপনার নাম প্রকাশিত হবে। মহৎ এই উদ্যোগের জন্য ধন্যবাদ!
                  </p>
                  <button
                    onClick={() => setShowAddDonorModal(false)}
                    className="mt-2 px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
                  >
                    ঠিক আছে
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterDonor} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মো: আরিফুল ইসলাম"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">রক্তের গ্রুপ *</label>
                      <select
                        value={donorBlood}
                        onChange={(e) => setDonorBlood(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      >
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">ওয়ার্ড নম্বর *</label>
                      <select
                        value={donorWard}
                        onChange={(e) => handleWardChange(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      >
                        {jugikhaliWards.map(w => (
                          <option key={w.number} value={w.name}>{w.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">গ্রাম / এলাকা *</label>
                    <select
                      value={donorVillage}
                      onChange={(e) => setDonorVillage(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    >
                      {(jugikhaliWards.find(w => w.name === donorWard)?.villages || ['যুগিখালী']).map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                    <input
                      type="tel"
                      required
                      placeholder="০১৭১২-XXXXXX"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition text-sm shadow-sm"
                    >
                      নিবন্ধন সম্পন্ন করুন
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddDonorModal(false)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm transition"
                    >
                      বাতিল
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
