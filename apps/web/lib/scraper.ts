import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { unique } from "next/dist/build/utils";


chromium.setGraphicsMode = false;

export async function scrapeProduct(searchParams: string) {
  if (!searchParams) return;
  console.log("Scraping Amazon and Flipkart for:", searchParams);
  try {
    const [amazonData, flipkartData] = await Promise.all([
      scrapeAmazon(searchParams),
      scrapeFlipkart(searchParams),
    ]);
    // console.log(amazonData, flipkartData);
    console.log("Scraping End");
    return {
      amazon: amazonData || [],
      flipkart: flipkartData || [],
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error in scrapeProduct:", error);
    return {
      amazon: [],
      flipkart: [],
      timestamp: new Date().toISOString(),
    };
  }
}

async function launchBrowser() {
  const randomDelay = Math.floor(Math.random() * 1000) + 500;
  await new Promise((resolve) => setTimeout(resolve, randomDelay));
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Edge/122.0.0.0",
  ];

  const randomUserAgent =
    userAgents[Math.floor(Math.random() * userAgents.length)];

  try {
    return await puppeteer.launch({
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
        "--disable-blink-features=AutomationControlled", // Hide automation flag
        `--user-agent=${randomUserAgent}`,
      ],
      executablePath:
        process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath()),
      headless: false,
      defaultViewport: {
        width: 1366 + Math.floor(Math.random() * 100),
        height: 768 + Math.floor(Math.random() * 100),
      },
    });
  } catch (error: any) {
    console.error("Browser launch error:", error);
    if (error.code === "ETXTBSY") {
      console.log(
        "ETXTBSY error detected, waiting and retrying browser launch..."
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await launchBrowser();
    }
    throw error;
  }
}

