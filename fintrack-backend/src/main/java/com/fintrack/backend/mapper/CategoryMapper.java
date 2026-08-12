package com.fintrack.backend.mapper;

import com.fintrack.backend.dto.CategoryRequestDTO;
import com.fintrack.backend.dto.CategoryResponseDTO;
import com.fintrack.backend.model.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public Category toEntity(CategoryRequestDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category.setType(dto.getType());
        return category;
    }

    public CategoryResponseDTO toResponseDTO(Category category) {
        return new CategoryResponseDTO(
                category.getId(),
                category.getName(),
                category.getType()
        );
    }
}