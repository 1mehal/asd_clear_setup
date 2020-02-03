<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-card
        class="box-card"
        shadow="hover"
        header="Demonstrate remote greeting"
      >
        <div v-if="$apollo.loading">Loading...</div>
        <h3>{{ remoteGreeting }}</h3>
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
  apollo: {
    remoteGreeting: {
      query: currentUserRemoteGreeting,
      update: (data) => data.currentUserRemoteGreeting.message
    }
  }
}
</script>
