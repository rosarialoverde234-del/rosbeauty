
const ROSBEAUTY_CONFIG = {
    whatsappNumber: "390000000000",
    instagramUrl: "https://www.instagram.com/rosbeauty_04/"
};

function buildWhatsAppUrl(message) {
    const cleanNumber = ROSBEAUTY_CONFIG.whatsappNumber.replace(/\D/g, "");
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message) {
    window.open(buildWhatsAppUrl(message), "_blank");
}

function setupQuickLinks() {
    document.querySelectorAll('[data-whatsapp-link]').forEach((link) => {
        link.setAttribute('href', buildWhatsAppUrl('Ciao ROSBEAUTY, vorrei ricevere informazioni.'));
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    document.querySelectorAll('[data-instagram-link]').forEach((link) => {
        link.setAttribute('href', ROSBEAUTY_CONFIG.instagramUrl);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

function setupBookingForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = form.querySelector('[name="nome"]').value.trim();
        const telefono = form.querySelector('[name="telefono"]').value.trim();
        const servizio = form.querySelector('[name="servizio"]').value.trim();
        const giorno = form.querySelector('[name="giorno"]').value.trim();
        const orario = form.querySelector('[name="orario"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const note = form.querySelector('[name="note"]').value.trim();

        const message = [
            'Ciao ROSBEAUTY, vorrei prenotare un appuntamento.',
            '',
            `Nome: ${nome || '-'}`,
            `Telefono: ${telefono || '-'}`,
            `Servizio: ${servizio || '-'}`,
            `Data desiderata: ${giorno || '-'}`,
            `Orario desiderato: ${orario || '-'}`,
            `Email: ${email || '-'}`,
            `Note: ${note || '-'}`
        ].join('\n');

        openWhatsApp(message);
    });
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = form.querySelector('[name="nome"]').value.trim();
        const telefono = form.querySelector('[name="telefono"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const servizio = form.querySelector('[name="servizio"]').value.trim();
        const messaggio = form.querySelector('[name="messaggio"]').value.trim();

        const message = [
            'Ciao ROSBEAUTY, vorrei ricevere informazioni.',
            '',
            `Nome: ${nome || '-'}`,
            `Telefono: ${telefono || '-'}`,
            `Email: ${email || '-'}`,
            `Servizio interessato: ${servizio || '-'}`,
            `Messaggio: ${messaggio || '-'}`
        ].join('\n');

        openWhatsApp(message);
    });
}

function setupSlotPills() {
    document.querySelectorAll('.slot-pill:not(.full)').forEach((pill) => {
        pill.addEventListener('click', () => {
            const card = pill.closest('.slot-card');
            const day = card ? card.querySelector('h3')?.textContent.trim() : '';
            const time = pill.textContent.trim();
            const bookingDate = document.querySelector('#bookingForm [name="giorno"]');
            const bookingTime = document.querySelector('#bookingForm [name="orario"]');

            if (bookingTime) bookingTime.value = time;
            if (bookingDate) bookingDate.focus();

            const message = [
                'Ciao ROSBEAUTY, vorrei chiedere questo posto libero.',
                '',
                `Giorno indicato sul sito: ${day || '-'}`,
                `Orario: ${time || '-'}`
            ].join('\n');

            openWhatsApp(message);
        });
    });
}

function addFloatingWhatsApp() {
    const button = document.createElement('a');
    button.className = 'floating-whatsapp';
    button.href = buildWhatsAppUrl('Ciao ROSBEAUTY, vorrei ricevere informazioni.');
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.setAttribute('aria-label', 'Apri WhatsApp');
    button.textContent = 'WhatsApp';
    document.body.appendChild(button);
}

window.addEventListener('DOMContentLoaded', () => {
    setupQuickLinks();
    setupBookingForm();
    setupContactForm();
    setupSlotPills();
    addFloatingWhatsApp();
});
