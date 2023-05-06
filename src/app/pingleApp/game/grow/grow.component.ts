import { Component } from '@angular/core';

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
  tomo_chosen: string = 'Pegin.png';

  startupMessages = {
    Pegin: {
      happy: ['pllbt (▴ = ▴)', 'fbbt fbbt  ⩍(︒ =︒ )⩍'],
      neutral: ['pllbn (⬝  =  ⬝)', 'fpt... (⦁ = ⦁)'],
    },
    Pengette: { happy: ['', ''], neutral: ['', ''] },
    Neko: { happy: ['', ''], neutral: ['', ''] },
    Tonkatsu: { happy: ['', ''], neutral: ['', ''] },
  };

  startupMessageEmoticons = {
    Pegin: { happy: ['', ''], neutral: ['', ''] },
    Pengette: { happy: ['', ''], neutral: ['', ''] },
    Neko: { happy: ['', ''], neutral: ['', ''] },
    Tonkatsu: { happy: ['', ''], neutral: ['', ''] },
  };

  currentMessage: string = ''; // 32 char string max
  currentEmoticon: string = ''; // location of emoticon png

  tomo_position: number[] = [45, 45];
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
    this.tomo_chosen = name;
    this.choiceMade = true;
    this.getStartMessage();
    this.delay(3000).then((any) => {
      this.beginSpeaking = true;
    });
  }

  getStartMessage() {
    let state = this.randomState10();
    console.log(state);
    console.log(this.tomo_chosen);
    if (state % 2 == 1) {
      this.currentMessage =
        this.startupMessages[this.tomo_chosen].happy[this.randomState4() % 2];
      return;
    }
    this.currentMessage =
      this.startupMessages[this.tomo_chosen].neutral[this.randomState4() % 2];
  }

  randomState10(): number {
    return Math.floor(Math.random() * 10);
  }

  randomState4(): number {
    return Math.floor(Math.random() * 10);
  }
  async delay(ms: number) {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), ms)).then(
      () => console.log()
    );
  }
}
