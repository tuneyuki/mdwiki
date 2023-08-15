"use client"

import { useEffect, useState } from "react"
import Context from "./context"
import Sidebar from "./sidebar"
import Main from "./main"

export default function About() {
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState("")
  const [ isEditing, setIsEditing ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ itemList, setItemList ] = useState([{_id: "init", title: "Blank", content: "Blank", createAt: "0000"}])


  useEffect(() => {
    // DBを読み込んで、Contextに入れる。
    // 読み終わったらloading stateを解除する
    fetch("/api/about", {
      method: 'GET',
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
        setItemList(data)
        setIsLoading(false)
      }
    })
  }, [])

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    setIsLoading(!isLoading)
  }

  return (
    <Context.Provider
      value={{title, setTitle, content, setContent, isEditing, setIsEditing, itemList}}
    >

      {isLoading ? (
        <div className="w-full h-full flex flex-col justify-center">
          <h1 className="text-3xl w-full text-center">Loading...</h1>
        </div>
      ) : (
        <div className="border-4 w-full flex">
          <div className="border-2 w-[20%]">
            <Sidebar />
          </div>

          <div className="border-2 w-[80%]">
            <Main />
          </div>
        </div>
      )}
    </Context.Provider>
  )
}
