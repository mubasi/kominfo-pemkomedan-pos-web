export default {
    items: [
        {
            title: true,
            name: "Main Menu",
            class: "",
            wrapper: {
                element: "",
                attributes: {},
            },
        },
        // {
        //     name: "Dashboard",
        //     url: "/panel/dashboard",
        //     icon: "icon-speedometer",
        // },
        // {
        //     name: "Data OPD",
        //     url: "/panel/data-opd",
        //     icon: "icon-folder-alt",
        // },
        {
            title: true,
            name: "Master Data",
            class: "",
            wrapper: {
                element: "",
                attributes: {},
            },
        },
        {
            name: "Main Data",
            // url: "/panel/main-data",
            icon: "icon-folder",
            children: [
                {
                    name: "Agama",
                    url: "/panel/main-data/agama",
                },
                {
                    name: "Bank",
                    url: "/panel/main-data/bank",
                },
                {
                    name: "Jenis PTK",
                    url: "/panel/main-data/jenis-ptk",
                },
                {
                    name: "Lem. Pengangkatan",
                    url: "/panel/main-data/lembaga-pengangkatan",
                },
                {
                    name: "Pangkat/Golongan",
                    url: "/panel/main-data/pangkat-golongan",
                },
                {
                    name: "Status Pegawai",
                    url: "/panel/main-data/status-pegawai",
                },
                {
                    name: "Sumber Gaji",
                    url: "/panel/main-data/sumber-gaji",
                },
                {
                    name: "Tugas Tambahan",
                    url: "/panel/main-data/tugas-tambahan",
                },
            ],
        },
        {
            name: "Pengguna",
            url: "/panel/pengguna",
            icon: "icon-people",
        },
        // {
        //     name: "Icon",
        //     url: "/panel/icon",
        //     icon: "icon-people",
        // },
    ],
};
