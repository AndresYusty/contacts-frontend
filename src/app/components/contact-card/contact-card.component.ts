import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  @Input() contact!: Contact;
  @Output() edit = new EventEmitter<Contact>();
  @Output() delete = new EventEmitter<number>();

  onEdit(): void {
    this.edit.emit(this.contact);
  }

  onDelete(): void {
    this.delete.emit(this.contact.id);
  }

  getInitials(): string {
    const firstName = this.contact.first_name.charAt(0).toUpperCase();
    const lastName = this.contact.last_name.charAt(0).toUpperCase();
    return firstName + lastName;
  }

  getFullName(): string {
    return `${this.contact.first_name} ${this.contact.last_name}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
} 