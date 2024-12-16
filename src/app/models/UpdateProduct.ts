export class UpdateProduct {
    constructor(
        public sku: string,
        public name: string,
        public description: string,
        public unitPrice: number,
        public imagesString: string,
        public active: boolean,
        public releaseDate: Date,
        public quantity: number,
        public discount: number,
        public authorId: number,
        public publisherId: number,
        public bookCategoryId: number,
    ) {}

}
