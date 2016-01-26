/**
 * Model for a media file.
 */

module.exports = {
  attributes: {

    message: {
      type: 'string',
      required: true
    },

    task: {
      model: 'Task',
      required: true
    }

  }
};
