let state = {
  decks: [],
  cards: {},
  activeDeckId: null,
  activeCardIndex: 0,
  isFlipped: false
};

const els = {
  deckList: document.getElementById('deck-list'),
  deckTitle: document.getElementById('deck-title'),
  cardFront: document.getElementById('card-front'),
  cardBack: document.getElementById('card-back'),
  flashcard: document.getElementById('flashcard'),
  cardContainer: document.getElementById('card-container'),
  status: document.getElementById('status'),
  
  btnNewDeck: document.getElementById('btn-new-deck'),
  btnEditDeck: document.getElementById('btn-edit-deck'),
  btnDelDeck: document.getElementById('btn-del-deck'),
  
  btnNewCard: document.getElementById('btn-new-card'),
  btnEditCard: document.getElementById('btn-edit-card'),
  btnDelCard: document.getElementById('btn-del-card'),
  
  btnPrev: document.getElementById('btn-prev'),
  btnFlip: document.getElementById('btn-flip'),
  btnNext: document.getElementById('btn-next'),

  modalDeck: document.getElementById('modal-deck'),
  inputDeckName: document.getElementById('input-deck-name'),
  btnSaveDeck: document.getElementById('btn-save-deck'),
  
  modalCard: document.getElementById('modal-card'),
  inputCardFront: document.getElementById('input-card-front'),
  inputCardBack: document.getElementById('input-card-back'),
  btnSaveCard: document.getElementById('btn-save-card'),
  
  btnCancels: document.querySelectorAll('.btn-cancel')
};

let editingDeck = false;
let editingCardId = null;

const genId = () => Math.random().toString(36).substr(2, 9);
const getActiveDeck = () => state.decks.find(d => d.id === state.activeDeckId);
const getCards = () => state.cards[state.activeDeckId] || [];
const getActiveCard = () => getCards()[state.activeCardIndex];

function render() {
  els.deckList.innerHTML = '';
  state.decks.forEach(deck => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = deck.name;
    if (deck.id === state.activeDeckId) btn.classList.add('active');
    btn.onclick = () => {
      state.activeDeckId = deck.id;
      state.activeCardIndex = 0;
      state.isFlipped = false;
      render();
    };
    li.appendChild(btn);
    els.deckList.appendChild(li);
  });

  const activeDeck = getActiveDeck();
  const cards = getCards();
  const activeCard = getActiveCard();

  els.deckTitle.textContent = activeDeck ? activeDeck.name : 'No Decks';
  els.btnEditDeck.disabled = els.btnDelDeck.disabled = els.btnNewCard.disabled = !activeDeck;

  els.btnEditCard.disabled = els.btnDelCard.disabled = !activeCard;
  els.flashcard.classList.toggle('flipped', state.isFlipped);

  if (!activeDeck) {
    els.cardFront.textContent = 'Create a deck';
    els.cardBack.textContent = '';
    els.status.textContent = '0 / 0';
  } else if (!activeCard) {
    els.cardFront.textContent = 'Add a card';
    els.cardBack.textContent = '';
    els.status.textContent = '0 / 0';
  } else {
    els.cardFront.textContent = activeCard.front;
    els.cardBack.textContent = activeCard.back;
    els.status.textContent = `${state.activeCardIndex + 1} / ${cards.length}`;
  }
}

function flip() { state.isFlipped = !state.isFlipped; render(); }
function prev() {
  const cards = getCards();
  if (!cards.length) return;
  state.activeCardIndex = (state.activeCardIndex - 1 + cards.length) % cards.length;
  state.isFlipped = false;
  render();
}
function next() {
  const cards = getCards();
  if (!cards.length) return;
  state.activeCardIndex = (state.activeCardIndex + 1) % cards.length;
  state.isFlipped = false;
  render();
}

function closeModal() {
  els.modalDeck.classList.remove('show');
  els.modalCard.classList.remove('show');
  els.inputDeckName.value = '';
  els.inputCardFront.value = '';
  els.inputCardBack.value = '';
}

els.btnCancels.forEach(btn => btn.onclick = closeModal);

els.btnNewDeck.onclick = () => { editingDeck = false; els.modalDeck.classList.add('show'); els.inputDeckName.focus(); };
els.btnEditDeck.onclick = () => {
  editingDeck = true;
  els.inputDeckName.value = getActiveDeck().name;
  els.modalDeck.classList.add('show');
  els.inputDeckName.focus();
};
els.btnDelDeck.onclick = () => {
  if(!confirm('Delete this deck?')) return;
  state.decks = state.decks.filter(d => d.id !== state.activeDeckId);
  delete state.cards[state.activeDeckId];
  state.activeDeckId = state.decks.length ? state.decks[0].id : null;
  state.activeCardIndex = 0;
  render();
};
els.btnSaveDeck.onclick = () => {
  const name = els.inputDeckName.value.trim();
  if (!name) return;
  if (editingDeck) {
    getActiveDeck().name = name;
  } else {
    const id = genId();
    state.decks.push({ id, name });
    state.cards[id] = [];
    state.activeDeckId = id;
  }
  closeModal();
  render();
};

els.btnNewCard.onclick = () => { editingCardId = null; els.modalCard.classList.add('show'); els.inputCardFront.focus(); };
els.btnEditCard.onclick = () => {
  editingCardId = getActiveCard().id;
  els.inputCardFront.value = getActiveCard().front;
  els.inputCardBack.value = getActiveCard().back;
  els.modalCard.classList.add('show');
  els.inputCardFront.focus();
};
els.btnDelCard.onclick = () => {
  if(!confirm('Delete this card?')) return;
  const cards = getCards();
  state.cards[state.activeDeckId] = cards.filter(c => c.id !== getActiveCard().id);
  state.activeCardIndex = Math.max(0, state.activeCardIndex - 1);
  state.isFlipped = false;
  render();
};
els.btnSaveCard.onclick = () => {
  const front = els.inputCardFront.value.trim();
  const back = els.inputCardBack.value.trim();
  if (!front || !back) return;
  
  const cards = getCards();
  if (editingCardId) {
    const card = cards.find(c => c.id === editingCardId);
    card.front = front;
    card.back = back;
  } else {
    cards.push({ id: genId(), front, back });
    state.activeCardIndex = cards.length - 1;
  }
  state.isFlipped = false;
  closeModal();
  render();
};

els.btnPrev.onclick = prev;
els.btnNext.onclick = next;
els.btnFlip.onclick = flip;
els.cardContainer.onclick = flip;

render();