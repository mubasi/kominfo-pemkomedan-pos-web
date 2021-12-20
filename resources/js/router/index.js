import Vue from "vue";
import Router from "vue-router";

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer.vue");

// Views - Pages
const Page404 = () => import("@/views/pages/Page404");

// Views
//homepage
const HomePage = () => import("@/views/pages/home/Index.vue");

//agama
const Agama = () => import("@/views/pages/agama/Index.vue");
const AgamaEntry = () => import("@/views/pages/agama/Entry.vue");
//bank
const Bank = () => import("@/views/pages/bank/Index.vue");
const BankEntry = () => import("@/views/pages/bank/Entry.vue");
//jabatan
const Jenisptk = () => import("@/views/pages/jenisptk/Index.vue");
const JenisptkEntry = () => import("@/views/pages/jenisptk/Entry.vue");

//lembaga pengangkatan
const Lembagapengangkatan = () => import("@/views/pages/lembagapengangkatan/Index.vue");
const LembagapengangkatanEntry = () => import("@/views/pages/lembagapengangkatan/Entry.vue");

//pangkat golongan
const Pangkatgolongan = () => import("@/views/pages/pangkatgolongan/Index.vue");
const PangkatgolonganEntry = () => import("@/views/pages/pangkatgolongan/Entry.vue");

//status pegawai
const Statuspegawai = () => import("@/views/pages/statuspegawai/Index.vue");
const StatuspegawaiEntry = () => import("@/views/pages/statuspegawai/Entry.vue");

//Sumber Gaji
const SumberGaji = () => import("@/views/pages/sumbergaji/Index.vue");
const SumberGajiEntry = () => import("@/views/pages/sumbergaji/Entry.vue");

//Tugas Tambahan
const TugasTambahan = () => import("@/views/pages/tugastambahan/Index.vue");
const TugasTambahanEntry = () => import("@/views/pages/tugastambahan/Entry.vue");

//login
const Login = () => import("@/views/pages/Login.vue");

//pages template
const SimpleLineIcons = () => import("@/views/icons/SimpleLineIcons");

Vue.use(Router);

export default new Router({
    mode: "history", // https://router.vuejs.org/api/#mode
    linkActiveClass: "open active",
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: "*",
            redirect: "/pages/404",
        },
        {
            path: "/",
            name: "HomePage",
            meta: {
                title: "Home",
            },
            component: HomePage,
        },
        {
            path: "/panel/",
            redirect: "/panel/icon",
            name: "BaseAdmin",
            component: DefaultContainer,
            children: [
                {
                    path: "main-data/agama",
                    name: "agama",
                    component: Agama,
                    meta: {
                        title: "Agama",
                        auth: true,
                    },
                },
                {
                    path: "main-data/agama/:act",
                    name: "entry-agama",
                    component: AgamaEntry,
                    meta: {
                        title: "Entry Data Agama",
                        auth: true,
                    },
                },
                {
                    path: "main-data/bank",
                    name: "bank",
                    component: Bank,
                    meta: {
                        title: "Bank",
                        auth: true,
                    },
                },
                {
                    path: "main-data/bank/:act",
                    name: "entry-bank",
                    component: BankEntry,
                    meta: {
                        title: "Entry Data Bank",
                        auth: true,
                    },
                },
                {
                    path: "main-data/jenis-ptk",
                    name: "jenisptk",
                    component: Jenisptk,
                    meta: {
                        title: "Jenis PTK",
                        auth: true,
                    },
                },
                {
                    path: "main-data/jenis-ptk/:act",
                    name: "entry-jenis-ptk",
                    component: JenisptkEntry,
                    meta: {
                        title: "Entry Data Jenis PTK",
                        auth: true,
                    },
                },
                {
                    path: "main-data/lembaga-pengangkatan",
                    name: "lembagapengangkatan",
                    component: Lembagapengangkatan,
                    meta: {
                        title: "Lembaga Pengangkatan",
                        auth: true,
                    },
                },
                {
                    path: "main-data/lembaga-pengangkatan/:act",
                    name: "entry-lembagapengangkatan",
                    component: LembagapengangkatanEntry,
                    meta: {
                        title: "Entry Data Lembaga Pengangkatan",
                        auth: true,
                    },
                },
                {
                    path: "main-data/pangkat-golongan",
                    name: "pangkatgolongan",
                    component: Pangkatgolongan,
                    meta: {
                        title: "Pangkat/Golongan",
                        auth: true,
                    },
                },
                {
                    path: "main-data/pangkat-golongan/:act",
                    name: "entry-pangkat-golongan",
                    component: PangkatgolonganEntry,
                    meta: {
                        title: "Entry Data Pangkat/Golongan",
                        auth: true,
                    },
                },
                {
                    path: "main-data/status-pegawai",
                    name: "statuspegawai",
                    component: Statuspegawai,
                    meta: {
                        title: "Status Pegawai",
                        auth: true,
                    },
                },
                {
                    path: "main-data/status-pegawai/:act",
                    name: "entry-statuspegawai",
                    component: StatuspegawaiEntry,
                    meta: {
                        title: "Entry Data Status Pegawai",
                        auth: true,
                    },
                },
                {
                    path: "main-data/sumber-gaji",
                    name: "sumbergaji",
                    component: SumberGaji,
                    meta: {
                        title: "Sumber Gaji",
                        auth: true,
                    },
                },
                {
                    path: "main-data/sumber-gaji/:act",
                    name: "entry-sumbergaji",
                    component: SumberGajiEntry,
                    meta: {
                        title: "Entry Data Sumber Gaji",
                        auth: true,
                    },
                },
                {
                    path: "main-data/tugas-tambahan",
                    name: "tugastambahan",
                    component: TugasTambahan,
                    meta: {
                        title: "Tugas Tambahan",
                        auth: true,
                    },
                },
                {
                    path: "main-data/tugas-tambahan/:act",
                    name: "entry-tugastambahan",
                    component: TugasTambahanEntry,
                    meta: {
                        title: "Entry Data Tugas Tambahan",
                        auth: true,
                    },
                },
                {
                    path: "icon",
                    name: "Icon",
                    component: SimpleLineIcons,
                    meta: {
                        title: "Icon",
                        auth: true,
                    },
                },
            ],
        },
        {
            path: "/pages",
            redirect: "/pages/404",
            name: "Pages",
            component: {
                render(c) {
                    return c("router-view");
                },
            },
            children: [
                {
                    path: "404",
                    name: "Page404",
                    component: Page404,
                },
                // {
                //   path: '500',
                //   name: 'Page500',
                //   component: Page500
                // },
                {
                    path: "login",
                    name: "Login",
                    meta: {
                        title: "Login",
                    },
                    component: Login,
                },
                // {
                //   path: 'register',
                //   name: 'Register',
                //   component: Register
                // }
            ],
        },
    ],
});
