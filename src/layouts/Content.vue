<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>User</a-breadcrumb-item>
      <a-breadcrumb-item>Bill</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', height: '100%' }">
      <slot></slot>
    </div>
  </a-layout-content>
</template>

<script>
export default {
  name: "content",
};
</script>

<style scoped></style>
