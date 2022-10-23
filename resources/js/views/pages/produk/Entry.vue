<template>
<div class="animated fadeIn">
    <div class="mt-4">
        <b-card>
            <div slot="header">
                Entry Produk
                <div class="card-header-actions" style="height: 21px">
                    <router-link :to="'/panel/master-data/produk'" class="btn btn-sm btn-warning text-white"><i class="fa fa-arrow-left" /> Kembali</router-link>
                </div>
            </div>
            <form-wizard @on-validate="handleValidation" @on-loading="setLoading" title="Informasi Produk" subtitle="Silahkan lengkapi isian di bawah ini">
                <tab-content title="Info Produk" :before-change="stepOneProses">
                    <b-form-row class="mb-1">
                        <b-col md="2">
                            <label class="mt-1">Nama Produk</label>
                        </b-col>
                        <b-col md="10">
                            <b-form-input v-model="form_info_produk.nama" type="text" placeholder="Masukkan Nama Produk"></b-form-input>
                            <div class="text-danger mt-1" v-if="errors_info_produk != null">
                                <ul>
                                    <li v-for="(item, index) in errors_info_produk.nama" :key="index">
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </b-col>
                    </b-form-row>

                    <b-form-row class="mb-1">
                        <b-col md="2">
                            <label class="mt-1">Harga Jual</label>
                        </b-col>
                        <b-col md="10">
                            <b-form-input v-model="form_info_produk.harga" type="text" placeholder="Masukkan Harga Jual"></b-form-input>
                            <div class="text-danger mt-1" v-if="errors_info_produk != null">
                                <ul>
                                    <li v-for="(item, index) in errors_info_produk.harga" :key="index">
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </b-col>
                    </b-form-row>
                    <b-form-row class="mb-1">
                        <b-col md="2">
                            <label class="mt-1">Harga Modal</label>
                        </b-col>
                        <b-col md="10">
                            <b-form-input v-model="form_info_produk.hpp" type="text" placeholder="Masukkan Harga Modal"></b-form-input>
                            <div class="text-danger mt-1" v-if="errors_info_produk != null">
                                <ul>
                                    <li v-for="(item, index) in errors_info_produk.hpp" :key="index">
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </b-col>
                    </b-form-row>

                    <b-form-row class="mb-1">
                        <b-col md="2">
                            <label class="mt-1">Deskripsi</label>
                        </b-col>
                        <b-col md="10">
                            <b-form-textarea id="textarea" v-model="form_info_produk.deskripsi" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                            <div class="text-danger mt-1" v-if="errors_info_produk != null">
                                <ul>
                                    <li v-for="(item, index) in errors_info_produk.hpp" :key="index">
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </b-col>
                    </b-form-row>

                    <b-form-row class="mb-1">
                        <b-col md="2">
                            <label> Aktif </label>
                        </b-col>
                        <b-col md="10">
                            <b-form-radio-group v-model="form_info_produk.aktif" :options="options" class="mb-3" value-field="item" text-field="name" disabled-field="notEnabled"></b-form-radio-group>
                            <div class="text-danger mt-1" v-if="errors != null">
                                <ul>
                                    <li v-for="(item, index) in errors.aktif" :key="index">
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </b-col>
                    </b-form-row>
                </tab-content>
                <tab-content title="Gambar Produk" :before-change="stepTwoProses">
                    <b-form-file v-model="form_gambar_produk.gambar" multiple accept="image/*" ref="file" @change="onFileChange" class="mb-2">
                    </b-form-file>

                    <b-row>
                        <b-col md="4" lg="3" v-for="(image, key) in list_image" :key="key">
                            <b-card title="" :img-src="image.file" img-alt="Image" img-top tag="article" style="max-width: 20rem" class="mb-2 text-center">
                                <b-button variant="warning" @click="deleteImage(key, image.id, image.status)">Hapus Gambar</b-button>
                            </b-card>
                        </b-col>
                    </b-row>

                    <div class="text-danger mt-1" v-if="errors_gambar_produk != null">
                        <ul>
                            <li v-for="(item, index) in errors_gambar_produk.gambar" :key="index">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </tab-content>
                <tab-content title="Kategori Produk" :before-change="stepThreeProses">
                    <b-form-row class="mb-1">
                        <b-col md="12" v-if="options_kategori.length > 0">
                            <label class="mt-1">Kategori Produk</label>
                            <b-form-select multiple v-model="form_kategori_produk.kategori" :options="options_kategori">
                            </b-form-select>
                            <div class="text-danger mt-1" v-if="errors_kategori_produk != null">
                                <ul>
                                    <li v-for="(item, index) in errors_kategori_produk.kategori" :key="index">
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </b-col>
                    </b-form-row>
                </tab-content>
            </form-wizard>
        </b-card>
    </div>
