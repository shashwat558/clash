const sounds = {
  hit: new Audio("/sounds/break.wav"),
  break: new Audio("/sounds/hit.wav"),
  lose: new Audio("/sounds/lose.wav"),
  win: new Audio("/sounds/win.wav"),
};

Object.values(sounds).forEach(sound => {
  sound.volume = 0.4;       // subtle
  sound.preload = "auto";
});

export function playSound(name: keyof typeof sounds) {
  const sound = sounds[name];
  if (!sound) return;

  sound.currentTime = 0; // allow rapid replay
  sound.play().catch(() => {});
}
