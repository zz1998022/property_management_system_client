<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo" />
    <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
      <a-menu-item key="1">
        <CodeOutlined />
        <span>控制台</span>
      </a-menu-item>
      <a-menu-item key="2">
        <desktop-outlined />
        <span>Option 2</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #title>
          <span>
            <user-outlined />
            <span>User</span>
          </span>
        </template>
        <a-menu-item key="3">Tom</a-menu-item>
        <a-menu-item key="4">Bill</a-menu-item>
        <a-menu-item key="5">Alex</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span>
            <team-outlined />
            <span>Team</span>
          </span>
        </template>
        <a-menu-item key="6">Team 1</a-menu-item>
        <a-menu-item key="8">Team 2</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="9">
        <file-outlined />
        <span>File</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import {
  CodeOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Slider",
  components: {
    CodeOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
  },
  setup() {
    const collapsed = ref(false);
    const selectedKeys = ref(["1"]);
    return {
      collapsed,
      selectedKeys,
    };
  },
});
</script>

<style scoped></style>
