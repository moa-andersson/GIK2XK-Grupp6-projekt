const db = require("../models");
const validate = require("validate.js");
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require("../helpers/responseHelper");

async function destroy(id) {
  if (!id) {
    return createResponseError(422, "Id är obligatoriskt");
  }
  try {
    await db.cart.destroy({
      where: { id },
    });
    return createResponseMessage(200, "Korgen raderades.");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = {
  destroy,
};
