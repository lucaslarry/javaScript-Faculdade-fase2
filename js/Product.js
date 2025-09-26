export class Product {
  constructor(id, name, price, category, image, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.image = image;
    this.description = description;
  }

  formatPrice(locale = "pt-BR", currency = "BRL") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(this.price);
  }
}
