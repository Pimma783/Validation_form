document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const fullNameInput = document.getElementById('fullName');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const ticketTypeSelect = document.getElementById('ticketType');
    const ticketQuantityInput = document.getElementById('ticketQuantity');

    const fullNameError = document.getElementById('fullNameError');
    const phoneNumberError = document.getElementById('phoneNumberError');
    const ticketQuantityError = document.getElementById('ticketQuantityError');

    const modal = document.getElementById('successModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function validateForm() {
        let isValid = true;

        fullNameError.textContent = '';
        phoneNumberError.textContent = '';
        ticketQuantityError.textContent = '';
        
        const fullNameValue = fullNameInput.value.trim();
        const nameParts = fullNameValue.split(/\s+/);
        if (fullNameValue === '' || nameParts.length < 2) {
            fullNameError.textContent = 'กรุณากรอกชื่อ-นามสกุลให้ครบถ้วน (อย่างน้อย 2 คำ)';
            isValid = false;
        }

        const phoneRegex = /^0[0-9]{9}$/;
        if (phoneNumberInput.value.trim() === '' || !phoneRegex.test(phoneNumberInput.value)) {
            phoneNumberError.textContent = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (ตัวเลข 10 หลัก, ขึ้นต้นด้วย 0)';
            isValid = false;
        }

        const quantity = parseInt(ticketQuantityInput.value);
        if (isNaN(quantity) || quantity < 1 || quantity > 5) {
            ticketQuantityError.textContent = 'จำนวนตั๋วต้องอยู่ระหว่าง 1 ถึง 5';
            isValid = false;
        }

        const ticketType = ticketTypeSelect.value;
        if ((ticketType === 'vip' || ticketType === 'premium') && quantity > 2) {
            ticketQuantityError.textContent = 'ตั๋วประเภท VIP หรือ Premium จองได้ไม่เกิน 2 ใบ';
            isValid = false;
        }

        return isValid;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            const quantity = ticketQuantityInput.value;
            const type = ticketTypeSelect.options[ticketTypeSelect.selectedIndex].text;
            
            modalMessage.textContent = `จองตั๋วสำเร็จ จำนวน: ${quantity} ประเภท: ${type}`;
            modal.classList.remove('hidden');
        }
    });

    closeModalBtn.addEventListener('click', function() {
        modal.classList.add('hidden');
        form.reset();
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
            form.reset();
        }
    });
});