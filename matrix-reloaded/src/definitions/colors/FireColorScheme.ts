import AbstractColorScheme from "./AbstractColorScheme";

export default class FireColorScheme extends AbstractColorScheme {

    label = 'Fire';

    interpolate = true;

    getControlsColor() {
        return 'hsl(30deg, 100%, 50%)';
    }

    getColorSteps() {
        return {
            0: '#fff',
            1: 'hsl(60deg, 100%, 50%)',
            5: 'hsl(0deg, 100%, 50%)',
            10: 'hsl(0deg, 100%, 1%)',
            11: '#000'
        }
    }

}
