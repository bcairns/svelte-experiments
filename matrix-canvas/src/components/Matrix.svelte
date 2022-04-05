<script>
	import {width as charWidth, height as charHeight} from './Character.svelte';
	import Column from "./Column.svelte";
	import { onMount } from 'svelte';

	const frameDurationMS = 100;

	let width = 0;
	let height = 0;
	let time = 0;

	let canvas;
	let context2d;

	function tick() {
		time++;
	}

	onMount(() => {
		context2d = canvas.getContext('2d');
		context2d.setTransform(-1,0,0,1,canvas.width,0);  // mirror horizontal
		context2d.font = '22px monospace';

		width = 60; //Math.floor( innerWidth / charWidth );
		height = 30; //Math.floor( innerHeight / charHeight );

		setInterval(tick, frameDurationMS);
	});
</script>


<canvas width=1560 height=780 bind:this={canvas}></canvas>

<!-- This is a way to do a loop when there's nothing to iterate over. Svelte will iterate anything with .length -->
{#each {length: width} as _, x}
	<Column {x} {height} {time} bind:context2d />
{/each}


<style>
	:global(body) {
		background: black;
		padding: 0;
	}
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 1560px;
		height: 780px;
	}
</style>