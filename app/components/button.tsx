"use client"
import React, { MouseEventHandler, useContext, use } from "react";

type Props = {
  // handleClick: MouseEventHandler<HTMLButtonElement>;
  message: string;
}

const Button = ({message}: Props) => {


  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if(message == "ダウンロード") {
      console.log("ダウンロードだよ")
      const data = fetch("http://localhost:3000/api", {
        method: 'POST'
      }).then((result) => {
        if(!result.ok){
          throw new Error();
        }
        return result.json();
      }).then((json) => {
        console.log(json)
      })
    } else if(message == "編集する") {
      console.log("編集だよ")
    }
  }



  return (
    <button
      className="w-full text-center rounded-lg border-2 pl-2 pr-2 ml-1 mr-1 bg-gray-500"
      onClick={handleClick}
    >
      {message}
    </button>
  );
}

export default Button;