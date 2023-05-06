import { Component } from '@angular/core';
import { MovementEngine } from './tomoComponents/TomoMovementEngine';
@Component({
  selector: 'app-grow',
  templateUrl: './grow.component.html',
  styleUrls: ['./grow.component.css'],
})
export class GrowComponent {
  food: number = 25;
  happiness: number = 0;
  pingle: boolean = false;
  silly: boolean = false;
  tomo_choices: string[] = ['Pegin', 'Pengette', 'Neko', 'Tonkatsu', 'Random'];
  tomo_chosen: string = '';

  constructor(public movement: MovementEngine) {}

  tomoTree = {
    startupMessage: {
      Pegin: {
        happy: ['pllbt (▴ = ▴)', 'fbbt fbbt  ⩍(︒ =︒ )⩍'],
        neutral: ['pllbn (⬝  =  ⬝)', 'fpt... (⦁ = ⦁)'],
      },
      Pengette: { happy: ['', ''], neutral: ['', ''] },
      Neko: { happy: ['', ''], neutral: ['', ''] },
      Tonkatsu: { happy: ['', ''], neutral: ['', ''] },
    },

    tomoEmotionPictures: {
      Pegin: { happy: ['', ''], neutral: ['', ''] },
      Pengette: { happy: ['', ''], neutral: ['', ''] },
      Neko: { happy: ['', ''], neutral: ['', ''] },
      Tonkatsu: { happy: ['', ''], neutral: ['', ''] },
    },
    tomoStates: ['happy', 'sad', 'tired', 'neutral', 'hungry', 'refreshed'],
  };

  currentMessage: string = '';
  currentState: string;
  currentEmoticon: string = '';

  tomo_text_position: number[] = [7, 10];

  gameStarted: boolean = false;
  choiceMade: boolean = false;
  beginSpeaking: boolean = false;
  ngOnInit() {
    this.gameStarted = false;
  }

  gameStart() {
    this.gameStarted = true;
  }

  choose(name: string) {
    console.log(name);
    if (name === 'Random') {
      this.tomo_chosen = this.tomo_choices[this.randomState4() - 1];
    } else {
      this.tomo_chosen = name;
    }

    this.choiceMade = true;
    this.getStartMessage();
    this.delay(3000).then((any) => {
      this.setAnimation();
      this.beginSpeaking = true;
    });
  }

  stop() {
    this.movement.stop();
  }

  interact() {
    this.movement.start();
  }

  getStartMessage() {
    let state = this.randomState10();

    if (state % 2 == 1) {
      this.currentState = 'happy';
      this.currentMessage =
        this.tomoTree.startupMessage[this.tomo_chosen].happy[
          this.randomState4() % 2
        ];

      return;
    }
    this.currentState = 'neutral';
    this.currentMessage =
      this.tomoTree.startupMessage[this.tomo_chosen].neutral[
        this.randomState4() % 2
      ];
  }

  randomState10(): number {
    return Math.floor(Math.random() * 10 + 1);
  }

  randomState4(): number {
    return Math.floor(Math.random() * 4 + 1);
  }
  async delay(ms: number) {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), ms)).then(
      () => console.log()
    );
  }

  setAnimation(state?: string) {
    if (state == undefined) {
      var state = this.currentState;
    }

    if (state == 'happy') {
      var tomo = document.getElementById('tomo');
      tomo.classList.remove('roll-in');
      tomo.classList.add('bounce2');
      return;
    }
    if (state == 'neutral') {
      var tomo = document.getElementById('tomo');
      tomo.classList.remove('roll-in');
      tomo.classList.add('shake');
      return;
    }
  }

  feed(food: string) {}
}
