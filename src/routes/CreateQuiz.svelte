<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "../lib/i18n";
  import QuestionEdit from "../components/QuestionEdit.svelte";
  import { PartType } from "../lib/wip";
  import { error } from "../lib/log";
  import { API_V1 } from "../lib/const";
  import type { Quiz } from "../lib/api";

  var quizTitle = $_("quiz.draft");

  var parts = [];

  function toData(): Quiz {
    return {
      name: quizTitle,
      parts,
    };
  }

  function storeData() {
    localStorage.setItem("new_quiz", JSON.stringify(toData()));
  }

  function loadData() {
    var loaded: any = localStorage.getItem("new_quiz");
    if (!loaded) return;
    loaded = JSON.parse(loaded) as Record<string, any>;
    quizTitle = loaded.name;
    parts = loaded.parts;
  }

  const invalidTitleChars = /[\n]/gi;
  function onTitleChange(e: any) {
    quizTitle = quizTitle.replaceAll(invalidTitleChars, "");
    storeData();
  }

  function onPartChange(e: any) {
    const data = e.detail;
    if (data.type != null) {
      parts[data.index] = data;
    } else {
      let new_sections = [];
      for (const section of parts) {
        if (section.index === data.index) continue;
        let index = section.index;
        if (index > data.index) index--;
        new_sections.push({ ...section, index });
      }
      parts = new_sections;
    }
    storeData();
  }

  function createPart(kind: PartType) {
    return () => {
      parts = [
        ...parts,
        {
          index: parts.length,
          type: kind,
        },
      ];
      storeData();
    };
  }

  let errors = [];

  function validateQuiz() {
    errors = [];
    if (quizTitle.length === 0) {
      errors.push($_("quiz.error.blank_name"));
    }
    if (parts.length === 0) {
      errors.push($_("quiz.error.no_parts"));
    }

    return errors.length === 0;
  }

  function createQuiz() {
    if (!validateQuiz()) return;

    API_V1.quizCreate(toData());
  }

  onMount(() => {
    loadData();
  });
</script>

<div class="create-quiz">
  <h1>
    {$_("label.quiz_name") + ":"}
    <span
      class="content-field"
      bind:innerText={quizTitle}
      contenteditable
      on:keyup={onTitleChange}
      role="textbox"
      tabindex="0"
    />
  </h1>

  {#each parts as section (section)}
    <QuestionEdit data={section} on:change={onPartChange} />
  {/each}

  <div class="pick-kind">
    <button on:click={createPart(PartType.Content)}
      >{$_("quiz.new_content_part")}</button
    >
    <button on:click={createPart(PartType.Interact)}
      >{$_("quiz.new_interact_bool")}</button
    >
  </div>

  {#if errors.length > 0}
    <ul class="errors">
      {#each errors as err}
        <li>{err}</li>
      {/each}
    </ul>
  {/if}

  <button on:click={createQuiz}>{$_("action.finish")}</button>
</div>

<style lang="sass">
.create-quiz
  display: flex
  flex-direction: column
  gap: var(--gap-small)

h1
    display: flex
    gap: 1ch

.errors
  margin: var(--gap-small) var(--gap-large)
  li
    color: var(--color-error-500)

</style>
