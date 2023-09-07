<script lang="ts">
  import ChevronRight from "svelte-icons/md/MdChevronRight.svelte";
  import { nav_items } from "../routes";
  import { _ } from "../lib/i18n";
  import { location } from "svelte-spa-router";

  const lastCollapsed =
    window.localStorage &&
    window.localStorage.getItem("nav.collapsed") === "true";

  export var expanded = !lastCollapsed;

  function toggleExpanded(e: MouseEvent | KeyboardEvent) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") {
        return;
      }
    }

    expanded = !expanded;

    window.localStorage &&
      window.localStorage.setItem("nav.collapsed", JSON.stringify(!expanded));
  }
</script>

<nav
  style={`--nav-width:var(${
    expanded ? "--nav-width-expanded" : "--nav-width-collapsed"
  })`}
  class={expanded ? "expanded" : undefined}
>
  <ul>
    {#each $nav_items as { path, name, icon }, i}
      <li>
        <a
          tabindex={i + 1}
          href={"#" + path}
          class={`nav-link ${$location === path ? "current" : undefined}`}
        >
          <div class="icon">
            <svelte:component this={icon} />
          </div>
          <p>{$_(name)}</p>
        </a>
      </li>
    {/each}
  </ul>
  <div
    class="expand-button"
    role="button"
    tabindex={$nav_items.length + 1}
    on:click={toggleExpanded}
    on:keyup={toggleExpanded}
  >
    <div>
      <ChevronRight />
    </div>
  </div>
</nav>

<style lang="sass">
nav
    display: flex
    flex-direction: column
    justify-content: space-between
    width: var(--nav-width, --nav-width-expanded)

    background: var(--color-accent-500)
    border-right: 2px solid var(--color-accent-400)

    --expand-duration: 200ms
    --hover-duration: 200ms

    --icon-size: 2.5rem
    --name-size: 1.25rem

    transition: var(--expand-duration) width ease-in-out

    .nav-link
        position: relative
        display: flex

        text-decoration: none
        color: var(--color-accent-200)

        --margin-size: calc((var(--nav-width-collapsed) - var(--icon-size)) / 2 - 1px)

        transition: var(--hover-duration) background linear, var(--hover-duration) color linear

        &:hover,
        &:focus
            background: var(--color-accent-300)
            color: var(--color-accent-900)
            p
                background: var(--color-accent-200)
                color: var(--color-accent-800)

        &:active,
        &.current
            background: var(--color-accent-200)
            color: var(--color-accent-900)
            p
                color: var(--color-accent-900)
    
        .icon
            width: var(--icon-size)
            height: var(--icon-size)
            margin: var(--margin-size)
        p
            position: absolute
            left: calc(var(--nav-width-collapsed) + 1ch)
            top: calc(var(--margin-size) + var(--icon-size) / 2)
            transform: translateY(-50%)

            font-size: var(--name-size)
            color: var(--color-accent-50)
            
            opacity: 0

            padding: 0 0.5ch
            border-radius: 0.5ch
            pointer-events: none

        &:hover
            p
                opacity: 1

    .expand-button
        display: flex
        justify-content: flex-end

        background: var(--color-accent-400)
        color: var(--color-accent-200)

        height: var(--icon-size)

        cursor: pointer

        div
            height: 100%
            transition: var(--expand-duration) transform ease-in-out, var(--expand-duration) margin ease-in-out

    &.expanded
        .nav-link
            p
                background: none
                opacity: 1
                pointer-events: initial
        .expand-button
            margin-right: 0
            div
                transform: rotateZ(180deg)

</style>
