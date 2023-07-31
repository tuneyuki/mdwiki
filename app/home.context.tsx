"use client"

import { createContext, useState } from 'react';


export interface HomeContextProps {
  title: string;
  setTitle: (value: string) => void
}

const HomeContext = createContext<HomeContextProps>(undefined!);

export default HomeContext;