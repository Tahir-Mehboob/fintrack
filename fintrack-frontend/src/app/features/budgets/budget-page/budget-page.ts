import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartModule } from '@progress/kendo-angular-charts';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BudgetForm } from '../budget-form/budget-form';
import { BudgetService } from '../../../core/services/budget.service';
import { BudgetResponse } from '../../../models/budget.model';

@Component({
  selector: 'app-budget-page',
  imports: [CommonModule, ChartModule, DropDownsModule, FormsModule, BudgetForm,InputsModule],
  templateUrl: './budget-page.html',
  styleUrl: './budget-page.css',
})
export class BudgetPage implements OnInit {
  budgets = signal<BudgetResponse[]>([]);
  loading = signal(true);

  months = [
    { text: 'January', value: 1 }, { text: 'February', value: 2 },
    { text: 'March', value: 3 }, { text: 'April', value: 4 },
    { text: 'May', value: 5 }, { text: 'June', value: 6 },
    { text: 'July', value: 7 }, { text: 'August', value: 8 },
    { text: 'September', value: 9 }, { text: 'October', value: 10 },
    { text: 'November', value: 11 }, { text: 'December', value: 12 }
  ];
  selectedMonth = this.months[new Date().getMonth()];
  selectedYear = new Date().getFullYear();

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.loading.set(true);
    this.budgetService.getByMonth(this.selectedMonth.value, this.selectedYear).subscribe({
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
