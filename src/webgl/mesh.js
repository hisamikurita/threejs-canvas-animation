import Canvas from '../canvas/canvas';

export default class Mesh {
    constructor(stage) {
        // スクリーンサイズに下記のサイズを乗算したサイズがスクリーンに描画されるMeshのサイズとなる
        this.meshWindowSizeRatio = { x: .5, y: .5 };

        // ジオメトリー生成用のパラメータ
        this.geometryParm = {
            width: 1, // ジオメトリ生成後、リサイズによるmeshのサイズ変更を見越して、1で固定、サイズの変更はmeshのscaleプロパティを変更して行う
            height: 1, // ジオメトリ生成後、リサイズによるmeshのサイズ変更を見越して、1で固定、サイズの変更はmeshのscaleプロパティを変更して行う
            widthSegments: 1, // 板ポリゴン内のセルの数（X軸）
            heightSegments: 1 // 板ポリゴン内のセルの数（Y軸）
        };

        // マテリアル生成用のパラメータ
        this.materialParam = {
            useWireframe: false,
        };

        this.stage = stage;

        this.mesh = null; // mesh

        // スクリーンサイズ
        this.windowWidth = 0;
        this.windowHeight = 0;

        // スクリーンサイズの半分
        this.windowWidthHalf = 0;
        this.windowHeightHalf = 0;

        // メッシュサイズの半分（今回は、たまたまスクリーンサイズと同じなので同様の値になる）
        this.meshWidthHalf = 0;
        this.meshHeightHalf = 0;

        this.mouseX = null;
        this.mouseY = null;
        this.mouseRange = 50;
        this.friction = 10;

        this.canvas = new Canvas();
    }

    init() {
        this.canvas.init();
        this._setWindowSize(); // windowのサイズをセット
        this._setMouse();
        this._setMesh(); // meshの生成
        this._setMeshScale(); // meshのサイズをセット
    }

    _setWindowSize() {
        // スクリーンサイズ
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        // スクリーンサイズの半分
        this.windowWidthHalf = this.windowWidth * 0.5;
        this.windowHeightHalf = this.windowHeight * 0.5;
    }

    _setMouse() {
        window.addEventListener('mousemove', (e) => {
            //マウス座標の取得
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            //正規化
            this.mouseX /= this.windowWidth;
            this.mouseY /= this.windowHeight;
            //座標変換
            this.mouseX = this.mouseX * 2 - 1;
            this.mouseY = this.mouseY * 2 - 1;
            this.mouseX *= this.mouseRange;
            this.mouseY *= this.mouseRange;
        });
    }

    _setMesh() {
        // ジオメトリーを生成
        const geometry = new THREE.PlaneBufferGeometry(
            this.geometryParm.width,
            this.geometryParm.height,
            this.geometryParm.widthSegments,
            this.geometryParm.heightSegments
        );

        // マテリアルを生成
        const material = new THREE.MeshBasicMaterial({
            map: this.canvas._getTexture(),
        });

        this.mesh = new THREE.Mesh(geometry, material);

        this.stage.scene.add(this.mesh);
    }

    _setMeshScale() {
        // three.jsのobject3d classがもつscaleプロパティでメッシュのサイズを変更する
        this.mesh.scale.x = window.innerWidth * this.meshWindowSizeRatio.x;
        this.mesh.scale.y = window.innerHeight * this.meshWindowSizeRatio.y;

        // メッシュサイズの半分（今回は、たまたまスクリーンサイズと同じなので同様の値になる）
        this.meshWidthHalf = this.mesh.scale.x * 0.5;
        this.meshHeightHalf = this.mesh.scale.y * 0.5
    }

    // _setMeshPosition() {
    //     // ポジションを計算して、three.jsのobject3d classがもつpositionプロパティでメッシュの座標を変更する
    //     // this.mesh.position.y = this.windowHeightHalf - this.meshHeightHalf;
    //     // this.mesh.position.x = -this.windowWidthHalf + this.meshWidthHalf;
    // }

    _render() {
        const x = (this.mouseX - this.mesh.position.x) / this.friction;
        const y = (-this.mouseY - this.mesh.position.y) / this.friction;
        const denominator = 50000;
        this.mesh.position.x += x;
        this.mesh.position.y += y;
        this.mesh.rotation.x += (-y * .5) / denominator;
        this.mesh.rotation.y += (-x * .5) / denominator;

        this.mesh.material.map.needsUpdate = true;
    }

    onResize() {
        this.canvas.onResize();
        this._setWindowSize(); // windowのサイズをセット
        this._setMeshScale(); // meshのサイズをセット
    }

    onRaf() {
        // if (this.mesh) this._setMeshPosition();
        this._render();
        this.canvas.onRaf();
    }
}