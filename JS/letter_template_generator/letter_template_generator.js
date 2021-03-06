import {
    onAdd as notieOnAdd,
    onEmptyForm as notieOnEmptyForm,
    onError as notieOnError,
    onErase as notieOnErase,
    onSavedDataLoad as notieOnSavedDataLoad,
    onRenderingStart as notieOnRenderingStart,
    onRenderingEnd as notieOnRenderingEnd,
    onEraseDone as notieOnEraseDone
} from './extensions/notie.js';

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

    $("#btnResult").on("click", onResult);
    $("#btnFormClean").on("click", () => notieOnErase(() => {onFormClean(); notieOnEraseDone()}));
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
        notieOnSavedDataLoad();
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
        <img src="../../Images/Icons/chevron-right.svg" class="arrow" alt="">
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
        if (processItem(form_value)) {
            notieOnAdd();
        }
    } catch (e) {
        console.error(e);
        notieOnError();
    }

    return false;
}

function processItem(text, save=true) {
    text = text.trim()
    if (text.length > 0) {
        if (save) {
            saveToLocalStorage(text);
        }
        createNewItem(text);
        cleanFormValue();
        updateCounter();

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
        return true;
    } else {
        notieOnEmptyForm();
        return false;
    }
}

function onFormClean() {
    $("#item_container").children().each((idx, elem) => {
        elem.parentNode.removeChild(elem);
    })
    $("#toolbar").addClass("hidden");
    $("#result_container").addClass("hidden");
    $("#idea_counter").text(0);
    cleanFormValue();
    cleanAllLocalStorage();
}

// function sleep(milliseconds) {
//     const date = Date.now();
//     let currentDate = null;
//     do {
//         currentDate = Date.now();
//     } while (currentDate - date < milliseconds);
// }

function onResult() {
    notieOnRenderingStart();
    currentChild = 0;
    renderedText = `Dear Matvey,
I have several ideas to discuss:
`;
    allChildren = $(".item_container__item > span").toArray().map((e) => {
        return e.innerHTML.trim();
    });

    if (allChildren.length > 0) {
        $("#result_container").removeClass("hidden");
        setTimeout(renderResult);
    }
}

let currentChild = 0;
let allChildren = null;
let renderedText = '';
let step = 1;

function renderResult() {
    if (allChildren === null || allChildren.length === 0) {
        throw new Error("allChildren cannot be null");
    }

    // console.log("Before sleep");
    // sleep(100);
    // console.log("After sleep");


    for (let i = currentChild; i < allChildren.length && i < currentChild + step; i++) {
        renderedText += `${(i + 1).toString()}. ${allChildren[i]}:\n`
        renderedText += `\n`
        renderedText += `=== DETAILS ===\n`
        renderedText += `\n`
        renderedText += `\n`
    }

    currentChild = Math.min(currentChild + step, allChildren.length);

    if (currentChild === allChildren.length) {
        $("#result_container_text").text(renderedText);
        notieOnRenderingEnd();
    } else {
        setTimeout(renderResult);
    }
}