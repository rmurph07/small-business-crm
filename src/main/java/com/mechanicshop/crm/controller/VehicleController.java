package com.mechanicshop.crm.controller;

import com.mechanicshop.crm.model.Vehicle;
import com.mechanicshop.crm.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Marks this class as a RestController, meaning it's ready for use by Spring MVC to handle web requests.
@RestController
@CrossOrigin(origins = "http://localhost:3000")
// Maps web requests to the /vehicles path.
@RequestMapping("/vehicles")
public class VehicleController {

    // Injects an instance of VehicleService into this controller.
    private final VehicleService vehicleService;

    // Autowired constructor for dependency injection of VehicleService.
    @Autowired
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    // Maps POST requests to /vehicles to this method. It consumes a Vehicle JSON object and returns the saved Vehicle.
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // Sets the HTTP status code to 201 Created upon successful creation of a vehicle.
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.saveVehicle(vehicle);
    }

    // Maps GET requests to /vehicles to this method, which returns a list of all vehicles.
    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    // Maps GET requests to /vehicles/{id} to this method, which returns a single vehicle by its id.
    @GetMapping("/{id}")
    public Vehicle getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id).orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }

    // Maps PUT requests to /vehicles/{id} to this method, allowing the update of a vehicle's details.
    @PutMapping("/{id}")
    public Vehicle updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) {
        return vehicleService.updateVehicle(id, vehicle);
    }

    // Maps DELETE requests to /vehicles/{id} to this method, allowing for the deletion of a vehicle by its id.
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Sets the HTTP status code to 204 No Content upon successful deletion.
    public void deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
    }

    // Maps GET requests to /vehicles/search, allowing for the searching of vehicles by license plate, make, or model.
    @GetMapping("/search")
    public List<Vehicle> searchVehicles(@RequestParam(required = false) String licensePlate,
                                        @RequestParam(required = false) String make,
                                        @RequestParam(required = false) String model) {
        // The method delegates the search operation to the VehicleService, potentially using all or some of the provided parameters.
        return vehicleService.searchVehicles(licensePlate, make, model);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalVehicleCount() {
        long count = vehicleService.getVehiclesCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/customer/{customerId}")
    public List<Vehicle> getVehiclesByCustomerId(@PathVariable Long customerId) {
        return vehicleService.findByCustomer_Customerid(customerId);
    }
}