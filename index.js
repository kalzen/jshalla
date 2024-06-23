const { TagBuilder, IotGateway } = require('kepserverex-js');
const axios = require('axios');

const tagBuilder = new TagBuilder({ namespace: 'Channel1.Device1' });
const iotGateway = new IotGateway({
    host: '127.0.0.1',
    port: 8000
});

var tagArr = [];

function fn_tagRead() {
    iotGateway.read(TagList).then((data) => {
        const lodash = require('lodash');
        tagArr = lodash.map(data, (item) => item.v);
        console.log(JSON.stringify(tagArr));
        fn_send_data_to_api(tagArr);
    }).catch((error) => {
        console.error('Error reading tags:', error);
    });
}

function fn_send_data_to_api(data) {
    
    axios.post('locahost/halla/public/api/data', data)
        .then((response) => {
            console.log('Data sent to API successfully:', response.data);
        })
        .catch((error) => {
            console.error('Error sending data to API:', error);
        });
}

function fn_Data_Write(tag, data) {
    tagBuilder.clean();
    const set_value = tagBuilder.write(tag, data).get();
    iotGateway.write(set_value).catch((error) => {
        console.error('Error writing data:', error);
    });
}

// Khai báo tag
var Nut_NG = 'Button_NG'; 
var Nut_NG1 = 'Button_NG1';
var Nut_NG2 = 'Button_NG2';
var Nut_NG3 = 'Button_NG3';
var Nut_NG4 = 'Button_NG4';
var Nut_NG5 = 'Button_NG5';
var Nut_NG6 = 'Button_NG6';
var Sanpham1 ='Product_Input1';
var Sanpham2 ='Product_Input2';
var Sanpham3 ='Product_Input3';

//var Trangthai_NG = 'Status_NG7';
var Trangthai_NG1 = 'Status_NG1';
var Trangthai_NG2 = 'Status_NG2';
var Trangthai_NG3 = 'Status_NG3';
var Trangthai_NG4 = 'Status_NG4';
var Trangthai_NG5 = 'Status_NG5';
var Trangthai_NG6 = 'Status_NG6';

// Đọc dữ liệu
const TagList = tagBuilder
.read(Nut_NG)
.read(Nut_NG1)
.read(Nut_NG2)
.read(Nut_NG3)
.read(Nut_NG4)
.read(Nut_NG5)
.read(Nut_NG6)
.read(Sanpham1)
.read(Sanpham2)
.read(Sanpham3)

//.read(Trangthai_NG7)
.read(Trangthai_NG1)
.read(Trangthai_NG2)
.read(Trangthai_NG3)
.read(Trangthai_NG4)
.read(Trangthai_NG5)
.read(Trangthai_NG6)
.get();

//quet du lieu

function fn_read_data_scan() {
    fn_tagRead(); // Đọc giá trị Tag
}

setInterval(() => fn_read_data_scan(), 1000); // 1000ms = 1s

var express = require("express")
var app = express();
app.use(express.static("public"));

app.set("view engine", "ejc");
app.set("view","./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(5000);

app.get("/",function(req, res){
    res.render("home");
});