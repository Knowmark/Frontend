<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { _ } from "../lib/i18n";
  import { PartType } from "../lib/wip";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import { TextArea } from "carbon-components-svelte";

  export var data: Record<string, any>;
  var part_index: number = data && data.index;
  var part_type: PartType = data && data.type;

  const dispatch = createEventDispatcher();

  function handleChange() {
    const data = {
      index: part_index,
      type: part_type,
      text: text,
    };

    if (part_type === PartType.Content) {
      data["title"] = title;
    } else if (part_type === PartType.Interact) {
      data["kind"] = { t: "Bool" };
      data["value"] = 1.0;
      data["validation"] = { value: answer === "true" };
    }

    dispatch("change", data);
  }

  function removepart() {
    part_type = null;
    handleChange();
  }

  var title: string = (data && data.title) || "";
  var text: string = (data && data.text) || "";
  var answer: string =
    (data &&
      data.validation &&
      data.validation.value != null &&
      data.validation.value.toString()) ||
    "true";

  $: radioid = text
    .split("")
    .filter((it) => it.match(/[^a-zA-Z0-9]/))
    .join("");

  function handleSelect(e) {
    answer = e.target.value;
    handleChange();
  }
</script>

{#if part_type == PartType.Content}
  <div class="part content">
    <input
      type="text"
      class="title content-field"
      bind:value={title}
      on:change={handleChange}
      placeholder={$_("quiz.part_title")}
    />
    <TextArea
      bind:value={text}
      on:change={handleChange}
      labelText={$_("quiz.part_text")}
    />
    <button class="error remove" on:click={removepart}><MdClose /></button>
  </div>
{:else if part_type == PartType.Interact}
  <div class="part select">
    <label for="question">{$_("quiz.question") + ":"}</label>
    <input
      type="text"
      name="question"
      bind:value={text}
      on:change={handleChange}
    />
    <input
      type="radio"
      id={radioid + "-yes"}
      name="answer"
      value="true"
      checked={answer == "true"}
      on:change={handleSelect}
    />
    <label class="select-label" for={radioid + "-yes"}
      >{$_("quiz.answer_yes")}</label
    >
    <input
      type="radio"
      id={radioid + "-no"}
      name="answer"
      value="false"
      checked={answer == "false"}
      on:change={handleSelect}
    />
    <label class="select-label" for={radioid + "-no"}
      >{$_("quiz.answer_no")}</label
    >
    <button class="error remove" on:click={removepart}><MdClose /></button>
  </div>
{/if}

<style lang="sass">
.part
  display: grid
  grid-template-columns: auto 1fr auto
  gap: var(--gap-small)
  align-items: center

  background: var(--color-bg-elevated-1)
  border-radius: var(--gap-tiny)
  padding: var(--gap-small)
  
  button.remove
    grid-area: 1 / 3 / 2 / 4
    display: grid
    width: 2rem
    height: 2rem

  &.select
    label[for="question"]
      font-size: var(--text-large)
    input[name="question"]
      font-size: var(--text-large)
    input[type="radio"]
      justify-self: end
    .select-label
      grid-column: 2 / 4

  &.content
    input.title
      font-size: var(--text-large)
      grid-column: 1 / 3
    >:global(.bx--form-item)
      grid-column: 1 / 4

    >:global(.bx--form-item textarea)
        width: 100%
        min-height: 5rem
        resize: vertical
</style>
