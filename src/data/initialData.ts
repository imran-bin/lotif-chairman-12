export interface CandidateInfo {
  name: string;
  designation: string;
  union: string;
  party: string;
  slogan: string;
  subSlogan: string;
  salam: string;
  mainPledge: string;
  appeal: string;
  photoUrl: string;
  phone: string;
  email: string;
  facebook: string;
  campaignCell: string;
  totalSupporters: number;
}

export interface ManifestoPillar {
  id: number;
  title: string;
  subtitle: string;
  iconName: string;
  points: {
    title: string;
    description: string;
  }[];
}

export interface PromiseItem {
  id: string;
  title: string;
  category: 'সুশাসন' | 'নাগরিক সেবা' | 'অবকাঠামো' | 'স্বাস্থ্য ও শিক্ষা' | 'কৃষি ও অর্থনীতি';
  targetDate: string;
  progress: number; // 0 to 100
  status: 'পরিকল্পনাধীন' | 'চলমান' | 'বাস্তবায়িত';
  description: string;
  lastUpdated: string;
  budgetAllocated?: string;
  location?: string;
}

export interface SectionVisibility {
  hero: boolean;
  manifesto: boolean;
  socialActivities: boolean;
  islamicGuidance: boolean;
  promiseTracker: boolean;
  grievanceBox: boolean;
  emergencyServices: boolean;
  budgetTransparency: boolean;
  agricultureCorner: boolean;
  certificateGuide: boolean;
  memberCandidates?: boolean;
}

export interface EducationRecord {
  degree: string;
  year?: string;
  institution?: string;
  result?: string;
}

export interface MemberCandidate {
  id: string;
  name: string;
  fatherName: string;
  motherName: string;
  wardNumber: number;
  wardName: string;
  village: string;
  designation: string;
  party: string;
  symbol?: string;
  photoUrl: string;
  phone?: string;
  email?: string;
  bio?: string;
  shortQualifications: string;
  education: EducationRecord[];
  manifestoPledge?: string;
  isActive: boolean;
}

export interface SocialActivity {
  id: string;
  title: string;
  category: 'অসুস্থদের সেবা ও রোগী দর্শন' | 'ত্রাণ ও মানবিক সহায়তা' | 'মাঠপর্যায়ের উন্নয়ন' | 'শিক্ষা ও যুব উন্নয়ন' | 'অন্যান্য';
  date: string;
  location: string;
  description: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
  attendees?: string;
}

export interface Grievance {
  id: string;
  trackingCode: string;
  title: string;
  category: 'রাস্তাঘাট' | 'জলাবদ্ধতা ও ড্রেন' | 'বিশুদ্ধ পানি' | 'ঘুষ ও দুর্নীতি' | 'বিদ্যুৎ ও সোলার' | 'অন্যান্য';
  ward: string;
  village: string;
  citizenName: string;
  phone: string;
  description: string;
  photoUrl?: string;
  status: 'অপেক্ষমাণ (Pending)' | 'তদন্তাধীন (In Review)' | 'সমাধানকৃত (Resolved)';
  submittedAt: string;
  adminResponse?: string;
}

export interface EmergencyContact {
  id: string;
  title: string;
  category: 'অ্যাম্বুলেন্স' | 'ফায়ার সার্ভিস' | 'পুলিশ' | 'ইউনিয়ন হেল্পলাইন' | 'চিকিৎসক';
  phone: string;
  availableHours: string;
  location: string;
  note?: string;
}

export interface WardInfo {
  number: number;
  name: string;
  villages: string[];
}

export const jugikhaliWards: WardInfo[] = [
  { number: 1, name: "১ নং ওয়ার্ড", villages: ["রাজনগর", "মানিকনগর"] },
  { number: 2, name: "২ নং ওয়ার্ড", villages: ["যুগিখালী"] },
  { number: 3, name: "৩ নং ওয়ার্ড", villages: ["পাইকপাড়া"] },
  { number: 4, name: "৪ নং ওয়ার্ড", villages: ["কামারালি"] },
  { number: 5, name: "৫ নং ওয়ার্ড", villages: ["তরুলিয়া", "তালুন্দিয়া", "মিরডাঙ্গা"] },
  { number: 6, name: "৬ নং ওয়ার্ড", villages: ["বামনালী", "গোছমারা"] },
  { number: 7, name: "৭ নং ওয়ার্ড", villages: ["ওফাপুর পূর্ব"] },
  { number: 8, name: "৮ নং ওয়ার্ড", villages: ["ওফাপুর পশ্চিম", "বামনখালী"] },
  { number: 9, name: "৯ নং ওয়ার্ড", villages: ["পাঁচনল", "হামিদপুর"] },
];

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: string;
  ward: string;
  village?: string;
  phone: string;
  lastDonated: string;
  isAvailable: boolean;
  status?: 'pending' | 'approved';
  registeredAt?: string;
}

export interface BudgetItem {
  id: string;
  fiscalYear: string;
  totalBudget: string;
  govGrant: string;
  localTax: string;
  spentAmount: string;
  projects: {
    name: string;
    ward: string;
    allocated: string;
    spent: string;
    status: string;
  }[];
}

export interface AgricultureInfo {
  dealers: {
    name: string;
    storeName: string;
    ward: string;
    phone: string;
    fertilizers: string[];
  }[];
  priceList: {
    item: string;
    govPrice: string;
    unit: string;
  }[];
  officers: {
    name: string;
    designation: string;
    phone: string;
  }[];
}

