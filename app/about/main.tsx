import { useContext, useEffect } from "react";
import Context from "./context";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


const Main = () => {
  const { title, content, setContent } = useContext(Context)

  useEffect(() => {
    //getOneを呼び出し、描画する
    fetch("/api/about", {
      method: 'POST',
      body: JSON.stringify({
        title: title
      })
    }).then((response) => {
      if(!response.ok) {
        // setContent('No Result')
        throw new Error(`${response.status} ${response.statusText}`)
      }
      // setContent('No Result')
      return response.json()
    }).then((data) => {
      // console.log(data.content)
      if(data) {
        setContent(data.content)
      }
    })
  }, [title])

  return (
    <div>
      <div id="markdown" className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Main;