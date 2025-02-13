package com.mechanicshop.crm.repository;

// Required imports

import com.mechanicshop.crm.model.Vehicle; // Importing the Vehicle entity
import org.springframework.data.jpa.repository.JpaRepository; // Spring Data JPA repository interface
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository; // Annotation to denote a repository component

import java.util.List; // Import for using the List collection
import java.util.Optional; // Import for using Optional

@Repository // Marks the interface as a repository component in the Spring context
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    @Query("SELECT v FROM Vehicle v LEFT JOIN FETCH v.customer")
    List<Vehicle> findAllWithCustomer();

    // Method to find a vehicle by its license plate, returning an Optional
    Optional<Vehicle> findByLicensePlate(String licensePlate);

    // Method to find vehicles by their make
    List<Vehicle> findByMake(String make);

    // Method to find vehicles by their model
    List<Vehicle> findByModel(String model);

    // Method to find vehicles by both make and model
    List<Vehicle> findByMakeAndModel(String make, String model);

    // Custom method for searching vehicles by a partial license plate match
    List<Vehicle> findByLicensePlateContaining(String licensePlate);
}
