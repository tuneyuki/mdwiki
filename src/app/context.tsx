"use client"

import { createContext } from 'react';
import { Document } from "@/types/document";


export interface ContextProps {
  isEditingTitle: boolean;
  isEditingContent: boolean;
  current: Document | undefined;
  documents: Document[]
  setEditingTitle: (value: boolean) => void;
  setEditingContent: (value: boolean) => void;
  setCurrent: (value: Document | undefined) => void;
  setDocuments: (value:Document[]) => void;
  overwriteCurrent: (value: Document) => void;
}

const Context = createContext<ContextProps>(undefined!);

export default Context;
