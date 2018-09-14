module.exports = {
    "extends": "airbnb-base",
    "env": {
        "mocha": true
    },
    "rules": {
        "no-unused-vars": [
            "error",
            {
                "varsIgnorePattern": "should|expect"
            }
        ]
    }
};
