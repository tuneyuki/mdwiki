"use client"

import { createContext, useState } from 'react';


export interface HomeContextProps {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const HomeContext = createContext<HomeContextProps>(undefined!);

export default HomeContext;