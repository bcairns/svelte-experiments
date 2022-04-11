import Color from '../../libs/types/Color';
import AbstractColorScheme from "./AbstractColorScheme";

export default class RainbowColorScheme extends AbstractColorScheme {

    label = 'Rainbow';

    interpolate = true;

    randomColor;

    getControlsColor() {
        this.randomColor = this.getRandomColor();
        return this.randomColor;
    }

    getControlsColorDark() {
        return Color.newFrom(this.randomColor).hsl(0.25);
    }

    getColorSteps() {
        return {
            0: '#f00',
            1: '#0f0',
            2: '#00f',
            3: '#f0f'
        }
    }

}
