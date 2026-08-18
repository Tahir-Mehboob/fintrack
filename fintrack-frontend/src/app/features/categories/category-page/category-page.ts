import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { CategoryForm } from '../category-form/category-form';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CategoryService } from '../../../core/services/category.service';
import { CategoryResponse } from '../../../models/category.model';

@Component({
  selector: 'app-category-page',
  imports: [CommonModule, GridModule, ButtonModule, CategoryForm],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css',
})

export class CategoryPage implements OnInit {
  categories = signal<CategoryResponse[]>([]);
  loading = signal(true);

  constructor(
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) {}

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

  deleteCategory(id: number): void {
    if (!confirm('Delete this category? This may affect existing transactions.')) {
      return;
    }

    this.categoryService.delete(id).subscribe({
      next: () => {
        this.notificationService.show({
          content: 'Category deleted',
          type: { style: 'success', icon: true },
          position: { horizontal: 'center', vertical: 'top' }
        });
        this.loadCategories();
      },
      error: (err) => {
        this.notificationService.show({
          content: err.error?.error || 'Failed to delete category',
          type: { style: 'error', icon: true },
          position: { horizontal: 'center', vertical: 'top' }
        });
      }
    });
  }
}
