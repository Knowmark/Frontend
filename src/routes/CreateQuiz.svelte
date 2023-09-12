<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "../lib/i18n";
  import QuestionEdit from "../components/QuestionEdit.svelte";
  import { PartTypeName, QuestionTypeName, part_defaults } from "../lib/wip";
  import { error } from "../lib/log";
  import { API_V1 } from "../lib/const";
  import type { Quiz } from "../lib/api";
  import { user } from "../lib/user";
  import { TextArea } from "carbon-components-svelte";
  import { push } from "svelte-spa-router";

  var quizTitle = $_("quiz.draft");

  var quizDesc = "";

  var parts = [];

  function toData(): Quiz {
    return {
      name: quizTitle,
      desc: quizDesc,
      author: $user.id,
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
    quizDesc = loaded.desc;
    parts = loaded.parts;
  }

  const invalidTitleChars = /[\n]/gi;
  function onTitleChange(e: any) {
    quizTitle = quizTitle.replaceAll(invalidTitleChars, "");
    storeData();
  }

  function createPart(
    part_kind: PartTypeName,
    question_type?: QuestionTypeName
  ) {
    return () => {
      parts = [...parts, part_defaults(part_kind, question_type)];
      storeData();
    };
  }

  function removePart(index: number) {
    return () => {
      parts.splice(index, 1);
      parts = parts;
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

  let saveInterval;

  function createQuiz() {
    if (!validateQuiz()) return;

    API_V1.quizCreate(toData()).then(() => {
      if (saveInterval) clearInterval(saveInterval);
      saveInterval = null;
      localStorage.removeItem("new_quiz");
      push("/quiz");
    });
  }

  onMount(() => {
    loadData();

    saveInterval = setInterval(() => {
      storeData();
    }, 5000);

    return () => {
      if (saveInterval) clearInterval(saveInterval);
      saveInterval = null;
    };
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

  <TextArea bind:value={quizDesc} labelText={$_("quiz.desc")} />

  {#each parts as section, i (section)}
    <QuestionEdit bind:data={section} on:remove={removePart(i)} />
  {/each}

  <div class="pick-kind">
    <button on:click={createPart(PartTypeName.Content)}
      >{$_("quiz.new_content_part")}</button
    >
    <button on:click={createPart(PartTypeName.Question, QuestionTypeName.Bool)}
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

.pick-kind
  justify-content: center

h1
  display: flex
  gap: 1ch

.errors
  margin: var(--gap-small) var(--gap-large)
  li
    color: var(--color-error-500)

</style>
