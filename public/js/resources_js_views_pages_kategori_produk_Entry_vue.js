"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_pages_kategori_produk_Entry_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/kategori_produk/Entry.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/kategori_produk/Entry.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import helpers from '../../helpers/helpers';
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "EntryUser",
  data: function data() {
    return {
      form: {
        id: null,
        nama: '',
        aktif: 'Y'
      },
      options: [{
        item: 'Y',
        name: 'Y'
      }, {
        item: 'N',
        name: 'N'
      }],
      errors: "",
      edit: false,
      roles: [],
      path: '/api/kategori-produk'
    };
  },
  created: function created() {
    var act = this.$route.params.act;

    if (act != 'add') {
      this.petchData(act);
    }
  },
  methods: {
    petchData: function petchData(id) {
      var _this = this;

      this.$swal({
        title: 'Silahkan Tunggu . . .',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: function onBeforeOpen() {
          _this.$swal.showLoading();
        }
      });
      axios.get(this.path + '/' + id).then(function (response) {
        _this.$swal.close();

        var data = response.data.data;
        _this.form = {
          id: data.id,
          nama: data.nama,
          aktif: data.aktif
        };
        _this.edit = true;
      }).catch(function (error) {
        _this.$swal.close();
      });
    },
    submit: function submit(e) {
      e.preventDefault();
      var self = this;
      self.errors = null; //   var formData = self.getherFormData();
      //   const config = {
      //     headers: {
      //       'content-type': 'multipart/form-data'
      //     }
      //   }

      self.$swal({
        title: 'Silahkan Tunggu . . .',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: function onBeforeOpen() {
          self.$swal.showLoading();
        }
      });
      axios.post(self.path, self.form).then(function (response) {
        self.$swal.close();
        self.$swal({
          title: 'Data Berhasil Disimpan',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false
        }).then(function (result) {
          if (result.value) {
            // self.$route
            self.$router.push('/panel/master-data/kategori-produk');
          }
        });
      }).catch(function (error) {
        // console.log(error.response);
        if (error.response) {
          self.$swal.close();
          self.$swal({
            icon: 'error',
            title: 'Periksa kembali form anda',
            allowOutsideClick: false
          });

          if (error.response.data) {
            self.errors = error.response.data;
          }
        }
      });
    },
    getherFormData: function getherFormData() {
      var formData = new FormData();
      var status = this.$route.params.status;

      if (status != 'add') {
        formData.append('id', status);
      }

      formData.append('name', this.name);
      formData.append('urutan', this.urutan);
      formData.append('aktif', this.aktif);
      return formData;
    },
    onImageChange: function onImageChange(e) {
      var image = e.target.files[0];

      if (image.size > 1024 * 512) {
        e.preventDefault();
        this.$swal({
          type: 'warning',
          title: 'Terjadi kesalahan',
          text: 'ukuran gambar melebihi 500Kb'
        });
        this.$refs.imgupload.value = null;
        this.urlImage = null;
        return;
      }

      this.gambar = image;
      this.urlImage = URL.createObjectURL(image);
    }
  }
});

/***/ }),

/***/ "./resources/js/views/pages/kategori_produk/Entry.vue":
/*!************************************************************!*\
  !*** ./resources/js/views/pages/kategori_produk/Entry.vue ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Entry_vue_vue_type_template_id_1717ea6f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entry.vue?vue&type=template&id=1717ea6f& */ "./resources/js/views/pages/kategori_produk/Entry.vue?vue&type=template&id=1717ea6f&");