export const initialCandidateInfo: CandidateInfo = {
  name: "মাওলানা আব্দুল লতিফ",
  designation: "চেয়ারম্যান পদপ্রার্থী",
  union: "১২ নং যুগিখালী ইউনিয়ন পরিষদ",
  party: "বাংলাদেশ জামায়াতে ইসলামী মনোনীত প্রার্থী",
  slogan: "সৎ, দক্ষ ও জনবান্ধব নেতৃত্ব",
  subSlogan: "ইনসাফভিত্তিক সমাজ ও মডেল যুগিখালী ইউনিয়ন গড়ার অঙ্গীকার",
  salam: "আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ। প্রিয় যুগিখালী ইউনিয়নের সর্বস্তরের সম্মানিত ভাই ও বোনেরা, মুরুব্বি ও যুবসমাজ। আগামী ১২ নং যুগিখালী ইউনিয়ন পরিষদ নির্বাচনে আপনাদের সেবা করার জন্য আমি চেয়ারম্যান পদপ্রার্থী হিসেবে আপনাদের দোয়া, সমর্থন ও মূল্যবান ভোট প্রার্থনা করছি।",
  mainPledge: "আমাদের লক্ষ্য হলো যুগিখালী ইউনিয়নকে একটি দুর্নীতিমুক্ত, মাদকমুক্ত, আধুনিক ও জনবান্ধব মডেল ইউনিয়ন হিসেবে গড়ে তোলা। জনগণের প্রতিটি টাকা ও অধিকার রক্ষায় আমরা বদ্ধপরিকর।",
  appeal: "আসুন, দলমত নির্বিশেষে সততা ও যোগ্যতার পক্ষে রায় দিয়ে যুগিখালী ইউনিয়নের উন্নয়নে আমাদের হাত শক্ত করুন। আপনার একটি সঠিক ভোট আমাদের ইউনিয়নকে একটি ইনসাফপূর্ণ ও উন্নত জনপদে রূপান্তর করতে পারে।",
  photoUrl: "/candidate-latif.jpg",
  phone: "+880 1735-885527",
  email: "engg.imran22@gmail.com",
  facebook: "https://facebook.com",
  campaignCell: "১২ নং যুগিখালী ইউনিয়নবাসীর পক্ষে, মাওলানা আব্দুল লতিফ নির্বাচনী প্রচার সেল ও ডিজিটাল টিম।",
  totalSupporters: 3840,
};

export const initialManifestoPillars: ManifestoPillar[] = [
  {
    id: 1,
    title: "স্মার্ট অ্যাপ ভিত্তিক জবাবদিহিতা ও সুশাসন",
    subtitle: "স্বচ্ছতা ও প্রতিটি কাজের জবাবদিহিতা নিশ্চিতকরণ",
    iconName: "ShieldCheck",
    points: [
      {
        title: "ডিজিটাল পোর্টাল ও অভিযোগ বক্স",
        description: "ইউনিয়নের বাসিন্দারা ঘরে বসেই যেকোনো সমস্যার অভিযোগ জানাতে পারবেন এবং তার প্রতিকার সরাসরি অনলাইনে ট্র্যাক করতে পারবেন।"
      },
      {
        title: "স্বচ্ছ প্রমিজ ট্র্যাকার (Promise Tracker)",
        description: "নির্বাচনী প্রতিশ্রুতিগুলো কতটুকু বাস্তবায়ন হলো, তা অ্যাপের মাধ্যমে প্রতি বছর জনগণের সামনে গ্রাফ ও শতাংশে তুলে ধরা হবে। কোনো ফাঁকি বা লুকোচুরি থাকবে না।"
      },
      {
        title: "বাজেট উন্মুক্তকরণ",
        description: "ইউনিয়ন পরিষদের উন্নয়ন কাজের বাজেট, সরকারি বরাদ্দ এবং ব্যয়ের পুঙ্খানুপুঙ্খ হিসাব উন্মুক্ত রাখা হবে।"
      }
    ]
  },
  {
    id: 2,
    title: "নাগরিক সেবা ও সামাজিক নিরাপত্তা",
    subtitle: "ঘুষমুক্ত, দালালিহীন ও মানবিক সেবা নিশ্চিতকরণ",
    iconName: "Users",
    points: [
      {
        title: "ঘরে বসে সেবা ও সনদ বিতরণ",
        description: "জন্মনিবন্ধন, উত্তরাধিকার ও অন্যান্য সনদের আবেদন এবং বিতরণে কোনো প্রকার ঘুষ, অতিরিক্ত ফি বা হয়রানি থাকবে না।"
      },
      {
        title: "স্বচ্ছ ভাতা বিতরণ (স্বজনপ্রীতি মুক্ত)",
        description: "বয়স্ক ভাতা, বিধবা ভাতা, প্রতিবন্ধী ভাতা ও ভিজিডি চাল বিতরণের সুনির্দিষ্ট উন্মুক্ত তালিকা তৈরি করে প্রকৃত অসহায় মানুষের হাতে পৌঁছে দেওয়া নিশ্চিত করা হবে।"
      }
    ]
  },
  {
    id: 3,
    title: "শিক্ষা, স্বাস্থ্য ও যুব উন্নয়ন ইশতেহার",
    subtitle: "নিরাপদ, সুস্থ ও আধুনিক ভবিষ্যৎ প্রজন্ম",
    iconName: "HeartPulse",
    points: [
      {
        title: "মাদক ও অপরাধ দমন",
        description: "যুবসমাজকে ধ্বংসের হাত থেকে রক্ষা করতে কঠোরহস্তে মাদক ও ইভটিজিং নির্মূল করা হবে এবং খেলাধুলা ও গঠনমূলক কাজে সম্পৃক্ত করা হবে।"
      },
      {
        title: "স্বাস্থ্যসেবা ও সাশ্রয়ী অ্যাম্বুলেন্স",
        description: "জরুরি চিকিৎসার জন্য ইউনিয়ন স্বাস্থ্যকেন্দ্রের মান উন্নয়ন, সার্বক্ষণিক প্যারামেডিক ডাক্তার এবং ২৪/৭ সাশ্রয়ী অ্যাম্বুলেন্স সেবা চালু করা হবে।"
      },
      {
        title: "কৃষি ও রাস্তাঘাট উন্নয়ন",
        description: "কৃষকদের জন্য সার ও বীজের সহজলভ্যতা ও সঠিক মূল্য নিশ্চিত করা এবং প্রতিটি ওয়ার্ডের রাস্তাঘাট ও ড্রেনেজ ব্যবস্থার আধুনিকায়ন।"
      }
    ]
  },
  {
    id: 4,
    title: "জনগণের প্রতি উদাত্ত আহ্বান ও অঙ্গীকার",
    subtitle: "ইনসাফপূর্ণ ও উন্নত জনপদে রূপান্তরের শপথ",
    iconName: "Award",
    points: [
      {
        title: "সততা ও যোগ্যতার পক্ষে ঐক্য",
        description: "দলমত নির্বিশেষে সততা ও যোগ্যতার পক্ষে রায় দিয়ে যুগিখালী ইউনিয়নের উন্নয়নে আমাদের হাত শক্ত করুন।"
      },
      {
        title: "ফাঁকি রোধ ও জনঅডিট ব্যবস্থা",
        description: "কাজ না করে বাজেট পাশ করার সুযোগ থাকবে না; প্রতিটি কাজের মূল্যায়ন করবেন স্বয়ং সাধারণ জনগণ।"
      }
    ]
  }
];

