import { PropEditor, PropEditorState } from "maishu-jueying";
import { ProductPart, allProductParts } from "app/components/product/product-parts";
import React from "react";

export class ProductPartsEditor extends PropEditor<PropEditorState<ProductPart[]>, ProductPart[]> {
    render() {
        return <table className="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th>名称</th>
                    <th>显示位置</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {allProductParts.map(o => <tr>
                    <td> {o.name}</td>
                    <td></td>
                    <td className="text-center">
                        <button className="btn btn-minier btn-primary">
                            <i className="icon-pencil"></i>
                            <span>设置</span>
                        </button>
                    </td>
                </tr>)}
            </tbody>

        </table>
    }
}