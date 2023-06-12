import Phaser from 'phaser';
import config from './config';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import MenuScene from './scenes/MenuScene';
import OverScene from './scenes/OverScene';
import UiScene from './scenes/UiScene';

new Phaser.Game(
  Object.assign(config, {
    scene: [BootScene, GameScene, MenuScene, OverScene, UiScene]
  })
);
