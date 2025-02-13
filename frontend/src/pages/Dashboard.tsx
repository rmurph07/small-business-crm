import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import DashRecentVehicle from "../components/DashRecentVehicle";
import DashLatestRepair from "../components/DashLatestRepair";
import DashRecVehRepairs from "../components/DashRecVehRepairs";
import CustomerVehicleCount from "../components/CustomerVehicleCount";
import DashRecentCustomer from "../components/DashRecentCustomer";
import Sidebar from "../components/Sidebar";
import MainHeader from "../components/MainHeader";
import VehicleRow from "../components/VehicleRow";

import {
  fetchCustomers,
  fetchVehicles,
  fetchCustomersCount,
  fetchVehiclesCount,
} from "./api";

interface Customer {
  customerid: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  address: string;
}

interface Vehicle {
  vehicleId: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  licensePlate: string;
  additionalNotes: string;
  state: string;
  customer: Customer;  // Nested customer object
}

const Dashboard: FunctionComponent = () => {
  const navigate = useNavigate();

  // State variables
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to RANDOMLY pick up to 7 from the array
  const select8Customers = (allCustomers: Customer[]) => {
    // Shallow copy the array to avoid mutating the original
    const shuffled = [...allCustomers].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 7);
  };

  // Helper to RANDOMLY pick 4 vehicles
  const select4Vehicles = (allVehicles: Vehicle[]) => {
    const shuffled = [...allVehicles].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  };

  // Load total customers
  const loadTotalCustomers = async () => {
    try {
      const count = await fetchCustomersCount();
      setTotalCustomers(count);
    } catch (error) {
      console.error("Error fetching total customer count:", error);
    }
  };

  // Load total vehicles
  const loadTotalVehicles = async () => {
    try {
      const count = await fetchVehiclesCount();
      setTotalVehicles(count);
    } catch (error) {
      console.error("Error fetching total vehicle count:", error);
    }
  };

  // Load customers
  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers();
      // pick 7 random
      setCustomers(select8Customers(data));
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Load vehicles
  const loadVehicles = async () => {
    try {
      const data = await fetchVehicles();
      // pick 4 random
      setVehicles(select4Vehicles(data));
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  // UseEffect to load everything on mount
  useEffect(() => {
    setIsLoading(true);

    // You can load them in parallel or individually
    Promise.all([loadTotalCustomers(), loadTotalVehicles(), loadCustomers(), loadVehicles()])
        .finally(() => setIsLoading(false));
  }, []);

  const onVehiclesClick = useCallback(() => {
    navigate("/vehicles");
  }, [navigate]);

  const onCustomersClick = useCallback(() => {
    navigate("/customers");
  }, [navigate]);

  return (
    <div className="w-[1366px] bg-grey-grey-10 max-w-full h-[910px] overflow-y-auto text-left text-5xl text-primary-navy font-heading-h5-bold">
      <div className="absolute w-[calc(100%_-_90px)] top-[90px] right-[0px] left-[90px] flex flex-col items-start justify-start bottom-[0px]">
        {/* Inner dashboard content */}
        <div className="absolute w-[calc(100%_-_417px)] top-[0px] right-[417px] left-[0px] h-[820px]">
          {/* Inner dashboard content: Upper section */}
          <div className="absolute w-[calc(100%_-_48px)] top-[20px] right-[24px] left-[24px] flex flex-row items-start justify-start gap-[24px]">
            {/* Recent Vehicles */}
            <div className="flex-1 rounded-xl bg-primary-white box-border h-[392px] flex flex-col items-start justify-start border-[1px] border-solid border-grey-grey-30">
              <div className="self-stretch relative h-[78px]">
                <b className="absolute top-[24px] left-[24px] leading-[30px]">
                  Recent Vehicles
                </b>
                <div
                  className="absolute top-[24px] right-[24px] text-sm leading-[30px] font-medium text-olive text-right cursor-pointer"
                  onClick={onVehiclesClick}
                >
                  View All
                </div>
              </div>
              <div className="self-stretch h-[314px] overflow-y-auto shrink-0 flex flex-col items-start justify-start gap-[4px] text-base">
                {/* Add map functionality for 4 recent vehicles from db: repairs/startdate */}
                {vehicles.map((vehicle) => (
                  <DashRecentVehicle
                    vehicleId={vehicle.vehicleId}
                    year={vehicle.year}
                    make={vehicle.make}
                    model={vehicle.model}
                    licensePlate={vehicle.licensePlate}
                    state={vehicle.state}
                  />
                ))}
              </div>
            </div>
            {/* Latest Repair */}
            <DashLatestRepair />
          </div>
          {/* Inner dashboard content: Lower section */}
          <div className="absolute w-[calc(100%_-_48px)] top-[436px] right-[24px] left-[24px] flex flex-row items-start justify-start gap-[24px] text-grey-grey-70">
            {/* Customer & Vehicle Count */}
            <div className="w-[268px] h-[360px] flex flex-col items-start justify-start gap-[24px]">
              <CustomerVehicleCount
                customerOrVehicle="Customers"
                count={totalCustomers}
              />
              <CustomerVehicleCount
                customerOrVehicle="Vehicles"
                count={totalVehicles}
              />
            </div>
            {/* Recent Vehicle Repairs */}
            <DashRecVehRepairs />
          </div>
        </div>
        {/* Right Sidebar: Dashboard Customers */}
        <div className="absolute top-[0px] right-[0px] bg-grey-grey-20 w-[417px] bottom-[0px]">
          <div className="absolute w-full top-[0px] right-[0px] left-[0px] h-[316px] flex flex-col items-start justify-start">
            <div className="self-stretch relative h-[78px] overflow-hidden shrink-0">
              <b className="absolute top-[24px] left-[24px] leading-[30px]">
                Customers
              </b>
              <div
                className="absolute top-[24px] right-[24px] text-sm leading-[30px] font-medium text-olive text-right cursor-pointer"
                onClick={onCustomersClick}
              >
                View All
              </div>
            </div>
            <div className="self-stretch relative shrink-0 text-base">
              <div className="absolute w-full top-[0px] right-[0px] left-[0px] flex flex-col items-start justify-start gap-[3px]">
                {/* Add map functionality for 8 recent customers from db: repairs/startdate/customers */}
                {customers.map((customer) => (
                  <DashRecentCustomer
                    customerid={customer.customerid}
                    firstName={customer.firstname}
                    lastName={customer.lastname}
                    phone={customer.phone}
                    email={customer.email}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Sidebar */}
      <Sidebar />
      {/* Header */}
      <MainHeader />
    </div>
  );
};

export default Dashboard;
