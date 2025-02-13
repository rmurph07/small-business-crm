import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import ScreenColumnsBG from "../components/ScreenColumnsBG";
import InfoAndFilters from "../components/InfoAndFilters";
import TableHeader from "../components/TableHeader";
import CustomerRow from "../components/CustomerRow";
import Sidebar from "../components/Sidebar";
import MainHeader from "../components/MainHeader";
import { fetchCustomers } from "./api"

interface Customer {
  customerid: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}

const Customers: FunctionComponent = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCustomers();
  }, []);

  return (
    <div className="w-full relative bg-grey-grey-10 h-[910px] text-left text-base text-primary-navy font-heading-h5-bold">
      <ScreenColumnsBG
        showRightArea={false}
        screenColumnsBGWidth="100%"
        screenColumnsBGHeight="100%"
        screenColumnsBGPosition="absolute"
        screenColumnsBGTop="0px"
        screenColumnsBGRight="0px"
        screenColumnsBGBottom="0px"
        screenColumnsBGLeft="0px"
        rightAreaOverflow="hidden"
      />
      <div className="absolute w-[calc(100%_-_90px)] top-[90px] right-[0px] left-[90px] flex flex-col items-start justify-start">
        <div className="self-stretch overflow-hidden flex flex-col items-center justify-start">
          <InfoAndFilters
            totalInfoRowCount={`${customers.length}`}
            customers="customers"
          />
          <div className="self-stretch rounded-xl overflow-hidden flex flex-col items-start justify-start py-0 px-6">
            <TableHeader
              name1="Name"
              deals="Deals"
              email="Email"
              phone="Phone"
              address="Address"
              dealsColumn={false}
            />
            {isLoading ? (
              <p className="p-4">Loading customers...</p>
            ) : (
              customers.map((customer) => (
                <CustomerRow
                  key={customer.customerid}
                  customerid={customer.customerid}
                  firstName={customer.firstName}
                  lastName={customer.lastName}
                  phone={customer.phone}
                  email={customer.email}
                  address={customer.address}
                />
              ))
            )}
            {/* <DefaultButton
              buttonText="Load More"
              DefaultButtonPosition="absolute"
              DefaultButtonTop="calc(50% - 25px)"
              DefaultButtonRight="unset"
              DefaultButtonWidth="130px"
              DefaultButtonOverflow="hidden"
              DefaultButtonBottom="unset"
              DefaultButtonLeft="calc(50% - 65px)"
              DefaultButtonBackgroundColor="#fff"
              DefaultButtonBorder="1px solid #eaeef4"
              DefaultButtonFlex="unset"
              buttonColor="#092c4c"
            /> */}
          </div>
        </div>
      </div>
      <Sidebar />
      <MainHeader />
    </div>
  );
};

export default Customers;
