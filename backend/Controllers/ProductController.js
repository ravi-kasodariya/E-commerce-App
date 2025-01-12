const { Sequelize, Op } = require("sequelize");
const { Review, Product, User, Order, Seller } = require("../Models");
const { body } = require("express-validator");

const products = async (req, res) => {
  try {
    const { userId } = req.query;

    const products = await Product.findAll({
      include: [
        {
          model: Review,
          as: "reviews", // Include all associated reviews
          required: false,
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(`
              EXISTS (
                SELECT 1
                FROM orders
                WHERE orders.productId = Product.id
                AND orders.userId = '${userId}' AND orders.status = 'Cart'
              )
            `),
            "inCart",
          ],
        ],
      },
    });

    return res.json({
      meta: {
        message: "Products fetch successfully.",
        code: 200,
      },
      products,
    });
  } catch (err) {
    return res.status(500).json({
      errors: [
        {
          value: "",
          msg: err.message,
          param: "",
          location: "body",
        },
      ],
    });
  }
};

const product = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    const product = await Product.findOne({
      where: { id },
      include: [
        {
          model: Review,
          as: "reviews",
          include: {
            model: User,
            as: "user", // Nested relationship with User
          },
          required: false,
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(`
              EXISTS (
                SELECT 1
                FROM orders
                WHERE orders.productId = Product.id
                AND orders.userId = '${userId}' AND orders.status = 'Cart'
              )
            `),
            "inCart",
          ],
        ],
      },
    });

    return res.json({
      meta: {
        message: "Product fetch successfully.",
        code: 200,
      },
      product,
    });
  } catch (err) {
    return res.status(500).json({
      errors: [
        {
          value: "",
          msg: err.message,
          param: "",
          location: "body",
        },
      ],
    });
  }
};

const addReview = async (req, res) => {
  try {
    const { rating, review, productId, userId, orderId } = req.body;

    await Review.create({
      rating,
      review,
      productId,
      userId,
      orderId,
    });

    return res.json({
      meta: {
        message: "Review Added Successfully",
        code: 200,
      },
    });
  } catch (err) {
    return res.status(500).json({
      errors: [
        {
          value: "",
          msg: err.message,
          param: "",
          location: "body",
        },
      ],
    });
  }
};

const editReview = async (req, res) => {
  try {
    const { id } = req.params;

    await Review.update(req.body, { where: { id: id } });

    return res.json({
      meta: {
        message: "Review Edited Successfully",
        code: 200,
      },
    });
  } catch (err) {
    return res.status(500).json({
      errors: [
        {
          value: "",
          msg: err.message,
          param: "",
          location: "body",
        },
      ],
    });
  }
};

const addToCart = async (req, res) => {
  try {
    await Order.create(req.body);

    return res.json({
      meta: {
        message: "Product Added To Cart Successfully",
        code: 200,
      },
    });
  } catch (err) {
    return res.status(500).json({
      errors: [
        {
          value: "",
          msg: err.message,
          param: "",
          location: "body",
        },
      ],
    });
  }
};

const editToCart = async (req, res) => {
  try {
    const { orderIds, status } = req.body;

    await Order.update(
      { status: status },
      { where: { id: { [Op.in]: orderIds } } }
    );

    return res.json({
      meta: {
        message: "Product Edited To Cart Successfully",
        code: 200,
      },
    });
  } catch (err) {
    return res.status(500).json({
      errors: [
        {
          value: "",
          msg: err.message,
          param: "",
          location: "body",
        },
      ],
    });
  }
};

const removeToCart = async (req, res) => {
  try {
    const { id } = req.params;

    await Order.destroy({ where: { id: id } });

    return res.json({
      meta: {
        message: "Product Remove From Cart Successfully",
        code: 200,
      },
    });
  } catch (err) {
    return res.status(500).json({
      errors: [
        {
          value: "",
          msg: err.message,
          param: "",
          location: "body",
        },
      ],
    });
  }
};

const getCartOrderProduct = async (req, res) => {
  try {
    const { userId, status } = req.params;

    const products = await Order.findAll({
      where: { userId, status },
      include: [
        {
          model: Product,
          as: "product",
          include: [
            { model: Review, as: "review", where: { userId }, required: false },
            { model: Review, as: "reviews", required: false },
            { model: Seller, as: "seller" },
          ],
        },
        { model: User, as: "user" },
      ],
    });

    return res.json({
      meta: {
        message: "Products fetch successfully.",
        code: 200,
      },
      products,
    });
  } catch (err) {
    return res.status(500).json({
      errors: [
        {
          value: "",
          msg: err.message,
          param: "",
          location: "body",
        },
      ],
    });
  }
};

const getSeller = async (req, res) => {
  try {
    const { id } = req.params;

    const seller = await Seller.findOne({
      where: { id },
    });

    return res.json({
      meta: {
        message: "Seller fetch successfully.",
        code: 200,
      },
      seller,
    });
  } catch (err) {
    return res.status(500).json({
      errors: [
        {
          value: "",
          msg: err.message,
          param: "",
          location: "body",
        },
      ],
    });
  }
};

module.exports = {
  products,
  product,
  addReview,
  editReview,
  addToCart,
  editToCart,
  getCartOrderProduct,
  removeToCart,
  getSeller,
};
