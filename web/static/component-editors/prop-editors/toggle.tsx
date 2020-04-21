import { PropEditor, PropEditorState } from "maishu-jueying";
import React = require("react");

export function toggle(options?: { defaultValue?: boolean }) {
    options = Object.assign({ defaultValue: false } as typeof options, options || {});
    return class extends PropEditor<PropEditorState<boolean>, boolean>{
        render() {
            let { value } = this.props;
            value = value == null ? options.defaultValue : value;
            return <label className="pull-left switch">
                <input type="checkbox" className="ace ace-switch ace-switch-5"
                    checked={value}
                    onChange={e => {
                        this.props.updateComponentProp(e.target.checked);
                    }} />
                <span className="lbl middle"></span>
            </label>
        }
    }
}
