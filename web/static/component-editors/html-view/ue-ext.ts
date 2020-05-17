var references = ['lib/ueditor/ueditor.config', 'lib/ueditor/ueditor.all.min', 'lib/ueditor/third-party/zeroclipboard/ZeroClipboard'];
export function createEditor(editorId: string, field: HTMLInputElement,
    onContentChanged?: (value: string) => void) {

    window['UEDITOR_HOME_URL'] = "lib/ueditor/";
    requirejs(references, function () {
        (<any>window).ZeroClipboard = arguments[2];
        let UE = window['UE'];
        UE.delEditor(editorId);
        let ue = UE.getEditor(editorId, {
            elementPathEnabled: false,
            enableAutoSave: false
        });

        ue.ready(() => {
            ue.setHeight(300);
            ue.setContent(field.value || '');

            let disable_subscribe = false;

            ue.addListener('contentChange', function (editor) {
                let content: string = this.getContent();
                disable_subscribe = true;
                field.value = content;
                disable_subscribe = false;
                if (onContentChanged) {
                    onContentChanged(content);
                }
            });
        });


    });
}
