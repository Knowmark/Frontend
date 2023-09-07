<script>
  import { fade, slide } from "svelte/transition";
  import IoIosClose from "svelte-icons/io/IoIosClose.svelte";

  export let visible = false;
  export let onHide = () => {};
  export let timeout = 7000;

  export let color = "--color-error-hue";

  $: style = `--snack-color:var(${color});`;
  $: if (visible && timeout) {
    setTimeout(onHide, timeout);
  }
</script>

{#if visible}
  <div class="snackbar" {style} in:slide out:fade>
    <slot />
    <div class="icon" on:click={onHide}><IoIosClose /></div>
  </div>
{/if}

<style>
  .snackbar {
    display: flex;
    align-items: center;
    gap: 1ch;

    position: absolute;
    bottom: 0;
    right: 0;

    width: fit-content;
    max-width: calc(100vw - 2rem);
    max-width: calc(100svw - 2rem);
    background-color: hsl(var(--snack-color), 50%, 80%);
    color: hsl(var(--snack-color), 50%, 10%);
    border: 2px solid hsl(var(--snack-color), 50%, 60%);
    border-radius: 1ch;

    margin: 1ch;
    padding: 1ch;

    z-index: 1000;
  }
  .icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    color: hsl(var(--snack-color), 50%, 40%);
    background-color: hsl(var(--snack-color), 50%, 70%);
    border: 2px solid hsl(var(--snack-color), 50%, 40%);
    border-radius: 1ch;
  }
  .icon:hover {
    color: hsl(var(--snack-color), 50%, 50%);
    background-color: hsl(var(--snack-color), 50%, 75%);
    border-color: hsl(var(--snack-color), 50%, 50%);
  }
  .icon:active {
    color: hsl(var(--snack-color), 50%, 45%);
    background-color: hsl(var(--snack-color), 50%, 72%);
    border-color: hsl(var(--snack-color), 50%, 45%);
  }
</style>
