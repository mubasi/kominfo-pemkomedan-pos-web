<template>
<div class="animated fadeIn">
    <b-card>
        <div slot="header">
            Riwayat Transaksi
            <div class="card-header-actions" style="height: 21px">
                <download-excel class="btn btn-sm btn-success" :data="items" :fields="column_table" name="export-excel.xls">
                    Download Excel
                </download-excel>
                <b-button variant="warning" size="sm" @click="dialogRekap">
                    Rekap Transaksi
                </b-button>
                <b-button variant="primary" size="sm" @click="reloadPage">
                    <i class="fa fa-refresh" />
                </b-button>
                <!-- <router-link :to="'/panel/master-data/pengguna/add'" class="btn btn-sm btn-primary"><i
                            class="fa fa-edit" /> Entry Data</router-link> -->
            </div>
        </div>
        <b-row>
            <b-col md="5">
                <label>Tanggal Mulai</label>
                <b-form-input v-model="start_date" type="date"></b-form-input>
            </b-col>
            <b-col md="5">
                <label>Tanggal Akhir</label>
                <b-form-input v-model="end_date" type="date"></b-form-input>
            </b-col>
            <b-col>
                <label>#</label> <br />
                <b-button block variant="success" @click="reloadPage">Proses</b-button>
            </b-col>
        </b-row>
        <hr />
        <app-datatable v-if="fields" :editUrl="'/panel/master-data/pengguna/'" :printBelanja="printBelanja" :isBusy="isBusy" :items="items" :fields="fields" :meta="meta" :formatRupiah="formatRupiah" @per_page="handlePerPage" @pagination="handlePagination" @search="handleSearch" @sort="handleSort" />
        <div class="text-center" v-else>
            <b-spinner variant="success" label="Spinning"></b-spinner>
            <br />
            <span>Silahkan Tunggu . . .</span>
        </div>
    </b-card>

    <b-modal ref="dialogRekap" size="lg" hide-footer title="Rekap Transaksi">
        <b-container>
            <b-card no-body>
                <b-tabs pills card vertical>
                    <b-tab title="Hari Ini" active>
                        <b-card-text>Hari ini "{{ formatDay(day_select) }}"</b-card-text>
                        <b-form-input v-model="day_select" type="date"></b-form-input>
                        <b-button type="submit" variant="primary" size="sm" @click="showDataRekap('day')" class="mt-1 mb-1">Proses</b-button>
                        <table class="table"  v-if="dataRekapDay != null">
                            <tr>
                                <th>Total Transaksi</th>
                                <th>Total Penjualan</th>
                                <th>Total Modal</th>
                                <th>Total Pendapatan</th>
                            </tr>
                            <tr>
                                <td>
                                    {{ dataRekapDay.total }}
                                </td>
                                <td>
                                    Rp. {{ dataRekapDay.harga }}
                                </td>
                                <td>
                                    Rp. {{ dataRekapDay.modal }}
                                </td>
                                <td>
                                    Rp. {{ dataRekapDay.pendapatan }}
                                </td>
                            </tr>
                        </table>
                    </b-tab>
                    <b-tab title="Per Bulan">
                        <b-card-text>Bulan {{ month_select }}</b-card-text>
                        <b-form-input v-model="month_select" type="month"></b-form-input>
                        <b-button type="submit" variant="primary" size="sm" @click="showDataRekap('month')" class="mt-1">Proses</b-button>
                        <table class="table" v-if="dataRekapMonth != null">
                            <tr>
                                <th>Total Transaksi</th>
                                <th>Total Penjualan</th>
                                <th>Total Modal</th>
                                <th>Total Pendapatan</th>
                            </tr>
                            <tr>
                                <td>
                                    {{ dataRekapMonth.total }}
                                </td>
                                <td>
                                    Rp. {{ dataRekapMonth.harga }}
                                </td>
                                <td>
                                    Rp. {{ dataRekapMonth.modal }}
                                </td>
                                <td>
                                    Rp. {{ dataRekapMonth.pendapatan }}
                                </td>
                            </tr>
                        </table>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-container>
    </b-modal>
</div>
</template>

<script>
var numeral = require("numeral");
import moment from "moment";
import Datatable from "./TableInfo.vue"; //IMPORT COMPONENT DATATABLENYA
import axios from "axios"; //IMPORT AXIOS

