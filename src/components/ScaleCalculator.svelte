<script lang="ts">
  let output_size = { w: 1920, h: 1080, ar: 1 }
  let screen_size = { w: 1920, h: 1080, ar: 1 }
  let scaled_size = { w: 1, h: 1, ar: 1 }
  
  $: output_size.ar = output_size.w / output_size.h
  $: screen_size.ar = screen_size.w / screen_size.h

  $: if (screen_size.ar >= output_size.ar) {
    scaled_size = {
      w: output_size.w,
      h: Math.ceil(output_size.w / screen_size.ar),
      ar: 1
    }
  } else {
    scaled_size = {
      w: Math.ceil(output_size.w / screen_size.ar),
      h: output_size.h,
      ar: 1,
    }
  }

  $: scaled_size.ar = scaled_size.w / scaled_size.h
</script>

<div class="wrapper flow">
  <h2>Computer Output Size</h2>
  <div><input type="number" bind:value={output_size.w}> &times; <input type="number" bind:value={output_size.h}></div>
  <p>AR<sub>output</sub> = {output_size.w} / {output_size.h} = {output_size.ar.toLocaleString(undefined, { maximumFractionDigits: 3 })}</p>
  
  <h2>Physical Screen Size</h2>
  <div><input type="number" bind:value={screen_size.w}> &times; <input type="number" bind:value={screen_size.h}></div>
  <p>AR<sub>screen</sub> = {screen_size.w} / {screen_size.h} = {screen_size.ar.toLocaleString(undefined, { maximumFractionDigits: 3 })}</p>
  
  <h2>Parameters</h2>
  <dl>
    <dt>Capture Width</dt>
    <dd>{scaled_size.w}</dd>
    <dt>Capture Height</dt>
    <dd>{scaled_size.h}</dd>
    <dt>X-Offset</dt>
    <dd>{scaled_size.w != output_size.w ? (output_size.w - scaled_size.w) / 2 : 0}</dd>
    <dt>Y-Offset</dt>
    <dd>{scaled_size.h != output_size.h ? (output_size.h - scaled_size.h) / 2 : 0}</dd>
  </dl>
  <p>AR<sub>scaled</sub>* = {scaled_size.w} / {scaled_size.h} = {scaled_size.ar.toLocaleString(undefined, { maximumFractionDigits: 3 })}</p>
  <p>
    <small>
      * Height is rounded to the pixel value, so the scaled aspect ratio will sometimes be a
      little smaller than the screen's true aspect ratio.
    </small>
  </p>
</div>

<style>
  :root {
    --color-dark: hsl(0, 0%, 12%);
    --color-light: hsl(0, 0%, 97%);
    --color-primary: #00b0f0;
    --size-step-0: clamp(1rem, calc(0.96rem + 0.22vw), 1.13rem);
    --size-step-1: clamp(1.25rem, calc(1.16rem + 0.43vw), 1.5rem);
    --size-step-2: clamp(1.56rem, calc(1.41rem + 0.76vw), 2rem);
    --size-step-3: clamp(1.95rem, calc(1.71rem + 1.24vw), 2.66rem);
    --size-step-4: clamp(2.44rem, calc(2.05rem + 1.93vw), 3.55rem);
  }

  h2 {
    font-size: var(--size-step-3);
    max-width: 28ch;
    font-weight: 800;
    line-height: 1.1;
    text-wrap: balance;
  }

  input {
    width: 8ch;
  }

  dl {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, auto);
    grid-auto-flow: column;
  }

  dd {
    font-family: 'Inconsolata', monospace;
  }

  dt {
    font-weight: 600;
  }

  div:has( > input) {
    font-size: 1.25rem;
  }

  .wrapper {
    border: 2px solid var(--color-dark);
    border-radius: 1.5rem;
    padding: 1.5rem;
    
    background-color: white;
  }

  .flow > * + * {
    margin-block-start: var(--flow-space, 1em);
  }

  :is(h1, h2, h3) + * {
    --flow-space: 0.5em;
  }
</style>
