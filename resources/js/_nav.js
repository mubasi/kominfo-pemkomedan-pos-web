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
        {
            name: "Dashboard",
            url: "/panel/dashboard",
            icon: "icon-speedometer",
        },
        {
            name: "Transaksi",
            url: "/panel/transaksi",
            icon: "icon-speedometer",
        },
        {
            name: "Riwayat Transaksi",
            url: "/panel/riwayat transaksi",
            icon: "icon-speedometer",
        },
        {
            name: "Laporan",
            url: "/panel/laporan",
            icon: "icon-speedometer",
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
