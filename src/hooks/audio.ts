import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import { BGM, BackgroundMusic, SFX, SoundEffect } from '@/data/audio';
import BGMSprite from '@/assets/bgm/bgm_sprite.mp3';
import SFXSprite from 'assets/sfx/sfx_sprite.mp3';

// Players
const BGMPlayer = new Howl({
  src: BGMSprite,
  sprite: {
    [BGM.INGAME]: [0, 204930.61224489796, true],
    [BGM.MENU]: [206000, 81397.55102040817, true],
  },
  mute: true,
});

const getBGMVolume = () => BGMPlayer.volume();
const setBGMVolume = (value: number) => BGMPlayer.volume(value);

const SFXPlayer = new Howl({
  src: [SFXSprite],
  sprite: {
    [SFX.VO_1]: [0, 490.9297052154195],
    [SFX.VO_2]: [2000, 581.4058956916099],
    [SFX.VO_3]: [4000, 576.5759637188213],
    [SFX.BUTTON_HOVER]: [6000, 265.1927437641728],
    [SFX.BUTTON_SELECT]: [8000, 925.895691609977],
    [SFX.BUTTON_START]: [10000, 2830],
    [SFX.BUTTON_TOGGLE]: [14000, 86.14512471655367],
    [SFX.CLEAR_DOUBLE]: [16000, 1726.8253968253973],
    [SFX.CLEAR_SINGLE]: [19000, 1606.5532879818604],
    [SFX.CLEAR_TETRIS]: [22000, 2003.356009070295],
    [SFX.PERFECTIONISM]: [26000, 1236.9841269841259],
    [SFX.CLEAR_TRIPLE]: [29000, 1006.5079365079371],
    [SFX.VO_CONGRATULATIONS]: [32000, 1296.4852607709786],
    [SFX.GAME_OVER]: [35000, 1758.5941043083862],
    [SFX.VO_GAME_OVER]: [38000, 1277.1428571428557],
    [SFX.VO_GO]: [41000, 596.9160997732458],
    [SFX.LEVEL_UP]: [43000, 1771.678004535147],
    [SFX.VO_LEVEL_UP]: [46000, 783.9682539682542],
    [SFX.MIMIC]: [48000, 2197.84580498866],
    [SFX.NEW_HIGHSCORE]: [52000, 4575.3514739229],
    [SFX.VO_NEW_HIGHSCORE]: [58000, 1135.623582766442],
    [SFX.PAUSE_IN]: [61000, 259.7732426303878],
    [SFX.PAUSE_OUT]: [63000, 260.13605442177123],
    [SFX.PIXEL_POCKET]: [65000, 280.6349206349239],
    [SFX.SKILL_IS_UP]: [67000, 468.5260770975077],
    [SFX.SKILL_LEARNED]: [69000, 461.0884353741511],
    [SFX.SKILL_ON_COOLDOWN]: [71000, 191.9954648526101],
    [SFX.TETROMINO_MERGE]: [73000, 548.9795918367406],
    [SFX.TETROMINO_MOVE]: [75000, 48.934240362811465],
    [SFX.TETROMINO_ROTATE]: [77000, 139.2970521541912],
    [SFX.TIME_STOP_DOWN]: [79000, 1858.5487528344656],
    [SFX.TIME_STOP_UP]: [82000, 1858.5487528344656],
  },
  mute: true,
});

const getSFXVolume = () => SFXPlayer.volume();
const setSFXVolume = (value: number) => SFXPlayer.volume(value);

// Hooks
export const useBGM = () => {
  const [mute, setMute] = useState(BGMPlayer.mute());
  const [id, setId] = useState<null | number>(null);

  const toggleBGMMute = () => {
    setMute((prev) => {
      const toggledMute = !prev;

      return toggledMute;
    });
  };

  useEffect(() => {
    BGMPlayer.mute(mute);
  }, [mute]);

  const playBGM = useCallback(
    (bgm: BackgroundMusic) => {
      if (!mute) {
        let currentID = id;

        if (currentID) {
          BGMPlayer.play(currentID);
        } else {
          currentID = BGMPlayer.play(bgm);
          setId(currentID);
        }

        BGMPlayer.fade(0, getBGMVolume(), 500, currentID);
      }
    },
    [mute, id],
  );

  const stopBGM = useCallback(() => {
    BGMPlayer.stop();
    setId(null);
  }, []);

  const pauseBGM = useCallback(() => {
    if (id) BGMPlayer.pause(id);
  }, [id]);

  useEffect(() => {
    if (mute) {
      stopBGM();
    } else {
      playBGM(BGM.MENU);
    }
  }, [mute, playBGM, stopBGM]);

  return {
    state: {
      mute,
    },
    actions: {
      toggleBGMMute,
      playBGM,
      stopBGM,
      pauseBGM,
      getBGMVolume,
      setBGMVolume,
    },
  };
};

export const useSFX = () => {
  const [mute, setMute] = useState(SFXPlayer.mute());

  const toggleSFXMute = () => {
    setMute((prev) => !prev);
  };

  useEffect(() => {
    SFXPlayer.mute(mute);
  }, [mute]);

  const playSFX = useCallback((soundEffect: SoundEffect) => {
    if (!SFXPlayer.mute()) SFXPlayer.play(soundEffect);
  }, []);

  return {
    state: {
      mute,
    },
    actions: {
      toggleSFXMute,
      getSFXVolume,
      setSFXVolume,
      playSFX,
    },
  };
};
