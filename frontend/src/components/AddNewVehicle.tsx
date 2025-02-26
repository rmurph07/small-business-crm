import React, { useState, FunctionComponent, ChangeEvent } from "react";
import LabelYes from "./LabelYes";
import LabelNo from "./LabelNo";
import DefaultButton from "./DefaultButton";
import { addVehicle } from "../pages/api"; // Ensure this function exists in api.js

interface ChoicePopupProps {
    selectedCustomer: { customerid: number; firstName: string; lastName: string };
    onClose: () => void;
    onChooseCustomer?: () => void;
}

const AddNewVehicle: FunctionComponent<ChoicePopupProps> = ({ selectedCustomer, onClose, onChooseCustomer }) => {
    const [formData, setFormData] = useState({
        year: "",
        make: "",
        model: "",
        mileage: "",
        licensePlate: "",
        state: "",
        additionalNotes: "",
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

    const handleSaveVehicle = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        const vehicleData = {
            customerid: selectedCustomer.customerid,
            year: parseInt(formData.year, 10),
            make: formData.make,
            model: formData.model,
            mileage: parseInt(formData.mileage, 10),
            licensePlate: formData.licensePlate,
            state: formData.state,
            additionalNotes: formData.additionalNotes
        };

        try {
            await addVehicle(vehicleData);  // Calls API function
            onClose();  // Close form on success
            window.location.reload(); // Refreshes the page
        } catch (err) {
            console.error("Error saving vehicle:", err);
            setError("Failed to add vehicle. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="w-[1366px] bg-black-black-50 h-[910px] max-w-full max-h-full overflow-auto text-left text-lg text-primary-navy font-heading-h5-bold"
            style={{ height: "100vh", width: "100vw" }}
        >
            <div className="absolute top-[calc(50%_-_350px)] left-[calc(50%_-_400px)] rounded-xl bg-primary-white w-[800px] overflow-hidden flex flex-col items-start justify-start p-6 shadow-lg">

                {/* Header */}
                <header className="flex justify-between items-center w-full border-b pb-3">
                    <h2 className="text-xl font-bold">Add New Vehicle</h2>
                    <img
                        className="hover:cursor-pointer w-[80px] h-[80px]"
                        alt="Close"
                        src="/button9.svg"
                        onClick={onClose}
                    />
                </header>

                {/* Customer Info */}
                <p className="text-md text-gray-600 mt-4 mb-4">
                    Adding vehicle for <b>{selectedCustomer.firstName} {selectedCustomer.lastName}</b>
                </p>

                {/* Change Customer Button */}
                {onChooseCustomer && (
                    <div className="mb-4">
                        <DefaultButton buttonText="Change Customer" onClick={onChooseCustomer} />
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSaveVehicle} className="w-full">
                    <div className="grid grid-cols-3 gap-4">
                        <LabelNo placeholder="Year" value={formData.year} onChange={handleInputChange} name="year" />
                        <LabelNo placeholder="Make" value={formData.make} onChange={handleInputChange} name="make" />
                        <LabelNo placeholder="Model" value={formData.model} onChange={handleInputChange} name="model" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <LabelYes label="Mileage" value={formData.mileage} onChange={handleInputChange} name="mileage" />
                        <LabelYes label="License Plate" value={formData.licensePlate} onChange={handleInputChange} name="licensePlate" />
                    </div>

                    <div className="mt-4">
                        <LabelYes label="State" value={formData.state} onChange={handleInputChange} name="state" />
                        <LabelYes label="Additional Notes" value={formData.additionalNotes} onChange={handleInputChange} name="additionalNotes" />
                    </div>
                    {/* Error Message */}
                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        <DefaultButton buttonText="Cancel" onClick={onClose} />
                        <DefaultButton buttonText={isLoading ? "Saving..." : "Save Vehicle"} type="submit" disabled={isLoading} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewVehicle;
