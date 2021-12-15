import React, {useState} from 'react';
import DashBoard from "./DashBoard";
import Sidebar from "./SideBar";

const MainBody = () => {
    
  const [show, setShow] = useState(false);

    const [selectedTable, setSelectedTable] = useState(1);
    const setSelectTableHandler = (tableNo) => {
        setSelectedTable(tableNo);
    }

    return (
        <>
            <div className="mainBody">
                <div className={show === true ? "menu" : "menuEx"}>
                    <Sidebar setSelectTableHandler = {setSelectTableHandler}/>
                </div>
                <div className={ show === true  ? "content" : "contentEx"}>
                    <DashBoard selectedTable = {selectedTable}/>
                </div>
            </div>

        </>
    )
}

export default MainBody;