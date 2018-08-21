
export function startGame() {
  return {
    type: 'STARTGAME'
  };
}

export function toUp() {
  return {
    type: 'TOUP'
  };
}
export function toDown() {
  return {
    type: 'TODOWN'
  };
}
export function toLeft() {
  return {
    type: 'TOLEFT'
  };
}
export function toRight() {
  return {
    type: 'TORIGHT'
  };
}


// UI control

export function closeMask() {
  return {
    type: 'CLOSEMASK'
  };
}
