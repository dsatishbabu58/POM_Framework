
import { expect,test } from "@playwright/test";
test("Using cssselector",async({page})=>{
    await page.goto('https://flights.qedgetech.com/')
    await page.locator("[href='https://flights.qedgetech.com/register.html']").click({force:true})
    await page.locator("[class*='form']").nth(3).fill("Akhilesh")
    await page.locator("[placeholder$='Number']").fill("8765432")
    await page.locator("[name^='em']").fill("Test6765@gmail.com")
    await page.locator("#identicalForm #address").fill("Test@123")
    await page.locator("[name='gender']").selectOption("Male",{timeout:4000})
    await page.locator("[placeholder='Date of Birth in DD-MM-YYYY']").fill("20-12-1987")
    await page.waitForTimeout(2000)
    await page.locator("[type='checkbox']").click()
    await page.locator("[name='submit']").click()
    // await page.locator("[name='submit']").click()
})

