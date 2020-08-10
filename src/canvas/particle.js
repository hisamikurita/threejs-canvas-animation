//vector2.jsを読み込む
import { Vector2 } from './vector2'

//Particleクラスを作成する
export class Particle {
    /**
     * コンストラクター
     * @param {canvas} canvas
     * @param {number} x positionx(位置)
     * @param {number} y positiony(位置)
     * @param {number} scalar scalar(速度)
     * @param {number} direction direction(角度)
     * @param {number} radius radius(半径)
     * @param {string} color color(色)
     */
    constructor(canvas, x, y, scalar, direction, radius, color) {
        this.canvas = canvas;
        //position(位置)プロパティのインスタンスを作成
        this.position = new Vector2(x, y);
        //velocity(進路方向+速度)プロパティのインスタンスを作成
        this.velocity = new Vector2();
        //velocityの速度と向きをセットする
        this.velocity.setFromScalarAngle(scalar, direction);
        //radius(半径)プロパティを定義
        this.radius = radius;
        //color(色)プロパティを定義
        this.color = color;
        this.range = 100;
    }
    /**
     * updateメソッドの作成
     */
    update() {
        //positionにvelocityを加算する
        this.position.add(this.velocity);

        // position(位置)がcanvas外に出た時は中央に再配置
        if (this.position.x - this.range > this.canvas.width) {
            this.position.x = this.canvas.width / 2;
            this.position.y = this.canvas.height / 2;
        };
        if (this.position.x + this.range < 0) {
            this.position.x = this.canvas.width / 2;
            this.position.y = this.canvas.height / 2;
        };
        if (this.position.y - this.range > this.canvas.height) {
            this.position.x = this.canvas.width / 2;
            this.position.y = this.canvas.height / 2;
        };
        if (this.position.y + this.range < 0) {
            this.position.x = this.canvas.width / 2;
            this.position.y = this.canvas.height / 2;
        };
    }
}