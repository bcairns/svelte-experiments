<script>
    const ignoreTags = {
        'INPUT': true,
        'BUTTON': true
    }

    export let left = null;
    export let right = 10;
    export let top = 10;
    export let visible = true;

    let dragging = false;
    let alignment = left ? 'left' : 'right';
    let element;

    function hasClass(path, className, levels = 1) {
        for (let i = 0; i < levels; i++) {
            if (path[i].classList.contains(className)) {
                return true;
            }
        }
        return false;
    }

    function dragstart(e) {
        if (!ignoreTags[e.target.tagName] && !hasClass(e.path, 'picker_wrapper', 3)) {
            dragging = true;
        }
    }

    function drag(e) {
        if (dragging) {
            left += e.movementX;
            right -= e.movementX;
            top += e.movementY;
        }
    }

    function dragend() {
        if (dragging) {
            dragging = false;

            const rect = element.getBoundingClientRect();
            const l = rect.left;
            const r = innerWidth - rect.right;

            if (l <= r) {
                left = l;
                right = null;
                alignment = 'left';
            } else {
                left = null;
                right = r;
                alignment = 'right';
            }
        }
    }
</script>

<div class:visible class={alignment} class:dragging on:mousedown={dragstart} style="left:{left}px; right:{right}px; top:{top}px" bind:this={element}>
    <slot {dragging}></slot>
</div>

<svelte:window on:mousemove={drag} on:mouseup={dragend} />

<style>
    div {
        position: absolute;
        display: none;
    }
    .visible {
        display: block;
    }
    .left {
        right: auto !important;
    }
    .right {
        left: auto !important;
    }
</style>