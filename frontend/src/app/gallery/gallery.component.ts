import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface GalleryItem {
  id: number;
  icon: string;
  title: string;
  category: string;
  color: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a routerLink="/">Home</a> / Gallery</div>
        <h1>Our Gallery</h1>
        <p>A glimpse into life at Anushka Infosys — labs, events, and celebrations</p>
      </div>
    </section>

    <section class="gallery-section">
      <div class="container">
        <div class="filter-tabs">
          <button *ngFor="let cat of categories"
                  [class.active]="activeCategory() === cat"
                  (click)="setCategory(cat)">{{ cat }}</button>
        </div>

        <div class="gallery-grid">
          <div class="gallery-item" *ngFor="let item of filteredItems()" (click)="openModal(item)">
            <div class="gallery-placeholder" [style.background]="item.color">
              <div class="gallery-icon">{{ item.icon }}</div>
            </div>
            <div class="item-overlay">
              <div class="item-title">{{ item.title }}</div>
              <div class="item-category">{{ item.category }}</div>
              <div class="view-btn">🔍 View</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div class="modal-overlay" *ngIf="selectedItem()" (click)="closeModal()">
      <div class="modal" (click)="$event.stopPropagation()">
        <button class="modal-close" (click)="closeModal()">✕</button>
        <div class="modal-image" [style.background]="selectedItem()!.color">
          <div class="modal-icon">{{ selectedItem()!.icon }}</div>
        </div>
        <div class="modal-info">
          <h3>{{ selectedItem()!.title }}</h3>
          <span class="modal-category">{{ selectedItem()!.category }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-hero { background: linear-gradient(135deg, #0a2463, #1565c0); padding: 120px 0 60px; text-align: center; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .breadcrumb { color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 16px; }
    .breadcrumb a { color: #90caf9; text-decoration: none; }
    .page-hero h1 { color: white; font-size: 44px; font-weight: 800; margin-bottom: 12px; }
    .page-hero p { color: rgba(255,255,255,0.75); font-size: 18px; }
    .gallery-section { padding: 80px 0; background: #f8fbff; }
    .filter-tabs { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }
    .filter-tabs button { padding: 10px 24px; border-radius: 24px; border: 2px solid #e3f2fd; background: white; color: #607d8b; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .filter-tabs button.active, .filter-tabs button:hover { background: #1e88e5; color: white; border-color: #1e88e5; }
    .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .gallery-item { border-radius: 16px; overflow: hidden; position: relative; cursor: pointer; aspect-ratio: 4/3; box-shadow: 0 4px 16px rgba(0,0,0,0.08); transition: transform 0.3s; }
    .gallery-item:hover { transform: scale(1.02); }
    .gallery-item:hover .item-overlay { opacity: 1; }
    .gallery-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
    .gallery-icon { font-size: 64px; }
    .item-overlay { position: absolute; inset: 0; background: rgba(10, 36, 99, 0.85); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; opacity: 0; transition: opacity 0.3s; }
    .item-title { color: white; font-size: 16px; font-weight: 700; }
    .item-category { color: #90caf9; font-size: 13px; }
    .view-btn { background: rgba(30,136,229,0.3); border: 1px solid rgba(30,136,229,0.5); color: white; padding: 8px 20px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-top: 8px; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; animation: fadeIn 0.2s; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .modal { background: white; border-radius: 20px; overflow: hidden; max-width: 600px; width: 100%; position: relative; animation: slideUp 0.3s; }
    @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .modal-close { position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.5); border: none; color: white; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 16px; z-index: 1; }
    .modal-image { height: 300px; display: flex; align-items: center; justify-content: center; }
    .modal-icon { font-size: 100px; }
    .modal-info { padding: 24px; }
    .modal-info h3 { color: #0d2461; font-size: 20px; font-weight: 700; margin-bottom: 8px; }
    .modal-category { background: #e3f2fd; color: #1565c0; padding: 4px 14px; border-radius: 12px; font-size: 13px; font-weight: 600; }
    @media (max-width: 768px) { .gallery-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 500px) { .gallery-grid { grid-template-columns: 1fr; } }
  `]
})
export class GalleryComponent {
  categories = ['All', 'Computer Lab', 'Events', 'Classrooms', 'Placements', 'Students'];
  activeCategory = signal('All');
  selectedItem = signal<GalleryItem | null>(null);

  allItems: GalleryItem[] = [
    { id: 1, icon: '🖥️', title: 'Main Computer Lab', category: 'Computer Lab', color: 'linear-gradient(135deg, #0a2463, #1565c0)' },
    { id: 2, icon: '💻', title: 'Advanced Lab Setup', category: 'Computer Lab', color: 'linear-gradient(135deg, #1565c0, #1e88e5)' },
    { id: 3, icon: '🎓', title: 'Annual Graduation Ceremony', category: 'Events', color: 'linear-gradient(135deg, #7c4dff, #3d5afe)' },
    { id: 4, icon: '🏆', title: 'Award Ceremony 2024', category: 'Events', color: 'linear-gradient(135deg, #f57c00, #ef6c00)' },
    { id: 5, icon: '📽️', title: 'Smart Classroom', category: 'Classrooms', color: 'linear-gradient(135deg, #00bcd4, #0097a7)' },
    { id: 6, icon: '📚', title: 'Library & Study Area', category: 'Classrooms', color: 'linear-gradient(135deg, #43a047, #2e7d32)' },
    { id: 7, icon: '💼', title: 'Placement Drive 2024', category: 'Placements', color: 'linear-gradient(135deg, #e91e63, #c2185b)' },
    { id: 8, icon: '🤝', title: 'Industry Visit TCS', category: 'Placements', color: 'linear-gradient(135deg, #0a2463, #283593)' },
    { id: 9, icon: '👩‍💻', title: 'Students in Lab', category: 'Students', color: 'linear-gradient(135deg, #1e88e5, #0d47a1)' },
    { id: 10, icon: '🎉', title: 'Farewell Party 2024', category: 'Students', color: 'linear-gradient(135deg, #ab47bc, #7b1fa2)' },
    { id: 11, icon: '🔧', title: 'Hardware Lab', category: 'Computer Lab', color: 'linear-gradient(135deg, #455a64, #263238)' },
    { id: 12, icon: '🌟', title: 'Best Student Awards', category: 'Events', color: 'linear-gradient(135deg, #ffc107, #f57f17)' }
  ];

  filteredItems() {
    const cat = this.activeCategory();
    return cat === 'All' ? this.allItems : this.allItems.filter(i => i.category === cat);
  }

  setCategory(cat: string) { this.activeCategory.set(cat); }
  openModal(item: GalleryItem) { this.selectedItem.set(item); }
  closeModal() { this.selectedItem.set(null); }
}
