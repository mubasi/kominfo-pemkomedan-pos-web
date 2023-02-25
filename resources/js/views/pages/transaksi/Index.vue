<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col md="7">
                <b-card>
                    <div slot="header">
                        Daftar Produk
                        <div class="card-header-actions" style="height: 21px">
                            <b-button
                                variant="success"
                                size="sm"
                                @click="reloadPage"
                            >
                                <i class="fa fa-refresh"
                            /></b-button>
                            <!-- <router-link :to="'/panel/master-data/kategori-produk/add'" class="btn btn-sm btn-primary"><i
                            class="fa fa-edit" /> Entry Data</router-link> -->
                        </div>
                    </div>

                    <b-row class="mb-2">
                        <b-col md="6">
                            <b-form-row class="mb-1">
                                <b-col md="12">
                                    <label class="mt-1">Nama Produk</label>
                                    <b-form-input
                                        v-model="search"
                                        type="text"
                                        placeholder="Cari Nama Produk"
                                    ></b-form-input>
                                </b-col>
                            </b-form-row>
                        </b-col>
                        <b-col md="4">
                            <b-form-row class="mb-1">
                                <b-col md="12">
                                    <label class="mt-1">Kategori Produk</label>
                                    <b-form-select
                                        v-model="kategori"
                                        :options="options_kategori"
                                    ></b-form-select>
                                </b-col>
                            </b-form-row>
                        </b-col>
                        <b-col md="2">
                            <b-form-row class="mb-1">
                                <b-col md="12">
                                    <label class="mt-1">#</label>
                                    <b-button
                                        variant="primary"
                                        @click="reloadPage"
                                        block
                                        >Cari</b-button
                                    >
                                </b-col>
                            </b-form-row>
                        </b-col>
                    </b-row>

                    <hr />

                    <b-row v-if="items.length > 0 && !isBusy">
                        <b-col
                            md="4"
                            sm="6"
                            v-for="(item, index) in items"
                            :key="index"
                        >
                            <b-card
                                :title="item.nama"
                                img-top
                                tag="article"
                                style="max-width: 20rem"
                                class="mb-2"
                            >
                                <b-card-img
                                    v-if="item.gambar_produk.length > 0"
                                    :src="
                                        meta.url +
                                        '/' +
                                        item.gambar_produk[0].path
                                    "
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

                                <b-button
                                    @click="setDaftarBelanja(item)"
                                    block
                                    type="button"
                                    variant="primary"
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
                        <b-col md="12" class="center">
                            Silahkan tunggu . . .
                        </b-col>
                    </b-row>
                    <div class="text-center mt-5">
                        <b-button
                            @click="changePage('prev')"
                            :disabled="meta.prev_page_url == null"
                            variant="secondary"
                            >Previous</b-button
                        >
                        <span class="mx-2"
                            >Page {{ meta.current_page }} of
                            {{ meta.total }}</span
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
            <b-col md="5">
                <b-card>
                    <div slot="header">
                        Daftar Belanja
                        <div class="card-header-actions" style="height: 21px">
                            <b-button
                                variant="danger"
                                size="sm"
                                @click="resetDaftarBelanja"
                            >
                                <i class="fa fa-trash-o"
                            /></b-button>
                        </div>
                    </div>
                    <table
                        class="table table-sm table-striped table-borderless"
                    >
                        <tr>
                            <td align="right">NO</td>
                            <td>Nama Barang</td>
                            <td align="right">Qty</td>
                            <td align="right">Jumlah</td>
                            <td>#</td>
                        </tr>
                        <tbody v-if="daftar_belanja.length > 0 && !isLoading">
                            <tr
                                v-for="(item, index) in daftar_belanja"
                                :key="index"
                            >
                                <td align="right">
                                    {{ index + 1 }}
                                </td>
                                <td>
                                    {{ item.nama }}
                                </td>
                                <td align="right">{{ item.qty }}</td>
                                <td align="right">
                                    {{ formatRupiah(item.jumlah, "Rp.") }}
                                </td>
                                <td>
                                    <b-button
                                        variant="success"
                                        size="sm"
                                        @click="editDaftarBelanja(index)"
                                    >
                                        <i class="fa fa-edit"></i
                                    ></b-button>
                                    <b-button
                                        variant="danger"
                                        size="sm"
                                        @click="deleteDaftarBelanja(index)"
                                    >
                                        <i class="fa fa-trash-o"></i
                                    ></b-button>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3" align="right">Total</td>
                                <td align="right">
                                    {{ totalHargaBelanja() }}
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tbody
                            v-else-if="daftar_belanja.length == 0 && isLoading"
                        >
                            <tr>
                                <td colspan="5" class="text-center">
                                    <strong> Silahkan tunggu . . . </strong>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="5" class="text-center">
                                    <strong> Belum ada daftar belanja </strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table
                        class="table table-sm"
                        v-if="daftar_belanja.length > 0 && !isLoading"
                    >
                        <tr>
                            <td colspan="5" class="mt-5">
                                <b-form-input
                                    v-model="nama_pelanggan"
                                    placeholder="Nama Pelanggan"
                                ></b-form-input>
                                <b-form-input
                                    class="mt-1"
                                    v-model="no_hp_pelangan"
                                    placeholder="No HP Pelanggan"
                                ></b-form-input>
                                <b-form-input
                                    class="mt-1"
                                    v-model="email_hp_pelanggan"
                                    placeholder="Email Pelanggan"
                                ></b-form-input>
                                <b-button
                                    class="mt-3"
                                    block
                                    variant="primary"
                                    @click="saveTransaksi()"
                                    >Bayar</b-button
                                >
                            </td>
                        </tr>
                    </table>
                </b-card>
            </b-col>
        </b-row>

        <b-modal ref="md-change-qty" hide-footer centered size="sm" title="">
            <h5 class="text-center">
                {{ detail_belanja.nama }}
            </h5>
            <hr />
            <div class="text-center">
                <b-button
                    variant="secondary"
                    size="sm"
                    @click="statusQty('minus')"
                >
                    <i class="fa fa-minus"></i>
                </b-button>
                <span class="mx-5"> {{ detail_belanja.qty }} </span>
                <b-button
                    variant="secondary"
                    size="sm"
                    @click="statusQty('plus')"
                >
                    <i class="fa fa-plus"></i>
                </b-button>
            </div>
            <div class="mt-3">
                <b-button
                    block
                    size="sm"
                    variant="success"
                    @click="saveDetailBelanja()"
                    >Simpan</b-button
                >
            </div>
        </b-modal>

        <b-modal
            ref="md-finsih-transaction"
            hide-footer
            title="Transaksi Berhasil"
        >
            <div class="d-block text-center">
                <span>Silahkan pilih kirim email atau cetak struk belanja</span>
            </div>
            <br />
            <b-button block variant="primary" @click="printBelanja('email')"
                >Kirim Email</b-button
            >
            <b-button block variant="success" @click="printBelanja('print')"
                >Cetak Struk</b-button
            >
        </b-modal>
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
            path_transaksi: "/api/transaksi",
            path_kategori_produk: "/api/kategori-produk/getoption",
            path_produk: "/api/produk",
            options_kategori: [
                {
                    value: 0,
                    text: "Semua",
                },
            ],
            daftar_belanja: [],
            id_transaksi: 0,
            nama_pelanggan: "",
            no_hp_pelangan: "",
            email_hp_pelanggan: "",
            detail_belanja: {
                index: 0,
                id: -1,
                nama: "",
                harga: 0,
                hpp: 0,
                qty: 0,
                jumlah_modal: 0,
                jumlah: 0,
            },
            items: [],
            meta: [], //JUGA BERLAKU UNTUK META
            current_page: 1, //DEFAULT PAGE YANG AKTIF ADA PAGE 1
            per_page: 12, //DEFAULT LOAD PERPAGE ADALAH 10
            search: "",
            sortBy: "nama", //DEFAULT SORTNYA ADALAH CREATED_AT
            sortByDesc: false, //ASCEDING
            kategori: 0,
            isBusy: false,
            isLoading: false,
        };
    },
    methods: {
        saveTransaksi() {
            const self = this;

            self.$swal({
                title: "Silahkan Tunggu . . .",
                showConfirmButton: false,
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    self.$swal.showLoading();
                },
            });

            let totalHarga = 0;
            let totalModal = 0;

            self.daftar_belanja.forEach((element) => {
                totalHarga += element.jumlah;
                totalModal += element.jumlah_modal;
            });

            axios
                .post(self.path_transaksi, {
                    nama_pelanggan: self.nama_pelanggan,
                    no_hp_pelanggan: self.no_hp_pelangan,
                    email_hp_pelanggan: self.email_hp_pelanggan,
                    total_harga: totalHarga,
                    total_modal: totalModal,
                    transaksi: self.daftar_belanja,
                })
                .then(function (response) {
                    let getData = response.data.data;
                    console.log(getData);
                    self.id_transaksi = getData.id;
                    self.$swal.close();
                    self.resetDaftarBelanja();
                    self.$refs["md-finsih-transaction"].show();
                })
                .catch(function (error) {
                    // console.log(error.response);
                    if (error.response) {
                        self.$swal.close();
                        self.$swal({
                            icon: "error",
                            title: "Silahkan coba lagi",
                            allowOutsideClick: false,
                        });
                        // if (error.response.data) {
                        //   this.errors = error.response.data;
                        // }
                    }
                });
        },
        printBelanja(status) {
          this.resetDaftarBelanja();
            if (status == "print" && this.id_transaksi != 0) {
                window.open(
                    "/api/transaksi/stuck/print/" + this.id_transaksi,
                    "_blank"
                );
            } else if (this.id_transaksi != 0) {
                this.$swal({
                    title: "Silahkan Tunggu . . .",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    onBeforeOpen: () => {
                        this.$swal.showLoading();
                    },
                });

                axios
                    .get("/api/transaksi/stuck/sendmail/" + this.id_transaksi)
                    .then((response) => {
                        this.$swal({
                            title: "Email Berhasil Dikirim",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.value) {
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
            } else {
                self.$refs["md-finsih-transaction"].hide();
                this.$swal({
                    type: "Gagal kirim emai/cetak struk belanja",
                    title: "Silahkan lakukan kirim email/cetak struk di riwayat transaksi",
                    allowOutsideClick: false,
                });
            }
        },
        saveDetailBelanja() {
            this.isLoading = true;
            let tempAllDaftarBelanja = this.daftar_belanja;
            this.resetDaftarBelanja();
            let harga = this.detail_belanja.qty * this.detail_belanja.harga;
            let jumlahModal = this.detail_belanja.qty * this.detail_belanja.hpp;
            let tempBelanja = {
                id: this.detail_belanja.id,
                nama: this.detail_belanja.nama,
                harga: this.detail_belanja.harga,
                hpp: this.detail_belanja.hpp,
                qty: this.detail_belanja.qty,
                jumlah_modal: jumlahModal,
                jumlah: harga,
            };
            tempAllDaftarBelanja[this.detail_belanja.index] = tempBelanja;
            this.daftar_belanja = tempAllDaftarBelanja;
            this.isLoading = false;
            this.$refs["md-change-qty"].hide();
        },
        statusQty(status) {
            if (status == "plus") {
                this.detail_belanja.qty += 1;
            } else if (status == "minus") {
                if (this.detail_belanja.qty > 1) {
                    this.detail_belanja.qty -= 1;
                }
            }
        },
        editDaftarBelanja(index) {
            let tempBelanja = this.daftar_belanja[index];
            this.detail_belanja = {
                index: index,
                id: tempBelanja.id,
                nama: tempBelanja.nama,
                harga: tempBelanja.harga,
                hpp: tempBelanja.hpp,
                qty: tempBelanja.qty,
                jumlah_modal: tempBelanja.jumlah_modal,
                jumlah: tempBelanja.jumlah,
            };
            this.$refs["md-change-qty"].show();
        },
        deleteDaftarBelanja(index) {
            this.daftar_belanja.splice(index, 1);
        },
        totalHargaBelanja() {
            let tempTotal = 0;
            this.daftar_belanja.forEach((element) => {
                tempTotal += element.jumlah;
            });
            return this.formatRupiah(tempTotal, "Rp.");
        },
        resetDaftarBelanja() {
            this.daftar_belanja = [];
        },
        setDaftarBelanja(item) {
            this.isLoading = true;
            let tempAllDaftarBelanja = this.daftar_belanja;
            this.resetDaftarBelanja();
            var index = tempAllDaftarBelanja.findIndex(function (temp) {
                return temp.id == item.id;
            });
            if (index == -1) {
                let tempDaftarBelanja = {
                    id: item.id,
                    nama: item.nama,
                    harga: item.harga,
                    hpp: item.hpp,
                    qty: 1,
                    jumlah_modal: 1 * item.hpp,
                    jumlah: 1 * item.harga,
                };
                tempAllDaftarBelanja.push(tempDaftarBelanja);
            } else {
                let tempDaftarBelanja = tempAllDaftarBelanja[index];
                let qty = tempDaftarBelanja.qty + 1;
                let jumlah = qty * tempDaftarBelanja.harga;
                let jumlah_modal = qty * tempDaftarBelanja.hpp;
                let saveDaftarBelanja = {
                    id: item.id,
                    nama: item.nama,
                    harga: item.harga,
                    hpp: item.hpp,
                    qty: qty,
                    jumlah_modal: jumlah_modal,
                    jumlah: jumlah,
                };
                tempAllDaftarBelanja[index] = saveDaftarBelanja;
            }
            this.daftar_belanja = tempAllDaftarBelanja;
            this.isLoading = false;
        },
        patchKategori() {
            axios
                .get(this.path_kategori_produk)
                .then((response) => {
                    let data = response.data.data;
                    data.forEach((element) => {
                        this.options_kategori.push({
                            value: element.id,
                            text: element.nama,
                        });
                    });
                })
                .catch((error) => {});
        },
        /* Fungsi formatRupiah */
        formatRupiah(angka, prefix) {
            return (
                prefix +
                angka.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")
            );
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
                        kategori: this.kategori == 0 ? null : this.kategori,
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
        this.patchKategori();
        this.loadData();
    },
};
</script>
