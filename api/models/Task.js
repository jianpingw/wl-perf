/**
 * Model for Task.
 */

module.exports = {

  attributes: {

    seller: {
      model: 'Seller',
      required: true
    },
    buyer: {
      model: 'User',
      required: true
    },
    price: {
      type: 'float'
    },
    description: {
      type: 'string'
    },
    message: {
      collection: 'Message',
      via: 'task'
    }

  }

};
