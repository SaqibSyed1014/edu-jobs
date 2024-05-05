<script setup lang="ts">
onMounted(() => {
  const scriptEle = document.createElement('script');
  scriptEle.setAttribute('src','https://embed.ycb.me');
  scriptEle.setAttribute('async','true');
  scriptEle.setAttribute('data-domain','edujobs');

  const demoForm = document.getElementById('demo-request-form');
  if (demoForm) demoForm.appendChild(scriptEle);
})
</script>

<template>
  <section class="demo-request-page">
    <div class="container pt-6">
      <div id="demo-request-form"></div>
    </div>
  </section>
</template>
