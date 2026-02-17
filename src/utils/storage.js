const ROUNDS_KEY = 'teetime_rounds';
const USER_KEY = 'teetime_user';

export function generateId() {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

export function getRounds() {
  try {
    const data = localStorage.getItem(ROUNDS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveRounds(rounds) {
  localStorage.setItem(ROUNDS_KEY, JSON.stringify(rounds));
}

export function getRound(id) {
  const rounds = getRounds();
  return rounds.find(r => r.id === id) || null;
}

export function createRound(roundData) {
  const rounds = getRounds();
  const newRound = {
    id: generateId(),
    createdAt: new Date().toISOString(),
    guests: [],
    comments: [],
    ...roundData,
  };
  rounds.push(newRound);
  saveRounds(rounds);
  return newRound;
}

export function updateRound(id, updates) {
  const rounds = getRounds();
  const index = rounds.findIndex(r => r.id === id);
  if (index === -1) return null;
  rounds[index] = { ...rounds[index], ...updates };
  saveRounds(rounds);
  return rounds[index];
}

export function deleteRound(id) {
  const rounds = getRounds();
  saveRounds(rounds.filter(r => r.id !== id));
}

export function addGuest(roundId, guest) {
  const round = getRound(roundId);
  if (!round) return null;
  const existingIndex = round.guests.findIndex(g => g.id === guest.id);
  if (existingIndex >= 0) {
    round.guests[existingIndex] = { ...round.guests[existingIndex], ...guest };
  } else {
    round.guests.push({ id: generateId(), joinedAt: new Date().toISOString(), ...guest });
  }
  return updateRound(roundId, { guests: round.guests });
}

export function removeGuest(roundId, guestId) {
  const round = getRound(roundId);
  if (!round) return null;
  round.guests = round.guests.filter(g => g.id !== guestId);
  return updateRound(roundId, { guests: round.guests });
}

export function addComment(roundId, comment) {
  const round = getRound(roundId);
  if (!round) return null;
  round.comments.push({
    id: generateId(),
    createdAt: new Date().toISOString(),
    ...comment,
  });
  return updateRound(roundId, { comments: round.comments });
}

export function getUser() {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
