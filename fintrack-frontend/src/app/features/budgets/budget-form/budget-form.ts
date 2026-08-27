import { CommonModule } from '@angular/common';
import { Component, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule, FormModule } from '@coreui/angular';
import { BudgetService } from '../../../core/services/budget.service';
import { CategoryService } from '../../../core/services/category.service';
import { BudgetRequest } from '../../../models/budget.model';
import { CategoryResponse } from '../../../models/category.model';

@Component({
  selector: 'app-budget-form',
  imports: [CommonModule, FormsModule, ButtonModule, FormModule],
  templateUrl: './budget-form.html',
  styleUrl: './budget-form.css',
})
export class BudgetForm implements OnInit {
  budgetCreated = output<void>();

  categories = signal<CategoryResponse[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  selectedCategoryId: number | null = null;
  monthlyLimit: number | null = null;

  months = [
    { text: 'January', value: 1 }, { text: 'February', value: 2 },
    { text: 'March', value: 3 }, { text: 'April', value: 4 },
    { text: 'May', value: 5 }, { text: 'June', value: 6 },
    { text: 'July', value: 7 }, { text: 'August', value: 8 },
    { text: 'September', value: 9 }, { text: 'October', value: 10 },
    { text: 'November', value: 11 }, { text: 'December', value: 12 }
  ];
  selectedMonth = new Date().getMonth() + 1;
  selectedYear = new Date().getFullYear();

  constructor(
    private categoryService: CategoryService,
    private budgetService: BudgetService
  ) {}

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

    this.budgetService.create(request).subscribe({
      next: () => {
        this.loading.set(false);
        this.selectedCategoryId = null;
        this.monthlyLimit = null;
        this.budgetCreated.emit();
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.error || 'Failed to create budget');
      }
    });
  }
}