/**
 * Model for User.
 */

module.exports = {

  attributes: {

    email: {
      type: 'email',
      required: true,
      unique: true
    },
    nameFirst: {
      type: 'string'
    },
    nameLast: {
      type: 'string'
    },
    address: {
      type: 'json'
    },
    phone: {
      type: 'string'
    },
    seller: {
      collection: 'Seller',
      via: 'user'
    }

  }

};
