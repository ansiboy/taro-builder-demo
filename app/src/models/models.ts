export interface Brand {
    Id: string;
    Name: string;
    Image?: string;
}

export interface Coupon {
    Id: string,
    Amount: number,
    Discount: number,
    Remark: string,
    Title: string,
    ValidBegin: Date,
    ValidEnd: Date,
    Ranges: PromotionRangeRule[],
}

export interface CouponCode {
    Id: string,
    Amount: number,
    Code: string,
    Discount: number,
    CouponId: string,
    Remark: string,
    ReceiveBegin: Date,
    ReceiveEnd: Date,
    Title: string,
    ValidBegin: Date,
    ValidEnd: Date,
    UsedDateTime: Date,
    CreateDateTime: Date,
    Content: string,
}

export interface ReceiptInfo {
    Address: string,
    CityId: string,
    CityName: string,
    Consignee: string,
    CountyId: string,
    CountyName: string,
    FullAddress: string,
    Id: string,
    IsDefault: boolean,
    Mobile: string,
    Name: string,
    Phone: string,
    PostalCode: string,
    ProvinceId: string,
    ProvinceName: string,
    RegionId: string
}

export interface ProductComent {
    Id: string,
    Name: string,
    ImageUrl: string,
    Status: 'Evaluated' | 'ToEvaluate',
    OrderDetailId: string,
}

export interface FavorProduct {
    Id: string;
    ProductId: string,
    ProductName: string,
    ImageUrl: string
}



export interface Region {
    Id: string,
    Name: string,
    ParentId?: string,
    SortNumber?: number
}

export interface ShoppingCartItem {
    Id: string,
    Amount: number,
    Count: number,
    ImagePath: string,
    IsGiven?: boolean,
    Name: string,
    ProductId: string,
    Remark?: string,
    Score?: number,
    Selected: boolean,
    Unit?: number,
    Price: number,
    Type?: 'Reduce' | 'Discount'
}

export interface Province {
    Id: string,
    Name: string
    Cities: Array<Citie>
}
export interface Citie {
    Id: string,
    Name: string,
}



export interface UserInfo {
    Id: string;
    NickName: string;

    County: string;
    Province: string;
    City: string;
    CountyId: string;
    ProvinceId: string,
    CityId: string,

    HeadImageUrl: string;
    Gender: string;
    // UserId: string;
    CreateDateTime: string;
    Mobile: string,
    Balance: number,
}





export interface ControlData {
    controlId: string, controlName: string, data?: any
    selected?: boolean | 'disabled',
    position: 'header' | 'view' | 'footer',
    /**
     * 是否保存到数据库，默认保存，true 保存，false 不保存
     */
    save?: boolean,
}

// interface PageData {
//     id?: string,
//     name?: string,
//     remark?: string,
//     isDefault?: boolean,
//     // showMenu?: boolean,
//     className?: string,
//     createDateTime?: Date,
//     version?: number,
//     templateId?: string,
//     /**
//      * 页面的类型，默认为 page
//      * snapshoot 为页面快照
//      * productTemplate 为商品模板
//      * page 为普通页面
//      * system 为系统页面
//      */
//     type?: 'snapshoot' | 'productTemplate' | 'page' | 'system',
//     controls: ControlData[]
// }

interface News {
    Id: string, Title: string, ImgUrl: string,
    Date: Date, Content: string
}

interface HomeProduct {
    Id: string, Name: string, ImagePath: string,
    ProductId: string, Price: number, PromotionLabel: string
}

interface LoginResult {
    token: string
}

type SiteImageData = {
    id: string, width?: number, height?: number
}

type StyleColor = 'default' | 'red' | 'green' | 'pink' | 'goldenrod';

interface Store {
    Id: string,
    Name: string,
    ImagePath: string,
    Style?: StyleColor,
    // data: { ImageId?: string, Style?: StyleColor },
}

interface DataSourceSelectArguments {
    startRowIndex?: number;
    maximumRows?: number;
    sortExpression?: string;
    filter?: string;
}

