import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

createChat({
  webhookUrl: 'https://rushikesh-kadukar.app.n8n.cloud/webhook/625e6932-fbfc-49d3-ae6c-e6361dd6fabc/chat',
  target: '#n8n-chat',
});

// ─── AUTH MODAL ───
const overlay  = document.getElementById('authOverlay');
const closeBtn = document.getElementById('authClose');
const tabs     = document.querySelectorAll('.auth-tab');
const panels   = document.querySelectorAll('.auth-panel');

function openModal(tab = 'login') {
  switchTab(tab);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function switchTab(tab) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  panels.forEach(p => p.classList.toggle('active',
    p.id === 'panel' + tab.charAt(0).toUpperCase() + tab.slice(1)));
}

document.getElementById('openLogin').addEventListener('click', e => { e.preventDefault(); openModal('login'); });
document.getElementById('openSignup').addEventListener('click', e => { e.preventDefault(); openModal('signup'); });

tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));

document.querySelectorAll('[data-switch]').forEach(link => {
  link.addEventListener('click', e => { e.preventDefault(); switchTab(link.dataset.switch); });
});

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.querySelectorAll('.toggle-pass').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    input.type = input.type === 'password' ? 'text' : 'password';
  });
});

const signupPass = document.getElementById('signupPass');
const passBar    = document.getElementById('passBar');
if (signupPass && passBar) {
  signupPass.addEventListener('input', () => {
    const val = signupPass.value;
    let score = 0;
    if (val.length >= 8)           score++;
    if (/[A-Z]/.test(val))         score++;
    if (/[0-9]/.test(val))         score++;
    if (/[^A-Za-z0-9]/.test(val))  score++;
    const colors = ['#fc5c7d','#fc5c7d','#f59e0b','#5cf4c8','#5cf4c8'];
    passBar.style.width      = (score / 4 * 100) + '%';
    passBar.style.background = colors[score];
  });
}