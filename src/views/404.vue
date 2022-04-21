<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary" @click="this.$router.push('/home')"
        >回到首页</a-button
      >
    </template>
  </a-result>
</template>

<script>
export default {
  name: "404.vue",
};
</script>

<style scoped></style>
