<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-card
        class="box-card"
        shadow="hover"
        header="Login as an existing user"
      >
        <el-form ref="user" :model="user" :rules="rules">
          <el-form-item prop="username" label="User Name" required>
            <el-input
              v-model="user.username"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" label="Password" required>
            <el-input
              v-model="user.password"
              prefix-icon="el-icon-key"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-link icon="el-icon-plus" type="primary" href="register">
              Register a new user
            </el-link>
          </el-form-item>
          <el-form-item v-if="error">
            <el-alert :title="errorMessage" type="error" show-icon> </el-alert>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" type="primary">Login</el-button>
            <el-button @click="onCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import LOGIN from '../../gql/login'

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      error: false,
      errorMessage: '',
      rules: {
        userName: [
          {
            min: 3,
            max: 5,
            message: 'Username should be 3 to 5 letters long',
            trigger: ['blur', 'change']
          },
          {
            required: true,
            message: 'Please enter you desired username',
            trigger: ['blur']
          }
        ],
        password: [
          {
            required: true,
            message: 'Please enter your password',
            trigger: 'blur'
          },
          { min: 10, message: 'Your password has to be 10 symbols minimum!' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$apollo
        .mutate({
          mutation: LOGIN,
          variables: this.user
        })
        .then(({ data, errors }) => {
          this.$apolloHelpers.onLogin(data.login.token)
          this.$router.push('/')
        })
        .catch((error) => {
          this.error = true
          this.errorMessage = error.message
        })
    },
    onCancel() {
      this.$router.go(-1)
    }
  }
}
</script>
