import AbstractColorScheme from './AbstractColorScheme';

const matrixGreen = '#A5FAC8';

export default class MatrixColorScheme extends AbstractColorScheme {

    label = 'Matrix';

    interpolate = true;

    getColorableDefault() {
        return matrixGreen;
    }

    getColorSteps() {
        return {
            0: '#FFF',
            1: this.getColorable(),
            19: this.getColorableDarkest(),
            20: '#000'
        };
    }

    // getColorSteps() {
    //     return {
    //         0: '#EFE',
    //         1: '#8F8',
    //         3: '#0C0',
    //         5: '#090',
    //         7: '#060',
    //         9: '#040',
    //         12: '#020',
    //         15: '#010',
    //         18: '#000'
    //     };
    // }

}
