const validations = {
  email: {
    required: "Email is required.",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "Email is invalid.",
    },
  },
  name: {
    required: "Name is required.",
    maxLength: {
      value: 50,
      message: "Name must not exceed 50 characters.",
    },
  },
  phoneNumber: {
    required: "Phone number is required.",
    pattern: {
      value: /^\d+$/,
      message: "Phone number must contain only numbers.",
    },
    minLength: {
      value: 10,
      message: "Phone number must be at least 10 digits.",
    },
    maxLength: {
      value: 15,
      message: "Phone number must not exceed 15 digits.",
    },
  },
  password: {
    required: "Password is required.",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters.",
    },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message:
        "Password must include at least one letter, one number, and one symbolic character.",
    },
  },

  repeatPassword: {
    required: "Password is required.",
    validate: (value, { password }) => {
      if (value !== password) {
        return "Passwords do not match.";
      }
      return true;
    },
  },

  code: {
    required: "code is required.",
    pattern: {
      value: /^\d+$/,
      message: "Code must contain only numbers.",
    },
    minLength: {
      value: 6,
      message: "Code number must be at least 6 digits.",
    },
    maxLength: {
      value: 6,
      message: "Code number must not exceed 6 digits.",
    },
    // validate: (value) => {
    //   if (value === "Code is valid") {
    //     // No error message if the code is valid
    //     return true;
    //   } else {
    //     // Display an error message
    //     return "Invalid code. Please try again.";
    //   }
    // },
  },
};

export default validations;
