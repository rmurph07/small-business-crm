package com.mechanicshop.crm.model;

// Importing Jakarta Persistence API annotations for ORM (Object-Relational Mapping)
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

// Declares this class as an entity to be managed by JPA in the context of ORM
@Entity
// Specifies the table in the database that this entity will be mapped to
@Table(name = "vehicles")
public class Vehicle {

    // Marks this field as the primary key of the entity
    @Id
    @GeneratedValue(generator = "increment") // Uses Hibernate's increment strategy instead of SQLite's IDENTITY
    @GenericGenerator(name = "increment", strategy = "increment")
    @JsonProperty("vehicleId")
    private Long vehicleId;

    // Specifies these fields as columns in the table, with a constraint that they cannot be null
    @Column(name = "make", nullable = false)
    private String make;

    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "year", nullable = false)
    private Integer year;

    // This field can be null, thus doesn't have the nullable = false constraint
    @Column(name = "mileage")
    private Integer mileage;

    // Specifies that the licensePlate column must be unique and not null
    @Column(name = "licensePlate", nullable = false, unique = true)
    private String licensePlate;

    // A large text field for additional notes about the vehicle
    @Column(name = "additionalNotes", columnDefinition = "TEXT")
    private String additionalNotes;

    @Column(name = "state", columnDefinition = "TEXT")
    private String state;

    // Establishes a many-to-one relationship between vehicles and a customer
    // FetchType.LAZY indicates that the customer associated with a vehicle is loaded on demand
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customerID") // Specifies the foreign key column in the vehicles table
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Customer customer;

    // Default no-argument constructor required by JPA
    public Vehicle() {
    }

    // Getters and setters for all fields to access and modify the vehicle's properties
    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMileage() {
        return mileage;
    }

    public void setMileage(Integer mileage) {
        this.mileage = mileage;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Long getId() {
        return vehicleId;
    }
}
