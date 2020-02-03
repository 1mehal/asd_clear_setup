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
import currentUserRemoteGreeting from '../gql/currentUserRemoteGreeting'

export default {
  computed: mapGetters(['currentUser']),
  auth_required: true,
  data() {
    return {
      error: null
    }
  },
  apollo: {
    remoteGreeting: {
      query: currentUserRemoteGreeting,
      update: (data) => data.currentUserRemoteGreeting,
      error(error) {
        this.error = error.message
      }
    }
  }
}
</script>
