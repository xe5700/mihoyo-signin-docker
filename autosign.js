const CronJob = require('cron').CronJob;
const { execSync } = require('child_process');
global.moment = require('moment');
require('moment/locale/zh-cn');
const { sleepAsync } = require('./mihoyo-signin/lib/utils')
console.log("　　　　　　ＯＯ　　　　　　　　　　　　　　　　ＯＯ　　　　　　　　　Ｏ　　ＯＯ　　　　　　　　　　　　　　　　ＯＯ　　\n"
	+ "　　　　　　ＯＯ　　　　　　　　　　　　ＯＯＯ　ＯＯ　　　　　　　　ＯＯ　　ＯＯ　　　　　　　ＯＯＯＯＯＯＯ　　ＯＯ　　\n"
	+ "　　　　Ｏ　ＯＯＯＯＯＯ　　　　　　ＯＯＯＯＯ　ＯＯ　　　　　　　　ＯＯＯＯＯＯＯＯＯ　　　　ＯＯＯＯ　　　Ｏ　Ｏ　　　\n"
	+ "　　　　ＯＯＯＯＯＯＯＯ　　　　　　　　　　　　ＯＯＯＯ　　　　　ＯＯＯＯＯＯＯＯ　　　　　　　ＯＯＯＯＯ　ＯＯＯ　　　\n"
	+ "　　　　Ｏ　　　　　ＯＯ　　　　　　　ＯＯＯＯＯＯＯＯＯ　　　　　Ｏ　ＯＯＯＯ　Ｏ　　　　　　　ＯＯＯＯＯＯＯＯＯ　　　\n"
	+ "　　　　ＯＯＯＯＯＯＯＯ　　　　　ＯＯＯＯＯＯ　Ｏ　　Ｏ　　　　ＯＯ　ＯＯ　ＯＯ　　　　　　　ＯＯＯＯＯＯＯＯＯＯ　　　\n"
	+ "　　　　Ｏ　　　　　Ｏ　　　　　　　　ＯＯ　　　Ｏ　ＯＯ　　　　　　ＯＯＯＯＯＯＯ　　　　　　　　　Ｏ　Ｏ　ＯＯＯ　　　\n"
	+ "　　　　ＯＯＯＯＯＯＯ　　　　　　　ＯＯＯＯ　ＯＯ　ＯＯ　　　　　ＯＯＯＯＯＯＯＯＯＯＯ　　　ＯＯＯＯＯＯ　ＯＯＯ　　　\n"
	+ "　　　　ＯＯＯＯ　　Ｏ　　　　　　　ＯＯＯＯＯＯＯ　ＯＯ　　　　ＯＯＯＯＯＯ　Ｏ　ＯＯＯ　　　ＯＯ　Ｏ　　　ＯＯＯ　　　\n"
	+ "　　　　Ｏ　　　　　Ｏ　　　　　　ＯＯＯＯＯＯＯ　　ＯＯ　　　　Ｏ　　ＯＯＯＯＯ　　　　　　　　　ＯＯＯＯＯ　　Ｏ　　　\n"
	+ "　　　　ＯＯＯＯＯＯＯ　　　　　　　　　　ＯＯ　ＯＯＯ　　　　　　　　ＯＯＯＯＯＯＯ　　　　ＯＯＯＯＯ　　　ＯＯＯ　　　\n"
	+ "　　　　ＯＯＯ　　ＯＯ　　　　　　　　　ＯＯＯ　　ＯＯ　　　　　　ＯＯＯＯＯＯＯＯＯ　　　　　Ｏ　　　　　　　ＯＯ　　　\n"
	+ "　　　　Ｏ　　　　　　　　　　　　　　　ＯＯ　　　　Ｏ　　　　　　　　　　　　　　　　　　　　　　　　　　　　　Ｏ　　　\n");


var mihoyoClient = undefined;
var job;
var cookies;
var tickets;
var finnd_cookie_string = /COOKIE_STRING='(.+)'/
function getCookie(login_ticket) {
	let ret = execSync("node ./mihoyo-signin/cookie.js " + login_ticket).toString();
	let ret2 = ret.split(finnd_cookie_string);
	if (ret2.length < 1) {
		return undefined;
	} else {
		return ret2[1];
	}
}
async function signin_all() {
	console.log("开始签到")
	let sign_data = [];
	for (let i in tickets) {
		let ticket = tickets[i];
		process.env.COOKIE_STRING = getCookie(ticket);
		sign_data.push(signin());
		await sleepAsync(random.int(10, 20) * 1000);
	}
	for (let i in cookies) {
		let cookie = cookies[i];
		process.env.COOKIE_STRING = cookie;
		sign_data.push(signin());
		await sleepAsync(random.int(10, 20) * 1000);
	}
	for (let d in sign_data) {
		await sign_data[d];
	}
	console.log("下一次执行时间：" + job.nextDate().format('llll'));
	console.log("当前时间：" + moment().format('llll'));

}
async function signin() {
	if(mihoyoClient == undefined){
		mihoyoClient = require('mihoyo-signin/index')
	}else{
		await mihoyoClient.init();
	}
};

const random = require('random');
async function runjob() {
	let t = random.int(min = 10, max = 3600);
	console.log("%d 秒后开始执行签到", t);
	await sleepAsync(t * 1000);
	await signin_all();
}
async function main() {
	if (process.env.COOKIES != undefined) {
		cookies = JSON.parse(process.env.COOKIES)
		if (typeof(cookies) === "String") {
			let cks = cookies
			cookies = []
			cookies.push(cks)
		}
	}
	if (process.env.TICKETS != undefined) {
		tickets = process.env.TICKETS.split(" ");
		if (tickets == undefined) {
			tickets = [process.env.TICKETS]
		}
	}
	crontime = process.env.CRONTIME;
	if (crontime == undefined) {
		console.log("未设置计划任务时间，默认每天九点半开始签到。")
		crontime = "0 30 9 * * *"
	}
	moment.updateLocale("zh-cn");
	job = new CronJob(crontime, runjob);
	await signin_all();
	console.log("开启计划任务");
	job.start();

}
main();