const ROSBEAUTY_CONFIG = {
    whatsappNumber: "390000000000",
    instagramUrl: "https://www.instagram.com/rosbeauty_04/"
};

function buildWhatsAppUrl(message) {
    const cleanNumber = ROSBEAUTY_CONFIG.whatsappNumber.replace(/\D/g, "");
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

function setupQuickLinks() {
    document.querySelectorAll('[data-whatsapp-link]').forEach((link) => {
        link.href = buildWhatsAppUrl('Ciao ROSBEAUTY, vorrei ricevere informazioni su un trattamento.');
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });

    document.querySelectorAll('[data-instagram-link]').forEach((link) => {
        link.href = ROSBEAUTY_CONFIG.instagramUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
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

        const text = [
            'Ciao ROSBEAUTY, vorrei ricevere informazioni.',
            '',
            `Nome: ${nome || '-'}`,
            `Telefono: ${telefono || '-'}`,
            `Email: ${email || '-'}`,
            `Servizio interessato: ${servizio || '-'}`,
            `Messaggio: ${messaggio || '-'}`
        ].join('\n');

        window.open(buildWhatsAppUrl(text), '_blank');
    });
}

function addFloatingWhatsApp() {
    const button = document.createElement('a');
    button.className = 'floating-whatsapp';
    button.href = buildWhatsAppUrl('Ciao ROSBEAUTY, vorrei ricevere informazioni su un trattamento.');
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.setAttribute('aria-label', 'Apri WhatsApp');
    button.textContent = 'WhatsApp';
    document.body.appendChild(button);
}

window.addEventListener('DOMContentLoaded', () => {
    setupQuickLinks();
    setupContactForm();
    addFloatingWhatsApp();
});