async function scrapeAmazon(searchParams: string) {
  let browser;
  let retryCount = 0;
  const maxRetries = 2;

  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    page.setDefaultNavigationTimeout(8000);
    page.setDefaultTimeout(8000);

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      "Cache-Control": "max-age=0",
      "Sec-Ch-Ua": '"Google Chrome";v="98", " Not;A Brand";v="99"',
      "Sec-Ch-Ua-Mobile": "?0",
    });

    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const resourceType = req.resourceType();
      if (
        resourceType === "image" ||
        resourceType === "stylesheet" ||
        resourceType === "font" ||
        resourceType === "media"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    browser.setCookie({
      name: "session-id",
      value: `${Date.now()}`,
      domain: ".amazon.in",
      path: "/",
      expires: Date.now() + 1000 * 60 * 60 * 24,
      httpOnly: false,
      secure: true,
      sameSite: "None",
    });

    const BASE_URL = "https://www.amazon.in/s?k=";
    const amazonUrl = `${BASE_URL}${encodeURIComponent(searchParams.trim().replace(/\s+/g, " "))}`;
    console.log(`Navigating to Amazon (attempt ${retryCount + 1})...`);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    await page
      .goto(amazonUrl, {
        waitUntil: "networkidle2",
        timeout: 20000,
      })
      .catch(async (err) => {
        console.log(
          "Amazon navigation timeout, proceeding anyway:",
          err.message
        );
        await new Promise((resolve) => setTimeout(resolve, 3000));
      });
    await page.mouse.move(100, 100);
    await page.evaluate(() => window.scrollBy(0, 100));
    console.log("Checking Amazon page status...");

    const captchaDetected = await page.evaluate(() => {
      return (
        document.body.textContent?.includes("captcha") ||
        document.body.textContent?.includes("robot") ||
        document.title.includes("Robot") ||
        document.body.textContent?.includes("verify your identity")
      );
    });

    if (captchaDetected) {
      console.log("Amazon bot detection triggered - attempting bypass");
      // Wait a bit to simulate human behavior
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Try clicking any "I'm not a robot" button if present
      try {
        await page.click('input[type="submit"]');
        await page.waitForNavigation({
          waitUntil: "networkidle2",
          timeout: 5000,
        });
      } catch (e) {
        console.log("No clickable captcha button found");
      }

      // If still on captcha, try reload
      const stillCaptcha = await page.evaluate(() => {
        return document.body.textContent?.includes("captcha");
      });

      if (stillCaptcha) {
        console.log("Amazon bot detection triggered - attempting bypass");
        await page.reload({ waitUntil: "networkidle2" });
      }
    }

    const rushHourDetected = await page.evaluate(() => {
      return (
        document.title.includes("503") ||
        document.body.textContent?.includes("rush hour") ||
        document.body.textContent?.includes("traffic is piling up")
      );
    });

    if (rushHourDetected) {
      console.log(
        "Amazon rush hour page detected - implementing bypass strategy"
      );

      // Wait and add random mouse movements to appear human
      await page.mouse.move(
        300 + Math.random() * 100,
        400 + Math.random() * 100
      );
      await new Promise((resolve) =>
        setTimeout(resolve, 2000 + Math.random() * 300)
      );

      // Click on the "Go to the Amazon.in home page" link
      try {
        await page.click('a[href*="amazon.in/ref=cs_503_link"]');
        await page.waitForNavigation({
          waitUntil: "networkidle2",
          timeout: 10000,
        });

        // Now search again from the home page with the search box
        await page.type("#twotabsearchtextbox", searchParams);
        await page.click('input[type="submit"]');
        await page.waitForNavigation({
          waitUntil: "networkidle2",
          timeout: 10000,
        });
      } catch (e) {
        console.log("Failed to navigate from rush hour page:", e);
        const pageContent = await page.content();
        console.log("Falulty Page: " + pageContent);
        throw new Error("Rush hour page bypass failed");
      }
    }

    const selectors = [
      ".s-card-container",
      ".s-result-item",
      ".sg-col-inner .a-section",
      ".s-main-slot > div",
    ];

    let selectedSelector = "";

    for (const selector of selectors) {
      console.log(`Trying Amazon selector: ${selector}`);
      try {
        const exists = await page.evaluate((sel) => {
          return document.querySelectorAll(sel).length > 0;
        }, selector);

        if (exists) {
          selectedSelector = selector;
          console.log(`Found working Amazon selector: ${selector}`);
          break;
        }
      } catch (error) {
        console.log(`Selector ${selector} failed: ${error}`);
      }
    }

    if (!selectedSelector) {
      console.log(
        "No suitable Amazon selectors found, returning empty results"
      );
      return [];
    }

    const amazonData = await page.evaluate((productSelector) => {
      const findText = (element: any, selectors: any) => {
        for (const selector of selectors) {
          const el = element.querySelector(selector);
          if (el && el.textContent) {
            return el.textContent.trim();
          }
        }
        return "N/A";
      };

      const nameSelectors = [
        ".a-size-medium.a-color-base.a-text-normal",
        ".a-size-base-plus.a-color-base.a-text-normal",
        ".a-size-medium.a-spacing-none.a-color-base.a-text-normal",
        "h2 .a-link-normal",
        "h2",
      ];

      const priceSelectors = [
        ".a-price .a-offscreen",
        ".a-price-whole",
        ".a-price",
        ".a-color-price",
      ];

      const originalPriceSelector = [".a-price span", ".a-text-price"];

      const ratingSelectors = [
        ".a-icon-star-small",
        ".a-icon-star .a-icon-alt",
        ".a-icon-star",
      ];

      const reviewsSelectors = [
        ".a-size-base.s-underline-text",
        ".a-size-base",
        ".a-link-normal .a-size-base",
      ];

      const boughtInPastMonthSelector = [
        ".a-row.a-size-base .a-size-base.a-color-secondary",
      ];

      const discountSelector = [".a-size-base.a-color-price"];

      const availabilitySelector = [".a-size-medium.a-color-success"];

      const imageSelectors = [".s-image", "img"];

      return Array.from(document.querySelectorAll(productSelector))
        .map((el) => {
          const linkElement = el.querySelector("a");
          const link = linkElement?.getAttribute("href");

          if (!link) return null;

          const fullLink = link.startsWith("http")
            ? link
            : `https://www.amazon.in${link}`;

          let image = "";
          for (const imgSelector of imageSelectors) {
            const imgEl = el.querySelector(imgSelector);
            if (imgEl) {
              image = imgEl.getAttribute("src") || "";
              if (image) break;
            }
          }

          let uniqueID = "";
          const name = findText(el, nameSelectors);
          const price= findText(el, priceSelectors);
          if(name && price){
            uniqueID = name + " | " + price;
          }else{
            uniqueID = "N/A";
          }

          return {
            uniqueID: uniqueID,
            name: findText(el, nameSelectors) || "N/A",
            rating: findText(el, ratingSelectors),
            reviews: findText(el, reviewsSelectors),
            boughtInPastMonth: findText(el, boughtInPastMonthSelector),
            originalPrice: findText(el, originalPriceSelector),
            price: findText(el, priceSelectors) || "N/A",
            discount: findText(el, discountSelector),
            availability: findText(el, availabilitySelector),
            image: image,
            link: fullLink,
          };
        })
        .filter(
          (item) =>
            item &&
            item.name !== "N/A" &&
            item.name.length > 0 &&
            item.price !== "N/A"
        )
        .slice(0, 10);
    }, selectedSelector);
    await page.close();
    return amazonData;
  } catch (error) {
    console.error(`Amazon scraping attempt ${retryCount + 1} failed:`, error);
    if (browser) await browser.close();
    retryCount++;
    if (retryCount < maxRetries) {
      console.log(
        `Retrying Amazon scrape (attempt ${retryCount + 1} of ${maxRetries})...`
      );
      await new Promise((resolve) => setTimeout(resolve, 10000 * retryCount)); // Increasing backoff
    } else {
      console.log("All Amazon scraping attempts failed");
      return [];
    }
  }
}

