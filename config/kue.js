const kue = require("kue");
const env = require("./environment");
let ramos = "";

//queue = kue.createQueue({redis: {port: 6379,host: "localhost",auth: ""}});
if (env.name === "development" && env.deployment === "local") {
	ramos = kue.createQueue();
} else if (env.name === "production" && env.deployment === "AWS") {
	ramos = kue.createQueue();
} else if (env.name === "production" && env.deployment === "Heroku") {
	ramos = kue.createQueue({
		prefix: "q",
		redis: {
			port: env.redis_port,
			host: env.redis_host,
			auth: env.redis_auth,
		},
	});
} else if (env.name === "production" && env.deployment === "other") {
	ramos = kue.createQueue({
		prefix: "q",
		redis: {
			port: env.redis_port,
			host: env.redis_host,
			auth: env.redis_auth,
		},
	});
}

module.exports = ramos;