/* harmony import */ var _Entry_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Entry.vue?vue&type=script&lang=js& */ "./resources/js/views/pages/kategori_produk/Entry.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Entry_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Entry_vue_vue_type_template_id_1717ea6f___WEBPACK_IMPORTED_MODULE_0__.render,
  _Entry_vue_vue_type_template_id_1717ea6f___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/pages/kategori_produk/Entry.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/pages/kategori_produk/Entry.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/pages/kategori_produk/Entry.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Entry_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Entry.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/kategori_produk/Entry.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Entry_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/pages/kategori_produk/Entry.vue?vue&type=template&id=1717ea6f&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/views/pages/kategori_produk/Entry.vue?vue&type=template&id=1717ea6f& ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Entry_vue_vue_type_template_id_1717ea6f___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Entry_vue_vue_type_template_id_1717ea6f___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Entry_vue_vue_type_template_id_1717ea6f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Entry.vue?vue&type=template&id=1717ea6f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/kategori_produk/Entry.vue?vue&type=template&id=1717ea6f&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/kategori_produk/Entry.vue?vue&type=template&id=1717ea6f&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/kategori_produk/Entry.vue?vue&type=template&id=1717ea6f& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "animated fadeIn" }, [
    _c(
      "div",
      { staticClass: "mt-4" },
      [
        _c("b-card", [
          _c("div", { attrs: { slot: "header" }, slot: "header" }, [
            _vm._v("\n        Entry Kategori Prouk\n        "),
            _c(
              "div",
              {
                staticClass: "card-header-actions",
                staticStyle: { height: "21px" },
              },
              [
                _c(
                  "router-link",
                  {
                    staticClass: "btn btn-sm btn-warning text-white",
                    attrs: { to: "/panel/master-data/kategori-produk" },
                  },
                  [
                    _c("i", { staticClass: "fa fa-arrow-left" }),
                    _vm._v(" Kembali"),
                  ]
                ),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c(
            "form",
            {
              on: {
                submit: function ($event) {
                  $event.preventDefault()
                  return _vm.submit.apply(null, arguments)
                },
              },
            },
            [
              _c(
                "b-form-row",
                { staticClass: "mb-1" },
                [
                  _c("b-col", { attrs: { md: "2" } }, [
                    _c("label", { staticClass: "mt-1" }, [
                      _vm._v("Nama Kategori"),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "10" } },
                    [
                      _c("b-form-input", {
                        attrs: {
                          type: "text",
                          placeholder: "Masukkan Nama Karegori",
                        },
                        model: {
                          value: _vm.form.nama,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "nama", $$v)
                          },
                          expression: "form.nama",
                        },
                      }),
                      _vm._v(" "),
                      _vm.errors != null
                        ? _c("div", { staticClass: "text-danger mt-1" }, [
                            _c(
                              "ul",
                              _vm._l(_vm.errors.nama, function (item, index) {
                                return _c("li", { key: index }, [
                                  _vm._v(" " + _vm._s(item) + " "),
                                ])
                              }),
                              0
                            ),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-form-row",
                { staticClass: "mb-1" },
                [
                  _c("b-col", { attrs: { md: "2" } }, [
                    _c("label", [
                      _vm._v("\n              Aktif\n            "),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "10" } },
                    [
                      _c("b-form-radio-group", {
                        staticClass: "mb-3",
                        attrs: {
                          options: _vm.options,
                          "value-field": "item",
                          "text-field": "name",
                          "disabled-field": "notEnabled",
                        },
                        model: {
                          value: _vm.form.aktif,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "aktif", $$v)
                          },
                          expression: "form.aktif",
                        },
                      }),
                      _vm._v(" "),
                      _vm.errors != null
                        ? _c("div", { staticClass: "text-danger mt-1" }, [
                            _c(
                              "ul",
                              _vm._l(_vm.errors.aktif, function (item, index) {
                                return _c("li", { key: index }, [
                                  _vm._v(" " + _vm._s(item) + " "),
                                ])
                              }),
                              0
                            ),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-form-row",
                { staticClass: "mt-1" },
                [
                  _c(
                    "b-col",
                    { staticClass: "text-center mt-1", attrs: { md: "12" } },
                    [
                      _c(
                        "b-button",
                        { attrs: { type: "submit", variant: "primary" } },
                        [_vm._v("Simpan")]
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
        ]),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);