export const initialPromises: PromiseItem[] = [
  {
    id: "p1",
    title: "ডিজিটাল অভিযোগ বক্স ও মোবাইল ট্র্যাকিং পোর্টাল",
    category: "সুশাসন",
    targetDate: "প্রথম ১০০ দিন",
    progress: 100,
    status: "বাস্তবায়িত",
    description: "নাগরিকরা ঘরে বসে ছবিসহ রাস্তা ভাঙা বা পানির অভিযোগ দিতে পারবেন এবং ট্র্যাকিং কোড দিয়ে অগ্রগতি দেখতে পারবেন।",
    lastUpdated: "আজকের আপডেট: পোর্টাল রেডি ও চালু হয়েছে",
    budgetAllocated: "স্বেচ্ছাসেবী আইটি টিম",
    location: "সমগ্র যুগিখালী ইউনিয়ন"
  },
  {
    id: "p2",
    title: "স্মার্ট প্রমিজ ট্র্যাকার (রিয়েল-টাইম কাজের অগ্রগতি)",
    category: "সুশাসন",
    targetDate: "চলমান কার্যক্রম",
    progress: 95,
    status: "চলমান",
    description: "প্রতিটি ওয়ার্ডের রাস্তা পাকা, ড্রেন সংস্কার ও কালভার্টের কাজের শতকরা (%) অগ্রগতি ওয়েবসাইটে নিয়মিত আপডেট হবে।",
    lastUpdated: "ড্যাশবোর্ড ইন্টিগ্রেশন সম্পন্ন",
    budgetAllocated: "পরিষদ জবাবদিহিতা তহবিল",
    location: "ওয়ার্ড ১ - ৯"
  },
  {
    id: "p3",
    title: "২৪/৭ জরুরি ইউনিয়ন অ্যাম্বুলেন্স ও অক্সিজেন ব্যাংক",
    category: "স্বাস্থ্য ও শিক্ষা",
    targetDate: "নির্বাচনের ৩ মাসের মধ্যে",
    progress: 75,
    status: "চলমান",
    description: "মুমূর্ষু রোগী ও গর্ভবতী মায়েদের জন্য সাশ্রয়ী মূল্যে ২৪ ঘণ্টা জরুরি অ্যাম্বুলেন্স সার্ভিস ও বিনামূল্যে জরুরি অক্সিজেন সাপোর্ট।",
    lastUpdated: "যানবাহন ও ভেন্ডর চুক্তি চূড়ান্ত পর্যায়ে",
    budgetAllocated: "১৫,০০,০০০ ৳",
    location: "ইউনিয়ন স্বাস্থ্য কমপ্লেক্স চত্বর"
  },
  {
    id: "p4",
    title: "ঘুষমুক্ত ডিজিটাল জন্মনিবন্ধন ও নাগরিক সনদ বিতরণ",
    category: "নাগরিক সেবা",
    targetDate: "প্রথম ৩০ দিন",
    progress: 85,
    status: "চলমান",
    description: "দালালমুক্ত ও ঘুষহীন ব্যবস্থাপনায় সরাসরি অনলাইন আবেদন এবং নির্ধারিত সরকারি ফিতে ঘরে বসে বা দ্রুততম সময়ে সনদ প্রদান।",
    lastUpdated: "ডিজিটাল রেজিস্ট্রি টিম গঠন ও প্রশিক্ষণ",
    budgetAllocated: "৩,০০,০০০ ৳",
    location: "ইউপি ডিজিটাল সেবা কেন্দ্র"
  },
  {
    id: "p5",
    title: "ইউনিয়ন বাজেট উন্মুক্তকরণ ও নাগরিক অডিট সভা",
    category: "সুশাসন",
    targetDate: "প্রতি ৬ মাস অন্তর",
    progress: 70,
    status: "চলমান",
    description: "সরকারি বরাদ্দ, এলজিএসপি ও স্থানীয় করের টাকার পুঙ্খানুপুঙ্খ হিসাব প্রকাশ্যে টাঙিয়ে দেওয়া এবং ওয়েবসাইটে প্রকাশ করা।",
    lastUpdated: "খসড়া ফ্রেমওয়ার্ক প্রস্তুত",
    budgetAllocated: "উন্মুক্ত পাবলিক ফান্ড",
    location: "যুগিখালী পরিষদ মিলনায়তন"
  },
  {
    id: "p6",
    title: "কৃষকদের জন্য সুলভে সার-বীজ ও ডিলার মনিটরিং সেল",
    category: "কৃষি ও অর্থনীতি",
    targetDate: "সার্বক্ষণিক",
    progress: 80,
    status: "চলমান",
    description: "ডিলারদের অতিরিক্ত দাম নেওয়া ও কৃত্রিম সংকট রোধে সরাসরি মনিটরিং সেল এবং ন্যায্যমূল্যে সার-কীটনাশক সরবরাহ নিশ্চিতকরণ।",
    lastUpdated: "ডিলার তালিকা ও মূল্যতালিকা ডাটাবেজ তৈরি",
    budgetAllocated: "কৃষি সুরক্ষা ফান্ড",
    location: "যুগিখালী বাজার ও সকল ওয়ার্ড"
  },
  {
    id: "p7",
    title: "প্রতিটি ওয়ার্ডে টেকসই ড্রেনেজ ও প্রধান সড়ক সংস্কার",
    category: "অবকাঠামো",
    targetDate: "১ম বছর",
    progress: 40,
    status: "পরিকল্পনাধীন",
    description: "বর্ষায় দীর্ঘদিনের জলাবদ্ধতা নিরসনে পরিকল্পিত ড্রেন নির্মাণ এবং ভাঙাচোরা গ্রামীণ সড়কগুলো টেকসই পাকা করা।",
    lastUpdated: "ওয়ার্ডভিত্তিক জরিপ সম্পন্ন",
    budgetAllocated: "১,২০,০০,০০০ ৳ (প্রস্তাবিত)",
    location: "১, ৩, ৫ ও ৮ নং ওয়ার্ড"
  },
  {
    id: "p8",
    title: "মাদক ও ইভটিজিং মুক্ত যুব সমাজ এবং ব্লাড ডোনার ক্লাব",
    category: "স্বাস্থ্য ও শিক্ষা",
    targetDate: "অব্যাহত",
    progress: 90,
    status: "চলমান",
    description: "এলাকার তরুণদের নিয়ে ওয়ার্ডভিত্তিক রক্তদান নেটওয়ার্ক এবং মাদক ও অপরাধের বিরুদ্ধে কঠোর জিরো টলারেন্স অভিযান।",
    lastUpdated: "১০০+ যুব স্বেচ্ছাসেবী তালিকাভুক্ত",
    budgetAllocated: "যুব কল্যাণ ফান্ড",
    location: "সকল ওয়ার্ড"
  }
];

