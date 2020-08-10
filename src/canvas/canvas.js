import { Util } from './utility';
import { Particle } from './particle';

export default class Canvas {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.particles = [];
        this.particleNum = 100;
        this.colors = ["#0952BD", "#A5BFF0", "#118CD6", "#1AAEE8", "#F2E8C9"];
        this.texture = null;
    }

    init() {
        for (let i = 0; i < this.particleNum; i++) {
            this.particles.push(new Particle(
                this.canvas,
                this.canvas.width / 2,
                this.canvas.height / 2,
                Math.random() * 8 + 2,
                Math.random() * Math.PI * 2,
                Util.randomIntFromRange(5, 7),
                Util.randomColor(this.colors),
            ));
        }
    }

    draw() {
        for (let i = 0; i < this.particleNum; i++) {
            const p = this.particles[i];
            p.update();
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2)
            this.ctx.shadowColor = p.color;
            this.ctx.shadowBlur = 5;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.globalAlpha = '1'
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            this.ctx.restore();
        }
    }

    render() {
        this.ctx.fillStyle = 'hsla(260,40%,5%,.2)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.draw();
    }

    onRaf() {
        this.render();
    }

    _getTexture() {
        this.texture = new THREE.Texture(this.canvas);
        this.texture.needsUpdate = true;
        this.texture.minFilter = THREE.LinearFilter;
        return this.texture;
    }

    onResize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }
}