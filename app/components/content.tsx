"use client"
import ReactMarkdown, { Options } from "react-markdown";
import Button from "./button";
import HomeContext from "../home.context";
import { useContext, useEffect, useState } from "react";


type Props = {
    title: string
    content: string
}

const handleClick = () => {
  console.log("handleClick")
}

export default function Content( item : Props ) {

  const homecontext = useContext(HomeContext)
  const [ content, setContent ] = useState('')
  

  // const { state } = useContext(CounterContext)
  // console.log(CounterContextProvider)

  useEffect(() => {
    // console.log(homecontext.title)
    fetch('http://localhost:3000/api', {
      method: 'POST',
      body: JSON.stringify({ db: 'mongodum', query: { title: homecontext.title}})
    }).then((response) => {
      if(!response.ok) {
        // setContent('No Result')
        // throw new Error();
        throw new Error(`${response.status} ${response.statusText}`)
      }
      // setContent('No Result')
      return response.json()
    }).then((data) => {
      // console.log(data)
      setContent(data.content)
    })
  }, [homecontext])

  // useEffect(() => {
  //   console.log(item)
  // }, [item])

  return (
    <>
      <article className="w-full pl-64 bg-black">
        <div className="flex p-2 m-2 rounded-sm bg-cyan-700">
          <div id="title" className="w-[75%]">
            <h1 className="text-xl">{homecontext.title}</h1>
          </div>
          <div id="button" className="flex text-sm w-[25%] justify-center">
            <div className="w-[50%]">
              <Button 
                message={"ダウンロード"} />
            </div>
            <div className="w-[50%]">
              <Button
                message="編集する"
              />
            </div>
          </div>
        </div>
        <div className="p-2 m-2 rounded-sm bg-white dark:bg-black">
          <div id="subtitle" className="markdown">
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </>
  )
}