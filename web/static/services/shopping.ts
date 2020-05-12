import { Service } from "maishu-chitu-admin/static";
import { Product } from "../models/shopping";
import wuzhui, { DataSourceSelectResult } from "maishu-wuzhui-helper";
import { config } from "../config";
import {
    ProductCategory, Brand, Coupon, FreightSolution, RegionFreight,
    ProductFreight, CityFreight, Order, ShipInfo
} from "../models/shopping";
import { pathContact } from "maishu-toolkit";

export class ShoppingService extends Service {
    url(path: string) {
        // return `${config.shopUrl}${path}`;
        return pathContact(config.shopUrl, path);
    }
    get applicationId() {
        return config.applicationId;
    }
    async product(productId: string) {
        let url = this.url('Product/GetProduct');
        let arr = await Promise.all([this.getByJson<Product>(url, { productId }), this.productStocks([productId])])
        let data = arr[0];
        data.Stock = arr[1][0] != null ? arr[1][0].Quantity : null;
        data.Fields = data.Fields || [];
        data.Arguments = data.Arguments || [];

        return data;
    }
    async products(args: wuzhui.DataSourceSelectArguments) {
        var url = this.url('Product/GetProducts');
        let result = await this.getByJson<wuzhui.DataSourceSelectResult<Product>>(url, args);
        result.dataItems.forEach(o => {
            o.Stock = null;
            o.BuyLimitedNumber = null;
        })
        return result;
    }
    async productsByIds(productIds: string[]) {
        var url = this.url('Product/GetProductsByIds');
        let items = await this.getByJson<Product[]>(url, { ids: productIds });//.then(items => {
        let dic: { [key: string]: Product } = {};
        items.filter(o => o != null).forEach(o => dic[o.Id] = o);
        let products = productIds.map(id => dic[id]).filter(o => o != null);
        return products;
    }
    deleteProduct(id: string) {
        var url = this.url('Product/DeleteProduct');
        return this.deleteByJson(url, { id });
    }
    productChildren(parentId: string) {
        var url = this.url('Product/GetProducts');
        var args = { filter: `ParentId == Guid"${parentId}"` } as wuzhui.DataSourceSelectArguments;
        return this.getByJson<wuzhui.DataSourceSelectResult<Product>>(url, args);
    }
    commonProduct(product) {
        alert(product.Id());
    }
    insertProduct(args: { product: Partial<Product>, parentId?, id?}): Promise<{ Id: string }> {
        return this.saveProduct("insert", args);
    }
    updateProduct(args: { product: Partial<Product>, parentId?, id?}): Promise<{ Id: string }> {
        return this.saveProduct("update", args);
    }
    private async saveProduct(method: "insert" | "update", args: { product: Partial<Product>, parentId?, id?}): Promise<{ Id: string }> {
        if (args.product.OffShelve == null)
            args.product.OffShelve = true;

        let { product, parentId, id } = args
        var obj = Object.assign({}, product);
        obj.Arguments = JSON.stringify(product.Arguments) as any;
        obj.Fields = JSON.stringify(product.Fields) as any;
        obj.Unit = obj.Unit || '件';

        let values: any = { model: obj, parentId, id };
        if (product.FreightSolutionId)
            values.freightSolutionId = product.FreightSolutionId;

        let result: any;
        if (method == "insert") {
            result = await this.postByJson<{ Id: string }>(config.shopUrl + 'Product/InsertProduct', values);
        }
        else {
            console.assert(args.product.Id != null);
            result = await this.postByJson<{ Id: string }>(config.shopUrl + 'Product/UpdateProduct', values);
        }

        Object.assign(product, result);
        return result;
    }
    removeProduct(productId) {
        let url = config.shopUrl + 'Product/DeleteProduct';
        return this.deleteByJson(url, { id: productId });
    }
    onShelve(productId) {
        //return services.callMethod('Product/OnShelve', { productId: productId });
        return this.putByJson(this.url('Product/OnShelve'), { productId });
    }
    offShelve(productId) {
        return this.putByJson(this.url('Product/OffShelve'), { productId });
        //return services.callMethod('Product/OffShelve', { productId: productId });
    }
    categories() {
        let url = this.url('Product/GetProductCategories');

        return this.getByJson<ProductCategory[]>(url);
    }
    async addCategory(item: Partial<ProductCategory>) {
        let url = this.url('Product/AddProductCategory');
        let r = await this.postByJson(url, { model: item });
        Object.assign(item, r);
        return r;
    }
    updateCategory(item: Partial<ProductCategory>) {
        let url = this.url('Product/UpdateProductCategory');
        return this.putByJson(url, { model: item })
    }
    deleteCategory(id: string): Promise<any> {
        let url = this.url('Product/DeleteProductCategory');
        return this.deleteByJson(url, { id });
    }
    //==========================================
    // 品牌
    brands(args?: wuzhui.DataSourceSelectArguments) {
        let url = this.url('Product/GetBrands');
        return this.getByJson<wuzhui.DataSourceSelectResult<Brand>>(url, args);
        // .then(o => {
        //     return o.dataItems;
        // });
    }
    addBrand(brand: Partial<Brand>) {
        let url = this.url('Product/AddBrand');
        return this.postByJson(url, { model: brand });
    }
    updateBrand(brand: Partial<Brand>) {
        let url = this.url('Product/UpdateBrand');
        return this.postByJson(url, { model: brand });
    }
    deleteBrand(brand: Partial<Brand>) {
        let url = this.url('Product/DeleteBrand');
        return this.deleteByJson(url, { id: brand.Id });
    }
    //==========================================
    setStock(productId, quantity) {
        let url = `${config.stockUrl}Stock/SetStock`//this.url('Product/SetStock');
        return this.putByJson<any>(url, { productId: productId, quantity: quantity });
    }
    productStocks(productIds: string[]) {
        let url = `${config.stockUrl}Stock/GetProductStocks`;
        return this.getByJson<Array<{ ProductId: string, Quantity: number }>>(url, { productIds: productIds });
    }
    getBuyLimitedNumbers(productIds: string[]) {
        let url = this.url('Product/GetBuyLimitedNumbers');
        return this.getByJson<Array<{ ProductId: string, LimitedNumber: number }>>(url, { productIds: productIds });
    }
    buyLimited(productId, quantity) {
        let url = this.url('Product/SetBuyLimitedQuantity');
        return this.putByJson(url, { productId: productId, quantity: quantity });
    }
    // couponDataSource = new JData.WebDataSource(Service.config.shopUrl + 'ShoppingData/Select?source=Coupons&selection=Id,Title,Discount,Amount,ValidBegin,ValidEnd,ReceiveBegin,ReceiveEnd,\
    //                                                                      Remark,Picture,BrandNames,CategoryNames,ProductNames',
    //     Service.config.shopUrl + 'ShoppingData/Insert?source=Coupons',
    //     Service.config.shopUrl + 'Coupon/UpdateCoupon',
    //     Service.config.shopUrl + 'ShoppingData/Delete?source=Coupons');

