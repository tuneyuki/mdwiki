"use client"

import { createContext } from "react";

type Item = {
  _id: string
  title:string
  content: string
  createAt: string
}

interface ContextProps {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  itemList: Item[];
}

const Context = createContext<ContextProps>(undefined!);

export default Context;


