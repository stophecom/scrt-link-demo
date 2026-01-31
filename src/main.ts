import { scrtLink, SecretType } from '@scrt-link/client'
import './index.css'

const API_KEY = '<your-api-key>';
const client = scrtLink(API_KEY);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="hero">
    <svg class="scrt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
    <h1>scrt.link demo</h1>
    <p>The essence of secure communication.</p>
    
    <div class="card">
      <textarea id="secret-input" placeholder="Type your secret here..."></textarea>
      <button id="submit-btn">Create Secret</button>
      <div id="result"></div>
    </div>
  </div>
`

const textarea = document.querySelector<HTMLTextAreaElement>('#secret-input')!;
const button = document.querySelector<HTMLButtonElement>('#submit-btn')!;
const resultDiv = document.querySelector<HTMLDivElement>('#result')!;

button.addEventListener('click', async () => {
  const secret = textarea.value.trim();
  if (!secret) return;

  button.disabled = true;
  button.textContent = 'Creating...';
  resultDiv.className = '';
  resultDiv.textContent = '';

  try {
    const response = await client.createSecret(secret, {
      secretType: SecretType.TEXT
    });

    if (response.secretLink) {
      resultDiv.className = 'visible';
      resultDiv.innerHTML = `<strong>Link created:</strong><br><a href="${response.secretLink}" target="_blank">${response.secretLink}</a>`;
    } else {
      throw new Error(response.message || 'Failed to create secret');
    }
  } catch (error: any) {
    resultDiv.className = 'visible error';
    resultDiv.textContent = `Error: ${error.message}`;
  } finally {
    button.disabled = false;
    button.textContent = 'Create Secret';
  }
});
