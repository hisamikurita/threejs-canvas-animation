export class Util {
    //引数の最小値から最大値の間でランダムな値の整数を返す関数
    static randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    //ランダムな色を返す関数
    static randomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)]
    }
}
