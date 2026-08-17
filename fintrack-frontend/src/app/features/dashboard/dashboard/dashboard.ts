import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { Router } from '@angular/router';
import { TransactionService } from '../../../core/services/transaction.service';
import { AuthService } from '../../../core/services/auth.service';
import { TransactionResponse } from '../../../models/transaction.model';
import { TransactionForm } from '../../transactions/transaction-form/transaction-form';

  // Build the Dashboard with Kendo Grid
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GridModule, ButtonModule,TransactionForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  transactions = signal<TransactionResponse[]>([]);
  loading = signal(true);

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading.set(true);
    this.transactionService.getAll().subscribe({
      next: (data) => {
        this.transactions.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load transactions', err);
        this.loading.set(false);
      }
    });
  }

    onTransactionCreated(): void {
      this.loadTransactions(); // refresh the grid
    }

    logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}
