// On window load
(() => {
    console.log("Generator" + window.location.href);

    $(document).on("keypress", function() {
        $("#input_idea_text").trigger('focus');
    });

    $(window).on("load", () => {
        $("#form_letter_template").on("submit", onFormSubmit);
        loadSavedItems();
    });
})();

const KEY_NAME = "LETTER_TEMPLATE_GENERATOR_ITEMS";

function saveToLocalStorage(text) {
    let savedItems = JSON.parse(localStorage.getItem(KEY_NAME));
    if (savedItems) {
        // There's something saved
        savedItems.items.push(text);
    } else {
        savedItems = {
            "items": [text]
        }
    }

    localStorage.setItem(KEY_NAME, JSON.stringify(savedItems));
}

function cleanFromLocalStorage(index) {
    let savedItems = JSON.parse(localStorage.getItem(KEY_NAME));
    if (savedItems) {
        // There's something saved
        savedItems.items = savedItems.items.slice(0, index).concat(savedItems.items.slice(index + 1, savedItems.items.length));
        localStorage.setItem(KEY_NAME, JSON.stringify(savedItems));
    }
}

function cleanAllLocalStorage() {
    localStorage.removeItem(KEY_NAME);
}

function loadSavedItems() {
    let savedItems = JSON.parse(localStorage.getItem(KEY_NAME));
    if (savedItems) {
        // There's something saved
        savedItems.items.forEach((item) => {
            processItem(item, false);
        });
    }
}

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
        processItem(form_value);
    } catch (e) {
        console.error(e);
    }

    return false;
}

function processItem(text, save=true) {
    if (text.length > 0) {
        if (save) {
            saveToLocalStorage(text);
        }
        createNewItem(text);
        cleanFormValue();
        updateCounter();
    }

    let lastChild = $("#item_container").children().last();
    let lastChildArrow = lastChild.children("img.arrow")[0];
    lastChildArrow.onclick = (() => {
        let index = $("#item_container").children().index(lastChild);
        try {
            cleanFromLocalStorage(index);
        } catch (e) {
            console.log(e);
        }

        lastChild.parent()[0].removeChild(lastChild[0]);
        updateCounter();
    });
}

function onFormClean() {
    $("#item_container").children().each((idx, elem) => {
        elem.parentNode.removeChild(elem);
    })
    $("#toolbar").addClass("hidden");
    $("#result_container").addClass("hidden");
    $("#idea_counter").text(0);
    cleanAllLocalStorage();
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