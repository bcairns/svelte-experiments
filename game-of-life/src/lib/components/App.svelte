<script>
    const COLS = 60;
    const ROWS = 40;
    const CELL_SIZE = 16;

    // const COLS = 20;
    // const ROWS = 8;
    // const CELL_SIZE = 30;

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

    // get next grid state (next "frame" of animation)
    function getNextGrid(prevGrid) {
        const nextFrameIndex = getNextFrameIndex();
        const newCells = frames[nextFrameIndex];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                newCells[r][c] = getNextCellState(prevGrid, r, c);
            }
        }
        return newCells;
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
        cells = getNextGrid(cells);
        currentFrame = getNextFrameIndex();
    }

    function clear() {
        cells = getEmptyGrid(COLS, ROWS);
    }

    function randomizeCells() {
        const percent = parseFloat(randomizePercentStr) / 100;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                cells[r][c] = ( Math.random() < percent );
            }
        }
        cells = cells;
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
            advanceFrame();
            timeout = setTimeout(playLoop, frameDurationMS);
        }
    }
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
    <div class="grid" style:--col-count={COLS} style:--size={CELL_SIZE + 'px'} class:playing style="--col-count={COLS}">
        {#each cells as row, r}
            {#each row as cell, c}
                <div class="cell" class:alive={cells[r][c]}
                     on:mousedown={() => {cells[r][c] = !cells[r][c]; dragging = true; drawing = cells[r][c]}}
                     on:mouseenter={() => {if (dragging) cells[r][c] = drawing}}
                ></div>
            {/each}
        {/each}
    </div>
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
    .grid {
        display: inline-grid;
        grid-template-columns: repeat(var(--col-count), min-content);
        /*gap: 1px;*/
        border: 2px solid #ccc;
        /*padding: 2px;*/
        margin-top: .5em;
        padding: 1px 0 0 1px;
    }
    .controls {
        display: flex;
        justify-content: space-between;
    }
    .playing {
        border-color: green;
    }
    .cell {
        background: #eee;
        width: var(--size);
        height: var(--size);
        cursor: pointer;
        border-right: 1px solid white;
        border-bottom: 1px solid white;
    }
    .alive {
        background: green;
    }
</style>