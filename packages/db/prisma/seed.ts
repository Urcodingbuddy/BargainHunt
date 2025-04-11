import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.relatedPost.deleteMany();
    await prisma.guide.deleteMany();

  await prisma.guide.create({
    data: {
      slug: "find-best-electronics-deals",
      title: "How to Find the Best Deals on Electronics items ?",
      date: new Date("2023-05-15"),
      author: "Sarah Johnson",
      category: "Shopping Tips",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2000&h=1000&auto=format&fit=crop",
      content: `
         <p>Electronics are among the most sought-after items for online shoppers, but they can also be a significant investment. Finding the best deals requires strategy, timing, and knowing where to look. This guide will help you save money on your next electronics purchase.</p>
      
      <h2>Use Price Comparison Tools</h2>
      <p>Price comparison websites and apps are your best friends when shopping for electronics. These tools scan multiple retailers to find the lowest prices for the exact product you're looking for.</p>
      
      <p>Some of the most effective price comparison tools include:</p>
      <ul>
        <li><strong>BargainHunt</strong>: Our platform compares prices between Amazon and Flipkart in real-time</li>
        <li><strong>PriceHistory</strong>: Shows historical price data so you can see if the current "deal" is actually a good price</li>
        <li><strong>CamelCamelCamel</strong>: Specifically for Amazon, this tool tracks price histories and can alert you to drops</li>
      </ul>
      
      <h2>Time Your Purchases Strategically</h2>
      <p>Electronics prices fluctuate throughout the year, with certain times offering consistently better deals:</p>
      
      <h3>Best Times to Buy</h3>
      <ul>
        <li><strong>Festival Sales</strong>: Diwali, Amazon Great Indian Festival, and Flipkart Big Billion Days offer some of the deepest discounts of the year</li>
        <li><strong>End of Financial Year</strong>: March-April often sees retailers clearing old stock</li>
        <li><strong>New Model Releases</strong>: When a new model is announced, previous generations typically drop in price</li>
        <li><strong>Black Friday/Cyber Monday</strong>: These global shopping events have been adopted by Indian retailers too</li>
      </ul>
      
      <h2>Consider Open Box and Refurbished Options</h2>
      <p>Open box items (products that were returned with opened packaging but are otherwise new) and certified refurbished electronics can offer savings of 15-30% compared to brand new items. Many still come with warranties and have been inspected for quality.</p>
      
      <h2>Use Cashback and Rewards</h2>
      <p>Layer your savings by using:</p>
      <ul>
        <li>Credit card rewards points</li>
        <li>Cashback websites like CashKaro</li>
        <li>Bank offers and EMI options</li>
        <li>Retailer-specific loyalty programs</li>
      </ul>
      
      <h2>Set Up Price Drop Alerts</h2>
      <p>For big-ticket items, patience pays off. Set up price alerts for specific products and wait for the price to drop to your target range. Many price comparison tools offer this feature.</p>
      
      <h2>Check for Student and Professional Discounts</h2>
      <p>If you're a student, teacher, or work in certain professions, you might qualify for special pricing on electronics, especially laptops and software. Always check if you're eligible for these discounts before making a purchase.</p>
      
      <h2>Compare Bundles and Package Deals</h2>
      <p>Sometimes buying products as part of a bundle (like a laptop with a productivity software subscription) can offer better value than purchasing items separately.</p>
      
      <h2>Conclusion</h2>
      <p>Finding the best deals on electronics requires research, timing, and patience. By using price comparison tools, timing your purchases strategically, and layering multiple savings strategies, you can save significantly on your next electronics purchase.</p>
      `,
      relatedPosts: {
        create: [
          {
            title: "Amazon vs Flipkart: Which Offers Better Prices?",
            category: "Price Comparison",
            image:
              "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&h=400&auto=format&fit=crop",
            slug: "amazon-vs-flipkart-price-comparison",
          },
          {
            title: "Ultimate Seasonal Sales Guide: When to Buy What ?",
            category: "Shopping Calendar",
            image:
              "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=600&h=400&auto=format&fit=crop",
            slug: "seasonal-sales-guide",
          },
        ],
      },
    },
  });

  await prisma.guide.create({
    data: {
      slug: "amazon-vs-flipkart-price-comparison",
      title: "Amazon vs Flipkart: Which Offers Better Prices?",
      date: new Date("2024-06-02"),
      author: "Rahul Sharma",
      category: "Price Comparison",
      readTime: "10 min read",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2000&h=1000&auto=format&fit=crop",
      content: `
         <p>Amazon and Flipkart dominate India's e-commerce landscape, with both platforms competing fiercely on price. But which one actually offers better deals? We've analyzed thousands of products across multiple categories to find out.</p>
      
      <h2>Overall Price Comparison</h2>
      <p>In our comprehensive analysis, we found that neither platform consistently offers lower prices across all categories. However, there are patterns worth noting:</p>
      
      <ul>
        <li><strong>Electronics</strong>: Flipkart often has better deals on smartphones and laptops, especially Indian brands</li>
        <li><strong>Home Appliances</strong>: Amazon typically offers better prices on kitchen appliances and home electronics</li>
        <li><strong>Fashion</strong>: Flipkart and its subsidiary Myntra often have better deals on clothing and accessories</li>
        <li><strong>Books</strong>: Amazon consistently offers lower prices on books, both physical and Kindle editions</li>
        <li><strong>Groceries</strong>: Amazon Pantry generally has more competitive pricing than Flipkart Supermart</li>
      </ul>
      
      <h2>Exclusive Brand Partnerships</h2>
      <p>Both platforms have exclusive partnerships with certain brands, which affects pricing:</p>
      
      <h3>Flipkart Exclusives</h3>
      <ul>
        <li>Motorola smartphones</li>
        <li>Certain Xiaomi models</li>
        <li>MarQ appliances (Flipkart's in-house brand)</li>
      </ul>
      
      <h3>Amazon Exclusives</h3>
      <ul>
        <li>OnePlus smartphones</li>
        <li>Amazon Basics products</li>
        <li>Certain Samsung models</li>
      </ul>
      
      <p>For these exclusive products, you'll naturally find better prices on their respective platforms.</p>
      
      <h2>Sale Events Comparison</h2>
      <p>Both platforms host major sales throughout the year, but they differ in terms of discounting strategy:</p>
      
      <h3>Flipkart Big Billion Days</h3>
      <p>Typically offers deeper discounts on smartphones, TVs, and fashion items. Flash sales often feature extremely low prices but limited stock.</p>
      
      <h3>Amazon Great Indian Festival</h3>
      <p>Usually has better deals on home appliances, Amazon devices, and international brands. Discounts might be slightly less aggressive than Flipkart's, but stock availability is generally better.</p>
      
      <h2>Payment Options and Additional Savings</h2>
      <p>Beyond the sticker price, both platforms offer additional ways to save:</p>
      
      <h3>Flipkart</h3>
      <ul>
        <li>Flipkart Pay Later</li>
        <li>SuperCoins rewards program</li>
        <li>Bank partnerships (typically with Axis Bank and ICICI)</li>
      </ul>
      
      <h3>Amazon</h3>
      <ul>
        <li>Amazon Pay</li>
        <li>Amazon Prime benefits (free delivery, early access to deals)</li>
        <li>Bank partnerships (typically with HDFC and SBI)</li>
      </ul>
      
      <h2>Delivery Costs and Speed</h2>
      <p>When considering the total cost of purchase:</p>
      <ul>
        <li>Amazon Prime offers free delivery on most items</li>
        <li>Flipkart Plus provides similar benefits but requires earning SuperCoins</li>
        <li>For non-members, delivery charges can add ₹40-100 to your purchase</li>
      </ul>
      
      <h2>Using BargainHunt to Compare</h2>
      <p>Our price comparison tool automatically checks both Amazon and Flipkart to find you the best deal on any product. We also factor in available coupons, bank offers, and delivery costs to show the true final price.</p>
      
      <h2>Conclusion</h2>
      <p>There's no clear winner in the Amazon vs Flipkart price battle. The better platform depends on what you're buying, when you're buying it, and what payment methods you use. For the best deals, we recommend checking both platforms before making a purchase—or simply using BargainHunt to do the comparison for you automatically.</p>
      `,
      relatedPosts: {
        create: [
          {
            title: "How to Find the Best Deals on Electronics items ?",
            category: "Shopping Tips",
            image:
              "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&h=400&auto=format&fit=crop",
            slug: "find-best-electronics-deals",
          },
          {
            title:
              "10 Browser Extensions That Help You Save Money While Shopping Online",
            category: "Shopping Tools",
            image:
              "https://images.unsplash.com/photo-1610986603166-f78428624e76?q=80&w=600&h=400&auto=format&fit=crop",
            slug: "browser-extensions-save-money",
          },
        ],
      },
    },
  });

  await prisma.guide.create({
    data: {
      slug: "seasonal-sales-guide",
      title: "Ultimate Seasonal Sales Guide: When to Buy What ?",
      date: new Date("2023-06-28"),
      author: "Rahul Sharma",
      category: "Shopping Calendar",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2000&h=1000&auto=format&fit=crop",
      content: `
        <p>Timing is everything when it comes to getting the best deals. Different products go on sale at different times of the year, and knowing these patterns can help you save significantly. This guide breaks down the best time to buy various product categories in India.</p>
        
        <h2>January-February</h2>
        <h3>Best Buys:</h3>
        <ul>
          <li><strong>Winter Clothing</strong>: End-of-season sales offer 40-70% discounts</li>
          <li><strong>Fitness Equipment</strong>: New Year resolution promotions</li>
          <li><strong>TVs</strong>: Pre-budget sales and clearance of previous year's models</li>
          <li><strong>Furniture</strong>: January clearance sales</li>
        </ul>
        
        <h2>March-April (End of Financial Year)</h2>
        <h3>Best Buys:</h3>
        <ul>
          <li><strong>Cars and Two-wheelers</strong>: Dealerships offer discounts to meet yearly targets</li>
          <li><strong>Home Appliances</strong>: Clearance sales to make room for new models</li>
          <li><strong>Laptops and Computers</strong>: End of financial year sales</li>
          <li><strong>Air Conditioners</strong>: Pre-summer sales</li>
        </ul>
        
        <h2>May-June</h2>
        <h3>Best Buys:</h3>
        <ul>
          <li><strong>Refrigerators</strong>: Summer peak season with competitive pricing</li>
          <li><strong>Summer Clothing</strong>: Mid-season sales</li>
          <li><strong>Mattresses</strong>: Traditional time for mattress sales</li>
        </ul>
        
        <h2>July-August (Monsoon Sales)</h2>
        <h3>Best Buys:</h3>
        <ul>
          <li><strong>Electronics</strong>: Independence Day sales</li>
          <li><strong>Monsoon Gear</strong>: Umbrellas, raincoats, waterproof items</li>
          <li><strong>Summer Clothing</strong>: End-of-season clearance (60-80% off)</li>
          <li><strong>School Supplies</strong>: Back-to-school promotions</li>
        </ul>
        
        <h2>September-October (Festival Season)</h2>
        <h3>Best Buys:</h3>
        <ul>
          <li><strong>Smartphones</strong>: Deepest discounts during Flipkart Big Billion Days and Amazon Great Indian Festival</li>
          <li><strong>Home Appliances</strong>: Major festival sales</li>
          <li><strong>Electronics</strong>: Diwali and Navratri sales</li>
          <li><strong>Jewelry</strong>: Dhanteras promotions</li>
          <li><strong>Home Decor</strong>: Pre-Diwali sales</li>
        </ul>
        
        <h2>November-December</h2>
        <h3>Best Buys:</h3>
        <ul>
          <li><strong>Winter Clothing</strong>: Early season discounts</li>
          <li><strong>Electronics</strong>: Black Friday and Cyber Monday sales (increasingly popular in India)</li>
          <li><strong>Year-end Clearance</strong>: Across most categories</li>
          <li><strong>Wedding Season Items</strong>: Clothing, jewelry, gifts</li>
        </ul>
        
        <h2>Product-Specific Timing</h2>
        
        <h3>Smartphones</h3>
        <p><strong>Best time to buy:</strong> During festival sales (September-October) and after new model launches</p>
        <p>When a new flagship phone is released, previous generation models typically drop 15-30% in price. Research launch cycles for brands you're interested in.</p>
        
        <h3>Laptops and Computers</h3>
        <p><strong>Best time to buy:</strong> Back-to-school season (June-July) and end of financial year (March)</p>
        <p>New models are typically released in April-May and October-November, making the months following these releases good times to buy previous models at a discount.</p>
        
        <h3>Televisions</h3>
        <p><strong>Best time to buy:</strong> January (pre-budget) and during festival sales</p>
        <p>New TV models are usually announced at CES in January and released in March-April, making January-February good for previous model discounts.</p>
        
        <h3>Home Appliances</h3>
        <p><strong>Best time to buy:</strong> Depends on the appliance</p>
        <ul>
          <li>Air Conditioners: Winter months (November-January)</li>
          <li>Heaters: Summer months (April-June)</li>
          <li>Refrigerators: Winter months except during festival sales</li>
        </ul>
        
        <h2>Using BargainHunt's Price Tracking</h2>
        <p>Our price history tools can help you determine if the current price for an item is actually a good deal compared to its historical prices. Set up alerts for products you're interested in, and we'll notify you when they hit your target price.</p>
        
        <h2>Conclusion</h2>
        <p>Timing your purchases according to these seasonal patterns can result in savings of 20-60% depending on the product category. Combine this knowledge with BargainHunt's price comparison tools to ensure you're always getting the best possible deal.</p>
      `,
      relatedPosts: {
        create: [
          {
            title: "Amazon vs Flipkart: Which Offers Better Prices?",
        category: "Price Comparison",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "amazon-vs-flipkart-price-comparison",
          },
          {
            title: "How to Find the Best Deals on Electronics items ?",
        category: "Shopping Tips",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "find-best-electronics-deals",
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});
