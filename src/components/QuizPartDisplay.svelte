<script lang="ts">
  import type { PartAnswer, QuizPart } from "../lib/api";
  import { PartTypeName } from "../lib/wip";
  import ShowPartContent from "./ShowPartContent.svelte";
  import ShowPartQuestion from "./ShowPartQuestion.svelte";

  export var data: QuizPart;

  export var answer: PartAnswer | null;
</script>

<div class="part content">
  {#if PartTypeName.Content in data}
    <ShowPartContent bind:data={data.Content} />
  {:else if PartTypeName.Question in data}
    <ShowPartQuestion bind:data={data.Question} bind:answer on:change />
  {:else}
    <p>Invalid segment!</p>
  {/if}
</div>
