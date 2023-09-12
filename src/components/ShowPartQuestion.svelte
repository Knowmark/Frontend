<script lang="ts">
  import { _ } from "../lib/i18n";
  import { TextArea } from "carbon-components-svelte";
  import type {
    PartAnswer,
    QuizPart,
    QuizPartOneOf1Question,
  } from "../lib/api";
  import ShowQuestionBool from "./ShowQuestionBool.svelte";

  export var data: QuizPartOneOf1Question;
  export var answer: PartAnswer;
</script>

<div class="select">
  <p>{data.text}</p>
  {#if "Bool" in data.kind}
    <ShowQuestionBool bind:data={answer.Bool} />
  {:else}
    <p>Unhandled question kind!</p>
  {/if}
</div>

<style lang="sass">
    .select
      label[for="question"]
        font-size: var(--text-large)
      >:global(.bx--form-item textarea)
        width: 100%
        min-height: 5rem
        resize: vertical
</style>
