

export interface OrderData {
  fullName: string;
  phoneNumber: string;
  address: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    unit: string;
  }>;
  totalItems: number;
  subtotal: number;
  tax: number;
  total: number;
  orderDate: string;
}


const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  ORDER_EMAIL: import.meta.env.VITE_ORDER_EMAIL || 'mithilabazaar7@gmail.com'
};


const validateEmailJSConfig = (): boolean => {
  const required = ['SERVICE_ID', 'TEMPLATE_ID', 'PUBLIC_KEY'];
  const missing = required.filter(key => !EMAILJS_CONFIG[key as keyof typeof EMAILJS_CONFIG]);
  
  if (missing.length > 0) {
    return false;
  }
  
  return true;
};

export const sendOrderEmail = async (orderData: OrderData): Promise<void> => {
  
  if (!validateEmailJSConfig()) {
    throw new Error('EmailJS configuration is incomplete. Please check environment variables.');
  }
  
  const emailContent = `
New Order Received - Mithila Bazaar

Customer Details:
- Full Name: ${orderData.fullName}
- Phone Number: ${orderData.phoneNumber}
- Address: ${orderData.address}

Order Details:
${orderData.items.map((item) => 
  `- ${item.name} (${item.unit}) x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`
).join('\n')}

Order Summary:
- Total Items: ${orderData.totalItems}
- Subtotal: ₹${orderData.subtotal.toFixed(2)}
- Tax (10%): ₹${orderData.tax.toFixed(2)}
- Grand Total: ₹${orderData.total.toFixed(2)}

Order Date: ${new Date(orderData.orderDate).toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

Please contact the customer to confirm the order and arrange delivery.
  `;

  
  try {
    
    const emailjs = await import('@emailjs/browser');
    
    
    const orderItemsList = orderData.items.map((item, index) => 
      `${index + 1}. ${item.name} (${item.unit}) - Quantity: ${item.quantity} - Price: ₹${item.price.toFixed(2)} - Subtotal: ₹${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const templateParams = {
      to_email: EMAILJS_CONFIG.ORDER_EMAIL,
      subject: 'New Order - Mithila Bazaar',
      message: emailContent,
      customer_name: orderData.fullName,
      customer_phone: orderData.phoneNumber,
      customer_address: orderData.address,
      order_total: orderData.total.toFixed(2),
      order_items: orderItemsList,
      order_date: new Date(orderData.orderDate).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      total_items: orderData.totalItems.toString()
    };

    await emailjs.default.send(
      EMAILJS_CONFIG.SERVICE_ID!,
      EMAILJS_CONFIG.TEMPLATE_ID!,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY!
    );
    
  } catch (error) {
    
    throw new Error(`Failed to send order email: ${error.message}`);
  }
};


export const sendOrderToWhatsApp = async (orderData: OrderData): Promise<void> => {
  const message = `
🛒 *New Order - Mithila Bazaar*

👤 *Customer Details:*
• Name: ${orderData.fullName}
• Phone: ${orderData.phoneNumber}
• Address: ${orderData.address}

📦 *Order Items:*
${orderData.items.map((item, index) => 
  `${index + 1}. ${item.name} (${item.unit}) x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`
).join('\n')}

💰 *Total: ₹${orderData.total.toFixed(2)}*

📅 Order Date: ${new Date(orderData.orderDate).toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
  `;

  
}; 