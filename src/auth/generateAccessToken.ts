import { GenerateAccessTokenParams } from '../types/token';

const TINDER_OAUTH_URL = 'https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067%3A%2F%2Fauthorize%2F&scope=user_birthday%2Cuser_photos%2Cuser_education_history%2Cemail%2Cuser_relationship_details%2Cuser_friends%2Cuser_work_history%2Cuser_likes&response_type=token%2Csigned_request&client_id=464891386855067&ret=login&fallback_redirect_uri=221e1158-f2e9-1452-1a05-8983f99f7d6e&ext=1556057433&hash=Aea6jWwMP_tDMQ9y';
const EMAIL_ID = '#email';
const PASSWORD_ID = '#pass';
const LOGIN_ID = '#loginbutton';
const CONFIRM_SELECTOR = 'button[name="__CONFIRM__"]';

async function generateAccessToken({ email, password }:GenerateAccessTokenParams) {
  try {
  let browser:any;

    if(process.env.PROD){
      const chromium = require('chrome-aws-lambda');
      browser =  await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
    } else {
      const puppeteer = require("puppeteer");
       browser = await puppeteer.launch();
    }

    const page = await browser.newPage();


    await page.goto(TINDER_OAUTH_URL);
    
    await page.click(EMAIL_ID);
    await page.keyboard.type(email);
    
    await page.click(PASSWORD_ID);
    await page.keyboard.type(password);
    
    await Promise.all([
      page.waitForNavigation(),
      page.click(LOGIN_ID),
    ]);


    
    if(process.env.PROD){
      await page.waitForSelector('button[name="submit[Continue]"]');
      await page.click('button[name="submit[Continue]"]')
    }
    
    const data = await page.evaluate(() => document.querySelector('*')!.outerHTML);

    console.log(data);

        
    await page.waitForSelector(CONFIRM_SELECTOR);

    
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().endsWith('/dialog/oauth/confirm/')),
      page.click(CONFIRM_SELECTOR),
    ]);
    const responseText = await response.text();
    const tokenParameter = 'access_token=';
    const startIndexOfAccessToken = responseText.indexOf(tokenParameter) + tokenParameter.length;
    const endIndexOfAccessToken = responseText.indexOf('&', startIndexOfAccessToken);
    await browser.close();
    return responseText.substring(startIndexOfAccessToken, endIndexOfAccessToken);
    
  } catch (error) {
    console.log(error);
     throw error
  } 

}

export default generateAccessToken;