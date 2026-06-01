"use client";

import React, { useState } from 'react';
import { Bell, Check, Users, QrCode } from 'lucide-react';
import { useNotification } from '@/app/context/NotificationContext';

export default function NotificationBell() {
  const { notifications, addNotification, removeNotification, markAsRead } = useNotification();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      notifications.forEach(n => {
        if (!n.isRead) markAsRead(n.id);
      });
    }
  };

  const handleAccept = (notiId: string) => {
    removeNotification(notiId);
    // Simulate receiving the acceptance notification after a short delay
    setTimeout(() => {
      addNotification({
        type: 'JOIN_ACCEPTED',
        title: 'คำขอของคุณได้รับการอนุมัติแล้ว!',
        message: 'ยินดีต้อนรับเข้าสู่ทีม คุณสามารถสแกน QR Code ด้านล่างเพื่อเข้ากลุ่มไลน์ได้เลย',
      });
    }, 500);
  };

  return (
    <div className="relative">
      <button 
        onClick={handleToggle}
        className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors shadow-sm bg-white border border-slate-200 relative"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EC6D8C] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-[80vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
            <h3 className="font-bold text-slate-800">การแจ้งเตือน</h3>
            <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2 py-1 rounded-full">{notifications.length} รายการ</span>
          </div>

          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm font-medium">ไม่มีการแจ้งเตือนใหม่</div>
            ) : (
              notifications.map(noti => (
                <div key={noti.id} className={`p-4 border-b border-slate-100 last:border-0 rounded-2xl mb-1 transition-colors ${noti.isRead ? 'bg-white' : 'bg-[#EC6D8C]/5'}`}>
                  
                  {noti.type === 'JOIN_REQUEST' && (
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#1C1F43]/10 rounded-full flex items-center justify-center shrink-0">
                          <Users className="w-5 h-5 text-[#1C1F43]" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm leading-tight">{noti.title}</p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{noti.message}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pl-13 ml-[52px]">
                        <button 
                          onClick={() => handleAccept(noti.id)}
                          className="flex-1 py-2 bg-[#1C1F43] hover:bg-[#12142d] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                        >
                          อนุมัติเข้าทีม
                        </button>
                        <button 
                          onClick={() => removeNotification(noti.id)}
                          className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-colors"
                        >
                          ปฏิเสธ
                        </button>
                      </div>
                    </div>
                  )}

                  {noti.type === 'JOIN_ACCEPTED' && (
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-bold text-green-600 text-sm leading-tight">{noti.title}</p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{noti.message}</p>
                        </div>
                      </div>
                      <div className="ml-[52px] mt-3">
                        <div className="border border-slate-200 p-3 rounded-xl bg-slate-50 flex flex-col items-center">
                          <div className="flex items-center gap-1.5 mb-3 text-xs font-bold text-green-600">
                            <QrCode className="w-4 h-4" /> แสกนคิวอาร์โค้ด
                          </div>
                          <img src="/mock_qr_code.png" alt="QR Code" className="w-32 h-32 rounded-xl shadow-sm border border-slate-200 bg-white p-1" />
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
