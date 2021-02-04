const { Schema, model, Types } = require('mongoose');
const moment = require("moment");

const ReactionSchema = new Schema(
    {
        // set thought id to avoid confusion with parent thought _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: "React! Don't just stand there!",
            maxlength: [280, "Maximum of 280 characters allowed!"],
        },
        username: {
            type: String,
            required: 'Username is Required',
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) =>
                moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'A penny for your thoughts?',
            minlength: [1, "at least one character is required"],
            maxlength: [280, "maximum of 280 characters allowed"],
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) =>
                moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },

        username: {
            type: String,
            required: 'Username is Required',
        },

        // use ReactionSchema to validate data for a reply
        reactions: [ReactionSchema]
    },

    // Set the `toJSON` schema option to use virtuals
    // Set the `id` as false
    // YOUR CODE HERE
    //
    {
        toJSON: {
            // virtuals: true,
            getters: true,
        },
        id: false
    }
);


// Create a virtual property `username` that's computed from the front part of `email` before the `@` symbol.
// YOUR CODE HERE
//https://mongoosejs.com/docs/tutorials/virtuals.html

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
