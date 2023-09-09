"use client";
import { Document } from "@/types/document";
import { saveDocuments, loadDocuments } from "@/utils/localstorage";
import { useEffect, useState } from "react";

import Context from "./context";
import Sidebar from "./components/sidebar";
import Content from "./components/content";

export default function Home() {
  // Context初期値
  const [documents, setDocuments] = useState<Document[]>([]);
  const [current, setCurrent] = useState<Document | undefined>(undefined);
  const [isEditingTitle, setEditingTitle] = useState(false);
  const [isEditingContent, setEditingContent] = useState(false);
  const overwriteCurrent = (newdoc: Document) => {
    // ドキュメントのコピーを作成して更新
    const updatedDocuments = documents.map((doc) => {
      if (doc.id === newdoc.id) {
        return newdoc;
      }
      return doc;
    });
    // 更新されたドキュメントのリストをセットし再描画する
    setDocuments(updatedDocuments);

    // ローカルストレージに保存する
    saveDocuments(updatedDocuments);
  };

  // 初期化処理
  useEffect(() => {
    const localdata = loadDocuments();
    if (localdata) {
      setDocuments(localdata);
    }
    setEditingTitle(false);
    setEditingContent(false);
  }, []);

  // ローカルストレージへの保存処理
  useEffect(() => {
    saveDocuments(documents);
  }, [documents]);

  return (
    <Context.Provider
      value={{
        isEditingTitle,
        isEditingContent,
        current,
        documents,
        setEditingTitle,
        setEditingContent,
        setCurrent,
        setDocuments,
        overwriteCurrent,
      }}
    >
      <div className="flex h-screen">
        <Sidebar />
        <Content />
      </div>
    </Context.Provider>
  );
}
