"use strict";
let util = require("util");
const neo4j = require("neo4j-driver").v1;
const user = "neo4j";
const password = "password";
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic(user, password));
const session = driver.session();

module.exports = {
	addUser: addUser
};

function addUser(req, res) {
	// variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
	let { name, email, birthday, fb } = req.swagger.params;
	console.log(req.swagger.params)
	let obj = {
		name: name.value,
		email: email.value,
		bday: birthday.value,
		fb: fb.value
	};

	const resultPromise = session.run(
		"CREATE (a:User {name: $name, email: $email, bday: $bday, fb: $fb}) RETURN a",
		obj
	);

	resultPromise.then(result => {
		session.close();

		const singleRecord = result.records[0];
		const node = singleRecord.get(0);

		console.log(node.properties.name);
		console.log(node.properties);
		let message = "User Added";
		// this sends back a JSON response which is a single string
		res.status(200).json({ message });

		// on application exit:
		driver.close();
	});
}
