<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-row>
      <a-col :push="20">
        <span class="avatar"
          ><a-avatar :size="32" :src="avatar" />
          <span style="margin: 0 10px; vertical-align: middle">{{
            this.$store.state.users.profile.username
          }}</span>
          <span @click="logout">退出登录</span>
        </span>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script lang="ts">
// import { UserOutlined } from "@ant-design/icons-vue";
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
export default defineComponent({
  components: {
    // UserOutlined,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const avatar = computed(() => store.state.users.profile.avatar);

    // 退出登录
    function logout() {
      // 退出登录
      store.commit("users/logout");
      // 提示用户退出成功
      message.success("退出登录成功");
      // 跳转到登录页面
      router.push("/login");
    }
    return {
      avatar,
      logout,
    };
  },
});
</script>

<style scoped lang="scss">
.avatar {
  display: inline-block;
  vertical-align: middle;
  padding: 0 8px;
  transition: all 0.4s;
  color: #595959;
  &:hover {
    background-color: rgba(128, 128, 128, 0.1);
    cursor: pointer;
  }
}
</style>
