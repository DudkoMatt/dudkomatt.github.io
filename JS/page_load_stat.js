// Page Loading Time
(function () {
    let start_load_time = new Date().getTime();
    window.addEventListener("load", function () {
        let end_load_time = new Date().getTime();
        document.getElementById("page_load_time").innerHTML =
            ((end_load_time - start_load_time) / 1000).toString();
    });
})();