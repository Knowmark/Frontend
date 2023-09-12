<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { _ } from "../lib/i18n";
  import { TextArea } from "carbon-components-svelte";
  import type { QuizPartOneOf1Question } from "../lib/api";
  import EditQuestionBool from "./EditQuestionBool.svelte";

  export var data: QuizPartOneOf1Question;
</script>

<div class="select">
  <TextArea
    id="question"
    bind:value={data.text}
    labelText={$_("quiz.question")}
  />
  {#if "Bool" in data.kind}
    <EditQuestionBool bind:data={data.kind.Bool} />
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
