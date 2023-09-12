<script lang="ts">
  import type { PartAnswerOneOfBool } from "../lib/api";
  import { _ } from "../lib/i18n";
  import { rand_string } from "../lib/util";

  export var data: PartAnswerOneOfBool;

  var group_name = rand_string();
</script>

<div>
  <input
    type="radio"
    id={"yes-" + group_name}
    name={"answer-" + group_name}
    value="true"
    checked={data.answer === true}
    on:change={() => (data.answer = true)}
  />
  <label class="select-label" for={"yes-" + group_name}
    >{$_("quiz.answer_yes")}</label
  >
  <input
    type="radio"
    id={"no-" + group_name}
    name={"answer-" + group_name}
    value="false"
    checked={data.answer === false}
    on:change={() => (data.answer = false)}
  />
  <label class="select-label" for={"no-" + group_name}
    >{$_("quiz.answer_no")}</label
  >
</div>
