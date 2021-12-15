import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { ImCross, ImDrawer2 } from "react-icons/im";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import './sidebar.scss';
import '../MyStyle.css'
import { ImHome, ImUser, ImDrawer } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { Divider } from "@material-ui/core";

const Sidebar = props => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [show, setShow] = useState(true);

    const [adminLevel, setAdminLevel] = useState(localStorage.getItem("isAdmin"));

    //const [selectTable, setSelectTable] = useState(1);

    const goToMyAssets = () => {
        props.setSelectTableHandler(1);
    }
    const goToUsers = () => {
        props.setSelectTableHandler(2);
    }
    const goToAvailableAssets = () => {
        props.setSelectTableHandler(3);
    }
    const goToAssetDetails = () => {
        props.setSelectTableHandler(4);
    }
    const goToAdmin = () => {
        props.setSelectTableHandler(5);
    }
    const goToRequestTable = () => {
        props.setSelectTableHandler(6);
    }
    const goToAllAsset = () => {
        props.setSelectTableHandler(7);
    }
    const goToActivities = () => {
        props.setSelectTableHandler(8);
    }
    const goToProfile = () => {
        props.setSelectTableHandler(9);
    }

    const sidebarExpand = () => {
        setShow(true)
        setIsExpanded(true)
    }

    const closeExpand = () => {
        setShow(false);
        setIsExpanded(false);
    }

    return (
        <>
            <div className="sidebar-test">
                <ProSidebar
                    collapsed={
                        isExpanded === true ? false 
                        : 
                        show === true && isExpanded === false ? false : 
                        true}
                    width="236px"
                    className="sidebar-test"
                >

                    {/* <h6
                        className={
                            show === true ? "show text-right mr-1" 
                            : 
                            props.show === true && show === false ? "show text-right mr-1" : "hide"}
                        style={{ cursor: "pointer", background: "white", }}>

                    </h6> */}
                    <Menu iconShape="square">
                        <div className={show === true ? "burgerManuShow col-3" : "burgerManuShow col-1"}>
                        {
                        show === true || isExpanded === true ?
                            <span className="ml-4 custom-menu"
                                style={{ cursor: "pointer" }}
                                // onClick={() => setShow(prev => !prev)}
                                onClick={() => closeExpand()}
                                >
                                {/* <GiHamburgerMenu className="mt-4" /> */}
                                 <ImCross className="mt-4 mb-4" /> 
                            </span>
                          : 
                          <span className="ml-4 custom-menu"
                                style={{ cursor: "pointer" }}
                                // onClick={() => setShow(prev => !prev)}
                                onClick={() => sidebarExpand()}
                                >
                                {/* <GiHamburgerMenu className="mt-4" /> */}
                                <GiHamburgerMenu className="mt-4 mb-4" /> 
                            </span>
                        }  
                        </div>


                        {/* <MenuItem>
                        <Nav.Item justify-content-center>
                            <Nav.Link eventKey="disabled" disabled>
                                {show === false ? <h2>M</h2> : <h2>Menu</h2>}

                            </Nav.Link>
                        </Nav.Item>
                    </MenuItem> */}

{/* <MenuItem
  style={
    selectedIndex === index ? { backgroundColor: "grey" } : {}
  }
>
  <MenuItemIcon>
    <Icon
      style={selectedIndex === index ? { color: "white" } : {}}
    />
  </MenuItemIcon>
  <MenuItem primary={itemsConfig[item].text} />
</MenuItem> */}

                        <MenuItem
                            onMouseOver={() => setShow(true)}
                            onMouseOut={() => setShow(false)}
                        >
                            <Nav.Item className="custom-nav">
                                <Nav.Link eventKey="Home" className="sideManuHover" onClick={goToMyAssets}>
                                    {show === true || isExpanded === true ? <h5><ImHome /> &nbsp;&nbsp;&nbsp;&nbsp;Home</h5> : 
                                    <>
                                    <h5><ImHome /></h5> <span className="sidebar_text">Home</span>
                                    </>}
                                </Nav.Link>
                            </Nav.Item>
                        </MenuItem>
                        <MenuItem
                            onMouseOver={() => setShow(true)}
                            onMouseOut={() => setShow(false)}
                        >
                            <Nav.Item>
                                <Nav.Link eventKey="Users" className="sideManuHover" onClick={goToUsers}>
                                    {show === true || isExpanded === true ? <h5><ImUser /> &nbsp;&nbsp;&nbsp;&nbsp;Users</h5> : <>
                                    <h5><ImUser /></h5> 
                                    <span className="sidebar_text">Users</span>
                                    </>}
                                </Nav.Link>
                            </Nav.Item>
                        </MenuItem>
                        <MenuItem
                            onMouseOver={() => setShow(true)}
                            onMouseOut={() => setShow(false)}
                        >
                            <Nav.Item>
                                <Nav.Link eventKey="Available Assets" className="sideManuHover" onClick={goToAvailableAssets} activeKey={this}>
                                    {show === true || isExpanded === true ? <h5><ImDrawer2 /> &nbsp;&nbsp;&nbsp;&nbsp;Available</h5> :<> <h5><ImDrawer2 /></h5>
                                        <span className="sidebar_text">Available</span>
                                    </>}
                                </Nav.Link>
                            </Nav.Item>
                        </MenuItem>
                        {/* <MenuItem
                            onMouseOver={() => setShow(true)}
                            onMouseOut={() => setShow(false)}
                        >
                            <Nav.Item>
                                <Nav.Link eventKey="Profile" onClick={goToProfile} activeKey={this}>
                                    {show === true ? <h5><ImDrawer /> &nbsp;&nbsp;&nbsp;&nbsp;Profile</h5> : <h5><ImDrawer /></h5>}
                                </Nav.Link>
                            </Nav.Item>
                        </MenuItem> */}

                        {adminLevel > 0 ?
                            <>
                                <Divider />
                                <MenuItem
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="Admin" className="sideManuHover" onClick={goToAdmin} activeKey={this}>
                                            {show === true || isExpanded === true ? <h5><MdAdminPanelSettings /> &nbsp;&nbsp;&nbsp;&nbsp;Admin</h5> : <>
                                                <h5><MdAdminPanelSettings /></h5>
                                                <span className="sidebar_text">Admin</span>
                                                </>}
                                        </Nav.Link>
                                    </Nav.Item>
                                </MenuItem>
                                <MenuItem
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="Asset Details" className="sideManuHover" onClick={goToAssetDetails} activeKey={this}>
                                            {show === true || isExpanded === true ? <h5><ImDrawer /> &nbsp;&nbsp;&nbsp;&nbsp;Asset Details</h5> : <>
                                            <h5><ImDrawer /></h5>
                                            <span className="sidebar_text">Asset Details</span>
                                            </>}
                                        </Nav.Link>
                                    </Nav.Item>
                                </MenuItem>
                                <MenuItem
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="All Asset" className="sideManuHover" onClick={goToAllAsset} activeKey={this}>
                                            {show === true || isExpanded === true ? <h5><ImDrawer /> &nbsp;&nbsp;&nbsp;&nbsp;All Asset</h5> : 
                                            <><h5><ImDrawer /></h5>
                                            <span className="sidebar_text">All Asset</span>
                                            </>}
                                        </Nav.Link>
                                    </Nav.Item>
                                </MenuItem>
                                <MenuItem
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="RequestedTable" className="sideManuHover" onClick={goToRequestTable} activeKey={this}>
                                            {show === true || isExpanded === true ? <h5><ImDrawer /> &nbsp;&nbsp;&nbsp;&nbsp;Requests</h5> : <>
                                             <h5><ImDrawer /></h5>
                                             <span className="sidebar_text">Requests</span>
                                             </>}
                                        </Nav.Link>
                                    </Nav.Item>
                                </MenuItem>
                                <MenuItem
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="Activities" className="sideManuHover" onClick={goToActivities} activeKey={this}>
                                            {show === true || isExpanded === true ? <h5><ImDrawer /> &nbsp;&nbsp;&nbsp;&nbsp;Activities</h5> : <>
                                            <h5><ImDrawer /></h5>
                                            <span className="sidebar_text">Activities</span>
                                            </>
                                            }
                                        </Nav.Link>
                                    </Nav.Item>
                                </MenuItem>
                            </>
                            :
                            null
                        }
                    </Menu>
                </ProSidebar>

            </div>

        </>
    );
};
//const Sidebar = withRouter(Side);
export default Sidebar;