<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "../lib/i18n";
  import QuestionEdit from "../components/QuestionEdit.svelte";
  import { PartType } from "../lib/wip";
  import { error } from "../lib/log";
  import { API_V1 } from "../lib/const";
  import type { Quiz } from "../lib/api";
  import type { User } from "../lib/user";

  var name = $_("class.draft");
  var owner: string | null = null;

  var errors = [];

  var users = {};

  function onTitleChange() {}

  function createClass() {
    API_V1.classCreate({ name, owner });
  }

  onMount(() => {});
</script>

<form class="create-class" method="post" on:submit={createClass}>
  <h1>{$_("class.create")}</h1>

  <label for="class_name">{$_("label.name")}</label>
  <input
    type="text"
    name="class_name"
    placeholder={$_("label.class_name")}
    bind:value={name}
  />

  <label for="class_owner">{$_("label.owner")}</label>
  <select bind:value={owner}>
    <option value={null} />
  </select>

  {#if errors.length > 0}
    <ul class="errors">
      {#each errors as err}
        <li>{err}</li>
      {/each}
    </ul>
  {/if}

  <input type="submit" value={$_("action.finish")} />
</form>

<style lang="sass">
.create-class
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
