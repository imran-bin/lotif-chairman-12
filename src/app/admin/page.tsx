'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Lock, 
  Unlock, 
  BarChart3, 
  AlertCircle, 
  FileText, 
  Users, 
  Coins, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Save, 
  ArrowLeft, 
  LogOut, 
  Sparkles,
  CloudUpload,
  RefreshCw,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { PromiseItem, Grievance } from '@/data/initialData';

export default function AdminPage() {
  const { 
    candidate, 
    promises, 
    grievances, 
    budget, 
    bloodDonors,
    updatePromise, 
    addPromise, 
    deletePromise, 
    updateGrievanceStatus, 
    updateCandidateInfo,
    updateBudget,
    resetAllData
  } = useData();

  // Authentication State (Default PIN: 1234 or superadmin)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Restore authenticated session from localStorage/sessionStorage
  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const auth = sessionStorage.getItem('amr_jugikhali_auth') || localStorage.getItem('amr_jugikhali_auth');
        if (auth === 'true') {
          setIsAuthenticated(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'promises' | 'grievances' | 'candidate' | 'budget' | 'deploy'>('overview');

  // Promise Editing State
  const [editingPromiseId, setEditingPromiseId] = useState<string | null>(null);
  const [editingPromiseProgress, setEditingPromiseProgress] = useState<number>(0);
  const [editingPromiseStatus, setEditingPromiseStatus] = useState<PromiseItem['status']>('চলমান');
  const [editingPromiseNote, setEditingPromiseNote] = useState('');
  
  // New Promise Form
  const [showNewPromiseModal, setShowNewPromiseModal] = useState(false);
  const [newPromiseTitle, setNewPromiseTitle] = useState('');
  const [newPromiseCategory, setNewPromiseCategory] = useState<PromiseItem['category']>('অবকাঠামো');
  const [newPromiseTarget, setNewPromiseTarget] = useState('১ম বছর');
  const [newPromiseDesc, setNewPromiseDesc] = useState('');
  const [newPromiseBudget, setNewPromiseBudget] = useState('');
  const [newPromiseLocation, setNewPromiseLocation] = useState('যুগিখালী ইউনিয়ন');

  // Grievance Moderation State
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [grievanceResponseText, setGrievanceResponseText] = useState('');
  const [grievanceNewStatus, setGrievanceNewStatus] = useState<Grievance['status']>('সমাধানকৃত (Resolved)');
  const [grievanceFilter, setGrievanceFilter] = useState<string>('সকল');

  // Candidate Profile State
  const [candName, setCandName] = useState(candidate.name);
  const [candSlogan, setCandSlogan] = useState(candidate.slogan);
  const [candSalam, setCandSalam] = useState(candidate.salam);
  const [candPledge, setCandPledge] = useState(candidate.mainPledge);
  const [candPhone, setCandPhone] = useState(candidate.phone);
  const [candEmail, setCandEmail] = useState(candidate.email);
  const [candPhoto, setCandPhoto] = useState(candidate.photoUrl || '/candidate-latif.jpg');
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    if (candidate) {
      setCandName(candidate.name);
      setCandSlogan(candidate.slogan);
      setCandSalam(candidate.salam);
      setCandPledge(candidate.mainPledge);
      setCandPhone(candidate.phone);
      setCandEmail(candidate.email);
      setCandPhoto(candidate.photoUrl || '/candidate-latif.jpg');
    }
  }, [candidate]);

  // Handle Photo Upload (Convert file to Base64)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCandPhoto(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Login handler - Strict password 1234 check
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPin = pinInput.trim();

    if (cleanPin === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
      try {
        sessionStorage.setItem('amr_jugikhali_auth', 'true');
        localStorage.setItem('amr_jugikhali_auth', 'true');
      } catch (err) {
        console.error(err);
      }
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('amr_jugikhali_auth');
      localStorage.removeItem('amr_jugikhali_auth');
    } catch (err) {
      console.error(err);
    }
  };

  // Save Candidate Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidateInfo({
      name: candName,
      slogan: candSlogan,
      salam: candSalam,
      mainPledge: candPledge,
      phone: candPhone,
      email: candEmail,
      photoUrl: candPhoto,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  // Save Promise Changes
  const handleSavePromise = (id: string) => {
    updatePromise(id, {
      progress: editingPromiseProgress,
      status: editingPromiseStatus,
      lastUpdated: editingPromiseNote || `অগ্রগতি আপডেট: ${editingPromiseProgress}%`
    });
    setEditingPromiseId(null);
  };

  // Add New Promise
  const handleAddNewPromise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromiseTitle) return;

    addPromise({
      title: newPromiseTitle,
      category: newPromiseCategory,
      targetDate: newPromiseTarget,
      progress: 10,
      status: 'পরিকল্পনাধীন',
      description: newPromiseDesc || newPromiseTitle,
      budgetAllocated: newPromiseBudget,
      location: newPromiseLocation,
      lastUpdated: 'নতুন নির্বাচনী অঙ্গীকার অন্তর্ভুক্ত হয়েছে'
    });

    setShowNewPromiseModal(false);
    setNewPromiseTitle('');
    setNewPromiseDesc('');
    setNewPromiseBudget('');
  };

  // Save Grievance Response
  const handleSaveGrievanceResponse = () => {
    if (!selectedGrievance) return;
    updateGrievanceStatus(
      selectedGrievance.id,
      grievanceNewStatus,
      grievanceResponseText || selectedGrievance.adminResponse
    );
    setSelectedGrievance(null);
  };

  // Stats
  const totalPromises = promises.length;
  const completedPromises = promises.filter(p => p.progress === 100).length;
  const avgProgress = Math.round(promises.reduce((a, b) => a + b.progress, 0) / (totalPromises || 1));
  const pendingGrievances = grievances.filter(g => g.status.includes('অপেক্ষমাণ')).length;
  const resolvedGrievances = grievances.filter(g => g.status.includes('সমাধানকৃত')).length;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <div className="inline-block px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-600/40 rounded-full text-xs font-bold mb-2">
              🛡️ সুরক্ষিত কন্ট্রোল প্যানেল
            </div>
            <h1 className="text-2xl font-bold text-white">
              সুপার অ্যাডমিন ড্যাশবোর্ড
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              মাওলানা আব্দুল লতিফ নির্বাচনী প্রচার সেল ও ওয়েবসাইট কনটেন্ট ম্যানেজার
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 text-left mb-1.5">
                সুপার অ্যাডমিন পাসওয়ার্ড
              </label>
              <input
                type="password"
                autoFocus
                required
                placeholder="পাসওয়ার্ড লিখুন..."
                value={pinInput}
                onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-center font-mono text-xl tracking-widest focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              {pinError && (
                <p className="text-xs text-rose-400 mt-2 font-semibold">
                  ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন (1234)।
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-emerald-600/25 text-sm flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>লগইন করুন</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
            <span>ডিফল্ট পাসওয়ার্ড: <code className="text-emerald-400 bg-slate-900 px-1.5 py-0.5 rounded">1234</code></span>
            <Link href="/" className="text-slate-300 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>মূল সাইটে ফিরুন</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-emerald-400">
              <img
                src={candidate.photoUrl || "/candidate-latif.jpg"}
                alt={candidate.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg block leading-none">
                {candidate.name} <span className="text-xs font-normal text-emerald-400">• সুপার অ্যাডমিন</span>
              </span>
              <span className="text-[11px] text-slate-400">
                ১২ নং যুগিখালী ইউনিয়ন পরিষদ
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition flex items-center gap-1.5"
            >
              <span>লাইভ সাইট দেখুন</span>
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 px-3 py-1.5 rounded-lg border border-rose-500/30 transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none border-b border-slate-200">
          {[
            { id: 'overview', label: 'ওভারভিউ ড্যাশবোর্ড', icon: BarChart3 },
            { id: 'promises', label: 'প্রমিজ ট্র্যাকার কন্ট্রোল', icon: FileText, count: totalPromises },
            { id: 'grievances', label: 'নাগরিক অভিযোগ বক্স', icon: AlertCircle, count: pendingGrievances },
            { id: 'candidate', label: 'প্রার্থী ও স্লোগান এডিটর', icon: Users },
            { id: 'budget', label: 'বাজেট ও অর্থ হিসাব', icon: Coins },
            { id: 'deploy', label: 'Vercel ও ক্লাউড গাইড', icon: CloudUpload },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-2 ${
                  activeTab === t.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
                {t.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    activeTab === t.id ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">মোট নির্বাচনী অঙ্গীকার</span>
                <span className="text-3xl font-extrabold text-slate-900">{totalPromises} টি</span>
                <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                  {completedPromises} টি শতভাগ সমাপ্ত
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">গড় বাস্তবায়ন হার</span>
                <span className="text-3xl font-extrabold text-blue-700">{avgProgress}%</span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  রিয়েল-টাইম নাগরিক মনিটরিং
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">নাগরিক অভিযোগ</span>
                <span className="text-3xl font-extrabold text-amber-600">{grievances.length} টি</span>
                <span className="text-[11px] text-rose-500 font-semibold block mt-1">
                  {pendingGrievances} টি সমাধান প্রয়োজন
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">নিবন্ধিত রক্তদাতা</span>
                <span className="text-3xl font-extrabold text-rose-600">{bloodDonors.length} জন</span>
                <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                  জরুরি ২৪/৭ নেটওয়ার্ক
                </span>
              </div>
            </div>

            {/* Quick Actions and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Quick Promise Quick-Slider Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <span>অগ্রাধিকার প্রতিশ্রুতির দ্রুত অগ্রগতি আপডেট</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('promises')}
                    className="text-xs text-emerald-700 font-bold hover:underline"
                  >
                    সবগুলো দেখুন →
                  </button>
                </div>

                <div className="space-y-4">
                  {promises.slice(0, 4).map((p) => (
                    <div key={p.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-800 line-clamp-1">{p.title}</span>
                        <span className="text-emerald-700 font-extrabold">{p.progress}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={p.progress}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          updatePromise(p.id, {
                            progress: val,
                            status: val === 100 ? 'বাস্তবায়িত' : val > 0 ? 'চলমান' : 'পরিকল্পনাধীন',
                            lastUpdated: `এডমিন কর্তৃক অগ্রগতি ${val}% করা হয়েছে`
                          });
                        }}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Grievances Quick Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <span>অপেক্ষমাণ নাগরিক অভিযোগসমূহ</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('grievances')}
                    className="text-xs text-emerald-700 font-bold hover:underline"
                  >
                    অভিযোগ ড্যাশবোর্ড →
                  </button>
                </div>

                <div className="space-y-3">
                  {grievances.slice(0, 3).map((g) => (
                    <div key={g.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {g.trackingCode}
                        </span>
                        <span className="text-slate-400">{g.submittedAt}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{g.title}</h4>
                      <p className="text-slate-500 line-clamp-1">{g.description}</p>
                      <div className="pt-2 flex justify-between items-center text-[11px]">
                        <span className="font-medium text-slate-600">{g.citizenName} ({g.ward})</span>
                        <button
                          onClick={() => {
                            setSelectedGrievance(g);
                            setGrievanceResponseText(g.adminResponse || '');
                            setActiveTab('grievances');
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-lg transition"
                        >
                          পদক্ষেপ নিন
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick Actions Footer */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                ডাটা লোকাল স্টোরেজে স্বয়ংক্রিয়ভাবে সংরক্ষিত হচ্ছে। যেকোনো সময় রিসেট করতে পারবেন।
              </span>
              <button
                onClick={() => {
                  if (confirm("আপনি কি সব তথ্য ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?")) {
                    resetAllData();
                    alert("ডাটা সফলভাবে রিসেট হয়েছে!");
                  }
                }}
                className="text-xs bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>ফ্যাক্টরি রিসেট (ডিফল্ট ডাটা)</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: PROMISES MANAGEMENT */}
        {activeTab === 'promises' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  নির্বাচনী প্রতিশ্রুতি ও প্রমিজ ট্র্যাকার ব্যবস্থাপনা
                </h2>
                <p className="text-xs text-slate-500">
                  প্রতিটি প্রতিশ্রুতির অগ্রগতি (%) পরিবর্তন করুন যা ওয়েবসাইটে লাইভ দেখাবে
                </p>
              </div>

              <button
                onClick={() => setShowNewPromiseModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl transition text-sm flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন প্রতিশ্রুতি যুক্ত করুন</span>
              </button>
            </div>

            {/* List of Promises */}
            <div className="space-y-4">
              {promises.map((p) => {
                const isEditing = editingPromiseId === p.id;

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {p.category}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base">
                          {p.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          {p.progress}% সম্পন্ন ({p.status})
                        </span>
                        {!isEditing ? (
                          <button
                            onClick={() => {
                              setEditingPromiseId(p.id);
                              setEditingPromiseProgress(p.progress);
                              setEditingPromiseStatus(p.status);
                              setEditingPromiseNote(p.lastUpdated || '');
                            }}
                            className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition"
                            title="এডিট করুন"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSavePromise(p.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                          >
                            <Save className="w-4 h-4" />
                            <span>সংরক্ষণ</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm(`"${p.title}" প্রতিশ্রুতিটি মুছে ফেলতে চান?`)) {
                              deletePromise(p.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {isEditing ? (
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              বাস্তবায়ন অগ্রগতি: <strong className="text-emerald-700">{editingPromiseProgress}%</strong>
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              step="5"
                              value={editingPromiseProgress}
                              onChange={(e) => setEditingPromiseProgress(Number(e.target.value))}
                              className="w-full accent-emerald-600 cursor-pointer"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              স্ট্যাটাস
                            </label>
                            <select
                              value={editingPromiseStatus}
                              onChange={(e) => setEditingPromiseStatus(e.target.value as any)}
                              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg outline-none"
                            >
                              <option value="পরিকল্পনাধীন">পরিকল্পনাধীন</option>
                              <option value="চলমান">চলমান</option>
                              <option value="বাস্তবায়িত">বাস্তবায়িত</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            সর্বশেষ অগ্রগতির বিবরণ / আপডেট নোট
                          </label>
                          <input
                            type="text"
                            value={editingPromiseNote}
                            onChange={(e) => setEditingPromiseNote(e.target.value)}
                            placeholder="যেমন: টেন্ডার সম্পন্ন হয়েছে ও কাজ চলছে"
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg outline-none"
                          />
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingPromiseId(null)}
                            className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                          >
                            বাতিল
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSavePromise(p.id)}
                            className="bg-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg"
                          >
                            আপডেট নিশ্চিত করুন
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-slate-600">{p.description}</p>
                        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                          <span>স্থান: {p.location || 'সমগ্র ইউনিয়ন'}</span>
                          <span>বরাদ্দ: {p.budgetAllocated || 'সাধারণ তহবিল'}</span>
                          <span className="text-emerald-700 font-semibold">{p.lastUpdated}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* New Promise Modal */}
            {showNewPromiseModal && (
              <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    নতুন নির্বাচনী প্রতিশ্রুতি যোগ করুন
                  </h3>

                  <form onSubmit={handleAddNewPromise} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">প্রতিশ্রুতির নাম / শিরোনাম *</label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: যুগিখালী বাজারে সৌরবাতি স্থাপন"
                        value={newPromiseTitle}
                        onChange={(e) => setNewPromiseTitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                        <select
                          value={newPromiseCategory}
                          onChange={(e) => setNewPromiseCategory(e.target.value as any)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
                        >
                          <option value="অবকাঠামো">অবকাঠামো</option>
                          <option value="সুশাসন">সুশাসন</option>
                          <option value="নাগরিক সেবা">নাগরিক সেবা</option>
                          <option value="স্বাস্থ্য ও শিক্ষা">স্বাস্থ্য ও শিক্ষা</option>
                          <option value="কৃষি ও অর্থনীতি">কৃষি ও অর্থনীতি</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">বাস্তবায়ন সময়সীমা</label>
                        <input
                          type="text"
                          placeholder="যেমন: প্রথম ৬ মাস"
                          value={newPromiseTarget}
                          onChange={(e) => setNewPromiseTarget(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">সংক্ষিপ্ত বিবরণ</label>
                      <textarea
                        rows={3}
                        placeholder="প্রতিশ্রুতির বিস্তারিত..."
                        value={newPromiseDesc}
                        onChange={(e) => setNewPromiseDesc(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">প্রস্তাবিত বাজেট</label>
                        <input
                          type="text"
                          placeholder="যেমন: ৫,০০,০০০ ৳"
                          value={newPromiseBudget}
                          onChange={(e) => setNewPromiseBudget(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">স্থান / ওয়ার্ড</label>
                        <input
                          type="text"
                          placeholder="যেমন: ওয়ার্ড ১ ও ২"
                          value={newPromiseLocation}
                          onChange={(e) => setNewPromiseLocation(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowNewPromiseModal(false)}
                        className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        বাতিল
                      </button>
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs"
                      >
                        যুক্ত করুন
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: GRIEVANCES MANAGEMENT */}
        {activeTab === 'grievances' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  নাগরিক অভিযোগ ও সমস্যা বক্স ব্যবস্থাপনা
                </h2>
                <p className="text-xs text-slate-500">
                  নাগরিকদের পাঠানো অভিযোগ পর্যালোচনা করুন, স্ট্যাটাস পরিবর্তন করুন ও সমাধান লিখে দিন
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                {['সকল', 'অপেক্ষমাণ', 'তদন্তাধীন', 'সমাধানকৃত'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setGrievanceFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      grievanceFilter === f
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Grievance List Table / Cards */}
            <div className="space-y-4">
              {grievances
                .filter(g => grievanceFilter === 'সকল' || g.status.includes(grievanceFilter))
                .map((g) => (
                  <div
                    key={g.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded border border-emerald-200">
                          {g.trackingCode}
                        </span>
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {g.ward} • {g.village}
                        </span>
                        <span className="text-xs text-slate-400">
                          {g.submittedAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                          g.status.includes('সমাধানকৃত')
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : g.status.includes('তদন্তাধীন')
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {g.status}
                        </span>

                        <button
                          onClick={() => {
                            setSelectedGrievance(g);
                            setGrievanceResponseText(g.adminResponse || '');
                            setGrievanceNewStatus(g.status);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-lg transition"
                        >
                          পদক্ষেপ নিন
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-base text-slate-900 mb-1">
                        {g.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {g.description}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                      <div className="flex items-center gap-2">
                        <span>আবেদনকারী: <strong className="text-slate-800">{g.citizenName}</strong></span>
                        <span>• ফোন: <a href={`tel:${g.phone}`} className="text-emerald-700 font-bold hover:underline">{g.phone}</a></span>
                      </div>
                      {g.adminResponse && (
                        <div className="w-full text-emerald-900 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200 mt-1 font-medium">
                          <strong>গৃহীত ব্যবস্থা:</strong> {g.adminResponse}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            {/* Grievance Action Modal */}
            {selectedGrievance && (
              <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                      {selectedGrievance.trackingCode}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {selectedGrievance.title}
                    </h3>
                    <p className="text-xs text-slate-500">{selectedGrievance.citizenName} ({selectedGrievance.ward})</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">স্ট্যাটাস পরিবর্তন করুন</label>
                      <select
                        value={grievanceNewStatus}
                        onChange={(e) => setGrievanceNewStatus(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none font-bold"
                      >
                        <option value="অপেক্ষমাণ (Pending)">অপেক্ষমাণ (Pending)</option>
                        <option value="তদন্তাধীন (In Review)">তদন্তাধীন (In Review)</option>
                        <option value="সমাধানকৃত (Resolved)">সমাধানকৃত (Resolved)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        চেয়ারম্যান সেল ও মনিটরিং টিমের মন্তব্য / সমাধানের বিবরণ *
                      </label>
                      <textarea
                        rows={4}
                        placeholder="নাগরিক ট্র্যাকিং পেজে এই মন্তব্যটি দেখতে পাবেন..."
                        value={grievanceResponseText}
                        onChange={(e) => setGrievanceResponseText(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setSelectedGrievance(null)}
                      className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                    >
                      বাতিল
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveGrievanceResponse}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs"
                    >
                      সংরক্ষণ ও আপডেট করুন
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: CANDIDATE PROFILE */}
        {activeTab === 'candidate' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm animate-in fade-in space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                প্রার্থী পরিচিতি ও মূল বক্তব্য এডিটর
              </h2>
              <p className="text-xs text-slate-500">
                ওয়েবসাইটের হিরো ব্যানার ও ফুটারে প্রদর্শিত তথ্য এখান থেকে পরিবর্তন করুন
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              {/* Candidate Photo Editor Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-5">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0 bg-slate-200">
                  <img
                    src={candPhoto || "/candidate-latif.jpg"}
                    alt="প্রার্থীর ছবি প্রিভিউ"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      📸 প্রার্থীর ছবি পরিবর্তন করুন (কম্পিউটার/মোবাইল থেকে আপলোড)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      অথবা ছবির সরাসরি ইমেজ লিংক (URL) দিন
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="যেমন: /candidate-latif.jpg বা https://..."
                        value={candPhoto}
                        onChange={(e) => setCandPhoto(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setCandPhoto('/candidate-latif.jpg')}
                        className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg shrink-0 transition"
                      >
                        মূল ছবি
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">প্রার্থীর নাম</label>
                  <input
                    type="text"
                    value={candName}
                    onChange={(e) => setCandName(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">যোগাযোগ হটলাইন নম্বর</label>
                  <input
                    type="text"
                    value={candPhone}
                    onChange={(e) => setCandPhone(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">অফিসিয়াল ইমেইল এড্রেস</label>
                  <input
                    type="email"
                    value={candEmail}
                    onChange={(e) => setCandEmail(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">মূল নির্বাচনী স্লোগান</label>
                <input
                  type="text"
                  value={candSlogan}
                  onChange={(e) => setCandSlogan(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ভোটারদের প্রতি সালাম ও বার্তা</label>
                <textarea
                  rows={4}
                  value={candSalam}
                  onChange={(e) => setCandSalam(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">মূল অঙ্গীকার (Main Pledge)</label>
                <textarea
                  rows={3}
                  value={candPledge}
                  onChange={(e) => setCandPledge(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                {profileSaved && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    তথ্য সফলভাবে সংরক্ষিত হয়েছে!
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>সংরক্ষণ করুন</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 5: BUDGET */}
        {activeTab === 'budget' && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm animate-in fade-in space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                বাজেট ও অর্থ স্বচ্ছতা ডাটা কন্ট্রোল
              </h2>
              <p className="text-xs text-slate-500">
                ইউনিয়ন পরিষদের সরকারি অনুদান ও উন্নয়ন ব্যয়ের হিসাব আপডেট করুন
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">মোট বাজেট</label>
                <input
                  type="text"
                  value={budget.totalBudget}
                  onChange={(e) => updateBudget({ ...budget, totalBudget: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm font-bold bg-white border border-slate-300 rounded-lg outline-none"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">সরকারি অনুদান</label>
                <input
                  type="text"
                  value={budget.govGrant}
                  onChange={(e) => updateBudget({ ...budget, govGrant: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm font-bold bg-white border border-slate-300 rounded-lg outline-none"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">স্থানীয় রাজস্ব</label>
                <input
                  type="text"
                  value={budget.localTax}
                  onChange={(e) => updateBudget({ ...budget, localTax: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm font-bold bg-white border border-slate-300 rounded-lg outline-none"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">ব্যয়িত অর্থ</label>
                <input
                  type="text"
                  value={budget.spentAmount}
                  onChange={(e) => updateBudget({ ...budget, spentAmount: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm font-bold bg-white border border-slate-300 rounded-lg outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
              <span>ইনপুট বক্সে মান পরিবর্তন করলে তা সরাসরি সাইটে আপডেট হয়ে যাবে।</span>
            </div>
          </div>
        )}

        {/* Tab 6: DEPLOY TO VERCEL & SUPABASE */}
        {activeTab === 'deploy' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl">
                  <CloudUpload className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Vercel-এ সম্পূর্ণ ফ্রিতে হোস্ট করার সহজ ৩ ধাপ
                  </h2>
                  <p className="text-xs text-slate-500">
                    ১ টাকাও খরচ ছাড়া আপনার ওয়েবসাইট সারা বিশ্বের জন্য লাইভ করুন
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    ১
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">গিটহাবে (GitHub) কোড আপলোড করুন</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      টার্মিনাল থেকে এই কমান্ডগুলো দিন:
                    </p>
                    <pre className="mt-2 p-3 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto">
{`git init
git add .
git commit -m "Initial launch of Amr Jugikhali"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lotif-chairman.git
git push -u origin main`}
                    </pre>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    ২
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Vercel.com এ ফ্রি ডিপ্লয় করুন</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline">Vercel.com</a>-এ ফ্রি একাউন্ট খুলে &ldquo;Add New Project&rdquo; এ ক্লিক করে আপনার GitHub রিপোজিটরিটি সিলেক্ট করে দিন। আর কোনো সেটিংস ছাড়া কেবল <strong>Deploy</strong> চাপুন। ২ মিনিটের মধ্যে সাইট লাইভ হয়ে যাবে!
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    ৩
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Supabase ক্লাউড কানেকশন (ঐচ্ছিক)</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      সাইটে বর্তমানে একটি স্বয়ংক্রিয় ব্রাউজার-লেভেল ডেটাবেজ (LocalStorage) সংযুক্ত আছে। আপনি চাইলে <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline">Supabase.com</a> থেকে ফ্রি PostgreSQL ডেটাবেজ ইউআরএল Vercel Environment Variables-এ যুক্ত করতে পারেন।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
