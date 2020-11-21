import React, { useState } from 'react';
import {InputNumber ,Form, Button, Input, Checkbox, Table, Switch, AutoComplete} from 'antd';
// http://test.b2c.jbingo.cn/testV3/retailers/index.html
interface QueryParams {
    buyingPrice: number,
    weight: number,
    profit: number ,
    [key:string]: any
}

enum Mode {
    auto="AUTO",
    manual="MANUAL"
}

function CaculateTable() {
    const [mode, setMode] = useState<Mode>(Mode.auto);
    const onFinish = (valuses:QueryParams) => {
        console.log(valuses);
        //计算公式
        //(操作费 + 每公斤费用 / 1000 * 包裹重量 + 成本) / 当地汇率 / 0.82
        let {weight, profit, buyingPrice} = valuses;
        const DE_package_cost = 22; //DE德国包装成本
        const AT_package_cost = 22; //AT奥地利包装成本
        const FR_package_cost = 24; //FR法国包装成本
        const IT_package_cost = 25; //IT意大利包装成本
        const ES_package_cost = 18; //ES西班牙包装成本
        const AU_package_cost = ''; //AU澳大利亚包装成本
        const UK_package_cost = weight < 1000 ? 16.5 : 21;
        // if (weight <= 1000) {
        //     var UK_package_cost = 16.5; //UK英国包装成本 
        // } else {
        //     var UK_package_cost = 21; //UK英国包装成本 
        // }
        // 物流费用/kg
        const DE_logistics_cost = 38; //DE德国
        const AT_logistics_cost = 48; //AT奥地利
        const FR_logistics_cost = 44; //FR法国
        const IT_logistics_cost = 48; //IT意大利
        const ES_logistics_cost = 40; //ES西班牙
        const AU_logistics_cost = ''; //AU澳大利亚
        const UK_logistics_cost = 36; //UK英国
        // 重量单位转换
        weight = weight / 1000;
        //利润比
        const shop_draws = 0.16; //平台抽成占比
        const shop_draw = 1 - shop_draws; //店铺占比
        // 利润率
        const profit_rate_05 = 0.05;
        const profit_rate_10 = 0.10;
        const profit_rate_15 = 0.15;
        const profit_rate_20 = 0.20;
        const profit_rate_25 = 0.25;
        const profit_rate_30 = 0.30;
        const eu_rate = 7;
        let totalPrice = (buyingPrice + weight * DE_logistics_cost + DE_package_cost) / (1 - profit_rate_05) / eu_rate / shop_draw;
        //(purchase_price + weight * DE_logistics_cost + DE_package_cost + target_profit) / eu_rate / shop_draw
        //自动模式 固定利润率
        const DE_total_array = [0.05, 0.10, 0.15, 0.20, 0.25, 0.30].map(item => (buyingPrice + weight * DE_logistics_cost + DE_package_cost) / (1 - item) / eu_rate / shop_draw);
        const DE_profit_array = DE_total_array.map(item => item * eu_rate * shop_draw - buyingPrice - weight * DE_logistics_cost - DE_package_cost);

        console.log(DE_total_array);
        console.log(DE_profit_array);

        const AT_total_array = [0.05, 0.10, 0.15, 0.20, 0.25, 0.30].map(item => (buyingPrice + weight * DE_logistics_cost + DE_package_cost) / (1 - item) / eu_rate / shop_draw);
        
                //  //DE德国 5%利润率
                //  if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * DE_logistics_cost + DE_package_cost) / (1 - profit_rate_05) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var DE_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * DE_logistics_cost - DE_package_cost; //利润
                //     var DE_profitNum = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * DE_logistics_cost + DE_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var DE_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * DE_logistics_cost - DE_package_cost; //利润
                //     var DE_profitNum = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 4000) {
                //     $("input[name='DE-sell-price-05']").val(DE_totalPrice).css('backgroundColor', '#F5F5F5');
                //     $("input[name='DE-profit-05']").val(DE_profitNum).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='DE-sell-price-05']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='DE-profit-05']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // //DE德国 10%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * DE_logistics_cost + DE_package_cost) / (1 - profit_rate_10) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var DE_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * DE_logistics_cost - DE_package_cost; //利润
                //     var DE_profitNum = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * DE_logistics_cost + DE_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var DE_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * DE_logistics_cost - DE_package_cost; //利润
                //     var DE_profitNum = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 4000) {
                //     $("input[name='DE-sell-price-10']").val(DE_totalPrice).css('backgroundColor', '#F5F5F5');
                //     $("input[name='DE-profit-10']").val(DE_profitNum).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='DE-sell-price-10']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='DE-profit-10']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // //DE德国 15%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * DE_logistics_cost + DE_package_cost) / (1 - profit_rate_15) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var DE_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * DE_logistics_cost - DE_package_cost; //利润
                //     var DE_profitNum = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * DE_logistics_cost + DE_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var DE_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * DE_logistics_cost - DE_package_cost; //利润
                //     var DE_profitNum = profitNum.toFixed(2);
                // }
    
                // if (weight * 1000 <= 4000) {
                //     $("input[name='DE-sell-price-15']").val(DE_totalPrice).css('backgroundColor', '#F5F5F5');
                //     $("input[name='DE-profit-15']").val(DE_profitNum).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='DE-sell-price-15']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='DE-profit-15']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // //DE德国 20%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * DE_logistics_cost + DE_package_cost) / (1 - profit_rate_20) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var DE_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * DE_logistics_cost - DE_package_cost; //利润
                //     var DE_profitNum = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * DE_logistics_cost + DE_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var DE_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * DE_logistics_cost - DE_package_cost; //利润
                //     var DE_profitNum = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 4000) {
                //     $("input[name='DE-sell-price-20']").val(DE_totalPrice).css('backgroundColor', '#F5F5F5');
                //     $("input[name='DE-profit-20']").val(DE_profitNum).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='DE-sell-price-20']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='DE-profit-20']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // //DE德国 25%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * DE_logistics_cost + DE_package_cost) / (1 - profit_rate_25) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var DE_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * DE_logistics_cost - DE_package_cost; //利润
                //     var DE_profitNum = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * DE_logistics_cost + DE_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var DE_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * DE_logistics_cost - DE_package_cost; //利润
                //     var DE_profitNum = profitNum.toFixed(2);
                // }
    
                // if (weight * 1000 <= 4000) {
                //     $("input[name='DE-sell-price-25']").val(DE_totalPrice).css('backgroundColor', '#F5F5F5');
                //     $("input[name='DE-profit-25']").val(DE_profitNum).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='DE-sell-price-25']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='DE-profit-25']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // //DE德国 30%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * DE_logistics_cost + DE_package_cost) / (1 - profit_rate_30) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var DE_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * DE_logistics_cost - DE_package_cost; //利润
                //     var DE_profitNum = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * DE_logistics_cost + DE_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var DE_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * DE_logistics_cost - DE_package_cost; //利润
                //     var DE_profitNum = profitNum.toFixed(2);
                // }
    
                // if (weight * 1000 <= 4000) {
                //     $("input[name='DE-sell-price-30']").val(DE_totalPrice).css('backgroundColor', '#F5F5F5');
                //     $("input[name='DE-profit-30']").val(DE_profitNum).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='DE-sell-price-30']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='DE-profit-30']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // AT奥地利 5%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * AT_logistics_cost + AT_package_cost) / (1 - profit_rate_05) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AT_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AT_logistics_cost - AT_package_cost; //利润
                //     var AT_profitNum = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * AT_logistics_cost + AT_package_cost + target_profit) / eval(eu_rate) / 0.84; //计算后的售价-欧元
                //     var AT_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AT_logistics_cost - AT_package_cost; //利润
                //     var AT_profitNum = profitNum.toFixed(2);
                // }
                // $("input[name='AT-sell-price-05']").val(AT_totalPrice).css('backgroundColor', '#F5F5F5');
                // $("input[name='AT-profit-05']").val(AT_profitNum).css('backgroundColor', '#FFEBCD');
                // // AT奥地利10%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * AT_logistics_cost + AT_package_cost) / (1 - profit_rate_10) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AT_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AT_logistics_cost - AT_package_cost; //利润
                //     var AT_profitNum = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * AT_logistics_cost + AT_package_cost + target_profit) / eval(eu_rate) / 0.84; //计算后的售价-欧元
                //     var AT_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AT_logistics_cost - AT_package_cost; //利润
                //     var AT_profitNum = profitNum.toFixed(2);
                // }
                // $("input[name='AT-sell-price-10']").val(AT_totalPrice).css('backgroundColor', '#F5F5F5');
                // $("input[name='AT-profit-10']").val(AT_profitNum).css('backgroundColor', '#FFEBCD');
                // // AT奥地利15%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * AT_logistics_cost + AT_package_cost) / (1 - profit_rate_15) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AT_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AT_logistics_cost - AT_package_cost; //利润
                //     var AT_profitNum = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * AT_logistics_cost + AT_package_cost + target_profit) / eval(eu_rate) / 0.84; //计算后的售价-欧元
                //     var AT_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AT_logistics_cost - AT_package_cost; //利润
                //     var AT_profitNum = profitNum.toFixed(2);
                // }
                // $("input[name='AT-sell-price-15']").val(AT_totalPrice).css('backgroundColor', '#F5F5F5');
                // $("input[name='AT-profit-15']").val(AT_profitNum).css('backgroundColor', '#FFEBCD');
                // // AT奥地利20%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * AT_logistics_cost + AT_package_cost) / (1 - profit_rate_20) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AT_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AT_logistics_cost - AT_package_cost; //利润
                //     var AT_profitNum = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * AT_logistics_cost + AT_package_cost + target_profit) / eval(eu_rate) / 0.84; //计算后的售价-欧元
                //     var AT_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AT_logistics_cost - AT_package_cost; //利润
                //     var AT_profitNum = profitNum.toFixed(2);
                // }
                // $("input[name='AT-sell-price-20']").val(AT_totalPrice).css('backgroundColor', '#F5F5F5');
                // $("input[name='AT-profit-20']").val(AT_profitNum).css('backgroundColor', '#FFEBCD');
                // // AT奥地利25%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * AT_logistics_cost + AT_package_cost) / (1 - profit_rate_25) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AT_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AT_logistics_cost - AT_package_cost; //利润
                //     var AT_profitNum = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * AT_logistics_cost + AT_package_cost + target_profit) / eval(eu_rate) / 0.84; //计算后的售价-欧元
                //     var AT_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AT_logistics_cost - AT_package_cost; //利润
                //     var AT_profitNum = profitNum.toFixed(2);
                // }
                // $("input[name='AT-sell-price-25']").val(AT_totalPrice).css('backgroundColor', '#F5F5F5');
                // $("input[name='AT-profit-25']").val(AT_profitNum).css('backgroundColor', '#FFEBCD');
                // // AT奥地利30%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * AT_logistics_cost + AT_package_cost) / (1 - profit_rate_30) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AT_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AT_logistics_cost - AT_package_cost; //利润
                //     var AT_profitNum = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * AT_logistics_cost + AT_package_cost + target_profit) / eval(eu_rate) / 0.84; //计算后的售价-欧元
                //     var AT_totalPrice = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AT_logistics_cost - AT_package_cost; //利润
                //     var AT_profitNum = profitNum.toFixed(2);
                // }
                // $("input[name='AT-sell-price-30']").val(AT_totalPrice).css('backgroundColor', '#F5F5F5');
                // $("input[name='AT-profit-30']").val(AT_profitNum).css('backgroundColor', '#FFEBCD');
                // // FR法国 5%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * FR_logistics_cost + FR_package_cost) / (1 - profit_rate_05) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var FR_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * FR_logistics_cost - FR_package_cost; //利润
                //     var FR_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * FR_logistics_cost + FR_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var FR_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * FR_logistics_cost - FR_package_cost; //利润
                //     var FR_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 10000) {
                //     $("input[name='FR-sell-price-05']").val(FR_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='FR-profit-05']").val(FR_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='FR-sell-price-05']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='FR-profit-05']").val('超重').css('backgroundColor', '#FF4040');
                // }
    
                // // FR法国 10%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * FR_logistics_cost + FR_package_cost) / (1 - profit_rate_10) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var FR_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * FR_logistics_cost - FR_package_cost; //利润
                //     var FR_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * FR_logistics_cost + FR_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var FR_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * FR_logistics_cost - FR_package_cost; //利润
                //     var FR_profitNum1 = profitNum.toFixed(2);
                // }
    
                // if (weight * 1000 <= 10000) {
                //     $("input[name='FR-sell-price-10']").val(FR_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='FR-profit-10']").val(FR_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='FR-sell-price-10']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='FR-profit-10']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // FR法国 15%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * FR_logistics_cost + FR_package_cost) / (1 - profit_rate_15) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var FR_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * FR_logistics_cost - FR_package_cost; //利润
                //     var FR_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * FR_logistics_cost + FR_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var FR_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * FR_logistics_cost - FR_package_cost; //利润
                //     var FR_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 10000) {
                //     $("input[name='FR-sell-price-15']").val(FR_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='FR-profit-15']").val(FR_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='FR-sell-price-15']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='FR-profit-15']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // FR法国 20%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * FR_logistics_cost + FR_package_cost) / (1 - profit_rate_20) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var FR_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * FR_logistics_cost - FR_package_cost; //利润
                //     var FR_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * FR_logistics_cost + FR_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var FR_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * FR_logistics_cost - FR_package_cost; //利润
                //     var FR_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 10000) {
                //     $("input[name='FR-sell-price-20']").val(FR_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='FR-profit-20']").val(FR_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='FR-sell-price-20']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='FR-profit-20']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // FR法国 25%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * FR_logistics_cost + FR_package_cost) / (1 - profit_rate_25) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var FR_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * FR_logistics_cost - FR_package_cost; //利润
                //     var FR_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * FR_logistics_cost + FR_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var FR_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * FR_logistics_cost - FR_package_cost; //利润
                //     var FR_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 10000) {
                //     $("input[name='FR-sell-price-25']").val(FR_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='FR-profit-25']").val(FR_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='FR-sell-price-25']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='FR-profit-25']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // FR法国 30%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * FR_logistics_cost + FR_package_cost) / (1 - profit_rate_30) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var FR_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * FR_logistics_cost - FR_package_cost; //利润
                //     var FR_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * FR_logistics_cost + FR_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var FR_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * FR_logistics_cost - FR_package_cost; //利润
                //     var FR_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 10000) {
                //     $("input[name='FR-sell-price-30']").val(FR_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='FR-profit-30']").val(FR_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='FR-sell-price-30']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='FR-profit-30']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // IT意大利 5%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * IT_logistics_cost + IT_package_cost) / (1 - profit_rate_05) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var IT_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * IT_logistics_cost - IT_package_cost; //利润
                //     var IT_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * IT_logistics_cost + IT_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var IT_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * IT_logistics_cost - IT_package_cost; //利润
                //     var IT_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 5000) {
                //     $("input[name='IT-sell-price-05']").val(IT_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='IT-profit-05']").val(IT_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='IT-sell-price-05']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='IT-profit-05']").val('超重').css('backgroundColor', '#FF4040');
                // }
    
                // // IT意大利 10%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * IT_logistics_cost + IT_package_cost) / (1 - profit_rate_10) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var IT_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * IT_logistics_cost - IT_package_cost; //利润
                //     var IT_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * IT_logistics_cost + IT_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var IT_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * IT_logistics_cost - IT_package_cost; //利润
                //     var IT_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 5000) {
                //     $("input[name='IT-sell-price-10']").val(IT_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='IT-profit-10']").val(IT_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='IT-sell-price-10']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='IT-profit-10']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // IT意大利 15%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * IT_logistics_cost + IT_package_cost) / (1 - profit_rate_15) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var IT_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * IT_logistics_cost - IT_package_cost; //利润
                //     var IT_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * IT_logistics_cost + IT_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var IT_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * IT_logistics_cost - IT_package_cost; //利润
                //     var IT_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 5000) {
                //     $("input[name='IT-sell-price-15']").val(IT_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='IT-profit-15']").val(IT_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='IT-sell-price-15']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='IT-profit-15']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // IT意大利 20%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * IT_logistics_cost + IT_package_cost) / (1 - profit_rate_20) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var IT_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * IT_logistics_cost - IT_package_cost; //利润
                //     var IT_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * IT_logistics_cost + IT_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var IT_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * IT_logistics_cost - IT_package_cost; //利润
                //     var IT_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 5000) {
                //     $("input[name='IT-sell-price-20']").val(IT_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='IT-profit-20']").val(IT_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='IT-sell-price-20']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='IT-profit-20']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // IT意大利 25%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * IT_logistics_cost + IT_package_cost) / (1 - profit_rate_25) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var IT_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * IT_logistics_cost - IT_package_cost; //利润
                //     var IT_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * IT_logistics_cost + IT_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var IT_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * IT_logistics_cost - IT_package_cost; //利润
                //     var IT_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 5000) {
                //     $("input[name='IT-sell-price-25']").val(IT_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='IT-profit-25']").val(IT_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='IT-sell-price-25']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='IT-profit-25']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // IT意大利 30%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * IT_logistics_cost + IT_package_cost) / (1 - profit_rate_30) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var IT_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * IT_logistics_cost - IT_package_cost; //利润
                //     var IT_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * IT_logistics_cost + IT_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var IT_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * IT_logistics_cost - IT_package_cost; //利润
                //     var IT_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 5000) {
                //     $("input[name='IT-sell-price-30']").val(IT_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='IT-profit-30']").val(IT_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='IT-sell-price-30']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='IT-profit-30']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // ES西班牙5%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * ES_logistics_cost + ES_package_cost) / (1 - profit_rate_05) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var ES_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * ES_logistics_cost - ES_package_cost; //利润
                //     var ES_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * ES_logistics_cost + ES_package_cost + target_profit) / eval(eu_rate) / shop_draw; //计算后的售价-欧元
                //     var ES_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * ES_logistics_cost - ES_package_cost; //利润
                //     var ES_profitNum1 = profitNum.toFixed(2);
                // }
    
                // if (weight * 1000 <= 5000) {
                //     $("input[name='ES-sell-price-05']").val(ES_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='ES-profit-05']").val(ES_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='ES-sell-price-05']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='ES-profit-05']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // ES西班牙10%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * ES_logistics_cost + ES_package_cost) / (1 - profit_rate_10) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var ES_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * ES_logistics_cost - ES_package_cost; //利润
                //     var ES_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * ES_logistics_cost + ES_package_cost + target_profit) / eval(eu_rate) / shop_draw; //计算后的售价-欧元
                //     var ES_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * ES_logistics_cost - ES_package_cost; //利润
                //     var ES_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 5000) {
                //     $("input[name='ES-sell-price-10']").val(ES_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='ES-profit-10']").val(ES_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='ES-sell-price-10']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='ES-profit-10']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // ES西班牙15%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * ES_logistics_cost + ES_package_cost) / (1 - profit_rate_15) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var ES_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * ES_logistics_cost - ES_package_cost; //利润
                //     var ES_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * ES_logistics_cost + ES_package_cost + target_profit) / eval(eu_rate) / shop_draw; //计算后的售价-欧元
                //     var ES_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * ES_logistics_cost - ES_package_cost; //利润
                //     var ES_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 5000) {
                //     $("input[name='ES-sell-price-15']").val(ES_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='ES-profit-15']").val(ES_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='ES-sell-price-15']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='ES-profit-15']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // ES西班牙20%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * ES_logistics_cost + ES_package_cost) / (1 - profit_rate_20) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var ES_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * ES_logistics_cost - ES_package_cost; //利润
                //     var ES_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * ES_logistics_cost + ES_package_cost + target_profit) / eval(eu_rate) / shop_draw; //计算后的售价-欧元
                //     var ES_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * ES_logistics_cost - ES_package_cost; //利润
                //     var ES_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 5000) {
                //     $("input[name='ES-sell-price-20']").val(ES_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='ES-profit-20']").val(ES_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='ES-sell-price-20']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='ES-profit-20']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // ES西班牙25%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * ES_logistics_cost + ES_package_cost) / (1 - profit_rate_25) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var ES_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * ES_logistics_cost - ES_package_cost; //利润
                //     var ES_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * ES_logistics_cost + ES_package_cost + target_profit) / eval(eu_rate) / shop_draw; //计算后的售价-欧元
                //     var ES_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * ES_logistics_cost - ES_package_cost; //利润
                //     var ES_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 5000) {
                //     $("input[name='ES-sell-price-25']").val(ES_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='ES-profit-25']").val(ES_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='ES-sell-price-25']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='ES-profit-25']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // ES西班牙30%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * ES_logistics_cost + ES_package_cost) / (1 - profit_rate_30) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var ES_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * ES_logistics_cost - ES_package_cost; //利润
                //     var ES_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * ES_logistics_cost + ES_package_cost + target_profit) / eval(eu_rate) / shop_draw; //计算后的售价-欧元
                //     var ES_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * ES_logistics_cost - ES_package_cost; //利润
                //     var ES_profitNum1 = profitNum.toFixed(2);
                // }
                // if (weight * 1000 <= 5000) {
                //     $("input[name='ES-sell-price-30']").val(ES_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='ES-profit-30']").val(ES_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='ES-sell-price-30']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='ES-profit-30']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // UK英国05%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * UK_logistics_cost + UK_package_cost) / pound_rate / (1 - profit_rate_05) / shop_draw; //计算后的售价-欧元
                //     var UK_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * pound_rate * shop_draw - purchase_price - weight * UK_logistics_cost - UK_package_cost; //利润
                //     var UK_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * UK_logistics_cost + UK_package_cost + target_profit) / pound_rate / shop_draw; //计算后的售价-欧元
                //     var UK_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * pound_rate * shop_draw - purchase_price - weight * UK_logistics_cost - UK_package_cost; //利润
                //     var UK_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // }
                // if (weight * 1000 <= 4000) {
                //     $("input[name='UK-sell-price-05']").val(UK_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='UK-profit-05']").val(UK_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='UK-sell-price-05']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='UK-profit-05']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // UK英国10%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * UK_logistics_cost + UK_package_cost) / pound_rate / (1 - profit_rate_10) / shop_draw; //计算后的售价-欧元
                //     var UK_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * pound_rate * shop_draw - purchase_price - weight * UK_logistics_cost - UK_package_cost; //利润
                //     var UK_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * UK_logistics_cost + UK_package_cost + target_profit) / pound_rate / shop_draw; //计算后的售价-欧元
                //     var UK_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * pound_rate * shop_draw - purchase_price - weight * UK_logistics_cost - UK_package_cost; //利润
                //     var UK_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // }
                // if (weight * 1000 <= 4000) {
                //     $("input[name='UK-sell-price-10']").val(UK_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='UK-profit-10']").val(UK_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='UK-sell-price-10']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='UK-profit-10']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // UK英国15%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * UK_logistics_cost + UK_package_cost) / pound_rate / (1 - profit_rate_15) / shop_draw; //计算后的售价-欧元
                //     var UK_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * pound_rate * shop_draw - purchase_price - weight * UK_logistics_cost - UK_package_cost; //利润
                //     var UK_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * UK_logistics_cost + UK_package_cost + target_profit) / pound_rate / shop_draw; //计算后的售价-欧元
                //     var UK_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * pound_rate * shop_draw - purchase_price - weight * UK_logistics_cost - UK_package_cost; //利润
                //     var UK_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // }
                // if (weight * 1000 <= 4000) {
                //     $("input[name='UK-sell-price-15']").val(UK_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='UK-profit-15']").val(UK_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='UK-sell-price-15']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='UK-profit-15']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // UK英国20%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * UK_logistics_cost + UK_package_cost) / pound_rate / (1 - profit_rate_20) / shop_draw; //计算后的售价-欧元
                //     var UK_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * pound_rate * shop_draw - purchase_price - weight * UK_logistics_cost - UK_package_cost; //利润
                //     var UK_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * UK_logistics_cost + UK_package_cost + target_profit) / pound_rate / shop_draw; //计算后的售价-欧元
                //     var UK_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * pound_rate * shop_draw - purchase_price - weight * UK_logistics_cost - UK_package_cost; //利润
                //     var UK_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // }
                // if (weight * 1000 <= 4000) {
                //     $("input[name='UK-sell-price-20']").val(UK_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='UK-profit-20']").val(UK_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='UK-sell-price-20']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='UK-profit-20']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // UK英国25%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * UK_logistics_cost + UK_package_cost) / pound_rate / (1 - profit_rate_25) / shop_draw; //计算后的售价-欧元
                //     var UK_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * pound_rate * shop_draw - purchase_price - weight * UK_logistics_cost - UK_package_cost; //利润
                //     var UK_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * UK_logistics_cost + UK_package_cost + target_profit) / pound_rate / shop_draw; //计算后的售价-欧元
                //     var UK_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * pound_rate * shop_draw - purchase_price - weight * UK_logistics_cost - UK_package_cost; //利润
                //     var UK_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // }
                // if (weight * 1000 <= 4000) {
                //     $("input[name='UK-sell-price-25']").val(UK_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='UK-profit-25']").val(UK_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='UK-sell-price-25']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='UK-profit-25']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // UK英国30%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * UK_logistics_cost + UK_package_cost) / pound_rate / (1 - profit_rate_30) / shop_draw; //计算后的售价-欧元
                //     var UK_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * pound_rate * shop_draw - purchase_price - weight * UK_logistics_cost - UK_package_cost; //利润
                //     var UK_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * UK_logistics_cost + UK_package_cost + target_profit) / pound_rate / shop_draw; //计算后的售价-欧元
                //     var UK_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * pound_rate * shop_draw - purchase_price - weight * UK_logistics_cost - UK_package_cost; //利润
                //     var UK_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // }
                // if (weight * 1000 <= 4000) {
                //     $("input[name='UK-sell-price-30']").val(UK_totalPrice1).css('backgroundColor', '#F5F5F5');
                //     $("input[name='UK-profit-30']").val(UK_profitNum1).css('backgroundColor', '#FFEBCD');
                // } else {
                //     $("input[name='UK-sell-price-30']").val('超重').css('backgroundColor', '#FF4040');
                //     $("input[name='UK-profit-30']").val('超重').css('backgroundColor', '#FF4040');
                // }
                // // AU澳大利亚5%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * AU_logistics_cost + AU_package_cost) / (1 - profit_rate_05) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AU_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AU_logistics_cost - AU_package_cost; //利润
                //     var AU_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * AU_logistics_cost + AU_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AU_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AU_logistics_cost - AU_package_cost; //利润
                //     var AU_profitNum1 = profitNum.toFixed(2);
                // }
                // // $("input[name='AU-sell-price-05']").val(AU_totalPrice1);
                // // $("input[name='AU-profit-05']").val(AU_profitNum1);
                // // AU澳大利亚10%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * AU_logistics_cost + AU_package_cost) / (1 - profit_rate_10) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AU_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AU_logistics_cost - AU_package_cost; //利润
                //     var AU_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * AU_logistics_cost + AU_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AU_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AU_logistics_cost - AU_package_cost; //利润
                //     var AU_profitNum1 = profitNum.toFixed(2);
                // }
                // // $("input[name='AU-sell-price-10']").val(AU_totalPrice1);
                // // $("input[name='AU-profit-10']").val(AU_profitNum1);
                // // AU澳大利亚15%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * AU_logistics_cost + AU_package_cost) / (1 - profit_rate_15) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AU_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AU_logistics_cost - AU_package_cost; //利润
                //     var AU_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * AU_logistics_cost + AU_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AU_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AU_logistics_cost - AU_package_cost; //利润
                //     var AU_profitNum1 = profitNum.toFixed(2);
                // }
                // // $("input[name='AU-sell-price-15']").val(AU_totalPrice1);
                // // $("input[name='AU-profit-15']").val(AU_profitNum1);
                // // AU澳大利亚20%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * AU_logistics_cost + AU_package_cost) / (1 - profit_rate_20) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AU_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AU_logistics_cost - AU_package_cost; //利润
                //     var AU_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * AU_logistics_cost + AU_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AU_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AU_logistics_cost - AU_package_cost; //利润
                //     var AU_profitNum1 = profitNum.toFixed(2);
                // }
                // // $("input[name='AU-sell-price-20']").val(AU_totalPrice1);
                // // $("input[name='AU-profit-20']").val(AU_profitNum1);
                // // AU澳大利亚25%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * AU_logistics_cost + AU_package_cost) / (1 - profit_rate_25) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AU_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AU_logistics_cost - AU_package_cost; //利润
                //     var AU_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * AU_logistics_cost + AU_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AU_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AU_logistics_cost - AU_package_cost; //利润
                //     var AU_profitNum1 = profitNum.toFixed(2);
                // }
                // // $("input[name='AU-sell-price-25']").val(AU_totalPrice1);
                // // $("input[name='AU-profit-25']").val(AU_profitNum1);
                // // AU澳大利亚30%利润率
                // if (target_profit == '') { //判断目标利润是否为空
                //     var totalPrice = (purchase_price + weight * AU_logistics_cost + AU_package_cost) / (1 - profit_rate_30) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AU_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AU_logistics_cost - AU_package_cost; //利润
                //     var AU_profitNum1 = profitNum.toFixed(2); //四舍五入保留两位小数
                // } else {
                //     var totalPrice = (purchase_price + weight * AU_logistics_cost + AU_package_cost + target_profit) / eu_rate / shop_draw; //计算后的售价-欧元
                //     var AU_totalPrice1 = totalPrice.toFixed(2);
                //     var profitNum = totalPrice * eu_rate * shop_draw - purchase_price - weight * AU_logistics_cost - AU_package_cost; //利润
                //     var AU_profitNum1 = profitNum.toFixed(2);
                // }
    }

    const onFinishFailed = (errorInfo:any) => {
        console.log(errorInfo);
    }

    const onChangeMode = (checked: boolean) => {
        if(checked) {
            setMode(Mode.auto);
        }else{
            setMode(Mode.manual);
        }
    }

    const dataSource = [
        {
          key: '1',
          country: 'DE德国',
          5: 32,
          10: 54.87,
          15: 24.43,
          20: 43.32,
          25: 43.43,
          30: 56
        },
        {
          key: '2',
          country: 'DE德国',
          5: 32,
          10: 54.87,
          15: 24.43,
          20: 43.32,
          25: 43.43,
          30: 56
        },
      ];

      const columns = [
        {
          title: '国家',
          dataIndex: 'country',
          key: 'country',
        },
        {
          title: '5%的利润率',
          dataIndex: 5,
          key: '5',
        },
        {
          title: '10%的利润率',
          dataIndex: '10',
          key: '10',
        },
        {
            title: '15%的利润率',
            dataIndex: '15',
            key: '15',
          },
          {
            title: '20%的利润率',
            dataIndex: '20',
            key: '20',
          },
          {
            title: '25%的利润率',
            dataIndex: '25',
            key: '25',
          },
          {
            title: '30%的利润率',
            dataIndex: '30',
            key: '30',
          },
      ];

    return (
        <>
        <h1>
            虚拟仓价格计算表
        </h1>
        <Form
            layout="inline"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        //    labelCol={{span: 8}}
        //    wrapperCol={{span: 16}}
        >
            <Form.Item
                label="采购价(CNY)"
                name="buyingPrice"
                rules={[{ required: true, message: '请输入采购价格' }]}
            >
                <InputNumber min={0} max={10000000000} step={1}/>
                
            </Form.Item>

            <Form.Item
                label="重量(g)"
                name="weight"
                rules={[{ required: true, message: '请输入重量' }]}
            >
                <InputNumber min={0} max={10000000000} precision={2} step={1}/>
                
            </Form.Item>

            <Form.Item
                label="手动/自动"
                name="model"               
            >
            <Switch  checked={mode === Mode.auto} onChange={onChangeMode}/>            
            </Form.Item>
           
            {mode === Mode.auto ? null :  <Form.Item
                label="目标利润(CNY)"
                name="profit"
                rules={[{ required: true, message: '请输入目标利润' }]}
            >
                <InputNumber min={0} max={10000000000} precision={2} step={1}/>
                
            </Form.Item>}
        

            <Form.Item  name="EUREXchangeRate" valuePropName="checked">
                <Checkbox>欧元汇率7</Checkbox>
            </Form.Item>

            
            <Form.Item  name="GBPEXchangeRate" valuePropName="checked">
                <Checkbox>英镑汇率8.2</Checkbox>
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                开始计算
                </Button>
            </Form.Item>

          
        </Form>
        
        <Table pagination={{hideOnSinglePage: true}} dataSource={dataSource} columns={columns}/>
        </>
    )
}

export default CaculateTable;