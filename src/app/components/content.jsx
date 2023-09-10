import React, { useContext, useEffect, useState } from 'react'
import Context from '../context';

import {
  IconEdit,
  IconCornerDownLeft,
  IconBrandGithub,
  IconDownload,
  IconMicrophone,
  IconMicrophoneOff,
} from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { exportData } from '@/utils/export';


const Content = () => {
  const [result, setResult] = useState();
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  // This array will hold the audio data
  let chunks = [];
  
  // This useEffect hook sets up the media recorder when the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const newMediaRecorder = new MediaRecorder(stream);
          newMediaRecorder.onstart = () => {
            chunks = [];
          };
          newMediaRecorder.ondataavailable = e => {
            chunks.push(e.data);
          };
          newMediaRecorder.onstop = async () => {
            const audioBlob = new Blob(chunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.onerror = function (err) {
              console.error('Error playing audio:', err);
            };
            // audio.play();
            try {
              const reader = new FileReader();
              reader.readAsDataURL(audioBlob);
              reader.onloadend = async function () {
                const base64Audio = reader.result.split(',')[1]; // Remove the data URL prefix
                const response = await fetch("/api/speechToText", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ audio: base64Audio }),
                });
                const data = await response.json();
                if (response.status !== 200) {
                  throw data.error || new Error(`Request failed with status ${response.status}`);
                }
                setResult(data.result);

              }
            } catch (error) {
              console.error(error);
              alert(error.message);
            }
          };
          setMediaRecorder(newMediaRecorder);
        })
        .catch(err => console.error('Error accessing microphone:', err));
    }
  }, []);



    // Function to start recording
    const startRecording = () => {
      if (mediaRecorder) {
        mediaRecorder.start();
        setRecording(true);
      }
    };
    // Function to stop recording
    const stopRecording = () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
        setRecording(false);
      }
    };

    useEffect(() => {
      if(result){
        if(current.content !== ""){
          setCurrent({
            id: current?.id || "",
            title: current?.title || "",
            content: result || "",
          });
        }
        setCurrent({
          id: current?.id || "",
          title: current?.title || "",
          content: current.content + '\n' + result || "",
        });
        overwriteCurrent(current)
      }
    }, [result])

  const { 
    current,
    isEditingContent,
    setCurrent,
    setEditingContent,
    overwriteCurrent
  } = useContext(Context);


  function handleEditContent(e) {
    setCurrent({
      id: current?.id || "",
      title: current?.title || "",
      content: e.target.value || "",
    });
  }

  function handleSaveContent() {
    setEditingContent(false);
    if (current) {
      overwriteCurrent(current);
    }
  }
  
  function handleRecording() {
    if(!recording){
      startRecording()
    } else {
      stopRecording()
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
      {/* 編集中 */}
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
            <button
              onClick={handleRecording}
              className="rounded-full p-2 border-2 mx-2 dark:bg-slate-600 dark:hover:bg-slate-500 dark:active:bg-slate-300 bg-slate-300 hover:bg-slate-400 active:bg-slate-500"
            >
              {recording && (
                <IconMicrophoneOff size={80} />
              )}
              {!recording && (
                <IconMicrophone size={80} />
              )}
            </button>
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