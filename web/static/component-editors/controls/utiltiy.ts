
export function createDialogElement(className?: string) {
    let element = document.createElement('div');
    if (className)
        element.className = 'modal fade ' + className;
    else
        element.className = 'modal fade ';
        
    // element.style.zIndex = '1000';
    document.body.appendChild(element);
    return element;
}
