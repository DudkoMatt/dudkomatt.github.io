$(window).on("load", function () {
    let lastId = "top";
    let topMenu = $(".header-navigation__list");
    let topMenuHeight = topMenu.outerHeight();
    let menuItems = topMenu.find("a");

    let scrollItems = menuItems.map(function () {
        return $($(this).attr("href"));
    });

    $(window).on("scroll", function () {
        let fromTop = $(".header__navigation").offset().top + topMenuHeight;

        let cur = scrollItems.map(function () {
            if (this.offset().top < fromTop) {
                return this;
            }
        }).last()[0];

        let id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            menuItems
                .removeClass("header-navigation__item_active")
                .filter("[href='#" + id + "']")
                .addClass("header-navigation__item_active");
        }
    });
});

