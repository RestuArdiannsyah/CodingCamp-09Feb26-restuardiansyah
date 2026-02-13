document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('userName') || 'Harfi';
    document.getElementById('userName').textContent = userName;
    
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    document.getElementById('contactForm').addEventListener('submit', handleFormSubmit);
});

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('currentTime').textContent = timeString;
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const message = document.getElementById('message').value.trim();
    
    if (!validateForm(name, email, phone, message)) {
        return;
    }
    
    displayOutput(name, email, phone, gender, message);
    document.getElementById('contactForm').reset();
    localStorage.setItem('userName', name);
    document.getElementById('userName').textContent = name;
}

function validateForm(name, email, phone, message) {
    if (name.length < 3) {
        alert('Nama minimal 3 karakter');
        return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Email tidak valid');
        return false;
    }
    
    if (!/^\d{10,15}$/.test(phone)) {
        alert('Telepon harus 10-15 digit');
        return false;
    }
    
    if (message.length < 5) {
        alert('Pesan minimal 5 karakter');
        return false;
    }
    
    return true;
}

function displayOutput(name, email, phone, gender, message) {
    const outputContent = document.getElementById('outputContent');
    const now = new Date();
    const timeString = now.toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    outputContent.innerHTML = `
        <p><strong>Nama:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telepon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Kategori:</strong> ${escapeHtml(gender)}</p>
        <p><strong>Pesan:</strong> ${escapeHtml(message)}</p>
        <p><strong>Waktu:</strong> ${timeString}</p>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}