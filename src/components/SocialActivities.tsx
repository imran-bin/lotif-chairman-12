'use client';

import React, { useState } from 'react';
import { 
  Play, 
  Video, 
  Calendar, 
  MapPin, 
  HeartHandshake, 
  Share2, 
  Plus, 
  Clock, 
  Users, 
  X, 
  Check, 
  Search, 
  Film,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { SocialActivity } from '@/data/initialData';

// Helper to convert standard YouTube links to embed links
const getEmbedUrl = (url?: string) => {
  if (!url) return '';
  if (url.includes('/embed/')) return url;
  
  // Match youtube.com/watch?v=ID or youtu.be/ID
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
  }
  return url;
};

// Helper to extract YouTube video ID for thumbnail
const getYouTubeThumbnail = (url?: string) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return null;
};

export const SocialActivities: React.FC = () => {
  const { socialActivities } = useData();

  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<SocialActivity | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'সব',
    'অসুস্থদের সেবা ও রোগী দর্শন',
    'ত্রাণ ও মানবিক সহায়তা',
    'মাঠপর্যায়ের উন্নয়ন',
    'শিক্ষা ও যুব উন্নয়ন'
  ];

  const filteredActivities = socialActivities.filter(act => {
    const matchesCategory = selectedCategory === 'সব' || act.category === selectedCategory;
    const matchesSearch = 
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = (activity: SocialActivity) => {
    if (typeof window !== 'undefined') {
      const shareText = `${activity.title}\nস্থান: ${activity.location}\nতারিখ: ${activity.date}\nবিস্তারিত দেখুন: ${window.location.origin}#social-activities`;
      if (navigator.share) {
        navigator.share({
          title: activity.title,
          text: shareText,
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareText);
        setCopiedId(activity.id);
        setTimeout(() => setCopiedId(null), 2500);
      }
    }
  };

  return (
    <section id="social-activities" className="py-20 bg-gradient-to-b from-white via-emerald-50/30 to-slate-50 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-200/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-200/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-semibold mb-4 border border-emerald-200/70 shadow-xs">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>মাঠপর্যায়ের মানবিক উদ্যোগ ও জনসেবা</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            সামাজিক কার্যক্রম ও সেবা ডায়েরি
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            জনগণের সুখ-দুঃখে সর্বদা পাশে — অসুস্থদের খোঁজ নেওয়া, চিকিৎসা সহায়তা প্রদান, শীতার্তদের পাশে দাঁড়ানো এবং ইউনিয়নের নানা উন্নয়নমূলক মাঠকাজের ভিডিও ও বাস্তব চিত্র।
          </p>

          {/* Quick Stats Pill */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm text-slate-600 font-medium">
            <span className="bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs flex items-center gap-1.5">
              <Film className="w-4 h-4 text-emerald-600" />
              <span>মোট ভিডিও রিপোর্ট: <strong className="text-emerald-700">{socialActivities.length}টি</strong></span>
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>সরাসরি সেবা ও পরিদর্শন</span>
            </span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shadow-2xs ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-102'
                    : 'bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="কার্যক্রম বা স্থান খুঁজুন..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition shadow-2xs placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Activities Cards Grid */}
        {filteredActivities.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <Film className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">কোনো কার্যক্রম পাওয়া যায়নি</h3>
            <p className="text-sm text-slate-500 mt-2">
              আপনার নির্বাচিত ক্যাটাগরি বা সার্চ কিওয়ার্ডের সাথে মেলে এমন কোনো ভিডিও রিপোর্ট পাওয়া যায়নি।
            </p>
            <button
              onClick={() => { setSelectedCategory('সব'); setSearchQuery(''); }}
              className="mt-5 px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition"
            >
              সব কার্যক্রম দেখুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredActivities.map((activity) => {
              const thumbnail = activity.thumbnailUrl || getYouTubeThumbnail(activity.videoUrl) || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80';

              return (
                <div
                  key={activity.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Video Thumbnail with Play Button Overlay */}
                  <div 
                    onClick={() => setActiveVideo(activity)}
                    className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={thumbnail}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-emerald-900/90 backdrop-blur-md text-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded-md border border-emerald-700/50 shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {activity.category}
                      </span>
                    </div>

                    {/* Duration Badge */}
                    {activity.duration && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-black/75 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-400" />
                          {activity.duration}
                        </span>
                      </div>
                    )}

                    {/* Centered Pulse Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-16 h-16 rounded-full bg-emerald-500/30 animate-ping" />
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-900/50 group-hover:scale-110 transition-transform duration-300 border-2 border-white/80">
                          <Play className="w-6 h-6 fill-white ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Location strip on thumbnail bottom */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-slate-200 text-xs font-medium">
                      <span className="flex items-center gap-1 text-[11px] truncate text-emerald-100">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{activity.location}</span>
                      </span>
                      <span className="flex items-center gap-1 text-[11px] shrink-0 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-amber-300" />
                        {activity.date}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 
                        onClick={() => setActiveVideo(activity)}
                        className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition cursor-pointer line-clamp-2 leading-snug"
                        title={activity.title}
                      >
                        {activity.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {activity.description}
                      </p>

                      {/* Attendees / সাথে ছিলেন */}
                      {activity.attendees && (
                        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
                          <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate"><strong>উপস্থিত:</strong> {activity.attendees}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveVideo(activity)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition active:scale-98"
                      >
                        <Video className="w-3.5 h-3.5 text-emerald-600" />
                        <span>ভিডিও দেখুন</span>
                      </button>

                      <button
                        onClick={() => handleShare(activity)}
                        title="শেয়ার করুন"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition relative active:scale-95"
                      >
                        {copiedId === activity.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ======================= VIDEO PLAYER MODAL ======================= */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="bg-slate-900 text-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-slate-950 flex items-start justify-between gap-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    {activeVideo.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    {activeVideo.date}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {activeVideo.location}
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={getEmbedUrl(activeVideo.videoUrl)}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Modal Footer / Description */}
            <div className="p-4 sm:p-5 bg-slate-900/95 overflow-y-auto max-h-48 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  কার্যক্রমের বিস্তারিত বিবরণ:
                </span>
                <button
                  onClick={() => handleShare(activeVideo)}
                  className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1 rounded-lg transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedId === activeVideo.id ? 'কপি হয়েছে!' : 'লিংক শেয়ার'}</span>
                </button>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {activeVideo.description}
              </p>
              {activeVideo.attendees && (
                <p className="text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                  <strong className="text-slate-300">উপস্থিত ছিলেন:</strong> {activeVideo.attendees}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
