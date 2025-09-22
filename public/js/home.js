document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: { title: "PureSentinal", subtitle: "Smart Monitoring for Safer Communities", volunteerBtn: "Sign Up as Volunteer", assessmentBtn: "Start Health Assessment" },
        as: { title: "শুদ্ধ প্ৰহৰী", subtitle: "নিরাপদ সমাজৰ বাবে স্মাৰ্ট নিৰীক্ষণ", volunteerBtn: "স্বেচ্ছাসেৱক হিচাপে নিবন্ধন কৰক", assessmentBtn: "হেলথ মূল্যায়ন আৰম্ভ কৰক" },
        bn: { title: "শুদ্ধ প্রহরী", subtitle: "নিরাপদ সমাজের জন্য স্মার্ট মনিটরিং", volunteerBtn: "স্বেচ্ছাসেবক হিসাবে সাইন আপ করুন", assessmentBtn: "স্বাস্থ্য মূল্যায়ন শুরু করুন" }
    };

    document.getElementById('languageSwitcher').addEventListener('change', function() {
        const t = translations[this.value];
        document.getElementById('title').innerText = t.title;
        document.getElementById('subtitle').innerText = t.subtitle;
        document.getElementById('volunteerBtn').innerText = t.volunteerBtn;
        document.getElementById('assessmentBtn').innerText = t.assessmentBtn;
    });
});