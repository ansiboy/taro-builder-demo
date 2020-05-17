import { createDialogElement } from "../utiltiy";
import { SelectDialog } from "./select-dialog";
import ReactDOM from "react-dom";
import { DataSource } from "maishu-toolkit";
import { ProductCategory } from "../../../models/shopping";
import React from "react";
import { ShoppingService } from "../../../services/shopping";
import { errorHandle } from "maishu-chitu-admin/static";
import { ArrayDataSource } from "maishu-wuzhui-helper";

let shoppingService = new ShoppingService(err => errorHandle(err));
let productDataSource = new DataSource<ProductCategory>({
    select: async (args) => {
        args.maximumRows = 18;
        let items = await shoppingService.categories();

        let dataItems = items.slice(args.startRowIndex, args.startRowIndex + args.maximumRows);
        return { dataItems, totalRowCount: items.length };
    }
});

let a = new ArrayDataSource<ProductCategory>([])

let element = createDialogElement();
export let categoryDialog = ReactDOM.render(<SelectDialog<ProductCategory> dataSource={productDataSource} maxCount={1} idField="Id"
    nameField="Name" imageField="ImagePath" element={element} />, element) as any as SelectDialog<ProductCategory>;
