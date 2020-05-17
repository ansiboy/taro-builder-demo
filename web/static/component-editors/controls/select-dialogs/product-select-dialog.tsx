import { createDialogElement } from "../utiltiy";
import { SelectDialog } from "./select-dialog";
import ReactDOM from "react-dom";
import { DataSource } from "maishu-toolkit";
import { Product } from "../../../models/shopping";
import React from "react";
import { ShoppingService } from "../../../services/shopping";
import { errorHandle } from "maishu-chitu-admin/static";


let shoppingService = new ShoppingService(err => errorHandle(err));
let productDataSource = new DataSource<Product>({
    select: (args) => {
        args.maximumRows = 18;
        return shoppingService.products(args);
    }
});

let element = createDialogElement();
export let productDialog = ReactDOM.render(<SelectDialog<Product> dataSource={productDataSource} idField="Id"
    nameField="Name" imageField="ImagePath" element={element} />, element) as any as SelectDialog<Product>;
