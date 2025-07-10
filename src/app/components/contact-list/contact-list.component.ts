import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  loading = false;
  error = '';
  showForm = false;
  editingContact: Contact | null = null;
  searchTerm = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true;
    this.error = '';
    
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los contactos';
        this.loading = false;
        console.error('Error loading contacts:', error);
      }
    });
  }



  addNewContact(): void {
    this.editingContact = null;
    this.showForm = true;
  }

  editContact(contact: Contact): void {
    this.editingContact = { ...contact };
    this.showForm = true;
  }

  deleteContact(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
      this.contactService.deleteContact(id).subscribe({
        next: () => {
          this.contacts = this.contacts.filter(c => c.id !== id);
        },
        error: (error) => {
          this.error = 'Error al eliminar el contacto';
          console.error('Error deleting contact:', error);
        }
      });
    }
  }

  onContactSaved(contact: Contact): void {
    if (this.editingContact) {
      // Update existing contact
      const index = this.contacts.findIndex(c => c.id === contact.id);
      if (index !== -1) {
        this.contacts[index] = contact;
      }
    } else {
      // Add new contact
      this.contacts.push(contact);
    }
    this.showForm = false;
    this.editingContact = null;
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.editingContact = null;
  }

  get filteredContacts(): Contact[] {
    if (!this.searchTerm.trim()) {
      return this.contacts;
    }
    
    const term = this.searchTerm.toLowerCase();
    return this.contacts.filter(contact => 
      contact.first_name.toLowerCase().includes(term) ||
      contact.last_name.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      (contact.phones && contact.phones.some(phone => 
        phone.toLowerCase().includes(term)
      ))
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
  }
} 