import prismaClient from "../../prisma";

interface ItemRequest {
    amount: number,
    product_id: string,
    order_id: string
}

class AddItemService {
    async execute({amount, order_id, product_id}: ItemRequest) {

        const item = await prismaClient.item.create({
            data: {
                amount: amount,
                product_id: product_id,
                order_id: order_id
            }
        })

        return item;
    }
}

export { AddItemService }