export const initialGrievances: Grievance[] = [
  {
    id: "g1",
    trackingCode: "JUG-2026-1042",
    title: "৩ নং ওয়ার্ডের পাইকপাড়ার রাস্তায় দীর্ঘদিনের জলাবদ্ধতা",
    category: "জলাবদ্ধতা ও ড্রেন",
    ward: "৩ নং ওয়ার্ড",
    village: "পাইকপাড়া",
    citizenName: "মো: রফিকুল ইসলাম",
    phone: "01711-234567",
    description: "মাদ্রাসার সামনের রাস্তায় একটু বৃষ্টি হলেই হাঁটু পানি জমে থাকে। ছাত্রছাত্রী ও বয়োবৃদ্ধদের যাতায়াত অসম্ভব হয়ে পড়েছে। জরুরি ড্রেন সংস্কার দরকার।",
    photoUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=60",
    status: "সমাধানকৃত (Resolved)",
    submittedAt: "১৫ অক্টোবর ২০২৬",
    adminResponse: "চেয়ারম্যান সেলের প্রতিনিধি সরেজমিনে পরিদর্শন করে অস্থায়ী পাইপ ড্রেন বসিয়ে পানি নিষ্কাশনের ব্যবস্থা করেছে। পরবর্তী স্থায়ী ড্রেন প্রকল্পে এটি অগ্রাধিকার দেওয়া হয়েছে।"
  },
  {
    id: "g2",
    trackingCode: "JUG-2026-1089",
    title: "৬ নং ওয়ার্ডের বামনালী গ্রামের গভীর নলকূপ অকেজো হয়ে আছে",
    category: "বিশুদ্ধ পানি",
    ward: "৬ নং ওয়ার্ড",
    village: "বামনালী",
    citizenName: "আসমা বেগম",
    phone: "01923-456789",
    description: "গত দুই সপ্তাহ ধরে খাবার পানির টিউবওয়েলটি নষ্ট। ৫০টিরও বেশি পরিবার দূর থেকে খাবার পানি আনতে বাধ্য হচ্ছে।",
    status: "তদন্তাধীন (In Review)",
    submittedAt: "১৭ অক্টোবর ২০২৬",
    adminResponse: "মেকানিক টিমকে অবগত করা হয়েছে। আগামী ৪৮ ঘণ্টার মধ্যে ফিল্টার মেরামত সম্পন্ন করা হবে।"
  },
  {
    id: "g3",
    trackingCode: "JUG-2026-1120",
    title: "৪ নং ওয়ার্ডের কামারালি বাজারে সার ডিলার নির্ধারিত দামের চেয়ে বেশি রাখছেন",
    category: "ঘুষ ও দুর্নীতি",
    ward: "৪ নং ওয়ার্ড",
    village: "কামারালি",
    citizenName: "আব্দুল করিম (কৃষক)",
    phone: "01845-345678",
    description: "ইউরিয়া ও ডিএপি সারের সরকারি বস্তার দামের চেয়ে বস্তাপ্রতি ১৫০ টাকা বেশি রাখা হচ্ছে। অবিলম্বে নজরদারি দরকার।",
    status: "অপেক্ষমাণ (Pending)",
    submittedAt: "১৮ অক্টোবর ২০২৬",
    adminResponse: "তদন্ত টিম গঠন করা হয়েছে। কৃষি কর্মকর্তার সাথে যোগাযোগ করে সত্যতা যাচাই করা হচ্ছে।"
  }
];

