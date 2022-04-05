<script context="module">
    export const width = 26;
    export const height = 26;

    const agingChance = 0.7;
    const flipChance = 0.05;
</script>

<script>
    import characterSet from '../definitions/charSet';
    import colors from '../definitions/colors';

    // props
    export let x;
    export let y;
    export let context2d;

    // state
    let char = '';
    let age = 0;
    let color;


    function randomizeChar() {
        char = characterSet.getRandomChar();
    }

    // set new character state (random char, age 0)
    export function draw() {
        randomizeChar();
        age = 0;
    }

    // "age" the character
    export function tick() {
        // if a color is set for this age, apply it
        if (colors[age]) {
            color = colors[age];
        }

        if (agingChance > Math.random()) {
            age++;
        }

        if (flipChance > Math.random()) {
            randomizeChar();
        }
    }

    export function erase() {
        char = '';
    }

    // write character to canvas
    function renderToCanvas(char, color) {
        context2d.clearRect(x*width, y*height, width, height);
        context2d.fillStyle = color;
        context2d.fillText(char, x*width + 8, y*height + 20);
    }

    $: renderToCanvas(char, color);
</script>
