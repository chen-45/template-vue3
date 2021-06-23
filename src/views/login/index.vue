<template>
  <div class="login">
    <div class="login-container">
      <div class="top">
        <div class="top-logo">
          <img src="../../assets/login-logo.png" alt="" srcset="">
        </div>
        <div class="top-desc">中台前端模板</div>
      </div>
      <el-form ref="loginRef" :rules="rules" :model="formData">
        <el-form-item prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名">
            <template #prefix>
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入用密码"
            type="password"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            type="primary"
            block
            @click.prevent="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { getConfig } from '@/api/user'
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  readonly,
  ref,

} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const formData = reactive({
      username: 'admin',
      password: 'admin',
    })
    const loginRef = ref(null)
    const rules = readonly({
      username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    })

    const redirect = computed(() => route.query.redirect)

    function handleLogin () {
      // loginRef.value.resetFields()

      loginRef.value.validate(async (valid) => {
        if (valid) {
          try {
            await store.dispatch('user/login', formData)
            router.push((redirect.value as string) || '/')
          } catch (error) {
            console.log('error', error)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    onMounted(() => {
      getConfig()
    })
    return {
      formData,
      rules,
      handleLogin,
      loginRef,
    }
  },
})
</script>

  <style lang='less' scoped>
.login {
  background: url(../../assets/login-bg.svg) 50% 100% no-repeat;
  // background-image: url(../img/body.8aa7c4a6.svg);
  // background-repeat: no-repeat;
  // background-position: 50%;
  // background-size: 100%;
  height: 100vh;
  overflow: auto;

  .login-container {
    text-align: center;
    width: 384px;
    margin: 0 auto;

    height: 100%;
    .top {
      padding: 32px 0;
      .top-logo {
        img {
          height: 75px;
        }
      }
      .top-desc {
        font-size: 14px;
        color: #808695;
      }
    }
  }
  @media screen and (max-width: 576px) {
    .login-container {
      width: 95%;
    }
  }
  @media (min-width: 768px) {
    .login-container {
      padding: 32px 10px 24px 10px;
    }
  }
}
</style>
