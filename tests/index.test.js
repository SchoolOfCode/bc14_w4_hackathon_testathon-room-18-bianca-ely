// check the user journey flow
import { test, expect } from "@playwright/test"
// make sure url takes us to the page
// const { test } = require("@playwright/test");
// const { url } = require('http://localhost:59637');
const url = 'http://localhost:3000'

// test ('page url', async ({page}) =>{
//     await page.goto(url);
// })

// check input field is empty

test.describe('todo tests',() => {
    // let todoPage;

    test.beforeEach(async ({page}) => {
        // todoPage = new url(page);
        await page.goto(url);
    })
    
    test("input field", async({page}) => {
        const input =  page.getByRole('textbox',{ name: 'Task' });       
        await expect(input).toBeEmpty();
        });
    
    test("input fill", async ({page}) => {
        await page.getByRole('textbox', {name: 'Task'} ).fill('gym')
        await expect(page.getByRole('textbox', {name: 'Task'})).toHaveValue('gym')
    })
    // check date field is empty
    test("date is empty", async({page}) =>{
        await expect(page.getByLabel(" Completion date ")).toBeEmpty();
    });
    // select date
    
    test("select date", async ({page}) => {
        await page.fill("[type=date]", "2023-04-10");
        await expect(page.getByLabel(" Completion date ")).toHaveValue("2023-04-10");
    })


})



// click create
// check error messages for empty fields
// input into task
// check field value
// click create
// check list items
// click delete
// check list items
// add multiple list items
// check list item values
// refresh page make sure items are still there
// check the date on the todos matches date input
// close and reopen url 
// check list items are still there