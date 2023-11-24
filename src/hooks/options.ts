import { useState, useEffect, useCallback } from 'react';
import { initializeKey, setKeyValue, OPTIONS_KEY } from '@/utils/localStorage';
import { useAtom } from 'jotai';
import { optionsAtoms } from '@/state/options';
import { useBGM } from './useBGM';
import { useSFX } from './useSFX';
import type { KeyBindingsKeys } from '@/types/options';
import { EMPTY_BINDINGS, GAME_MODES, KEY_BINDINGS_MODES } from '@/data/options';

export const useOptions = () => {
  // GAME MODE
  const [gameMode, setGameMode] = useAtom(optionsAtoms.gameMode);

  // BGM SLIDER
  const {
    actions: { setBGMVolume },
  } = useBGM();

  const [BGMSlider, setBGMSlider] = useAtom(optionsAtoms.BGMSlider);
  useEffect(() => {
    setBGMVolume(BGMSlider.value);
  }, [BGMSlider.value, setBGMVolume]);

  // SFX SLIDER
  const {
    actions: { setSFXVolume },
  } = useSFX();

  const [SFXSlider, setSFXSlider] = useAtom(optionsAtoms.SFXSlider);
  useEffect(() => {
    setSFXVolume(SFXSlider.value);
  }, [SFXSlider.value, setSFXVolume]);

  // KEY BINDINGS
  // Modes
  const [keyBindingsMode, setKeyBindingsMode] = useAtom(
    optionsAtoms.keyBindingsMode,
  );

  // Bindings
  const [keyBindings, setKeyBindings] = useAtom(optionsAtoms.keyBindings);
  const changeKeyBinding = (
    identifier: KeyBindingsKeys,
    eventKey: string,
    eventCode: string,
  ) => {
    setKeyBindings((prev) => {
      return {
        ...prev,
        [identifier]: {
          key: eventKey,
          code: eventCode,
        },
      };
    });
  };

  const clearKeyBindings = () => {
    setKeyBindings(EMPTY_BINDINGS);
    setKeyBindingsMode(KEY_BINDINGS_MODES.CUSTOM_MODE);
  };

  // Identifiers Trackers
  const [usedKeys, setUsedKeys] = useAtom(optionsAtoms.usedKeys);
  const [usedCodes, setUsedCodes] = useAtom(optionsAtoms.usedCodes);

  useEffect(() => {
    const keysSet = new Set<string>();
    const codesSet = new Set<string>();

    Object.values(keyBindings).forEach((action) => {
      if (action.key !== '' && action.code !== '') {
        keysSet.add(action.key);
        codesSet.add(action.code);
      }
    });

    setUsedKeys(keysSet);
    setUsedCodes(codesSet);
  }, [keyBindings, setUsedCodes, setUsedKeys]);

  // Check if all key bindings are uniquely filled
  const trackersAreFilled = () => {
    const keyBindingsLength = Object.keys(keyBindings).length;
    const usedKeysLength = usedKeys.size;
    const usedCodesLength = usedKeys.size;

    return (
      usedKeysLength === keyBindingsLength &&
      usedCodesLength === keyBindingsLength
    );
  };

  // RESET TO DEFAULT
  const resetToDefault = () => {
    setGameMode(GAME_MODES.PROGRESSIVE_OVERLOAD_MODE);
    setSFXSlider((prev) => ({ ...prev, value: 1.0 }));
    setBGMSlider((prev) => ({ ...prev, value: 1.0 }));
    setKeyBindingsMode(KEY_BINDINGS_MODES.NUMPAD_MODE);
  };

  // SAVE TO LOCAL STORAGE
  const saveOptionsToLocalStorage = () => {
    const optionsToSave = {
      gameMode,
      sfxVolume: SFXSlider.value,
      bgmVolume: BGMSlider.value,
      keyBindingsMode,
      keyBindings:
        keyBindingsMode === KEY_BINDINGS_MODES.CUSTOM_MODE ? keyBindings : {},
    };

    setKeyValue(OPTIONS_KEY, optionsToSave);
  };

  // Automatically update the key bindings according to the mode that is set
  useEffect(() => {
    if (keyBindingsMode === NUMPAD_MODE) {
      setKeyBindings(getNUMPADKeyBindings());
    } else if (keyBindingsMode === QWER_MODE) {
      setKeyBindings(getQWERKeyBindings());
    }
  }, [keyBindingsMode]);

  // If local storage is available, initialize all states according to it
  // Otherwise just use the default options
  useEffect(() => {
    if (isLocalStorageAvailable) {
      const defaultOptions = {
        gameMode: PROGRESSIVE_OVERLOAD_MODE,
        sfxVolume: 1.0,
        bgmVolume: 1.0,
        keyBindingsMode: NUMPAD_MODE,
        keyBindings: {},
      };

      const storedOptions = initializeKey(
        isLocalStorageAvailable,
        OPTIONS_KEY,
        defaultOptions,
      );

      changeGameMode(storedOptions.gameMode);
      changeSFXSliderValue(storedOptions.sfxVolume);
      changeBGMSliderValue(storedOptions.bgmVolume);
      changeKeyBindingsMode(storedOptions.keyBindingsMode);

      if (storedOptions.keyBindingsMode === CUSTOM_MODE) {
        setKeyBindings(storedOptions.keyBindings);
      }
    }
  }, [isLocalStorageAvailable]);

  return {
    state: {
      BGMSlider,
      SFXSlider,
      gameMode,
      keyBindingsModes,
      keyBindingsMode,
      keyBindings,
      usedKeys,
      usedCodes,
    },
    actions: {
      changeBGMSliderValue,
      changeSFXSliderValue,
      changeGameMode,
      changeKeyBindingsMode,
      changeKeyBinding,
      resetToDefault,
      saveOptionsToLocalStorage,
      clearKeyBindings,
      trackersAreFilled,
      toggleMuteBGM,
      toggleMuteSFX,
      playSFX,
    },
  };
};
