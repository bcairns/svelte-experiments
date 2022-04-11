<script>
    export let paused = false;
</script>

<span class:paused></span>

<style>
    span {
        display: inline-block;
        background-color: var(--color);
        width: 0.7em;
        height: 0.1em;
        position: relative;
        bottom: -2px;
        left: 1px;

        animation-name: blink;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
    }
    .paused {
        animation-play-state: paused;
    }

    @keyframes blink {
        0% {
            opacity: 0;
        }
        30% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        80% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>