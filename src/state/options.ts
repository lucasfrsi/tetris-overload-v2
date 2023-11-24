import {
  GAME_MODES,
  KEY_BINDINGS_MODES,
  NUMPAD_BINDINGS,
} from '@/data/options';
import type { GameMode, KeyBindingMode } from '@/types/options';

// export const optionsAtoms = {
//   BGMSlider: atom({
//     min: 0.0, //todo: are these necessary? NOPE.
//     max: 1.0, //todo: are these necessary? NOPE.
//     step: 0.01, //todo: are these necessary? NOPE.
//     value: 1.0, //todo: are these necessary? NOPE.
//   }),
// move these to the components themselves.

//   SFXSlider: atom({
//     min: 0.0, //todo: are these necessary? NOPE.
//     max: 1.0, //todo: are these necessary? NOPE.
//     step: 0.01, //todo: are these necessary? NOPE.
//     value: 1.0, //todo: are these necessary? NOPE.
//   }),
// move these to the components themselves.

//   keyBindingsMode: atom<KeyBindingMode>(KEY_BINDINGS_MODES.NUMPAD_MODE),

//   keyBindings: atom<typeof NUMPAD_BINDINGS>(NUMPAD_BINDINGS),

//   usedKeys: atom(new Set<string>()),
//   usedCodes: atom(new Set<string>()),
// } as const;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export interface OptionsState {
  gameMode: GameMode;
}

const initialState: OptionsState = {
  gameMode: GAME_MODES.PROGRESSIVE_OVERLOAD_MODE,
};

// State Slice
export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Actions
export const { increment, decrement, incrementByAmount } = optionsSlice.actions;

// Selectors
export const selectCount = (state: RootState) => state.counter.value;

// Reducer
export default optionsSlice.reducer;
