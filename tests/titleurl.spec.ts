// import { expect, test } from "@playwright/test";

// test("Title of URL", async ({ page }) => {
//   await page.goto("https://demowebshop.tricentis.com/");

//   const pageTitle = await page.title();
//   console.log(`Page title: ${pageTitle}`);
//   console.log(`Page title length: ${pageTitle.length}`);

//   const pageUrl = await page.url();
//   console.log(`Page url: ${pageUrl}`);
//   console.log(`Page url length: ${pageUrl.length}`);
// });

// test("Hyper link count", async ({ page }) => {
//   await page.goto("https://demowebshop.tricentis.com/");

//   // Collect all <a> elements
//   const allLinks = await page.locator("a").all();

//   // Count total links
//   const linkCount = allLinks.length;
//   console.log(`Total links found: ${linkCount}`);

//   // Assert that there is at least one link
//   expect(linkCount).toBeGreaterThan(0);

//   // Validate each link has a non-empty href
//   for (const link of allLinks) {
//     const href = await link.getAttribute("href");

//     // Skip anchors without href
//     if (!href) {
//       console.log("Skipping link without href");
//       continue;
//     }

//     expect(href.trim().length).toBeGreaterThan(0);
//   }

//   // Optional: check that specific link text exists
//   const contactLink = page.locator("a", { hasText: "register" });
//   await expect(contactLink).toHaveAttribute("a", "/register");
// });


import { expect, test } from "@playwright/test";

test("Display all links", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");

  // Collect all <a> elements
  const allLinks = await page.locator("a").all();

  // Count total links
  const linkCount = allLinks.length;
  console.log(`Total links found: ${linkCount}`);

  // Assert that there is at least one link
  expect(linkCount).toBeGreaterThan(0);

  // Display each link's text and href
  for (const link of allLinks) {
    const text = (await link.innerText()).trim();
    const testing = await link.getAttribute("a");

    console.log(`Link Text: "${text}" | Href: ${testing}`);
  }
});