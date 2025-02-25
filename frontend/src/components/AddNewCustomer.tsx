import React, { useState, FunctionComponent, ChangeEvent } from "react";
import LabelYes from "./LabelYes";
import LabelNo from "./LabelNo";
import DefaultButton from "./DefaultButton";
import { addCustomer } from "../pages/api";

interface ChoicePopupProps {
  onClose: () => void;
}

const AddNewCustomer: FunctionComponent<ChoicePopupProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveCustomer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const customerData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zip}`
    };

    try {
      await addCustomer(customerData);  // Calls API function
      onClose();  // Close form on success
      window.location.reload(); // Refreshes the page
    } catch (err) {
      console.error("Error saving customer:", err);
      setError("Failed to add customer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="w-[1366px] bg-black-black-50 h-[910px] max-w-full max-h-full overflow-auto text-left text-lg text-primary-navy font-heading-h5-bold"
           style={{ height: "100vh", width: "100vw" }}>
        <div className="absolute top-[calc(50%_-_350px)] left-[calc(50%_-_310px)] rounded-xl bg-primary-white w-[620px] overflow-hidden flex flex-col items-start justify-start">
          <header className="flex justify-between items-center p-4 border-b">
            <h2 className="flex-1 relative leading-[30px]">Add New Customer</h2>
            <img
                className="hover:cursor-pointer w-[50px] relative rounded-31xl h-[50px]"
                alt=""
                src="/button9.svg"
                onClick={onClose}
            />
          </header>
          <div className="p-4 overflow-y-auto">
            <form onSubmit={handleSaveCustomer}>
              <LabelYes label="First Name" value={formData.firstname} onChange={handleInputChange} name="firstname" />
              <LabelYes label="Last Name" value={formData.lastname} onChange={handleInputChange} name="lastname" />
              <LabelYes label="Email" value={formData.email} onChange={handleInputChange} name="email" />
              <LabelYes label="Phone" value={formData.phone} onChange={handleInputChange} name="phone" />
              <LabelNo placeholder="Street Address" value={formData.street} onChange={handleInputChange} name="street" />
              <LabelNo placeholder="City" value={formData.city} onChange={handleInputChange} name="city" />
              <LabelNo placeholder="State / Province" value={formData.state} onChange={handleInputChange} name="state" />
              <LabelNo placeholder="Zip Code" value={formData.zip} onChange={handleInputChange} name="zip" />

              {error && <p className="text-red-500">{error}</p>}  {/* ✅ Show error message if request fails */}

              <div className="flex justify-end gap-2 mt-4">
                <DefaultButton buttonText="Cancel" onClick={onClose} />
                <DefaultButton buttonText={isLoading ? "Saving..." : "Save Customer"} type="submit" disabled={isLoading} />
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default AddNewCustomer;