export type PromotionType = 'Given' | 'Reduce' | 'Discount';
export type PromotionMethod = 'Count' | 'Amount';
export interface Promotion {
    Id: string,
    Type: PromotionType,
    Method: PromotionMethod,
    IsAll: boolean,
    CreateDateTime: Date,
    PromotionContentRules: PromotionContentRule[],
    PromotionRangeRules: PromotionRangeRule[]
    Contents: {
        Id: string,
        Description: string
    }[],
}

export interface PromotionContentRule {
    Id: string,
    LevelValue: number,
    // Type: string,
    // Method: string,
    Description?: string,
    // ObjectType: string,
    // ObjectId: string,
    // ObjectName: string,
    // CollectionType: string,
    GivenValue: string,
    PromotionId: string,
    CreateDateTime: Date,
}

export interface PromotionRangeRule {
    Id: string,
    ObjectType: "Category" | "Product" | "Brand",
    ObjectId: string,
    ObjectName: string,
    CollectionType: 'Include' | 'Exclude'
    PromotionId?: string,
    CreateDateTime: Date
}

export interface PromotionActivity {
    Id: string,
    Name: string,
    BeginDate: Date,
    EndDate: Date,
}

export type OrderStatus = 'WaitingForPayment' | 'Send' | 'Paid' |
    'ToEvaluate' | 'Canceled' | 'Evaluated' | 'Received';

export interface Order {
    ApplicationId: string;
    Id: string,
    /** 订单日期 */
    OrderDate: Date,
    /** 收件人 */
    Consignee: string,
    /** 收货人地址 */
    ReceiptAddress: string,
    /** 状态 */
    Status: OrderStatus
    /** 状态文字 */
    StatusText: string,
    /** 序列号 */
    Serial: string,
    /** 运费 */
    Freight: number,
    /** 发票信息 */
    Invoice: string,
    /** 备注 */
    Remark: string,
    /** 合计金额 */
    Sum: number,
    OrderDetails: OrderDetail[]
    Amount: number,
    CouponTitle: string,
    Discount: number,
    // StatusText: string,
    CustomerId: string,
    MemberName: string,
}

export interface OrderDetail {
    // Id: string,
    ImageUrl: string,
    // ImagePath: string,
    ProductId: string,
    ProductName: string,
    Price: number,
    Quantity: number,
    Score: number,
    Id: string,
    Unit: string,
}

export interface FreightSolution {
    Id?: string,
    Name: string,
    IsDefault: boolean,
    DefaultFreight?: number,
}

export interface ProductFreight {
    Id: string,
    Name: string,
    ObjectId: string,
    ObjectType: string,
    SolutionId: string,
    SolutionName: string
}




export interface CityFreight {
    Id: string,
    /** 配送金额 */
    SendAmount: number,
    /** 运费 */
    Freight: number,
    /** 配送范围 */
    SendRadius: number,
}

export interface ProductCategory {
    Id: string, Name: string, ParentId?: string,
    SortNumber?: number, Remark?: string, Hidden?: boolean,
    ImagePath?: string
}

export type Category = ProductCategory;

// interface Category {
//     Id: string, Name: string, ParentId?: string,
//     SortNumber?: number, Remark?: string, Hidden?: boolean,
//     ImagePath?: string
// }

export interface Product {
    Id: string;
    BuyLimitedNumber: number;
    // ChildrenCount: number;
    Name: string;
    Unit: string;
    OffShelve?: boolean;
    MemberPrice: number;
    Price: number;
    CostPrice: string;
    Introduce: string;
    ImagePath: string;
    // ImagePaths: string[];
    ImageCover: string;
    Score: number;
    ProductCategoryId: string,
    BrandId: string,
    SKU: string,
    Stock: number;
    ParentId: string,
    Fields: { key: string, value: string }[],
    Arguments: { key: string, value: string }[],
    Title: string,
    // CustomProperties: Array<CustomProperty>,
    Promotions: Promotion[],
    GroupId: string,
    ProductCategoryName: string,
    FreightSolutionId: string,
    SortNumber?: number
}

export interface CustomProperty {
    Name: string,
    Options: Array<{ Name: string, Selected: boolean, Value: string }>
}



export interface RegionFreight {
    Id: string,
    FreeAmount: number,
    Freight: number,
    RegionId: string,
    RegionName: string,
    SolutionId: string
}

export interface ShipInfo {
    Id?: string,
    ExpressBillNo: string;
    ExpressCompany: string;

}