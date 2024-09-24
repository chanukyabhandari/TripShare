import React, { useEffect, useState } from "react"
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar"
import { Tooltip, Typography, Box } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { RiMenuUnfold3Line2 } from "react-icons/ri";
import { MdGridView, MdGroups2, MdOutlineSettings, MdCommute, MdTimeToLeave, MdAirlineSeatReclineExtra, MdLogout, MdOutlineCreditCard } from "react-icons/md";
import DashBoard from "../Dashboard/DashBoard";
import { TbReportSearch } from "react-icons/tb";

const Items = ({ label, icon, onClickAction, active }) => {
    const [isHovered, setisHovered] = useState(false)

    const handleMouseEnter = () => {
        setisHovered(true)
    }
    const handleMouseleave = () => {
        setisHovered(false)
    }
    return (
        <Tooltip>
            <div>
                <MenuItem
                    active={active}
                    style={{
                        marginTop: 2,
                        // backgroundColor:active ? '#2564c2': isHovered ? '#2564c2' : 'white',
                        // color: active ? 'white': isHovered ? 'white' : '#2564c2',
                        backgroundColor: active ? '#2564c2' : isHovered ? '#2564c2' : 'white',
                        color: active ? 'white' : isHovered ? 'white' : 'black',
                        borderStartStartRadius: 20,
                        borderEndStartRadius: 20,
                        marginTop: active ? '0.2em' : isHovered ? "0.2em" : "0.2em"
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseleave}
                    onClick={onClickAction}
                    icon={icon}
                ><Typography sx={{ fontFamily: 'inherit', fontSize: 16 }}>{label}</Typography></MenuItem>
            </div>
        </Tooltip>
    )
};

const sideBarComponent = () => {
    const [show, sethide] = useState(false);
    const [activeItem, setActiveItem] = useState("")
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path)
        setActiveItem(path)
    }

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location]);

    const logOutHandler = () => {
        localStorage.clear('shareTrip');
        navigate('/');
    };
    return (
        <>
            <Box>
                <Sidebar
                    collapsed={show}
                    transitionDuration={500}
                    backgroundColor="white"
                    rootStyles={{
                        height: '100vh',
                        width: "auto"
                    }}
                >
                    {!show && (<Box sx={{
                        textAlign: 'right',
                        p: 1.5,
                        cursor: 'pointer',
                        top: '0em',
                        bgcolor: 'white',
                        zIndex: 99
                    }}
                    >
                        <IoIosArrowBack onClick={() => sethide(true)} />
                    </Box>)}
                    {show && (
                        <Box sx={{
                            textAlign: 'center',
                            p: 1.5,
                            cursor: 'pointer',
                            top: '0em',
                            bgcolor: 'white',
                            zIndex: 99
                        }}>
                            <RiMenuUnfold3Line2 onClick={() => sethide(false)} />
                        </Box>)}
                    {!show && (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            bgcolor: 'white',
                            zIndex: '99',
                            position: 'sticky',
                            top: '1em'
                        }}>
                            <img src="/logo.png" alt="LOGO" style={{
                                width: "auto", height: 90,
                                // mt: "-2em",
                                objectFit: "fill"
                            }}></img>
                        </Box>
                    )}
                    <Menu>
                        <Items
                            label={"DashBoard"}
                            icon={<MdGridView />}
                            onClickAction={()=>handleNavigation("/shareTrip")}
                            active={activeItem === "/shareTrip"}
                            color={"black"}
                        />
                        <Items
                            label={"Manage User"}
                            icon={<MdGroups2 />}
                            onClickAction={() => handleNavigation("/shareTrip/ManageUser")}
                            active={activeItem === "/shareTrip/ManageUser"}
                            color={"black"}
                        />
                        <SubMenu
                            style={{ color: 'black' }}
                            icon={<MdOutlineSettings />}
                            label={<Typography variant="body1" sx={{ fontFamily: "inherite" }}>Setups</Typography>}
                        >
                            <Box>
                                <Items
                                    label={"Manage Vehicle Types"}
                                    icon={<MdCommute />}
                                    onClickAction={() => handleNavigation("/shareTrip/ManageVehicleType")}
                                    active={activeItem === "/shareTrip/ManageVehicleType"}
                                    color={"black"}
                                />
                                <Items
                                    label={"Manage Vehicle Names"}
                                    icon={<MdTimeToLeave />}
                                    onClickAction={() => handleNavigation("/shareTrip/ManageVehicle")}
                                    active={activeItem === "/shareTrip/ManageVehicle"}
                                    color={"black"}
                                />
                                <Items
                                    label={"Manage Booking Types"}
                                    icon={<MdAirlineSeatReclineExtra />}
                                    onClickAction={() => handleNavigation("/shareTrip/ManageBooking")}
                                    active={activeItem === "/shareTrip/ManageBooking"}
                                    color={"black"}
                                />
                                <Items
                                    label={"Manage Subscription Plans"}
                                    icon={<MdOutlineCreditCard />}
                                    onClickAction={() => handleNavigation("/shareTrip/ManageSubscription")}
                                    active={activeItem === "/shareTrip/ManageSubscription"}
                                    color={"black"}
                                />
                            </Box>

                        </SubMenu>
                        <Items
                            label={"Manage Reports"}
                            icon={<TbReportSearch />}
                            onClickAction={() => handleNavigation("/shareTrip/ManageReports")}
                            active={activeItem === "/shareTrip/ManageReports"}
                            color={"black"}
                        />
                        <Items
                            label={"Logout"}
                            icon={<MdLogout />}
                            onClickAction={logOutHandler}
                            active={activeItem === "/"}
                            color={"black"}
                        />
                    </Menu>

                </Sidebar>
            </Box>
        </>
    )
}
export default sideBarComponent;
