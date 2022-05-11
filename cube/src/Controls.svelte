<script>
    export let size;
    export let spinDuration;
    export let perspective;
    export let radius;

    export let hoverRadius;
    export let faceRotation;
</script>

<section class="controls">
    <h1>Controls</h1>

    <label>
        Size:
        <input type="range" max="250" min="50" step="10" bind:value={size}/>
        <input type="text" bind:value={size}/> px
    </label>
    <label>
        Spin Duration:
        <input type="range" max="8" min="0.5" step="0.1" bind:value={spinDuration}/>
        <input type="text" bind:value={spinDuration}/> sec
    </label>
    <label>
        Perspective:
        <input type="range" max="1600" min="100" bind:value={perspective}/>
        <input type="text" bind:value={perspective}/> px
    </label>
    <label>
        Radius:
        <input type="range" max="2" min="0" step="0.1" bind:value={radius}/>
        <input type="text" bind:value={radius}/> x
    </label>

    <h2>Hover effect</h2>
    <label>
        Radius:
        <input type="range" max="2" min="0" step="0.1" bind:value={hoverRadius}/>
        <input type="text" bind:value={hoverRadius}/> x
    </label>
    <label>
        Face rotation:
        <input type="range" max="180" min="0" step="15" bind:value={faceRotation}/>
        <input type="text" bind:value={faceRotation}/> deg
    </label>
</section>

<style>
    .controls {
        position: absolute;
        top: 10px;
        right: 10px;
        border: 1px solid black;
        padding: 10px;
    }
    h1 {
        margin-top: 0;
    }
    input[type=text] {
        width: 3em;
    }
    input[type=range] {
        position: relative;
        top: 10px;
    }
    label {
        display: block;
    }
</style>