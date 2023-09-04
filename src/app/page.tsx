"use client";
import { Document } from "@/types/document";
import { saveDocuments, loadDocuments } from "@/utils/localstorage";
import { useEffect, useState } from "react";
import {
  IconEdit,
  IconCornerDownLeft,
  IconWriting,
  IconEye,
  IconDownload,
  IconEraser,
} from "@tabler/icons-react";
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";

import { v4 as uuidv4 } from "uuid";

export default function Home() {
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

  useEffect(() => {
    const localdata = loadDocuments();
    if (localdata) {
      setDocuments(localdata);
    }
    setEditingTitle(false);
    setEditingContent(false);
  }, []);

  function addNewDocument(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    const newDoc: Document = {
      id: uuidv4(),
      title: "New Document",
      content: "",
    };
    const newDocs = [...documents, newDoc];
    setDocuments(newDocs);
  }

  function handleDocSelect(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    // console.log(event.target.value)
    const item = documents.find(
      (item) => item.id === event.currentTarget.value
    );
    setCurrent(item);
    setEditingTitle(false);
    setEditingContent(false);
  }

  function handleTitleEdit(e: React.ChangeEvent<HTMLInputElement>): void {
    setCurrent({
      id: current?.id || "",
      title: e.target.value || "",
      content: current?.content || "",
    });
  }

  function handleSaveTitle(e: React.FormEvent): void {
    e.preventDefault();
    setEditingTitle(false);
    if (current) {
      overwriteCurrent(current);
    }
  }

  function handleEditContent(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setCurrent({
      id: current?.id || "",
      title: current?.title || "",
      content: e.target.value || "",
    });
  }

  function handleSaveContent(): void {
    setEditingContent(false);
    if (current) {
      overwriteCurrent(current);
    }
  }

  return (
    <div className="flex h-screen">
      <aside className="w-1/5 h-full">
        <div className="p-2">
          <button
            className="w-full bg-emerald-900 rounded-xl hover:bg-emerald-700 active:bg-emerald-500"
            onClick={addNewDocument}
          >
            Add New Document
          </button>
        </div>
        <div className="border-2"></div>
        <div className="p-2 max-h-screen">
          {documents.map((item) => (
            <div className="w-full flex justify-between" key={item.id}>
              <button
                className={`m-1 px-4 rounded-lg
               ${
                 item.id === current?.id
                   ? "bg-amber-950 hover:bg-amber-800 active:bg-amber-600"
                   : "bg-teal-950 hover:bg-teal-800 active:bg-teal-600"
               }`}
                onClick={handleDocSelect}
                value={item.id}
              >
                {item.title}
              </button>
            </div>
          ))}
        </div>
      </aside>
      <main className="w-4/5 h-full border-2 flex flex-col">
        {current && !isEditingTitle && (
          <div className="flex justify-between bg-indigo-950">
            <div className="text-3xl font-bold p-2">{current?.title}</div>
            <div className="flex flex-col justify-center px-2">
              <button
                onClick={() => setEditingTitle(true)}
                className="hover:bg-indigo-800 active:bg-indigo-600 rounded-md"
              >
                <IconEdit size={40} />
              </button>
            </div>
          </div>
        )}
        {current && isEditingTitle && (
          <div className="flex justify-between bg-indigo-950">
            <form className="w-full" onSubmit={handleSaveTitle}>
              <input
                className="text-3xl font-bold p-2 w-full text-gray-800"
                value={current.title}
                onChange={handleTitleEdit}
              ></input>
            </form>

            <div className="flex flex-col justify-center px-2">
              <button
                onClick={handleSaveTitle}
                className="hover:bg-indigo-800 active:bg-indigo-600 rounded-md"
              >
                <IconCornerDownLeft size={40} />
              </button>
            </div>
          </div>
        )}

        <div className="h-full">
          {current && !isEditingContent && (
            <div className="relative">

              <div
                className="p-2 bg-slate-800 rounded-lg markdown"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {current.content}
                </ReactMarkdown>
              </div>
              <div className="absolute top-0 right-0 pt-2 px-2 flex flex-row-reverse">
                <button className="bg-slate-600 hover:bg-slate-500 active:bg-slate-300 rounded-full p-2 border-2 mx-2">
                  <IconEraser size={20} />
                </button>
                <button className="bg-slate-600 hover:bg-slate-500 active:bg-slate-300 rounded-full p-2 border-2 mx-2">
                  <IconDownload size={20} />
                </button>
                <button
                  onClick={() => setEditingContent(true)}
                  className="bg-slate-600 hover:bg-slate-500 active:bg-slate-300 rounded-full p-2 border-2 mx-2"
                >
                  <IconEdit size={20} />
                </button>
              </div>
            </div>
          )}
          {current && isEditingContent && (
            <div className="relative">

              <div className="p-2 h-full bg-slate-800 rounded-lg">
                <textarea
                  className=" bg-gray-900 w-full text-gray-100"
                  style={{
                    resize: "none",
                    overflow: "auto",
                  }}
                  rows={34}
                  value={current.content}
                  onInput={handleEditContent}
                />
              </div>
              <div className="absolute top-0 right-0 pt-2 px-2 flex flex-row-reverse">
                <button
                  onClick={handleSaveContent}
                  className="bg-slate-600 hover:bg-slate-800 active:bg-slate-600 rounded-full p-2 border-2 mx-2"
                >
                  <IconCornerDownLeft size={20} />
                </button>
                <button className="bg-slate-600 hover:bg-slate-800 active:bg-slate-600 rounded-full p-2 border-2 mx-2">
                  <IconEye size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
