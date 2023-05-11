import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Injectable()
export class MovementEngine {
  tomo_position: number[] = [43, 45];
  //               xtop,yleft,xbot,yright
  BOUNDS: number[] = [30, 15, 70, 70];
  DIRECTIONX: number = -0.5;
  DIRECTIONY: number = -0.5;
  directions: number[] = [0, 0];

  sameDirectionCountX: number = 0;
  sameDirectionCountY: number = 0;
  LRUD = {
    left: true,
    down: true,
  };

  tomo_presented: string = '';
  moveImage: string = '';
  previousDirections: number[] = [0, 0];
  move: boolean = false;
  sub: any;

  movement() {
    var timer = 300;
    this.sub = interval(timer).subscribe((val) => {
      if (this.move == true) {
        if (this.directions[0] == 0 && this.directions[1] == 0) {
          this.getDirections();
        }

        this.delay(300).then((any) => {
          var rand = this.randomState100() + 1;
          if (rand % 40 == 0) {
            var loctimer = this.randomState100() * 5;
          }
          this.delay(loctimer).then((any) => {
            var DU = this.LRUD.down ? 'D' : 'U';
            var RL = this.LRUD.left ? 'L' : 'R';
            this.tomo_presented = this.moveImage + DU + RL;
            if (this.directions[0] > 0) {
              this.tomo_position[0] = this.tomo_position[0] + this.DIRECTIONX;

              this.directions[0] -= 1;
            }
            if (this.directions[1] > 0) {
              this.tomo_position[1] = this.tomo_position[1] + this.DIRECTIONY;

              this.directions[1] -= 1;
            }
          });
        });
      }
    });
  }

  stop() {
    if (this.move) {
      this.sub.unsubscribe();
      this.move = false;
    }
  }

  MOVEIT() {
    this.start();
  }

  start() {
    if (!this.moveImage) {
      this.moveImage = this.tomo_presented;
    }
    if (!this.move) {
      this.move = true;
      this.movement();
    }
  }

  async delay(ms: number) {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), ms)).then(
      () => console.log()
    );
  }

  getDirections() {
    var change = this.randomState100() % 7;

    var xdirection = this.DIRECTIONX < 0 ? -0.5 : 0.5;
    var ydirection = this.DIRECTIONY < 0 ? -0.5 : 0.5;
    if (change < 1) {
      xdirection = xdirection * -1;
      ydirection = ydirection * -1;
    } else {
      this.sameDirectionCountY++;
    }
    if (change > 1) {
      xdirection = xdirection * -1;
    } else {
      this.sameDirectionCountX++;
    }
    if (this.sameDirectionCountX > 5) {
      xdirection = xdirection * -1;
    }
    if (this.sameDirectionCountY > 5) {
      ydirection = ydirection * -1;
    }
    this.previousDirections[0] = this.directions[0];
    this.previousDirections[1] = this.directions[1];
    this.DIRECTIONX = xdirection;
    this.DIRECTIONY = ydirection;
    this.directions[0] = this.randomStateX(xdirection);
    this.directions[1] = this.randomStateY(ydirection);
  }

  randomState100(): number {
    var rand = Math.floor(Math.random() * 100 + 1);

    return rand;
  }

  randomStateX(direction: number): number {
    if (direction > 0 && this.BOUNDS[3] - this.tomo_position[0] > 1) {
      this.LRUD.left = false;
      return Math.floor(
        Math.random() * (this.BOUNDS[3] - this.tomo_position[0]) + 1
      );
    } else if (direction < 0 && this.tomo_position[0] - this.BOUNDS[1] > 1) {
      this.LRUD.left = true;
      this.DIRECTIONX = -1;
      return Math.floor(
        Math.random() * (this.tomo_position[0] - this.BOUNDS[1]) + 1
      );
    } else {
      return 0;
    }
  }
  randomStateY(direction: number): number {
    if (direction > 0 && this.BOUNDS[2] - this.tomo_position[1] > 1) {
      this.LRUD.down = true;
      return Math.floor(
        Math.random() * (this.BOUNDS[2] - this.tomo_position[1]) + 1
      );
    } else if (direction < 0 && this.tomo_position[1] - this.BOUNDS[0] > 1) {
      this.LRUD.down = false;
      this.DIRECTIONY = -1;
      return Math.floor(
        Math.random() * (this.tomo_position[1] - this.BOUNDS[0]) + 1
      );
    } else {
      return 0;
    }
  }
}
