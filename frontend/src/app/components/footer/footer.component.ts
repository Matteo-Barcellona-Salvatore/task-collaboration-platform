import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { icon: '💼', name: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: '🐙', name: 'GitHub', url: 'https://github.com' },
    { icon: '🐦', name: 'Twitter', url: 'https://twitter.com' },
    { icon: '📧', name: 'Email', url: 'mailto:contact@taskcollab.com' }
  ];

  footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', url: '#' },
        { name: 'Pricing', url: '#' },
        { name: 'Security', url: '#' },
        { name: 'Roadmap', url: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', url: '#' },
        { name: 'Careers', url: '#' },
        { name: 'Blog', url: '#' },
        { name: 'Press Kit', url: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', url: '#' },
        { name: 'API Reference', url: '#' },
        { name: 'Community', url: '#' },
        { name: 'Support', url: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', url: '#' },
        { name: 'Terms of Service', url: '#' },
        { name: 'Cookie Policy', url: '#' },
        { name: 'GDPR', url: '#' }
      ]
    }
  ];
}