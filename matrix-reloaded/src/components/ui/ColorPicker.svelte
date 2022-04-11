<script>
    import { onMount } from "svelte";
    import Picker from 'vanilla-picker';

    export let colorScheme;
    export let color;

    let element;
    let picker;
    let hide = true;

    onMount(() => {
        let options = {
            popup: 'left',
            alpha: false
        }

        if (colorScheme.getColorable()) {
            console.log('coloor picker mount', colorScheme.getColorable())
            hide = false;
            options.color = colorScheme.getColorable()
        }

        picker = new Picker(element);
        picker.setOptions(options);
        picker.onChange = function(pickedColor) {
            color = pickedColor.hex.substring(0, 7); // discard alpha
        };
    });

    function colorSchemeChanged(colorScheme) {
        if (colorScheme.getColorable()) {
            hide = false;
        } else {
            hide = true;
        }
        if (picker) {
            picker.setOptions({
                color: colorScheme.getColorable()
            });
        }
    }

    $: colorSchemeChanged(colorScheme);
</script>

<div>
    <button bind:this={element} style="background-color:{color}" class:hide></button>
</div>

<style>
    button {
        width: 100%;
        height: var(--control-height);
    }
    .hide {
        display: none;
    }
    :global(.picker_wrapper button) {
        color: #333;
    }
</style>