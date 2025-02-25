package com.mechanicshop.crm.model;

// Necessary imports for JPA annotations and Java utilities
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.Set;
import java.util.HashSet;
import org.hibernate.annotations.GenericGenerator;

// Marks this class as a JPA entity, meaning it will be mapped to a table in a database
@Entity
@Table(name = "customers")
@JsonIgnoreProperties(value = { "vehicles" })  // Ignore back-reference serialization issues
public class Customer {
    // Specifies the primary key of the entity with auto-increment strategy

    @Id
    @GeneratedValue(generator = "increment") // Uses Hibernate's increment strategy instead of SQLite's IDENTITY
    @GenericGenerator(name = "increment", strategy = "increment")
    @JsonProperty("customerid")
    private Long customerid;


    // Marks the field as a column in the table with a not-null constraint
    @Column(nullable = false)
    @JsonProperty("firstname")
    private String firstname;

    @Column(nullable = false)
    @JsonProperty("lastname")
    private String lastname;

    // Similar to name, marks as a column that cannot be null
    @Column(nullable = false)
    @JsonProperty("phone")
    private String phone;

    // Marks the email as a unique column, ensuring no two customers have the same email
    @Column(nullable = false, unique = true)
    @JsonProperty("email")
    private String email;

    // Specifies a TEXT type column for longer strings, without a not-null constraint
    @Column(columnDefinition = "TEXT")
    @JsonProperty("address")
    private String address;

    // Establishes a one-to-many relationship with the Vehicle entity
    // Cascade type ALL means persist, merge, remove, and refresh operations will cascade from customer to vehicles
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Vehicle> vehicles = new HashSet<>();

    // Default constructor required by JPA
    public Customer() {
    }

    // Getters and setters for all the fields to access and modify the entity's properties
    public Long getCustomerid() {
        return customerid;
    }

    public String getFirstName() {
        return firstname;
    }

    public String getLastName() {
        return lastname;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }

    public Set<Vehicle> getVehicles() {
        return vehicles;
    }

    public void setCustomerid(Long customerid) {
        this.customerid = customerid;
    }

    public void setFirstName(String firstname) {
        this.firstname = firstname;
    }

    public void setLastName(String lastname) {
        this.lastname = lastname;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // When setting vehicles, ensure each vehicle is associated back to this customer
    public void setVehicles(Set<Vehicle> vehicles) {
        vehicles.forEach(vehicle -> vehicle.setCustomer(this));
        this.vehicles = vehicles;
    }

    // Utility method to add a vehicle to the customer's set of vehicles
    // It sets the vehicle's customer to this customer and adds the vehicle to the set
    public void addVehicle(Vehicle vehicle) {
        vehicle.setCustomer(this);
        this.vehicles.add(vehicle);
    }

    // Utility method to remove a vehicle from the customer's set of vehicles
    // It nullifies the vehicle's reference to this customer and removes the vehicle from the set
    public void removeVehicle(Vehicle vehicle) {
        vehicle.setCustomer(null);
        this.vehicles.remove(vehicle);
    }
}
