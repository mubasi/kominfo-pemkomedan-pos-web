<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="8">
        <b-card>
          <div slot="header">
            Daftar Produk
            <div class="card-header-actions" style="height: 21px">
              <b-button variant="success" size="sm" @click="reloadPage">
                <i class="fa fa-refresh"
              /></b-button>
              <!-- <router-link :to="'/panel/master-data/kategori-produk/add'" class="btn btn-sm btn-primary"><i
                            class="fa fa-edit" /> Entry Data</router-link> -->
            </div>
          </div>
          <b-row v-if="items.length > 0 && !isBusy">
            <b-col md="4" sm="6" v-for="(item, index) in items" :key="index">
              <b-card
                :title="item.nama"
                img-top
                tag="article"
                style="max-width: 20rem"
                class="mb-2"
              >
                <b-card-img
                  v-if="item.gambar_produk.length > 0"
                  :src="meta.url + '/' + item.gambar_produk[0].path"
                  :alt="item.nama"
                  height="100rem"
                >
                </b-card-img>
                <b-card-img
                  v-else
                  src="/images/image-not-found.png"
                  :alt="item.nama"
                  height="100rem"
                >
                </b-card-img>
                <b-card-text class="mb-2">
                  {{ formatRupiah(item.harga, "Rp.") }}
                </b-card-text>

                <b-button block type="button" variant="primary"
                  >Pilih Produk</b-button
                >
              </b-card>
            </b-col>
          </b-row>
          <b-row v-else-if="items.length == 0 && !isBusy">
            <b-col md="12">
              <h6 class="text-center">Produk tidak tersedia</h6>
            </b-col>
          </b-row>
          <b-row v-else>
            <b-col md="12" class="center"> Silahkan tunggu . . . </b-col>
          </b-row>
          <div class="text-center mt-5">
            <b-button
              @click="changePage('prev')"
              :disabled="meta.prev_page_url == null"
              variant="secondary"
              >Previous</b-button
            >
            <span class="mx-2"
              >Page {{ meta.current_page }} of {{ meta.total }}</span
            >
            <b-button
              @click="changePage('next')"
              :disabled="meta.next_page_url == null"
              variant="secondary"
              >Next</b-button
            >
          </div>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card>
          <div slot="header">Daftar Belanja</div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios"; //IMPORT AXIOS
export default {
  name: "transaksiProduk",
  components: {},
  data: function () {
    return {
      path: "/api/transaksi",
      path_produk: "/api/produk",
      items: [],
      meta: [], //JUGA BERLAKU UNTUK META
      current_page: 1, //DEFAULT PAGE YANG AKTIF ADA PAGE 1
      per_page: 12, //DEFAULT LOAD PERPAGE ADALAH 10
      search: "",
      sortBy: "nama", //DEFAULT SORTNYA ADALAH CREATED_AT
      sortByDesc: false, //ASCEDING
      isBusy: false,
    };
  },
  methods: {
    /* Fungsi formatRupiah */
    formatRupiah(angka, prefix) {
      var number_string = angka.replace(/[^,\d]/g, "").toString(),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

      // tambahkan titik jika yang di input sudah menjadi angka ribuan
      if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }

      rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
      return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
    },
    changePage(status) {
      if (status == "next") {
        this.current_page += 1;
      } else if (status == "prev") {
        this.current_page -= 1;
      }
      this.loadData();
    },
    async loadData() {
      this.isBusy = true;
      let current_page = this.search == "" ? this.current_page : 1;
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
          this.items = getData.data;
          this.meta = {
            total: getData.total,
            current_page: getData.current_page,
            per_page: getData.per_page,
            from: getData.from,
            to: getData.to,
            prev_page_url: getData.prev_page_url,
            next_page_url: getData.next_page_url,
            url: response.data.url,
          };
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
    reloadPage() {
      this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
