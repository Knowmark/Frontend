<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "../lib/i18n";

  var quizTitle = "Draft";

  onMount(() => {
    const parents = Array.from(document.querySelectorAll(".content-field")).map(
      (it) => it.parentElement
    );
    for (const parent of parents) {
      parent.classList.add("has-content-field");
      for (const node of parent.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          const newly = [];
          const text = node.textContent;
          const words = text.split(" ");
          for (const word of words) {
            if (word.length === 0) continue;
            const span = document.createElement("span");
            span.textContent = word;
            span.classList.add("word");
            newly.push(span);
          }
          node.replaceWith(...newly);
        }
      }
    }
  });
</script>

<h1>
  {$_("label.quiz_name")}
  <span class="content-field" bind:innerText={quizTitle} contenteditable />
</h1>

<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum
  neque malesuada cursus hendrerit. Vestibulum sit amet magna in sapien
  facilisis commodo. Quisque rutrum laoreet nisi id efficitur. Proin in nisl in
  erat ornare accumsan. Proin vulputate nibh nibh, quis volutpat orci ultrices
  a. Proin nec cursus tellus, quis pharetra massa. Proin auctor sodales
  consequat.
</p>

<p>
  Nunc justo <span class="content-field" contenteditable />, congue at velit
  eget, euismod placerat magna. Vivamus tristique justo in arcu
  <span class="content-field" contenteditable />, sed accumsan neque tristique.
  Etiam non ante dolor. In in lacinia odio. Vivamus metus ex, laoreet quis massa
  ut, lobortis sagittis leo. Suspendisse vitae arcu sit amet lorem gravida
  ultrices sed sed nisl. Donec eget dui eros.
</p>

<p>
  Quisque tincidunt ante nibh, quis <span
    class="content-field"
    contenteditable
  /> tortor fermentum quis. Proin faucibus urna metus, nec scelerisque metus porta
  eu. Quisque finibus ipsum non nibh viverra vestibulum. In mattis bibendum mi, non
  varius magna molestie interdum. Pellentesque ullamcorper nisi a ante pretium cursus.
  Cras arcu urna, porta sit amet nibh ut, suscipit suscipit est. Nunc scelerisque
  consequat pellentesque. Duis scelerisque eros id massa consectetur ullamcorper.
  Nullam urna orci, blandit vel consequat vel, hendrerit ut leo. Nunc at mi at purus
  rhoncus laoreet quis sit amet augue. Proin neque sem, tincidunt in tempor eget,
  viverra eget arcu. Ut sem neque, consequat ac felis et, ultrices porttitor quam.
  Integer pulvinar viverra eros eu eleifend. Suspendisse sed ipsum euismod, vulputate
  magna ut, semper tellus. Sed sodales justo orci, ac tincidunt orci malesuada eget.
</p>

<p>
  Proin dui elit, scelerisque quis feugiat nec, interdum pulvinar augue.
  Phasellus in placerat ligula. Morbi feugiat mi ac convallis pharetra. Morbi
  venenatis erat eu pulvinar <span class="content-field" contenteditable />. Sed
  odio purus, pretium sed tortor at, hendrerit accumsan libero. Ut sed elit nec
  felis bibendum finibus mattis eu risus. Proin eu porta neque. Nam ultricies
  ante id semper <span class="content-field" contenteditable />. Suspendisse
  potenti.
</p>

<p>
  Duis tincidunt consectetur imperdiet. In nisi magna, tempus quis pretium eget,
  interdum ac sem. Praesent eget elit sit amet justo laoreet euismod euismod nec
  sem. Etiam et tellus purus. Morbi suscipit viverra nulla, non aliquet quam
  fringilla at. Vivamus tempus sem sapien, eu mattis eros porttitor id.
  Vestibulum pulvinar dictum risus quis condimentum. In eu volutpat velit.
  Aliquam sodales mauris ut leo dapibus auctor.
</p>

<style lang="sass">
:global(.has-content-field)
    display: flex
    flex-wrap: wrap

    span + span:before
    display: block
    content: " "

</style>
