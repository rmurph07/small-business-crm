import { FunctionComponent, useState, useCallback, useEffect } from "react";
import Base from "./Base";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MainHeader.module.css";
import AddNew from "./AddNew";
import SelectCustomer from "./SelectCustomer";
import AddNewCustomer from "./AddNewCustomer";
import AddNewVehicle from "./AddNewVehicle";
import selectCustomer from "./SelectCustomer";

const getTitle = (pathname: string) => {
  if (pathname === "/dashboard" || pathname === "/") {
    return "Dashboard";
  } else if (pathname === "/vehicles") {
    return "Vehicles";
  } else if (pathname === "/vehicle-detail") {
    return "Vehicle Details";
  } else if (pathname === "/customers") {
    return "Customers";
  } else if (pathname === "/customer-detail") {
    return "Customer Details";
  }
  return "";
};
const getButton = (pathname: string) => {
  if (pathname === "/dashboard" || pathname === "/") {
    return "Add New";
  } else if (pathname === "/vehicles") {
    return "Add New Vehicle";
  } else if (pathname === "/customers") {
    return "Add New Customer";
  }
  // We shouldn't include a button inn /customer-detail and /vehicle-detail because it seems unnecessary, there is already an edit button that can be used to change stuff
  // Return a default title if the pathname doesn't match any condition
  return "";
};
const MainHeader: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [buttonName, setButtonName] = useState("");


  const [selectedCustomer, setSelectedCustomer] = useState<{
    customerid: number;
    firstName: string;
    lastName: string
  } | null>(null);

  // Popup toggle
  const [showPopup, setShowPopup] = useState(0);

  useEffect(() => {
    setTitle(getTitle(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    setButtonName(getButton(location.pathname));
  }, [location.pathname]);

  const goHome = useCallback(() => {
    navigate("/dashboard"); // Navigate to dashboard page
  }, [navigate]);

  const handleButtonClick = () => {
    switch (location.pathname) {
      case "/dashboard":
        setShowPopup(1); // Show "Add New" popup
        break;
      case "/vehicles":
        setShowPopup(2); // Show "Add New Vehicle" popup
        break;
      case "/customers":
        setShowPopup(4); // Show "Add New Customer" popup
        break;
      default:
        setShowPopup(0); // No popup
    }
  };
  const closePopup = () => setShowPopup(0);

  return (
    // changed 5xl to black
    <div className="fixed w-full top-[0px] right-[0px] left-[0px] h-[90px] text-5xl text-black">
      {/* Logo */}
      <img
        className="absolute top-[calc(50%_-_45px)] left-[0px] w-[90px] h-[90px] overflow-hidden cursor-pointer"
        alt=""
        src="/logo.svg"
        onClick={goHome}
      />
      {/* Header Left */}
      <div className="absolute w-[calc(100%_-_507px)] top-[0px] right-[417px] left-[90px] bg-ghostwhite h-[90px] overflow-hidden">
        <b className="absolute top-[calc(50%_-_20px)] left-[24px] leading-[40px]">
          {title}
        </b>
      </div>
      {/* Header Right */}
      <div className="absolute top-[0px] right-[0px] bg-ghostwhite w-[417px] h-[90px] overflow-hidden">
        {/* Add New (Vehicle or Customer) Button */}
        {location.pathname !== "/vehicle-detail" &&
          location.pathname !== "/customer-detail" && (
            <button
              className="bg-[#e8c400] hover:bg-[#f8d800] rounded-51xl overflow-hidden flex flex-row items-center justify-center py-2.5 pr-4 pl-5 gap-[12px] text-left text-sm text-primary-white font-heading-h5-bold"
              style={{
                overflow: "unset",
                position: "absolute",
                top: "calc(50% - 25px)",
                right: "164px",
                cursor: "pointer",
              }}
              onClick={handleButtonClick}
            >
              <div className="relative leading-[30px] font-medium">
                {buttonName}
              </div>
              <img className="w-5 relative h-5" alt="" src="/icon.svg" />
            </button>
          )}
        {/* Search Button */}
        <img
          className="absolute top-[calc(50%_-_25px)] right-[94px] rounded-31xl w-[50px] h-[50px] overflow-hidden"
          alt=""
          src="button.svg"
        />
        {/* Account Profile Picture */}
        <img
          className="absolute top-[calc(50%_-_25px)] right-[24px] rounded-81xl w-[50px] h-[50px] overflow-hidden object-cover"
          alt=""
          src="/user1@2x.png"
        />
      </div>
      {showPopup === 1 && (
        <div className={styles.popup}>
          <AddNew
            onChooseVehicle={() => setShowPopup(2)}
            onChooseCustomer={() => setShowPopup(4)}
            onClose={() => setShowPopup(0)}
          />
        </div>
      )}
      {showPopup === 2 && (
        <div className={styles.popup}>
          <SelectCustomer
            onChooseCustomer={(customer) => {
              setSelectedCustomer(customer);
              setShowPopup(3);
            }}
            onAddCustomer={() => setShowPopup(4)}
            onClose={() => setShowPopup(0)}
          />
        </div>
      )}
      {showPopup === 3 && selectedCustomer !== null && (
        <div className={styles.popup}>
          <AddNewVehicle
            selectedCustomer={selectedCustomer}
            onClose={() => setShowPopup(0)}
            onChooseCustomer={() => setShowPopup(2)}
          />
        </div>
      )}
      {showPopup === 4 && (
        <div className={styles.popup}>
          <AddNewCustomer onClose={() => setShowPopup(0)} />
        </div>
      )}
      <Base
        baseWidth="100%"
        basePosition="absolute"
        baseRight="0px"
        baseBottom="0px"
        baseLeft="0px"
        baseHeight="1px"
        baseTop="unset"
        baseAlignSelf="unset"
      />
    </div>
  );
};

export default MainHeader;
