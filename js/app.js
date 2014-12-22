(function() {
    var app = angular.module('application', []);
    
    app.controller('storeController', function () {
        this.sushi = [
        {
            name: 'Maguro',
            price: 200,
            description: 'ส่วนที่อร่อยที่สุดของทูน่า เนื้อที่มีชั้นไขมันแทรกอยู่ เมื่อเอาเข้าปากจะรู้สึกเหมือนจะละลายในปาก',
            canPurchase: false,
            image: 'sushi/maguro.jpg'
        },
        {
            name: 'Tamago',
            price: 100,
            description: 'ซูชิหน้าไข่ม้วน รสชาติหวานนุ่มลิ้ม',
            canPurchase: true,
            image: 'sushi/tamago.jpg'
        },
        {
            name: 'Ebi',
            price: 120,
            description: 'ซูชิหน้ากุ้ง สีแดงสดใสน่ากิน',
            canPurchase: true,
            image: 'sushi/ebi.jpg'
        },
        {
            name: 'Tako',
            price: 150,
            description: 'ซูชิหน้าปลาหมึก กรุบกรอบหนุบหนับ',
            canPurchase: true,
            image: 'sushi/tako.jpg'
        }
        ];
        
    });
        
    
})();