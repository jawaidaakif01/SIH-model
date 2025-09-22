document.addEventListener('DOMContentLoaded', () => {
    const translations = {
      en: { volunteerTitle: "Volunteer Sign-Up", usernameLabel: "Username", phoneLabel:"Phone Number / Email", genderLabel:"Gender", passwordLabel: "Password", usernamePlaceholder:"Enter your username", phonePlaceholder:"Enter phone number or email", passwordPlaceholder: "Enter your password", genderOptions:["Female","Male","Other"], volunteerSubmit:"Sign Up" },
      as: { volunteerTitle:"সেচ্ছাসেৱক সাইন আপ", usernameLabel:"ব্যৱহাৰকাৰীৰ নাম", phoneLabel:"ফোন নম্বৰ / ইমেইল", genderLabel:"লিংগ", passwordLabel: "পাছৱৰ্ড", usernamePlaceholder:"ব্যৱহাৰকাৰীৰ নাম লিখক", phonePlaceholder:"ফোন বা ইমেইল লিখক", passwordPlaceholder: "পাছৱৰ্ড লিখক", genderOptions:["মহিলা","পুৰুষ","অন্য"], volunteerSubmit:"সাইন আপ কৰক" },
      bn: { volunteerTitle:"স্বেচ্ছাসেবক সাইন আপ", usernameLabel:"ব্যবহারকারীর নাম", phoneLabel:"ফোন নম্বর / ইমেল", genderLabel:"লিঙ্গ", passwordLabel: "পাসওয়ার্ড", usernamePlaceholder:"আপনার নাম লিখুন", phonePlaceholder:"ফোন নম্বর বা ইমেল লিখুন", passwordPlaceholder: "আপনার পাসওয়ার্ড দিন", genderOptions:["মহিলা","পুরুষ","অন্যান্য"], volunteerSubmit:"সাইন আপ করুন" }
    };
    
    document.getElementById('languageSwitcher').addEventListener('change', function() {
        const t = translations[this.value];
        document.getElementById('volunteerTitle').innerText = t.volunteerTitle;
        document.getElementById('usernameLabel').innerText = t.usernameLabel;
        document.getElementById('phoneLabel').innerText = t.phoneLabel;
        document.getElementById('genderLabel').innerText = t.genderLabel;
        document.getElementById('passwordLabel').innerText = t.passwordLabel;
        document.getElementById('usernameInput').placeholder = t.usernamePlaceholder;
        document.getElementById('phoneInput').placeholder = t.phonePlaceholder;
        document.getElementById('passwordInput').placeholder = t.passwordPlaceholder;
        const genderSelect = document.getElementById('genderSelect');
        genderSelect.innerHTML="";
        t.genderOptions.forEach(o=>{ let opt=document.createElement("option"); opt.text=o; genderSelect.add(opt); });
        document.getElementById('volunteerSubmit').innerText = t.volunteerSubmit;
    });
});