import { expect,test } from "@playwright/test";
test("Using cssselector",async({page})=>{
    await page.goto('https://demowebshop.tricentis.com/')
    await page.locator('[class="ico-login"]').click()
    await page.locator('//*[@id="Email"]').fill("babu.75@gmail.com")
    // await page.locator('#Password').fill('123456')
    await page.locator('xpath=/html/body/div[4]/div[1]/div[4]/div[2]/div/div[2]/div[1]/div[2]/div[2]/form/div[3]/input').fill('123456');
    
    await page.locator('input.login-button').click();
    
    await page.waitForTimeout(5000)
    await page.locator('[href="/computers"]').first().click();
    await page.locator('[href="/notebooks"]').first().click()

    await page.locator('[href="/electronics"]').first().click();
    await page.locator('[href="/camera-photo"]').first().click()
    

})