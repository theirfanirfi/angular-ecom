export interface Payment {
    id: number,
    user_id: string,
    fullname: string,
    expiry_month: number,
    expiry_year: number,
    payment_date: Date,
    price: number,
}