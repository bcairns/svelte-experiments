<script>
    import { onMount } from 'svelte';

    const GAP_SIZE = 0;

    // stress test
    // const COLS = 180;
    // const ROWS = 100;
    // const CELL_SIZE = 5;

    const COLS = 1200;
    const ROWS = 700;
    const CELL_SIZE = 1;

    // const COLS = 20;
    // const ROWS = 8;
    // const CELL_SIZE = 30;

    let width = COLS * ( CELL_SIZE + GAP_SIZE ) - GAP_SIZE;
    let height = ROWS * ( CELL_SIZE + GAP_SIZE ) - GAP_SIZE;

    let canvas;
    let context2d;


    const frames = [
        getEmptyGrid(COLS, ROWS),
        getEmptyGrid(COLS, ROWS)
    ];

    let currentFrame = 0;

    let cells = frames[currentFrame];

    let randomizePercentStr = '35';
    let playing = false;
    let frameDurationMS = 400;
    let interval;
    let timeout;

    let dragging = false;
    let drawing = false; // whether we are drawing or erasing (while dragging)

    function getEmptyGrid(w, h) {
        const rows = [];
        for (let row = 0; row < h; row++) {
            rows.push(new Array(w).fill(false));
        }
        return rows;
    }

    function getNextFrameIndex() {
        return currentFrame ? 0 : 1;
    }

    function renderCell(r, c, isAlive) {
        context2d.fillStyle = isAlive ? 'green' : '#eee';
        context2d.fillRect(c*(CELL_SIZE+GAP_SIZE), r*(CELL_SIZE+GAP_SIZE), CELL_SIZE, CELL_SIZE);
    }

    function renderAll() {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                renderCell(r, c, frames[currentFrame][r][c]);
            }
        }
    }

    // render next grid state (next "frame" of animation)
    function renderNextFrame(prevGrid) {
        const nextFrameIndex = getNextFrameIndex();
        // const newCells = frames[nextFrameIndex];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                frames[nextFrameIndex][r][c] = getNextCellState(prevGrid, r, c);

                if (frames[nextFrameIndex][r][c] !== prevGrid[r][c]) {
                    context2d.fillStyle = frames[nextFrameIndex][r][c] ? 'green' : '#eee';
                    context2d.fillRect(c*(CELL_SIZE+GAP_SIZE), r*(CELL_SIZE+GAP_SIZE), CELL_SIZE, CELL_SIZE);
                }
            }
        }
        // return newCells;
    }

    // get next on/off state for a given cell in a grid
    function getNextCellState(grid, r, c) {
        const neighbors = getNeighborCount(grid, r, c);
        if (neighbors <= 1 || neighbors >= 4) {
            return false;
        }
        if (neighbors === 3) {
            return true;
        }
        return grid[r][c];
    }

    // count # of adjacent alive cells (stops at 4)
    function getNeighborCount(grid, cellRow, cellCol) {
        let count = 0;
        for (let r = Math.max(0, cellRow - 1); r <= Math.min(ROWS - 1, cellRow + 1); r++) {
            for (let c = Math.max(0, cellCol - 1); c <= Math.min(COLS - 1, cellCol + 1); c++) {
                if (grid[r][c] === true && (r !== cellRow || c !== cellCol)) {
                    if (++count >= 4) {
                        return count;
                    }
                }
            }
        }
        return count;
    }

    function advanceFrame() {
        renderNextFrame(frames[currentFrame]);
        currentFrame = getNextFrameIndex();
    }

    function clear() {
        frames[currentFrame] = getEmptyGrid(COLS, ROWS);
        renderAll();
    }

    function randomizeCells() {
        const percent = parseFloat(randomizePercentStr) / 100;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                frames[currentFrame][r][c] = ( Math.random() < percent );
            }
        }
        renderAll();
    }

    function playPause() {
        if (playing) {
            playing = false;
            clearTimeout(timeout);
        } else {
            playing = true;
            playLoop();
        }
    }

    function playLoop() {
        if (playing) {
            timeout = setTimeout(playLoop, frameDurationMS);
            advanceFrame();
        }
    }

    onMount(() => {
        context2d = canvas.getContext('2d');
        renderAll();
    });
</script>

<main>
    <h1>Game of Life!</h1>
    <div class="controls">
        <div class="start">
            <button on:click={playPause}>Play / Pause</button>
            <button on:click={advanceFrame}>Next Frame</button>
        </div>
        <div class="middle">
            <button on:click={clear}>Clear</button>
            <button on:click={randomizeCells}>Randomize</button>
            <input bind:value={randomizePercentStr} size="4"/>%
        </div>
        <div class="end">
            Frame Duration <input bind:value={frameDurationMS} size="4" /> ms
        </div>
    </div>
    <canvas {width} {height} class:playing bind:this={canvas}></canvas>
</main>

<svelte:body on:mouseup={() => dragging = false} />

<style>
    :global(body) {
        text-align: center;
    }
    main {
        display: inline-grid;
        place-items: center stretch;
        margin: 0 auto;
    }
    h1 {
        margin: 1rem 0;
    }
    canvas {
        border: 2px solid #ccc;
        margin-top: .5em;
        padding: 1px;
    }
    .controls {
        display: flex;
        justify-content: space-between;
    }
    .playing {
        border-color: green;
    }
</style>