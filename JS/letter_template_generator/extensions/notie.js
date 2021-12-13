// Use-case сценраний:
//
// Для работы со списком идей, который хотелось
// обсудить со мной по почте, стоит добавить систему
// уведомлений, чтобы пользователю было удобнее
// понимать, какие события происходят на странице.
//
// Например:
// 1. Собитие (не)успешного добавления элемента в список;
// 2. Событие загрузки сохраненных элементов из хранилища;
// 3. Подтверждение удаления всех элементов из списка;
// 4. Событие начала/окончания рендеринга результата;
// 5. Подсказка при попытке сохранения пустой формы.
//
// Для решения данной задачи подходит UI библиотека для JS "notie":
// https://github.com/jaredreich/notie

const DURATION_MESSAGES = 1.5;
const POSITION = 'top';

export function onAdd() {
    notie.alert({                          // notie.alert - используется для отображения простого уведомления
        type: 'success',                   // type        - задает цвет уведомлению
        text: 'Successfully added',        // text        - текст уведомления
        stay: false,                       // stay        - следует ли остаться уведомлению навсегда или нет
        time: DURATION_MESSAGES,           // time        - время, через которое уведомление исчезнет
        position: POSITION                 // position    - положение баннера (снизу или сверху)
    });                                    //
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
    notie.confirm({                                                // notie.confirm - подтверждение выполняемой операции
        text: "You are going to erase everything. Are you sure?",  // text          - текст уведомления
        submitText: "Yes",                                         // submitText    - текст кнопки подтверждения
        cancelText: "Cancel",                                      // cancelText    - текст кнопки отмены
        position: POSITION                                         // position      - положение баннера (снизу/сверху)
    },                                                             //
    submitCallback,                                                // submitCallback - callback при подтверждении
    () => {                                                        // cancelCallbackOptional - при отмене
        notie.alert({                                              //
            type: 'warning',                                       //
            text: 'Canceled',                                      //
            stay: false,                                           //
            time: DURATION_MESSAGES,                               //
            position: POSITION                                     //
        });                                                        //
    });                                                            //
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