export const initialEmergencyContacts: EmergencyContact[] = [
  {
    id: "e1",
    title: "যুগিখালী জরুরি অ্যাম্বুলেন্স সেবা",
    category: "অ্যাম্বুলেন্স",
    phone: "01712-000111",
    availableHours: "২৪ ঘণ্টা / ৭ দিন",
    location: "ইউপি স্বাস্থ্য কমপ্লেক্স",
    note: "অক্সিজেন সুবিধা সংবলিত, সাশ্রয়ী ভাড়া"
  },
  {
    id: "e2",
    title: "নিকটস্থ ফায়ার সার্ভিস স্টেশন",
    category: "ফায়ার সার্ভিস",
    phone: "01730-002233",
    availableHours: "২৪ ঘণ্টা",
    location: "উপজেলা ফায়ার স্টেশন",
    note: "জরুরি অগ্নিকাণ্ড ও উদ্ধার তৎপরতা"
  },
  {
    id: "e3",
    title: "থানা পুলিশ হেল্পলাইন",
    category: "পুলিশ",
    phone: "01320-003344",
    availableHours: "২৪ ঘণ্টা",
    location: "নিকটস্থ থানা ও পুলিশ ফাঁড়ি",
    note: "আইনশৃঙ্খলা ও জরুরি নিরাপত্তা"
  },
  {
    id: "e4",
    title: "মাওলানা আব্দুল লতিফ জনসেবা হেল্পডেস্ক",
    category: "ইউনিয়ন হেল্পলাইন",
    phone: "+880 1735-885527",
    availableHours: "সকাল ৮টা - রাত ১০টা",
    location: "নির্বাচনী প্রধান কার্যালয়",
    note: "নাগরিক সমস্যা ও সরাসরি অভিযোগ পরামর্শ"
  },
  {
    id: "e5",
    title: "ডা: মো: কামরুল হাসান (এমবিবিএস)",
    category: "চিকিৎসক",
    phone: "01715-445566",
    availableHours: "প্রতিদিন বিকেল ৪টা - রাত ৮টা",
    location: "যুগিখালী ডিজিটাল ডায়াগনস্টিক",
    note: "সাধারণ মেডিসিন ও শিশু স্বাস্থ্য"
  }
];

export const initialBloodDonors: BloodDonor[] = [
  { id: "b1", name: "হাফেজ শরিফুল ইসলাম", bloodGroup: "A+", ward: "১ নং ওয়ার্ড", village: "রাজনগর", phone: "01711-223344", lastDonated: "৩ মাস আগে", isAvailable: true, status: "approved", registeredAt: "১০ অক্টোবর ২০২৬" },
  { id: "b2", name: "মো: মেহেদী হাসান", bloodGroup: "O+", ward: "২ নং ওয়ার্ড", village: "যুগিখালী", phone: "01822-334455", lastDonated: "৪ মাস আগে", isAvailable: true, status: "approved", registeredAt: "১২ অক্টোবর ২০২৬" },
  { id: "b3", name: "মো: তারেক মাহমুদ", bloodGroup: "B+", ward: "৩ নং ওয়ার্ড", village: "পাইকপাড়া", phone: "01933-445566", lastDonated: "২ মাস আগে", isAvailable: false, status: "approved", registeredAt: "১৫ অক্টোবর ২০২৬" },
  { id: "b4", name: "মো: জাহিদুল হক", bloodGroup: "AB+", ward: "৪ নং ওয়ার্ড", village: "কামারালি", phone: "01644-556677", lastDonated: "৫ মাস আগে", isAvailable: true, status: "approved", registeredAt: "১৬ অক্টোবর ২০২৬" },
  { id: "b5", name: "মো: সুমন রেজা", bloodGroup: "O-", ward: "৫ নং ওয়ার্ড", village: "তরুলিয়া", phone: "01755-667788", lastDonated: "৬ মাস আগে", isAvailable: true, status: "approved", registeredAt: "১৭ অক্টোবর ২০২৬" },
  { id: "b6", name: "মো: ইমরান হোসেন", bloodGroup: "B-", ward: "৬ নং ওয়ার্ড", village: "বামনালী", phone: "01866-778899", lastDonated: "৪ মাস আগে", isAvailable: true, status: "approved", registeredAt: "১৮ অক্টোবর ২০২৬" },
  { id: "b7", name: "মাওলানা জুবায়ের আহমেদ", bloodGroup: "A+", ward: "৭ নং ওয়ার্ড", village: "ওফাপুর পূর্ব", phone: "01777-889900", lastDonated: "১ মাস আগে", isAvailable: false, status: "approved", registeredAt: "১৯ অক্টোবর ২০২৬" },
  { id: "b8", name: "মো: নাহিদ হাসান", bloodGroup: "AB-", ward: "৮ নং ওয়ার্ড", village: "বামনখালী", phone: "01988-990011", lastDonated: "৩ মাস আগে", isAvailable: true, status: "approved", registeredAt: "১৯ অক্টোবর ২০২৬" },
  { id: "b9", name: "মো: আব্দুল্লাহ আল মামুন", bloodGroup: "O+", ward: "৯ নং ওয়ার্ড", village: "পাঁচনল", phone: "01799-112233", lastDonated: "২ মাস আগে", isAvailable: true, status: "approved", registeredAt: "২০ অক্টোবর ২০২৬" },
];

