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
    // test button works with no inputs in date or item field
    test('create button', async ({page}) => {
        await page.getByTitle("Create a new todo").click();
        //test the error message
        // expect(page.getByRole('textbox')).toThrowError();

        //check list is empty
        await expect(page.getByRole("list")).toBeEmpty();
    })

    //check if item is added to the list if input added and date field completed
    test("add item to list", async ({page}) => {
        // Actions: 
        await page.getByRole('textbox', {name: 'Task'} ).fill('gym') // fill input
        await page.fill("[type=date]", "2023-04-10");  //f select date
        await page.getByTitle("Create a new todo").click(); // click button to add item to list

        await expect(page.getByRole("list")).toHaveText(/gym/); // Test if gym was added to the list
        await expect(page.getByRole("time")).toHaveText('2023-04-10'); // Test if the correct date was added

        await page.reload(); //Refresh the page
        await expect(page.getByRole('list')).toHaveCount(1) ; // Test if list has one item
    });

    // Add item to the list, delete the item and test if the item was deleted
    test("added item is deleted from the list", async ({page}) => {
        // Actions: 
        await page.getByRole('textbox', {name: 'Task'} ).fill('gym') // fill input
        await page.fill("[type=date]", "2023-04-10");  //f select date
        await page.getByTitle("Create a new todo").click(); // click button to add item to list
        // click the delete button
        await page.getByTitle("Delete this todo").click();
        //Test if item was deleted from the list 
        await expect(page.getByRole('list')).toBeEmpty();
    });

    test("multiple list items", async({page}) => {
        await page.getByRole('textbox', {name: 'Task'} ).fill('gym') // fill input
        await page.fill("[type=date]", "2023-04-10");  //f select date
        await page.getByTitle("Create a new todo").click(); // click button to add item to list
        await page.getByRole('textbox', {name: 'Task'} ).fill('walk dog') // fill input
        await page.fill("[type=date]", "2023-04-11");  //f select date
        await page.getByTitle("Create a new todo").click(); // click button to add item to list

        const list = page.locator('list > .component');
        await expect(list).toHaveCount(3);
        // await expect(page.getByRole('list')).toContainText([/gym/,/walk dog/]);

        await page.reload(); //Refresh the page
        await expect(page.getByRole('list')).toHaveCount(2);
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