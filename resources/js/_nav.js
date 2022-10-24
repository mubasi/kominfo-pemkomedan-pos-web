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
        {
            name: "Transaksi",
            url: "/panel/transaksi",
            icon: "icon-note",
        },
        {
            name: "Riwayat Transaksi",
            url: "/panel/riwayat transaksi",
            icon: "icon-notebook",
        },
        {
            name: "Laporan",
            url: "/panel/laporan",
            icon: "icon-printer",
        },
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
                    name: "Kategori Produk",
                    url: "/panel/master-data/kategori-produk",
                },
                {
                    name: "Produk",
                    url: "/panel/master-data/produk",
                },
                {
                    name: "Pengguna",
                    url: "/panel/master-data/pengguna",
                    // icon: "icon-people",
                },
            ],
        },
        // {
        //     name: "Icon",
        //     url: "/panel/icon",
        //     icon: "icon-people",
        // },
    ],
};
