import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonModule } from '@coreui/angular';
import { CategoryService } from '../../../core/services/category.service';
import { CategoryResponse } from '../../../models/category.model';
import { CategoryForm } from '../category-form/category-form';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, GridModule, ButtonModule, CategoryForm],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css'
})
export class CategoryPage implements OnInit {
  categories = signal<CategoryResponse[]>([]);
  loading = signal(true);
  editingCategory = signal<CategoryResponse | null>(null);

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading.set(true);
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        this.loading.set(false);
      }
    });
  }

  onFormSuccess(): void {
    this.editingCategory.set(null);
    this.loadCategories();
  }

  editCategory(category: CategoryResponse): void {
    this.editingCategory.set(category);
  }

  cancelEdit(): void {
    this.editingCategory.set(null);
  }

  deleteCategory(id: number): void {
    if (!confirm('Delete this category? This may affect existing transactions.')) {
      return;
    }

    this.categoryService.delete(id).subscribe({
      next: () => this.loadCategories(),
      error: (err) => {
        console.error('Failed to delete category', err);
        alert(err.error?.error || 'Failed to delete category');
      }
    });
  }
}