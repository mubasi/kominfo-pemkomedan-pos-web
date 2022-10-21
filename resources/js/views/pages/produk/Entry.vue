<template>
  <div class="animated fadeIn">
    <div class="mt-4">
      <b-card>
        <div slot="header">
          Entry Data Agama
          <div class="card-header-actions" style="height: 21px;">
            <router-link :to="'/panel/master-data/pengguna'" class="btn btn-sm btn-warning text-white"><i
                class="fa fa-arrow-left" /> Kembali</router-link>
          </div>
        </div>
        <form-wizard @on-validate="handleValidation" @on-loading="setLoading" title="Informasi Produk"
          subtitle="Silahkan lengkapi isian di bawah ini">
          <tab-content title="Info Produk" :before-change="stepOneProses">
            <b-form-row class="mb-1">
              <b-col md="2">
                <label class="mt-1">Nama Produk</label>
              </b-col>
              <b-col md="10">
                <b-form-input v-model="form_info_produk.nama" type="text" placeholder="Masukkan Nama Lengkap"></b-form-input>
                <div class="text-danger mt-1" v-if="errors != null">
                  <ul>
                    <li v-for="(item, index) in errors.nama" :key="index"> {{ item }} </li>
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
                <div class="text-danger mt-1" v-if="errors != null">
                  <ul>
                    <li v-for="(item, index) in errors.harga" :key="index"> {{ item }} </li>
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
                <div class="text-danger mt-1" v-if="errors != null">
                  <ul>
                    <li v-for="(item, index) in errors.hpp" :key="index"> {{ item }} </li>
                  </ul>
                </div>
              </b-col>
            </b-form-row>

            <b-form-row class="mb-1">
              <b-col md="2">
                <label>
                  Aktif
                </label>
              </b-col>
              <b-col md="10">
                <b-form-radio-group v-model="form_info_produk.aktif" :options="options" class="mb-3" value-field="item"
                  text-field="name" disabled-field="notEnabled"></b-form-radio-group>
                <div class="text-danger mt-1" v-if="errors != null">
                  <ul>
                    <li v-for="(item, index) in errors.aktif" :key="index"> {{ item }} </li>
                  </ul>
                </div>
              </b-col>
            </b-form-row>
          </tab-content>
          <tab-content title="Gambar Produk" :before-change="stepTwoProses">
          </tab-content>
          <tab-content title="Kategori Produk" :before-change="stepThreeProses">
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
  data() {
    return {
      form_info_produk: {
        id: null,
        nama: '',
        harga: '',
        hpp: '',
        aktif: 'Y',
      },
      form_gambar_produk: {
        id_produk: null,
        list_gambar: [],
      },
      options: [{
        item: 'Y',
        name: 'Y'
      },
      {
        item: 'N',
        name: 'N'
      },
      ],
      errors: "",
      edit: false,
      roles: [],
      path_info_produk: '/api/produk',
      path_gambar_produk: '/api/gambar-produk',
      path_kategori_produk: '/api/kategori-produk',
      loadingWizard: true,
      errors_info_produk: null,
      errors_gambar_produk: null,
      step1: null,
      step2: null,
      step3: null,
    }
  },
  created() {
    let act = this.$route.params.act;
    if (act != 'add') {
      this.petchData(act);
    }
  },
  methods: {
    handleValidation: function (isValid, tabIndex) {
      // console.log(tabIndex);
    },
    setLoading: function (value) {
      this.loadingWizard = value
    },
    petchData(id) {
      this.$swal({
        title: 'Silahkan Tunggu . . .',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        },
      });
      axios.get(this.path + '/' + id).then((response) => {
        this.$swal.close();
        let data = response.data.data;
        this.form = {
          id: data.id,
          nama: data.name,
          aktif: data.active,
        };
        this.edit = true;
      }).catch((error) => {
        this.$swal.close();
      });
    },
    async stepOneProses() {
      await this.saveinfoproduk();
      if (this.form.id != null) {
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
      await axios.post(self.path_info_produk, self.form_info_produk)
        .then(function (response) {
          let id_produk = response.data.data.id;
          self.form.id = id_produk;
          selft.form_gambar_produk.id_produk = id_produk;
          // return true;
          // this.setLoading(false);
          self.step1 = true;
        })
        .catch(function (error) {
          self.step1 = false;
          // this.setLoading(false);
          if (error.response) {
            self.errors_konfig_msg = "Terjadi kesalahan, silahkan coba lagi.";
            if (error.response.data) {
              self.errors_info_produk = error.response.data;
            }
          }
          // return false;
        });

      // return status;
    },
    async stepTwoProses() {
      await this.saveGambarProduk();
      if (this.form_gambar_produk.id_produk != null && this.form_gambar_produk.list_gambar.length > 0) {
        // this.step1 = true;
        return true;
      } else {
        return this.step2;
      }
    },
    async saveGambarProduk() {
      const self = this;
      self.errors_gambar_produk = null;

      // this.setLoading(true);
      await axios.post(self.path_gambar_produk, self.form_gambar_produk)
        .then(function (response) {
          // self.form.id = response.data.data.id;
          // return true;
          // this.setLoading(false);
          self.step1 = true;
        })
        .catch(function (error) {
          self.step1 = false;
          // this.setLoading(false);
          if (error.response) {
            if (error.response.data) {
              self.errors_gambar_produk = error.response.data;
            }
          }
          // return false;
        });

      // return status;
    },
    async stepThreeProses() {

      this.$swal({
        title: 'Silahkan Tunggu . . .',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        },
      });
      await this.saveKategoriProduk();
      this.$swal.close();
      if (this.step2) {
        this.$swal({
          title: 'Data Berhasil Disimpan',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.value) {
            // self.$route
            this.$router.push('/panel/list-banding-data');
          }
        });
      }
    },
    async saveKategoriProduk() {
      const self = this;
      self.errors_data = null;
      await axios.post(self.path_kategori_produk, {
        konfig_id: self.form.id,
        data: self.form_data
      })
        .then(function (response) {
          self.step2 = true;
          // console.log(response.data);
          // this.$swal.close();
          // this.loadingWizard = false;
          // status = true;
          // return true;
        })
        .catch(function (error) {
          // console.log(error.response);
          self.step2 = false;
          if (error.response) {
            // this.$swal.close();
            // this.$swal({
            //     icon: 'error',
            //     title: 'Periksa kembali form anda',
            //     allowOutsideClick: false,
            // });
            if (error.response.data) {
              self.errors_data = error.response.data;
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
        title: 'Silahkan Tunggu . . .',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          self.$swal.showLoading();
        },
      });

      axios.post(self.path, self.form)
        .then(function (response) {
          self.$swal.close();
          self.$swal({
            title: 'Data Berhasil Disimpan',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
          }).then((result) => {
            if (result.value) {
              // self.$route
              self.$router.push('/panel/master-data/pengguna');
            }
          });
        })
        .catch(function (error) {
          // console.log(error.response);
          if (error.response) {
            self.$swal.close();
            self.$swal({
              icon: 'error',
              title: 'Periksa kembali form anda',
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

      let status = this.$route.params.status;
      if (status != 'add') {
        formData.append('id', status);
      }
      formData.append('name', this.name);
      formData.append('urutan', this.urutan);
      formData.append('aktif', this.aktif);

      return formData;
    },
    onImageChange(e) {
      const image = e.target.files[0];
      if (image.size > 1024 * 512) {
        e.preventDefault();
        this.$swal({
          type: 'warning',
          title: 'Terjadi kesalahan',
          text: 'ukuran gambar melebihi 500Kb',
        })
        this.$refs.imgupload.value = null;
        this.urlImage = null;
        return;
      }

      this.gambar = image;
      this.urlImage = URL.createObjectURL(image);
    },
  }

}
</script>
