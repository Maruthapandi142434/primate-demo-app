const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      description: 'Electronic gadgets and devices',
      isActive: true
    }
  });

  const clothing = await prisma.category.create({
    data: {
      name: 'Clothing',
      description: 'Men and women clothing',
      isActive: true
    }
  });

  // Create products
  const smartphone = await prisma.product.create({
    data: {
      name: 'Smartphone X',
      description: 'Latest smartphone with advanced features',
      price: 599.99,
      categoryId: electronics.id,
      stockQuantity: 100,
      sku: 'ELEC-SMART-X',
      imageUrl: 'https://res.cloudinary.com/dy7wyxs7b/image/upload/v1744458600/405494336_5c009976-fa00-4b1e-8935-ebb766b32d6f_mua778.jpg',
      isFeatured: true,
      isActive: true
    }
  });

  const headphones = await prisma.product.create({
    data: {
      name: 'Wireless Headphones',
      description: 'Noise cancelling wireless headphones',
      price: 199.99,
      categoryId: electronics.id,
      stockQuantity: 50,
      sku: 'ELEC-HEAD-WL',
      imageUrl: 'https://res.cloudinary.com/dy7wyxs7b/image/upload/v1744458099/413019665_11eaf1b9-79a1-4ad3-b8a6-db952d75bdd4_yebhbe.jpg',
      isActive: true
    }
  });

  const tshirt = await prisma.product.create({
    data: {
      name: "Men's T-Shirt",
      description: 'Cotton t-shirt for men',
      price: 29.99,
      categoryId: clothing.id,
      stockQuantity: 200,
      sku: 'CLOTH-TSH-M',
      imageUrl: 'https://res.cloudinary.com/dy7wyxs7b/image/upload/v1744469802/blank_isolated_white_and_black_t_shirt_front_view_template_z3kvnj.jpg',
      isFeatured: true,
      isActive: true
    }
  });

  // Create users
  const hashedPassword = await hash('password123', 10);
  const john = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john@example.com',
      password_hash: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      isActive: true
    }
  });

  const jane = await prisma.user.create({
    data: {
      username: 'jane_smith',
      email: 'jane@example.com',
      password_hash: hashedPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      isActive: true
    }
  });

  // Create admin
  const adminPassword = await hash('admin123', 10);
  await prisma.admin.create({
    data: {
      username: 'admin1',
      email: 'admin@example.com',
      password_hash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'super_admin',
      isActive: true
    }
  });

  // Create order with nested items and shipping details
  const order = await prisma.order.create({
    data: {
      userId: john.id,
      totalAmount: 629.98,
      status: 'processing',
      paymentStatus: 'paid',
      OrderItems: {
        create: [
          {
            productId: smartphone.id,
            quantity: 1,
            unitPrice: 599.99
          },
          {
            productId: tshirt.id,
            quantity: 1,
            unitPrice: 29.99
          }
        ]
      },
      ShippingDetails: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phoneNumber: '1234567890',
          addressLine1: '123 Main St',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          postalCode: '10001'
        }
      },
      Payments: {
        create: {
          paymentMethod: 'credit_card',
          transactionId: 'txn_123456789',
          amount: 629.98,
          status: 'paid',
          razorpayOrderId: 'order_123456789'
        }
      }
    },
    include: {
      OrderItems: true,
      ShippingDetails: true,
      Payments: true
    }
  });

  console.log('Database seeded successfully!');
  console.log('Created order:', order);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });