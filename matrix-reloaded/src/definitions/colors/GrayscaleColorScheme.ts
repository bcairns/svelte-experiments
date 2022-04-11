import AbstractColorScheme from "./AbstractColorScheme";

export default class GrayscaleColorScheme extends AbstractColorScheme {

    label = 'Grayscale';

    interpolate = true;

    getColorableDefault() {
        return '#fff';
    }

    getColorSteps() {
        return {
            0: this.getColorable(),
            1: this.getColorableDarkest()
        }
    }

}
