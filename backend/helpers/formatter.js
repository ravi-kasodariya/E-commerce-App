const phoneNumberFormatter = async (number, country_code) => {
  let formatted = number.toString().replace(/\D/g, "");

  formatted = country_code + formatted;

  if (!formatted.endsWith("@c.us")) {
    formatted += "@c.us";
  }

  return formatted;
};

module.exports = {
  phoneNumberFormatter,
};
