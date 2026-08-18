import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CategoryService } from '../../../core/services/category.service';
import { TransactionType, CategoryRequest } from '../../../models/category.model';

@Component({
  selector: 'app-category-form',
  imports: [CommonModule, FormsModule, ButtonModule, InputsModule, DropDownsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})

export class CategoryForm {
  categoryCreated = output<void>();

  loading = signal(false);
  errorMessage = signal('');

  name = '';
  type: TransactionType = 'EXPENSE';
  typeOptions: TransactionType[] = ['EXPENSE', 'INCOME'];

  constructor(
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) {}

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
        this.notificationService.show({
          content: 'Category created successfully!',
          type: { style: 'success', icon: true },
          position: { horizontal: 'center', vertical: 'top' }
        });
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