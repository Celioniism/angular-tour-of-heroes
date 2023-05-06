import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Injectable()
export class MovementEngine {
  tomo_position: number[] = [43, 45];
  //               xtop,yleft,xbot,yright
  BOUNDS: number[] = [25, 20, 85, 80];
  DIRECTIONX: number = -1;
  DIRECTIONY: number = -1;
  directions: number[] = [0, 0];
  previousDirections: number[] = [0, 0];
  move: boolean = false;
  sub: any;
  movement() {
    this.sub = interval(500).subscribe((val) => {
      console.log('moving');
      if (this.move == true) {
        if (this.directions[0] == 0 && this.directions[1] == 0) {
          console.log('changning direction');
          this.getDirections();
        }
        this.delay(300).then((any) => {
          if (this.randomState100() % 20 == 0) {
            this.delay(this.randomState100() * 100).then((any) => {});
          }
          if (this.directions[0] > 0) {
            this.tomo_position[0] += this.DIRECTIONX;
            this.directions[0] -= 1;
          }
          if (this.directions[1] > 0) {
            this.tomo_position[1] += this.DIRECTIONY;
            this.directions[1] -= 1;
          }
        });
      }
    });
  }

  stop() {
    this.sub.unsubscribe();
    this.move = false;
  }

  start() {
    this.move = true;
    this.movement();
  }

  async delay(ms: number) {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), ms)).then(
      () => console.log()
    );
  }

  getDirections() {
    var change = this.randomState100() % 5;
    var xdirection = this.previousDirections[0] < 0 ? -1 : 1;
    var ydirection = this.previousDirections[1] < 0 ? -1 : 1;
    if (change > 3) {
      xdirection = xdirection * -1;
      ydirection = ydirection * -1;
    }
    this.previousDirections[0] = this.directions[0];
    this.previousDirections[1] = this.directions[1];
    this.DIRECTIONX = xdirection;
    this.DIRECTIONY = ydirection;
    this.directions[0] = this.randomStateX(xdirection) * xdirection;
    this.directions[1] = this.randomStateY(ydirection) * ydirection;
  }

  randomState100(): number {
    return Math.floor(Math.random() * 100 + 1);
  }

  randomStateX(direction: number): number {
    if (direction > 0) {
      return Math.floor(
        Math.random() * (this.tomo_position[0] - this.BOUNDS[0]) + 1
      );
    }
    return Math.floor(
      Math.random() * (this.BOUNDS[2] - this.tomo_position[0]) + 1
    );
  }
  randomStateY(direction: number): number {
    if (direction > 0) {
      return Math.floor(
        Math.random() * (this.tomo_position[1] - this.BOUNDS[1]) + 1
      );
    }
    return Math.floor(
      Math.random() * (this.BOUNDS[3] - this.tomo_position[1]) + 1
    );
  }
}
