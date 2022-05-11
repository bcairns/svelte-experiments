<script>
	import Cube from './Cube.svelte';
	import Controls from './Controls.svelte';

	let size = 150;
	let spinDuration = 4;
	let perspective = 800;
	let radius = 1;

	// hover vars
	let hoverRadius = 1.25;
	let faceRotation = 45;
</script>

<main>
	<Cube size={size} {spinDuration} {perspective} {radius} {hoverRadius} {faceRotation} />
	<Controls
		bind:size
		bind:spinDuration
		bind:perspective
		bind:radius
		bind:hoverRadius
		bind:faceRotation
	/>
</main>

<style global>
	* {
		box-sizing: border-box;
	}
</style>