// On window load
(() => {
    console.log("Generator" + window.location.href);

    $(document).on("keypress", function() {
        $("#input_idea_text").trigger('focus');
    });

    $(window).on("load", () => {
        $("#form_letter_template").on("submit", onFormSubmit);
    });
})();

function getFormValue() {
    return $("#input_idea_text").val();
}

function cleanFormValue() {
    $("#input_idea_text").val('').trigger('blur');
}

function createNewItem(text) {
    $("#item_container").append(`
    <div class="item_container__item">
        <img src="../Images/Icons/chevron-right.svg" class="arrow" alt="">
        <span>
        ${text}
        </span>
    </div>
    `);
}

function updateCounter() {
    let k = $("#item_container").children().length;
    if (k > 0) {
        $("#toolbar").removeClass("hidden");
    } else {
        $("#toolbar").addClass("hidden");
    }
    $("#idea_counter").text(k);
}

function onFormSubmit() {
    try {
        let form_value = getFormValue();
        console.log(form_value);

        if (form_value.length > 0) {
            createNewItem(form_value);
            cleanFormValue();
            updateCounter();
        }

        let lastChild = $("#item_container").children().last();
        let lastChildArrow = lastChild.children("img.arrow")[0];
        lastChildArrow.onclick = (() => {
            lastChild.parent()[0].removeChild(lastChild[0]);
            updateCounter();
        });
    } catch (e) {
        console.error(e);
    }

    return false;
}

function onFormClean() {
    $("#item_container").children().each((idx, elem) => {
        elem.parentNode.removeChild(elem);
    })
    $("#toolbar").addClass("hidden");
    $("#result_container").addClass("hidden");
    $("#idea_counter").text(0);
}

function onResult() {
    $("#result_container").removeClass("hidden");
    let topics = $(".item_container__item > span").toArray().map((e) => {
        return e.innerHTML.trim();
    });

    let text = `Dear Matvey,
I have several ideas to discuss:
`;

    for (let i = 0; i < topics.length; i++) {
        text += `${(i + 1).toString()}. ${topics[i]}:\n`
        text += `\n`
        text += `=== DETAILS ===\n`
        text += `\n`
        text += `\n`
    }

    $("#result_container_text").text(text);
}