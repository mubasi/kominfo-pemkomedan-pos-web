<template>
<div class="animated fadeIn">
  <div class="mt-4">
    <b-card>
      <div slot="header">
        Entry Data Bank
        <div class="card-header-actions" style="height: 21px;">
          <router-link :to="'/panel/main-data/bank'" class="btn btn-sm btn-warning text-white"><i class="fa fa-arrow-left" /> Kembali</router-link>
        </div>
      </div>
      <form @submit.prevent="submit">

        <b-form-row class="mb-1">
          <b-col md="2">
            <label class="mt-1">Nama Bank</label>
          </b-col>
          <b-col md="10">
            <b-form-input v-model="form.nama" type="text" placeholder="Masukkan Nama Bank"></b-form-input>
            <div class="text-danger mt-1" v-if="errors != null">
              <ul>
                <li v-for="(item, index) in errors.nama" :key="index"> {{ item }} </li>
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
            <b-form-radio-group v-model="form.aktif" :options="options" class="mb-3" value-field="item" text-field="name" disabled-field="notEnabled"></b-form-radio-group>
            <div class="text-danger mt-1" v-if="errors != null">
              <ul>
                <li v-for="(item, index) in errors.aktif" :key="index"> {{ item }} </li>
              </ul>
            </div>
          </b-col>
        </b-form-row>

        <b-form-row class="mt-1">
          <b-col md="12" class="text-center mt-1">
            <b-button type="submit" variant="primary">Simpan</b-button>
          </b-col>
        </b-form-row>
      </form>
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
      form: {
        nama: '',
        aktif: 'Y',
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
    }
  },
  created() {
    let act = this.$route.params.act;
    if (act != 'add') {
      this.petchData(act);
    }
  },
  methods: {
    petchData(id) {
      this.$swal({
        title: 'Silahkan Tunggu . . .',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        },
      });
      axios.get('/api/bank/' + id).then((response) => {
        this.$swal.close();
        let data = response.data.rows;
        // this.urutan = data.urutan;
        this.form.nama = data.nama;
        this.form.aktif = data.aktif;
        this.edit = true;
      }).catch((error) => {
        this.$swal.close();
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

      let url = '/api/bank';

      axios.post(url, this.form)
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
              self.$router.push('/panel/main-data/bank');
            }
          });
        })
        .catch(function (error) {
          // console.log(error);
          if (error.response) {
            self.$swal.close();
            self.$swal({
              icon: 'error',
              title: 'Periksa kembali form anda',
              allowOutsideClick: false,
            });
            if (error.response.data.errors) {
              self.errors = error.response.data.errors;
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
