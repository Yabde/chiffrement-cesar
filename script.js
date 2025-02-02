class CaesarCipher {
  constructor() {
    this.levels = [
      {
        message: "BONJOUR",
        shift: 3,
        hint: "C'est un message simple pour commencer!"
      },
      {
        message: "CRYPTOGRAPHIE",
        shift: 5,
        hint: "Un mot en rapport avec notre activité..."
      },
      {
        message: "FELICITATIONS",
        shift: 7,
        hint: "Le dernier défi!"
      }
    ];
    
    this.currentLevel = 0;
    this.currentShift = 0;
    
    this.initializeElements();
    this.attachEventListeners();
    this.startLevel();
  }

  initializeElements() {
    this.encodedMessageEl = document.getElementById('encodedMessage');
    this.decodedMessageEl = document.getElementById('decodedMessage');
    this.currentShiftEl = document.getElementById('currentShift');
    this.currentLevelEl = document.getElementById('currentLevel');
    this.modal = document.getElementById('successModal');
    this.modalMessage = document.getElementById('modalMessage');
  }

  attachEventListeners() {
    document.getElementById('decreaseShift').addEventListener('click', () => this.updateShift(-1));
    document.getElementById('increaseShift').addEventListener('click', () => this.updateShift(1));
    document.getElementById('checkAnswer').addEventListener('click', () => this.checkAnswer());
    document.getElementById('nextLevel').addEventListener('click', () => this.nextLevel());
  }

  encode(text, shift) {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        const code = char.charCodeAt(0);
        return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
      }
      return char;
    }).join('');
  }

  updateShift(delta) {
    this.currentShift = (this.currentShift + delta + 26) % 26;
    this.currentShiftEl.textContent = this.currentShift;
    this.updateDecodedMessage();
  }

  updateDecodedMessage() {
    const encodedText = this.encodedMessageEl.textContent;
    const decodedText = this.encode(encodedText, -this.currentShift);
    this.decodedMessageEl.textContent = decodedText;
  }

  startLevel() {
    const level = this.levels[this.currentLevel];
    this.currentLevelEl.textContent = this.currentLevel + 1;
    this.currentShift = 0;
    this.currentShiftEl.textContent = '0';
    this.encodedMessageEl.textContent = this.encode(level.message, level.shift);
    this.updateDecodedMessage();
  }

  checkAnswer() {
    const level = this.levels[this.currentLevel];
    const decodedText = this.decodedMessageEl.textContent;
    
    if (decodedText === level.message) {
      this.modalMessage.textContent = level.hint;
      this.modal.classList.add('active');
    }
  }

  nextLevel() {
    this.modal.classList.remove('active');
    if (this.currentLevel < this.levels.length - 1) {
      this.currentLevel++;
      this.startLevel();
    } else {
      this.modalMessage.textContent = "Bravo! Tu as terminé tous les niveaux!";
      document.getElementById('nextLevel').style.display = 'none';
    }
  }
}

// Démarrer le jeu
document.addEventListener('DOMContentLoaded', () => {
  new CaesarCipher();
});