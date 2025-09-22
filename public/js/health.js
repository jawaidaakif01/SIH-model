document.addEventListener('DOMContentLoaded', () => {

    window.switchForm = (formType) => {
        document.getElementById('loginForm').classList.toggle('active', formType === 'login');
        document.getElementById('loginForm').classList.toggle('hidden', formType !== 'login');
        document.getElementById('signupForm').classList.toggle('active', formType === 'signup');
        document.getElementById('signupForm').classList.toggle('hidden', formType !== 'signup');
    }


    const translations = {
      en: { healthTitle: "Health Assessment Login", healthPhoneLabel: "Phone Number / Email", healthPhonePlaceholder: "Enter phone number or email", otpLabel: "OTP Verification", otpPlaceholder: "Enter OTP", sendOtpBtn: "Send OTP", verifyBtn: "Verify & Start Assessment", signupTitle: "New User Sign-Up", signupUsernameLabel: "Username", signupUsernamePlaceholder: "Enter your username", signupPhoneLabel: "Email / Phone", signupPhonePlaceholder: "Enter phone or email", signupGenderLabel: "Gender", genderOptions: ["Female", "Male", "Other"], newHere: "New user?", signupLink: "Sign up here", haveAccount: "Already have an account?", loginLink: "Login here", signupAndStart: "Sign Up & Start Assessment" },
      as: { healthTitle: "হেলথ এসেছমেণ্ট লগইন", healthPhoneLabel: "ফোন নম্বৰ / ইমেইল", healthPhonePlaceholder: "ফোন বা ইমেইল লিখক", otpLabel: "OTP প্ৰমাণীকৰণ", otpPlaceholder: "OTP লিখক", sendOtpBtn: "OTP পঠাওক", verifyBtn: "পৰীক্ষা কৰক আৰু আৰম্ভ কৰক", signupTitle: "নতুন ব্যৱহাৰকাৰী সাইন আপ", signupUsernameLabel: "ব্যৱহাৰকাৰীৰ নাম", signupUsernamePlaceholder: "ব্যৱহাৰকাৰীৰ নাম লিখক", signupPhoneLabel: "ফোন নম্বৰ / ইমেইল", signupPhonePlaceholder: "ফোন বা ইমেইল লিখক", signupGenderLabel: "লিংগ", genderOptions: ["স্ত্ৰী", "পুৰুষ", "অন্যান্য"], newHere: "নতুন ব্যৱহাৰকাৰী?", signupLink: "ইয়াত ছাইন আপ কৰক", haveAccount: "একাউণ্ট আছে?", loginLink: "ইয়াত লগইন কৰক", signupAndStart: "সাইন আপ কৰক আৰু আৰম্ভ কৰক" },
      bn: { healthTitle: "স্বাস্থ্য মূল্যায়ন লগইন", healthPhoneLabel: "ফোন নম্বর / ইমেল", healthPhonePlaceholder: "ফোন নম্বর বা ইমেল লিখুন", otpLabel: "OTP যাচাইকরণ", otpPlaceholder: "OTP লিখুন", sendOtpBtn: "OTP পাঠান", verifyBtn: "যাচাই করুন এবং শুরু করুন", signupTitle: "নতুন ব্যবহারকারী সাইন আপ", signupUsernameLabel: "ব্যবহারকারীর নাম", signupUsernamePlaceholder: "আপনার নাম লিখুন", signupPhoneLabel: "ফোন নম্বর / ইমেল", signupPhonePlaceholder: "ফোন নম্বর বা ইমেল লিখুন", signupGenderLabel: "লিঙ্গ", genderOptions: ["নারী", "পুরুষ", "অন্যান্য"], newHere: "নতুন ব্যবহারকারী?", signupLink: "এখানে সাইন আপ করুন", haveAccount: "ইতিমধ্যে সদস্য?", loginLink: "এখানে লগইন করুন", signupAndStart: "সাইন আপ এবং শুরু করুন" }
    };

    document.getElementById('languageSwitcher').addEventListener('change', function () {
        const t = translations[this.value];
        document.getElementById('healthTitle').innerText = t.healthTitle;
        document.getElementById('healthPhoneLabel').innerText = t.healthPhoneLabel;
        document.getElementById('healthPhoneInput').placeholder = t.healthPhonePlaceholder;
        document.getElementById('otpLabel').innerText = t.otpLabel;
        document.getElementById('otpInput').placeholder = t.otpPlaceholder;
        document.getElementById('sendOtpBtn').innerText = t.sendOtpBtn;
        document.getElementById('verifyBtn').innerText = t.verifyBtn;
        document.querySelector('#loginForm .switch-link span').innerHTML = `${t.newHere} <a onclick="switchForm('signup')">${t.signupLink}</a>`;
        
        const loginGenderSelect = document.getElementById('loginGenderSelect');
        loginGenderSelect.innerHTML = '';
        t.genderOptions.forEach(option => {
            const opt = document.createElement('option'); opt.textContent = option; loginGenderSelect.appendChild(opt);
        });

        document.getElementById('signupTitle').innerText = t.signupTitle;
        document.getElementById('signupUsernameLabel').innerText = t.signupUsernameLabel;
        document.getElementById('signupUsernameInput').placeholder = t.signupUsernamePlaceholder;
        document.getElementById('signupPhoneLabel').innerText = t.signupPhoneLabel;
        document.getElementById('signupPhoneInput').placeholder = t.signupPhonePlaceholder;
        document.getElementById('signupGenderLabel').innerText = t.signupGenderLabel;
        document.getElementById('signupSubmitBtn').innerText = t.signupAndStart;
        document.querySelector('#signupForm .switch-link span').innerHTML = `${t.haveAccount} <a onclick="switchForm('login')">${t.loginLink}</a>`;

        const signupGenderSelect = document.getElementById('signupGenderSelect');
        signupGenderSelect.innerHTML = '';
        t.genderOptions.forEach(option => {
            const opt = document.createElement('option'); opt.textContent = option; signupGenderSelect.appendChild(opt);
        });
    });

    switchForm('login');
});