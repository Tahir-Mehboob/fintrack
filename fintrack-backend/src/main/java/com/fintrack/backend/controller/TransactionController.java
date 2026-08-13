package com.fintrack.backend.controller;

import com.fintrack.backend.dto.TransactionRequestDTO;
import com.fintrack.backend.dto.TransactionResponseDTO;
import com.fintrack.backend.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionResponseDTO> create(
            @Valid @RequestBody TransactionRequestDTO dto,
            Authentication authentication) {
        String userEmail = authentication.getName(); // comes from JWT once Security is wired up
        //  String userEmail = "tahir@test.com"; // TEMPORARY - replace with authentication.getName() later

        TransactionResponseDTO created = transactionService.create(dto, userEmail);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> getAll(Authentication authentication) {
        //String userEmail = "tahir@test.com"; // TEMPORARY
        String userEmail = authentication.getName();
        return ResponseEntity.ok(transactionService.getByUser(userEmail));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
       // String userEmail = "tahir@test.com"; // TEMPORARY
        String userEmail = authentication.getName();
        transactionService.delete(id, userEmail);
        return ResponseEntity.noContent().build();
    }
}
