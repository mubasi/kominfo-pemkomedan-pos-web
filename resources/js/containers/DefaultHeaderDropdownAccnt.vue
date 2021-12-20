<template>
  <AppHeaderDropdown right no-caret class="mr-3">
    <template slot="header">
      <!-- <img
        src="img/avatars/6.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" /> -->
        <i class="fa fa-user"></i> {{ nama }}
    </template>\
    <template slot="dropdown">
      <!-- <b-dropdown-item><i class="fa fa-shield" /> Lock Account</b-dropdown-item> -->
      <b-dropdown-item @click="logout" ><i class="fa fa-lock"/> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import axios from 'axios'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42, nama: '', }
  },
  mounted() {
    this.profile();
  },
  methods: {
    profile() {
      axios.get('/api/profile').then((response) => {
        let data = response.data;
        // console.log(data);
        this.nama = data.name;
      });
    },
    logout() {
      axios.get('/api/logout').then((e) => {
        console.log(e);
        this.$router.push('/pages/login');
      });
    }
  }
}
</script>
