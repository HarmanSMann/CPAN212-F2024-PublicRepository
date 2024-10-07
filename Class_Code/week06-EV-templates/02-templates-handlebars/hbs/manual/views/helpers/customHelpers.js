module.exports = {
    uppercase: (str) => {
      return str.toUpperCase();
    },
    lowercase: (str) => {
      return str.toLowerCase();
    },
    formatDate: (date) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  };
  