document.addEventListener('DOMContentLoaded', function() {
    const transferForm = document.getElementById('transferForm');
    const submitBtn = document.getElementById('submitBtn');
    const confirmationModal = document.getElementById('confirmation-modal');
    const successModal = document.getElementById('success-modal');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    const successModalCloseBtn = document.getElementById('success-modal-close-btn');

    const formElements = {
        prefix: document.querySelector('input[name="prefix"]'),
        fullName: document.getElementById('fullName'),
        studentId: document.getElementById('studentId'),
        mobileNumber: document.getElementById('mobileNumber'),
        program: document.querySelector('input[name="program"]'),
        semester: document.querySelector('input[name="semester"]'),
        currentMajor: document.getElementById('currentMajor'),
        currentFaculty: document.getElementById('currentFaculty'),
        desiredMajor: document.getElementById('desiredMajor'),
        reason: document.getElementById('reason')
    };

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            confirmationModal.classList.remove('hidden');
        }
    });

    modalConfirmBtn.addEventListener('click', function() {
        console.log("ส่งแบบฟอร์มแล้ว");
        confirmationModal.classList.add('hidden');
        successModal.classList.remove('hidden');
    });

    modalCancelBtn.addEventListener('click', function() {
        confirmationModal.classList.add('hidden');
    });

    successModalCloseBtn.addEventListener('click', function() {
        successModal.classList.add('hidden');
        transferForm.reset();
        clearErrors();
    });

    function validateForm() {
        let isValid = true;
        clearErrors();

        const prefix = document.querySelector('input[name="prefix"]:checked');
        if (!prefix) {
            document.getElementById('prefix-error').classList.remove('hidden');
            isValid = false;
        }

        const fullName = formElements.fullName.value.trim();
        const nameParts = fullName.split(/\s+/);
        if (nameParts.length < 2 || nameParts[0] === '' || nameParts[1] === '') {
            document.getElementById('fullName-error').classList.remove('hidden');
            isValid = false;
        }

        const studentId = formElements.studentId.value.trim();
        if (!/^\d{10}$/.test(studentId)) {
            document.getElementById('studentId-error').classList.remove('hidden');
            isValid = false;
        }

        const mobileNumber = formElements.mobileNumber.value.trim();
        if (!/^0\d{9}$/.test(mobileNumber)) {
            document.getElementById('mobileNumber-error').classList.remove('hidden');
            isValid = false;
        }

        const program = document.querySelector('input[name="program"]:checked');
        if (!program) {
            document.getElementById('program-error').classList.remove('hidden');
            isValid = false;
        }
        
        const semester = document.querySelector('input[name="semester"]:checked');
        if (!semester) {
            document.getElementById('semester-error').classList.remove('hidden');
            isValid = false;
        }

        if (formElements.currentMajor.value.trim() === '') {
            document.getElementById('currentMajor-error').classList.remove('hidden');
            isValid = false;
        }
        
        if (formElements.currentFaculty.value.trim() === '') {
            document.getElementById('currentFaculty-error').classList.remove('hidden');
            isValid = false;
        }

        if (formElements.desiredMajor.value.trim() === '') {
            document.getElementById('desiredMajor-error').classList.remove('hidden');
            isValid = false;
        }
        
        if (formElements.reason.value.trim() === '') {
            document.getElementById('reason-error').classList.remove('hidden');
            isValid = false;
        }
        
        return isValid;
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.text-red-500');
        errorMessages.forEach(el => el.classList.add('hidden'));
    }
}); 