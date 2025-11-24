module.exports = {
  detect: (text) => {
    const regex = /(https?:\/\/[^\s]+)/gi;
    return regex.test(text);
  }
};
