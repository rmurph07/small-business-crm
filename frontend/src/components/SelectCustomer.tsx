import { FunctionComponent, useState, useEffect } from "react";
import { fetchCustomers } from "../pages/api";

interface ChoicePopupProps {
  onChooseCustomer: (customer: { customerid: number; firstName: string; lastName: string }) => void;
  onAddCustomer: () => void;
  onClose: () => void;
}

const SelectCustomer: FunctionComponent<ChoicePopupProps> = ({ onChooseCustomer, onAddCustomer, onClose }) => {
  const [customers, setCustomers] = useState<{ customerid: number; firstName: string; lastName: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCustomers(); // ✅ Fetch customers from API
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to load customers.");
      } finally {
        setIsLoading(false);
      }
    };
    loadCustomers();
  }, []);

  return (
      <div className="w-[1366px] bg-black-black-50 h-[910px] overflow-hidden max-w-full max-h-full text-left text-lg text-primary-navy font-heading-h5-bold"
           style={{ height: "100vh", width: "100vw" }}>
        <div className="absolute top-[calc(50%_-_291px)] left-[calc(50%_-_200px)] rounded-xl bg-primary-white w-[400px] h-[582px] overflow-hidden flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-row items-center justify-start py-3.5 pr-3.5 pl-6 gap-[14px]">
            <b className="flex-1 relative leading-[30px]">Select Customer</b>
            <div className="hover:cursor-pointer relative text-sm leading-[30px] font-medium text-olive text-right"
                 onClick={onAddCustomer}>
              Add New
            </div>
            <img className="hover:cursor-pointer w-[50px] relative rounded-31xl h-[50px] overflow-hidden shrink-0"
                 alt="" src="/button10.svg" onClick={onClose} />
          </div>
          <div className="self-stretch bg-primary-white h-[504px] overflow-y-auto shrink-0 flex flex-col items-start justify-start text-base">
            {isLoading ? (
                <p className="p-4">Loading customers...</p>
            ) : error ? (
                <p className="p-4 text-red-500">{error}</p>
            ) : customers.length === 0 ? (
                <p className="p-4">No customers found.</p>
            ) : (
                customers.map((customer) => (
                    <div key={customer.customerid} className="cursor-pointer hover:bg-gray-200 p-2"
                         onClick={() => onChooseCustomer(customer)}>
                      {customer.firstName} {customer.lastName}
                    </div>
                ))
            )}
          </div>
        </div>
      </div>
  );
};

export default SelectCustomer;
