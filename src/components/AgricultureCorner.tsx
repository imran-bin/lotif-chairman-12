'use client';

import React from 'react';
import { 
  Sprout, 
  PhoneCall, 
  ShieldCheck, 
  BadgeCheck, 
  Store, 
  Wheat, 
  Info
} from 'lucide-react';
import { useData } from '@/context/DataContext';

export const AgricultureCorner: React.FC = () => {
  const { agriculture } = useData();

  return (
    <section id="agriculture" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>কৃষি ও কৃষক সহায়তা সেল • Farmers Corner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            কৃষকদের স্বার্থ সুরক্ষা ও ন্যায্যমূল্যে সার-বীজ প্রাপ্তি
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            সার-বীজের ডিলারদের তথ্য, সরকারি নির্ধারিত দামের তালিকা এবং কৃষি কর্মকর্তাদের সাথে সরাসরি যোগাযোগের ডিজিটাল ব্যবস্থা
          </p>
        </div>

        {/* Top 2 Columns: Price List & Officer Contacts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Government Fertilizer Official Price Chart */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Wheat className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    সরকারি নির্ধারিত সার ও বীজের মূল্যতালিকা
                  </h3>
                  <p className="text-xs text-slate-500">
                    নির্ধারিত মূল্যের অতিরিক্ত টাকা নেওয়া আইনত দণ্ডনীয় অপরাধ
                  </p>
                </div>
              </div>
              <span className="text-xs bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-lg">
                অফিসিয়াল রেট
              </span>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-200/60 text-slate-700 rounded-lg">
                  <tr>
                    <th className="py-2.5 px-4 rounded-l-lg">সারের নাম</th>
                    <th className="py-2.5 px-4">পরিমাণ / একক</th>
                    <th className="py-2.5 px-4 text-right rounded-r-lg">সরকারি মূল্য</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50">
                  {agriculture.priceList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-100/50 transition">
                      <td className="py-3 px-4 font-semibold text-slate-800 flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-emerald-600" />
                        {item.item}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-600">
                        {item.unit}
                      </td>
                      <td className="py-3 px-4 text-right font-extrabold text-emerald-700">
                        {item.govPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                কোনো ডিলার অতিরিক্ত দাম দাবি করলে বা কৃত্রিম সংকট তৈরি করলে সাথে সাথে আমাদের অভিযোগ বক্সে অথবা চেয়ারম্যান হটলাইনে ফোন দিয়ে জানান।
              </span>
            </div>
          </div>

          {/* Agriculture Extension Officers */}
          <div className="lg:col-span-5 bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-md">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold mb-4">
                <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                <span>পরামর্শ ও সেবা সহায়তা</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                উপ-সহকারী কৃষি কর্মকর্তা হেল্পডেস্ক
              </h3>
              <p className="text-xs text-emerald-200 mb-6 leading-relaxed">
                ফসলের রোগবালাই, সার প্রয়োগের মাত্রা বা আধুনিক চাষাবাদ পদ্ধতির জন্য সরাসরি মাঠ পর্যায়ের কৃষি কর্মকর্তাদের ফোন দিন।
              </p>

              <div className="space-y-3.5">
                {agriculture.officers.map((officer, idx) => (
                  <div key={idx} className="bg-emerald-900/80 border border-emerald-800 p-3.5 rounded-2xl flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-white text-sm">{officer.name}</h4>
                      <p className="text-[11px] text-emerald-300">{officer.designation}</p>
                    </div>
                    <a
                      href={`tel:${officer.phone}`}
                      className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition flex items-center justify-center shrink-0 shadow-sm"
                      title="কল করুন"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>কৃষকের মুখে হাসি ফোটানোই আমাদের অন্যতম অঙ্গীকার</span>
            </div>
          </div>

        </div>

        {/* Certified Dealer Directory */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-700" />
            <span>অনুমোদিত বিসিআইসি সার ও বীজ ডিলার তালিকা</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agriculture.dealers.map((dealer, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-2 inline-block">
                    {dealer.ward}
                  </span>
                  <h4 className="font-bold text-base text-slate-900 mb-1">
                    {dealer.storeName}
                  </h4>
                  <p className="text-xs text-slate-500 mb-3">
                    স্বত্বাধিকারী: <strong className="text-slate-700">{dealer.name}</strong>
                  </p>

                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1.5">
                      উপলব্ধ সার ও পণ্য:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {dealer.fertilizers.map((f, fIdx) => (
                        <span key={fIdx} className="text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href={`tel:${dealer.phone}`}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>কল করুন: {dealer.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
