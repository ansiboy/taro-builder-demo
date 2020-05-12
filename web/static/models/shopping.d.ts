export declare interface Product {
    Id: string
    ImagePath: string
    Name: string
    Stock: number
    Fields: { key: string, value: string }[]
    Arguments: { key: string, value: string }[]
    BuyLimitedNumber: number
    OffShelve?: boolean
    Unit?: string
    FreightSolutionId?: string
}

export declare interface ProductCategory {

}

export declare interface Brand {
    Id: string
}

export declare interface Coupon {
    Id: string
    Ranges: any[]
}

export declare interface FreightSolution {
    Name: string
    DefaultFreight: number

}

export declare interface RegionFreight {

}

export declare interface ProductFreight {

}

export declare interface CityFreight {

}

export declare interface Order {
    Id: string
    StatusText: string
    OrderDetails: OrderDetail[]
    Freight: number
    ReceiptAddress: string
    ExpressBillNo: string
    Status: "Send"
}

export declare interface OrderDetail {
    ProductId: string
    Quantity: number
    Price: number
    Freight: number
}

export declare interface ShipInfo {
    Id: string
    ExpressBillNo: string
    ExpressCompany: string
}