import JsonExcel from "vue-json-excel";
export default {
    name: "info",
    components: {
        "app-datatable": Datatable, //REGISTER COMPONENT DATATABLE,
        downloadExcel: JsonExcel,
    },
    data: function () {
        return {
            //UNTUK VARIABLE FIELDS, DEFINISIKAN KEY UNTUK MASING-MASING DATA DAN SORTABLE BERNILAI TRUE JIKA INGIN MENAKTIFKAN FITUR SORTING DAN FALSE JIKA TIDAK INGIN MENGAKTIFKAN
            fields: [{
                    key: "index",
                    label: "No",
                    sortable: true,
                },
                {
                    key: "created_at",
                    label: "Tanggal dan Waktu",
                    formatter: (value, key, item) => {
                        return this.formatDate(value);
                    },
                    sortable: true,
                },
                {
                    key: "kode_transaksi",
                    label: "Kode Transaksi",
                    sortable: true,
                },
                {
                    key: "nama_pembeli",
                    label: "Nama",
                    formatter: (value, key, item) => {
                        return value == null ? "-" : value;
                    },
                    sortable: true,
                },
                {
                    key: "no_hp",
                    label: "No HP",
                    formatter: (value, key, item) => {
                        return value == null ? "-" : value;
                    },
                    sortable: true,
                },
                {
                    key: "total_modal",
                    label: "Total Modal",
                    formatter: (value, key, item) => {
                        return this.formatRupiah(value, "Rp.");
                    },
                    sortable: true,
                },
                {
                    key: "total_harga",
                    label: "Total Harga",
                    formatter: (value, key, item) => {
                        return this.formatRupiah(value, "Rp.");
                    },
                    sortable: true,
                },
                {
                    key: "actions",
                    label: "Actions",
                }, //TAMBAHKAN CODE INI
            ],
            column_table: {
                "Tanggal dan Waktu": {
                    field: "created_at",
                    callback: (value) => {
                        return this.formatDate(value);
                    },
                },
                "Kode Transaksi": "kode_transaksi",
                Nama: {
                    field: "nama_pembeli",
                    callback: (value) => {
                        return value == null ? "-" : value;
                    },
                },
                "No HP": {
                    field: "no_hp",
                    callback: (value) => {
                        return value == null ? "-" : value;
                    },
                },
                "Total Modal": {
                    field: "total_modal",
                    callback: (value) => {
                        return this.formatRupiah(value, "Rp.");
                    },
                },
                "Total Harga": {
                    field: "total_harga",
                    callback: (value) => {
                        return this.formatRupiah(value, "Rp.");
                    },
                },
            },
            json_meta: [
                [{
                    key: "charset",
                    value: "utf-8",
                }, ],
            ],
            items: [], //DEFAULT VALUE DARI ITEMS ADALAH KOSONG
            meta: [], //JUGA BERLAKU UNTUK META
            current_page: 1, //DEFAULT PAGE YANG AKTIF ADA PAGE 1
            per_page: 10, //DEFAULT LOAD PERPAGE ADALAH 10
            search: "",
            sortBy: "id", //DEFAULT SORTNYA ADALAH CREATED_AT
            sortByDesc: false, //ASCEDING
            start_date: null,
            day_select: null,
            month_select: null,
            end_date: null,
            isBusy: false,
            dataRekapDay: null,
            dataRekapMonth: null,
            path: "/api/riwayat-transaksi",
            path_rekap: "/api/rekap-transaksi",
        };
    },
    methods: {
        /* Fungsi formatRupiah */
        formatRupiah(angka, prefix) {
            let result = numeral(angka).format("0,0");
            return "" + prefix + " " + result;
        },
        formatDate(value) {
            if (value) {
                return moment(String(value)).format("DD/MM/YYYY hh:mm");
            }
        },
        formatDay(value) {
            if (value) {
                return moment(String(value)).format("DD/MM/YYYY");
            }
        },
        deleteRow(id) {
            this.$swal({
                title: "Peringatan",
                icon: "warning",
                text: "Apakah anda yakin ingin menghapus data ini?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                focusConfirm: false,
                confirmButtonText: "Proses",
            }).then((result) => {
                if (result.value) {
                    // alert('Helo')
                    this.prosesDelete(id);
                }
            });
        },
        printBelanja(status, id) {
            if (status == "print") {
                window.open("/api/transaksi/stuck/print/" + id, "_blank");
            } else {
                this.$swal({
                    title: "Silahkan Tunggu . . .",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    onBeforeOpen: () => {
                        this.$swal.showLoading();
                    },
                });

                axios
                    .get("/api/transaksi/stuck/sendmail/" + id)
                    .then((response) => {
                        this.$swal({
                            title: "Email Berhasil Dikirim",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.value) {
                                this.loadPostsData();
                                // self.$route
                                // this.$router.go('/galery');
                            }
                        });
                    })
                    .catch((error) => {
                        // console.log(error.response);
                        this.$swal({
                            type: "error",
                            title: error.response.data.msg,
                            allowOutsideClick: false,
                        });
                    });
            }
        },
        prosesDelete(id) {
            this.$swal({
                title: "Silahkan Tunggu . . .",
                showConfirmButton: false,
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    this.$swal.showLoading();
                },
            });

            axios
                .delete(this.path + "/" + id)
                .then((response) => {
                    this.$swal({
                        title: "Data Berhasil Dihapus",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.value) {
                            this.loadPostsData();
                            // self.$route
                            // this.$router.go('/galery');
                        }
                    });
                })
                .catch((error) => {
                    this.$swal({
                        type: "error",
                        title: "Silahkan Coba Lagi!",
                        allowOutsideClick: false,
                    });
                });
        },
        //METHOD INI AKAN MENGHANDLE REQUEST DATA KE API
        loadPostsData() {
            this.isBusy = true;
            let current_page = this.search == "" ? this.current_page : 1;
            //LAKUKAN REQUEST KE API UNTUK MENGAMBIL DATA POSTINGAN
            axios
                .get(this.path, {
                    //KIRIMKAN PARAMETER BERUPA PAGE YANG SEDANG DILOAD, PENCARIAN, LOAD PERPAGE DAN SORTING.
                    params: {
                        page: current_page,
                        per_page: this.per_page,
                        q: this.search,
                        sortby: this.sortBy,
                        start_date: this.start_date,
                        end_date: this.end_date,
                        sortbydesc: this.sortByDesc ? "DESC" : "ASC",
                    },
                })
                .then((response) => {
                    this.isBusy = false;
                    //JIKA RESPONSENYA DITERIMA
                    let getData = response.data.data;
                    this.items = getData.data; //MAKA ASSIGN DATA POSTINGAN KE DALAM VARIABLE ITEMS
                    //DAN ASSIGN INFORMASI LAINNYA KE DALAM VARIABLE META
                    this.meta = {
                        total: getData.total,
                        current_page: getData.current_page,
                        per_page: getData.per_page,
                        from: getData.from,
                        to: getData.to,
                    };
                });
        },

        //METHOD INI AKAN MENGHANDLE REQUEST DATA KE API
        loadGetDataRekap(type) {
            this.isBusy = true;
            axios
                .get(this.path_rekap, {
                    //KIRIMKAN PARAMETER BERUPA PAGE YANG SEDANG DILOAD, PENCARIAN, LOAD PERPAGE DAN SORTING.
                    params: {
                        day: this.day_select,
                        month: this.month_select,
                        type: type
                    },
                })
                .then((response) => {
                    this.isBusy = false;
                    let getData = response.data.data;
                    let harga = getData.harga == null ? 0 : getData.harga;
                    let modal = getData.modal == null ? 0 : getData.modal;
                    let pendapatan = harga - modal;

                    if (type == "day") {

                        this.dataRekapDay = {
                            harga: harga,
                            modal: modal,
                            total: getData.total,
                            pendapatan: pendapatan,
                        };
                    }

                    if (type == "month") {

                        this.dataRekapMonth = {
                            harga: harga,
                            modal: modal,
                            total: getData.total,
                            pendapatan: pendapatan,
                        }
                    }
                });
        },

        //JIKA ADA EMIT TERKAIT LOAD PERPAGE, MAKA FUNGSI INI AKAN DIJALANKAN
        handlePerPage(val) {
            this.per_page = val; //SET PER_PAGE DENGAN VALUE YANG DIKIRIM DARI EMIT
            this.loadPostsData(); //DAN REQUEST DATA BARU KE SERVER
        },

        //JIKA ADA EMIT PAGINATION YANG DIKIRIM, MAKA FUNGSI INI AKAN DIEKSEKUSI
        handlePagination(val) {
            this.current_page = val; //SET CURRENT PAGE YANG AKTIF
            this.loadPostsData();
        },
        //JIKA ADA DATA PENCARIAN
        handleSearch(val) {
            this.search = val; //SET VALUE PENCARIAN KE VARIABLE SEARCH
            this.loadPostsData(); //REQUEST DATA BARU
        },
        //JIKA ADA EMIT SORT
        handleSort(val) {
            //MAKA SET SORT-NYA
            this.sortBy = val.sortBy;
            this.sortByDesc = val.sortDesc;

            this.loadPostsData(); //DAN LOAD DATA BARU BERDASARKAN SORT
        },
        reloadPage() {
            // alert('Hello');
            this.loadPostsData();
        },
        getDate() {
            const today = new Date();
            const date = today.getFullYear() + '-' + (this.formatUnderTen(today.getMonth() + 1)) + '-' + this.formatUnderTen(today.getDate());
            const monthDate = today.getFullYear() + '-' + (this.formatUnderTen(today.getMonth() + 1));
            this.day_select = date;
            this.month_select = monthDate;
        },
        formatUnderTen(number) {
            return number < 10 ? "0" + number : number;
        },
        showDataRekap(type) {
            this.loadGetDataRekap(type)
        },
        dialogRekap() {
            this.$refs["dialogRekap"].show();
        },
    },
    mounted() {
        this.getDate();
        this.loadPostsData();
    },
};
</script>
