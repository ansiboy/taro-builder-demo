
export function createDialogElement(className: string) {
    let element = document.createElement('div');
    element.className = 'modal fade ' + className;
    // element.style.zIndex = '1000';
    document.body.appendChild(element);
    return element;
}
