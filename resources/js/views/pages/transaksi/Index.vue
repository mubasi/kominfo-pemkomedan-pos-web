<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        Transaksi
        <div class="card-header-actions" style="height: 21px">
          <b-button variant="success" size="sm" @click="reloadPage">
            <i class="fa fa-refresh"
          /></b-button>
          <!-- <router-link :to="'/panel/master-data/kategori-produk/add'" class="btn btn-sm btn-primary"><i
                            class="fa fa-edit" /> Entry Data</router-link> -->
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody v-if="users && users.data.length > 0">
            <tr v-for="(user, index) in users.data" :key="index">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td align="center" colspan="3">No record found.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination
        align="center"
        :data="users"
        @pagination-change-page="list"
      ></pagination>
    </b-card>
  </div>
</template>

<script>
import pagination from "laravel-vue-pagination";
import moment from "moment";
import axios from "axios"; //IMPORT AXIOS
export default {
  name: "transaksiProduk",
  components: {
    pagination,
  },
  data: function () {
    return {
      path: "/api/transaksi",
      path_produk: "/api/produk",
      meta: [], //JUGA BERLAKU UNTUK META
      current_page: 1, //DEFAULT PAGE YANG AKTIF ADA PAGE 1
      per_page: 10, //DEFAULT LOAD PERPAGE ADALAH 10
      search: "",
      sortBy: "id", //DEFAULT SORTNYA ADALAH CREATED_AT
      sortByDesc: false, //ASCEDING
      isBusy: false,
    };
  },
  methods: {
    async list(page = 1) {
      this.isBusy = true;
      await axios
        .get(this.path_produk, {
          params: {
            page: current_page,
            per_page: this.per_page,
            q: this.search,
            sortby: this.sortBy,
            sortbydesc: this.sortByDesc ? "DESC" : "ASC",
          },
        })
        .then((response) => {
          this.isBusy = false;
          //JIKA RESPONSENYA DITERIMA
          let getData = response.data.data;
          this.meta = {
            total: getData.total,
            current_page: getData.current_page,
            per_page: getData.per_page,
            from: getData.from,
            to: getData.to,
          };
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
    reloadPage() {},
  },
  mounted() {
    this.list();
  },
};
</script>
