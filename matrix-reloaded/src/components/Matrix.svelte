<script>
	import * as Defaults from '../definitions/defaults';
	import {charWidth, charHeight, agingChance, trailLength} from '../definitions/stores';
	import colorSchemes from '../definitions/colors/allColorSchemes';
	import Column from "./Column.svelte";
	import Controls from './ui/Controls.svelte';
	import Canvas from './Canvas.svelte';

	let frameDurationMS = Defaults.frameDuration;

	let width;
	let height;
	let time = 0;
	let paused = false;

	let fontSize = Defaults.fontSize;
	let interval;
	let frame;

	let colorSchemeIndex = 0;
	let colorScheme = colorSchemes[colorSchemeIndex];
	let colors = colorScheme.getColors($trailLength, $agingChance);
	let color = colorScheme.getColorable();

	let colorLight = colorScheme.getControlsColor();
	let colorDark = colorScheme.getControlsColorDark();

	let controlsVisible = true;

	let canvas;
	let context2d;

	let mode = 'dom';

	let columns = [];

	function calcSize(charWidth, charHeight) {
		width = Math.floor( innerWidth / charWidth );
		height = Math.floor( innerHeight / charHeight );
		columns.length = width;
	}

	function tick() {
		time++;

		if (mode === 'canvas' && context2d) {
			repaint(context2d);
		}
	}

	function animateFrame() {
		tick();
		frame = requestAnimationFrame(animateFrame);
	}

	function initInterval(frameDurationMS) {
		interval = setInterval(tick, frameDurationMS);
	}

	function frameDurationChanged(frameDurationMS) {
		clearInterval(interval);
		cancelAnimationFrame(frame);

		if (frameDurationMS < 17) {
			animateFrame();
		} else {
			initInterval(frameDurationMS);
		}
	}

	function onKeydown(e) {
		 if (e.key === 'Escape') {
			 toggleControls();
		 }
	}

	function toggleControls() {
		controlsVisible = !controlsVisible;
	}

	function pauseChanged(paused) {
		if (paused) {
			clearInterval(interval);
			cancelAnimationFrame(frame);
		} else {
			frameDurationChanged(frameDurationMS);
		}
	}

	function trailChanged($trailLength, $agingChance) {
		colors = colorScheme.getColors($trailLength, $agingChance);
	}

	function colorSchemeIndexChanged(index) {
		colorScheme = colorSchemes[index];
		colors = colorScheme.getColors($trailLength, $agingChance);
		colorLight = colorScheme.getControlsColor();
		colorDark = colorScheme.getControlsColorDark();
	}

	function colorChanged(color) {
		if (colorScheme.setColorable) {
			colorScheme.setColorable(color);
			colors = colorScheme.getColors($trailLength, $agingChance);
			colorLight = colorScheme.getControlsColor();
			colorDark = colorScheme.getControlsColorDark();
		}
	}

	function paint(context2d) {
		for (let c of columns) {
			c.paint(context2d);
		}
	}

	function repaint(context2d) {
		canvas.clear(context2d);
		paint(context2d);
	}

	$: frameDurationChanged(frameDurationMS);
	$: calcSize($charWidth, $charHeight);
	$: pauseChanged(paused);
	$: trailChanged($trailLength, $agingChance);
	$: colorSchemeIndexChanged(colorSchemeIndex);
	$: colorChanged(color);
</script>


<!-- This how you can specify style properties that come from JS -->
<main style="--char-width:{$charWidth}px; --char-height:{$charHeight}px; --font-size:{fontSize}px; --color:{colorLight}; --color-dark:{colorDark}" >

	<section on:click={toggleControls}>

		<!-- This is a way to do a loop when there's nothing to iterate over. Svelte will iterate anything with .length -->
		{#each {length: width} as _, x}
			<Column {x} {height} {time} {colors} {width} {mode} {context2d} bind:this={columns[x]} />
		{/each}

		{#if mode === 'canvas'}
			<Canvas bind:this={canvas} bind:context2d {width} {height} {fontSize} />
		{/if}

	</section>

	<Controls bind:frameDurationMS bind:fontSize bind:paused {colorSchemes} bind:colorSchemeIndex bind:color bind:mode bind:visible={controlsVisible} />

</main>


<svelte:window on:resize={e => calcSize($charWidth, $charHeight)} on:keydown={onKeydown} />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');

	:global(body) {
		font-family: 'Courier Prime', monospace;
		background: black;
		padding: 0;
		user-select: none;
	}
	:global(button, select) {
		cursor: pointer;
		background: none;
		color: var(--color);
		border-color: var(--color-dark);
		transition: border-color 0.5s;
	}
	:global(button:hover, select:hover) {
		border-color: var(--color);
	}
	:global(button) {
		padding: 0 10px;
	}
</style>