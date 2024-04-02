YourSchema.pre('find', function(next) {
    var conditions = this.getQuery();

    conditions.$where = function() {
        // Iterate over each object in the array
        for (var i = 0; i < this.yourArrayField.length; i++) {
            var obj = this.yourArrayField[i];
            // Check if all properties match
            if (obj.property1 !== 'value1' || obj.property2 !== 'value2') {
                return false; // If any property doesn't match, return false
            }
        }
        return true; // All properties match for at least one object in the array
    };

    next();
});
