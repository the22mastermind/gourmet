const validations = {
  firstName: {
    required: 'First name is required',
    pattern: {
      value: /^([a-zA-Z]{3,30})+$/,
      message: 'First name must contain only letters and length must be between 3 and 30 characters',
    },
  },
  lastName: {
    required: 'Last name is required',
    pattern: {
      value: /^([a-zA-Z]{3,30})+$/,
      message: 'Last name must contain only letters and length must be between 3 and 30 characters',
    },
  },
  address: {
    required: 'Address is required',
    pattern: {
      value: /^([\w\W]{3,30})$/,
      message: 'Address length must be between 3 and 30 characters',
    },
  },
  phoneNumber: {
    required: 'Phone number is required',
    pattern: {
      value: /^[+]+([0-9]{11,13})$/,
      message: 'Phone number must include country code eg. +250',
    },
  },
  password: {
    required: 'Password is required',
    pattern: {
      value: /^(?=.*[!@#$%^&*?])[0-9a-zA-Z!@#$%^&*?]{6,20}$/,
      message: 'Password length must be between 6 and 20, with at least one number and a symbol',
    },
  },
};

export default validations;
