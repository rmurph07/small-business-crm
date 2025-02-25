package com.mechanicshop.crm.service;

// Required imports
import com.mechanicshop.crm.model.Customer;
import com.mechanicshop.crm.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service // Marks this class as a service component in the Spring context
public class CustomerService {

    private final CustomerRepository customerRepository; // Dependency on the CustomerRepository

    @Autowired // Autowiring the CustomerRepository to inject its instance
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    // Saves a customer to the database
    public Customer saveCustomer(Customer customer) {
        customer.setCustomerid(null);
        return customerRepository.save(customer);
    }

    // Retrieves all customers from the database
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Retrieves a customer by their ID
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    // Updates a customer's details
    public Customer updateCustomer(Long id, Customer customerDetails) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found for this id :: " + id));
        customer.setFirstName(customerDetails.getFirstName());
        customer.setLastName(customerDetails.getLastName());
        customer.setEmail(customerDetails.getEmail());
        // Potentially updates other fields as necessary
        return customerRepository.save(customer);
    }

    // Deletes a customer by their ID
    public void deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found for this id :: " + id));
        customerRepository.delete(customer);
    }

    // Search for customers by name or phone
    public List<Customer> searchCustomers(String query) {
        // Assuming you have a method in CustomerRepository to search by name or phone
        // This method needs to be implemented in CustomerRepository
        return customerRepository.findByFirstnameContainingOrLastnameContainingOrPhoneContaining(query, query, query);
    }

    public void saveAllCustomers(List<Customer> customers) {
        customerRepository.saveAll(customers);
    }

    // Retrieves the count of all customers in the database
    public long countAllCustomers() {
        return customerRepository.count();
    }

    public List<Customer> findAllCustomers() {
        return customerRepository.findAll();
    }

    public long getCustomersCount() {
        return customerRepository.count();
    }
}
