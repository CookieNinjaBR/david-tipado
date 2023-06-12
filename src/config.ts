import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: 0x000000,
  scale: {
    width: 854,
    height: 480,
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  fps: {
    target: 30,
    forceSetTimeOut: true
  }
};
