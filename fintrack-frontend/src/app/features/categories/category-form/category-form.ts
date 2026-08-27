import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule, FormModule } from '@coreui/angular';
import { CategoryService } from '../../../core/services/category.service';
import { CategoryRequest, TransactionType } from '../../../models/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, FormModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryForm {
  categoryCreated = output<void>();

  loading = signal(false);
  errorMessage = signal('');

  name = '';
  type: TransactionType = 'EXPENSE';

  constructor(private categoryService: CategoryService) {}

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

    this.categoryService.create(request).subscribe({
      next: () => {
        this.loading.set(false);
        this.name = '';
        this.type = 'EXPENSE';
        this.categoryCreated.emit();
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.error || 'Failed to create category');
      }
    });
  }
}