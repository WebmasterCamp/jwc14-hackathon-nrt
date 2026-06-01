"use client";

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <button 
      onClick={() => router.push('/')} 
      className="p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white inline-flex transition-colors border border-white/30 shadow-sm"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
}
