// Set max date to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('birthDate').max = today;
});

function calculateAge() {
    const birthDateInput = document.getElementById('birthDate').value;
    const resultDiv = document.getElementById('result');
    const detailsDiv = document.getElementById('details');
    const errorDiv = document.getElementById('error');

    // Clear previous results and errors
    resultDiv.classList.add('hidden');
    detailsDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');

    if (!birthDateInput) {
        showError('Please select your date of birth');
        return;
    }

    const birthDate = new Date(birthDateInput);
    const today = new Date();

    if (birthDate > today) {
        showError('Birth date cannot be in the future');
        return;
    }

    // Calculate years, months, and days
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for negative days
    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate additional details
    const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor((today - birthDate) / (1000 * 60 * 60));
    const nextBirthday = calculateNextBirthday(birthDate);
    const dayOfWeekBorn = getDayOfWeek(birthDate);
    const zodiacSign = getZodiacSign(birthDate);

    // Display results
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;

    document.getElementById('totalDays').textContent = totalDays.toLocaleString();
    document.getElementById('totalHours').textContent = totalHours.toLocaleString();
    document.getElementById('nextBirthday').textContent = nextBirthday;
    document.getElementById('dayOfWeek').textContent = dayOfWeekBorn;
    document.getElementById('zodiac').textContent = zodiacSign;

    resultDiv.classList.remove('hidden');
    detailsDiv.classList.remove('hidden');
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function calculateNextBirthday(birthDate) {
    const today = new Date();
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (nextBirthday < today) {
        nextBirthday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
    }

    const daysUntil = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    return `${nextBirthday.toDateString()} (in ${daysUntil} days)`;
}

function getDayOfWeek(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

function getZodiacSign(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return '♒ Aquarius';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return '♓ Pisces';
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return '♈ Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return '♉ Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return '♊ Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return '♋ Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return '♌ Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return '♍ Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return '♎ Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return '♏ Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return '♐ Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return '♑ Capricorn';
}

// Allow Enter key to calculate
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateAge();
    }
});