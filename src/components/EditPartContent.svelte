<script lang="ts">
  import { _ } from "../lib/i18n";
  import { TextArea } from "carbon-components-svelte";
  import type { QuizPartOneOfContent } from "../lib/api";

  export var data: QuizPartOneOfContent;
</script>

<div class="content">
  <input
    type="text"
    class="title content-field"
    bind:value={data.title}
    placeholder={$_("quiz.part_title")}
  />
  <TextArea bind:value={data.text} labelText={$_("quiz.part_text")} />
</div>

<style lang="sass">
  .content
    input.title
      font-size: var(--text-large)
    >:global(.bx--form-item textarea)
        width: 100%
        min-height: 5rem
        resize: vertical
</style>
