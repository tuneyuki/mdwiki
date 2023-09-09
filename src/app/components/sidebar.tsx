import React, { useContext } from 'react'
import Context from '../context';
import { Document } from "@/types/document";

import { v4 as uuidv4 } from "uuid";

import {
  IconEdit,
  IconCornerDownLeft,
  IconTrash,
} from "@tabler/icons-react";

function Sidebar() {
  const { 
    documents,
    current,
    isEditingTitle,
    setDocuments,
    setCurrent,
    setEditingTitle,
    setEditingContent,
    overwriteCurrent
  } = useContext(Context);


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

  function handleEditTitle(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    const currentDoc = documents.find(
      (doc) => doc.id === e.currentTarget.value
    );
    setCurrent(currentDoc);
    setEditingTitle(true);
  }

  function handleDeleteTitle(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    setDocuments(documents.filter((doc) => doc.id !== e.currentTarget.value));
    if (current?.id === e.currentTarget.value) {
      setCurrent(undefined);
    }
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

  return (
    <aside className="w-1/5 h-full">
    <div className="p-2">
      <button
        className="w-full rounded-xl bg-emerald-200 hover:bg-emerald-300 active:bg-emerald-500 dark:bg-emerald-900 dark:hover:bg-emerald-700 dark:active:bg-emerald-500"
        onClick={addNewDocument}
      >
        Add New
      </button>
    </div>
    <div className="border-2"></div>
    <div className="p-2 max-h-screen">
      {!isEditingTitle && (
        <>
          {documents.map((item) => (
            <div className="w-full flex justify-between" key={item.id}>
              <button
                className={`m-1 px-4 rounded-lg
                ${
                  item.id === current?.id
                    ? "dark:bg-amber-950 dark:hover:bg-amber-800 dark:active:bg-amber-600 bg-amber-200 hover:bg-amber-300 active:bg-amber-400"
                    : "dark:bg-teal-950 dark:hover:bg-teal-800 dark:active:bg-teal-600 bg-teal-200 hover:bg-teal-300 active:bg-teal-400"
                }`}
                onClick={handleDocSelect}
                value={item.id}
              >
                {item.title}
              </button>
              <div className="flex flex-col justify-center">
                <div className="flex">
                  <button
                    className="rounded-sm p-1 dark:hover:bg-slate-500 dark:active:bg-slate-300 hover:bg-slate-300 active:bg-slate-400"
                    value={item.id}
                    onClick={handleEditTitle}
                  >
                    <IconEdit size={20} />
                  </button>
                  <button
                    className="rounded-sm p-1 dark:hover:bg-slate-500 dark:active:bg-slate-300 hover:bg-slate-300 active:bg-slate-400"
                    value={item.id}
                    onClick={handleDeleteTitle}
                  >
                    <IconTrash size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}{" "}
      {/* タイトル編集中表示 */}
      {isEditingTitle && (
        <>
          {documents.map((item) => (
            <div className="w-full flex justify-between" key={item.id}>
              {item.id === current?.id && (
                <>
                  <form onSubmit={handleSaveTitle}>
                    <input
                      className="m-1 w-full text-gray-800"
                      value={current.title}
                      onChange={handleTitleEdit}
                    ></input>
                  </form>
                  <button
                    className="rounded-sm p-1 dark:hover:bg-slate-500 dark:active:bg-slate-300 hover:bg-slate-300 active:bg-slate-400"
                    onClick={handleSaveTitle}
                  >
                    <IconCornerDownLeft size={20} />
                  </button>
                </>
              )}
              {item.id !== current?.id && (
                <button
                  className={
                    "m-1 px-4 rounded-lg dark:bg-teal-950 dark:hover:bg-teal-800 dark:active:bg-teal-600 bg-teal-200 hover:bg-teal-300 active:bg-teal-400"
                  }
                  onClick={handleDocSelect}
                  value={item.id}
                >
                  {item.title}
                </button>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  </aside>
  )
}

export default Sidebar;