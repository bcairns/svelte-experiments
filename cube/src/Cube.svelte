<script>
    export let size;
    export let spinDuration;
    export let perspective;
    export let radius;

    // hover vars
    export let hoverRadius;
    export let faceRotation;
</script>

<div class="scene" style="--size:20px"
     style:--size={size}px
     style:--spin-duration={spinDuration}s
     style:--perspective={perspective}px
     style:--radius-factor={radius}
     style:--hover-radius-factor={hoverRadius}
     style:--face-rotation={faceRotation}deg
>

    <div class="cube">
        <div class="front face">Front</div>
        <div class="left face">Left</div>
        <div class="back face">Back</div>
        <div class="right face">Right</div>
        <div class="top face">Top</div>
        <div class="bottom face">Bottom</div>
    </div>

</div>

<style>
    /* vars */
    .scene {
        --radius-base: calc(var(--size)/2);
        --radius: calc(var(--radius-base) * var(--radius-factor));
        --z-axis: 0deg;
        --opacity: 1;
        --border-radius: 0;
    }
    .scene:hover {
        --radius: calc(var(--radius-base) * var(--hover-radius-factor));
        --z-axis: var(--face-rotation);
        --opacity: 0.7;
        --border-radius: 40px;
    }

    .face {
        --rotation: rotateY(0);
        --bg: #eee;
    }
    .left {
        --rotation: rotateY(-90deg);
    }
    .back {
        --rotation: rotateY(180deg);
    }
    .right {
        --rotation: rotateY(90deg);
    }
    .top {
        --rotation: rotateX(90deg);
    }
    .bottom {
        --rotation: rotateX(-90deg);
    }
    .scene:hover .left {
        --bg: #f00;
    }
    .scene:hover .back {
        --bg: #00f;
    }
    .scene:hover .right {
        --bg: #ff0;
    }
    .scene:hover .top {
        --bg: #f0f;
    }
    .scene:hover .bottom {
        --bg: #0ff;
    }


    /* styles */

    @keyframes spin {
        from {
            transform: rotateY(0);
        }
        to {
            transform: rotateY(360deg);
        }
    }

    .scene {
        width: var(--size);
        height: var(--size);

        perspective: var(--perspective);
        perspective-origin: 50% -50%;

        padding: 100px 100px 130px;
    }

    .cube {
        width: var(--size);
        height: var(--size);
        transform-style: preserve-3d;
        position: relative;
        animation: infinite var(--spin-duration) linear spin;
    }

    .face {
        position: absolute;
        width: var(--size);
        height: var(--size);

        opacity: var(--opacity);
        transform: var(--rotation) translateZ(var(--radius)) rotateZ(var(--z-axis));
        transition: all 0.5s;

        background: var(--bg);
        text-align: center;
        line-height: var(--size);
        border: 2px solid #aaa;
        border-radius: var(--border-radius);
        font-size: 32px;

    }

    .front {
        background-color: #0f0;
    }
</style>