package com.fintrack.backend.service;

import com.fintrack.backend.dto.CategoryRequestDTO;
import com.fintrack.backend.dto.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {
    CategoryResponseDTO create(CategoryRequestDTO dto);
    List<CategoryResponseDTO> getAll();
    CategoryResponseDTO getById(Long id);
    void delete(Long id);
    CategoryResponseDTO update(Long id, CategoryRequestDTO dto);
}