export const initialBudget: BudgetItem = {
  id: "bud-2026",
  fiscalYear: "২০২৬ - ২০২৭ (প্রস্তাবিত বাজেট ও হিসাব)",
  totalBudget: "১,৮৫,০০,০০০ ৳",
  govGrant: "১,৪৫,০০,০০০ ৳",
  localTax: "৪০,০০,০০০ ৳",
  spentAmount: "৭২,৫০,০০০ ৳",
  projects: [
    { name: "১ নং ও ৩ নং ওয়ার্ডের প্রধান সংযোগ সড়ক এইচবিবি ও কার্পেটিং", ward: "১ ও ৩ নং", allocated: "৪৫,০০,০০০ ৳", spent: "৩৫,০০,০০০ ৳", status: "৮০% সম্পন্ন" },
    { name: "যুগিখালী বাজার ড্রেন ও বর্জ্য অপসারণ ড্রেনেজ নেটওয়ার্ক", ward: "বাজার এলাকা", allocated: "২৫,০০,০০০ ৳", spent: "২০,০০,০০০ ৳", status: "৯০% সম্পন্ন" },
    { name: "সকল সরকারি প্রাথমিক বিদ্যালয়ে নিরাপদ বিশুদ্ধ পানির ফিল্টার স্থাপন", ward: "১ - ৯ নং ওয়ার্ড", allocated: "১২,০০,০০০ ৳", spent: "১০,৫০,০০০ ৳", status: "১০০% সম্পন্ন" },
    { name: "ইউনিয়ন পরিষদ ডিজিটাল সার্ভিস সেন্টার ও সার্ভার অবকাঠামো", ward: "ইউপি ভবন", allocated: "৮,০০,০০০ ৳", spent: "৭,০০,০০০ ৳", status: "১০০% সম্পন্ন" },
    { name: "অসহায় বিধবা ও বয়স্কদের মাঝে স্বচ্ছতার সাথে কম্বল ও খাদ্য সহায়তা", ward: "সকল ওয়ার্ড", allocated: "১০,০০,০০০ ৳", spent: "১০,০০,০০০ ৳", status: "১০০% সম্পন্ন" },
  ]
};

export const initialAgriculture: AgricultureInfo = {
  dealers: [
    {
      name: "মো: আনিসুর রহমান",
      storeName: "মেসার্স রহমান ট্রেডার্স (অনুমোদিত বিসিআইসি ডিলার)",
      ward: "ওয়ার্ড ৪ (যুগিখালী বাজার)",
      phone: "01712-998877",
      fertilizers: ["ইউরিয়া", "টিএসপি", "ডিএপি", "এমওপি", "জিপসাম"]
    },
    {
      name: "মো: আকরাম আলী",
      storeName: "আকরাম বীজ ও কৃষি ভান্ডার",
      ward: "ওয়ার্ড ২ (নতুন হাটখোলা)",
      phone: "01819-887766",
      fertilizers: ["উন্নত হাইব্রিড ধান বীজ", "সবজি বীজ", "জৈব সার", "কীটনাশক"]
    },
    {
      name: "মো: শফিকুল ইসলাম",
      storeName: "ইসলাম কৃষি ঘর",
      ward: "ওয়ার্ড ৭ (দক্ষিণ মোড়)",
      phone: "01911-776655",
      fertilizers: ["টিএসপি", "ইউরিয়া", "দস্তা সার", "ভিটামিন স্প্রে"]
    }
  ],
  priceList: [
    { item: "ইউরিয়া সার (বস্তা ৫০ কেজি)", govPrice: "১,৩৫০ ৳", unit: "৫০ কেজি বস্তা" },
    { item: "ডিএপি সার (বস্তা ৫০ কেজি)", govPrice: "১,০৫০ ৳", unit: "৫০ কেজি বস্তা" },
    { item: "টিএসপি সার (বস্তা ৫০ কেজি)", govPrice: "১,১০০ ৳", unit: "৫০ কেজি বস্তা" },
    { item: "এমওপি/পটাশ (বস্তা ৫০ কেজি)", govPrice: "১,০০০ ৳", unit: "৫০ কেজি বস্তা" },
    { item: "জিপসাম (বস্তা ৫০ কেজি)", govPrice: "৬০০ ৳", unit: "৫০ কেজি বস্তা" }
  ],
  officers: [
    { name: "জনাব মো: জাহাঙ্গীর আলম", designation: "উপ-সহকারী কৃষি কর্মকর্তা (যুগিখালী ব্লক-১)", phone: "01718-334455" },
    { name: "জনাব মো: আব্দুল হান্নান", designation: "উপ-সহকারী কৃষি কর্মকর্তা (যুগিখালী ব্লক-২)", phone: "01719-556677" },
    { name: "উপজেলা কৃষি অফিস হটলাইন", designation: "কৃষি সহায়তা ও পরামর্শ কেন্দ্র", phone: "১৬১২৩" }
  ]
};

