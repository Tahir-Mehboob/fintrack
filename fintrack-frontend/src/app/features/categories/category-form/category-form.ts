import { Component, signal, output, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule, FormModule } from '@coreui/angular';
import { CategoryService } from '../../../core/services/category.service';
import { CategoryRequest, CategoryResponse, TransactionType } from '../../../models/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, FormModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryForm {
  editingCategory = input<CategoryResponse | null>(null);
  categoryCreated = output<void>();
  cancelEdit = output<void>();

  loading = signal(false);
  errorMessage = signal('');

  name = '';
  type: TransactionType = 'EXPENSE';

  constructor(private categoryService: CategoryService) {
    effect(() => {
      const category = this.editingCategory();
      if (category) {
        this.name = category.name;
        this.type = category.type;
      } else {
        this.name = '';
        this.type = 'EXPENSE';
      }
    });
  }

  onSubmit(): void {
    if (!this.name.trim()) {
      this.errorMessage.set('Category name is required');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const request: CategoryRequest = {
      name: this.name.trim(),
      type: this.type
    };

    const editing = this.editingCategory();
    const request$ = editing
      ? this.categoryService.update(editing.id, request)
      : this.categoryService.create(request);

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.name = '';
        this.type = 'EXPENSE';
        this.categoryCreated.emit();
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.error || 'Failed to save category');
      }
    });
  }

  onCancel(): void {
    this.cancelEdit.emit();
  }
}