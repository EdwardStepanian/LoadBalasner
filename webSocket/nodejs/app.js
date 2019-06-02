const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messageList = [];

const ws = new WebSocket('ws://localhost:3000');

const setStatus = value => status.innerHTML = value;

const printMessage = value => {
  const li = document.createElement('li');

  li.innerHTML = value;
  messages.appendChild(li);
};

JSON.parse(localStorage.getItem('messageList')).forEach(message => printMessage(message));

form.addEventListener('submit', event => {
  event.preventDefault();

  ws.send(input.value);

  input.value = '';
});

ws.onopen = () => setStatus('ONLINE');
ws.onclose = () => setStatus('DISCONNECTED');
ws.onmessage = response => {
  printMessage(response.data);
  console.log('response =>', response);
  messageList.push(response.data);
  localStorage.setItem('messageList', JSON.stringify(messageList));
};