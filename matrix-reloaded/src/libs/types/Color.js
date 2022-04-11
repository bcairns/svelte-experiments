import {hexToRgb, hsl2rgb, rgbToHsl} from '../utils/colors';

export default class Color {

    // hex pairs ('1F', etc)
    // h1;
    // h2;
    // h3;
    
    // RGB (0..255), or maybe we want [0..1]?
    r;
    g;
    b;
    
    // Hue/Sat/Lightness
    h; // [0..360]
    s; // [0..100]
    l; // [0..100]
    
    // alpha
    // a;

    static hexLightness(hex, factor) {

    }

    static _newFromHex(str) {
        let rgb = hexToRgb(str);
        return new Color(rgb.r, rgb.g, rgb.b);
    }

    // auto-detect #hex, rgb(), or hsl()
    static newFrom(str) {
        switch (str[0]) {
            case '#': return Color._newFromHex(str);
            case 'h': return Color.newFromHsl(str);
            case 'r': return Color.newFromRgb(str);
        }
    }

    // rgb(10, 100, 200)
    static newFromRgb(str) {
        console.warn('newFromRgb() not implmented')
    }


    // expected format: hsl(360deg, 100%, 100%)
    static newFromHsl(str) {
        const results = str.match(/hsl\((\d+)deg,? (\d+)%,? (\d+)%\)/i);
        const h = Number(results[1])/360;
        const s = Number(results[2])/100;
        const l = Number(results[3])/100;
        const rgb = hsl2rgb(h, s, l);
        const color = new Color(rgb.r, rgb.g, rgb.b);

        color.h = h;
        color.s = s;
        color.l = l;

        return color;
    }

    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;

        let hsl = rgbToHsl(r, g, b);
        this.h = hsl.h;
        this.s = hsl.s;
        this.l = hsl.l;
    }

    hsl(l = this.l) {
        return `hsl(${Math.round(this.h*360)}deg, ${Math.round(this.s*100)}%, ${Math.round(l*100)}%)`;
    }

    static rgbInterpolate(color1, color2, percentage) {
        let rgb = Color.rgbInterpolateValues(color1, color2, percentage);
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }

    // returns {r: 10, g: 100, b: 200}
    static rgbInterpolateValues(color1, color2, percentage) {
        return {
            r: parseInt(( color2.r - color1.r ) * percentage + color1.r),
            g: parseInt(( color2.g - color1.g ) * percentage + color1.g),
            b: parseInt(( color2.b - color1.b ) * percentage + color1.b)
        };
    }

    static hslInterpolate(color1, color2, percentage) {
        // console.log('hslInterpolate', color1, color2);
        let hsl = Color.hslInterpolateValues(color1, color2, percentage);
        return `hsl(${hsl.h}deg, ${hsl.s}%, ${hsl.l}%)`;
    }

    // returns {h, s, l}
    static hslInterpolateValues(color1, color2, percentage) {
        return {
            h: parseInt((( color2.h - color1.h ) * percentage + color1.h)*360),
            s: parseInt((( color2.s - color1.s ) * percentage + color1.s)*100),
            l: parseInt((( color2.l - color1.l ) * percentage + color1.l)*100)
        };
    }

}