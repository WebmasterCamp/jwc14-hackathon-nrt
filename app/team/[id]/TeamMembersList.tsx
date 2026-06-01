"use client";

import React, { useState } from 'react';
import { Member, SPECTRUM_REVIEWS } from '@/app/lib/mockData';
import { User as UserIcon, Star, X } from 'lucide-react';
import Link from 'next/link';

export default function TeamMembersList({ members, isPastTeam }: { members: Member[], isPastTeam: boolean }) {
  const [selectedReviewMember, setSelectedReviewMember] = useState<Member | null>(null);
  const [reviewScores, setReviewScores] = useState<Record<number, number>>({});
  const [reviewComment, setReviewComment] = useState("");

  return (
    <>
      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-vibe-pink hover:shadow-sm transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-vibe-pink/10 transition-colors">
                <UserIcon className="w-6 h-6 text-slate-400 group-hover:text-vibe-pink transition-colors" />
              </div>
              <div>
                <div className="font-bold text-slate-800 text-base">{member.name}</div>
                <div className="text-sm font-semibold text-slate-500">{member.role}</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link href={`/profile/${member.id}`}>
                <div className="text-xs font-bold text-[#1C1F43] bg-[#1C1F43]/10 hover:bg-[#1C1F43]/20 px-4 py-2 rounded-full transition-colors cursor-pointer">
                  ดูโปรไฟล์
                </div>
              </Link>
              {isPastTeam && (
                <button 
                  onClick={() => { setSelectedReviewMember(member); setReviewScores({}); setReviewComment(""); }}
                  className="text-xs font-bold text-[#EC6D8C] bg-[#EC6D8C]/10 hover:bg-[#EC6D8C]/20 px-4 py-2 rounded-full transition-colors"
                >
                  ประเมินเพื่อน
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- Peer Review Form Modal --- */}
      {selectedReviewMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">ประเมินเพื่อนร่วมทีม</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">ส่งความประทับใจให้ {selectedReviewMember.name}</p>
              </div>
              <button 
                onClick={() => setSelectedReviewMember(null)}
                className="p-2 bg-white hover:bg-slate-200 rounded-full text-slate-500 shadow-sm transition-colors border border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-8">
              <div className="space-y-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  สไตล์การทำงานของเพื่อน (1-5)
                </h3>
                
                {SPECTRUM_REVIEWS.map(spec => (
                  <div key={spec.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>{spec.leftLabel}</span>
                      <span>สมดุล</span>
                      <span>{spec.rightLabel}</span>
                    </div>
                    <div className="flex justify-between items-center px-2 relative">
                      <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full"></div>
                      
                      {[1, 2, 3, 4, 5].map(score => (
                        <button
                          key={score}
                          onClick={() => setReviewScores(prev => ({ ...prev, [spec.id]: score }))}
                          className={`relative z-10 w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                            reviewScores[spec.id] === score 
                              ? 'bg-[#EC6D8C] text-white scale-110 shadow-md shadow-[#EC6D8C]/30' 
                              : 'bg-white border-2 border-slate-200 text-slate-400 hover:border-[#EC6D8C] hover:text-[#EC6D8C]'
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-800">ความคิดเห็นเพิ่มเติม (ถ้ามี)</label>
                <textarea 
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="เพื่อนทำงานเก่งมาก เป็นผู้นำที่ดี..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-300 font-medium text-slate-700 resize-none h-24"
                ></textarea>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white">
              <button 
                onClick={() => {
                  alert('ส่งการประเมินเรียบร้อยแล้ว! ขอบคุณที่ช่วยสร้างชุมชนที่ดีครับ');
                  setSelectedReviewMember(null);
                }}
                disabled={Object.keys(reviewScores).length < 3}
                className="w-full py-4 bg-[#1C1F43] hover:bg-[#12142d] text-white font-bold rounded-2xl transition-all shadow-md shadow-vibe-navy/20 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
              >
                ยืนยันการประเมิน
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
