import parse from "csv-parse/lib/sync";
import stringify from "csv-stringify/lib/sync";
import puppeteer from "puppeteer";
import fs from "fs";
import axios from "axios";
import { Poster } from "./models";

//  1: 공모전
//  2: 봉사활동 취업으로할까...
//  3: 대외활동
//  4: 기타..
const SEPARATE_NUM = 1;

if(fs.readFileSync('csv/result.csv')){
    fs.unlink(`csv/result.csv`,(err)=>{
        if(err) throw err;
        console.log("delete result");
    })
}

const csv = fs.readFileSync(`csv/data1.csv`);
const records = parse(csv.toString("utf-8"));

const cralwer = async()=>{
    try{
        const result = [];
        const browser = await puppeteer.launch({ headless: true});
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36");
        await page.setViewport({ width : 1280, height: 960});

        for(const[i,r] of records.entries()){
            await page.goto(r[0]);
            const waifFor = Math.floor(Math.random() * (4000 - 1000) + 2000);
            console.log(waifFor);
            await page.waitFor(waifFor);

            result[i] = r[0];

            const evaluator = await page.evaluate(()=>{
            let title;
            let separate;
            let whois;
            let company;
            let period;
            let amout;
            let homepage;
            let description;
            let img;
                
            const titleEl = document.querySelector(".tit-area h6");
            if(titleEl){
                title= titleEl.textContent; 
            }

            const node = document.querySelectorAll(".cd-info-list li");
            const separateEl = node[0];
            if(separateEl){
                separate = separateEl.textContent.trim().substring(5).trim(); 
            }
            const whoisEl = node[1];
            if(whoisEl) {
                whois = whoisEl.textContent.trim().substring(5).trim(); 
            }
            const companyEl = node[2];
            if(companyEl) {
                company = companyEl.textContent.trim().substring(5).trim(); 
            }
            const periodEl = node[4];
            if(periodEl) {
                period = periodEl.textContent.trim().substring(5,35).trim(); 
            }
            const amoutEl = node[5];
            if(amoutEl) {
                amout = amoutEl.textContent.trim().substring(5).trim(); 
                
            }
            const homepageEl = node[7];
            if(homepageEl) {
                homepage = homepageEl.textContent.trim().substring(5).trim(); 
            }
                
            const descriptionEl = document.getElementById("viewContents");
            if(descriptionEl) {
                description = descriptionEl.textContent.trim(); 
            }

            const imageEl = document.querySelector(".thumb img");
            if(imageEl) {
                img = imageEl.src;
                console.log(img);
            }

            //이거 중복문제 있을 수 있기 때문에 나중에는 적절한 url방법을 써야한다.
            //const randomUrl = Math.floor(Math.random() * (7000 - 1000) + 2000);
            const randomUrl = title.substring(0,7);
            console.log(randomUrl);
            
            return [title,separate,whois,company,period,amout,homepage,description,img,randomUrl];
        });

            result[i] = evaluator;

            //이미지저장하기
            const imgResult = await axios.get(evaluator[8],{
                responseType: "arraybuffer"
            });
            fs.writeFileSync(`poster/${evaluator[9]}.jpg`, imgResult.data);

        }
        await page.close();
        await browser.close();

    const str = stringify(result);
    fs.writeFileSync(`csv/result.csv`,str);
    
    }catch(error){
        console.error(error);
    }

    //db에저장
    saveDatabase();
}

//엑셀에 저장한 값을 DB에 저장하자..
const saveDatabase = async () => {
    try {
        const csv = fs.readFileSync("csv/result.csv");
        const dbs = parse(csv.toString("utf-8"));

        for (let i = 0; i < dbs.length; i++) {
            const postTitle = dbs[i][0].replace(/\,/g, '').replace(/^\s+|\s+$/g, '');
            const postSeparate = dbs[i][1].replace(/\,/g, '').replace(/^\s+|\s+$/g, '');
            const postTarget = dbs[i][2].replace(/\,/g, '').replace(/^\s+|\s+$/g, '');
            const postAgency = dbs[i][3].replace(/\,/g, '').replace(/^\s+|\s+$/g, '');
            const postPeriod = dbs[i][4].replace(/\,/g, '').replace(/^\s+|\s+$/g, '');
            const postAmount = dbs[i][5].replace(/\,/g, '').replace(/^\s+|\s+$/g, '');
            const postLink = dbs[i][6].replace(/\,/g, '').replace(/^\s+|\s+$/g, '');
            const postText = dbs[i][7].replace(/^\s+|\s+$/g, '');
            const randomUrl = dbs[i][9];

            //db에 넣기
            await Poster.create({
                title: postTitle,
                divide: SEPARATE_NUM,
                separate: postSeparate,
                target : postTarget,
                agency: postAgency,
                period : postPeriod,
                amount : postAmount,
                link : postLink,
                text : postText,
                imageUrl : `/poster/${randomUrl}.jpg`
            });
        }
    } catch (error) {
        console.error(error);
    }
}

cralwer();