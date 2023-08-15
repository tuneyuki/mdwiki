
"use client"
import { use, useContext } from "react";
import HomeContext from "../home.context";


type Props = {
  itemList: {
    title: string
  }[]
}

export default function Sidebar ({ itemList }: Props) {

  const { title, setTitle } = useContext(HomeContext)
  const { content, setContent } = useContext(HomeContext)
  const { isEditing, setIsEditing } = useContext(HomeContext)


  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    setIsEditing(false)
    const { value } = event.currentTarget;
    if( title != value ){
      setTitle(value)
      fetch(`http://localhost:3000/api?dbName=mongodum&title=${value}`, {
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
          setContent(data.content)
        }
      })
    }
  }

  // itemList.map((item) => {
  //   console.log(item.title)
  // })


  return (
    <>
        <div className="h-full px-3 py-4 bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              {itemList.map((item) => (
                <li
                  key={item.title}
                >
                  <button
                    key={item.title}
                    value={item.title}
                    onClick={handleClick}
                    // onKeyDown={handleSidebarClick}

                    className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                    </svg>
                    <span className="ml-3">{item.title}</span>
                  </button>
                </li>
              ))}
              {/* <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                  </svg>
                  <span className="ml-3">Hoge</span>
                </a>
              </li> */}
            </ul>
        </div>
    </>
  )
}

