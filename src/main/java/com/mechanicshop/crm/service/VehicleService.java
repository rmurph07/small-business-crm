package com.mechanicshop.crm.service;

import com.mechanicshop.crm.model.Vehicle;
import com.mechanicshop.crm.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    @Autowired
    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAllWithCustomer();
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }

    public Vehicle updateVehicle(Long id, Vehicle vehicleDetails) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found for this id :: " + id));
        vehicle.setLicensePlate(vehicleDetails.getLicensePlate());
        vehicle.setMake(vehicleDetails.getMake());
        vehicle.setModel(vehicleDetails.getModel());
        // Update other fields as needed
        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found for this id :: " + id));
        vehicleRepository.delete(vehicle);
    }

    // Generalized search method already implemented
    public List<Vehicle> searchVehicles(String licensePlate, String make, String model) {
        List<Vehicle> results = new ArrayList<>();
        if (licensePlate != null && !licensePlate.isBlank()) {
            results.addAll(vehicleRepository.findByLicensePlateContaining(licensePlate));
        }
        if (make != null && !make.isBlank()) {
            results.addAll(vehicleRepository.findByMake(make));
        }
        if (model != null && !model.isBlank()) {
            results.addAll(vehicleRepository.findByModel(model));
        }
        return results.stream().distinct().collect(Collectors.toList());
    }

    // Specific search methods calling the general search method
    public List<Vehicle> searchVehiclesByMake(String make) {
        return searchVehicles(null, make, null);
    }

    public List<Vehicle> searchVehiclesByModel(String model) {
        return searchVehicles(null, null, model);
    }

    public List<Vehicle> searchVehiclesByLicensePlate(String licensePlate) {
        return searchVehicles(licensePlate, null, null);
    }

    public void saveAllVehicles(List<Vehicle> vehicles) {
        vehicleRepository.saveAll(vehicles);
    }

    public long getVehiclesCount() {
        return vehicleRepository.count();
    }

    public List<Vehicle> findByCustomer_Customerid(long customerId) { return vehicleRepository.findByCustomer_Customerid(customerId); }
}
