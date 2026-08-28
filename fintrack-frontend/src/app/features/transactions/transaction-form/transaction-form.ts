import { Component, OnInit, signal, output, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule, FormModule } from '@coreui/angular';
import { CategoryService } from '../../../core/services/category.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { CategoryResponse, TransactionType } from '../../../models/category.model';
import { TransactionRequest, TransactionResponse } from '../../../models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, FormModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css'
})
export class TransactionForm implements OnInit {
  editingTransaction = input<TransactionResponse | null>(null);
  transactionCreated = output<void>();
  cancelEdit = output<void>();

  categories = signal<CategoryResponse[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  selectedCategoryId: number | null = null;
  amount: number | null = null;
  description = '';
  transactionDate: string = this.formatDate(new Date());
  type: TransactionType = 'EXPENSE';

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) {
    effect(() => {
      const txn = this.editingTransaction();
      const cats = this.categories();
      if (txn) {
        const match = cats.find(c => c.name === txn.categoryName);
        this.selectedCategoryId = match ? match.id : null;
        this.amount = txn.amount;
        this.description = txn.description;
        this.transactionDate = txn.transactionDate;
        this.type = txn.type;
      } else {
        this.resetForm();
      }
    });
  }

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
    if (!this.selectedCategoryId || !this.amount) {
      this.errorMessage.set('Please fill all required fields');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const request: TransactionRequest = {
      categoryId: this.selectedCategoryId,
      amount: this.amount,
      description: this.description,
      transactionDate: this.transactionDate,
      type: this.type
    };

    const editing = this.editingTransaction();
    const request$ = editing
      ? this.transactionService.update(editing.id, request)
      : this.transactionService.create(request);

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.resetForm();
        this.transactionCreated.emit();
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.error || 'Failed to save transaction');
      }
    });
  }

  onCancel(): void {
    this.cancelEdit.emit();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private resetForm(): void {
    this.selectedCategoryId = null;
    this.amount = null;
    this.description = '';
    this.transactionDate = this.formatDate(new Date());
    this.type = 'EXPENSE';
  }
}