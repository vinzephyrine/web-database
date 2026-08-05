const JSONBIN_API_KEY = '$2a$10$w9Gti59xxctTJI7c902WMO9IpfJG1.BMap.9Iou2VTUp7qZGIwKnG';
const NUMBERS_BIN_ID = '6a69b588f5f4af5e29d04e31';
const USERS_BIN_ID = '6a69b5bef5f4af5e29d04ebe';
const TOKENS_BIN_ID = '6a6b809af5f4af5e29d693c8';

async function apiRequest(binId, method, data = null) {
  const options = {
    method,
    headers: {
      'X-Master-Key': JSONBIN_API_KEY,
      'Content-Type': 'application/json'
    }
  };
  if (data) options.body = JSON.stringify(data);

  const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, options);
  if (!response.ok) throw new Error(`Request gagal (${response.status})`);
  return response.json();
}

async function getNumbers() {
  const data = await apiRequest(NUMBERS_BIN_ID, 'GET');
  return data.record || [];
}

async function saveNumbers(numbers) {
  return apiRequest(NUMBERS_BIN_ID, 'PUT', numbers);
}

async function addNumberEntry(number) {
  const numbers = await getNumbers();
  const cleanNumber = number.replace(/\D/g, '');

  const existing = numbers.find(n => n.number === number || n.number === cleanNumber);
  if (existing) throw new Error('DUPLICATE');

  numbers.push({
    number: cleanNumber,
    isActive: true,
    createdAt: new Date().toISOString()
  });

  await saveNumbers(numbers);
}

async function findNumberEntry(number) {
  const numbers = await getNumbers();
  const cleanNumber = number.replace(/\D/g, '');
  return numbers.find(n => n.number === number || n.number === cleanNumber);
}

async function deleteNumberEntry(number) {
  const numbers = await getNumbers();
  const cleanNumber = number.replace(/\D/g, '');
  const filtered = numbers.filter(n => n.number !== number && n.number !== cleanNumber);
  await saveNumbers(filtered);
}

async function getUsers() {
  const data = await apiRequest(USERS_BIN_ID, 'GET');
  return data.record || [];
}

async function saveUsers(users) {
  return apiRequest(USERS_BIN_ID, 'PUT', users);
}

async function findUser(username, password) {
  const users = await getUsers();
  return users.find(u => u.username === username && u.password === password);
}

async function addUserEntry(username, password, role) {
  const users = await getUsers();

  const existing = users.find(u => u.username === username);
  if (existing) throw new Error('DUPLICATE');

  users.push({
    username,
    password,
    role: role || 'user',
    isActive: true,
    createdAt: new Date().toISOString()
  });

  await saveUsers(users);
}

async function deleteUserEntry(username) {
  const users = await getUsers();
  const filtered = users.filter(u => u.username !== username);
  if (filtered.length === users.length) throw new Error('USER_NOT_FOUND');
  await saveUsers(filtered);
}

async function getTokens() {
  const data = await apiRequest(TOKENS_BIN_ID, 'GET');
  return data.record || [];
}

async function saveTokens(tokens) {
  return apiRequest(TOKENS_BIN_ID, 'PUT', tokens);
}

async function addTokenEntry(token) {
  const tokens = await getTokens();

  const existing = tokens.find(t => t.token === token);
  if (existing) throw new Error('DUPLICATE');

  tokens.push({
    token,
    isActive: true,
    createdAt: new Date().toISOString()
  });

  await saveTokens(tokens);
}

async function deleteTokenEntry(token) {
  const tokens = await getTokens();
  const filtered = tokens.filter(t => t.token !== token);
  if (filtered.length === tokens.length) throw new Error('TOKEN_NOT_FOUND');
  await saveTokens(filtered);
}

async function toggleTokenStatus(token) {
  const tokens = await getTokens();
  const target = tokens.find(t => t.token === token);
  if (!target) throw new Error('TOKEN_NOT_FOUND');
  target.isActive = !target.isActive;
  await saveTokens(tokens);
}
