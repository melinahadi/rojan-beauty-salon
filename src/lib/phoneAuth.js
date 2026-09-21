export function phoneToFakeEmail(phone) {
    // فقط رقم‌ها رو نگه می‌داریم تا فرمت‌های مختلف (با فاصله، خط تیره) یکسان بشن
    const digits = phone.replace(/\D/g, "");
    return `${digits}@rojan-salon.local`;
}

export function isValidIranPhone(phone) {
    // فرمت‌های رایج: 09123456789 یا 9123456789
    return /^0?9\d{9}$/.test(phone.replace(/\s/g, ""));
}