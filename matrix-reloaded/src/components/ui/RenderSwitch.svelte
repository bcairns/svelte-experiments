<script>
    export let mode = 'dom';

    function domClicked() {
        mode = 'dom';
    }

    function canvasClicked() {
        mode = 'canvas';
    }

    $: dom = mode === 'dom';
    $: canvas = mode === 'canvas';
</script>

<div>
    <button class:active={dom} on:click|stopPropagation|preventDefault={domClicked}>DOM</button><button class:active={canvas} on:click|stopPropagation={canvasClicked}>Canvas</button>
</div>

<style>
    div {
        border: 1px solid var(--color-dark);
        height: calc(var(--control-height) - 2px);
        border-radius: 2px;
        pointer-events: all;
        cursor: pointer;
    }
    div:hover {
        border-color: var(--color)
    }
    button {
        display: inline-block;
        height: 100%;
        line-height: var(--control-height);
        padding: 0 8px;
        border: 0;
    }
    .active {
        background-color: var(--color-dark);
    }
</style>