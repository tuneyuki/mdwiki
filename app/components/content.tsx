"use client"
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from 'remark-gfm'
import HomeContext from "../home.context";
import { useContext, useEffect, useState } from "react";


type Props = {
    title: string
    content: string
}


export default function Content() {

  const homecontext = useContext(HomeContext)
  const { isEditing, setIsEditing } = useContext(HomeContext)
  const { content, setContent } = useContext(HomeContext)
  

  const handleEdit = () => {
    console.log("handleClick")
    setIsEditing(!isEditing)
  }

  // const { state } = useContext(CounterContext)
  // console.log(CounterContextProvider)

  // useEffect(() => {
  //   // console.log(homecontext.title)

  // }, [isEditing])

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const value = e.target.value
    setContent(value)
  }

  function handleSave(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    setIsEditing(!isEditing)
    //DBを更新する
    fetch('/api', {
      method: 'POST',
      body: JSON.stringify({
        colName: 'mongodum',
        title: homecontext.title,
        content: homecontext.content,
      })
    }).then((response) => {
      if(!response.ok) {
        // setContent('No Result')
        throw new Error(`${response.status} ${response.statusText}`)
      }
      // setContent('No Result')
      return response.json()
    }).then((data) => {
      // console.log(data)
      if(data) {
        console.log(data)
      }
    })
  }

  function handleDownload(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  // useEffect(() => {
  //   console.log(item)
  // }, [item])

  return (
    <>
      <article className="w-full bg-black">
        <div className="flex p-2 m-2 rounded-sm bg-cyan-700">
          <div id="title" className="w-[75%]">
            <h1 className="text-xl">{homecontext.title}</h1>
          </div>
          <div id="button" className="flex text-sm w-[25%] justify-center">
            <div className="w-[50%]">
              <button 
                className="w-full text-center rounded-lg border-2 pl-2 pr-2 ml-1 mr-1 bg-gray-500"
                onClick={handleDownload}
              >
                ダウンロード
              </button>
            </div>
            <div className="w-[50%]">
              {isEditing && (
                <button
                  className="w-full text-center rounded-lg border-2 pl-2 pr-2 ml-1 mr-1 bg-gray-500"
                  onClick={handleSave}
                >
                  保存する
                </button>
              )}
              {!isEditing && (
                <button
                  className="w-full text-center rounded-lg border-2 pl-2 pr-2 ml-1 mr-1 bg-gray-500"
                  onClick={handleEdit}
                >
                  編集する
                </button>
              )}
            </div>
          </div>
        </div>

        {!isEditing && (
          <div className="h-full p-2 m-2 rounded-sm bg-white dark:bg-black">
          <div id="markdown" className="markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {homecontext.content}
            </ReactMarkdown>
          </div>
        </div>
        )}
        {isEditing && (
          <div className="p-2 m-2 rounded-sm">
            <textarea
              className="p-1 bg-gray-300 w-full text-black"
              style={{
                resize: 'none',
                // maxHeight: '400px',
                overflow: 'auto'
              }}
              rows={100}
              value={content}
              onChange={handleChange}
            />
          </div>
        )}
      </article>
    </>
  )
}