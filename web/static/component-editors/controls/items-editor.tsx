import { PropEditor, PropEditorState } from "maishu-jueying";
import React from "react";
import "./items-editor.scss";

interface Options<T> {
    nameField: keyof T,
    add?: () => Promise<T>,
}

export function createItemsEditor<T>(options: Options<T>) {
    return class ItemsEditor extends PropEditor<PropEditorState<T[]>, T[]> {
        remove(index: number) {
            let items = this.props.value;
            items.splice(index, 1);
            this.props.updateComponentProp(items);
        }
        add() {
            console.assert(options.add != null);
            options.add().then(item => {
                let items = this.props.value;
                items.push(item);
                this.props.updateComponentProp(items);
            })
        }
        render() {
            let items = this.props.value || [];
            return <div className="items-editor">
                {items.map((o, i) => <div key={i} className="label label-success" style={{ marginRight: 4 }}>
                    <span>{o[options.nameField]}</span>
                    <i className="icon-remove"
                        onClick={e => {
                            this.remove(i);
                        }} />
                </div>)}
                {options.add ? <button className="btn btn-minier btn-primary"
                    onClick={() => this.add()}>
                    <i className="icon-plus"></i>
                    <span>添加</span>
                </button> : null}
            </div>
        }
    }
}