"use client"
import Sidebar from "./components/sidebar"
import Content from "./components/content"

import HomeContext from "./home.context"
import { useEffect, useState } from "react"

const sidebarList = [
  { title: "Dashboard" },
  { title: "Kanban" },
  { title: "Inbox" },
  { title: "Users" },
  { title: "Products" },
  { title: "Sign In" },
  { title: "Sign Up" },
]

const mainList = [
  { title: "Dashboard", content: `
  # This is Dashboard
  * hoge
  * fuga
  ` },
  { title: "Kanban"   , content: "This is Ksnban" },
  { title: "Inbox"    , content: "This is Inbox" },
  { title: "Users"    , content: "This is Users" },
  { title: "Products" , content: "This is Products" },
  { title: "Sign In"  , content: "This is Sign In" },
  { title: "Sign Up"  , content: "This is Sign Up" },
]

const Home: React.FC = () => {

  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState("")
  const [ isEditing, setIsEditing ] = useState(false)
  
  // const [current, setCurrent] = useState<string>('Main');
  // const [page, setPage] = useState<{title: string, content: string}>({ title: "Sign Up"  , content: "This is Sign Up" });
  // const handleSidebarClick = (value: string) => {
  //   // console.log(value)
  //   setCurrent(value)
  // }

  useEffect(() => {
    fetch(`http://localhost:3000/api?dbName=mongodum`, {
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
        // setContent(data.content)
      }
    })
  }, [])
  // useEffect(() => {
  //   // console.log(current)
  //   // currentの存在チェックし、存在する場合は該当のコンテンツをセット
  //   const data = fetch('/api')
  //   const foundItem = mainList.find(item => item.title === current);
  //   if(foundItem){
  //     setPage(foundItem)
  //   } else {
  //     // 存在しない場合のデフォルト
  //     const item = { title: "Main", content: "This is Content!!!" }
  //     setPage(item)
  //   }
  // }, [current])

  const data = {
    title: "Start Page",
    content: "# This is start page....\n* hoge"
  }

  
  return (
    <HomeContext.Provider
      value={{title, setTitle, content, setContent, isEditing, setIsEditing}}
    >

      <aside id="default-sidebar" className="w-48 h-full" aria-label="Sidebar">
        <Sidebar 
          itemList={sidebarList}
        />
      </aside>
      <div className="h-full w-full">
      <Content />
      </div>
    </HomeContext.Provider>
  )
}

export default Home;