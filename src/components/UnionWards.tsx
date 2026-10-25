'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Users, 
  HeartHandshake, 
  ArrowRight, 
  ShieldCheck, 
  PhoneCall, 
  AlertCircle, 
  Droplet, 
  GraduationCap, 
  Award, 
  BookOpen, 
  X, 
  Sparkles, 
  UserCheck, 
  ChevronRight,
  Share2
} from 'lucide-react';
import { jugikhaliWards, MemberCandidate } from '@/data/initialData';
import { useData } from '@/context/DataContext';

export const UnionWards: React.FC = () => {
  const { openGrievanceModal, memberCandidates, sectionVisibility, activeTemplate } = useData();
  const [selectedCandidate, setSelectedCandidate] = useState<MemberCandidate | null>(null);
  const [wardFilter, setWardFilter] = useState<'all' | 'candidatesOnly'>('all');

  const isSmart = activeTemplate === 'smart-digital';
  const isRally = activeTemplate === 'rally-energy';

  const showCandidates = sectionVisibility?.memberCandidates !== false;
  const activeCandidates = showCandidates ? (memberCandidates || []).filter(c => c.isActive) : [];

  return (
    <section id="wards" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0b0f19] dark:via-[#0e1526] dark:to-[#0b0f19] relative overflow-hidden transition-colors">
      {/* Background Subtle Ambient Glow */}
      <div className={`absolute top-0 right-1/4 w-96 h-96 ${
        isSmart ? 'bg-cyan-100/40 dark:bg-cyan-900/20' : isRally ? 'bg-rose-100/40 dark:bg-rose-900/20' : 'bg-emerald-100/40 dark:bg-emerald-900/20'
      } rounded-full blur-3xl pointer-events-none -z-10`} />
      <div className={`absolute bottom-0 left-1/4 w-96 h-96 ${
        isSmart ? 'bg-teal-100/40 dark:bg-teal-900/20' : isRally ? 'bg-amber-100/40 dark:bg-amber-900/20' : 'bg-teal-100/40 dark:bg-teal-900/20'
      } rounded-full blur-3xl pointer-events-none -z-10`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-bold border border-emerald-200 shadow-2xs">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>১২ নং যুগিখালী ইউনিয়ন পরিষদ • ৯টি ওয়ার্ড ও ভৌগোলিক পরিচিতি</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            ইউনিয়নের ৯টি ওয়ার্ড ও {showCandidates ? (
              <span className={`text-transparent bg-clip-text ${
                isSmart 
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600' 
                  : isRally 
                  ? 'bg-gradient-to-r from-rose-600 to-emerald-600' 
                  : 'bg-gradient-to-r from-emerald-700 to-teal-600'
              }`}>মেম্বার পদপ্রার্থী পরিচিতি</span>
            ) : (
              <span>আওতাধীন গ্রামসমূহ</span>
            )}
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            রাজনগর থেকে পাইকপাড়া হয়ে হামিদপুর—যুগিখালী ইউনিয়নের প্রতিটি ওয়ার্ডে সৎ, যোগ্য ও উচ্চশিক্ষিত নেতৃত্বের মাধ্যমে ইনসাফভিত্তিক আধুনিক ইউনিয়ন পরিষদ গড়ে তোলার অঙ্গীকার।
          </p>

          {/* Filter Pills */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setWardFilter('all')}
              className={`px-4 py-2 rounded-full border transition cursor-pointer flex items-center gap-1.5 ${
                wardFilter === 'all'
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>সকল ৯টি ওয়ার্ড ও গ্রাম</span>
            </button>

            {showCandidates && activeCandidates.length > 0 && (
              <button
                onClick={() => setWardFilter('candidatesOnly')}
                className={`px-4 py-2 rounded-full border transition cursor-pointer flex items-center gap-1.5 ${
                  wardFilter === 'candidatesOnly'
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 shadow-2xs'
                }`}
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>ঘোষিত ইউপি মেম্বার প্রার্থী ({activeCandidates.length} জন)</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded-full font-black">
                  নতুন
                </span>
              </button>
            )}
          </div>
        </div>

        {/* 9 Wards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {jugikhaliWards
            .filter((w) => {
              if (wardFilter === 'candidatesOnly') {
                return activeCandidates.some(c => c.wardNumber === w.number);
              }
              return true;
            })
            .map((w) => {
              const wardCandidate = activeCandidates.find(c => c.wardNumber === w.number);

              return (
                <div
                  key={w.number}
                  className={`group bg-white rounded-3xl p-5 sm:p-7 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    wardCandidate 
                      ? 'border-emerald-300/90 shadow-lg ring-1 ring-emerald-400/30 hover:shadow-2xl hover:-translate-y-1' 
                      : 'border-slate-200/90 hover:border-emerald-400 shadow-xs hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  {/* Top Accent Strip */}
                  <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${
                    wardCandidate ? 'from-emerald-600 via-teal-500 to-amber-500' : 'from-emerald-600 to-teal-500'
                  } opacity-90 group-hover:opacity-100 transition`} />

                  <div>
                    {/* Header: Ward Number & Status */}
                    <div className="flex items-start sm:items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-black flex items-center justify-center text-base sm:text-lg shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shrink-0">
                          ০{w.number}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-emerald-800 transition truncate">
                            {w.name}
                          </h3>
                          <span className="text-[11px] text-slate-400 font-medium block">১২ নং যুগিখালী ইউনিয়ন</span>
                        </div>
                      </div>

                      {wardCandidate ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 shrink-0">
                          <UserCheck className="w-3 h-3 text-emerald-700" />
                          <span>প্রার্থী সক্রিয়</span>
                        </span>
                      ) : (
                        <span className="text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                          {w.villages.length}টি গ্রাম
                        </span>
                      )}
                    </div>

                    {/* Villages List */}
                    <div className="space-y-1.5 mt-3">
                      <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        আওতাধীন গ্রামসমূহ:
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {w.villages.map((village, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 group-hover:border-emerald-200 group-hover:bg-emerald-50/60 transition"
                          >
                            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{village}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* SPOTLIGHT: Ward Member Candidate Card (if available) */}
                    {wardCandidate ? (
                      <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white border-2 border-emerald-300/80 shadow-xs relative overflow-hidden group/candidate">
                        {/* Glow accent */}
                        <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-300/20 rounded-full blur-xl pointer-events-none" />

                        <div className="flex items-center gap-3.5">
                          <div className="relative shrink-0">
                            <img
                              src={wardCandidate.photoUrl || '/member-afsar.png'}
                              alt={wardCandidate.name}
                              className="w-16 h-20 sm:w-18 sm:h-22 object-cover rounded-xl border-2 border-emerald-500 shadow-md bg-white"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/candidate-latif.jpg';
                              }}
                            />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] font-black border border-white">
                              ✓
                            </div>
                          </div>

                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="inline-block px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-black tracking-wide">
                              {wardCandidate.party}
                            </div>
                            <h4 className="font-black text-base sm:text-lg text-slate-900 group-hover/candidate:text-emerald-900 transition truncate">
                              {wardCandidate.name}
                            </h4>
                            <p className="text-[11px] font-bold text-emerald-800 truncate">
                              {wardCandidate.designation}
                            </p>
                            <p className="text-[11px] text-slate-600 font-semibold truncate flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate">{wardCandidate.shortQualifications}</span>
                            </p>
                          </div>
                        </div>

                        {/* View Bio & Education Button */}
                        <button
                          onClick={() => setSelectedCandidate(wardCandidate)}
                          className="mt-3.5 w-full py-2.5 px-3 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-emerald-200" />
                          <span>প্রার্থী পরিচিতি ও শিক্ষাগত যোগ্যতা দেখুন</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : showCandidates ? (
                      <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center">
                        <p className="text-xs text-slate-500 font-medium">
                          এই ওয়ার্ডের মেম্বার প্রার্থী তথ্য শীঘ্রই সংযোজন করা হবে।
                        </p>
                      </div>
                    ) : null}
                  </div>

                  {/* Bottom Quick Links for this Ward */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs">
                    <button
                      onClick={openGrievanceModal}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-bold transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>সমস্যা জানান (পপআপ)</span>
                    </button>

                    <a
                      href="#emergency"
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-800 text-slate-700 font-bold transition flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Droplet className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>রক্তদাতা খুঁজুন</span>
                    </a>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Interactive Candidate Full Profile & Education Modal */}
        {selectedCandidate && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in"
            onClick={() => setSelectedCandidate(null)}
          >
            <div 
              className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl relative animate-in zoom-in-95 max-h-[92vh] overflow-y-auto border border-emerald-200 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedCandidate(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer z-10"
                title="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Profile Top Hero Card */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 pb-6 border-b border-slate-100 text-center sm:text-left">
                <div className="relative shrink-0">
                  <img
                    src={selectedCandidate.photoUrl || '/member-afsar.png'}
                    alt={selectedCandidate.name}
                    className="w-28 h-36 sm:w-36 sm:h-44 object-cover rounded-2xl border-4 border-emerald-600 shadow-xl bg-slate-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/candidate-latif.jpg';
                    }}
                  />
                  <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2.5 py-0.5 rounded-full bg-emerald-800 text-white text-[10px] font-black tracking-wider shadow-sm">
                    {selectedCandidate.wardName}
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs border border-emerald-300">
                      {selectedCandidate.party}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                      গ্রাম: {selectedCandidate.village}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {selectedCandidate.name}
                  </h3>

                  <p className="text-sm font-extrabold text-emerald-800">
                    {selectedCandidate.designation}
                  </p>

                  {(selectedCandidate.fatherName || selectedCandidate.motherName) && (
                    <p className="text-xs text-slate-600 font-medium">
                      {selectedCandidate.fatherName && <span><strong>পিতা:</strong> {selectedCandidate.fatherName}</span>}
                      {selectedCandidate.motherName && <span className="ml-3"><strong>মাতা:</strong> {selectedCandidate.motherName}</span>}
                    </p>
                  )}

                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-950 font-black text-xs sm:text-sm border border-emerald-200">
                      <GraduationCap className="w-4 h-4 text-emerald-700" />
                      <span>{selectedCandidate.shortQualifications}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio & Election Pledges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedCandidate.bio && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>প্রার্থীর পরিচিতি ও আবেদন</span>
                    </h5>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      &ldquo;{selectedCandidate.bio}&rdquo;
                    </p>
                  </div>
                )}

                {selectedCandidate.manifestoPledge && (
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                    <h5 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>ওয়ার্ড উন্নয়নের প্রধান অঙ্গীকার</span>
                    </h5>
                    <p className="text-xs text-emerald-950 leading-relaxed font-semibold">
                      {selectedCandidate.manifestoPledge}
                    </p>
                  </div>
                )}
              </div>

              {/* Complete Educational Qualifications Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>সম্পূর্ণ শিক্ষাগত যোগ্যতার সনদ ও ফলাফল ({selectedCandidate.education?.length || 0}টি ডিগ্রি)</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    অনুমোদিত একাডেমিক তথ্য
                  </span>
                </div>

                {selectedCandidate.education && selectedCandidate.education.length > 0 ? (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-emerald-900 text-white font-bold">
                        <tr>
                          <th className="py-3 px-3.5 text-center">ক্রম</th>
                          <th className="py-3 px-3.5">ডিগ্রি / পরীক্ষার নাম</th>
                          <th className="py-3 px-3.5">পাসের সন</th>
                          <th className="py-3 px-3.5">শিক্ষা প্রতিষ্ঠান / বিশ্ববিদ্যালয়</th>
                          <th className="py-3 px-3.5 text-right">ফলাফল / বিভাগ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {selectedCandidate.education.map((edu, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition">
                            <td className="py-2.5 px-3.5 font-mono font-bold text-slate-400 text-center">০{idx + 1}</td>
                            <td className="py-2.5 px-3.5 font-bold text-slate-900">{edu.degree}</td>
                            <td className="py-2.5 px-3.5 font-semibold text-emerald-800">{edu.year || '—'}</td>
                            <td className="py-2.5 px-3.5 text-slate-600 font-medium">{edu.institution || '—'}</td>
                            <td className="py-2.5 px-3.5 text-right">
                              <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 font-extrabold border border-emerald-200">
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

              {/* Unity with Latif Chairman & Contact Action */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[11px] font-bold text-emerald-300">
                    চেয়ারম্যান পদপ্রার্থী মাওলানা আব্দুল লতিফের ইনসাফের পরিষদে
                  </span>
                  <p className="text-sm font-extrabold text-white">
                    {selectedCandidate.name}-কে মূল্যবান ভোট ও দোয়া দিয়ে নির্বাচিত করুন
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {selectedCandidate.phone && (
                    <a
                      href={`tel:${selectedCandidate.phone}`}
                      className="px-4 py-2.5 rounded-xl bg-white keep-white text-emerald-950 font-black text-xs hover:bg-emerald-50 transition flex items-center gap-1.5 shadow-md active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                      <span>সরাসরি কথা বলুন</span>
                    </a>
                  )}
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: `${selectedCandidate.name} - ${selectedCandidate.wardName} মেম্বার প্রার্থী`,
                          text: `${selectedCandidate.name}, ${selectedCandidate.designation}, ১২ নং যুগিখালী ইউনিয়ন। শিক্ষাগত যোগ্যতা: ${selectedCandidate.shortQualifications}`,
                          url: window.location.href
                        }).catch(() => {});
                      } else {
                        alert('প্রার্থীর তথ্য কপি করা হয়েছে!');
                      }
                    }}
                    className="p-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-700 transition"
                    title="শেয়ার করুন"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-14 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-700">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-300" />
                <span>সবার জন্য উন্মুক্ত ও সমবণ্টন</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                কোনো ওয়ার্ড উন্নয়ন ও সততার সেবা থেকে পিছিয়ে থাকবে না
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200 max-w-2xl leading-relaxed">
                ১ নং থেকে ৯ নং—প্রতিটি ওয়ার্ডের রাস্তাঘাট, ড্রেনেজ ব্যবস্থা, সুপেয় পানি, মসজিদ-মাদ্রাসা ও শিক্ষা প্রতিষ্ঠানের সমউন্নয়ন নিশ্চিত করা হবে ইনশাআল্লাহ।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="#manifesto"
                className="bg-white keep-white hover:bg-emerald-50 text-emerald-950 font-bold px-6 py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 active:scale-95 text-xs sm:text-sm"
              >
                <span>নির্বাচনী ইশতেহার</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={openGrievanceModal}
                className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl border border-emerald-600 transition flex items-center justify-center gap-2 active:scale-95 text-xs sm:text-sm cursor-pointer"
              >
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>আপনার ওয়ার্ডের সমস্যা লিখুন</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
