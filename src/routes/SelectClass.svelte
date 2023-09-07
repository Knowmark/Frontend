<script lang="ts">
  import { link } from "svelte-spa-router";
  import { Role } from "../lib/api";
  import { _ } from "../lib/i18n";
  import { user, type User } from "../lib/user";
</script>

<h1>{$_("nav.classes")}</h1>

{#if $user && ($user.user_role === Role.Author || $user.user_role === Role.Admin)}
  <a href="/class/new" use:link class="button">{$_("action.create")}</a>
{/if}
