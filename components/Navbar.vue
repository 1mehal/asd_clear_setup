<template>
  <el-menu mode="horizontal" router>
    <el-menu-item v-if="!currentUser" index="/auth/login">
      <el-avatar src="/user_icon.png" shape="square"></el-avatar>
      Login
    </el-menu-item>
    <el-menu-item v-if="currentUser" @click="onLogout">
      <el-avatar src="/user_icon.png" shape="square"></el-avatar>
      Logout as {{ currentUser.username }}
    </el-menu-item>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['currentUser']),
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout()
      this.$router.go('/auth/login')
    }
  }
}
</script>
