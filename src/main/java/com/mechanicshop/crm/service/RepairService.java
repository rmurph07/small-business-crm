package com.mechanicshop.crm.service;

import com.mechanicshop.crm.model.Repair;
import com.mechanicshop.crm.model.Vehicle;
import com.mechanicshop.crm.repository.RepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service // Marks the class as a Spring service component
public class RepairService {

    private final RepairRepository repairRepository; // Injects RepairRepository

    @Autowired // Autowires the RepairRepository bean
    public RepairService(RepairRepository repairRepository) {
        this.repairRepository = repairRepository;
    }

    // Saves a Repair entity
    @Transactional
    public Repair saveRepair(Repair repair) {
        return repairRepository.save(repair);
    }

    // Retrieves all Repair entities
    public List<Repair> getAllRepairs() {
        return repairRepository.findAll();
    }

    // Finds a Repair entity by its ID
    public Optional<Repair> getRepairById(Long id) {
        return repairRepository.findById(id);
    }

    // Get all repairs for a vehicle id
    public List<Repair> getRepairsByVehicleId(Long vehicleId) {
        return repairRepository.findByVehicle_VehicleId(vehicleId);
    }
    // Updates a Repair entity's details
    public Repair updateRepair(Long id, Repair repairDetails) {
        Repair repair = repairRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Repair not found for ID: " + id));
        repair.setDescription(repairDetails.getDescription());
        repair.setStatus(repairDetails.getStatus());
        repair.setEndDate(repairDetails.getEndDate());  // Make sure to update endDate if it's being changed
        return repairRepository.save(repair);
    }

    // Deletes a Repair entity by its ID
    @Transactional
    public void deleteRepair(Long id) {
        Repair repair = repairRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Repair not found for ID: " + id));
        repairRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public RepairWithVehicleDTO findLatestRepairWithVehicle() {
        List<Repair> repairs = repairRepository.findLatestRepair(PageRequest.of(0, 1));

        if (repairs.isEmpty()) {
            throw new RuntimeException("No repairs found");
        }

        Repair repair = repairs.get(0);
        Vehicle vehicle = repair.getVehicle(); // Should now be eagerly fetched

        // Map to DTO
        RepairWithVehicleDTO dto = new RepairWithVehicleDTO();
        dto.setRepairId(repair.getRepairId());
        dto.setDescription(repair.getDescription());

        // convert string date to LocalDate
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        dto.setStartDate(repair.getStartDate() != null ? LocalDate.parse(repair.getStartDate(), formatter) : null);
        dto.setEndDate(repair.getEndDate() != null ? LocalDate.parse(repair.getEndDate(), formatter) : null);

        dto.setCost(repair.getCost());
        dto.setStatus(repair.getStatus());

        // Map vehicle details
        if (vehicle != null) {
            VehicleDTO vehicleDTO = new VehicleDTO();
            vehicleDTO.setVehicleId(vehicle.getVehicleId());
            vehicleDTO.setMake(vehicle.getMake());
            vehicleDTO.setModel(vehicle.getModel());
            vehicleDTO.setYear(vehicle.getYear());
            vehicleDTO.setMileage(vehicle.getMileage());
            vehicleDTO.setState(vehicle.getState());
            dto.setVehicle(vehicleDTO);
        }

        return dto;
    }
}
