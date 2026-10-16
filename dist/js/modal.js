/**
 * Samtagon Studio - Clean Modal Controller
 * Elegant, Light Mode Game Terminal & Screenshot Lightbox
 */
export class ModalController {
    overlay = null;
    contentContainer = null;
    closeBtn = null;
    constructor() {
        this.overlay = document.getElementById('global-modal');
        this.contentContainer = document.getElementById('modal-inner-content');
        this.closeBtn = document.getElementById('modal-close');
        this.bindEvents();
    }
    bindEvents() {
        if (!this.overlay || !this.closeBtn)
            return;
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    }
    isOpen() {
        return this.overlay ? this.overlay.classList.contains('active') : false;
    }
    openImage(imgSrc, captionText = '') {
        if (!this.overlay || !this.contentContainer)
            return;
        this.contentContainer.innerHTML = `
      <div style="padding: 24px; text-align: center; background: #FFFFFF;">
        <img src="${imgSrc}" alt="${captionText}" style="max-height: 70vh; width: auto; max-width: 100%; margin: 0 auto; border-radius: 12px; border: 1.5px solid #E2E8F0; display: block; box-shadow: 0 10px 30px rgba(0,0,0,0.08);" />
        ${captionText ? `<p style="margin-top: 14px; font-family: var(--font-mono); font-size: 0.88rem; color: #059669; font-weight: 700;">${captionText}</p>` : ''}
      </div>
    `;
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    openGameModal(game) {
        if (!this.overlay || !this.contentContainer)
            return;
        const highlightsList = game.techHighlights
            .map((h) => `<li style="margin-bottom: 6px; display: flex; align-items: center; gap: 8px;"><span style="color: #059669; font-size: 1.1rem;">&bull;</span> ${h}</li>`)
            .join('');
        this.contentContainer.innerHTML = `
      <div style="background: #FFFFFF; border-radius: 18px; overflow: hidden; display: flex; flex-direction: column;">
        <div style="position: relative; max-height: 300px; overflow: hidden; background: #F1F5F9; border-bottom: 1px solid #E2E8F0;">
          <img src="${game.screenshot}" alt="${game.title}" style="width: 100%; height: 260px; object-fit: cover; display: block;" />
          <div style="position: absolute; top: 12px; left: 12px; display: flex; gap: 8px;">
            <span class="badge ${game.genre === 'Simulation' ? 'badge-emerald' : 'badge-indigo'}">${game.genre}</span>
            <span class="badge badge-green">${game.engine}</span>
          </div>
        </div>
        <div style="padding: 28px;">
          <h2 style="font-size: 1.6rem; font-weight: 800; color: #0F172A; margin-bottom: 8px; letter-spacing: -0.02em;">${game.title}</h2>
          <p style="font-size: 1rem; color: #334155; line-height: 1.65; margin-bottom: 20px;">${game.description}</p>
          
          <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-bottom: 20px; font-family: var(--font-mono); font-size: 0.84rem;">
            <span style="color: #059669; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">🎮 Controls &amp; Inputs</span>
            <span style="color: #0F172A; font-weight: 600;">${game.controls}</span>
          </div>

          <div style="margin-bottom: 24px;">
            <span style="font-family: var(--font-mono); font-size: 0.78rem; color: #64748B; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 10px;">⚙ Technical Specifications</span>
            <ul style="list-style: none; padding: 0; margin: 0; font-family: var(--font-mono); font-size: 0.84rem; color: #334155;">
              ${highlightsList}
            </ul>
          </div>

          <div style="display: flex; gap: 12px; align-items: center; border-top: 1px solid #E2E8F0; padding-top: 20px; flex-wrap: wrap;">
            <a href="${game.itchUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1; min-width: 180px;">
              Launch on itch.io &nearr;
            </a>
            ${game.githubUrl ? `
              <a href="${game.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                View Source Code &nearr;
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `;
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    close() {
        if (!this.overlay)
            return;
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}
//# sourceMappingURL=modal.js.map