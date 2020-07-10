const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcrypt");
const {
	CONFIG: { jwtSecret },
	db,
} = require("./conf");

passport.use(
	new LocalStrategy(
		{
			usernameField: "mail_address",
			passwordField: "password",
		},
		(formMail, formPassword, done) => {
			db.query(
				"SELECT first_name, last_name, mail_address, password FROM customer WHERE mail_address = ?",
				[formMail],
				(err, results) => {
					if (err) {
						console.error(err);
						return done(err);
					}
					let user;
					if (results && results[0]) user = { ...results[0] };
					if (!user || !user.mail_address)
						return done(null, false, { message: "User not found! " });

					bcrypt.compare(formPassword, user.password, (errBcrypt, result) => {
						if (errBcrypt) return done(errBcrypt);
						if (!result) return done(null, false, { message: "Incorrect password" });
						return done(null, user);
					});
				}
			);
		}
	)
);

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtSecret,
		},
		(jwtPayload, done) => {
			const user = jwtPayload;
			return done(null, user);
		}
	)
);
