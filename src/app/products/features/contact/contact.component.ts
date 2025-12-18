import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './contact.component.html',
})
export class ContactComponent {

  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.maxLength(300)]],
  });

  submitted = false;

  constructor(private fb: FormBuilder, private messageService: MessageService) {}

  send() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    // Simulate sending the message
    console.log('Contact message sent:', this.contactForm.value);

    // Show PrimeNG Toast message
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Demande de contact envoyée avec succès' });

    // Reset form
    this.contactForm.reset();
    this.submitted = false;
  }
}
