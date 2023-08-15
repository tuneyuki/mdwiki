import { useContext } from "react";
import Context from "./context";


const Sidebar = () => {
  const { itemList, title, setTitle } = useContext(Context)

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    setTitle(e.currentTarget.value)
  }

  function handleCreate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="flex flex-col justify-between h-full bg-gray-900">
        {itemList.length != 0 ? (
          <div className="flex flex-col m-2">
            {itemList.map((item) => (
              <button
                key={item._id}
                className={`${
                  item.title === title
                    ? 'bg-pink-500 hover:bg-pink-400 active:bg-pink-300'
                    : 'bg-teal-700 hover:bg-teal-600 active:bg-teal-500'
                } border-2 w-full mb-2 p-1 pl-3 text-sm rounded-md  font-medium text-left`}
                value={item.title}
                onClick={handleClick}
              >
                {item.title}
              </button>
            ))}
          </div>
        ) : (
          <div>
              No data...
          </div>
        )}
        <div id="bottomBar" className="w-full text-sm font-medium flex flex-col border-t-2">
          <button className="p-2 hover:bg-gray-600 active:bg-gray-400 text-left" onClick={handleCreate}>新規追加</button>
          <button className="p-2 hover:bg-gray-600 active:bg-gray-400 text-left">設定</button>
          <button className="p-2 hover:bg-gray-600 active:bg-gray-400 text-left">設定</button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;