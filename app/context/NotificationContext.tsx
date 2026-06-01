"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type NotificationType = 'JOIN_REQUEST' | 'JOIN_ACCEPTED';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  teamId?: string;
  isRead: boolean;
  createdAt: Date;
}

interface NotificationContextType {
  notifications: AppNotification[];
  addNotification: (noti: Omit<AppNotification, 'id' | 'isRead' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const addNotification = (noti: Omit<AppNotification, 'id' | 'isRead' | 'createdAt'>) => {
    const newNoti: AppNotification = {
      ...noti,
      id: Math.random().toString(36).substring(7),
      isRead: false,
      createdAt: new Date(),
    };
    setNotifications(prev => [newNoti, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
