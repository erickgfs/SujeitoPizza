import prismaClient from "../../prisma";

interface ListProductRequest {
    category_id: string;
}

class ListProductByCategoryService {
    async execute({ category_id }: ListProductRequest) {
        const productsByCategory = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            }
        })

        return productsByCategory;
    }
}

export { ListProductByCategoryService }