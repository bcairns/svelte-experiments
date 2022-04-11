<script context="module">
    import {charWidth, charHeight, agingChance, flipChance} from '../definitions/stores';
</script>

<script>
    import characterSet from '../definitions/charSet';

    // props
    export let x;
    export let y;
    export let width;
    export let colors;
    export let mode;
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

        if ($agingChance > Math.random()) {
            age++;
        }

        if ($flipChance > Math.random()) {
            randomizeChar();
        }
    }

    export function erase() {
        char = '';
    }

    export function paint(context2d) {
        if (char.length) {
            context2d.fillStyle = color;
            context2d.fillText(char, px, py);
        }
    }

    $: px = (width-x)*$charWidth - ($charWidth/2);
    $: py = y*$charHeight + ($charHeight/2) + 1;
</script>

{#if mode === 'dom'}
    <div style="color:{color}; left:{x*$charWidth}px; top:{y*$charHeight}px;">
        {char}
    </div>
{/if}

<style>
    div {
        position: absolute;
        text-align: center;
        transform: scaleX(-1);
        font-family: monospace;
        font-size: var(--font-size);

        /* These COULD be inline, but they're the same for every instance so we prefer a single declaration.
        These vars are set by <Matrix>. */
        width: var(--char-width);
        height: var(--char-height);
        line-height: var(--char-height);
    }
</style>