export const initialSocialActivities: SocialActivity[] = [
  {
    id: "act-1",
    title: "৩ নং ওয়ার্ডের অসুস্থ প্রবীণ কৃষক মকবুল চাচার বাড়িতে দেখতে যাওয়া ও চিকিৎসা সহায়তার ব্যবস্থা",
    category: "অসুস্থদের সেবা ও রোগী দর্শন",
    date: "১৮ অক্টোবর ২০২৬",
    location: "৩ নং ওয়ার্ড, যুগিখালী উত্তরপাড়া",
    duration: "৩:৪৫ মিনিট",
    attendees: "মাওলানা আব্দুল লতিফ ও স্থানীয় গণ্যমান্য ব্যক্তিবর্গ",
    description: "বার্ধক্যজনিত ও জটিল রোগে দীর্ঘ এক মাস যাবৎ শয্যাশায়ী ৩ নং ওয়ার্ডের কৃষক মকবুল চাচার শারীরিক অবস্থার খোঁজখবর নিতে তাঁর বাড়িতে উপস্থিত হন চেয়ারম্যান পদপ্রার্থী মাওলানা আব্দুল লতিফ। তিনি তাঁর শয্যাপাশে বসে কুশল বিনিময় করেন, দ্রুত সুস্থতার জন্য মহান রবের দরবারে বিশেষ দোয়া করেন এবং নিয়মিত ওষুধ ও উন্নত চিকিৎসার প্রয়োজনীয় আর্থিক দায়িত্ব গ্রহণ করেন।",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    thumbnailUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "act-2",
    title: "কনকনে শীতে কাঁপছে যুগিখালী — অসহায় ও দুঃস্থ পরিবারের মাঝে জরুরি শীতবস্ত্র ও কম্বল বিতরণ",
    category: "ত্রাণ ও মানবিক সহায়তা",
    date: "১৫ অক্টোবর ২০২৬",
    location: "যুগিখালী বাজার মাদ্রাসা প্রাঙ্গণ",
    duration: "৪:১২ মিনিট",
    attendees: "মাওলানা আব্দুল লতিফ, স্বেচ্ছাসেবী ও স্থানীয় মুরুব্বিগণ",
    description: "তীব্র শীতের রাতে গ্রামের হতদরিদ্র ও ছিন্নমূল মানুষদের চরম কষ্টের হাত থেকে রক্ষা করতে এক বিশেষ শীতবস্ত্র বিতরণ ক্যাম্পেইন পরিচালিত হয়। শতাধিক অসহায় পরিবার, বৃদ্ধ-বৃদ্ধা ও এতিম শিশুদের হাতে কোনো প্রকার অপ্রয়োজনীয় ক্যামেরা প্রদর্শনী ছাড়াই সম্মানজনকভাবে উন্নতমানের গরম কম্বল ও চাদর তুলে দেওয়া হয়।",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    thumbnailUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "act-3",
    title: "৫ নং ওয়ার্ডের বেহাল খালের পাড় রাস্তা সরজমিনে পরিদর্শন ও তাৎক্ষণিক মাটির সংস্কার কাজ তদারকি",
    category: "মাঠপর্যায়ের উন্নয়ন",
    date: "১২ অক্টোবর ২০২৬",
    location: "৫ নং ওয়ার্ড, খালের পাড় সংযোগ সড়ক",
    duration: "২:৫০ মিনিট",
    attendees: "গ্রামের কৃষক, শিক্ষার্থী ও স্থানীয় যুবকবৃন্দ",
    description: "সামান্য বৃষ্টি হলেই যে রাস্তাটি দিয়ে স্কুল-কলেজের শিক্ষার্থী ও কৃষকদের চলাচল বন্ধ হয়ে যেত, সেই বেহাল খালের পাড় রাস্তাটি সরেজমিনে পরিদর্শন করেন মাওলানা আব্দুল লতিফ। গ্রামবাসীদের দীর্ঘদিনের ক্ষোভের কথা শুনে তিনি তাৎক্ষণিক নিজস্ব স্বেচ্ছাসেবক টিম নিয়ে জরুরি ভিত্তিতে ইটভাটার রাবিশ ও বালু ফেলে চলাচলের উপযোগী করে তোলার কাজের নেতৃত্ব দেন।",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    thumbnailUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "act-4",
    title: "সড়ক দুর্ঘটনায় আহত দিনমজুর রফিকুল ভাইয়ের হাসপাতালে পরিদর্শন ও উন্নত চিকিৎসার খরচ প্রদান",
    category: "অসুস্থদের সেবা ও রোগী দর্শন",
    date: "০৫ অক্টোবর ২০২৬",
    location: "উপজেলা স্বাস্থ্য কমপ্লেক্স ও রোগীর বাড়ি",
    duration: "৩:১৫ মিনিট",
    attendees: "মাওলানা আব্দুল লতিফ ও স্থানীয় যুবসমাজ",
    description: "যুগিখালী ৭ নং ওয়ার্ডের দরিদ্র দিনমজুর রফিকুল ভাই ভ্যান দুর্ঘটনায় মাথায় ও পায়ে গুরুতর চোট পান। খবর পাওয়া মাত্রই হাসপাতালে উপস্থিত হন মাওলানা আব্দুল লতিফ। তিনি কর্তব্যরত ডাক্তারের সাথে কথা বলে উপযুক্ত চিকিৎসার ব্যবস্থা নেন এবং পরিবারটির আর্থিক দুরবস্থা বিবেচনা করে চিকিৎসার সমুদয় ব্যয়ভার বহনের আশ্বাস দেন।",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    thumbnailUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "act-5",
    title: "যুগিখালীর অসচ্ছল মেধাবী শিক্ষার্থীদের মাঝে বিনামূল্যে পাঠ্যবই ও শিক্ষা উপকরণ বিতরণ",
    category: "শিক্ষা ও যুব উন্নয়ন",
    date: "২৮ সেপ্টেম্বর ২০২৬",
    location: "যুগিখালী ইউনিয়ন মিলনায়তন",
    duration: "৫:০৫ মিনিট",
    attendees: "শিক্ষার্থী, অভিভাবক ও এলাকার শিক্ষকবৃন্দ",
    description: "অর্থের অভাবে কোনো মেধাবী শিক্ষার্থীর পড়াশোনা যেন থেমে না থাকে—সেই অঙ্গীকার নিয়ে যুগিখালী ইউনিয়নের বিভিন্ন প্রাথমিক ও মাধ্যমিক বিদ্যালয়ের ৫০ জন অসচ্ছল মেধাবী শিক্ষার্থীর মাঝে বিনামূল্যে স্কুলব্যাগ, খাতা, কলম ও জ্যামিতি বক্সসহ শিক্ষা উপকরণ বিতরণ করা হয়।",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    thumbnailUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
  }
];

