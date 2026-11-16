const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function formatPrice(value) {
    const number = Number(value) || 0;

    return new Intl.NumberFormat("en-US")
        .format(number)
        .replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}