package com.mechanicshop.crm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mechanicshop.crm.model.Customer;
import com.mechanicshop.crm.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

// The @RestController annotation marks this class as a controller where
// every method returns a domain object instead of a view. It's part of Spring MVC.
@RestController
@CrossOrigin(origins = "http://localhost:3000")
// @RequestMapping at the class level defines the base URL path for all the
// controller methods.
@RequestMapping("/customers")
public class CustomerController {

    private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    // This is an instance of CustomerService that will be used to handle
    // the business logic.
    private final CustomerService customerService;

    // The @Autowired annotation is used by Spring to automatically inject
    // the dependencies specified in the class's constructor.
    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // @PostMapping annotation is used to map HTTP POST requests onto the
    // specific handler method below.
    // @ResponseStatus marks the method so that if it completes successfully,
    // it will return the HTTP status code CREATED (201).
    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
        logger.info("Received Customer: {}", customer);
        try {
            Customer savedCustomer = customerService.saveCustomer(customer);
            logger.info("Customer added successfully: {}", savedCustomer);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomer);
        } catch (Exception e) {
            logger.error("Error saving customer: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // @GetMapping annotation is used to map HTTP GET requests onto the
    // specific handler method below.

    // @GetMapping with a path variable is used to fetch a specific customer by ID.
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        // Calls getCustomerById method of customerService to retrieve a customer.
        // If the customer is not found, it throws a RuntimeException.
        return customerService.getCustomerById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    // @PutMapping annotation is used to map HTTP PUT requests onto the
    // specific handler method below. It typically represents an update operation.
    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        // Calls updateCustomer method of customerService to update a customer's
        // information and returns the updated Customer object.
        return customerService.updateCustomer(id, customer);
    }

    // @DeleteMapping annotation is used to map HTTP DELETE requests onto the
    // specific handler method below. It is used to delete a resource.
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@PathVariable Long id) {
        // Calls deleteCustomer method of customerService to remove a customer
        // from the database.
        customerService.deleteCustomer(id);
    }

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.findAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalCustomerCount() {
        long count = customerService.getCustomersCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }




}
