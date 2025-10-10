// ==================== FORM HANDLERS UTILITY ====================
// Utility functions for handling form operations in React components
// These functions are pure and reusable across different components

/**
 * Creates a generic input change handler for controlled form inputs
 * @param {Function} setter - The state setter function (e.g., setFormData)
 * @returns {Function} - Event handler function for input changes
 */
export const createInputChangeHandler = (setter) => {
  return (e) => {
    const { name, value } = e.target;
    setter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
};

/**
 * Creates a form submit handler for adding items to arrays with validation
 * @param {Function} arraySetter - State setter for the array (e.g., setBooks)
 * @param {Function} formSetter - State setter for the form data (e.g., setNewBook)
 * @param {Object} resetValue - The value to reset the form to
 * @param {Object} formData - The current form data to validate
 * @param {Array} requiredFields - Array of field names that are required
 * @param {Function} errorSetter - State setter for error messages
 * @returns {Function} - Event handler function for form submission
 */
export const createSubmitHandler = (
  arraySetter,
  formSetter,
  resetValue,
  formData,
  requiredFields = [],
  errorSetter
) => {
  return (e) => {
    e.preventDefault();

    // Validate form data
    const validation = validateForm(formData, requiredFields);

    if (!validation.isValid) {
      // Set error messages
      errorSetter(validation.errors);
      return;
    }

    // Clear any previous errors
    errorSetter([]);

    // Add new item to array using spread operator
    console.log('Form submission - adding item:', formData);
    arraySetter((prevArray) => {
      const newArray = [...prevArray, formData];
      console.log('New array after addition:', newArray);
      return newArray;
    });

    // Reset form to initial state
    formSetter(resetValue);
  };
};

/**
 * Creates a toggle handler for boolean state values
 * @param {Function} setter - The state setter function
 * @returns {Function} - Event handler function for toggling
 */
export const createToggleHandler = (setter) => {
  return () => {
    setter((prevState) => !prevState);
  };
};

/**
 * Validates form data before submission
 * @param {Object} formData - The form data to validate
 * @param {Array} requiredFields - Array of field names that are required
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
export const validateForm = (formData, requiredFields = []) => {
  console.log('Validating form data:', formData, 'required fields:', requiredFields);
  const errors = [];

  requiredFields.forEach((field) => {
    if (!formData[field] || formData[field].trim() === "") {
      errors.push(
        `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      );
    }
  });

  console.log('Validation result:', { isValid: errors.length === 0, errors });
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Creates a handler for select/dropdown changes
 * @param {Function} setter - The state setter function
 * @param {string} fieldName - The field name to update
 * @returns {Function} - Event handler for select changes
 */
export const createSelectChangeHandler = (setter, fieldName) => {
  return (e) => {
    setter((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value,
    }));
  };
};
