import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '@progress/kendo-angular-charts';
import { ButtonModule, FormModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../../../core/services/budget.service';
import { BudgetResponse } from '../../../models/budget.model';
import { BudgetForm } from '../budget-form/budget-form';

@Component({
  selector: 'app-budget-page',
  standalone: true,
  imports: [CommonModule, ChartModule, ButtonModule, FormModule, FormsModule, BudgetForm],
  templateUrl: './budget-page.html',
  styleUrl: './budget-page.css'
})
export class BudgetPage implements OnInit {
  budgets = signal<BudgetResponse[]>([]);
  loading = signal(true);
  editingBudget = signal<BudgetResponse | null>(null);

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

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.loading.set(true);
    this.budgetService.getByMonth(this.selectedMonth, this.selectedYear).subscribe({
      next: (data) => {
        this.budgets.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load budgets', err);
        this.loading.set(false);
      }
    });
  }

  onFilterChange(): void {
    this.loadBudgets();
  }

  onFormSuccess(): void {
    this.editingBudget.set(null);
    this.loadBudgets();
  }

  editBudget(budget: BudgetResponse): void {
    this.editingBudget.set(budget);
  }

  cancelEdit(): void {
    this.editingBudget.set(null);
  }

  deleteBudget(id: number): void {
    if (!confirm('Delete this budget?')) {
      return;
    }
    this.budgetService.delete(id).subscribe({
      next: () => this.loadBudgets(),
      error: (err) => {
        console.error('Failed to delete budget', err);
        alert(err.error?.error || 'Failed to delete budget');
      }
    });
  }

  get categoryLabels(): string[] {
    return this.budgets().map(b => b.categoryName);
  }

  get limitData(): number[] {
    return this.budgets().map(b => b.monthlyLimit);
  }

  get spentData(): number[] {
    return this.budgets().map(b => b.spentSoFar);
  }

  isOverBudget(budget: BudgetResponse): boolean {
    return budget.spentSoFar > budget.monthlyLimit;
  }
}