// প্রচারণার জন্য জরুরি সেকশনগুলো চালু রেখে বাকিগুলো ডিফল্টভাবে অফ রাখা হয়েছে
export const initialSectionVisibility: SectionVisibility = {
  hero: true,               // প্রধান ব্যানার ও নির্বাচনী স্লোগান (ON)
  manifesto: true,          // নির্বাচনী ইশতেহার ও ৪ স্তম্ভ (ON)
  socialActivities: true,   // সামাজিক কাজ, রোগী দর্শন ও ভিডিও ডায়েরি (ON)
  islamicGuidance: true,    // কুরআন-হাদিসের আলোকে ইনসাফ ও সুশাসন (ON)
  grievanceBox: true,       // জনতার অভিযোগ ও মতামত বক্স (ON)
  emergencyServices: true,  // জরুরি সেবা ও রক্তদান ডিরেক্টরি (ON)
  promiseTracker: false,    // নির্বাচনী প্রতিশ্রুতি বাস্তবায়ন ট্র্যাকার (OFF - নির্বাচনের পরের বিষয়)
  budgetTransparency: false,// ইউপি বাজেট ও উন্নয়ন প্রকল্পের খরচ (OFF - নির্বাচনের পরের বিষয়)
  agricultureCorner: false, // সার ডিলার ও কৃষি তালিকা (OFF)
  certificateGuide: false,  // নাগরিক সনদ ও ওয়ারিশ আবেদন গাইড (OFF - নির্বাচনের পরের বিষয়)
  memberCandidates: true,   // ওয়ার্ডভিত্তিক ইউপি সদস্য প্রার্থী পরিচিতি (ON)
};

export const initialMemberCandidates: MemberCandidate[] = [
  {
    id: "member-ward-3-afsar",
    name: "মো: আফছার আলী",
    fatherName: "মো: ওমর আলী",
    motherName: "সাজেদা খাতুন",
    wardNumber: 3,
    wardName: "৩ নং ওয়ার্ড",
    village: "পাইকপাড়া",
    designation: "ইউপি সাধারণ সদস্য (মেম্বার) পদপ্রার্থী",
    party: "বাংলাদেশ জামায়াতে ইসলামী সমর্থিত",
    photoUrl: "/member-afsar.png",
    phone: "+880 1712-000000",
    shortQualifications: "বিএ (অনার্স), এমএ (ডাবল), বিএমএড & এলএলবি",
    bio: "৩ নং ওয়ার্ড পাইকপাড়াকে ইনসাফভিত্তিক, সৎ ও উচ্চশিক্ষিত নেতৃত্বের মাধ্যমে একটি আদর্শ আধুনিক মডেল ওয়ার্ড হিসেবে গড়ে তুলতে এবং চেয়ারম্যান পদপ্রার্থী মাওলানা আব্দুল লতিফের দুর্নীতিমুক্ত ইউনিয়ন পরিষদের হাতকে শক্তিশালী করতে আপনাদের মূল্যবান দোয়া, সমর্থন ও ভোট প্রত্যাশী।",
    manifestoPledge: "রাস্তাঘাট ও কালভার্ট সংস্কার, সুপেয় মিষ্টি পানি নিশ্চিতকরণ, মাদক ও বৈষম্যমুক্ত সমাজ এবং মেধাভিত্তিক যুব কর্মসংস্থান সৃষ্টি করাই আমার প্রধান অঙ্গীকার।",
    education: [
      { degree: "দাখিল", year: "২০০৩", institution: "কামারালি দাখিল মাদ্রাসা", result: "জিপিএ ৩.৫৮" },
      { degree: "আলিম", year: "২০০৫", institution: "চাকলা সি: ফাজিল মাদ্রাসা", result: "জিপিএ ৩.০০" },
      { degree: "ফাজিল (বিএ)", year: "২০০৭", institution: "কলারোয়া আলিয়া মাদ্রাসা (ইসলামী বিশ্ববিদ্যালয়)", result: "প্রথম বিভাগ" },
      { degree: "কামিল (এমএ)", year: "২০০৯", institution: "যশোর আমিনিয়া কামিল (স্নাতকোত্তর) মাদ্রাসা (ইসলামী বিশ্ববিদ্যালয়)", result: "সিজিপিএ ৩.৬৫" },
      { degree: "বিএ (সম্মান/অনার্স)", year: "২০০৯", institution: "সরকারী মাইকেল মধুসূদন দত্ত কলেজ, যশোর (জাতীয় বিশ্ববিদ্যালয়)", result: "দ্বিতীয় বিভাগ" },
      { degree: "এমএ (মাস্টার্স)", year: "২০১০", institution: "জাতীয় বিশ্ববিদ্যালয়", result: "দ্বিতীয় বিভাগ" },
      { degree: "এলএলবি (আইন)", year: "২০১৫", institution: "জাতীয় বিশ্ববিদ্যালয়", result: "দ্বিতীয় বিভাগ" },
      { degree: "বিএমএড", year: "২০২৬", institution: "জাতীয় বিশ্ববিদ্যালয় / উন্মুক্ত", result: "সিজিপিএ ৩.২৩" }
    ],
    isActive: true
  }
];


