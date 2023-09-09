import React, { useContext } from 'react'
import Context from '../context';

import {
  IconEdit,
  IconCornerDownLeft,
  IconBrandGithub,
  IconDownload,
} from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { exportData } from '@/utils/export';

const Content = () => {
  const { 
    current,
    isEditingContent,
    setCurrent,
    setEditingContent,
    overwriteCurrent
  } = useContext(Context);


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
            <button
              onClick={() => exportData(current.id)}
              className="rounded-full p-2 border-2 mx-2 dark:bg-slate-600 dark:hover:bg-slate-500 dark:active:bg-slate-300 bg-slate-300 hover:bg-slate-400 active:bg-slate-500"
            >
              <IconDownload size={80} />
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
  );
}

export default Content;