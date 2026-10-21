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
  PhoneCall,
  Film,
  Sliders,
  Eye,
  EyeOff,
  Megaphone,
  CheckCircle2,
  LayoutDashboard,
  Menu,
  X,
  Droplet,
  Clock,
  Search,
  Award,
  GraduationCap,
  UserCheck,
  BookOpen
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { PromiseItem, Grievance, SectionVisibility, jugikhaliWards, SocialActivity, MemberCandidate, EducationRecord } from '@/data/initialData';

interface SectionConfig {
  key: keyof SectionVisibility;
  name: string;
  badge: string;
  isCampaignEssential: boolean;
  desc: string;
  link: string;
}

const sectionList: SectionConfig[] = [
  {
    key: 'hero',
    name: 'প্রধান ব্যানার ও পরিচিতি (Hero Section)',
    badge: 'প্রচারণামূলক',
    isCampaignEssential: true,
    desc: 'প্রার্থীর ছবি, নাম, পদবী, দলীয় স্লোগান এবং সরাসরি ভোট ও দোয়ার আবেদন।',
    link: '/#hero'
  },
  {
    key: 'manifesto',
    name: 'নির্বাচনী ইশতেহার (৪টি মূল স্তম্ভ)',
    badge: 'প্রচারণামূলক',
    isCampaignEssential: true,
    desc: 'সুশাসন, নাগরিক সেবা, যুব উন্নয়ন এবং সৎ ও দক্ষ নেতৃত্বের বিস্তারিত অঙ্গীকার।',
    link: '/#manifesto'
  },
  {
    key: 'socialActivities',
    name: 'সামাজিক কার্যক্রম ও সেবা ডায়েরি (ভিডিও রিপোর্ট)',
    badge: 'প্রচারণামূলক',
    isCampaignEssential: true,
    desc: 'অসুস্থদের দেখতে যাওয়া, চিকিৎসা সহায়তা, শীতবস্ত্র বিতরণ ও উন্নয়নকাজের মাঠপর্যায়ের ভিডিও।',
    link: '/#social-activities'
  },
  {
    key: 'islamicGuidance',
    name: 'ইসলামিক অনুশাসন ও কুরআনের বাণী',
    badge: 'প্রচারণামূলক',
    isCampaignEssential: true,
    desc: 'কুরআন ও হাদিসের আলোকে ইনসাফভিত্তিক সমাজ ও নেতৃত্বের দায়িত্বশীলতার বার্তা।',
    link: '/#guidance'
  },
  {
    key: 'emergencyServices',
    name: 'জরুরি সেবা ও রক্তদান ডিরেক্টরি',
    badge: 'জনসেবা',
    isCampaignEssential: true,
    desc: 'অ্যাম্বুলেন্স, ফায়ার সার্ভিস, চিকিৎসক ও রক্তদাতাদের তালিকা—যা জনগণের সরাসরি উপকারে আসে।',
    link: '/#emergency'
  },
  {
    key: 'grievanceBox',
    name: 'জনতার সরাসরি মতামত ও অভিযোগ বক্স',
    badge: 'জনসংযোগ',
    isCampaignEssential: true,
    desc: 'গ্রামের বাসিন্দারা তাদের সমস্যা ও প্রত্যাশা চেয়ারম্যান পদপ্রার্থীকে জানাতে পারবেন।',
    link: '/#grievance'
  },
  {
    key: 'promiseTracker',
    name: 'প্রমিজ ট্র্যাকার (প্রতিশ্রুতি বাস্তবায়ন অগ্রগতি %)',
    badge: 'নির্বাচন-পরবর্তী পরিষদ কাজ',
    isCampaignEssential: false,
    desc: 'নির্বাচনে বিজয়ী হয়ে দায়িত্ব নেওয়ার পর কোন প্রতিশ্রুতি কত শতাংশ বাস্তবায়িত হলো তা দেখানোর জন্য।',
    link: '/#tracker'
  },
  {
    key: 'budgetTransparency',
    name: 'বাজেট স্বচ্ছতা ও উন্নয়ন ব্যয়ের হিসাব',
    badge: 'নির্বাচন-পরবর্তী পরিষদ কাজ',
    isCampaignEssential: false,
    desc: 'ইউনিয়ন পরিষদের সরকারি বরাদ্দ ও বাৎসরিক খরচের লাইভ খতিয়ান (চেয়ারম্যান নির্বাচিত হওয়ার পর প্রযোজ্য)।',
    link: '/#budget'
  },
  {
    key: 'agricultureCorner',
    name: 'কৃষি কর্নার (সার ডিলার ও সরকারি মূল্যতালিকা)',
    badge: 'পরিষদ সেবা',
    isCampaignEssential: false,
    desc: 'ইউনিয়নের সার ডিলারদের তালিকা ও সরকারি নির্ধারিত দামের তথ্য।',
    link: '/#agriculture'
  },
  {
    key: 'certificateGuide',
    name: 'নাগরিক সনদ ও ওয়ারিশ আবেদন গাইডলাইন',
    badge: 'নির্বাচন-পরবর্তী পরিষদ কাজ',
    isCampaignEssential: false,
    desc: 'জন্মনিবন্ধন, ওয়ারিশ সনদ ও চারিত্রিক সনদপত্র পাওয়ার নিয়মাবলি (ইউপি পরিষদ চালুর পর দরকার)।',
    link: '/#certificate'
  },
  {
    key: 'memberCandidates',
    name: 'ওয়ার্ডভিত্তিক ইউপি সদস্য প্রার্থী পরিচিতি',
    badge: 'প্রচারণামূলক',
    isCampaignEssential: true,
    desc: '১ থেকে ৯ নং ওয়ার্ডের ইউপি সদস্য (মেম্বার) প্রার্থীদের ছবি, নাম, বিস্তারিত শিক্ষাগত যোগ্যতা ও অঙ্গীকার।',
    link: '/#wards'
  }
];

