const db = require("../models");
const validate = require("validate.js");
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require("../helpers/responseHelper");

const constraints = {
  email: {
    length: {
      minimum: 4,
      maximum: 50,
      tooShort: "^Email-adressen måste vara minst %{count} tecken lång",
      tooLong: "^Email-adressen får max vara %{count} tecken lång",
    },
    email: {
      message: "^Du måste ange en giltlig email-adress",
    },
  },
};

async function getAll() {
  try {
    const allUsers = await db.user.findAll();
    return createResponseSuccess(allUsers);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getById(id) {
  try {
    const user = await db.user.findOne({ where: { id } });
    return createResponseSuccess(user);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function create(user) {
  const invalidData = validate(user, constraints);

  if (invalidData) {
    return createResponseError(422, invalidData);
  } else {
    try {
      const newUser = await db.user.create(user);
      return createResponseSuccess(newUser);
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }
}
async function update(user, id) {
  const invalidData = validate(user, constraints);
  if (!id) {
    return createResponseError(422, "Id är obligatoriskt");
  }

  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    await db.user.update(user, {
      where: { id },
    });
    return createResponseMessage(200, "Användaren uppdaterades!");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Kanske lägga till meddelande om att det inte
// lyckades med att ta bort användare om id inte finns

async function destroy(id) {
  if (!id) {
    return createResponseError(422, "Id är obligatoriskt");
  }
  try {
    await db.user.destroy({
      where: { id },
    });
    return createResponseMessage(200, "Användaren raderades.");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// async function getProductsFromCart(userId, cartId) {
//   if (!userId || !cartId) {
//     return createResponseError(
//       422,
//       "Användar-id kundvagns-id är obligatoriska"
//     ); //överflödig if?
//   }
//   try {
//     var allProductsInCart = [];
//     const cart = await db.cart.findOne({ where: { id: cartId } });

//     //kollar om kundkorgen tillhör användaren
//     if (cart.userId == userId) {
//       allProductsInCart = await db.cartRow.findAll({
//         where: { cartId: cartId },
//       });
//     } else {
//       return createResponseError(400, "Inte din kundkorg!");
//     }
//     return createResponseSuccess(allProductsInCart);
//   } catch (error) {
//     return createResponseError(error.status, error.message);
//   }
// }

// NY KOD
async function getProductsFromCart(userId) {
  if (!userId) {
    return createResponseError(422, "Användar-id är obligatoriskt");
  }
  try {
    var allProductsInCart = [];
    //Hittar cart tillhörande user
    const cart = await db.cart.findOne({ where: { userId: userId } });

    //hämtar alla cartrows tillhörande carten som hittades ovan
    allProductsInCart = await db.cartRow.findAll({
      where: { cartId: cart.id },
    });

    return createResponseSuccess(allProductsInCart);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = {
  getProductsFromCart,
  getAll,
  create,
  update,
  destroy,
  getById,
  getProductsFromCart,
};
