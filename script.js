// Typing Effect ตรงหน้าแรก
const texts = ["ครูคอมพิวเตอร์", "นักพัฒนาสื่อการสอน", "ผู้สร้างแรงบันดาลใจ"];
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
