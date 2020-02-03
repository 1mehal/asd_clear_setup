<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-card class="box-card" shadow="hover" header="Register a new user">
        <el-form ref="user" :model="user" :rules="rules">
          <el-form-item prop="username" label="User Name" required>
            <el-input
              v-model="user.username"
              prefix-icon="el-icon-user"
              required
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" label="Password" required>
            <el-input
              v-model="user.password"
              prefix-icon="el-icon-key"
              required
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="passwordConfirmation"
            label="Confirm password"
            required
          >
            <el-input
              v-model="user.passwordConfirmation"
              prefix-icon="el-icon-key"
              required
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item v-if="error">
            <el-alert :title="error" type="error" show-icon> </el-alert>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" type="primary">
              Register
            </el-button>
            <el-button @click="onCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import createUser from '../../gql/createUser'

export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (!/\d/.test(value)) {
        callback(new Error('Password should contain a number'))
      } else if (!/[a-z]/.test(value)) {
        callback(new Error('Password should contain a lowercase letter'))
      } else if (!/[A-Z]/.test(value)) {
        callback(new Error('Password should contain an uppercase letter'))
        // eslint-disable-next-line no-useless-escape
      } else if (!/[!@#\$%\^\&*\)\(+=._-]/.test(value)) {
        callback(new Error('Password should contain a special symbol'))
      } else {
        callback()
      }
    }
    const validatePasswordConfirmation = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.user.password) {
        callback(new Error("Your confirmation don't match password!"))
      } else {
        callback()
      }
    }
    return {
      user: {
        username: '',
        password: '',
        passwordConfirmation: ''
      },
      error: false,
      rules: {
        userName: [
          {
            min: 3,
            max: 50,
            message: 'Username should be 3 to 50 letters long',
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
          { min: 10, message: 'Your password has to be 10 symbols minimum!' },
          {
            validator: validatePassword,
            trigger: 'blur'
          }
        ],
        passwordConfirmation: [
          {
            validator: validatePasswordConfirmation,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.$apollo
            .mutate({
              mutation: createUser,
              variables: this.user
            })
            .then(({ data }) => {
              this.$message({
                message: `Congrats, ${this.user.username} has been created`,
                type: 'success',
                duration: 5000
              })
              this.$router.push('/auth/login')
            })
            .catch((error) => {
              this.error = error.message
            })
        }
      })
    },
    onCancel() {
      this.$router.go(-1)
    }
  }
}
</script>
