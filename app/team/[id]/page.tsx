import React from 'react';
import { findTeamById, PAST_TEAMS } from '@/app/lib/mockData';
import { Users, Star, User as UserIcon, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import BackButton from '@/app/components/BackButton';
import TeamActions from './TeamActions';

import TeamMembersList from './TeamMembersList';

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const team = findTeamById(id);

  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">404</h1>
          <p className="text-slate-500 mb-6">ไม่พบทีมที่คุณค้นหา</p>
          <Link href="/" className="px-6 py-3 bg-[#1C1F43] text-white rounded-full font-bold">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  const isPastTeam = PAST_TEAMS.some(t => t.id === team.id);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* --- Banner / Poster --- */}
      <div className={`h-64 md:h-80 w-full ${team.coverColor} relative overflow-hidden`}>
        <div className="absolute top-6 left-6 z-20">
          <BackButton />
        </div>
        
        {team.posterUrl ? (
          <img src={team.posterUrl} alt={team.competition} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
             <ImageIcon className="w-20 h-20 text-slate-500 opacity-20" />
          </div>
        )}
        {/* Subtle overlay for better back button visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none h-24"></div>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-8 relative z-10">
        
        {/* --- Body Section --- */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
          
          <div className="mb-6 border-b border-slate-100 pb-6">
             <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">{team.name}</h1>
             <p className="text-lg font-bold text-[#EC6D8C]">{team.competition}</p>
          </div>
          
          <div className="space-y-8">
            {/* Match Score (Only for active teams) */}
            {!isPastTeam && (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm">
                <div className="text-5xl font-black text-[#EC6D8C] mb-2">{team.matchPercentage}%</div>
                <div className="text-sm font-bold text-slate-600 text-center">
                  ความเข้ากันได้ของสไตล์การทำงาน
                </div>
              </div>
            )}

            {/* Info */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3 text-lg">ข้อมูลทีม</h3>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-slate-500">สายการแข่งขัน:</span>
                  <span className="font-bold text-slate-800 bg-white px-3 py-1 rounded-lg border border-slate-200">{team.category}</span>
                </div>
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-slate-500">โรงเรียน:</span>
                  <span className="font-bold text-slate-800 bg-white px-3 py-1 rounded-lg border border-slate-200">{team.school}</span>
                </div>
              </div>
            </div>

            {/* Members */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3 text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-400" />
                สมาชิกปัจจุบัน ({team.currentMembers})
              </h3>
              <TeamMembersList members={team.members} isPastTeam={isPastTeam} />
            </div>

            {/* Missing Roles */}
            {!isPastTeam && team.missingRoles.length > 0 && (
              <div>
                <h3 className="font-bold text-slate-800 mb-3 text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-slate-400" />
                  ตำแหน่งที่ต้องการ (+{team.missingCount})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {team.missingRoles.map((role, i) => (
                    <div key={i} className="bg-vibe-pink/10 text-[#EC6D8C] border border-[#EC6D8C]/20 font-bold px-4 py-2 rounded-full text-sm">
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <TeamActions isPastTeam={isPastTeam} teamName={team.name} />

          </div>
        </div>
      </div>
    </div>
  );
}
