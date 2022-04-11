<script>
    import { onMount } from 'svelte';
    import {charWidth, charHeight} from '../definitions/stores';

    export let width = 5;
    export let height = 20;
    export let context2d = null;
    export let fontSize = 22;

    let canvas;
    let pixelWidth;
    let pixelHeight;

    onMount(() => {
        initCanvas();
    });

    export function clear(context2d) {
        context2d.clearRect(0, 0, pixelWidth, pixelHeight);
    }

    function initCanvas() {
        if (canvas) {
            context2d = canvas.getContext('2d');
            context2d.setTransform(-1,0,0,1,canvas.width,0);  // mirror horizontal
            context2d.textAlign = 'center';
            context2d.textBaseline = 'middle';
            context2d.font = fontSize + 'px monospace';
        }
    }

    function changed(width, height, $charWidth, $charHeight, fontSize) {
        pixelWidth = width * $charWidth;
        pixelHeight = height * $charHeight;
        setTimeout(() => {
            initCanvas();
        });
    }

    $: changed(width, height, $charWidth, $charHeight, fontSize)
</script>

<canvas width={pixelWidth} height={pixelHeight} bind:this={canvas} style="width:{pixelWidth}px; height:{pixelHeight}px"></canvas>

<svelte:window on:resize={initCanvas} />

<style>
    canvas {
        /*border: 1px solid #888;*/
        /*position: absolute;*/
        /*left: 200px;*/
    }
</style>