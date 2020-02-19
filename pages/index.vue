<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-card
        v-loading="$apollo.loading"
        element-loading-text="Loading remote greeting ..."
        element-loading-spinner="el-icon-loading"
        class="box-card"
        shadow="hover"
        header="Demonstrate remote greeting"
      >
        <h3 v-if="remoteGreeting">{{ remoteGreeting.message }}</h3>
        <el-alert v-if="error" :title="error" type="error" show-icon>
        </el-alert>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex'
import CURRENT_USER_REMOTE_GREETING from '../gql/currentUserRemoteGreeting'

export default {
  auth_required: true,
  data() {
    return {
      remoteGreeting: '',
      error: ''
    }
  },
  computed: mapGetters(['currentUser']),
  created() {
    this.loadRemoteGreetings()
  },
  methods: {
    loadRemoteGreetings() {
      this.$apollo
        .query({
          query: CURRENT_USER_REMOTE_GREETING
        })
        .then(({ data }) => {
          this.remoteGreeting = data.currentUserRemoteGreeting
        })
        .catch((error) => {
          this.error = error.message
        })
    }
  }
}
</script>
