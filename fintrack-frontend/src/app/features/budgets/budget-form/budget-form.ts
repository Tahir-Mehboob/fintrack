import { Component, OnInit, signal, output, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule, FormModule } from '@coreui/angular';
import { CategoryService } from '../../../core/services/category.service';
import { BudgetService } from '../../../core/services/budget.service';
import { CategoryResponse } from '../../../models/category.model';
import { BudgetRequest, BudgetResponse } from '../../../models/budget.model';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, FormModule],
  templateUrl: './budget-form.html',
  styleUrl: './budget-form.css',
})
export class BudgetForm implements OnInit {
  editingBudget = input<BudgetResponse | null>(null);
  budgetCreated = output<void>();
  cancelEdit = output<void>();

  categories = signal<CategoryResponse[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  selectedCategoryId: number | null = null;
  monthlyLimit: number | null = null;
  selectedMonth = new Date().getMonth() + 1;
  selectedYear = new Date().getFullYear();

  months = [
    { text: 'January', value: 1 }, { text: 'February', value: 2 },
    { text: 'March', value: 3 }, { text: 'April', value: 4 },
    { text: 'May', value: 5 }, { text: 'June', value: 6 },
    { text: 'July', value: 7 }, { text: 'August', value: 8 },
    { text: 'September', value: 9 }, { text: 'October', value: 10 },
    { text: 'November', value: 11 }, { text: 'December', value: 12 }
  ];

  constructor(
    private categoryService: CategoryService,
    private budgetService: BudgetService
  ) {
    effect(() => {
      const budget = this.editingBudget();
      const cats = this.categories();
      if (budget) {
        const match = cats.find(c => c.name === budget.categoryName);
        this.selectedCategoryId = match ? match.id : null;
        this.monthlyLimit = budget.monthlyLimit;
        this.selectedMonth = budget.month;
        this.selectedYear = budget.year;
      } else {
        this.resetForm();
      }
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  onSubmit(): void {
    if (!this.selectedCategoryId || !this.monthlyLimit) {
      this.errorMessage.set('Please fill all required fields');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const request: BudgetRequest = {
      categoryId: this.selectedCategoryId,
      monthlyLimit: this.monthlyLimit,
      month: this.selectedMonth,
      year: this.selectedYear
    };

    const editing = this.editingBudget();
    const request$ = editing
      ? this.budgetService.update(editing.id, request)
      : this.budgetService.create(request);

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.resetForm();
        this.budgetCreated.emit();
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.error || 'Failed to save budget');
      }
    });
  }

  onCancel(): void {
    this.cancelEdit.emit();
  }

  private resetForm(): void {
    this.selectedCategoryId = null;
    this.monthlyLimit = null;
    this.selectedMonth = new Date().getMonth() + 1;
    this.selectedYear = new Date().getFullYear();
  }
}