"use client";
import { Document } from "@/types/document";
import { saveDocuments, loadDocuments } from "@/utils/localstorage";
import { useEffect, useState } from "react";
import {
  IconEdit,
  IconCornerDownLeft,
  IconTrash,
  IconBrandGithub,
} from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
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

  useEffect(() => {
    saveDocuments(documents);
  }, [documents]);

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

  return (
    <div className="flex h-screen">
      <aside className="w-1/5 h-full">
        <div className="p-2">
          <button
            className="w-full rounded-xl bg-emerald-200 hover:bg-emerald-300 active:bg-emerald-500 dark:bg-emerald-900 dark:hover:bg-emerald-700 dark:active:bg-emerald-500"
            onClick={addNewDocument}
          >
            Add New Document
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
          {/* !isEditingTitle */}
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
      <main className="w-4/5 h-full border-2 flex flex-col">

        <div className="h-full">
          {current && !isEditingContent && (
            <div className="relative">
              <div className="p-2 rounded-lg markdown dark:bg-slate-800 bg-slate-100">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {current.content}
                </ReactMarkdown>
              </div>
              <div className="absolute top-0 right-0 pt-2 px-2 flex flex-row-reverse">
                <button
                  onClick={() => setEditingContent(true)}
                  className="rounded-full p-2 border-2 mx-2 dark:bg-slate-600 dark:hover:bg-slate-500 dark:active:bg-slate-300 bg-slate-300 hover:bg-slate-400 active:bg-slate-500"
                >
                  <IconEdit size={80} />
                </button>
              </div>
            </div>
          )}
          {current && isEditingContent && (
            <div className="relative">
              <div className="p-2 h-full rounded-lg dark:bg-slate-800 bg-slate-400">
                <textarea
                  className="w-full p-1 dark:bg-gray-900 dark:text-gray-100 bg-gray-200 text-gray-800"
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
                  className="rounded-full p-2 border-2 mx-2 dark:bg-slate-600 dark:hover:bg-slate-500 dark:active:bg-slate-300 bg-slate-300 hover:bg-slate-400 active:bg-slate-500"
                >
                  <IconCornerDownLeft size={80} />
                </button>
                {/* <button className="bg-slate-600 hover:bg-slate-800 active:bg-slate-600 rounded-full p-2 border-2 mx-2">
                  <IconEye size={20} />
                </button> */}
              </div>
            </div>
          )}
          {!current && (
            <div className="m-40 p-4 dark:bg-stone-700 bg-stone-200 rounded-xl shadow-lg dark:shadow-white">
              <h1 className="text-4xl font-bold text-center">MDWiki</h1>
              <p className="mt-4 p-2 text-center text-2xl">
                Markdownで書けるシンプルなメモ帳
              </p>
              <div className="flex justify-center">
                <IconBrandGithub />
                <a
                  className="text-lg text-blue-500 hover:text-blue-700 active:text-blue-900 dark:text-blue400 dark:hover:text-blue-200 dark:active:text-blue-100 underline"
                  href="https://github.com/tuneyuki/mdwiki"
                >
                  Github
                </a>
              </div>
              <p className="mt-4 p-5 text-xl">特徴</p>
              <ul className="pl-10">
                <li>データはサーバには保存されないので安全。</li>
                <li>自動でブラウザ内に保存される。</li>
              </ul>
              <p className="mt-4 p-5 text-xl">使い方</p>
              <ul className="pl-10 mb-4">
                <li>
                  Add New Documentクリックで、新規ドキュメントが作成される。
                </li>
                <li>
                  タイトル、コンテンツそれぞれの編集ボタンクリックで編集ができる。
                </li>
                <li>ドキュメントは自動で保存される。</li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
