import React from "react";
import { categoryDialog } from "../component-editors/controls/select-dialogs/category-select-dialog";
export default class Temp extends React.Component {
    render() {
        return <div>
            <button onClick={() => {
                categoryDialog.show([], () => {

                });
            }}>Temp</button>
        </div>
    }
}