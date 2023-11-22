import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import BGMSprite from '@/assets/bgm/bgm_sprite.mp3';

// Available BGMs
export const BGMS = {
  MENU: 'MENU',
  INGAME: 'INGAME',
} as const;
type Keys = keyof typeof BGMS;
type BGM = (typeof BGMS)[Keys];

// Howl Instance & Functions
const BGMPlayer = new Howl({
  src: BGMSprite,
  sprite: {
    [BGMS.INGAME]: [0, 204930.61224489796, true],
    [BGMS.MENU]: [206000, 81397.55102040817, true],
  },
  mute: true,
});

const getBGMVolume = () => BGMPlayer.volume();
const setBGMVolume = (value: number) => BGMPlayer.volume(value);

// Hook
export const useBGM = () => {
  const [mute, setMute] = useState(BGMPlayer.mute());
  const [id, setId] = useState<null | number>(null);

  const toggleBGMMute = () => {
    setMute((prev) => {
      const toggledMute = !prev;

      BGMPlayer.mute(toggledMute);
      return toggledMute;
    });
  };

  const playBGM = useCallback(
    (bgm: BGM) => {
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
      playBGM(BGMS.MENU);
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
