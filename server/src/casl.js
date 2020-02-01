const { AbilityBuilder, Ability } = require('@casl/ability');

exports.defineRulesFor = user => {
    const { rules, can } = AbilityBuilder.extract();

    if (user.isAdmin) {
        can('manage', 'all');
    } else {
        can(['read', 'update'], 'User', {
            _id: user._id,
        });
    }

    return rules;
};

exports.defineAbilitiesFor = user => new Ability(this.defineRulesFor(user));
