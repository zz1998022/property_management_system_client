<template>
  <a-layout class="login-page">
    <a-layout-content>
      <a-row>
        <a-col :span="8" :offset="8">
          <div class="login">
            <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane key="1" tab="登录">
                <a-form
                  ref="loginRef"
                  :model="formState"
                  :rules="loginRules"
                  layout="horizontal"
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                >
                  <a-form-item label="用户名" name="username">
                    <a-input
                      v-model:value="formState.username"
                      class="login-input"
                    >
                      <template #prefix>
                        <user-outlined type="user" />
                      </template>
                    </a-input>
                  </a-form-item>
                  <a-form-item name="password" label="密码">
                    <a-input
                      v-model:value="formState.password"
                      class="login-input"
                      type="password"
                    >
                      <template #prefix>
                        <LockOutlined />
                      </template>
                    </a-input>
                  </a-form-item>
                  <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
                    <a-button
                      class="login-btn"
                      type="primary"
                      @click="loginSubmit"
                      :loading="loginLoading"
                      >登录</a-button
                    >
                    <a-button class="register-btn" style="margin-left: 10px"
                      >注册</a-button
                    >
                  </a-form-item>
                </a-form>
              </a-tab-pane>
              <a-tab-pane key="2" tab="注册">
                <a-form
                  ref="regRef"
                  :model="registerState"
                  :rules="regRule"
                  layout="horizontal"
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                >
                  <a-form-item has-feedback label="用户名" name="username">
                    <a-input
                      v-model:value="registerState.username"
                      class="login-input"
                    >
                      <template #prefix>
                        <user-outlined type="user" />
                      </template>
                    </a-input>
                  </a-form-item>
                  <a-form-item has-feedback name="password" label="密码">
                    <a-input
                      v-model:value="registerState.password"
                      class="login-input"
                      type="password"
                    >
                      <template #prefix>
                        <LockOutlined />
                      </template>
                    </a-input>
                  </a-form-item>
                  <a-form-item has-feedback name="conPassword" label="确认密码">
                    <a-input
                      v-model:value="registerState.conPassword"
                      class="login-input"
                      type="password"
                    >
                      <template #prefix>
                        <LockOutlined />
                      </template>
                    </a-input>
                  </a-form-item>
                  <a-form-item has-feedback name="email" label="邮箱">
                    <a-input
                      v-model:value="registerState.email"
                      class="login-input"
                    >
                      <template #prefix>
                        <MailOutlined />
                      </template>
                    </a-input>
                  </a-form-item>
                  <a-form-item>
                    <a-button
                      class="register-btn"
                      style="margin-left: 10px"
                      @click="regSubmit"
                      >注册</a-button
                    >
                  </a-form-item>
                </a-form>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  UnwrapRef,
} from "vue";
import { useStore } from "vuex";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import { usersLogin, usersRegister } from "@/api/users";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { RuleObject } from "ant-design-vue/es/form/interface";

interface FormState {
  username: string;
  password: string;
}

export default defineComponent({
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup() {
    const activeKey = ref("1");
    // 更改key
    const changeKey = () => {
      activeKey.value = "1";
    };
    // 登录状态
    const loginLoading = ref(false);
    // 登录
    const { formState, loginSubmit, loginRules, loginRef } =
      useLogin(loginLoading);
    // 注册
    const { regRef, regSubmit, registerState, regRule } =
      useRegister(changeKey);

    onMounted(() => {
      // 给window添加键盘事件
      window.onkeydown = function (e: KeyboardEvent) {
        if (e.keyCode === 13) {
          loginSubmit();
        }
      };
    });

    onUnmounted(() => {
      // 移除事件
      window.onkeydown = null;
    });

    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      formState,
      loginSubmit,
      loginRules,
      loginRef,
      loginLoading,
      activeKey,
      regRef,
      registerState,
      regRule,
      regSubmit,
    };
  },
});

// 登录
function useLogin(loginLoading: UnwrapRef<any>) {
  const store = useStore();
  const router = useRouter();
  const loginRef = ref();
  // 表单数据
  const formState: UnwrapRef<FormState> = reactive({
    username: "",
    password: "",
  });

  // 校验规则
  const loginRules = {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 5, max: 20, message: "用户名长度在5-20" },
    ],
    password: [
      {
        required: true,
        message: "请输入密码",
        trigger: "blur",
      },
      {
        min: 5,
        max: 20,
        message: "密码长度在5-20",
      },
    ],
  };

  // 登录事件
  const loginSubmit = () => {
    loginLoading.value = true;
    loginRef.value
      .validate()
      .then(() => {
        // 发送请求
        usersLogin(formState.username, formState.password).then((res: any) => {
          // 判断是否登录成功
          if (res.code === 200) {
            // 将个人信息储存到vuex里
            store.commit("users/setProfile", res.profile);
            message.success(res.msg);
            console.log(res.profile.token);
            loginLoading.value = false;
            // 跳转到主页
            router.push("/home");
            return;
          }
          message.error(res.msg);
          loginLoading.value = false;
        });
      })
      .catch(() => {
        loginLoading.value = false;
        console.log("登录失败");
      });
  };

  return {
    formState,
    loginSubmit,
    loginRef,
    loginRules,
  };
}

// 注册
function useRegister(changeKey: any) {
  interface RegState {
    username: string;
    password: string;
    conPassword: string;
    email: string;
  }
  const regRef = ref();
  // 注册数据
  const registerState: UnwrapRef<RegState> = reactive({
    username: "",
    password: "",
    conPassword: "",
    email: "",
  });
  // 创建校验规则
  // 确认密码校验规则
  let checkPassword = async (rule: RuleObject, value: string) => {
    if (value && value !== registerState.password) {
      return Promise.reject("两次输入的密码不一致");
    }
    return Promise.resolve();
  };
  // 邮箱校验规则
  let checkEmail = async (rule: RuleObject, value: string) => {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    // 判断用户输入的是否是邮箱
    if (reg.exec(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject("请输入正确的邮箱");
    }
  };
  const regRule = {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 5, max: 20, message: "用户名长度在5-20" },
    ],
    password: [
      {
        required: true,
        message: "请输入密码",
        trigger: "blur",
      },
      {
        min: 5,
        max: 20,
        message: "密码长度在5-20",
      },
    ],
    conPassword: [
      {
        validator: checkPassword,
        trigger: "blur",
      },
    ],
    email: {
      validator: checkEmail,
      trigger: "blur",
    },
  };

  // 注册提交
  const regSubmit = () => {
    regRef.value
      .validate()
      .then(() => {
        // 发送请求
        usersRegister({
          username: registerState["username"],
          password: registerState["password"],
          email: registerState["email"],
        }).then((res: any) => {
          if (res.success) {
            regRef.value.resetFields();
            changeKey();
            return message.success(res.msg);
            // 注册成功跳转到登录页
          }
          return message.error(res.msg);
        });
      })
      .catch((res: any) => {
        message.error(res.message);
      });
  };

  return {
    regRef,
    registerState,
    regRule,
    regSubmit,
  };
}
</script>

<style scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-size: cover;
}

.login {
  width: 400px;
  padding: 30px 10px;
  margin: 150px auto 0;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.login-btn,
.register-btn {
  border-radius: 5px;
}

.login-input {
  border-radius: 8px;
}

.register-btn {
  background-color: #42b983;
  color: #fff;
}

.register-btn:hover {
  color: #fff;
  border-color: #42b983;
}
</style>