export default function AdminPage() {
  const { 
    candidate, 
    promises, 
    grievances, 
    budget, 
    bloodDonors,
    socialActivities,
    sectionVisibility,
    memberCandidates,
    addMemberCandidate,
    updateMemberCandidate,
    deleteMemberCandidate,
    updateSectionVisibility,
    setCampaignMode,
    setAllSectionsOn,
    updatePromise, 
    addPromise, 
    deletePromise, 
    addSocialActivity,
    deleteSocialActivity,
    updateGrievanceStatus, 
    updateCandidateInfo,
    updateBudget,
    approveBloodDonor,
    deleteBloodDonor,
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

  // Active Tab & Navigation
  const [activeTab, setActiveTab] = useState<'overview' | 'sections' | 'activities' | 'memberCandidates' | 'blood' | 'grievances' | 'promises' | 'candidate' | 'budget' | 'deploy'>('overview');
  const [sectionNotice, setSectionNotice] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Blood Donor Moderation State
  const [bloodSearchText, setBloodSearchText] = useState('');
  const [bloodFilterWard, setBloodFilterWard] = useState('সকল');
  const [bloodApprovedSuccess, setBloodApprovedSuccess] = useState<string | null>(null);

  // New Social Activity Form State (In Superadmin)
  const [showNewActivityModal, setShowNewActivityModal] = useState(false);
  const [newActTitle, setNewActTitle] = useState('');
  const [newActCategory, setNewActCategory] = useState<SocialActivity['category']>('অসুস্থদের সেবা ও রোগী দর্শন');
  const [newActLocation, setNewActLocation] = useState(jugikhaliWards[0].name);
  const [newActDate, setNewActDate] = useState('');
  const [newActVideoUrl, setNewActVideoUrl] = useState('');
  const [newActAttendees, setNewActAttendees] = useState('মাওলানা আব্দুল লতিফ ও স্থানীয় ব্যক্তিবর্গ');
  const [newActDesc, setNewActDesc] = useState('');

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
  const activeSectionsCount = sectionVisibility ? Object.values(sectionVisibility).filter(Boolean).length : 6;
  const pendingDonors = bloodDonors.filter(d => (d.status || 'approved') === 'pending');
  const approvedDonors = bloodDonors.filter(d => (d.status || 'approved') === 'approved');
  const pendingDonorsCount = pendingDonors.length;

  const handleAddNewActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActTitle.trim() || !newActDesc.trim()) return;

    addSocialActivity({
      title: newActTitle.trim(),
      category: newActCategory,
      location: newActLocation.trim() || 'যুগিখালী ইউনিয়ন',
      date: newActDate.trim() || new Intl.DateTimeFormat('bn-BD', { dateStyle: 'long' }).format(new Date()),
      videoUrl: newActVideoUrl.trim() || 'https://www.youtube.com/embed/ScMzIvxBSi4',
      duration: '৩:৩০ মিনিট',
      attendees: newActAttendees.trim() || 'মাওলানা আব্দুল লতিফ ও স্থানীয় নেতৃবৃন্দ',
      description: newActDesc.trim()
    });

    setShowNewActivityModal(false);
    setNewActTitle('');
    setNewActDesc('');
    setNewActVideoUrl('');
  };

  // Member Candidates Management State
  const [candFilterWard, setCandFilterWard] = useState<string>('সকল');
  const [candSearchText, setCandSearchText] = useState<string>('');
  const [showMemberModal, setShowMemberModal] = useState<boolean>(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  // Form fields for Member Candidate
  const [mName, setMName] = useState('');
  const [mFatherName, setMFatherName] = useState('');
  const [mMotherName, setMMotherName] = useState('');
  const [mWardNumber, setMWardNumber] = useState<number>(3);
  const [mVillage, setMVillage] = useState('পাইকপাড়া');
  const [mDesignation, setMDesignation] = useState('ইউপি সাধারণ সদস্য (মেম্বার) পদপ্রার্থী');
  const [mParty, setMParty] = useState('বাংলাদেশ জামায়াতে ইসলামী সমর্থিত');
  const [mPhotoUrl, setMPhotoUrl] = useState('/member-afsar.png');
  const [mPhone, setMPhone] = useState('');
  const [mShortQualifications, setMShortQualifications] = useState('');
  const [mBio, setMBio] = useState('');
  const [mPledge, setMPledge] = useState('');
  const [mIsActive, setMIsActive] = useState<boolean>(true);
  const [mEducation, setMEducation] = useState<EducationRecord[]>([
    { degree: '', year: '', institution: '', result: '' }
  ]);

  const openNewMemberModal = () => {
    setEditingMemberId(null);
    setMName('');
    setMFatherName('');
    setMMotherName('');
    setMWardNumber(1);
    setMVillage(jugikhaliWards[0].villages[0]);
    setMDesignation('ইউপি সাধারণ সদস্য (মেম্বার) পদপ্রার্থী');
    setMParty('বাংলাদেশ জামায়াতে ইসলামী সমর্থিত');
    setMPhotoUrl('/member-afsar.png');
    setMPhone('');
    setMShortQualifications('');
    setMBio('');
    setMPledge('');
    setMIsActive(true);
    setMEducation([
      { degree: 'দাখিল / এসএসসি', year: '', institution: '', result: '' },
      { degree: 'আলিম / এইচএসসি', year: '', institution: '', result: '' },
      { degree: 'স্নাতক (সম্মান / ফাজিল)', year: '', institution: '', result: '' },
      { degree: 'মাস্টার্স / কামিল', year: '', institution: '', result: '' }
    ]);
    setShowMemberModal(true);
  };

  const openEditMemberModal = (cand: MemberCandidate) => {
    setEditingMemberId(cand.id);
    setMName(cand.name);
    setMFatherName(cand.fatherName || '');
    setMMotherName(cand.motherName || '');
    setMWardNumber(cand.wardNumber);
    setMVillage(cand.village || '');
    setMDesignation(cand.designation || 'ইউপি সাধারণ সদস্য (মেম্বার) পদপ্রার্থী');
    setMParty(cand.party || 'বাংলাদেশ জামায়াতে ইসলামী সমর্থিত');
    setMPhotoUrl(cand.photoUrl || '/member-afsar.png');
    setMPhone(cand.phone || '');
    setMShortQualifications(cand.shortQualifications || '');
    setMBio(cand.bio || '');
    setMPledge(cand.manifestoPledge || '');
    setMIsActive(cand.isActive);
    setMEducation(cand.education && cand.education.length > 0 ? [...cand.education] : [
      { degree: '', year: '', institution: '', result: '' }
    ]);
    setShowMemberModal(true);
  };

  const handleMemberPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('ছবির সাইজ সর্বোচ্চ ২ মেগাবাইট হতে হবে!');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setMPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addEducationRow = () => {
    setMEducation(prev => [...prev, { degree: '', year: '', institution: '', result: '' }]);
  };

  const removeEducationRow = (index: number) => {
    setMEducation(prev => prev.filter((_, idx) => idx !== index));
  };

  const updateEducationField = (index: number, field: keyof EducationRecord, value: string) => {
    setMEducation(prev => prev.map((item, idx) => idx === index ? { ...item, [field]: value } : item));
  };

  const handleSaveMemberCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mName.trim()) {
      alert('প্রার্থীর নাম দেওয়া আবশ্যক!');
      return;
    }

    const wardInfo = jugikhaliWards.find(w => w.number === mWardNumber);
    const wardName = wardInfo ? wardInfo.name : `${mWardNumber} নং ওয়ার্ড`;
    const cleanEducation = mEducation.filter(ed => ed.degree.trim() !== '');

    const candidatePayload = {
      name: mName.trim(),
      fatherName: mFatherName.trim(),
      motherName: mMotherName.trim(),
      wardNumber: mWardNumber,
      wardName,
      village: mVillage.trim() || (wardInfo ? wardInfo.villages[0] : ''),
      designation: mDesignation.trim(),
      party: mParty.trim(),
      photoUrl: mPhotoUrl.trim() || '/member-afsar.png',
      phone: mPhone.trim(),
      shortQualifications: mShortQualifications.trim(),
      bio: mBio.trim(),
      manifestoPledge: mPledge.trim(),
      education: cleanEducation,
      isActive: mIsActive
    };

    if (editingMemberId) {
      updateMemberCandidate(editingMemberId, candidatePayload);
    } else {
      addMemberCandidate(candidatePayload);
    }

    setShowMemberModal(false);
  };

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

  const menuItems = [
    { 
      id: 'overview', 
      label: 'ড্যাশবোর্ড', 
      subLabel: 'সার্বিক তথ্য ও পরিসংখ্যান',
      icon: LayoutDashboard,
    },
    { 
      id: 'sections', 
      label: 'সেকশন নিয়ন্ত্রণ', 
      subLabel: 'প্রচার মোড অন/অফ',
      icon: Sliders, 
      count: `${activeSectionsCount}/${sectionList.length}`,
      countColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    },
    { 
      id: 'activities', 
      label: 'সামাজিক কার্যক্রম ও ভিডিও', 
      subLabel: 'রোগী দর্শন ও সেবা ডায়েরি',
      icon: Film, 
      count: socialActivities.length,
      countColor: 'bg-teal-500/20 text-teal-300'
    },
    { 
      id: 'memberCandidates', 
      label: 'ওয়ার্ড মেম্বার প্রার্থী', 
      subLabel: 'ওয়ার্ডভিত্তিক প্রার্থী ও শিক্ষাগত যোগ্যতা',
      icon: Award, 
      count: `${memberCandidates.length} জন`,
      countColor: 'bg-emerald-500/20 text-emerald-300'
    },
    { 
      id: 'promises', 
      label: 'প্রমিজ ট্র্যাকার', 
      subLabel: 'প্রতিশ্রুতি অগ্রগতি %',
      icon: FileText, 
      count: totalPromises,
      countColor: 'bg-blue-500/20 text-blue-300'
    },
    { 
      id: 'grievances', 
      label: 'নাগরিক অভিযোগ বক্স', 
      subLabel: 'জনতার সমস্যা ও সমাধান',
      icon: AlertCircle, 
      count: pendingGrievances > 0 ? `${pendingGrievances}টি নতুন` : undefined,
      countColor: 'bg-amber-500 text-slate-950 font-black'
    },
    { 
      id: 'blood', 
      label: 'রক্তদাতা যাচাই ও তালিকা', 
      subLabel: 'ভেরিফিকেশন ও অনুমোদন',
      icon: Droplet, 
      count: pendingDonorsCount > 0 ? `${pendingDonorsCount}টি যাচাই বাকি` : undefined,
      countColor: 'bg-rose-500 text-white font-black'
    },
    { 
      id: 'candidate', 
      label: 'প্রার্থী ও বক্তব্য এডিটর', 
      subLabel: 'নাম, ছবি ও মূল বক্তব্য',
      icon: Users 
    },
    { 
      id: 'budget', 
      label: 'বাজেট ও অর্থ হিসাব', 
      subLabel: 'ইউপি বরাদ্দ ও প্রকল্প হিসাব',
      icon: Coins 
    },
    { 
      id: 'deploy', 
      label: 'Vercel ও ক্লাউড গাইড', 
      subLabel: 'লাইভ ডোমেন ও হোস্টিং',
      icon: CloudUpload 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0 shrink-0 ${
        isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      }`}>
        
        {/* Brand / Profile Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 shadow-xs">
                <img
                  src={candidate.photoUrl || "/candidate-latif.jpg"}
                  alt={candidate.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm text-white truncate leading-tight">
                {candidate.name}
              </h2>
              <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
                সুপার অ্যাডমিন প্যানেল
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Union Council Pill */}
        <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span className="truncate">১২ নং যুগিখালী ইউনিয়ন পরিষদ</span>
          <span className="text-emerald-400 font-bold shrink-0">সক্রিয়</span>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
          <div className="px-3 pt-2 pb-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
            কন্ট্রোল মেনু
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/50 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg transition ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-emerald-400 group-hover:bg-slate-700/60'
                  }`}>
                    <Icon className="w-4 h-4 shrink-0" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm block truncate leading-tight">
                      {item.label}
                    </span>
                    {item.subLabel && (
                      <span className={`text-[10px] block truncate mt-0.5 ${
                        isActive ? 'text-emerald-100 font-normal' : 'text-slate-500 group-hover:text-slate-400 font-normal'
                      }`}>
                        {item.subLabel}
                      </span>
                    )}
                  </div>
                </div>

                {item.count !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold shrink-0 ml-2 ${
                    isActive 
                      ? 'bg-white text-emerald-950 shadow-2xs' 
                      : (item.countColor || 'bg-slate-800 text-slate-300')
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-3 border-t border-slate-800 space-y-1.5 bg-slate-950/40">
          <Link
            href="/"
            target="_blank"
            className="w-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/90 p-2.5 rounded-xl transition flex items-center justify-between border border-slate-800"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>লাইভ সাইট দেখুন</span>
            </span>
            <span className="text-[10px] text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60">
              লাইভ
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-xs font-bold text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 p-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer border border-rose-900/40"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>লগআউট করুন</span>
          </button>
        </div>
      </aside>

      {/* Main Content View Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 lg:hidden transition cursor-pointer"
              title="সাইড মেনু খুলুন"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb & Title */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <span>সুপার অ্যাডমিন</span>
                <span>/</span>
                <span className="text-emerald-700 font-bold">
                  {menuItems.find(m => m.id === activeTab)?.label || 'ড্যাশবোর্ড'}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {menuItems.find(m => m.id === activeTab)?.label || 'ড্যাশবোর্ড'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 px-3 py-1.5 rounded-xl transition shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">লাইভ সাইট</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">লগআউট</span>
            </button>
          </div>
        </header>

        {/* Tab Content Wrapper */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Campaign Mode Quick Banner */}
            <div className="bg-gradient-to-r from-emerald-950 to-teal-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-emerald-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base">নির্বাচনী প্রচারণা মোড সক্রিয় রয়েছে</h4>
                  <p className="text-xs text-emerald-200 mt-0.5">
                    বর্তমানে ১০টি সেকশনের মধ্যে <strong>{activeSectionsCount}টি সেকশন</strong> চালু আছে। বাকি অপ্রয়োজনীয় সেকশনগুলো অফ রয়েছে।
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('sections')}
                className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 self-start sm:self-center shrink-0 cursor-pointer shadow-xs active:scale-95"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>সেকশন নিয়ন্ত্রণ করুন</span>
              </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div 
                onClick={() => setActiveTab('memberCandidates')}
                className="bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-5 shadow-xs cursor-pointer transition"
              >
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">ওয়ার্ড মেম্বার প্রার্থী</span>
                <span className="text-3xl font-extrabold text-emerald-700">{memberCandidates.length} জন</span>
                <span className="text-[11px] font-bold text-emerald-600 block mt-1">
                  {memberCandidates.filter(c => c.isActive).length} জন সক্রিয় প্রার্থী ✓
                </span>
              </div>

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

              <div 
                onClick={() => setActiveTab('grievances')}
                className="bg-white border border-slate-200 hover:border-amber-300 rounded-2xl p-5 shadow-xs cursor-pointer transition"
              >
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">নাগরিক অভিযোগ</span>
                <span className="text-3xl font-extrabold text-amber-600">{grievances.length} টি</span>
                <span className={`text-[11px] font-bold block mt-1 ${pendingGrievances > 0 ? 'text-rose-500' : 'text-emerald-600'}`}>
                  {pendingGrievances > 0 ? `${pendingGrievances}টি সমাধান প্রয়োজন` : 'সব সমাধানকৃত ✓'}
                </span>
              </div>

              <div 
                onClick={() => setActiveTab('blood')}
                className="bg-white border border-slate-200 hover:border-rose-300 rounded-2xl p-5 shadow-xs cursor-pointer transition"
              >
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">রক্তদাতা নেটওয়ার্ক</span>
                <span className="text-3xl font-extrabold text-rose-600">{approvedDonors.length} জন</span>
                <span className={`text-[11px] font-bold block mt-1 ${pendingDonorsCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {pendingDonorsCount > 0 ? `⚠️ ${pendingDonorsCount}টি যাচাই বাকি` : 'সব অনুমোদিত ✓'}
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

        {/* Tab: SECTION VISIBILITY CONTROL (CAMPAIGN MODE) */}
        {activeTab === 'sections' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Notification alert */}
            {sectionNotice && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{sectionNotice}</span>
                </div>
                <button onClick={() => setSectionNotice(null)} className="text-emerald-700 hover:text-emerald-900 text-xs font-bold px-2 py-1">
                  ✕
                </button>
              </div>
            )}

            {/* Header Preset Control Card */}
            <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-emerald-800/60">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-3">
                    <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                    <span>নির্বাচনী প্রচার মোড ও ওয়েবসাইট নিয়ন্ত্রণ</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    ওয়েবসাইট সেকশন অন/অফ নিয়ন্ত্রণ
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    বর্তমানে ওয়েবসাইটটি <strong>নির্বাচনী প্রচারণার কাজে</strong> ব্যবহৃত হচ্ছে। তাই শুধুমাত্র প্রচারণার জন্য জরুরি সেকশনগুলো চালু রেখে বাকি প্রশাসনিক সেকশনগুলো (যেমন প্রমিজ ট্র্যাকার, ইউপি বাজেট হিসাব, সনদ গাইড) এক ক্লিকেই বন্ধ করে দেওয়া হয়েছে। আপনি প্রয়োজন অনুযায়ী যেকোনো সময় চালু বা বন্ধ করতে পারবেন।
                  </p>
                </div>

                {/* Quick Presets Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <button
                    onClick={() => {
                      setCampaignMode();
                      setSectionNotice("🎯 নির্বাচনী প্রচারণা মোড সক্রিয় করা হয়েছে! (প্রচারণার জন্য জরুরি ৬টি সেকশন অন এবং বাকি প্রশাসনিক সেকশনগুলো অফ করা হয়েছে)");
                      setTimeout(() => setSectionNotice(null), 5000);
                    }}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Megaphone className="w-4 h-4 text-slate-950" />
                    <span>নির্বাচনী প্রচার মোড (এক ক্লিকে সেট)</span>
                  </button>

                  <button
                    onClick={() => {
                      setAllSectionsOn();
                      setSectionNotice("🏛️ সকল সেকশন সফলভাবে চালু করা হয়েছে (পূর্ণাঙ্গ পরিষদ মোড)!");
                      setTimeout(() => setSectionNotice(null), 5000);
                    }}
                    className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-emerald-300" />
                    <span>সব সেকশন চালু করুন</span>
                  </button>
                </div>
              </div>

              {/* Status Bar */}
              <div className="mt-6 pt-5 border-t border-emerald-800/80 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  বর্তমানে ওয়েবসাইটে চালু: <strong className="text-white">{activeSectionsCount}টি সেকশন</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  বন্ধ (লুকানো): <strong className="text-white">{10 - activeSectionsCount}টি সেকশন</strong>
                </span>
                <span className="text-emerald-300/80 text-[11px] ml-auto">
                  * এখানে পরিবর্তন করার সাথে সাথেই ওয়েবসাইটে লাইভ কার্যকর হয়
                </span>
              </div>
            </div>

            {/* Section Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {sectionList.map((sec) => {
                const isVisible = sectionVisibility ? sectionVisibility[sec.key] : true;
                return (
                  <div
                    key={sec.key}
                    className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                      isVisible
                        ? 'bg-white border-emerald-300 shadow-xs ring-1 ring-emerald-500/10'
                        : 'bg-slate-50/90 border-slate-200 opacity-75'
                    }`}
                  >
                    <div>
                      {/* Top Badges & Switch */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                              sec.isCampaignEssential
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-slate-200 text-slate-700 border border-slate-300'
                            }`}
                          >
                            {sec.badge}
                          </span>

                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 ${
                              isVisible
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {isVisible ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3 text-slate-500" />}
                            <span>{isVisible ? 'চালু (প্রদর্শিত)' : 'বন্ধ (লুকানো)'}</span>
                          </span>
                        </div>

                        {/* Interactive Toggle Switch */}
                        <button
                          type="button"
                          role="switch"
                          aria-checked={isVisible}
                          onClick={() => {
                            updateSectionVisibility(sec.key, !isVisible);
                            setSectionNotice(`"${sec.name}" ${!isVisible ? 'চালু করা হয়েছে' : 'বন্ধ করা হয়েছে'}!`);
                            setTimeout(() => setSectionNotice(null), 3000);
                          }}
                          className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 ${
                            isVisible ? 'bg-emerald-600' : 'bg-slate-300'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                              isVisible ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {sec.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {sec.desc}
                      </p>
                    </div>

                    {/* Bottom Preview Link */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400">
                        আইডি: #{sec.key}
                      </span>
                      {isVisible ? (
                        <a
                          href={sec.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 hover:underline"
                        >
                          <span>হোমপেজে দেখুন</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">বর্তমানে হোমপেজ থেকে লুকানো</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab: ACTIVITIES MANAGEMENT */}
        {activeTab === 'activities' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  মাঠপর্যায়ের সামাজিক কার্যক্রম ও সেবা ভিডিও
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  রোগী পরিদর্শন, চিকিৎসা সহায়তা ও সমাজকল্যাণমূলক কাজের ভিডিও ও তথ্য ব্যবস্থাপনা (মোট {socialActivities.length}টি)
                </p>
              </div>

              <button
                onClick={() => setShowNewActivityModal(true)}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition shadow-xs cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ভিডিও কার্যক্রম যোগ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {socialActivities.map((act) => (
                <div key={act.id} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded">
                        {act.category}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{act.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{act.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{act.description}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                      <span className="text-emerald-700 font-semibold">স্থান: {act.location}</span>
                      {act.duration && <span>দৈর্ঘ্য: {act.duration}</span>}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={act.videoUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>ভিডিও লিংক খুলুন</span>
                    </a>
                    <button
                      onClick={() => {
                        if (confirm(`আপনি কি "${act.title}" তালিকা থেকে মুছে ফেলতে চান?`)) {
                          deleteSocialActivity(act.id);
                        }
                      }}
                      className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>মুছুন</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: New Activity in Superadmin */}
            {showNewActivityModal && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        নতুন সামাজিক কার্যক্রম বা ভিডিও যুক্ত করুন
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        রোগী পরিদর্শন, চিকিৎসা সহায়তা বা মাঠপর্যায়ের কাজের ভিডিও তথ্য
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNewActivityModal(false)}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleAddNewActivity} className="space-y-4 text-xs sm:text-sm">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        কার্যক্রমের শিরোনাম <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: ৩ নং ওয়ার্ডের অসুস্থ কৃষক মকবুল চাচার বাড়িতে দেখতে যাওয়া"
                        value={newActTitle}
                        onChange={(e) => setNewActTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                        <select
                          value={newActCategory}
                          onChange={(e) => setNewActCategory(e.target.value as any)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                        >
                          <option value="অসুস্থদের সেবা ও রোগী দর্শন">অসুস্থদের সেবা ও রোগী দর্শন</option>
                          <option value="ত্রাণ ও মানবিক সহায়তা">ত্রাণ ও মানবিক সহায়তা</option>
                          <option value="মাঠপর্যায়ের উন্নয়ন">মাঠপর্যায়ের উন্নয়ন</option>
                          <option value="শিক্ষা ও যুব উন্নয়ন">শিক্ষা ও যুব উন্নয়ন</option>
                          <option value="অন্যান্য">অন্যান্য</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">ওয়ার্ড / স্থান *</label>
                        <select
                          value={newActLocation}
                          onChange={(e) => setNewActLocation(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                        >
                          {jugikhaliWards.map(w => (
                            <option key={w.number} value={`${w.name} (${w.villages.join(', ')})`}>
                              {w.name} ({w.villages.join(', ')})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        YouTube ভিডিও লিংক
                      </label>
                      <input
                        type="text"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={newActVideoUrl}
                        onChange={(e) => setNewActVideoUrl(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">তারিখ</label>
                        <input
                          type="text"
                          placeholder="যেমন: ২০ অক্টোবর ২০২৬"
                          value={newActDate}
                          onChange={(e) => setNewActDate(e.target.value)}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">উপস্থিত ব্যক্তিবর্গ</label>
                        <input
                          type="text"
                          value={newActAttendees}
                          onChange={(e) => setNewActAttendees(e.target.value)}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        কার্যক্রমের বিস্তারিত বিবরণ <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="ঘটনা ও সেবামূলক উদ্যোগের বিস্তারিত..."
                        value={newActDesc}
                        onChange={(e) => setNewActDesc(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowNewActivityModal(false)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                      >
                        বাতিল
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition shadow-xs"
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

        {/* Tab: WARD MEMBER CANDIDATES MANAGEMENT */}
        {activeTab === 'memberCandidates' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ইউপি মেম্বার পোর্টাল
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    ১২ নং যুগিখালী ইউনিয়ন
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  ওয়ার্ডভিত্তিক ইউপি সদস্য (মেম্বার) প্রার্থী ব্যবস্থাপনা
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  ১ থেকে ৯ নং ওয়ার্ডের জামায়াত সমর্থিত ও দায়িত্বশীল প্রার্থীদের নাম, ছবি, বংশ পরিচিতি ও সম্পূর্ণ শিক্ষাগত যোগ্যতা যোগ ও এডিট করুন (মোট {memberCandidates.length} জন প্রার্থী)।
                </p>
              </div>

              <button
                onClick={openNewMemberModal}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition shadow-xs cursor-pointer active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন মেম্বার প্রার্থী যোগ করুন</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-2xs">
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setCandFilterWard('সকল')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    candFilterWard === 'সকল'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  সকল ওয়ার্ড ({memberCandidates.length})
                </button>
                {jugikhaliWards.map((w) => {
                  const count = memberCandidates.filter(c => c.wardNumber === w.number).length;
                  return (
                    <button
                      key={w.number}
                      onClick={() => setCandFilterWard(String(w.number))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        candFilterWard === String(w.number)
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>{w.name}</span>
                      {count > 0 && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                          candFilterWard === String(w.number) ? 'bg-white text-emerald-900' : 'bg-emerald-600 text-white'
                        }`}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="প্রার্থীর নাম বা গ্রাম খুঁজুন..."
                  value={candSearchText}
                  onChange={(e) => setCandSearchText(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            {/* Candidates List Cards */}
            {(() => {
              const filtered = memberCandidates.filter(c => {
                const matchesWard = candFilterWard === 'সকল' || c.wardNumber === Number(candFilterWard);
                const matchesSearch = candSearchText === '' || 
                  c.name.toLowerCase().includes(candSearchText.toLowerCase()) ||
                  c.village.toLowerCase().includes(candSearchText.toLowerCase()) ||
                  (c.fatherName && c.fatherName.toLowerCase().includes(candSearchText.toLowerCase())) ||
                  (c.shortQualifications && c.shortQualifications.toLowerCase().includes(candSearchText.toLowerCase()));
                return matchesWard && matchesSearch;
              });

              if (filtered.length === 0) {
                return (
                  <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <Users className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">কোনো মেম্বার প্রার্থী পাওয়া যায়নি</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                        {candFilterWard !== 'সকল' ? `${candFilterWard} নং ওয়ার্ডের জন্য এখনো কোনো প্রার্থী যুক্ত করা হয়নি।` : 'অনুসন্ধানের সাথে কোনো প্রার্থীর তথ্য মিলছে না।'}
                      </p>
                    </div>
                    <button
                      onClick={openNewMemberModal}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>নতুন প্রার্থী যোগ করুন</span>
                    </button>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 gap-6">
                  {filtered.map((cand) => (
                    <div
                      key={cand.id}
                      className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition space-y-6"
                    >
                      {/* Top Header of Candidate Card */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                        <div className="flex items-start sm:items-center gap-4">
                          <div className="relative shrink-0">
                            <img
                              src={cand.photoUrl || '/member-afsar.png'}
                              alt={cand.name}
                              className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-2xl border-2 border-emerald-500 shadow-md bg-slate-100"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/candidate-latif.jpg';
                              }}
                            />
                            <span className={`absolute -bottom-1 -right-1 text-[10px] font-black px-2 py-0.5 rounded-full border shadow-2xs ${
                              cand.isActive ? 'bg-emerald-600 text-white border-white' : 'bg-slate-400 text-white border-white'
                            }`}>
                              {cand.isActive ? 'প্রদর্শিত' : 'লুকানো'}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-extrabold text-xs">
                                {cand.wardName || `${cand.wardNumber} নং ওয়ার্ড`} • {cand.village}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 font-bold text-xs border border-teal-200">
                                {cand.party}
                              </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                              {cand.name}
                            </h3>

                            <p className="text-xs text-slate-600 font-semibold">
                              {cand.designation}
                            </p>

                            {(cand.fatherName || cand.motherName) && (
                              <p className="text-xs text-slate-500 flex flex-wrap gap-x-3 pt-0.5">
                                {cand.fatherName && <span><strong>পিতা:</strong> {cand.fatherName}</span>}
                                {cand.motherName && <span><strong>মাতা:</strong> {cand.motherName}</span>}
                              </p>
                            )}

                            {cand.phone && (
                              <p className="text-xs text-emerald-800 font-bold flex items-center gap-1.5 pt-1">
                                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{cand.phone}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Top Actions: Edit / Status / Delete */}
                        <div className="flex sm:flex-col gap-2 w-full sm:w-auto self-end sm:self-center shrink-0">
                          <button
                            onClick={() => openEditMemberModal(cand)}
                            className="flex-1 sm:flex-initial px-3.5 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>সম্পাদনা করুন</span>
                          </button>

                          <button
                            onClick={() => {
                              updateMemberCandidate(cand.id, { isActive: !cand.isActive });
                            }}
                            className={`flex-1 sm:flex-initial px-3.5 py-2 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                              cand.isActive
                                ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            }`}
                          >
                            {cand.isActive ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>হাইড করুন</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>সাইটে দেখান</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`আপনি কি "${cand.name}"-এর তথ্য তালিকা থেকে মুছে ফেলতে চান?`)) {
                                deleteMemberCandidate(cand.id);
                              }
                            }}
                            className="flex-1 sm:flex-initial px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer border border-rose-200"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                            <span>মুছুন</span>
                          </button>
                        </div>
                      </div>

                      {/* Qualifications & Bio Highlights */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                            <GraduationCap className="w-4 h-4 text-emerald-700" />
                            <span>শিক্ষাগত যোগ্যতা সারসংক্ষেপ:</span>
                          </div>
                          <p className="text-sm font-extrabold text-emerald-950">
                            {cand.shortQualifications || 'উচ্চশিক্ষিত ও যোগ্য প্রার্থী'}
                          </p>
                          {cand.bio && (
                            <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                              &ldquo;{cand.bio}&rdquo;
                            </p>
                          )}
                        </div>

                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <span>মূল নির্বাচনী অঙ্গীকার:</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            {cand.manifestoPledge || 'ইনসাফভিত্তিক সমাজ ও রাস্তাঘাট সংস্কারে নিবেদিত।' }
                          </p>
                        </div>
                      </div>

                      {/* Detailed Education Milestones Table */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-emerald-600" />
                            <span>সম্পূর্ণ শিক্ষাগত যোগ্যতার সনদ ও ফলাফল ({cand.education?.length || 0}টি ডিগ্রি)</span>
                          </h4>
                          <span className="text-[11px] text-slate-500 font-medium">
                            পরীক্ষা, পাসের সন, প্রতিষ্ঠান ও প্রাপ্ত বিভাগ/জিপিএ
                          </span>
                        </div>

                        {cand.education && cand.education.length > 0 ? (
                          <div className="overflow-x-auto rounded-2xl border border-slate-200">
                            <table className="w-full text-left text-xs text-slate-700">
                              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                                <tr>
                                  <th className="py-2.5 px-3">ক্রম</th>
                                  <th className="py-2.5 px-3">ডিগ্রি / পরীক্ষার নাম</th>
                                  <th className="py-2.5 px-3">পাসের সন</th>
                                  <th className="py-2.5 px-3">শিক্ষা প্রতিষ্ঠান / বোর্ড / বিশ্ববিদ্যালয়</th>
                                  <th className="py-2.5 px-3 text-right">ফলাফল / বিভাগ</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white">
                                {cand.education.map((edu, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                                    <td className="py-2.5 px-3 font-mono font-bold text-slate-400">০{idx + 1}</td>
                                    <td className="py-2.5 px-3 font-bold text-slate-900">{edu.degree}</td>
                                    <td className="py-2.5 px-3 font-semibold text-emerald-800">{edu.year || '—'}</td>
                                    <td className="py-2.5 px-3 text-slate-600">{edu.institution || '—'}</td>
                                    <td className="py-2.5 px-3 text-right">
                                      <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80">
                                        {edu.result || 'উত্তীর্ণ'}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic">কোনো সনদের তথ্য যোগ করা হয়নি।</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Modal: Add or Edit Member Candidate */}
            {showMemberModal && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900">
                        {editingMemberId ? 'প্রার্থীর তথ্য সম্পাদনা করুন' : 'নতুন ওয়ার্ড মেম্বার প্রার্থী যোগ করুন'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        ১২ নং যুগিখালী ইউনিয়ন পরিষদের ওয়ার্ডভিত্তিক প্রার্থী ও শিক্ষাগত তথ্য
                      </p>
                    </div>
                    <button
                      onClick={() => setShowMemberModal(false)}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveMemberCandidate} className="space-y-5 text-xs sm:text-sm">
                    {/* Basic Info: Name, Father, Mother */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          প্রার্থীর পুরো নাম <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="যেমন: মো: আফছার আলী"
                          value={mName}
                          onChange={(e) => setMName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          পিতার নাম
                        </label>
                        <input
                          type="text"
                          placeholder="যেমন: মো: ওমর আলী"
                          value={mFatherName}
                          onChange={(e) => setMFatherName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          মাতার নাম
                        </label>
                        <input
                          type="text"
                          placeholder="যেমন: সাজেদা খাতুন"
                          value={mMotherName}
                          onChange={(e) => setMMotherName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Ward, Village, Designation */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          ওয়ার্ড নির্বাচন <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={mWardNumber}
                          onChange={(e) => {
                            const wNum = Number(e.target.value);
                            setMWardNumber(wNum);
                            const found = jugikhaliWards.find(w => w.number === wNum);
                            if (found && found.villages.length > 0) {
                              setMVillage(found.villages[0]);
                            }
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                        >
                          {jugikhaliWards.map(w => (
                            <option key={w.number} value={w.number}>
                              {w.name} ({w.villages.join(', ')})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          গ্রাম / এলাকা
                        </label>
                        <input
                          type="text"
                          placeholder="যেমন: পাইকপাড়া"
                          value={mVillage}
                          onChange={(e) => setMVillage(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          পদবী
                        </label>
                        <select
                          value={mDesignation}
                          onChange={(e) => setMDesignation(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="ইউপি সাধারণ সদস্য (মেম্বার) পদপ্রার্থী">ইউপি সাধারণ সদস্য (মেম্বার) পদপ্রার্থী</option>
                          <option value="সংরক্ষিত মহিলা সদস্য পদপ্রার্থী">সংরক্ষিত মহিলা সদস্য পদপ্রার্থী</option>
                        </select>
                      </div>
                    </div>

                    {/* Party, Short Qualifications, Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          দল ও সমর্থন
                        </label>
                        <input
                          type="text"
                          value={mParty}
                          onChange={(e) => setMParty(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          সংক্ষিপ্ত শিক্ষাগত যোগ্যতা
                        </label>
                        <input
                          type="text"
                          placeholder="যেমন: বিএ (অনার্স), এমএ (ডাবল), বিএমএড & এলএলবি"
                          value={mShortQualifications}
                          onChange={(e) => setMShortQualifications(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          মোবাইল নম্বর
                        </label>
                        <input
                          type="tel"
                          placeholder="যেমন: +880 1712-000000"
                          value={mPhone}
                          onChange={(e) => setMPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Photo Upload & Preview */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                      <label className="block text-xs font-bold text-slate-800">
                        প্রার্থীর ছবি (ফাইল আপলোড বা ইমেজ লিংক)
                      </label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <img
                          src={mPhotoUrl || '/member-afsar.png'}
                          alt="প্রাকদর্শন"
                          className="w-16 h-20 object-cover rounded-xl border border-emerald-500 bg-white shrink-0 shadow-2xs"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/candidate-latif.jpg';
                          }}
                        />
                        <div className="flex-1 space-y-2 w-full">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleMemberPhotoUpload}
                            className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="অথবা ফটো URL লিখুন: /member-afsar.png"
                              value={mPhotoUrl}
                              onChange={(e) => setMPhotoUrl(e.target.value)}
                              className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setMPhotoUrl('/member-afsar.png')}
                              className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold shrink-0"
                            >
                              আফছার আলীর ছবি
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bio & Manifesto Pledge */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          পরিচিতি ও ভোটারদের প্রতি আবেদন (Bio)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="ওয়ার্ডবাসীর সেবা ও ইনসাফ কায়েমে প্রার্থীর বক্তব্য..."
                          value={mBio}
                          onChange={(e) => setMBio(e.target.value)}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          নির্বাচনী অঙ্গীকার (Pledge)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="রাস্তাঘাট সংস্কার, পানি নিষ্কাশন ও অন্যান্য মূল অঙ্গীকার..."
                          value={mPledge}
                          onChange={(e) => setMPledge(e.target.value)}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Active Visibility Toggle */}
                    <div className="flex items-center gap-2 p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
                      <input
                        type="checkbox"
                        id="mActive"
                        checked={mIsActive}
                        onChange={(e) => setMIsActive(e.target.checked)}
                        className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                      />
                      <label htmlFor="mActive" className="text-xs font-bold text-emerald-950 cursor-pointer">
                        ওয়েবসাইটে এই প্রার্থীর তথ্য প্রদর্শন করুন (সক্রিয় রাখুন)
                      </label>
                    </div>

                    {/* Detailed Education Milestones Builder */}
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4 text-emerald-600" />
                            <span>সম্পূর্ণ শিক্ষাগত যোগ্যতার ডিগ্রি তালিকা</span>
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            দাখিল, আলিম, ফাজিল, কামিল, অনার্স, এমএ, এলএলবি সহ সকল ডিগ্রি ও ফলাফল
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={addEducationRow}
                          className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs rounded-xl flex items-center gap-1 transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>আরেকটি ডিগ্রি যোগ করুন</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {mEducation.map((edu, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-50 p-3 rounded-2xl border border-slate-200 grid grid-cols-12 gap-2 items-center"
                          >
                            <div className="col-span-12 sm:col-span-3">
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                ডিগ্রি / পরীক্ষার নাম
                              </label>
                              <input
                                type="text"
                                placeholder="যেমন: ফাজিল (বিএ)"
                                value={edu.degree}
                                onChange={(e) => updateEducationField(idx, 'degree', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                              />
                            </div>

                            <div className="col-span-12 sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                পাসের সন
                              </label>
                              <input
                                type="text"
                                placeholder="যেমন: ২০০৭"
                                value={edu.year || ''}
                                onChange={(e) => updateEducationField(idx, 'year', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                              />
                            </div>

                            <div className="col-span-12 sm:col-span-4">
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                শিক্ষা প্রতিষ্ঠান / বিশ্ববিদ্যালয়
                              </label>
                              <input
                                type="text"
                                placeholder="যেমন: কলারোয়া আলিয়া মাদ্রাসা (ইবি)"
                                value={edu.institution || ''}
                                onChange={(e) => updateEducationField(idx, 'institution', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                              />
                            </div>

                            <div className="col-span-10 sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                                ফলাফল / বিভাগ
                              </label>
                              <input
                                type="text"
                                placeholder="যেমন: প্রথম বিভাগ"
                                value={edu.result || ''}
                                onChange={(e) => updateEducationField(idx, 'result', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-800"
                              />
                            </div>

                            <div className="col-span-2 sm:col-span-1 flex justify-center pt-3 sm:pt-0">
                              <button
                                type="button"
                                onClick={() => removeEducationRow(idx)}
                                className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition"
                                title="এই ডিগ্রি মুছুন"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowMemberModal(false)}
                        className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                      >
                        বাতিল
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95"
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingMemberId ? 'পরিবর্তন সংরক্ষণ করুন' : 'প্রার্থী যোগ সম্পন্ন করুন'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
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

                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateGrievanceStatus(g.id, 'অপেক্ষমাণ (Pending)')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer active:scale-95 ${
                            g.status.includes('অপেক্ষমাণ')
                              ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 font-extrabold shadow-xs'
                              : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                          }`}
                          title="অপেক্ষমাণ রাখুন"
                        >
                          <Clock className="w-3 h-3" />
                          <span>অপেক্ষমাণ</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => updateGrievanceStatus(g.id, 'তদন্তাধীন (In Review)')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer active:scale-95 ${
                            g.status.includes('তদন্তাধীন')
                              ? 'bg-blue-600 text-white ring-2 ring-blue-400 font-extrabold shadow-xs'
                              : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
                          }`}
                          title="তদন্তাধীন করুন"
                        >
                          <Search className="w-3 h-3" />
                          <span>তদন্তাধীন</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => updateGrievanceStatus(g.id, 'সমাধানকৃত (Resolved)')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer active:scale-95 ${
                            g.status.includes('সমাধানকৃত')
                              ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 font-extrabold shadow-xs'
                              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                          title="সমাধানকৃত হিসেবে চিহ্নিত করুন"
                        >
                          <Check className="w-3 h-3" />
                          <span>সমাধানকৃত</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedGrievance(g);
                            setGrievanceResponseText(g.adminResponse || '');
                            setGrievanceNewStatus(g.status);
                          }}
                          className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-lg transition ml-1 cursor-pointer"
                        >
                          মন্তব্য লিখুন
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

        {/* Tab: BLOOD DONOR VERIFICATION & DIRECTORY */}
        {activeTab === 'blood' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200 mb-2">
                  <Droplet className="w-3.5 h-3.5 text-rose-600 fill-current" />
                  <span>যুগিখালী যুব ব্লাড ব্যাংক ভেরিফিকেশন প্যানেল</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  রক্তদাতা যাচাই, অনুমোদন ও তালিকা ব্যবস্থাপনা
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  জনগণ ওয়েবসাইট থেকে রক্তদাতা হিসেবে নিবন্ধন করলে তা প্রথমে এখানে &apos;অপেক্ষমাণ&apos; হিসেবে জমা থাকে। সুপারঅ্যাডমিন অনুমোদন করলেই কেবল মূল সাইটে প্রদর্শিত হবে।
                </p>
              </div>

              {bloodApprovedSuccess && (
                <div className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{bloodApprovedSuccess}</span>
                </div>
              )}
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">মোট রক্তদাতা আবেদন</span>
                  <span className="text-3xl font-extrabold text-slate-900">{bloodDonors.length} জন</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-rose-200 bg-rose-50/40 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-rose-600 block mb-1">যাচাই বাকি (অপেক্ষমাণ)</span>
                  <span className="text-3xl font-extrabold text-rose-700">{pendingDonorsCount} জন</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-700 block mb-1">অনুমোদিত ও ওয়েবসাইটে সক্রিয়</span>
                  <span className="text-3xl font-extrabold text-emerald-700">{approvedDonors.length} জন</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Section 1: PENDING DONORS */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                  <h3 className="font-bold text-slate-900 text-lg">
                    অপেক্ষমাণ রক্তদাতা আবেদনসমূহ ({pendingDonorsCount}টি)
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">অনুমোদনের পর স্বয়ংক্রিয়ভাবে মূল ওয়েবসাইটে দেখাবে</span>
              </div>

              {pendingDonors.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="text-sm font-bold text-slate-700">কোনো অপেক্ষমাণ রক্তদাতা আবেদন নেই</p>
                  <p className="text-xs text-slate-400">নতুন কেউ পাবলিক ফর্ম পূরণ করলে সাথে সাথে এখানে প্রদর্শিত হবে।</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingDonors.map((donor) => (
                    <div
                      key={donor.id}
                      className="bg-rose-50/40 border border-rose-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <span className="w-11 h-11 rounded-xl bg-rose-600 text-white font-black flex items-center justify-center text-base shadow-xs">
                            {donor.bloodGroup}
                          </span>
                          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-200/80 text-rose-900 border border-rose-300">
                            অপেক্ষমাণ
                          </span>
                        </div>

                        <h4 className="font-bold text-slate-900 text-base mb-1">{donor.name}</h4>
                        <p className="text-xs text-slate-600 mb-1.5">
                          <strong>ঠিকানা:</strong> {donor.ward}{donor.village ? ` • ${donor.village}` : ''}
                        </p>
                        <p className="text-xs text-slate-600 mb-2">
                          <strong>মোবাইল:</strong> <a href={`tel:${donor.phone}`} className="text-emerald-700 font-bold hover:underline">{donor.phone}</a>
                        </p>
                        {donor.registeredAt && (
                          <p className="text-[11px] text-slate-400">নিবন্ধনের তারিখ: {donor.registeredAt}</p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-rose-200/60 flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => {
                            approveBloodDonor(donor.id);
                            setBloodApprovedSuccess(`"${donor.name}"-এর রক্তদাতা আবেদন অনুমোদন করা হয়েছে!`);
                            setTimeout(() => setBloodApprovedSuccess(null), 3000);
                          }}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs font-bold py-2 px-3 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>অনুমোদন করুন (Accept)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`আপনি কি "${donor.name}"-এর আবেদন বাতিল ও মুছে ফেলতে চান?`)) {
                              deleteBloodDonor(donor.id);
                            }
                          }}
                          className="p-2 bg-white hover:bg-rose-100 text-rose-600 border border-rose-300 rounded-xl transition cursor-pointer"
                          title="বাতিল ও মুছুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section 2: APPROVED DONORS */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    অনুমোদিত ও ওয়েবসাইটে দৃশ্যমান রক্তদাতাদের তালিকা ({approvedDonors.length} জন)
                  </h3>
                  <p className="text-xs text-slate-500">এই রক্তদাতাদের তথ্য সাধারণ নাগরিকরা মূল সাইটে দেখতে পাচ্ছেন</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..."
                    value={bloodSearchText}
                    onChange={(e) => setBloodSearchText(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-48"
                  />
                  <select
                    value={bloodFilterWard}
                    onChange={(e) => setBloodFilterWard(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium"
                  >
                    <option value="সকল">সকল ওয়ার্ড</option>
                    {jugikhaliWards.map(w => (
                      <option key={w.number} value={w.name}>{w.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid of approved donors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {approvedDonors
                  .filter(d => {
                    const matchesWard = bloodFilterWard === 'সকল' || d.ward === bloodFilterWard;
                    const matchesSearch = !bloodSearchText || 
                      d.name.toLowerCase().includes(bloodSearchText.toLowerCase()) ||
                      d.phone.includes(bloodSearchText) ||
                      (d.village && d.village.toLowerCase().includes(bloodSearchText.toLowerCase()));
                    return matchesWard && matchesSearch;
                  })
                  .map((donor) => (
                    <div
                      key={donor.id}
                      className="bg-slate-50/60 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-300 transition"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 font-extrabold flex items-center justify-center text-sm shadow-2xs">
                            {donor.bloodGroup}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                            অনুমোদিত
                          </span>
                        </div>

                        <h4 className="font-bold text-slate-900 text-sm">{donor.name}</h4>
                        <p className="text-xs text-slate-500">
                          {donor.ward}{donor.village ? ` • ${donor.village}` : ''}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                          <a href={`tel:${donor.phone}`} className="text-emerald-700 font-bold hover:underline">{donor.phone}</a>
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 mt-3 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">{donor.lastDonated}</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`আপনি কি "${donor.name}"-কে তালিকা থেকে মুছে ফেলতে চান?`)) {
                              deleteBloodDonor(donor.id);
                            }
                          }}
                          className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-semibold p-1 hover:bg-rose-50 rounded cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
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

        </main>
      </div>

    </div>
  );
}
