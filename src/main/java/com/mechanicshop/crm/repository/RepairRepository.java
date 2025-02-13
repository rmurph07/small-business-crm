package com.mechanicshop.crm.repository;

// Required imports

import com.mechanicshop.crm.model.Repair; // Importing the Repair entity
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository; // Spring Data JPA repository interface
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository; // Annotation to denote a repository component

import org.springframework.data.domain.Pageable;
import java.util.List; // Import for using the List collection
import java.util.Optional;

@Repository // Marks the interface as a repository component in the Spring context
public interface RepairRepository extends JpaRepository<Repair, Long> {

    @Query("SELECT r FROM Repair r JOIN FETCH r.vehicle WHERE r.startDate IS NOT NULL ORDER BY r.startDate DESC")
    List<Repair> findLatestRepair(Pageable pageable);




}