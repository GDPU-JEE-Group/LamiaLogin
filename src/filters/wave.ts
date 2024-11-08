import { CLEAR_MODES, Filter, FilterSystem, RenderTexture } from 'pixi.js';

import fragment from './wave.fs';
import vertex from './wave.vs';

interface WaveFilterOptions {
    amplitude: number; // 0 ~ 1
    band: number; /////// 0 ~ 1
    radius: number; ///// 0 ~ 1
    speed: number; ////// 0 ~ 20
    waves: number; ////// 0 ~ 20
}

export default class WaveFilter extends Filter {
    static readonly defaults: WaveFilterOptions = {
        amplitude: 0.3,
        band: 0.3,
        radius: 0.3,
        speed: 2,
        waves: 12
    };

    public index: number;
    public maxSize: number;

    constructor(maxCount: number, options?: Partial<WaveFilterOptions>) {
        super(vertex, `const int COUNT = ${maxCount};\r\n${fragment}`);
        Object.assign(this, WaveFilter.defaults, options);

        this.index = 0;
        this.maxSize = maxCount * 3;
        this.status = new Array(this.maxSize);

        for (let i = 0; i < this.maxSize; ++i) this.status[i] = -1;
    }

    apply(
        filterManager: FilterSystem,
        input: RenderTexture,
        output: RenderTexture,
        clear: CLEAR_MODES
    ): void {
        filterManager.applyFilter(this, input, output, clear);
    }

    get status(): number[] {
        return this.uniforms.status;
    }

    set status(value: number[]) {
        this.uniforms.status = value;
    }

    get amplitude(): number {
        return this.uniforms.amplitude;
    }

    set amplitude(value: number) {
        this.uniforms.amplitude = value;
    }

    get band(): number {
        return this.uniforms.band;
    }

    set band(value: number) {
        this.uniforms.band = value;
    }

    get radius(): number {
        return this.uniforms.radius;
    }

    set radius(value: number) {
        this.uniforms.radius = value;
    }

    get speed(): number {
        return this.uniforms.speed;
    }

    set speed(value: number) {
        this.uniforms.speed = value;
    }

    get waves(): number {
        return this.uniforms.waves;
    }

    set waves(value: number) {
        this.uniforms.waves = value;
    }
}
