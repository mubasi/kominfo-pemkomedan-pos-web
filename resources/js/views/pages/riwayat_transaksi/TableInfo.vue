<template>
  <div class="row">

    <!-- BLOCK INI AKAN MENGHANDLE LOAD DATA PERPAGE, DENGAN DEFAULT ADALAH 10 DATA -->
    <div class="col-md-4 mb-2">
      <div class="form-inline">
        <label class="mr-2">Showing</label>
        <!-- KETIKA SELECT BOXNYA DIGANTI, MAKA AKAN MENJALANKAN FUNGSI loadPerPage -->
        <select class="form-control" v-model="meta.per_page" @change="loadPerPage">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="1000">1000</option>
          <option value="10000">10000</option>
        </select>
        <label class="ml-2">Entries</label>
      </div>
    </div>

    <div class="col-md-4 offset-md-4">
      <div class="form-inline float-right">
        <label class="mr-2">Search</label>
        <input type="text" class="form-control" @input="search">
      </div>
    </div>
    <div class="col-md-12">
      <b-table striped hover :formatRupiah="formatRupiah" :items="items" :busy="isBusy" :fields="fields"
        :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" show-empty foot-clone>
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>

        <template slot="index" slot-scope="row">
          {{ row.index + 1 }}
        </template>

        <template slot="role" slot-scope="row">
          <li v-for="(item, index) in row.item.roles" :key="index">
            {{ item.name }}
          </li>
        </template>

        <template slot="active" slot-scope="row">
          <span v-html="row.value"></span>
        </template>

        <template slot="FOOT_total_harga" slot-scope="scope">
          {{ "Rp." + totalHarga() }}
        </template>

        <template slot="FOOT_total_modal" slot-scope="scope">
          {{ "Rp." + totalModal() }}
        </template>

  
        <template slot="actions" slot-scope="row">
          <b-button title="Kirim Email" variant="primary" @click="printBelanja('email', row.item.id)" class="ml-1" size="sm">
            <i class="icon-envelope"></i>
          </b-button>
          <b-button title="Cetak Struk" variant="success" @click="printBelanja('print', row.item.id)" class="ml-1" size="sm">
            <i class="icon-printer"></i>
          </b-button>
        </template>
      </b-table>
    </div>

    <div class="col-md-6">
      <p>Showing {{ meta.from }} to {{ meta.to }} of {{ meta.total }} items</p>
    </div>

    <div class="col-md-6">
      <b-pagination v-model="meta.current_page" :total-rows="meta.total" :per-page="meta.per_page" align="right"
        @change="changePage" aria-controls="dw-datatable"></b-pagination>
    </div>
  </div>
</template>

<script>
import _ from 'lodash' //IMPORT LODASH, DIMANA AKAN DIGUNAKAN UNTUK MEMBUAT DELAY KETIKA KOLOM PENCARIAN DIISI

var numeral = require("numeral");
export default {
  //PROPS INI ADALAH DATA YANG AKAN DIMINTA DARI PENGGUNA COMPONENT DATATABLE YANG KITA BUAT
  props: {
    //ITEMS STRUKTURNYA ADALAH ARRAY, KARENA BAGIAN INI BERISI DATA YANG AKAN DITAMPILKAN DAN SIFATNYA WAJIB DIKIRIMKAN KETIKA COMPONENT INI DIGUNAKAN
    items: {
      type: Array,
      required: true
    },
    //FIELDS JUGA SAMA DENGAN ITEMS
    fields: {
      type: Array,
      required: true
    },
    //ADAPUN META, TYPENYA ADALAH OBJECT YANG BERISI INFORMASI MENGENAL CURRENT PAGE, LOAD PERPAGE, TOTAL DATA, DAN LAIN SEBAGAINYA.
    meta: {
      required: true
    },
    title: {
      type: String,
      default: "Delete Modal"
    },
    editUrl: {
      type: String,
      default: null
    },
    isBusy: {
      type: Boolean,
      required: true
    },
    printBelanja: {
      type: Function,
      require: true
    },
    formatRupiah: {
      type: Function,
      require: true
    }
  },
  data() {
    return {
      //VARIABLE INI AKAN MENGHADLE SORTING DATA
      sortBy: null, //FIELD YANG AKAN DISORT AKAN OTOMATIS DISIMPAN DISINI
      sortDesc: false, //SEDANGKAN JENISNYA ASCENDING ATAU DESC AKAN DISIMPAN DISINI
      deleteModal: false,
      selected: null,
      visibleRows: []
    }
  },
  watch: {
    //KETIKA VALUE DARI VARIABLE sortBy BERUBAH
    sortBy(val) {
      //MAKA KITA EMIT DENGAN NAMA SORT DAN DATANYA ADALAH OBJECT BERUPA VALUE DARI SORTBY DAN SORTDESC
      //EMIT BERARTI MENGIRIMKAN DATA KEPADA PARENT ATAU YANG MEMANGGIL COMPONENT INI
      //SEHINGGA DARI PARENT TERSEBUT, KITA BISA MENGGUNAKAN VALUE YANG DIKIRIMKAN
      this.$emit('sort', {
        sortBy: this.sortBy,
        sortDesc: this.sortDesc
      })
    },
    //KETIKA VALUE DARI SORTDESC BERUBAH
    sortDesc(val) {
      //MAKA CARA YANG SAMA AKAN DIKERJAKAN
      this.$emit('sort', {
        sortBy: this.sortBy,
        sortDesc: this.sortDesc
      })
    }
  },
  methods: {
    //JIKA SELECT BOX DIGANTI, MAKA FUNGSI INI AKAN DIJALANKAN
    loadPerPage(val) {
      //DAN KITA EMIT LAGI DENGAN NAMA per_page DAN VALUE SESUAI PER_PAGE YANG DIPILIH
      this.$emit('per_page', this.meta.per_page)
    },
    //KETIKA PAGINATION BERUBAH, MAKA FUNGSI INI AKAN DIJALANKAN
    changePage(val) {
      //KIRIM EMIT DENGAN NAMA PAGINATION DAN VALUENYA ADALAH HALAMAN YANG DIPILIH OLEH USER
      this.$emit('pagination', val)
    },
    //KETIKA KOTAK PENCARIAN DIISI, MAKA FUNGSI INI AKAN DIJALANKAN
    //KITA GUNAKAN DEBOUNCE UNTUK MEMBUAT DELAY, DIMANA FUNGSI INI AKAN DIJALANKAN
    //500 MIL SECOND SETELAH USER BERHENTI MENGETIK
    search: _.debounce(function (e) {
      //KIRIM EMIT DENGAN NAMA SEARCH DAN VALUE SESUAI YANG DIKETIKKAN OLEH USER
      this.$emit('search', e.target.value)
    }, 500),
    totalModal() {
      return this.items.reduce((accum, item) => {
        let tempResult = parseInt(accum) + parseInt(item.total_modal);
        return tempResult;//numeral(tempResult).format("0,0");
      }, 0.0)
    },
    totalHarga() {
      return this.items.reduce((accum, item) => {
        let tempResult = parseInt(accum) + parseInt(item.total_harga);
        return tempResult;//numeral(tempResult).format("0,0");
      }, 0.0)
    },
    formatData(angka, prefix) {
      let result = numeral(angka).format("0,0");
      return "" + prefix + " " + result;
    },
  }
}
</script>
