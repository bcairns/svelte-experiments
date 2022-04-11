import Color from '../../libs/types/Color';
import {hexSetLightness} from '../../libs/utils/colors';

export default abstract class AbstractColorScheme {

    // abstract members, these must be implemented by subclasses
    protected label;
    protected abstract getColorSteps();

    // other fields
    protected interpolate = false;
    protected colorable;

    // private fields
    private colorSteps = this.getColorSteps();
    private stepsArray = this.getStepsArray();
    private highestStep = this.stepsArray[0] || 0;
    private colors;
    private controlsColor;


    // public methods ///////////

    getColors(tailLength, agingChance):object {
        let length = agingChance > 0 ? tailLength * agingChance : tailLength;
        this.colors = this.getScaledColors(length);
        return this.colors;
    }

    getLabel() {
        return this.label || this.constructor.name;
    }

    getControlsColor() {
        let colorStr = this.getColorable() || '#fff';
        let color = Color.newFrom(colorStr);

        if (color.l < 0.8) {
            return color.hsl(0.8);
        } else {
            return colorStr;
        }
    }

    getControlsColorDark() {
        return Color.newFrom(this.getControlsColor()).hsl(0.25);
    }

    getRandomColor() {
        const keys = Object.keys(this.colors).map(k => Number(k));
        const randomKey = keys[ Math.floor(Math.random() * keys.length) ];
        return this.colors[randomKey];
    }

    // protected methods /////////

    getColorableDefault() {
        return null;
    }

    getColorable() {
        return this.colorable || this.getColorableDefault();
    }

    getColorableDarkest() {
        let colorable = this.getColorable();

        if (colorable) {
            return hexSetLightness(colorable, 0.05);
        }
    }

    setColorable(color) {

        this.getColorableDarkest();

        this.colorable = color;
        this.colorSteps = this.getColorSteps();
        this.stepsArray = this.getStepsArray();
    }

    // private methods ///////////

    private getStepsArray() {
        let steps = [];
        for (let i in this.colorSteps) {
            steps.push(Number(i));
        }
        return steps.reverse(); // we evaluate from back-to-front so that in case of overlap, the "front" color always "wins"
    }

    // return color lookup, scaled to length
    private getScaledColors(length):object {
        const colors = {};

        for (let i of this.stepsArray) {
            let scaledStep = Math.round( i / this.highestStep * length );
            colors[scaledStep] = this.colorSteps[i];
        }

        if (this.interpolate) {
            this.interpolateColors(colors);
        }

        return colors;
    }

    // interpolate gaps between color stops and return (modifies in place)
    private interpolateColors(colors) {
        const keys = Object.keys(colors).map(k => Number(k));

        for (let i = 1; i < keys.length; i++) {
            this.interpolateBetween(colors, keys[i-1], keys[i]);
        }
    }

    private interpolateBetween(colors, start, end) {
        let startColor = Color.newFrom( colors[start] );
        let endColor = Color.newFrom( colors[end] );

        for (let i = start + 1, percentage; i < end; i++) {

            // console.log('interpolateBetween', startColor, endColor);

            percentage = ( i - start ) / ( end - start );

            let hsl = Color.hslInterpolate(startColor, endColor, percentage);

            colors[i] = hsl;
        }
    }

}