    //===================================================
    // 优惠劵
    coupon(id) {
        let url = this.url('Coupon/GetCoupon');
        return this.getByJson<Coupon>(url, { id }).then((c) => {
            c.Ranges = c.Ranges || [];
            return c;
        });
    }
    coupons(args: wuzhui.DataSourceSelectArguments) {
        let url = this.url('Coupon/GetCoupons');
        return this.getByJson<DataSourceSelectResult<Coupon>>(url, { args });
    }
    private addCoupon(coupon: Coupon) {
        let url = this.url('Coupon/AddCoupon');
        return this.postByJson(url, coupon).then(data => {
            Object.assign(coupon, data);
            return data;
        });
    }
    private updateCoupon(coupon: Coupon) {
        let url = this.url('Coupon/UpdateCoupon');
        return this.putByJson(url, coupon);
    }
    saveCoupon(coupon: Partial<Coupon>) {
        let url = this.url('Coupon/SaveCoupon');
        return this.postByJson(url, { coupon });
    }
    deleteCoupon(coupon: Partial<Coupon>) {
        let url = this.url('Coupon/DeleteCoupon');
        return this.deleteByJson(url, { id: coupon.Id });
    }
    couponCodes(args: wuzhui.DataSourceSelectArguments) {
        let url = this.url('Coupon/GetCouponCodes');
        return this.getByJson<wuzhui.DataSourceSelectResult<any>>(url, args).then(result => {
            result.dataItems.forEach(o => {
                if (o.UsedDateTime)
                    o.UsedDateTime = new Date(o.UsedDateTime);

                o.ValidBegin = new Date(o.ValidBegin);
                o.ValidEnd = new Date(o.ValidEnd);
            })
            return result;
        });
    }
    generateCouponCode(couponId: string, count: number) {
        let url = this.url('Coupon/GenerateCouponCode');
        return this.postByJson(url, { couponId, count });
    }
    //===================================================
    getDefineProperties(defineId) {
        return this.getByJson('Product/GetDefineProperties', { defineId: defineId });
    }
    getProductArguments(argumentId) {
        return this.getByJson('Product/GetProductArguments', { argumentId: argumentId });
    }
    //================================================================
    // 运费
    freightSolutions() {
        return this.getByJson<Array<FreightSolution>>(this.url('Freight/GetFreightSolutions'));
    }
    deleteFreightSolution(dataItem) {
        return this.deleteByJson(this.url('Freight/DeleteFreightSolution'), dataItem);
    }
    updateFreightSolution(dataItem) {
        return this.putByJson(this.url('Freight/UpdateFreightSolution'), dataItem);
    }
    addFreightSolution(dataItem: Partial<FreightSolution>) {
        let args = { name: dataItem.Name, freight: dataItem.DefaultFreight };
        return this.postByJson(this.url('Freight/AddFreightSolution'), args);
    }
    setDefaultFreightSolution(id: string) {
        return this.putByJson(this.url('Freight/SetDefaultFreightSolution'), { id });
    }
    regionFreights(solutionId: string) {
        let url = `${config.shopUrl}Freight/GetRegionFreights`
        return this.getByJson<Array<RegionFreight>>(url, { solutionId: solutionId });
    }
    updateRegionFreight(id: string, freight: number, freeAmount?: number) {
        let url = this.url('Freight/SetRegionFreight');
        return this.putByJson(url, { id: id, freight: freight, freeAmount: freeAmount });
    }
    addRegionFreight(freight: number, freeAmount?: number) {
        let url = this.url('Freight/SetRegionFreight');
        return this.putByJson(url, { freight: freight, freeAmount: freeAmount });
    }
    productFreights(args: wuzhui.DataSourceSelectArguments) {
        let url = this.url('Freight/GetProductFreights');
        return this.getByJson<wuzhui.DataSourceSelectResult<ProductFreight>>(url, args);
    }
    addProductFreight(productId: string, solutionId: string): any {
        let url = this.url('Freight/AddProductFreight');
        return this.postByJson(url, { productId, solutionId });
    }
    cityFreight() {
        let url = this.url('Freight/GetCityFreight');
        return this.getByJson<CityFreight>(url);
    }
    updateCityFreight(item: CityFreight) {
        let url = this.url('Freight/UpdateCityFreight');
        return this.putByJson(url, { model: item });
    }
    //================================================================
    // 订单
    static orderStatusText(value: string) {
        switch (value) {
            case 'Confirmed':
                return '已确认';
            case 'Send':
                return '已发货';
            case 'WaitingForPayment':
                return '待付款';
            case 'Canceled':
                return '已取消';
            case 'Paid':
                return '已付款';
            case 'Received':
                return '已收货';
        }
        return value;
    }
    orders(args: wuzhui.DataSourceSelectArguments) {
        let url = this.url('Order/GetOrders');
        return this.getByJson<wuzhui.DataSourceSelectResult<Order>>(url, args).then(result => {
            result.dataItems.forEach(c => c.StatusText = ShoppingService.orderStatusText(c.Status));
            return result;
        });
    }
    updateOrder(order: Order) {
        let url = this.url('Order/UpdateOrder');
        let productIds = order.OrderDetails.map(o => o.ProductId);
        let quantities = order.OrderDetails.map(o => o.Quantity);
        let prices = order.OrderDetails.map(o => o.Price);
        let freight = order.Freight;
        let args = { id: order.Id, productIds, quantities, prices, freight };
        return this.postByJson<Order>(url, args);
    }
    /**
     * 获取订单的发货信息
     * @param orderId 订单编号
     */
    shipInfo(orderId: string) {
        let url = `${config.stockUrl}Stock/GetShipInfo`;
        return this.get<ShipInfo>(url, { orderId });
    }
    async deliverOrder(order: Order, shipInfo: ShipInfo) {
        let url = `${config.stockUrl}Stock/DeliverOrder`;
        let model = {
            ReceiptAddress: order.ReceiptAddress,
            OrderId: order.Id,
            ExpressBillNo: shipInfo.ExpressBillNo,
            ExpressCompany: shipInfo.ExpressCompany
        };
        let result = await this.postByJson<{ Id: string }>(url, { model });
        shipInfo.Id = result.Id;
        order.Status = 'Send';
        return result;
    }

    offlinePayOrder(orderId: string, paymentType: string) {
        let url = this.url('Order/OfflinePayOrder');
        return this.postByJson(url, { orderId, type: paymentType })
    }

    //================================================================
}

