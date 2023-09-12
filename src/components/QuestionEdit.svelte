<script lang="ts">
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import type { QuizPart } from "../lib/api";
  import EditPartContent from "./EditPartContent.svelte";
  import EditPartInteract from "./EditPartQuestion.svelte";
  import { createEventDispatcher } from "svelte";
  import { PartTypeName, QuestionTypeName } from "../lib/wip";

  const dispatch = createEventDispatcher();

  export var data: QuizPart;
</script>

<div class="part content">
  {#if PartTypeName.Content in data}
    <EditPartContent bind:data={data.Content} on:change />
  {:else if PartTypeName.Question in data}
    <EditPartInteract bind:data={data.Question} on:change />
  {:else}
    <p>Invalid segment!</p>
  {/if}
  <button class="remove" on:click={() => dispatch("remove")}><MdClose /></button
  >
</div>

<style lang="sass">
.part
  display: flex
  grid-template-columns: auto 1fr auto
  gap: var(--gap-small)
  align-items: flex-start

  background: var(--color-bg-elevated-1)
  border-radius: var(--gap-tiny)
  padding: var(--gap-small)

  :global(:nth-child(1))
    flex-grow: 1
    
  button.remove
    display: grid
    width: 2rem
    height: 2rem
</style>
