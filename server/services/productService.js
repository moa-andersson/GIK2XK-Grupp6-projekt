const db = require("../models");
const validate = require("validate.js");
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require("../helpers/responseHelper");

const constraints = {
  price: {
    numericality: {
      float: true,
      message: "^Priset måste vara numreriskt",
    },
  },
  title: {
    length: {
      minimum: 1,
      maximum: 50,
      tooShort: "^Titlen för produkten måste vara minst %{count} tecken lång",
      tooLong: "^Titlen får max vara %{count} tecken lång",
    },
  },
  imgUrl: {
    url: {
      message: "^Sökvägen är felaktig.",
    },
    length: {
      minimum: 1,
      maximum: 255,
      tooShort:
        "^Bildadressen för produkten måste vara minst %{count} tecken lång",
      tooLong: "^Bildadressen får max vara %{count} tecken lång",
    },
  },
};

async function getById(id) {
  try {
    const allProducts = await db.product.findOne({ where: { id } });
    return createResponseSuccess(allProducts);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
    const allProducts = await db.product.findAll({
      include: [db.rating],
    });
    return createResponseSuccess(allProducts.map((product) => product));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
async function create(product) {
  const invalidData = validate(product, constraints);

  if (invalidData) {
    return createResponseError(422, invalidData);
  } else {
    try {
      const newProduct = await db.product.create(product);
      return createResponseSuccess(newProduct);
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }
}
async function update(product, id) {
  const invalidData = validate(product, constraints);
  if (!id) {
    return createResponseError(422, "Id är obligatoriskt");
  }

  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    await db.product.update(product, {
      where: { id },
    });
    return createResponseMessage(200, "Produkten uppdaterades!");
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
    await db.product.destroy({
      where: { id },
    });
    return createResponseMessage(200, "Användaren raderades.");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function addRating(id, rating) {
  if (!id) {
    return createResponseError(422, "Id är obligatoriskt");
  }
  try {
    rating.productId = id;

    await db.rating.create(rating);
    const productWithNewRating = await db.product.findOne({
      where: { id },
      include: [db.rating],
    });

    return createResponseSuccess(productWithNewRating);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getProductRatings(productId) {
  try {
    const product = await db.product.findOne({
      include: [db.rating],
      where: { id: productId },
    });

    return createResponseSuccess(product);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function addProductToCart(userId, productId, cartRow) {
  if (!userId) {
    return createResponseError(422, "Användar-id är obligatoriskt");
  }
  try {
    cartRow.productId = productId;
    const cart = await db.cart.findOne({
      where: { userId },
    });
    cartRow.cartId = cart.id;
    console.log(cart.id);

    await db.cartRow.create(cartRow);
    const newCartWithProducts = await db.cart.findOne({
      where: { id: cart.id },
      include: [db.cartRow],
    });

    return createResponseSuccess(newCartWithProducts);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

function _formatRating(rating) {
  const cleanRating = {
    id: rating.id,
    productId: rating.productId,
    rating: rating.rating,
  };

  return cleanRating;
}

async function _formatProduct(product) {
  const cleanProduct = {
    id: product.id,
    title: product.title,
    description: product.description,
    imgUrl: product.imgUrl,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };

  if (product.ratings) {
    cleanProduct.ratings = [];

    product.ratings.map((rating) => {
      return (cleanProduct.ratings = [
        {
          id: rating.id,
          productId: rating.productId,
          rating: rating.rating,
        },
        ...cleanProduct.ratings,
      ]);
    });
  }

  return cleanProduct;
}

module.exports = {
  addProductToCart,
  getProductRatings,
  _formatProduct,
  _formatRating,
  addRating,
  getById,
  getAll,
  create,
  update,
  destroy,
};
