
// Collection of emoji combinations for avatars
const emojiSets = [
  ["🦊", "🔮", "🎭"],
  ["🐙", "🌌", "🔥"],
  ["🦑", "🔥", "🎧"],
  ["👾", "⚡", "🎮"],
  ["🌑", "🔮", "🎯"],
  ["🕸️", "🕷️", "🌙"],
  ["🧠", "💻", "🔍"],
  ["👁️", "🗝️", "🔒"],
  ["🎲", "🃏", "🎯"],
  ["🧩", "🔮", "🎪"],
  ["⚔️", "🧙", "📡"],
  ["🦇", "🌃", "📻"],
  ["🎸", "🎧", "🔋"],
  ["🔋", "💾", "📟"],
  ["🎭", "🤖", "👁️"]
];

// Collection of adjectives and nouns for usernames
const adjectives = [
  "Sombra", "Mago", "Enigma", "Fantasma", "Pixel", 
  "Cyber", "Eco", "Vórtex", "Glitch", "Byte", 
  "Pulso", "Espectro", "Cripta", "Névoa", "Onda",
  "Neuro", "Quantum", "Zênite", "Vértice", "Astral"
];

const nouns = [
  "Digital", "Binário", "Noturno", "Furtivo", "Perdido", 
  "Paralelo", "Etéreo", "Oculto", "Veloz", "Andarilho",
  "do Ping", "Pixelado", "Silencioso", "Nômade", "Virtual",
  "Espectral", "Criptografado", "Errante", "Esquecido", "Anônimo"
];

/**
 * Generates a random avatar emoji combination
 */
export const generateAvatar = (): string => {
  const emojiSet = emojiSets[Math.floor(Math.random() * emojiSets.length)];
  return emojiSet.join("");
};

/**
 * Generates a random username by combining an adjective and a noun
 */
export const generateUsername = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
};

/**
 * Generates a complete random identity with avatar and username
 */
export const generateIdentity = () => {
  return {
    avatar: generateAvatar(),
    username: generateUsername(),
  };
};

/**
 * Random cryptic phrases that can appear in the application
 */
export const getCrypticPhrase = (): string => {
  const phrases = [
    "Você não está aqui para digitar.",
    "Quem fala demais, trava.",
    "Reioo não grava. Você também não deveria.",
    "A conversa é temporária. O silêncio é permanente.",
    "Entre, fale, desapareça.",
    "Sem histórico. Sem rastros.",
    "As palavras morrem quando a sala expira.",
    "Ninguém vai lembrar o que foi dito aqui.",
    "Sussurros digitais que se desvanecem no tempo."
  ];
  
  return phrases[Math.floor(Math.random() * phrases.length)];
};
