// Utility function to format timestamp to HH:mm dd-MM-YYYY format
const formatTimestamp = (timestamp) => {

    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}-${month}-${year}`;
};

// Utility function to format price to Rupiah currency format
function formatCurrency(price) {
    if (typeof price !== 'number') {
        return 'Invalid Price';
    }

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    return formatter.format(price);
}

module.exports = {
    formatCurrency,
    formatTimestamp,
};
