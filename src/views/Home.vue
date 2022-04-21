<template>
  <a-layout style="min-height: 100vh">
    <Slider />
    <a-layout>
      <Header />
      <Content>
        <router-view />
      </Content>
      <Footer />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Footer from "@/layouts/Footer.vue";
import Content from "@/layouts/Content.vue";
import Slider from "@/layouts/Slider.vue";
import Header from "@/layouts/Header.vue";

export default defineComponent({
  components: {
    Footer,
    Content,
    Header,
    Slider,
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(["1"]),
    };
  },
});
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
