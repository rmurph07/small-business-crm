import { FunctionComponent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCustomerById, fetchVehiclesByCustomerId } from "../pages/api"; // Use API functions
import ScreenColumnsBG from "../components/ScreenColumnsBG";
import Sidebar from "../components/Sidebar";
import MainHeader from "../components/MainHeader";

const CustomerDetail: FunctionComponent = () => {
  const { customerId } = useParams(); // Extract customerId from URL
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<any>(null);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Extracted customerId:", customerId); // Debugging line

    if (!customerId) {
      setError("Invalid customer ID.");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const customerData = await fetchCustomerById(customerId);
        const customerVehicles = await fetchVehiclesByCustomerId(customerId);

        setCustomer(customerData);
        setVehicles(customerVehicles);
      } catch (err) {
        setError("Failed to fetch customer details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [customerId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
      <>
        <div className="w-full relative bg-gray-100 min-h-screen overflow-hidden text-left text-sm text-primary-white font-heading-h5-bold">
          <ScreenColumnsBG showRightArea />
          <div className="absolute w-[calc(100%-90px)] top-[90px] right-0 left-[90px] flex flex-row items-start justify-start">
            <div className="flex-1 min-h-[670px] flex flex-col items-center justify-start p-6 gap-6">

              {/* Customer Information */}
              <div className="w-full bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-primary-navy">
                  {customer.firstName} {customer.lastName}
                </h2>
                <p className="text-gray-600">Email: {customer.email}</p>
                <p className="text-gray-600">Phone: {customer.phone}</p>
                <p className="text-gray-600">
                  Address: {customer.address}, {customer.city}, {customer.state} {customer.zipCode}
                </p>
              </div>

              {/* Vehicles Section */}
              <div className="w-full bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-primary-navy mb-4">Vehicles</h2>
                {vehicles.length === 0 ? (
                    <p className="text-gray-500">No vehicles registered.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {vehicles.map((vehicle) => (
                          <div
                              key={vehicle.id}
                              className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all cursor-pointer"
                              onClick={() => navigate(`/vehicle-detail/${vehicle.id}`)}
                          >
                            <h4 className="text-lg font-semibold text-primary-navy">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </h4>
                            <p className="text-gray-600">Mileage: {vehicle.mileage} miles</p>
                            <p className="text-gray-600">License Plate: {vehicle.licensePlate} ({vehicle.state})</p>
                          </div>
                      ))}
                    </div>
                )}
              </div>
            </div>
          </div>
          <Sidebar />
          <MainHeader />
        </div>
      </>
  );
};

export default CustomerDetail;
