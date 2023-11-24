export const GAME_MODES = {
  PROGRESSIVE_OVERLOAD_MODE: 'Progressive Tetris',
  CLASSIC_OVERLOAD_MODE: 'Tetris Overload',
  CLASSIC_MODE: 'Classic Tetris',
} as const;

export const KEY_BINDINGS = {
  MOVE_LEFT: 'Move left',
  MOVE_RIGHT: 'Move right',
  DROP: 'Drop',
  ROTATE_CW: 'Rotate left',
  ROTATE_ACW: 'Rotate right',
  HARD_DROP: 'Hard drop',
  HOLD: 'Hold',
  MIMIC: 'Mimic',
  PAUSE: 'Pause',
} as const;

export const NUMPAD_BINDINGS = {
  [KEY_BINDINGS.MOVE_LEFT]: {
    key: '1',
    code: 'Numpad1',
  },
  [KEY_BINDINGS.MOVE_RIGHT]: {
    key: '3',
    code: 'Numpad3',
  },
  [KEY_BINDINGS.DROP]: {
    key: '2',
    code: 'Numpad2',
  },
  [KEY_BINDINGS.ROTATE_CW]: {
    key: '4',
    code: 'Numpad4',
  },
  [KEY_BINDINGS.ROTATE_ACW]: {
    key: '6',
    code: 'Numpad6',
  },
  [KEY_BINDINGS.HARD_DROP]: {
    key: '5',
    code: 'Numpad5',
  },
  [KEY_BINDINGS.HOLD]: {
    key: '7',
    code: 'Numpad7',
  },
  [KEY_BINDINGS.MIMIC]: {
    key: '9',
    code: 'Numpad9',
  },
  [KEY_BINDINGS.PAUSE]: {
    key: '8',
    code: 'Numpad8',
  },
};

export const QWER_BINDINGS = {
  [KEY_BINDINGS.MOVE_LEFT]: {
    key: 'ArrowLeft',
    code: 'ArrowLeft',
  },
  [KEY_BINDINGS.MOVE_RIGHT]: {
    key: 'ArrowRight',
    code: 'ArrowRight',
  },
  [KEY_BINDINGS.DROP]: {
    key: 'ArrowDown',
    code: 'ArrowDown',
  },
  [KEY_BINDINGS.ROTATE_CW]: {
    key: 'w',
    code: 'KeyW',
  },
  [KEY_BINDINGS.ROTATE_ACW]: {
    key: 'e',
    code: 'KeyE',
  },
  [KEY_BINDINGS.HARD_DROP]: {
    key: 'ArrowUp',
    code: 'ArrowUp',
  },
  [KEY_BINDINGS.HOLD]: {
    key: 'q',
    code: 'KeyQ',
  },
  [KEY_BINDINGS.MIMIC]: {
    key: 'r',
    code: 'keyR',
  },
  [KEY_BINDINGS.PAUSE]: {
    key: 'p',
    code: 'KeyP',
  },
};

export const EMPTY_BINDINGS = {
  [KEY_BINDINGS.MOVE_LEFT]: {
    key: '',
    code: '',
  },
  [KEY_BINDINGS.MOVE_RIGHT]: {
    key: '',
    code: '',
  },
  [KEY_BINDINGS.DROP]: {
    key: '',
    code: '',
  },
  [KEY_BINDINGS.ROTATE_CW]: {
    key: '',
    code: '',
  },
  [KEY_BINDINGS.ROTATE_ACW]: {
    key: '',
    code: '',
  },
  [KEY_BINDINGS.HARD_DROP]: {
    key: '',
    code: '',
  },
  [KEY_BINDINGS.HOLD]: {
    key: '',
    code: '',
  },
  [KEY_BINDINGS.MIMIC]: {
    key: '',
    code: '',
  },
  [KEY_BINDINGS.PAUSE]: {
    key: '',
    code: '',
  },
};

export const KEY_BINDINGS_MODES = {
  NUMPAD_MODE: 'Numeric Keypad',
  QWER_MODE: 'Arrows + QWER',
  CUSTOM_MODE: 'Custom',
} as const;

// Types
export type GameModesKeys = keyof typeof GAME_MODES;
export type GameMode = (typeof GAME_MODES)[GameModesKeys];

export type KeyBindingsKeys = keyof typeof KEY_BINDINGS;
export type KeyBinding = (typeof KEY_BINDINGS)[KeyBindingsKeys];

export type KeyBindingsModesKeys = keyof typeof KEY_BINDINGS_MODES;
export type KeyBindingMode = (typeof KEY_BINDINGS_MODES)[KeyBindingsModesKeys];
