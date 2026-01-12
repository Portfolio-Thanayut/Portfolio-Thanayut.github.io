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

// 1. Image Modal (Gallery)
const imgModal = document.getElementById('img-modal');
const modalImg = document.getElementById('img01');
const galleryImages = document.querySelectorAll('.gallery-grid img');
const closeImgBtn = document.querySelector('.close-modal');

// เมื่อกดที่รูปใน Gallery
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        imgModal.classList.add('show'); // แสดง Modal
        modalImg.src = img.src; // เอารูปที่กดมาใส่ใน Modal
    });
});

// 2. Skill Modal (Skills) - อัปเดตใหม่
const skillModal = document.getElementById('skill-modal');
const skillCards = document.querySelectorAll('.skill-card');
const closeSkillBtn = document.querySelector('.close-modal-skill');

// องค์ประกอบภายใน Skill Modal
const sIcon = document.getElementById('skill-icon');
const sTitle = document.getElementById('skill-title');
const sDesc = document.getElementById('skill-desc');

// *** ตัวแปรสำหรับหลอดพลัง ***
const sProgressFill = document.getElementById('skill-progress-fill');
const sPercentText = document.getElementById('skill-percent-text');

// เมื่อกดที่ Skill Card
skillCards.forEach(card => {
    card.addEventListener('click', () => {
        // 1. ดึงข้อมูล
        const iconClass = card.querySelector('i').className;
        const titleText = card.querySelector('h3').innerText;
        const descText = card.getAttribute('data-detail') || card.querySelector('p').innerText;
        const levelValue = card.getAttribute('data-level') || '50'; // ถ้าลืมใส่ data-level ให้ค่า default 50

        // 2. อัปเดตข้อมูล Text/Icon
        sIcon.className = iconClass;
        sTitle.innerText = titleText;
        sDesc.innerText = descText;
        sPercentText.innerText = levelValue + "%";

        // 3. รีเซ็ตหลอดพลังให้เป็น 0 ก่อน (เพื่อให้เห็น Animation วิ่งใหม่ทุกครั้ง)
        sProgressFill.style.width = "0%";

        // 4. แสดง Modal
        skillModal.classList.add('show');

        // 5. สั่งให้หลอดวิ่งไปที่ค่าเป้าหมาย (หน่วงเวลาเล็กน้อยเพื่อให้ CSS Transition ทำงาน)
        setTimeout(() => {
            sProgressFill.style.width = levelValue + "%";
        }, 300);
    });
});

// ฟังก์ชันปิด Modal (ใช้ร่วมกัน)
function closeModal(modal) {
    modal.classList.remove('show');
}

// ปิดเมื่อกดปุ่ม X
closeImgBtn.onclick = () => closeModal(imgModal);
closeSkillBtn.onclick = () => closeModal(skillModal);

// ปิดเมื่อกดพื้นที่นอกกล่อง (Background)
window.addEventListener('click', (e) => {
    if (e.target === imgModal) {
        closeModal(imgModal);
    }
    if (e.target === skillModal) {
        closeModal(skillModal);
    }
});
