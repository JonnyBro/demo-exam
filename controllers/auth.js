import bcrypt from "bcryptjs";

const users = [
	{ username: "admin", password: "$2b$12$StSzqVqzY5ZS7eOn.3X1ZuBauhVtO/b2bN1ZmpxailHsr0SUnXICe", role: "admin" }, // qwerty1234
	{ username: "user", password: "$2b$12$QbMhuePfQ6lRH.43KbbAmedokC8gEXfvbCtNnsWIvt0nzmEyGFkLK", role: "user" }, // qwerty
];

export const login = (req, res) => {
	res.render("auth");
};

export const authenticate = (req, res) => {
	const { username, password } = req.body;

	const user = users.find(u => u.username === username);
	if (!user) return res.render("auth", { error: "Неверное имя пользователя или пароль" });

	bcrypt.compare(password, user.password, (err, isMatch) => {
		if (err || !isMatch) return res.render("auth", { error: "Неверное имя пользователя или пароль" });

		req.session.user = { username: user.username, role: user.role };
		res.redirect("/orders");
	});
};

export const logout = (req, res) => {
	req.session.destroy(() => {
		res.redirect("/auth");
	});
};
