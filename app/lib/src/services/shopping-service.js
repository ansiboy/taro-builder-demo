"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("./service");
const config_1 = require("../config");
const service_2 = require("./service");
class ShoppingService extends service_2.MyService {
    constructor() {
        super(...arguments);
        this.counties = (cityId) => {
            var result = this.getByJson(this.url('Address/GetCounties'), { cityId: cityId });
            return result;
        };
        //     setDefaultReceiptInfo(receiptInfoId: string) {
        //         let url = this.url('Address/SetDefaultReceiptInfo');
        //         return this.putByJson(url, { receiptInfoId });
        //     }
        //     deleteReceiptInfo(receiptInfoId: string) {
        //         let url = this.url('Address/DeleteReceiptInfo');
        //         return this.deleteByJson(url, { receiptInfoId });
        //     }
    }
    url(path) {
        return `${config_1.config.shopUrl}${path}`;
    }
    //     /**
    //      * 获取单个商品
    //      * @param productId 商品编号
    //      */
    //     product(productId: string): Promise<Product> {
    //         let url = this.url(`Product/GetProduct`);
    //         return this.getByJson<Product>(url, { productId })
    //             .then(product => this.processProduct(product));
    //     }
    //     /**
    //      * 获取商品优惠
    //      * @param productId 商品编号
    //      */
    //     promotions(productId: string): Promise<Promotion[]> {
    //         let url = this.url('Product/GetProductPromotion');
    //         return this.get<Promotion[]>(url, { productId });
    //     }
    //     productByProperies(groupProductId: string, properties: { [propName: string]: string }): Promise<Product> {
    //         var d = { groupProductId, filter: JSON.stringify(properties) };
    //         return this.getByJson<Product>(this.url('Product/GetProductByPropertyFilter'), d)
    //             .then(o => this.processProduct(o));
    //     }
    //     private processProduct(product: Product): Product {
    //         product.Arguments = product.Arguments || [];
    //         product.Fields = product.Fields || [];
    //         return product;
    //     }
    //     productIntroduce(productId: string): Promise<string> {
    //         let url = this.url('Product/GetProductIntroduce');
    //         return this.getByJson<{ Introduce: string }>(url, { productId }).then(o => o.Introduce);
    //     }
    // products(productsCount: number): Promise<Product[]>;
    // products(categoryId: string, productsCount: number): Promise<Product[]>;
    products(productsCount) {
        // if (typeof categoryId == 'number') {
        //     productsCount = categoryId;
        //     categoryId = null;
        // }
        let url = this.url('Product/GetProducts');
        var args = { maximumRows: productsCount }; //startRowIndex: pageIndex * config.pageSize
        return this.getByJson(url, args).then(o => {
            let ids = o.Products.map(a => a.Id);
            return this.productStocks(ids).then((a) => {
                for (let i = 0; i < o.Products.length; i++) {
                    let stockRecord = a.filter(c => c.ProductId == o.Products[i].Id)[0];
                    if (stockRecord) {
                        o.Products[i].Stock = stockRecord.Quantity;
                    }
                }
                return o.Products;
            });
        });
    }
    productStocks(productIds) {
        let url = `${config_1.config.stockUrl}Stock/GetProductStocks`; //this.url('Product/GetProductStocks');
        return this.getByJson(url, { productIds: productIds });
    }
    async productsByIds(productIds) {
        if (!productIds || productIds.length == 0)
            return [];
        var url = this.url('Product/GetProductsByIds');
        var arr = await Promise.all([this.getByJson(url, { ids: productIds }), this.productStocks(productIds)]);
        let products = arr[0];
        let stcokRecords = arr[1];
        products.forEach(item => {
            let stockRecord = stcokRecords.filter(o => o.ProductId == item.Id)[0];
            if (stockRecord)
                item.Stock = stockRecord.Quantity;
        });
        let dic = {};
        products.forEach(o => dic[o.Id] = o);
        let result = productIds.map(o => dic[o]).filter(o => o != null);
        return result;
    }
    /**
     *
     * @param count 要获取商品的最多数量
     */
    productsByCategory(categoryId, count) {
        var args = { startRowIndex: 0, maximumRows: count };
        if (categoryId) {
            args.filter = `ProductCategoryId=Guid.Parse('${categoryId}')`;
            args.maximumRows = count;
        }
        let url = this.url('Product/GetProducts');
        return this.getByJson(url, args).then(o => {
            // o.Products.forEach(o => {
            //     o.ImagePath = imageUrl(o.ImagePath);
            // });
            return o.Products;
        });
    }
    productCustomProperties(groupId, productId) {
        let url = `${config_1.config.shopUrl}Product/GetProductCustomProperties`;
        return this.getByJson(url, { groupId, productId });
    }
    category(categoryId) {
        let url = this.url('Product/GetCategory');
        return this.getByJson(url, { categoryId });
    }
    categories() {
        let url = this.url('Product/GetCategories');
        return this.getByJson(url);
    }
    toCommentProducts() {
        var result = this.getByJson(this.url('Product/GetToCommentProducts'))
            .then(items => {
            items.forEach(o => o.ImageUrl = service_1.imageUrl(o.ImageUrl));
            return items;
        });
        return result;
    }
    commentedProducts() {
        var result = this.getByJson(this.url('Product/GetCommentedProducts'))
            .then(items => {
            items.forEach(o => o.ImageUrl = service_1.imageUrl(o.ImageUrl));
            return items;
        });
        return result;
    }
    //=====================================================================
    // 收藏夹
    favorProducts() {
        return this.getByJson(this.url('Product/GetFavorProducts')).then(items => {
            items.forEach(o => o.ImageUrl = service_1.imageUrl(o.ImageUrl));
            return items;
        });
    }
    unfavorProduct(productId) {
        return this.postByJson(this.url('Product/UnFavorProduct'), { productId });
    }
    isFavored(productId) {
        return this.getByJson(this.url('Product/IsFavored'), { productId });
    }
    favorProduct(productId) {
        return this.postByJson(this.url('Product/FavorProduct'), { productId });
    }
    //=====================================================================
    // 订单
    // balancePay(orderId: string, amount: number) {
    //     type TResult = { Id: string, Amount: number, BalanceAmount: number };
    //     return this.post<TResult>(this.url('Order/BalancePay'), { orderId: orderId, amount: amount });
    // }
    confirmOrder(orderId, remark, invoice) {
        let args = { orderId, remark, invoice };
        var result = this.postByJson(this.url('Order/ConfirmOrder'), args);
        return result;
    }
    myOrderList(pageIndex, type) {
        let args = {};
        args.startRowIndex = config_1.config.pageSize * pageIndex;
        args.maximumRows = config_1.config.pageSize;
        if (type)
            args.filter = `Status="${type}"`;
        return this.getByJson(this.url('Order/GetMyOrderList'), args)
            .then(orders => {
            orders.forEach(o => {
                o.OrderDetails.forEach(c => c.ImageUrl = service_1.imageUrl(c.ImageUrl));
            });
            return orders;
        });
    }
    order(orderId) {
        return this.getByJson(this.url('Order/GetOrder'), { orderId }).then(o => {
            o.OrderDetails.forEach(c => c.ImageUrl = service_1.imageUrl(c.ImageUrl));
            return o;
        });
    }
    async createOrder(memberName, productIds, quantities) {
        let args = {
            productIds: productIds, quantities: quantities,
            memberName,
        };
        let order = await this.postByJson(this.url('Order/CreateOrder'), args);
        return order;
    }
    cancelOrder(orderId) {
        let url = this.url('Order/CancelOrder');
        return this.putByJson(url, { orderId });
    }
    ordersSummary() {
        return this.getByJson(this.url('Order/GetOrdersSummary'));
    }
    changeReceipt(orderId, receiptId) {
        var result = this.postByJson(this.url('Order/ChangeReceipt'), { orderId, receiptId });
        return result;
    }
    orderStatusText(status) {
        switch (status) {
            case 'Created':
                return '已创建';
            case 'WaitingForPayment':
                return '待付款';
            case 'Paid':
                return '已付款';
            case 'Send':
                return '已发货';
            case 'Received':
                return '已收货';
            case 'Canceled':
                return '已取消';
            case 'WaitingForSend':
                return '待发货';
            case 'Evaluated':
                return '已评价';
        }
    }
    //=====================================================================
    // 优惠券
    couponStatusText(status) {
        switch (status) {
            case 'available':
                return '未使用';
            case 'used':
                return '已使用';
            case 'expired':
                return '已过期';
            default:
                return '';
        }
    }
    /** 获取个人优惠码 */
    myCoupons(pageIndex, status) {
        let url = this.url('Coupon/GetMyCoupons');
        return this.getByJson(url, { pageIndex, status });
    }
    storeCoupons() {
        let url = this.url('Coupon/GetCoupons');
        return this.getByJson(url);
    }
    /** 领取优惠卷 */
    receiveCoupon(couponId) {
        let url = this.url('Coupon/ReceiveCouponCode');
        return this.postByJson(url, { couponId });
    }
    /** 获取订单可用的优惠劵 */
    orderAvailableCoupons(orderId) {
        let url = this.url('Coupon/GetAvailableCouponCodes');
        return this.getByJson(url, { orderId });
    }
    /** 获取店铺优惠劵数量 */
    storeCouponsCount() {
        let url = this.url('Coupon/GetStoreCouponsCount');
        return this.getByJson(url, {});
    }
    // private resizeImage(imageResourceId: string, max_width: number, max_height: number): string {
    //     // var canvas = document.createElement('canvas');
    //     var width: number = img.width;
    //     var height: number = img.height;
    //     // calculate the width and height, constraining the proportions
    //     if (width > height) {
    //         if (width > max_width) {
    //             height = Math.round(height *= max_width / width);
    //             width = max_width;
    //         }
    //     } else {
    //         if (height > max_height) {
    //             width = Math.round(width *= max_height / height);
    //             height = max_height;
    //         }
    //     }
    //     // canvas.width = width;
    //     // canvas.height = height;
    //     // var ctx = canvas.getContext("2d");
    //     // ctx.drawImage(img, 0, 0, width, height);
    //     // return canvas.toDataURL("/jpeg", 0.7);
    //     let ctx = Taro.createCanvasContext(guid());
    //     ctx.drawImage(img, 0, 0, width, height);
    // }
    /**
     * 评价晒单
     * @param score: 评分
     * @param evaluation: 评价
     * @param anonymous: 是否匿名评价
     * @param imageResourceIds: 多个上传的图片，用 ',' 连接
     * @param imageThumbs: 多个缩略图，用 ',' 连接
     */
    evaluateProduct(orderDetailId, score, evaluation, anonymous, imageResourceIds) {
        //let imageString = imageDatas.join(',');
        let imageThumbs = imageResourceIds.map(() => {
            // var image = new Image();
            // image.src = o;
            // return this.resizeImage(o, 200, 200);
        });
        var data = {
            orderDetailId, evaluation,
            score, anonymous,
            imageDatas: imageResourceIds.join(','),
            imageThumbs: imageThumbs.join(','),
        };
        var result = this.postByJson(this.url('Product/EvaluateProduct'), data);
        return result;
    }
    //=====================================================================
    // Address
    receiptInfos() {
        return this.getByJson(this.url('Address/GetReceiptInfos'));
    }
    receiptInfo(id) {
        return this.getByJson(this.url('Address/GetReceiptInfo'), { id })
            .then(o => {
            o.RegionId = o.CountyId;
            return o;
        });
    }
    provinces() {
        var result = this.getByJson(this.url('Address/GetProvinces'));
        return result;
    }
    cities(province) {
        var guidRule = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (guidRule.test(province))
            return this.getByJson(this.url('Address/GetCities'), { provinceId: province });
        return this.getByJson(this.url('Address/GetCities'), { provinceName: province });
        ;
    }
    regions() {
        if (this._regions != null)
            return Promise.resolve(this._regions);
        return this.getByJson(this.url("Address/GetRegions")).then(r => {
            this._regions = r;
            return r;
        });
    }
    saveReceiptInfo(receiptInfo) {
        let url = this.url('Address/SaveReceiptInfo');
        return this.postByJson(url, receiptInfo)
            .then(result => {
            Object.assign(receiptInfo, result);
            return result;
        });
    }
}
exports.ShoppingService = ShoppingService;
//# sourceMappingURL=shopping-service.js.map