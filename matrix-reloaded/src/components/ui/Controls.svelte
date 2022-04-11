<script>
    import {charWidth, charHeight, agingChance, flipChance, trailLength, halfSpeedChance} from '../../definitions/stores';
    import * as Defaults from '../../definitions/defaults';
    import Draggable from './Draggable.svelte';
    import PlayPauseIcon from './PlayPauseIcon.svelte';
    import AnimatedCursor from './AnimatedCursor.svelte';
    import ColorPicker from './ColorPicker.svelte';
    import RenderSwitch from './RenderSwitch.svelte';

    export let visible = false;
    export let frameDurationMS;
    export let fontSize;
    export let paused;
    export let colorSchemes;
    export let colorSchemeIndex;
    export let color;
    export let mode;

    function resetAll() {
        fontSize = Defaults.fontSize;
        frameDurationMS = Defaults.frameDuration;
        $charWidth = Defaults.charWidth;
        $charHeight = Defaults.charHeight;
        $agingChance = Defaults.agingChance;
        $flipChance = Defaults.flipChance;
        $halfSpeedChance = Defaults.halfSpeedChance;
        $trailLength = Defaults.trailLength;
        resetColorSchemes();
    }

    function resetColorSchemes() {
        for (let i = 0; i < colorSchemes.length; i++) {
            const scheme = colorSchemes[i];
            const defaultColor = scheme.getColorableDefault();

            if (defaultColor) {
                scheme.setColorable(defaultColor);
            }
        }

        colorSchemeIndex = 0;
        color = colorSchemes[colorSchemeIndex].getColorableDefault();
    }
</script>

<Draggable right="{10}" top="{10}" {visible} let:dragging>
    <section class:dragging>
        <header>
            <h1>Controls<AnimatedCursor paused={paused && !dragging}/></h1>
            <button class="close hideable" class:hidden={dragging} on:click={e => visible = false}><span>&#x2A2F;</span></button>
        </header>

        <div class="hideable" class:hidden={dragging} style="accent-color: var(--color-dark)">

            <label>Colour Scheme</label>
            <select bind:value={colorSchemeIndex}>
                {#each colorSchemes as colorScheme, index}
                    <option value="{index}">{colorScheme.getLabel()}</option>
                {/each}
            </select>
            <ColorPicker colorScheme={colorSchemes[colorSchemeIndex]} bind:color />
            <button on:click={resetColorSchemes}><span>&#8635;</span></button>

            <label>Frame duration (ms)</label>
            <input type="range" max="200" bind:value={frameDurationMS} /><input type="text" bind:value={frameDurationMS} />
            <button on:click={e => frameDurationMS = Defaults.frameDuration}><span>&#8635;</span></button>

            <label>Font size</label>
            <input type="range" bind:value={fontSize} /><input type="text" bind:value={fontSize} />
            <button on:click={e => fontSize = Defaults.fontSize}><span>&#8635;</span></button>

            <label>Column width</label>
            <input type="range" min="10" bind:value={$charWidth} /><input type="text" bind:value={$charWidth} />
            <button on:click={e => $charWidth = Defaults.charWidth}><span>&#8635;</span></button>

            <label>Row height</label>
            <input type="range" min="10" bind:value={$charHeight} /><input type="text" bind:value={$charHeight} />
            <button on:click={e => $charHeight = Defaults.charHeight}><span>&#8635;</span></button>

            <label>Aging chance</label>
            <input type="range" max="1" step="0.1" bind:value={$agingChance} /><input type="text" bind:value={$agingChance} />
            <button on:click={e => $agingChance = Defaults.agingChance}><span>&#8635;</span></button>

            <label>Flip chance</label>
            <input type="range" max="1" step="0.05" bind:value={$flipChance} /><input type="text" bind:value={$flipChance} />
            <button on:click={e => $flipChance = Defaults.flipChance}><span>&#8635;</span></button>

            <label>Half-speed chance</label>
            <input type="range" max="1" step="0.05" bind:value={$halfSpeedChance} /><input type="text" bind:value={$halfSpeedChance} />
            <button on:click={e => $halfSpeedChance = Defaults.halfSpeedChance}><span>&#8635;</span></button>

            <label>Trail length</label>
            <input type="range" bind:value={$trailLength} /><input type="text" bind:value={$trailLength} />
            <button on:click={e => $trailLength = Defaults.trailLength}><span>&#8635;</span></button>
        </div>

        <footer class="hideable" class:hidden={dragging}>
            <button on:click={resetAll}>Reset All <span>&#8635;</span></button>
            <RenderSwitch bind:mode />
            <button class="play-pause" on:click={() => paused = !paused}><PlayPauseIcon color="var(--color)" /></button>
        </footer>
    </section>
</Draggable>

<style>
    section {
        --control-height: 32px;
        background: rgba(0, 0, 0, 0.3);
        padding: 10px;
        color: var(--color);
        border: 1px solid var(--color);
        backdrop-filter: blur(3px);
        border-radius: 10px;
    }
    section.dragging {
        border-style: dashed;
    }
    .dragging, .dragging label {
        cursor: grab;
    }
    h1 {
        margin-top: 0;
        margin-bottom: 0.4em;
        font-size: 2.5em;
        filter: blur(1px);
    }
    button:not(.close) {
        height: 32px;
        line-height: 32px;
        overflow: hidden;
    }
    button:not(.close) span {
        display: inline-block;
        font-size: 22px;
    }
    div {
        display: grid;
        grid-template-columns: repeat(3, auto);
        gap: 0 10px;
    }
    label {
        grid-column-end: span 3;
        font-weight: bold;
        font-size: 1.2em;
    }
    .close {
        position: absolute;
        top: 0;
        right: 0;
        width: 60px;
        height: 60px;
        text-align: center;
        color: var(--color);
        background: none;
        overflow: hidden;
    }
    .close:not(:focus) {
        border-color: transparent;
    }
    .close span {
        font-size: 72px;
        position: relative;
        top: -17px;
        left: -1px;
    }
    input[type="text"] {
        width: 55px;
        text-align: right;
        background: none;
        color: var(--color);
        border: 0;
    }
    input[type="range"] {
        min-width: 200px;
    }
    footer {
        padding-top: 12px;
        display: flex;
        justify-content: space-between;
    }
    footer button {
        margin-bottom: 0;
    }
    .play-pause {
        width: 45px;
        padding-top: 4px;
    }
    span {
        pointer-events: none;
    }
    .hideable {
        transition: opacity 0.2s;
    }
    .hidden {
        opacity: 0;
    }
    select {
        height: var(--control-height);
    }
</style>