async function scrapeFlipkart(searchParams: string) {
  let browser;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    page.setDefaultNavigationTimeout(8000);
    page.setDefaultTimeout(8000);

    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (
        ["stylesheet", "font", "media", "other"].includes(req.resourceType())
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    });

    const BASE_URL = "https://www.flipkart.com/search?q=";
    const flipkartUrl = `${BASE_URL}${encodeURIComponent(searchParams.trim().replace(/\s+/g, " "))}`;
    console.log("Navigating to Flipkart...");

    await page
      .goto(flipkartUrl, {
        waitUntil: "networkidle2",
        timeout: 20000,
      })
      .catch(async (err) => {
        console.log(
          "Flipkart navigation timeout, proceeding anyway:",
          err.message
        );
        await new Promise((resolve) => setTimeout(resolve, 3000));
      });

    const blockedPage = await page.evaluate(() => {
      return {
        retry: !!document.querySelector("#retry_btn"),
        login: !!document.querySelector("._3wFoIb"),
        popup: !!document.querySelector("._2KpZ6l"),
      };
    });

    if (blockedPage.retry || blockedPage.login || blockedPage.popup) {
      console.log("Flipkart blocking page detected!");

      // Handle retry button
      if (blockedPage.retry) {
        console.log("Rush page detected! Waiting for 3 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 3000));

        try {
          console.log("Clicking 'Try Now' button...");
          await page.locator("button").click();
          await page
            .waitForNavigation({
              waitUntil: "networkidle2",
              timeout: 20000,
            })
            .catch(() =>
              console.log("Navigation after retry button timed out")
            );
        } catch (error) {
          console.log(`Error clicking retry button: ${error}`);
        }
      }

      if (blockedPage.popup) {
        try {
          console.log("Closing popup...");
          await page.click("button._2KpZ6l");
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.log(`Error closing popup: ${error}`);
        }
      }
    }

    const selectors = [".cPHDOP.col-12-12", "._75nlfW"];

    let selectedSelector = "";
    for (const selector of selectors) {
      console.log(`Trying Flipkart selector: ${selector}`);
      try {
        // Check if selector exists and has items
        const exists = await page.evaluate((sel) => {
          return document.querySelectorAll(sel).length > 0;
        }, selector);

        if (exists) {
          selectedSelector = selector;
          console.log(`Found working Flipkart selector: ${selector}`);
          break;
        }
      } catch (error) {
        console.log(`Selector ${selector} failed: ${error}`);
      }
    }

    if (!selectedSelector) {
      console.log(
        "No suitable Flipkart selectors found, returning empty results"
      );
      return [];
    }

    const flipkartData = await page.evaluate((productSelector) => {
      const findText = (element: any, selectors: any) => {
        for (const selector of selectors) {
          const el = element.querySelector(selector);
          if (el && el.textContent) {
            return el.textContent.trim();
          }
        }
        return "N/A";
      };

      const nameSelectors = [".KzDlHZ", "._4rR01T", "._Spp8"];

      const detailsSelectors = [".G4BRas li.J\\+igdf", "._1xgFaf", "._3Djpdu"];

      const priceSelectors = [".Nx9bqj._4b5DiR", "._30jeq3", "._1_WHN1"];

      const originalPriceSelectors = [".yRaY8j.ZYYwLA", "._3I9_wc", "._27UcVY"];

      const imageSelectors = [".DByuf4", "._396cs4", "._2r_T1I"];

      // Process products
      return Array.from(document.querySelectorAll(productSelector))
        .map((el) => {
          // Extract link first as it's crucial
          const linkElement = el.querySelector("a");
          const link = linkElement?.getAttribute("href");

          // Skip if no link found (likely not a product)
          if (!link) return null;

          const fullLink = link.startsWith("http")
            ? link
            : `https://www.flipkart.com${link}`;

                    
          // Get details
          let details = "";
          for (const selector of detailsSelectors) {
            try {
              const detailsElement = el.querySelector(selector);
              if (detailsElement) {
                details = detailsElement.textContent?.trim() || "";
                break;
              }
            } catch (error) {
              console.log(`Selector ${selector} failed: ${error}`);
            }
          }

          let image = "";
          for (const imgSelector of imageSelectors) {
            const imgEl = el.querySelector(imgSelector);
            if (imgEl) {
              image = imgEl.getAttribute("src") || "";
              if (image) break;
            }
          }

          
          let uniqueID = "";
          const name = findText(el, nameSelectors);
          const price= findText(el, priceSelectors);
          const finalName = details ? `${name} ${details}` : name; 

          if(name && price){
            uniqueID = name + " | " + price;
          }else{
            uniqueID = "N/A";
          }

          return {
            uniqueID: uniqueID,
            name: finalName,
            price: findText(el, priceSelectors) || "N/A",
            originalPrice: findText(el, originalPriceSelectors),
            image: image,
            link: fullLink,
          };
        })
        .filter(
          (item) =>
            item &&
            item.name !== "N/A" &&
            item.name.length > 0 &&
            item.price !== "N/A"
        )
        .slice(0, 10);
    }, selectedSelector);

    await page.close();
    return flipkartData;
  } catch (error) {
    console.error("An error occurred with Flipkart scraping:", error);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}
// Use this fucntion invocation for testing purpose without running local Env

// scrapeProduct("Realme Gt 6T")
