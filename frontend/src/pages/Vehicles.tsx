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
import DealRowIgnore from "../components/DealRowIgnore";
import VehicleRow from "../components/VehicleRow";

import {
  fetchVehicles,
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

const Vehicles: FunctionComponent = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchVehicles();
        console.log("Fetched Vehicles:", data);
        setVehicles(data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicles.");
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
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
                totalInfoRowCount={`${vehicles.length}`}
                customers="Vehicles"
            />
            <div className="self-stretch rounded-xl overflow-hidden flex flex-col items-start justify-start py-0 px-6">
              <TableHeader
                  name1="Year, Make, and Model"
                  deals="Deals"
                  email="Mileage"
                  phone="State"
                  address="License Plate"
                  dealsColumn={false}
              />
              {isLoading ? (
                  <p className="p-4">Loading vehicles...</p>
              ) : (
                  vehicles.map((vehicle) => (
                      <VehicleRow
                          vehicleId={vehicle.vehicleId}
                          customerid={vehicle.customer ? vehicle.customer.customerid : undefined}
                          make={vehicle.make}
                          model={vehicle.model}
                          year={vehicle.year}
                          mileage={vehicle.mileage}
                          licensePlate={vehicle.licensePlate}
                          state={vehicle.state}
                          notes={vehicle.additionalNotes}
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

export default Vehicles;





/*
import { FunctionComponent, useState, useEffect, useCallback } from "react";
import ScreenColumnsBG from "../components/ScreenColumnsBG";
import InfoAndFilters from "../components/InfoAndFilters";
import TableHeader from "../components/TableHeader";
import Badge from "../components/Badge";
import DealRowIgnore from "../components/DealRowIgnore";
import DefaultButton from "../components/DefaultButton";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MainHeader from "../components/MainHeader";

 const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

const Vehicles: FunctionComponent = () => {
  const [isSelectCustomerOpen, setSelectCustomerOpen] = useState(false);
  const navigate = useNavigate();

  const onButtonIconClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onButtonIcon2Click = useCallback(() => {
    navigate("/customers");
  }, [navigate]);

  const onLogoClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  {
    /*
  const [vehiclesData, setVehiclesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/vehicles');
      const data = await response.json();
      setVehiclesData(data);
    };

    fetchData();
  }, []);

  }

  return (
    <div className="w-full relative bg-grey-grey-10 h-[910px] overflow-y-auto text-left text-base text-primary-navy font-heading-h5-bold">
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
          <InfoAndFilters totalInfoRowCount="136" customers="vehicles" />
          <div className="self-stretch rounded-xl overflow-hidden flex flex-col items-start justify-start py-0 px-6">
            <TableHeader
              icon="/icon17.svg"
              name1="Year Make Model"
              deals="Mileage"
              email="Appointment Date"
              phone="Price"
              address="Status"
              dealsColumn
              propWidth="100px"
              propFlex="unset"
              propWidth1="200px"
              propTop="calc(50% - 15px)"
              propWidth2="120px"
              propFlex1="unset"
              propWidth3="120px"
            />
            {/* CALL TO MAP WITH DEAL ROW TO POPULATE VEHICLES PAGE
            {vehiclesData.map((vehicle) => (
                <VehicleRow
                    key={vehicle.id} //assuming you have a unique ID
                    //image={vehicle.image}
                    year={vehicle.year}
                    make={vehicle.make}
                    model={vehicle.model}
                    mileage={vehicle.mileage}
                    licensePlate={vehicle.licensePlate}
                    licensePlateState={vehicle.state}
                    appointmentDate={vehicle.appointmentDate}
                    price={vehicle.price}
                    status={vehicle.status}
                />
            ))} }
            <DealRowIgnore
              street="2013"
              city="Nissan"
              state="Altima"
              appointmentDate="Nov 15, 2021 08:00 AM"
              progress="CLOSED"
            />
            <DealRowIgnore
              street="2001"
              city="Honda"
              state="Civic"
              appointmentDate="Nov 16, 2021 09:00 AM"
              progress="IN PROGRESS"
              propWidth="unset"
              propFlex="unset"
              propFlex1="unset"
              propMinWidth="unset"
              propFlex2="unset"
              propMinWidth1="unset"
              propPadding="10px 20px"
              propMinWidth2="unset"
            />
            <DealRowIgnore
              street="2014"
              city="Ford"
              state="Fusion"
              appointmentDate="Nov 17, 2021 10:00 AM"
              progress="CLOSED"
              propWidth="unset"
              propFlex="unset"
              propFlex1="unset"
              propMinWidth="unset"
              propFlex2="unset"
              propMinWidth1="unset"
              propPadding="10px 20px"
              propMinWidth2="unset"
            />
            <DealRowIgnore
              street="2016"
              city="Lamborghini"
              state="Huracan"
              appointmentDate="Nov 20, 2021 07:00 AM"
              progress="IN PROGRESS"
              propWidth="unset"
              propFlex="unset"
              propFlex1="unset"
              propMinWidth="unset"
              propFlex2="unset"
              propMinWidth1="unset"
              propPadding="10px 20px"
              propMinWidth2="unset"
            />
            <DealRowIgnore
              street="2024"
              city="BMW"
              state="330i"
              appointmentDate="Nov 17, 2021 10:00 AM"
              progress="CLOSED"
              propWidth="unset"
              propFlex="unset"
              propFlex1="unset"
              propMinWidth="unset"
              propFlex2="unset"
              propMinWidth1="unset"
              propPadding="10px 20px"
              propMinWidth2="unset"
            />
            <DealRowIgnore
              street="2013"
              city="Toyota"
              state="Camry"
              appointmentDate="Nov 20, 2021 07:00 AM"
              progress="IN PROGRESS"
              propWidth="unset"
              propFlex="unset"
              propFlex1="unset"
              propMinWidth="unset"
              propFlex2="unset"
              propMinWidth1="unset"
              propPadding="10px 20px"
              propMinWidth2="unset"
            />
          </div>
        </div>
      </div>
      <Sidebar />

      <MainHeader />
    </div>
  );
};

export default Vehicles;

*/