package com.mechanicshop.crm.service;
import java.math.BigDecimal;
import java.time.LocalDate;

public class RepairWithVehicleDTO {

    private Long repairId;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal cost;
    private String status;
    private VehicleDTO vehicle;

    public RepairWithVehicleDTO() {
        // Default constructor
    }

    // Additional constructors can be added if needed

    // Getters and setters for each property
    public Long getRepairId() {
        return repairId;
    }

    public void setRepairId(Long repairId) {
        this.repairId = repairId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() { return endDate; }

    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public VehicleDTO getVehicle() {
        return vehicle;
    }

    public void setVehicle(VehicleDTO vehicle) {
        this.vehicle = vehicle;
    }

    // Implement toString(), hashCode(), equals() as needed
}

