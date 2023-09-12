<script lang="ts">
  import { _ } from "../lib/i18n";
  import { TextArea } from "carbon-components-svelte";
  import type { QuizPartOneOfContent } from "../lib/api";

  export var data: QuizPartOneOfContent;
</script>

<div class="content">
  <h2>{data.title}</h2>
  <p>{data.text}</p>
</div>

<style lang="sass">
    .content
        margin-bottom: 2rem
</style>
