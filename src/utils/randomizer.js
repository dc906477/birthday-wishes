/**
 * Kisi bhi array se ek random item select karta hai.
 * @param {Array} array 
 * @param {*} currentItem - taaki lagatar do bar same item na aaye
 * @returns {*}
 */
export const getRandomItem = (array, currentItem = null) => {
    if (!array || array.length === 0) return null;
    if (array.length === 1) return array[0];

    let filtered = array;
    if (currentItem) {
        filtered = array.filter((item) => item !== currentItem);
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
};