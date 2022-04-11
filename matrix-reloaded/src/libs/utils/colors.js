const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const parseHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

// hex string => {r: 23, g, 123, b: 255}
export function hexToRgb(hex) {
    if (hex.length <= 4) {
        // expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
    }

    let result = parseHexRegex.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// returns like: {h: 0.1, s: 0.4, l: 0.8}
export function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h, s, l };
}


// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
export function hsl2rgb_new(h,s,l) {
    h *= 360;
    let a= s*Math.min(l,1-l);
    let f = (n,k=(n+h/30)%12) => Math.round(l - a*Math.max(Math.min(k-3,9-k,1),-1) * 255);

    return {
        r: f(0),
        g: f(8),
        b: f(4)
    }
}


// 0.5, 0.5, 0.5 => 255, 255, 255
// yeah so this function is fucked.. sometimes is returns [0..1] sometimes it returns [0...255]
export function hsl2rgb(h, s, l) {
    // console.log('hsl2rgb (h, s, l)', h, s, l);
    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return Math.round(p);
        }

        const q = (l < 0.5 ? l * (1 + s) : l + s - l * s);
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    // console.log('hsl2rgb (r, g, b)', r, g, b);

    // return {
    //     r,
    //     g,
    //     b
    // }

    return {
        r: parseInt(r*255),
        g: parseInt(g*255),
        b: parseInt(b*255)
    }
}

export function hexToHsl(hex) {
    let rgb = hexToRgb(hex);
    return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

export function hexAlpha(hex, alpha) {
    let rgb = hexToRgb(hex);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

export function hexAdjustLightness(hex, factor) {
    let hsl = hexToHsl(hex);
    return `hsl(${Math.round(hsl.h*360)}deg, ${Math.round(hsl.s*100)}%, ${Math.round(hsl.l*100*factor)}%)`;
}

export function hexSetLightness(hex, lightness) {
    let hsl = hexToHsl(hex);
    return `hsl(${Math.round(hsl.h*360)}deg, ${Math.round(hsl.s*100)}%, ${Math.round(lightness*100)}%)`;
}
