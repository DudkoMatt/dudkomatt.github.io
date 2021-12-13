const DURATION_MESSAGES = 1.5;
const POSITION = 'top';

export function onAdd() {
    notie.alert({
        type: 'success',
        text: 'Successfully added',
        stay: false,
        time: DURATION_MESSAGES,
        position: POSITION
    });
}

export function onError() {
    notie.alert({
        type: 'error',
        text: 'Something went wrong...',
        stay: false,
        time: DURATION_MESSAGES,
        position: POSITION
    });
}

export function onEmptyForm() {
    notie.alert({
        type: 'info',
        text: 'Type in something!',
        stay: false,
        time: DURATION_MESSAGES,
        position: POSITION
    });
}

export function onErase(submitCallback) {
    notie.confirm({
        text: "You are going to erase everything. Are you sure?",
        submitText: "Yes",
        cancelText: "Cancel",
        position: POSITION
    }, submitCallback, () => {
        notie.alert({
            type: 'warning',
            text: 'Canceled',
            stay: false,
            time: DURATION_MESSAGES,
            position: POSITION
        });
    });
}

export function onEraseDone() {
    notie.alert({
        type: 'error',
        text: 'Everything erased',
        stay: false,
        time: DURATION_MESSAGES,
        position: POSITION
    });
}

export function onSavedDataLoad() {
    notie.alert({
        type: 'info',
        text: 'Saved data loaded',
        stay: false,
        time: DURATION_MESSAGES,
        position: POSITION
    });
}

export function onRenderingStart() {
    notie.alert({
        type: 'warning',
        text: 'Rendering started',
        stay: false,
        time: DURATION_MESSAGES,
        position: POSITION
    });
}

export function onRenderingEnd() {
    notie.alert({
        type: 'success',
        text: 'Rendering done. Check the output under the list',
        stay: false,
        time: DURATION_MESSAGES,
        position: POSITION
    });
}