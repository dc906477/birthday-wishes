/**
 * Name input ko validate karta hai.
 * @param {string} name 
 * @returns {{ isValid: boolean, error: string }}
 */
export const validateName = (name) => {
    const trimmed = name.trim();

    if (!trimmed) {
        return {
            isValid: false,
            error: 'Please enter a name to continue.',
        };
    }

    if (trimmed.length < 2) {
        return {
            isValid: false,
            error: 'Name must be at least 2 characters long.',
        };
    }

    if (trimmed.length > 30) {
        return {
            isValid: false,
            error: 'Name cannot exceed 30 characters.',
        };
    }

    // Sirf alphabets aur common space/hyphen allow karega
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(trimmed)) {
        return {
            isValid: false,
            error: 'Name can only contain letters, spaces, and hyphens.',
        };
    }

    return {
        isValid: true,
        error: '',
    };
};