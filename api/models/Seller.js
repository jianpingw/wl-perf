/**
 * Model for Seller.
 */

module.exports = {

  attributes: {

    user: {
      model: 'User'
    },
    category: {
      type: 'string'
    },    
    authorized: {
      type: 'boolean'
    }

  }

};
