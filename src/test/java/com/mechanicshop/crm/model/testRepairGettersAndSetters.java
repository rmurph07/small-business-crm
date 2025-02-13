package com.mechanicshop.crm.model;

import com.mechanicshop.crm.model.Repair;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

class RepairTest {

    @Test
    void testRepairGettersAndSetters() {
        // Initialize a repair object with various details
        Repair repair = new Repair();
        repair.setRepairId(1L);
        repair.setDescription("Fix engine");
        repair.setStartDate("2023-02-11");
        repair.setEndDate("2024-04-13");
        repair.setCost(new BigDecimal("499.99"));
        repair.setStatus("Completed");

        // Confirm that each setter correctly sets the value, which is retrievable by the getter
        assertEquals(1L, repair.getRepairId());
        assertEquals("Fix engine", repair.getDescription());
        assertEquals("2023-02-11", repair.getStartDate());
        assertEquals("2024-04-13", repair.getEndDate());
        assertEquals(0, new BigDecimal("499.99").compareTo(repair.getCost()));
        assertEquals("Completed", repair.getStatus());

        // Output success message
        System.out.println("RepairTest: All assertions passed.");
    }
}