</div>
</template>

<script>
// import helpers from '../../helpers/helpers';
export default {
    name: "EntryUser",
    components: {
        "vue-select": require("vue-select")
    },
    data() {
        return {
            form_info_produk: {
                id: null,
                nama: "",
                harga: "",
                hpp: "",
                deskripsi: "",
                aktif: "Y",
            },
            form_gambar_produk: {
                id_produk: null,
                gambar: [],
            },
            form_kategori_produk: {
                id_produk: null,
                kategori: [],
            },
            options: [{
                    item: "Y",
                    name: "Y",
                },
                {
                    item: "N",
                    name: "N",
                },
            ],
            options_kategori: [],
            errors: "",
            edit: false,
            list_image: [],
            path_info_produk: "/api/produk",
            path_gambar_produk: "/api/gambar-produk",
            path_kategori_produk: "/api/kategori-produk",
            loadingWizard: true,
            errors_info_produk: null,
            errors_gambar_produk: null,
            errors_kategori_produk: null,
            step1: null,
            step2: null,
            step3: null,
        };
    },
    created() {
        this.patchKategori();
        this.petchDataEdit();
        console.log(this.form_kategori_produk);
    },
    methods: {
        handleValidation: function (isValid, tabIndex) {
            // console.log(tabIndex);
        },
        setLoading: function (value) {
            this.loadingWizard = value;
        },
        patchKategori() {
            this.options_kategori = [];
            axios
                .get(this.path_kategori_produk + "/getoption")
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
        petchData(id) {
            this.list_image = [];
            this.$swal({
                title: "Silahkan Tunggu . . .",
                showConfirmButton: false,
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    this.$swal.showLoading();
                },
            });
            axios
                .get(this.path_info_produk + "/" + id)
                .then((response) => {
                    this.$swal.close();
                    let data = response.data.data;
                    this.form_info_produk = {
                        id: data.id,
                        nama: data.nama,
                        harga: data.harga,
                        hpp: data.hpp,
                        deskripsi: data.deskripsi,
                        aktif: data.aktif,
                    };
                    this.form_gambar_produk.id_produk = data.id;
                    this.form_kategori_produk.id_produk = data.id;

                    this.step1 = true;

                    if (data.gambar_produk.length > 0) {
                        this.step2 = true;
                        data.gambar_produk.forEach((element) => {
                            this.list_image.push({
                                id: element.id,
                                status: "edit",
                                file: response.data.status.url + "/" + element.path,
                            });
                        });
                    }

                    if (data.kategori_produk_relasi.length > 0) {
                        this.step3 = true;
                        data.kategori_produk_relasi.forEach((element) => {
                            this.form_kategori_produk.kategori.push(element.kategori_produk.id);
                        });
                    }

                    this.edit = true;
                })
                .catch((error) => {
                    this.$swal.close();
                });
        },
        async stepOneProses() {
            await this.saveinfoproduk();
            if (this.form_info_produk.id != null) {
                // this.step1 = true;
                return true;
            } else {
                return this.step1;
            }
        },
        async saveinfoproduk() {
            const self = this;
            self.errors_info_produk = null;

            // this.setLoading(true);
            await axios
                .post(self.path_info_produk, self.form_info_produk)
                .then(function (response) {
                    let id_produk = response.data.data.id;
                    self.form_info_produk.id = id_produk;
                    self.form_gambar_produk.id_produk = id_produk;
                    // return true;
                    // this.setLoading(false);
                    self.step1 = true;
                })
                .catch(function (error) {
                    self.step1 = false;
                    // this.setLoading(false);
                    if (error.response) {
                        // self.errors_konfig_msg = "Terjadi kesalahan, silahkan coba lagi.";
                        if (error.response.data) {
                            self.errors_info_produk = error.response.data;
                        }
                    }
                    // return false;
                });

            // return status;
        },
        async stepTwoProses() {
            console.log("step two" + this.list_image.length);
            if (this.list_image.length == 0) {
                this.errors_gambar_produk = {
                    gambar: ["The image field is required."],
                };
                return false;
            } else {
                if (this.form_gambar_produk.gambar.length > 0) {
                    await this.saveGambarProduk();
                    return true;
                } else {
                    return true;
                }
            }
        },
        async saveGambarProduk() {
            const self = this;
            self.errors_gambar_produk = null;
            var formData = self.getherFormData();
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            };
            await axios
                .post(self.path_gambar_produk, formData, config)
                .then(function (response) {
                    let data = response.data.data;
                    self.step2 = true;
                    self.form_gambar_produk.gambar = [];
                    self.petchDataEdit();
                })
                .catch(function (error) {
                    self.step2 = false;
                    if (error.response) {
                        if (error.response.data) {
                            self.errors_gambar_produk = error.response.data;
                        }
                    }
                });
        },
        async stepThreeProses() {
            this.$swal({
                title: "Silahkan Tunggu . . .",
                showConfirmButton: false,
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    this.$swal.showLoading();
                },
            });
            await this.saveKategoriProduk();
            this.$swal.close();
            if (this.step3) {
                this.$swal({
                    title: "Data Berhasil Disimpan",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.value) {
                        // self.$route
                        this.$router.push("/panel/master-data/produk");
                    }
                });
            }
        },
        async saveKategoriProduk() {
            const self = this;
            self.errors_kategori_produk = null;

            //   console.log(self.form_kategori_produk);

            await axios
                .post(
                    self.path_kategori_produk + "/save-produk",
                    self.form_kategori_produk
                )
                .then(function (response) {
                    self.step3 = true;
                    // console.log(response.data);
                    // this.$swal.close();
                    // this.loadingWizard = false;
                    // status = true;
                    // return true;
                })
                .catch(function (error) {
                    // console.log(error.response);
                    self.step3 = false;
                    if (error.response) {
                        // this.$swal.close();
                        // this.$swal({
                        //     icon: 'error',
                        //     title: 'Periksa kembali form anda',
                        //     allowOutsideClick: false,
                        // });
                        if (error.response.data) {
                            self.errors_kategori_produk = error.response.data;
                        }
                    }
                    // return false;
                });
        },
        submit(e) {
            e.preventDefault();

            const self = this;
            self.errors = null;

            //   var formData = self.getherFormData();

            //   const config = {
            //     headers: {
            //       'content-type': 'multipart/form-data'
            //     }
            //   }

            self.$swal({
                title: "Silahkan Tunggu . . .",
                showConfirmButton: false,
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    self.$swal.showLoading();
                },
            });

            axios
                .post(self.path, self.form)
                .then(function (response) {
                    self.$swal.close();
                    self
                        .$swal({
                            title: "Data Berhasil Disimpan",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            allowOutsideClick: false,
                        })
                        .then((result) => {
                            if (result.value) {
                                // self.$route
                                self.$router.push("/panel/master-data/pengguna");
                            }
                        });
                })
                .catch(function (error) {
                    // console.log(error.response);
                    if (error.response) {
                        self.$swal.close();
                        self.$swal({
                            icon: "error",
                            title: "Periksa kembali form anda",
                            allowOutsideClick: false,
                        });
                        if (error.response.data) {
                            self.errors = error.response.data;
                        }
                    }
                });
        },
        getherFormData() {
            let formData = new FormData();

            formData.append("produk_id", this.form_gambar_produk.id_produk);
            // formData.append('images', this.form_images.images);
            if (this.form_gambar_produk.gambar.length != 0) {
                for (var i = 0; i < this.form_gambar_produk.gambar.length; i++) {
                    let file = this.form_gambar_produk.gambar[i];
                    formData.append("gambar[" + i + "]", file);
                }
            }

            return formData;
        },
        onFileChange(e) {
            this.errors_gambar_produk = null;
            var selectedFiles = e.target.files;
            for (var i = 0; i < selectedFiles.length; i++) {
                this.list_image.push({
                    id: i + 1,
                    status: "new",
                    file: URL.createObjectURL(selectedFiles[i]),
                });
                this.form_gambar_produk.gambar.push(selectedFiles[i]);
            }
        },

        deleteImage(key, id, status) {
            if (status == "new") {
                this.list_image.splice(key, 1);
                this.form_gambar_produk.gambar.splice(key, 1);
            } else {
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
                        this.prosesDeleteImage(id);
                    }
                });
            }
        },
        prosesDeleteImage(id) {
            this.$swal({
                title: "Silahkan Tunggu . . .",
                showConfirmButton: false,
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    this.$swal.showLoading();
                },
            });
            axios
                .delete(this.path_gambar_produk + "/" + id)
                .then((response) => {
                    this.$swal({
                        title: "Data Berhasil Dihapus",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.value) {
                            this.petchDataEdit();
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
        petchDataEdit() {
            let act = this.$route.params.act;
            if (act != "add") {
                this.petchData(act);
            }
        },
    },
};
</script>
