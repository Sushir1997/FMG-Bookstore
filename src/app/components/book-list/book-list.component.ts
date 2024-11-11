import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  selectedBooks: Set<number> = new Set();

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books = books;
    });
  }

//   toggleSelection(bookId: number | undefined): void {
//     if (this.selectedBooks.has(bookId)) {
//       this.selectedBooks.delete(bookId);
//     } else {
//       this.selectedBooks.add(bookId);
//     }
//   }
toggleSelection(bookId: number | undefined): void {
    if (bookId !== undefined) {
      if (this.selectedBooks.has(bookId)) {
        this.selectedBooks.delete(bookId);
      } else {
        this.selectedBooks.add(bookId);
      }
    }
  }
  // Method to toggle select/deselect all books
  toggleAllSelection(event: any): void {
    if (event.target.checked) {
      // Select all books
      this.books.forEach(book => {
        if (book.bookId !== undefined) {
          this.selectedBooks.add(book.bookId);
        }
      });
    } else {
      // Deselect all books
      this.selectedBooks.clear();
    }
  }

  purchaseSelectedBooks(): void {
    this.selectedBooks.forEach((bookId) => {
      this.bookService.purchaseBook(bookId).subscribe(() => {
        this.fetchBooks();
      });
    });
    this.selectedBooks.clear();
  }

//   viewDetails(bookId: number): void {
//     this.router.navigate([`/book/${bookId}`]);
//   }
viewDetails(bookId: number | undefined): void {
    if (bookId !== undefined) {
      this.router.navigate([`/book/${bookId}`]);
    }
  }
}
