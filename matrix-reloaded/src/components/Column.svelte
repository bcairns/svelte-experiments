<script lang="ts">
    import {trailLength, halfSpeedChance} from '../definitions/stores';
    import Character from './Character.svelte';

    // props
    export let x; // column index
    export let height; // # of characters tall
    export let width;
    export let time; // "clock signal" from parent, increments on each frame
    export let colors;
    export let mode;
    export let context2d;

    // "constants"
    let maxStartDistance = height + $trailLength; // this gives an even distribution for the start

    // state
    let leadingPosition;
    let trailingPosition;
    let halfSpeed = false;

    // children (bound to `this` in <Children> markup below, see https://svelte.dev/tutorial/bind-this)
    let characters = [];


    // initialize starting positions
    resetPositions(maxStartDistance);

    // "spawn" the position cursors, offscreen with a random offset between [-1..-maxOffset]
    function resetPositions(maxOffset) {
        if ($halfSpeedChance > Math.random()) {
            halfSpeed = true;
            maxOffset /= 2; // since we're half the speed, "spawn" at half the distance
        } else {
            halfSpeed = false;
        }
        leadingPosition = Math.min( -1, Math.floor( Math.random() * -maxOffset ) );
        trailingPosition = leadingPosition - $trailLength;
    }

    // draw & erase column characters, and "age" characters by calling tick() on them
    function updateCharacters() {
        characters[leadingPosition]?.draw();

        // "age" on-screen characters
        for (let i = Math.max(trailingPosition, 0); i < Math.min(leadingPosition + 1, height); i++) {
            characters[i].tick();
        }

        characters[trailingPosition]?.erase();
    }

    // advance column state to next frame (update characters and positions)
    function tick() {
        updateCharacters();
        leadingPosition++;
        if (trailingPosition++ >= height) {
            resetPositions(height);
        }
    }

    // executed whenever the value of time changes
    function onTimeChange(time) {
        if (!halfSpeed || time % 2 === 0) {
            tick();
        }
    }

    function onTrailLengthChange($trailLength) {
        // if trail length shrunk, we need to erase letters outside our new range
        for (let i = Math.max(trailingPosition, 0); i < Math.min(leadingPosition - $trailLength, height); i++) {
            characters[i].erase();
        }

        trailingPosition = leadingPosition - $trailLength;
    }

    export function paint(context2d) {
        for (let c of characters) {
            c.paint(context2d);
        }
    }

    function halfSpeedChanceChanged($halfSpeedChance) {
        if ($halfSpeedChance > Math.random()) {
            halfSpeed = true;
        } else {
            halfSpeed = false;
        }
    }

    // $: means "execute this expression when dependent variables have changed"
    $: onTimeChange(time);
    $: onTrailLengthChange($trailLength);
    $: characters.length = height;
    $: halfSpeedChanceChanged($halfSpeedChance);
</script>

{#each {length: height} as _, y}
    <Character {x} {y} {width} {colors} {mode} {context2d} bind:this={characters[y]} />
{/each}