class Menu {
    constructor(config = { overlay: true, blur: false }) {
        this.activeId;
        this.activeElement;
        this.overlayElement;
        if (config.overlay) {
            this.overlayElement = document.createElement('div');
            this.overlayElement.classList.add('menu_overlay');
            document.querySelector('body').appendChild(this.overlayElement);
        }
        if (config.blur) {
            const mainContent = document.querySelector('.menu_main_content');
            if (mainContent) {
                mainContent.classList.add('menu_blur');
            }
        }
        this.bindEvents();
    }

    emitOpening() {
        const event = new CustomEvent('menu_opening', { bubbles: true, detail: { element: this.activeElement, id: this.activeId } });
        this.activeElement.dispatchEvent(event);
    }

    emitClosing() {
        const event = new CustomEvent('menu_closing', { bubbles: true, detail: { element: this.activeElement, id: this.activeId } });
        this.activeElement.dispatchEvent(event);
    }

    handleOpenEvent(e) {
        e.preventDefault();
        const menuId = e.currentTarget.getAttribute('data-menu-target');
        this.open(menuId);
    }

    handleCloseEvent(e) {
        e.preventDefault();
        this.close();
    }

    handleKeyEvent(e) {
        if (e.keyCode === 27) this.close();
    }

    bindEvents() {
        const triggers = document.querySelectorAll('[data-menu-target]');
        const closers = document.querySelectorAll('[data-menu-close]');
        triggers.forEach(trigger => trigger.addEventListener('click', e => this.handleOpenEvent(e), false));
        closers.forEach(closer => closer.addEventListener('click', e => this.handleCloseEvent(e), false));
        if (this.overlayElement) {
            this.overlayElement.addEventListener('click', e => this.handleCloseEvent(e), false);
        }
        document.addEventListener('keyup', e => this.handleKeyEvent(e));
    }

    open(menuId) {
        if (this.activeId === String(menuId) || !menuId) return;
        if (this.activeId && this.activeId !== String(menuId)) this.close();
        this.activeId = menuId
        this.activeElement = document.querySelector(`[data-menu-id="${this.activeId}"]`)
        if (!this.activeElement) return;
        this.emitOpening();
        this.activeElement.classList.add('opened');
        const pageRootElement = document.querySelector('html')
        pageRootElement.classList.add('menu_locked');
        pageRootElement.setAttribute('menu', menuId)
    }

    close() {
        if (!this.activeId) return;
        this.emitClosing();
        this.activeElement.classList.remove('opened');
        const pageRootElement = document.querySelector('html')
        pageRootElement.classList.remove('menu_locked');
        pageRootElement.removeAttribute('menu')
        this.activeId = null;
        this.activeElement = null;
    }
}



/*Modo Nocturno  o Luminoso*/

const btnModo = document.querySelector("#Modo");

btnModo.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

const btnModo2 = document.querySelector("#Modo2");

btnModo2.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});