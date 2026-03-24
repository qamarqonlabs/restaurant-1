export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "appetizers" | "mains" | "desserts" | "beverages"
  rating: number
  reviews: number
  ingredients: string[]
}

export const products: Product[] = [
  // Appetizers
  {
    id: "1",
    name: "Crispy Spring Rolls",
    description: "Golden fried spring rolls with sweet chili dipping sauce",
    price: 7.99,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop",
    category: "appetizers",
    rating: 4.5,
    reviews: 124,
    ingredients: ["Rice paper", "Vegetables", "Pork", "Sweet chili sauce"],
  },
  {
    id: "2",
    name: "Garlic Shrimp Skewers",
    description: "Succulent shrimp marinated in garlic and herbs",
    price: 10.99,
    image:
      "https://images.unsplash.com/photo-1569172131007-4954763443d2?w=500&h=500&fit=crop",
    category: "appetizers",
    rating: 4.7,
    reviews: 89,
    ingredients: ["Shrimp", "Garlic", "Herb butter", "Lemon"],
  },
  {
    id: "3",
    name: "Mozzarella Sticks",
    description: "Breaded and fried mozzarella with marinara sauce",
    price: 6.99,
    image:
      "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=500&h=500&fit=crop",
    category: "appetizers",
    rating: 4.3,
    reviews: 156,
    ingredients: ["Mozzarella cheese", "Breadcrumbs", "Marinara sauce"],
  },
  {
    id: "4",
    name: "Buffalo Chicken Bites",
    description: "Spicy buffalo chicken pieces with blue cheese dip",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1734774924912-dcbb467f8599?w=500&h=500&fit=crop",
    category: "appetizers",
    rating: 4.6,
    reviews: 203,
    ingredients: ["Chicken breast", "Buffalo sauce", "Blue cheese dip"],
  },

  // Main Courses
  {
    id: "5",
    name: "Grilled Salmon Fillet",
    description:
      "Atlantic salmon with lemon butter sauce and seasonal vegetables",
    price: 22.99,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop",
    category: "mains",
    rating: 4.8,
    reviews: 342,
    ingredients: ["Salmon fillet", "Butter", "Lemon", "Fresh vegetables"],
  },
  {
    id: "6",
    name: "Ribeye Steak",
    description:
      "Premium 12oz ribeye steak cooked to perfection with garlic mashed potatoes",
    price: 28.99,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop",
    category: "mains",
    rating: 4.9,
    reviews: 518,
    ingredients: ["Ribeye steak", "Garlic", "Potatoes", "Herbs"],
  },
  {
    id: "7",
    name: "Chicken Parmesan",
    description:
      "Breaded chicken breast topped with marinara and melted mozzarella",
    price: 16.99,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop",
    category: "mains",
    rating: 4.6,
    reviews: 287,
    ingredients: [
      "Chicken breast",
      "Breadcrumbs",
      "Mozzarella",
      "Marinara sauce",
    ],
  },
  {
    id: "8",
    name: "Pasta Carbonara",
    description: "Classic Italian pasta with creamy bacon and parmesan sauce",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?w=500&h=500&fit=crop",
    category: "mains",
    rating: 4.7,
    reviews: 276,
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan cheese"],
  },
  {
    id: "9",
    name: "Thai Green Curry",
    description: "Aromatic green curry with chicken, bamboo shoots, and basil",
    price: 15.99,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop",
    category: "mains",
    rating: 4.5,
    reviews: 195,
    ingredients: ["Chicken", "Green curry paste", "Coconut milk", "Thai basil"],
  },

  // Desserts
  {
    id: "10",
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with melting lava center, served with vanilla ice cream",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop",
    category: "desserts",
    rating: 4.9,
    reviews: 412,
    ingredients: ["Chocolate", "Butter", "Eggs", "Vanilla ice cream"],
  },
  {
    id: "11",
    name: "Tiramisu",
    description:
      "Classic Italian dessert with layers of mascarpone and espresso",
    price: 7.99,
    image:
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&h=500&fit=crop",
    category: "desserts",
    rating: 4.8,
    reviews: 356,
    ingredients: ["Mascarpone", "Espresso", "Ladyfingers", "Cocoa powder"],
  },
  {
    id: "12",
    name: "Strawberry Cheesecake",
    description: "Creamy cheesecake with fresh strawberry topping",
    price: 7.99,
    image:
      "https://images.unsplash.com/photo-1621955511667-e2c316e4575d?w=500&h=500&fit=crop",
    category: "desserts",
    rating: 4.7,
    reviews: 289,
    ingredients: ["Cream cheese", "Graham cracker crust", "Strawberries"],
  },
  {
    id: "13",
    name: "Crème Brûlée",
    description: "Silky custard with caramelized sugar crust",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1676300184943-09b2a08319a3?w=500&h=500&fit=crop",
    category: "desserts",
    rating: 4.8,
    reviews: 198,
    ingredients: ["Cream", "Eggs", "Sugar", "Vanilla"],
  },

  // Beverages
  {
    id: "14",
    name: "Fresh Lemonade",
    description: "Freshly squeezed lemonade with ice",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1573500883698-e3ef47a95feb?w=500&h=500&fit=crop",
    category: "beverages",
    rating: 4.4,
    reviews: 87,
    ingredients: ["Lemons", "Sugar", "Water", "Ice"],
  },
  {
    id: "15",
    name: "Iced Coffee",
    description: "Cold brew coffee with ice and cream",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1630184799082-05623dbdc7f7?w=500&h=500&fit=crop",
    category: "beverages",
    rating: 4.6,
    reviews: 234,
    ingredients: ["Cold brew coffee", "Cream", "Ice"],
  },
  {
    id: "16",
    name: "Mango Smoothie",
    description: "Tropical mango smoothie with yogurt and honey",
    price: 6.99,
    image:
      "https://images.unsplash.com/photo-1619898804188-e7bad4bd2127?w=500&h=500&fit=crop",
    category: "beverages",
    rating: 4.5,
    reviews: 156,
    ingredients: ["Mango", "Yogurt", "Honey", "Ice"],
  },
  {
    id: "17",
    name: "Herbal Tea",
    description: "Soothing herbal tea blend with chamomile and mint",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&h=500&fit=crop",
    category: "beverages",
    rating: 4.3,
    reviews: 123,
    ingredients: ["Chamomile", "Mint", "Honey"],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(
  category: Product["category"]
): Product[] {
  return products.filter((p) => p.category === category)
}

export function getCategories() {
  return ["appetizers", "mains", "desserts", "beverages"] as const
}
