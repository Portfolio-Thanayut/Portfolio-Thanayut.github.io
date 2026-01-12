// Typing Effect ตรงหน้าแรก
const texts = ["มหาวิทยาลัยราชภัฏนครสวรรค์", "สาขาคอมพิวเตอร์และเทคโนโลยีการศึกษา"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.querySelector('.typing-text').textContent = letter;

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000); // หยุดรอ 2 วินาทีเมื่อพิมพ์เสร็จ
    } else {
        setTimeout(type, 100); // ความเร็วในการพิมพ์
    }
})();

// Smooth Scroll (เลื่อนหน้าจอแบบนุ่มนวล)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// จัดการ Modal รูปภาพ
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("img01");
const closeBtn = document.getElementsByClassName("close")[0];

// เลือกรูปทั้งหมดใน Gallery
const galleryImages = document.querySelectorAll('.gallery-grid img');

// วนลูปเพิ่ม Event Click ให้รูปทุกรูป
galleryImages.forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = "flex"; // แสดง Modal (ใช้ flex เพื่อจัดกึ่งกลาง)
        modalImg.src = this.src; // ดึง path รูปที่กดมาใส่ใน Modal
    });
});

// ฟังก์ชันปิด Modal เมื่อกดปุ่ม x
closeBtn.addEventListener('click', function() {
    modal.style.display = "none";
});

// ฟังก์ชันปิด Modal เมื่อกดพื้นที่ว่างด้านนอกรูป (Overlay)
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
