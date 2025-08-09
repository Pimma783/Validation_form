const healthForm = document.getElementById('healthForm');
const ageInput = document.getElementById('age');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const hasDiseaseCheckbox = document.getElementById('hasDisease');
const diseaseTextareaDiv = document.getElementById('diseaseTextarea');
const diseaseDetailsInput = document.getElementById('diseaseDetails');
const resultModal = document.getElementById('resultModal');
const modalContent = document.getElementById('modalContent');
const closeModalButton = document.getElementById('closeModal');

hasDiseaseCheckbox.addEventListener('change', () => {
  if (hasDiseaseCheckbox.checked) {
    diseaseTextareaDiv.classList.remove('hidden');
  } else {
    diseaseTextareaDiv.classList.add('hidden');
  }
});

healthForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const age = parseFloat(ageInput.value);
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);
  const hasDisease = hasDiseaseCheckbox.checked;
  const diseaseDetails = diseaseDetailsInput.value.trim();

  if (!age || !weight || !height) {
    showModal('Error', 'กรุณากรอกข้อมูลให้ครบถ้วน');
    return;
  }

  if (age < 15 || age > 60) {
    showModal('Error', 'อายุต้องอยู่ระหว่าง 15-60 ปี');
    return;
  }

  if (hasDisease && diseaseDetails === '') {
    showModal('Error', 'กรุณาระบุรายละเอียดโรคประจำตัว');
    return;
  }

  const bmi = weight / Math.pow(height / 100, 2);
  let category = '';

  if (bmi < 18.5) {
    category = 'น้ำหนักน้อย';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'ปกติ';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'น้ำหนักเกิน';
  } else {
    category = 'อ้วน';
  }

  const resultHTML = `
    <p class="mb-2">ค่า BMI ของคุณคือ: <span class="font-bold">${bmi.toFixed(2)}</span></p>
    <p>อยู่ในหมวดหมู่: <span class="font-bold">${category}</span></p>
  `;

  showModal('ผลลัพธ์', resultHTML);
});

closeModalButton.addEventListener('click', () => {
  resultModal.classList.add('hidden');
});

function showModal(title, content) {
  modalContent.innerHTML = `
    <h2 class="text-xl font-bold mb-4">${title}</h2>
    <div>${content}</div>
  `;
  resultModal.classList.remove('hidden');
}