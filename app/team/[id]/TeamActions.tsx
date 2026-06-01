"use client";

import React, { useState } from 'react';
import { useNotification } from '@/app/context/NotificationContext';
import { useRouter } from 'next/navigation';

export default function TeamActions({ isPastTeam, teamName }: { isPastTeam: boolean, teamName: string }) {
  const { addNotification } = useNotification();
  const router = useRouter();
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinTeam = () => {
    addNotification({
      type: 'JOIN_REQUEST',
      title: `มีคนขอเข้าร่วมทีม ${teamName}`,
      message: 'มีผู้ใช้ใหม่ต้องการเข้าร่วมทีมของคุณ',
    });
    setIsJoined(true);
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  if (isPastTeam) {
    return (
      <button 
        onClick={() => alert("ระบบกำลังเปิดหน้าให้รีวิว... (Mockup)")}
        className="w-full py-4 bg-[#1C1F43] hover:bg-[#12142d] text-white font-bold rounded-2xl transition-all shadow-md mt-6"
      >
        รีวิวเพื่อนร่วมทีม
      </button>
    );
  }

  return (
    <button 
      onClick={handleJoinTeam}
      disabled={isJoined}
      className={`w-full py-4 font-bold rounded-2xl transition-all shadow-md mt-6 ${
        isJoined ? 'bg-green-500 text-white' : 'bg-[#1C1F43] hover:bg-[#12142d] text-white'
      }`}
    >
      {isJoined ? 'ส่งคำขอแล้ว!' : 'ขอเข้าร่วมทีม'}
    </button>
  );
}
