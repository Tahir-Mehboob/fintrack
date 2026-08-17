import { Component, OnInit, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CategoryService } from '../../../core/services/category.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { CategoryResponse } from '../../../models/category.model';
import { TransactionRequest } from '../../../models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputsModule, DropDownsModule, DateInputsModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css'
})
export class TransactionForm implements OnInit {
  transactionCreated = output<void>();

  categories = signal<CategoryResponse[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  selectedCategory: CategoryResponse | null = null;
  amount: number | null = null;
  description = '';
  transactionDate: Date = new Date();
  type: 'INCOME' | 'EXPENSE' = 'EXPENSE';

  typeOptions = ['EXPENSE', 'INCOME'];

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  onSubmit(): void {
    if (!this.selectedCategory || !this.amount) {
      this.errorMessage.set('Please fill all required fields');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const request: TransactionRequest = {
      categoryId: this.selectedCategory.id,
      amount: this.amount,
      description: this.description,
      transactionDate: this.formatDate(this.transactionDate),
      type: this.type
    };

    this.transactionService.create(request).subscribe({
      next: () => {
        this.loading.set(false);
        this.notificationService.show({
          content: 'Transaction added successfully!',
          type: { style: 'success', icon: true },
          position: { horizontal: 'center', vertical: 'top' }
        });
        this.resetForm();
        this.transactionCreated.emit();
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.error || 'Failed to create transaction');
      }
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private resetForm(): void {
    this.selectedCategory = null;
    this.amount = null;
    this.description = '';
    this.transactionDate = new Date();
    this.type = 'EXPENSE';
  }
}